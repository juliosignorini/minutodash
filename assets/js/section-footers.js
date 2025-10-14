/**
 * Section Footers Enhancement v1.0.0
 * Melhora os rodapés das seções com informações detalhadas de origem dos dados
 */

class SectionFooters {
    constructor() {
        this.init();
    }

    init() {
        console.log('🔧 Inicializando melhorias nos rodapés das seções...');
        this.updateAllFooters();
        this.startFooterUpdates();
        console.log('✅ Rodapés das seções melhorados');
    }

    updateAllFooters() {
        // Atualizar todos os rodapés das seções
        this.updateKPIFooters();
        this.updateExecutiveFooter();
        this.updateThreatIntelFooters();
        this.updateDownDetectorFooter();
        this.updateChartsFooters();
        this.updateGeolocationFooter();
        this.updateIOCFooter();
        this.updateMalwareFooter();
        this.updateStatsFooter();
        this.updateSpecificSectionsFooters();
    }

    createFooter(config) {
        const { 
            dataSource, 
            isLive = true
        } = config;

        return `
            <div class="flex items-center justify-between mt-4 pt-3 border-t border-slate-700/30">
                <div class="text-xs text-slate-400">
                    <span class="text-green-400">Fonte:</span> <span class="text-slate-300">${dataSource}</span>
                </div>
                ${isLive ? `
                <div class="flex items-center space-x-1">
                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span class="text-xs text-green-400">Live</span>
                </div>
                ` : ''}
            </div>
        `;
    }

    updateKPIFooters() {
        // Não adicionar rodapés aos KPIs principais conforme solicitado
        console.log('✅ KPIs principais sem rodapés conforme solicitado');
    }

    updateExecutiveFooter() {
        const executiveCard = document.querySelector('.ct-card:has(#riskGauge)');
        if (executiveCard) {
            const existingFooter = executiveCard.querySelector('.border-t');
            if (existingFooter) existingFooter.remove();
            
            executiveCard.insertAdjacentHTML('beforeend', this.createFooter({
                dataSource: 'Executive Risk Calculator • Algoritmo Proprietário',
                isLive: true
            }));
        }
    }

    updateThreatIntelFooters() {
        // Campanhas de Ransomware
        const ransomwareCard = document.querySelector('.ct-card:has(#ransomware-campaigns-list)');
        if (ransomwareCard) {
            const existingFooter = ransomwareCard.querySelector('.border-t');
            if (existingFooter) existingFooter.remove();
            
            ransomwareCard.insertAdjacentHTML('beforeend', this.createFooter({
                dataSource: 'ThreatFox • abuse.ch',
                isLive: true
            }));
        }

        // Malwares de Alto Risco
        const highRiskCard = document.querySelector('.ct-card:has(#high-risk-malware-list)');
        if (highRiskCard) {
            const existingFooter = highRiskCard.querySelector('.border-t');
            if (existingFooter) existingFooter.remove();
            
            highRiskCard.insertAdjacentHTML('beforeend', this.createFooter({
                dataSource: 'MalwareBazaar • abuse.ch',
                isLive: true
            }));
        }

        // Domínios .BR Comprometidos
        const brDomainsCard = document.querySelector('.ct-card:has(#br-domains-list)');
        if (brDomainsCard) {
            const existingFooter = brDomainsCard.querySelector('.border-t');
            if (existingFooter) existingFooter.remove();
            
            brDomainsCard.insertAdjacentHTML('beforeend', this.createFooter({
                dataSource: 'URLhaus • abuse.ch',
                isLive: true
            }));
        }
    }

    updateDownDetectorFooter() {
        const downDetectorCard = document.querySelector('.ct-card:has(#downdetector-status)');
        if (downDetectorCard) {
            const existingFooter = downDetectorCard.querySelector('.border-t');
            if (existingFooter) existingFooter.remove();
            
            downDetectorCard.insertAdjacentHTML('beforeend', this.createFooter({
                dataSource: 'DownDetector • Service Status Monitor',
                isLive: true
            }));
        }
    }

    updateChartsFooters() {
        // Buscar por seções de gráficos
        const chartSections = document.querySelectorAll('.ct-card:has(canvas)');
        chartSections.forEach((card, index) => {
            const existingFooter = card.querySelector('.border-t');
            if (existingFooter) existingFooter.remove();
            
            const chartConfigs = [
                {
                    dataSource: 'Backend API • Dashboard Charts',
                    isLive: true
                },
                {
                    dataSource: 'Threat Intelligence • Aggregated APIs',
                    isLive: true
                },
                {
                    dataSource: 'Sector Analysis • Industry Mapping',
                    isLive: true
                }
            ];
            
            const config = chartConfigs[index] || chartConfigs[0];
            
            card.insertAdjacentHTML('beforeend', this.createFooter(config));
        });
    }

    updateGeolocationFooter() {
        // Buscar seção de geolocalização
        const geoSection = document.querySelector('#geolocation');
        if (geoSection) {
            const geoCard = geoSection.closest('.ct-card');
            if (geoCard) {
                const existingFooter = geoCard.querySelector('.border-t');
                if (existingFooter) existingFooter.remove();
                
                geoCard.insertAdjacentHTML('beforeend', this.createFooter({
                    dataSource: 'ThreatFox + URLhaus • Geolocation Aggregator',
                    isLive: true
                }));
            }
        }
    }

