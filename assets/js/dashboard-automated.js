/**
 * Dashboard de Cibersegurança Automatizado v4.0.0
 * Conecta com backend Flask para dados em tempo real
 */

class AutomatedDashboard {
    constructor() {
        this.apiBaseUrl = 'https://api.minutodash.com/dashboard';
        this.updateInterval = 30000; // 30 segundos
        this.charts = {};
        this.updateTimers = {};
        this.isOnline = true;
        this.retryCount = 0;
        this.maxRetries = 3;
        
        this.init();
    }

    async init() {
        console.log('🚀 Inicializando Dashboard Automatizado v4.0.0');
        
        // Verifica conectividade com backend
        await this.checkBackendConnection();
        
        // Inicializa componentes
        this.initializeCharts();
        this.loadInitialData();
        this.startAutoUpdate();
        this.initializeLiveFeed();
        
        // Event listeners
        this.setupEventListeners();
        
        console.log('✅ Dashboard inicializado com sucesso');
    }

    async checkBackendConnection() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/statistics`);
            if (response.ok) {
                this.isOnline = true;
                this.retryCount = 0;
                this.updateConnectionStatus(true);
                console.log('✅ Conectado ao backend');
            } else {
                throw new Error('Backend não disponível');
            }
        } catch (error) {
            this.isOnline = false;
            this.updateConnectionStatus(false);
            console.warn('⚠️ Backend offline, usando dados locais');
        }
    }

    updateConnectionStatus(online) {
        const statusElement = document.getElementById('connection-status');
        if (statusElement) {
            statusElement.innerHTML = online 
                ? '<span class="text-green-500">🟢 Online</span>'
                : '<span class="text-red-500">🔴 Offline</span>';
        }
    }

    async loadInitialData() {
        console.log('📊 Carregando dados iniciais...');
        
        try {
            // Carrega dados em paralelo
            const [kpis, charts, lists, threatLevel, countries] = await Promise.all([
                this.fetchKPIs(),
                this.fetchChartsData(),
                this.fetchListsData(),
                this.fetchThreatLevel(),
                this.fetchCountriesData()
            ]);

            // Atualiza interface
            this.updateKPIs(kpis);
            this.updateCharts(charts);
            this.updateLists(lists);
            this.updateThreatLevel(threatLevel);
            this.updateCountriesList(countries);

            console.log('✅ Dados iniciais carregados');
        } catch (error) {
            console.error('❌ Erro ao carregar dados iniciais:', error);
            this.loadFallbackData();
        }
    }

    async fetchKPIs() {
        if (!this.isOnline) return this.getFallbackKPIs();
        
        try {
            const response = await fetch(`${this.apiBaseUrl}/kpis`);
            if (!response.ok) throw new Error('Erro ao buscar KPIs');
            return await response.json();
        } catch (error) {
            console.warn('⚠️ Erro ao buscar KPIs, usando fallback');
            return this.getFallbackKPIs();
        }
    }

    async fetchChartsData() {
        if (!this.isOnline) return this.getFallbackCharts();
        
        try {
            const response = await fetch(`${this.apiBaseUrl}/charts`);
            if (!response.ok) throw new Error('Erro ao buscar dados dos gráficos');
            return await response.json();
        } catch (error) {
            console.warn('⚠️ Erro ao buscar gráficos, usando fallback');
            return this.getFallbackCharts();
        }
    }

    async fetchListsData() {
        if (!this.isOnline) return this.getFallbackLists();
        
        try {
            const response = await fetch(`${this.apiBaseUrl}/lists`);
            if (!response.ok) throw new Error('Erro ao buscar listas');
            return await response.json();
        } catch (error) {
            console.warn('⚠️ Erro ao buscar listas, usando fallback');
            return this.getFallbackLists();
        }
    }

    async fetchThreatLevel() {
        if (!this.isOnline) return this.getFallbackThreatLevel();
        
        try {
            const response = await fetch(`${this.apiBaseUrl}/threat-level`);
            if (!response.ok) throw new Error('Erro ao buscar nível de ameaça');
            return await response.json();
        } catch (error) {
            console.warn('⚠️ Erro ao buscar nível de ameaça, usando fallback');
            return this.getFallbackThreatLevel();
        }
    }

    async fetchCountriesData() {
        if (!this.isOnline) return this.getFallbackCountries();
        
        try {
            const response = await fetch(`${this.apiBaseUrl}/countries`);
            if (!response.ok) throw new Error('Erro ao buscar dados de países');
            return await response.json();
        } catch (error) {
            console.warn('⚠️ Erro ao buscar países, usando fallback');
            return this.getFallbackCountries();
        }
    }

    updateKPIs(data) {
        // CVEs Críticas
        const cvesElement = document.getElementById('cves-count');
        const cvesChangeElement = document.getElementById('cves-change');
        if (cvesElement && data.cves_criticas) {
            cvesElement.textContent = data.cves_criticas.total;
            if (cvesChangeElement) {
                cvesChangeElement.textContent = data.cves_criticas.change;
            }
        }

        // Alertas CISA
        const cisaElement = document.getElementById('cisa-count');
        const cisaChangeElement = document.getElementById('cisa-change');
        if (cisaElement && data.alertas_cisa) {
            cisaElement.textContent = data.alertas_cisa.total;
            if (cisaChangeElement) {
                cisaChangeElement.textContent = data.alertas_cisa.change;
            }
        }

        // CERT.br
        const certElement = document.getElementById('cert-count');
        const certChangeElement = document.getElementById('cert-change');
        if (certElement && data.cert_br) {
            certElement.textContent = data.cert_br.total.toLocaleString();
            if (certChangeElement) {
                certChangeElement.textContent = data.cert_br.change;
            }
        }

        // Samples Malware
        const malwareElement = document.getElementById('malware-count');
        const malwareChangeElement = document.getElementById('malware-change');
        if (malwareElement && data.samples_malware) {
            malwareElement.textContent = data.samples_malware.total.toLocaleString();
            if (malwareChangeElement) {
                malwareChangeElement.textContent = data.samples_malware.change;
            }
        }
    }

    updateCharts(data) {
        if (data.severity) {
            this.updateSeverityChart(data.severity);
        }
        if (data.malware) {
            this.updateMalwareChart(data.malware);
        }
        if (data.countries) {
            this.updateCountriesChart(data.countries);
        }
        if (data.trends) {
            this.updateTrendsChart(data.trends);
        }
        if (data.sectors) {
            this.updateSectorsChart(data.sectors);
        }
    }

    updateThreatLevel(data) {
        const levelElement = document.getElementById('threat-level');
        const descElement = document.getElementById('threat-description');
        const cvesMetricElement = document.getElementById('threat-cves');
        const exploitsMetricElement = document.getElementById('threat-exploits');
        const malwareMetricElement = document.getElementById('threat-malware');

        if (levelElement && data.level) {
            levelElement.innerHTML = `${data.icon} ${data.level}`;
        }
        if (descElement && data.description) {
            descElement.textContent = data.description;
        }
        if (cvesMetricElement && data.metrics?.cves_criticas) {
            cvesMetricElement.textContent = data.metrics.cves_criticas;
        }
        if (exploitsMetricElement && data.metrics?.exploits_ativos) {
            exploitsMetricElement.textContent = data.metrics.exploits_ativos;
        }
        if (malwareMetricElement && data.metrics?.malware_novo) {
            malwareMetricElement.textContent = data.metrics.malware_novo;
        }
    }

    updateCountriesList(countries) {
        const listElement = document.getElementById('countries-list');
        if (!listElement || !countries) return;

        listElement.innerHTML = countries.map(country => `
            <div class="flex justify-between items-center py-2 border-b border-gray-700">
                <span class="text-gray-300">${country.name}</span>
                <div class="text-right">
                    <span class="text-white font-semibold">${country.threats}</span>
                    <span class="text-gray-400 text-sm ml-2">(${country.percentage}%)</span>
                </div>
            </div>
        `).join('');
    }

    initializeCharts() {
        // Inicializa gráficos Chart.js
        this.charts.severity = this.createSeverityChart();
        this.charts.malware = this.createMalwareChart();
        this.charts.countries = this.createCountriesChart();
        this.charts.trends = this.createTrendsChart();
        this.charts.sectors = this.createSectorsChart();
        this.charts.riskTrend = this.createRiskTrendChart();
    }

    createSeverityChart() {
        const ctx = document.getElementById('severityChart');
        if (!ctx) return null;

        return new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [],
                    borderColor: '#1f2937',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: { color: '#e5e7eb', usePointStyle: true }
                    }
                }
            }
        });
    }

    createMalwareChart() {
        const ctx = document.getElementById('malwareChart');
        if (!ctx) return null;

        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [],
                    borderColor: '#1f2937',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { color: '#e5e7eb' },
                        grid: { color: '#374151' }
                    },
                    x: {
                        ticks: { color: '#e5e7eb' },
                        grid: { color: '#374151' }
                    }
                }
            }
        });
    }

    createCountriesChart() {
        const ctx = document.getElementById('countriesChart');
        if (!ctx) return null;

        return new Chart(ctx, {
            type: 'pie',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [],
                    borderColor: '#1f2937',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: { color: '#e5e7eb', usePointStyle: true }
                    }
                }
            }
        });
    }

    createTrendsChart() {
        const ctx = document.getElementById('trendsChart');
        if (!ctx) return null;

        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: []
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#e5e7eb' }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { color: '#e5e7eb' },
                        grid: { color: '#374151' }
                    },
                    x: {
                        ticks: { color: '#e5e7eb' },
                        grid: { color: '#374151' }
                    }
                }
            }
        });
    }

    createSectorsChart() {
        const ctx = document.getElementById('sectorsChart');
        if (!ctx) return null;

        return new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [],
                    borderColor: '#1f2937',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '40%',
                plugins: {
                    legend: {
                        position: 'right',
                        labels: { color: '#e5e7eb', usePointStyle: true }
                    }
                }
            }
        });
    }

    createRiskTrendChart() {
        const ctx = document.getElementById('riskTrendChart');
        if (!ctx) return null;

        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['7d', '6d', '5d', '4d', '3d', '2d', '1d', 'Hoje'],
                datasets: [{
                    label: 'Risk Score',
                    data: [55, 58, 62, 59, 65, 68, 66, 67],
                    borderColor: '#f97316',
                    backgroundColor: 'rgba(249, 115, 22, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#f97316',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 3,
                    pointHoverRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 50,
                        max: 80,
                        ticks: { 
                            color: '#94a3b8',
                            font: { size: 10 },
                            stepSize: 10
                        },
                        grid: { 
                            color: 'rgba(148, 163, 184, 0.1)',
                            drawBorder: false
                        }
                    },
                    x: {
                        ticks: { 
                            color: '#94a3b8',
                            font: { size: 9 }
                        },
                        grid: { display: false }
                    }
                },
                elements: {
                    point: {
                        hoverBackgroundColor: '#f97316'
                    }
                }
            }
        });
    }

    updateSeverityChart(data) {
        if (!this.charts.severity || !data) return;

        this.charts.severity.data.labels = data.map(item => item.label);
        this.charts.severity.data.datasets[0].data = data.map(item => item.value);
        this.charts.severity.data.datasets[0].backgroundColor = data.map(item => 
            item.color + '80' // Adiciona transparência
        );
        this.charts.severity.update();
    }

    updateMalwareChart(data) {
        if (!this.charts.malware || !data) return;

        this.charts.malware.data.labels = data.map(item => item.label);
        this.charts.malware.data.datasets[0].data = data.map(item => item.value);
        this.charts.malware.data.datasets[0].backgroundColor = data.map(item => 
            item.color + '80' // Adiciona transparência
        );
        this.charts.malware.update();
    }

    updateCountriesChart(data) {
        if (!this.charts.countries || !data) return;

        this.charts.countries.data.labels = data.map(item => item.label);
        this.charts.countries.data.datasets[0].data = data.map(item => item.value);
        this.charts.countries.data.datasets[0].backgroundColor = data.map(item => 
            item.color + '80' // Adiciona transparência
        );
        this.charts.countries.update();
    }

    updateTrendsChart(data) {
        if (!this.charts.trends || !data) return;

        this.charts.trends.data.labels = data.labels;
        this.charts.trends.data.datasets = data.datasets.map(dataset => ({
            label: dataset.label,
            data: dataset.data,
            borderColor: dataset.color,
            backgroundColor: dataset.color + '20',
            fill: false,
            tension: 0.4,
            pointBackgroundColor: dataset.color,
            pointBorderColor: '#1f2937',
            pointBorderWidth: 2,
            pointRadius: 4
        }));
        this.charts.trends.update();
    }

    updateSectorsChart(data) {
        if (!this.charts.sectors || !data) return;

        this.charts.sectors.data.labels = data.map(item => item.label);
        this.charts.sectors.data.datasets[0].data = data.map(item => item.value);
        this.charts.sectors.data.datasets[0].backgroundColor = data.map(item => 
            item.color + '80' // Adiciona transparência
        );
        this.charts.sectors.update();
    }

    startAutoUpdate() {
        // Atualiza dados a cada 30 segundos
        this.updateTimers.main = setInterval(async () => {
            await this.checkBackendConnection();
            if (this.isOnline) {
                await this.updateAllData();
            }
        }, this.updateInterval);

        console.log(`🔄 Auto-atualização iniciada (${this.updateInterval/1000}s)`);
    }

    async updateAllData() {
        try {
            const [kpis, charts, threatLevel] = await Promise.all([
                this.fetchKPIs(),
                this.fetchChartsData(),
                this.fetchThreatLevel()
            ]);

            this.updateKPIs(kpis);
            this.updateCharts(charts);
            this.updateThreatLevel(threatLevel);

            // Atualiza timestamp
            this.updateLastUpdateTime();

        } catch (error) {
            console.error('❌ Erro na atualização automática:', error);
            this.retryCount++;
            
            if (this.retryCount >= this.maxRetries) {
                console.warn('⚠️ Muitas falhas, pausando atualizações');
                this.isOnline = false;
                this.updateConnectionStatus(false);
            }
        }
    }

    updateLastUpdateTime() {
        const timeElement = document.getElementById('last-update-time');
        if (timeElement) {
            const now = new Date();
            timeElement.textContent = now.toLocaleTimeString('pt-BR');
        }
    }

    initializeLiveFeed() {
        this.startLiveFeedTimer();
    }

    startLiveFeedTimer() {
        let timeLeft = 600; // 10 minutos em segundos
        
        const timerElement = document.getElementById('live-feed-timer');
        if (!timerElement) return;

        const updateTimer = () => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            
            timeLeft--;
            
            if (timeLeft < 0) {
                timeLeft = 300; // Reinicia
                this.updateAllData(); // Força atualização
            }
        };

        updateTimer();
        setInterval(updateTimer, 1000);
    }

    setupEventListeners() {
        // Botão de atualização manual
        const refreshButton = document.getElementById('refresh-button');
        if (refreshButton) {
            refreshButton.addEventListener('click', async () => {
                refreshButton.disabled = true;
                refreshButton.textContent = 'atualizando...';
                
                await this.updateAllData();
                
                refreshButton.disabled = false;
                refreshButton.textContent = 'atualizar';
            });
        }

        // Detecta quando a página fica visível novamente
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && this.isOnline) {
                this.updateAllData();
            }
        });
    }

    // Dados de fallback quando backend está offline
    getFallbackKPIs() {
        return {
            cves_criticas: { total: 47, change: '+3', period: 'últimas 24h' },
            alertas_cisa: { total: 12, change: '+2', period: 'esta semana' },
            cert_br: { total: 4127, change: '+31', period: 'incidentes' },
            samples_malware: { total: 3540, change: '+89', period: 'últimas 24h' }
        };
    }

    getFallbackCharts() {
        return {
            severity: [
                { label: 'Crítica', value: 156, color: '#ef4444' },
                { label: 'Alta', value: 234, color: '#f97316' },
                { label: 'Média', value: 189, color: '#eab308' },
                { label: 'Baixa', value: 98, color: '#22c55e' }
            ],
            malware: [
                { label: 'Trojan', value: 342, color: '#8b5cf6' },
                { label: 'Ransomware', value: 156, color: '#ef4444' },
                { label: 'Backdoor', value: 234, color: '#f97316' },
                { label: 'Spyware', value: 189, color: '#eab308' },
                { label: 'Outros', value: 987, color: '#6b7280' }
            ],
            countries: [
                { label: '🗽 Estados Unidos', value: 423, color: '#3b82f6' },
                { label: '🏮 China', value: 387, color: '#ef4444' },
                { label: '🏛️ Rússia', value: 298, color: '#f97316' },
                { label: '🏖️ Brasil', value: 156, color: '#22c55e' },
                { label: '🌍 Outros', value: 283, color: '#6b7280' }
            ],
            trends: {
                labels: ['18/09', '19/09', '20/09', '21/09', '22/09', '23/09', '24/09'],
                datasets: [
                    { label: 'CVEs', data: [120, 135, 128, 142, 156, 149, 163], color: '#ef4444' },
                    { label: 'Malware', data: [1200, 1250, 1180, 1320, 1450, 1380, 1520], color: '#8b5cf6' },
                    { label: 'Alertas', data: [80, 85, 78, 92, 98, 94, 105], color: '#f97316' }
                ]
            },
            sectors: [
                { label: 'Saúde', value: 28, color: '#ef4444' },
                { label: 'Financeiro', value: 24, color: '#f97316' },
                { label: 'Governo', value: 18, color: '#eab308' },
                { label: 'Educação', value: 15, color: '#22c55e' },
                { label: 'Energia', value: 10, color: '#3b82f6' },
                { label: 'Outros', value: 5, color: '#6b7280' }
            ]
        };
    }

    getFallbackThreatLevel() {
        return {
            level: 'MÉDIO',
            icon: '🔶',
            description: 'Monitoramento contínuo',
            metrics: {
                cves_criticas: '47',
                exploits_ativos: '12',
                malware_novo: '89'
            }
        };
    }

    getFallbackCountries() {
        return [
            { name: '🗽 Estados Unidos', threats: 423, percentage: 28 },
            { name: '🏮 China', threats: 387, percentage: 25 },
            { name: '🏛️ Rússia', threats: 298, percentage: 19 },
            { name: '🏖️ Brasil', threats: 156, percentage: 10 },
            { name: '🌍 Outros', threats: 283, percentage: 18 }
        ];
    }

    getFallbackLists() {
        return {
            threat_groups: [],
            cves: [],
            cisa_alerts: [],
            malware_analysis: [],
            cybernews: []
        };
    }

    loadFallbackData() {
        console.log('📦 Carregando dados de fallback...');
        
        this.updateKPIs(this.getFallbackKPIs());
        this.updateCharts(this.getFallbackCharts());
        this.updateThreatLevel(this.getFallbackThreatLevel());
        this.updateCountriesList(this.getFallbackCountries());
    }

    destroy() {
        // Limpa timers
        Object.values(this.updateTimers).forEach(timer => clearInterval(timer));
        
        // Destroi gráficos
        Object.values(this.charts).forEach(chart => {
            if (chart) chart.destroy();
        });
        
        console.log('🛑 Dashboard destruído');
    }
}

// Inicializa dashboard quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.automatedDashboard = new AutomatedDashboard();
});

// Limpa recursos quando página é fechada
window.addEventListener('beforeunload', () => {
    if (window.automatedDashboard) {
        window.automatedDashboard.destroy();
    }
});
