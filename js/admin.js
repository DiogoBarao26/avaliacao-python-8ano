(() => {
  const app = document.querySelector("#admin-app");
  const state = { results: [], turma: "", emailConfigured: false, error: "" };

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char]));
  }

  async function api(path, options) {
    const config = options || {};
    const response = await fetch((window.JBS_CONFIG.apiBase || "") + path, {
      method: config.method || "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: config.body ? JSON.stringify(config.body) : undefined
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(data.error || "Não foi possível concluir a operação.");
      error.status = response.status;
      throw error;
    }
    return data;
  }

  function renderLogin() {
    app.innerHTML = `
      <section class="card">
        <p class="kicker">Acesso restrito</p>
        <h1>Consultar resultados</h1>
        <p>As notas dos alunos ficam disponíveis apenas para o professor.</p>
        ${state.error ? `<div class="banner bad" role="alert">${escapeHtml(state.error)}</div>` : ""}
        <form id="login-form">
          <div class="field">
            <label for="password">Senha do professor</label>
            <input id="password" type="password" autocomplete="current-password" required>
          </div>
          <div class="actions">
            <button class="btn btn-primary" type="submit">Entrar</button>
          </div>
        </form>
      </section>
    `;
    document.querySelector("#login-form").addEventListener("submit", async (event) => {
      event.preventDefault();
      state.error = "";
      try {
        await api("/api/admin/login", {
          method: "POST",
          body: { password: document.querySelector("#password").value }
        });
        await loadResults();
      } catch (error) {
        state.error = error.message;
        renderLogin();
      }
    });
  }

  function renderResults() {
    const rows = state.results.filter((item) => !state.turma || item.turma === state.turma);
    const body = rows.length
      ? rows.map((item) => `
        <tr>
          <td>${escapeHtml(item.nome)}</td>
          <td>${escapeHtml(item.turma)}</td>
          <td>${escapeHtml(item.status)}</td>
          <td>${item.nota === null ? "—" : item.nota + ",0"}</td>
          <td>${item.acertos === null ? "—" : item.acertos}</td>
          <td>${item.erros === null ? "—" : item.erros}</td>
          <td>${item.aproveitamento === null ? "—" : item.aproveitamento + "%"}</td>
          <td>${escapeHtml(item.finished_at || item.started_at)}</td>
          <td>${escapeHtml(item.situacao)}</td>
          <td>${escapeHtml(item.email_status)}</td>
          <td>${item.resume_count}</td>
        </tr>`).join("")
      : `<tr><td colspan="11">Nenhuma avaliação encontrada para este filtro.</td></tr>`;
    app.innerHTML = `
      <section class="card">
        <p class="kicker">Planilhas e notas</p>
        <h1>Resultados por turma</h1>
        <p>${state.emailConfigured ? "O envio de e-mail está configurado." : "O e-mail ainda não está configurado. As notas continuam salvas no sistema e nas planilhas."}</p>
        ${state.error ? `<div class="banner bad">${escapeHtml(state.error)}</div>` : ""}
        <div class="filters" id="filters">
          ${["", "8A", "8B", "8C", "8D", "8E"].map((turma) => `
            <button class="btn btn-secondary" type="button" data-turma="${turma}" aria-pressed="${state.turma === turma}">
              ${turma || "Todas"}
            </button>`).join("")}
        </div>
        <div class="actions">
          <button class="btn btn-primary" id="sync-btn" type="button">Sincronizar planilhas e e-mails</button>
          <button class="btn btn-secondary" id="logout-btn" type="button">Sair</button>
        </div>
        <div class="actions">
          ${["8A", "8B", "8C", "8D", "8E"].map((turma) => `
            <a class="btn btn-secondary" href="/api/admin/export/${turma}">Baixar notas_${turma}.xlsx</a>`).join("")}
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Aluno</th><th>Turma</th><th>Situação</th><th>Nota</th><th>Acertos</th><th>Erros</th>
                <th>Aproveitamento</th><th>Horário</th><th>Salvamento</th><th>E-mail</th><th>Recarregamentos</th>
              </tr>
            </thead>
            <tbody>${body}</tbody>
          </table>
        </div>
      </section>
    `;
    document.querySelector("#filters").addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;
      state.turma = button.dataset.turma;
      renderResults();
    });
    document.querySelector("#sync-btn").addEventListener("click", async () => {
      state.error = "";
      try {
        await api("/api/admin/sync", { method: "POST", body: {} });
        await loadResults();
      } catch (error) {
        state.error = error.message;
        renderResults();
      }
    });
    document.querySelector("#logout-btn").addEventListener("click", async () => {
      await api("/api/admin/logout", { method: "POST", body: {} });
      renderLogin();
    });
  }

  async function loadResults() {
    const data = await api("/api/admin/results");
    state.results = data.results;
    state.emailConfigured = data.email_configured;
    state.error = "";
    renderResults();
  }

  loadResults().catch((error) => {
    state.error = error.status === 503 ? error.message : "";
    renderLogin();
  });
})();