    updateIOCFooter() {
        // Buscar seção de IOCs
        const iocSections = document.querySelectorAll('.ct-card');
        iocSections.forEach(card => {
            const title = card.querySelector('h3');
            if (title && (title.textContent.includes('IOC') || title.textContent.includes('Reputação'))) {
                const existingFooter = card.querySelector('.border-t');
                if (existingFooter) existingFooter.remove();
                
                card.insertAdjacentHTML('beforeend', this.createFooter({
                    dataSource: 'VirusTotal • AnyRun • Hybrid Analysis',
                    isLive: true
                }));
            }
        });
    }

    updateMalwareFooter() {
        // Atualizar rodapé da seção de análise de malware existente
        const malwareSection = document.querySelector('.ct-card p[class*="text-xs text-slate-500"]');
        if (malwareSection && malwareSection.textContent.includes('VirusTotal')) {
            malwareSection.parentElement.removeChild(malwareSection);
            
            const card = malwareSection.closest('.ct-card');
            if (card) {
                card.insertAdjacentHTML('beforeend', this.createFooter({
                    dataSource: 'VirusTotal • AnyRun • Hybrid Analysis',
                    isLive: true
                }));
            }
        }
    }

    updateStatsFooter() {
        // Atualizar rodapé da seção de estatísticas live
        const statsSection = document.querySelector('#analytics');
        if (statsSection) {
            const statsCard = statsSection.closest('.ct-card');
            if (statsCard) {
                const existingP = statsCard.querySelector('p.text-xs.text-slate-500');
                if (existingP) existingP.remove();
                
                statsCard.insertAdjacentHTML('beforeend', this.createFooter({
                    dataSource: 'NIST NVD • CISA • VirusTotal',
                    isLive: true
                }));
            }
        }
    }

    updateSpecificSectionsFooters() {
        // 🌍 Países com Mais Ameaças
        const countriesSection = document.querySelector('h3:contains("🌍")');
        if (!countriesSection) {
            // Buscar por texto alternativo
            const allH3 = document.querySelectorAll('h3');
            allH3.forEach(h3 => {
                if (h3.textContent.includes('Países') && h3.textContent.includes('Ameaças')) {
                    const card = h3.closest('.ct-card');
                    if (card) {
                        const existingFooter = card.querySelector('.border-t');
                        if (existingFooter) existingFooter.remove();
                        
                        card.insertAdjacentHTML('beforeend', this.createFooter({
                            dataSource: 'ThreatFox + URLhaus • Geolocation Aggregator',
                            isLive: true
                        }));
                    }
                }
            });
        }

        // 🕵️ Grupos de Ameaça Ativos
        const aptSection = document.querySelector('h3');
        const allH3APT = document.querySelectorAll('h3');
        allH3APT.forEach(h3 => {
            if (h3.textContent.includes('Grupos') && h3.textContent.includes('Ameaça')) {
                const card = h3.closest('.ct-card');
                if (card) {
                    const existingFooter = card.querySelector('.border-t');
                    if (existingFooter) existingFooter.remove();
                    
                    card.insertAdjacentHTML('beforeend', this.createFooter({
                        dataSource: 'MITRE ATT&CK • Groups Database',
                        isLive: true
                    }));
                }
            }
        });

        // 🔥 CVE Críticas
        const allH3CVE = document.querySelectorAll('h3');
        allH3CVE.forEach(h3 => {
            if (h3.textContent.includes('CVE') && h3.textContent.includes('Críticas')) {
                const card = h3.closest('.ct-card');
                if (card) {
                    const existingFooter = card.querySelector('.border-t');
                    if (existingFooter) existingFooter.remove();
                    
                    card.insertAdjacentHTML('beforeend', this.createFooter({
                        dataSource: 'NIST NVD • CVSS v3.1',
                        isLive: true
                    }));
                }
            }
        });

        // 🚨 Alertas CISA
        const allH3CISA = document.querySelectorAll('h3');
        allH3CISA.forEach(h3 => {
            if (h3.textContent.includes('Alertas') && h3.textContent.includes('CISA')) {
                const card = h3.closest('.ct-card');
                if (card) {
                    const existingFooter = card.querySelector('.border-t');
                    if (existingFooter) existingFooter.remove();
                    
                    card.insertAdjacentHTML('beforeend', this.createFooter({
                        dataSource: 'CISA KEV • us-cert.cisa.gov',
                        isLive: true
                    }));
                }
            }
        });

        // 🦠 Análise de Malware
        const allH3Malware = document.querySelectorAll('h3');
        allH3Malware.forEach(h3 => {
            if (h3.textContent.includes('Análise') && h3.textContent.includes('Malware')) {
                const card = h3.closest('.ct-card');
                if (card) {
                    const existingFooter = card.querySelector('.border-t');
                    if (existingFooter) existingFooter.remove();
                    
                    card.insertAdjacentHTML('beforeend', this.createFooter({
                        dataSource: 'VirusTotal • AnyRun • Hybrid Analysis',
                        isLive: true
                    }));
                }
            }
        });

        console.log('✅ Rodapés adicionados às seções específicas solicitadas');
    }

    startFooterUpdates() {
        // Sistema simplificado - apenas manter os indicadores Live ativos
        console.log('✅ Sistema de rodapés simplificado ativo');
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Aguardar um pouco para garantir que outras seções foram carregadas
    setTimeout(() => {
        window.sectionFooters = new SectionFooters();
    }, 2000);
});
