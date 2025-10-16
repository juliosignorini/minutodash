
/*
 * dashboard-automation.js
 * Script de automação para painéis e métricas.
 * Refatorado para suportar novos endpoints no futuro.
 */

async function atualizarPainelMetrica(idNovoCVE, apiInstance) {
  const el = document.getElementById(idNovoCVE);
  if (!el) return;
  el.innerText = "Coletando...";
  try {
    // Exemplo de reuso da integração de CVEs críticas
    const dados = await apiInstance.fetchCriticalCVEs();
    el.innerText = `Novos CVEs críticos: ${dados.totalResults}`;
  } catch (ex) {
    el.innerText = "Erro ao carregar métrica: " + ex.message;
  }
}

function workflowAutomacaoCompleto() {
  const api = new APIIntegrations();
  atualizarPainelMetrica("painel-cve-novos", api);
  // Outras métricas futuras: adicionar funções semelhantes
}

document.addEventListener("DOMContentLoaded", workflowAutomacaoCompleto);
// Atualiza a cada 15 minutos
setInterval(workflowAutomacaoCompleto, 15 * 60 * 1000);
