
/*
 * dashboard-automated.js
 * Automatiza o refresh dos principais cards do dashboard.
 * Corrigido para tratar erros, loading, e evitar travamentos.
 */

async function atualizarDashboardCVEs(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.innerText = "Atualizando...";
  try {
    const api = new APIIntegrations();
    const dados = await api.fetchCriticalCVEs();
    el.innerText = `CVEs Críticas (30 dias): ${dados.totalResults}`;
  } catch (err) {
    el.innerText = "Falha ao atualizar CVEs: " + err.message;
  }
}

function iniciarAutomacaoDashboard() {
  // IDs dos elementos a serem atualizados
  atualizarDashboardCVEs("dashboard-cve-total");
  // Adicione aqui outras funções auto-refresh se houver outros cards
}

document.addEventListener("DOMContentLoaded", iniciarAutomacaoDashboard);
// Atualização periódica a cada 15 minutos
setInterval(iniciarAutomacaoDashboard, 15 * 60 * 1000);
