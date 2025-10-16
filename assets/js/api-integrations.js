
// api-integrations.js (VERSÃO SEGURA E AUTOMATIZADA)
class APIIntegrations {
  constructor() {
    this.cache = {};
    this.cacheTtlMs = 15 * 60 * 1000; // 15 min cache para requisições
    this.proxyUrl = 'https://api.allorigins.win/get?url=';
  }

  _getCache(key) {
    const record = this.cache[key];
    if (record && (Date.now() < record.expiry)) {
      return record.value;
    }
    return null;
  }

  _setCache(key, value) {
    this.cache[key] = {
      value,
      expiry: Date.now() + this.cacheTtlMs
    };
  }

  async fetchViaProxy(url, timeoutMs = 15000) {
    const fullUrl = `${this.proxyUrl}${encodeURIComponent(url)}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const resp = await fetch(fullUrl, { signal: controller.signal });
      if (!resp.ok) throw new Error(`Erro HTTP: ${resp.status}`);
      const wrapped = await resp.json();
      clearTimeout(timeout);
      // allorigins.win retorna { contents, status }
      return JSON.parse(wrapped.contents);
    } catch (ex) {
      throw new Error("Erro ao buscar dados da API: " + (ex.message || ex));
    }
  }

  async fetchCriticalCVEs() {
    const cacheKey = 'critical-cves';
    const cached = this._getCache(cacheKey);
    if (cached) return cached;

    // Datas para os últimos 30 dias em UTC ISO
    const now = new Date();
    const prev = new Date();
    prev.setDate(now.getDate() - 30);
    
    const fromDate = prev.toISOString();
    const url = `https://services.nvd.nist.gov/rest/json/cves/2.0/?cvssV3Severity=CRITICAL&lastModStartDate=${fromDate}`;

    try {
      const data = await this.fetchViaProxy(url);
      this._setCache(cacheKey, data);
      return data;
    } catch (err) {
      throw new Error(`Falha ao buscar CVEs críticas: ${err.message}`);
    }
  }
}

// Exemplo de uso com atualização automática e tratamento de erro:
async function atualizarCVEElemento(elementId) {
  const api = new APIIntegrations();
  const el = document.getElementById(elementId);
  if (!el) return;
  el.innerText = "Carregando CVEs críticas recentes...";
  try {
    const dados = await api.fetchCriticalCVEs();
    el.innerText = `Total de CVEs Críticas nos últimos 30 dias: ${dados.totalResults}`;
  } catch (e) {
    el.innerText = "Erro ao buscar dados da NVD: " + e.message;
  }
}

// Atualização automática a cada 15 minutos
setInterval(() => atualizarCVEElemento("cve-criticas"), 15*60*1000);
// Primeira chamada no carregamento
document.addEventListener("DOMContentLoaded", () => atualizarCVEElemento("cve-criticas"));
