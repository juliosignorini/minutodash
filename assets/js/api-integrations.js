// Integra com APIs reais de segurança cibernética

class APIIntegrations {
    constructor() {
        this.corsProxy = 'https://api.allorigins.win/get?url=';
        this.cache = new Map();
        this.cacheTimeout = 10 * 60 * 1000; // 10 minutos
    }

    // Método genérico para cache
    getCachedData(key) {
        const cached = this.cache.get(key);
        if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
            return cached.data;
        }
        return null;
    }

    setCachedData(key, data) {
        this.cache.set(key, {
            data: data,
            timestamp: Date.now()
        });
    }

    // 1. NIST NVD - CVEs Críticas
    async fetchCriticalCVEs() {
        const cacheKey = 'critical_cves';
        const cached = this.getCachedData(cacheKey);
        if (cached) return cached;

        try {
            console.log('🔍 Buscando CVEs críticas do NIST NVD...');
            
            // Calcular data de 30 dias atrás
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            const startDate = thirtyDaysAgo.toISOString().split('T')[0];
            
            // URL com filtros para CVEs críticas dos últimos 30 dias
            const url = `https://services.nvd.nist.gov/rest/json/cves/2.0?cvssV3Severity=CRITICAL&pubStartDate=${startDate}T00:00:00.000&resultsPerPage=10&startIndex=0`;
            
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const data = await response.json();
            const cves = data.vulnerabilities || [];
            
            // Ordenar por data de publicação (mais recentes primeiro)
