"""Correção das 10 questões. A nota é decidida somente neste módulo."""

from __future__ import annotations

import ast

from questions_bank import QUESTIONS, explanation_for
from safe_python import (
    SafeError,
    execute,
    has_bool_operator,
    has_call,
    has_for,
    has_function,
    has_if_else,
    parse_tree,
)

Q9_CASES = [
    ({"pagamento": True, "estoque": 10, "quantidade": 4}, "Aprovado"),
    ({"pagamento": True, "estoque": 2, "quantidade": 5}, "Recusado"),
    ({"pagamento": False, "estoque": 10, "quantidade": 1}, "Recusado"),
    ({"pagamento": True, "estoque": 3, "quantidade": 3}, "Aprovado"),
    ({"pagamento": False, "estoque": 8, "quantidade": 8}, "Recusado"),
    ({"pagamento": True, "estoque": 0, "quantidade": 0}, "Aprovado"),
    ({"pagamento": True, "estoque": 1, "quantidade": 2}, "Recusado"),
]

Q10_CASES = [
    [3, 0, 5, 2],
    [0, 0, 0],
    [1],
    [4, 2],
    [],
    [-1, 0, 7],
    [8],
]

Q10_FUNCTION_CASES = [
    (3, True),
    (1, True),
    (0, False),
    (-3, False),
    (12, True),
]


def _printed_lines(output: list) -> list[str]:
    lines = []
    for item in output:
        text = str(item).strip()
        if text:
            lines.append(text)
    return lines


def _grade_true_false(response: dict) -> tuple[bool, list]:
    answers = response.get("answers")
    if not isinstance(answers, dict):
        raise ValueError("Resposta incompleta.")
    key = QUESTIONS[1]["key"]
    if set(answers) != set(key):
        raise ValueError("Responda todas as afirmações.")
    detail = []
    all_right = True
    for statement_id, expected in key.items():
        chosen = answers[statement_id]
        if not isinstance(chosen, bool):
            raise ValueError("Classifique cada afirmação como verdadeira ou falsa.")
        is_right = chosen is expected
        all_right = all_right and is_right
        detail.append({"id": statement_id, "is_right": is_right})
    return all_right, detail


def _grade_choice(number: int, response: dict) -> bool:
    option = response.get("option")
    if option not in {"A", "B", "C", "D"}:
        raise ValueError("Selecione uma alternativa.")
    return option == QUESTIONS[number]["key"]


def _code_text(response: dict) -> str:
    code = response.get("code")
    if not isinstance(code, str) or not code.strip():
        raise ValueError("Escreva o código antes de confirmar.")
    if len(code) > 2000:
        raise ValueError("O código está longo demais.")
    return code


def _grade_q9(code: str) -> bool:
    tree = parse_tree(code)
    if not has_if_else(tree) or not has_bool_operator(tree):
        return False
    for env, expected in Q9_CASES:
        result = execute(code, env)
        if _printed_lines(result.output) != [expected]:
            return False
    return True


def _count_valid(orders: list) -> int:
    return sum(1 for quantity in orders if isinstance(quantity, int) and quantity > 0)


def _grade_q10(code: str) -> bool:
    tree = parse_tree(code)
    if not has_function(tree, "pedido_valido") or not has_for(tree) or not has_call(tree, "pedido_valido"):
        return False
    if not any(isinstance(node, ast.If) for node in ast.walk(tree)):
        return False
    sample = None
    for orders in Q10_CASES:
        result = execute(code, {"pedidos": list(orders)})
        if result.env.get("aprovados") != _count_valid(orders):
            return False
        sample = result
    function = sample.functions.get("pedido_valido") if sample else None
    if function is None:
        return False
    for quantity, expected in Q10_FUNCTION_CASES:
        value = sample.call_function(function, [quantity])
        if value is not expected:
            return False
    return True


def grade(number: int, response: dict) -> dict:
    if number not in QUESTIONS or not isinstance(response, dict):
        raise ValueError("Questão inválida.")
    question = QUESTIONS[number]
    detail = None
    syntax_problem = False
    if question["type"] == "true_false":
        correct, detail = _grade_true_false(response)
    elif question["type"] == "multiple_choice":
        correct = _grade_choice(number, response)
    elif number == 9:
        code = _code_text(response)
        try:
            correct = _grade_q9(code)
        except SafeError:
            correct = False
            syntax_problem = True
        except SyntaxError:
            correct = False
            syntax_problem = True
    elif number == 10:
        code = _code_text(response)
        try:
            correct = _grade_q10(code)
        except SafeError:
            correct = False
            syntax_problem = True
        except SyntaxError:
            correct = False
            syntax_problem = True
    else:
        raise ValueError("Questão inválida.")

    explanation = explanation_for(number, correct)
    if syntax_problem and not correct:
        explanation = "O código tem um erro de escrita ou usa um recurso fora do enunciado. " + explanation
    result = {
        "correct": correct,
        "points": 1 if correct else 0,
        "explanation": explanation,
    }
    if detail is not None:
        result["detail"] = detail
    return result
