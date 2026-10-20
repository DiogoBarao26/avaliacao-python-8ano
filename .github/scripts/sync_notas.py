"""Copia as provas concluídas na internet para data/resultados.json."""

from __future__ import annotations

import json
import re
import urllib.error
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
INBOXES = ROOT / "data" / "inboxes.json"
RESULTS = ROOT / "data" / "resultados.json"
CONFIG = ROOT / "js" / "config.js"
USER_AGENT = "avaliacao-python-8ano"


def fetch(url: str, method: str = "GET", body: bytes | None = None, headers: dict | None = None) -> tuple[int, str]:
    request = urllib.request.Request(url, data=body, method=method)
    request.add_header("User-Agent", USER_AGENT)
    request.add_header("Accept", "application/json")
    for key, value in (headers or {}).items():
        request.add_header(key, value)
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            return response.status, response.read().decode("utf-8")
    except urllib.error.HTTPError as exc:
        return exc.code, exc.read().decode("utf-8", errors="replace")


def fetch_json(url: str):
    status, text = fetch(url)
    if status != 200:
        raise RuntimeError(f"{status} {url}")
    return json.loads(text)


def read_json(path: Path, fallback):
    if not path.exists():
        return fallback
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, value) -> None:
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def create_inbox() -> str:
    status, text = fetch(
        "https://webhook.site/token",
        method="POST",
        body=b"{}",
        headers={"Content-Type": "application/json"},
    )
    if status not in {200, 201}:
        raise RuntimeError("Não foi possível abrir uma lista nova.")
    inbox = json.loads(text)["uuid"]
    status, _body = fetch(
        f"https://webhook.site/token/{inbox}",
        method="PUT",
        body=json.dumps(
            {
                "cors": True,
                "default_status": 200,
                "default_content": "ok",
                "default_content_type": "text/plain",
            }
        ).encode("utf-8"),
        headers={"Content-Type": "application/json"},
    )
    if status != 200:
        raise RuntimeError("Não foi possível liberar a lista nova.")
    return inbox


def point_site_at(inbox: str) -> None:
    text = CONFIG.read_text(encoding="utf-8")
    updated = re.sub(
        r'resultsUrl: "https://webhook\.site/[^"]+"',
        f'resultsUrl: "https://webhook.site/{inbox}"',
        text,
        count=1,
    )
    if updated == text:
        raise RuntimeError("Não encontrei o endereço da lista em js/config.js.")
    CONFIG.write_text(updated, encoding="utf-8")


def ensure_fresh_inbox(inboxes: list[str]) -> list[str]:
    if not inboxes:
        inbox = create_inbox()
        point_site_at(inbox)
        return [inbox]
    try:
        meta = fetch_json(f"https://webhook.site/token/{inboxes[-1]}")
        expires = datetime.strptime(meta["expires_at"], "%Y-%m-%d %H:%M:%S").replace(tzinfo=timezone.utc)
    except (RuntimeError, KeyError, ValueError):
        return inboxes
    if expires - datetime.now(timezone.utc) > timedelta(hours=36):
        return inboxes
    inbox = create_inbox()
    point_site_at(inbox)
    return inboxes + [inbox]


def grades_from(inbox: str) -> list[dict]:
    found = []
    page = 1
    while page <= 20:
        try:
            payload = fetch_json(
                f"https://webhook.site/token/{inbox}/requests?sorting=oldest&per_page=50&page={page}"
            )
        except RuntimeError:
            break
        for item in payload.get("data") or []:
            if item.get("method") != "POST":
                continue
            try:
                body = json.loads(item.get("content") or "")
            except json.JSONDecodeError:
                continue
            if not isinstance(body, dict) or not body.get("nome") or not body.get("turma"):
                continue
            attempt_id = str(body.get("attempt_id") or "")
            if body.get("nome") == "Lia Teste" or attempt_id.startswith("teste-"):
                continue
            found.append(body)
        if payload.get("is_last_page", True):
            break
        page += 1
    return found


def merge(current: list[dict], incoming: list[dict]) -> list[dict]:
    seen = {item.get("attempt_id") for item in current if item.get("attempt_id")}
    merged = list(current)
    for item in incoming:
        attempt_id = item.get("attempt_id")
        if attempt_id and attempt_id in seen:
            continue
        if attempt_id:
            seen.add(attempt_id)
        merged.append(item)
    return merged


def main() -> None:
    inboxes = ensure_fresh_inbox(read_json(INBOXES, []))
    write_json(INBOXES, inboxes)
    current = read_json(RESULTS, [])
    if not isinstance(current, list):
        current = []
    incoming = []
    for inbox in inboxes:
        incoming.extend(grades_from(inbox))
    merged = merge(current, incoming)
    if merged != current:
        write_json(RESULTS, merged)


if __name__ == "__main__":
    main()
