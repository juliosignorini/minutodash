
// Integrador extra de Inteligência de Ameaças - MinutoDash

// 1. ThreatFox (abuse.ch)
async function getThreatFoxIndicators() {
    const postData = { query: "get_iocs", limit: 10 };
    const resp = await fetch("https://threatfox.abuse.ch/api/v1/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData)
    });
    const data = await resp.json();
    return data && data.data ? data.data : [];
}

// 2. URLhaus - URLs maliciosas (abuse.ch)
async function getUrlhausRecent() {
    const resp = await fetch("https://urlhaus-api.abuse.ch/v1/urls/recent/");
    const data = await resp.json();
    return data && data.urls ? data.urls.slice(0, 10) : [];
}

// 3. MalwareBazaar - Hashes de malware recentes (abuse.ch)
async function getMalwareBazaar() {
    const postData = { query: "get_recent", selector: "time" };
    const resp = await fetch("https://mb-api.abuse.ch/api/v1/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData)
    });
    const data = await resp.json();
    return data && data.data ? data.data.slice(0, 10) : [];
}

// 4. CISA KEV - Vulnerabilidades exploradas ativamente
async function getCISAKnownExploited() {
    const url = "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json";
    const resp = await fetch(url);
    const data = await resp.json();
    return data.vulnerabilities ? data.vulnerabilities.slice(0, 10) : [];
}

// Renderizar dados nos respectivos cards
async function renderThreatIntelCards() {
    // ThreatFox
    const fox = await getThreatFoxIndicators();
    let tfHtml = "";
    if (fox.length > 0) {
        tfHtml = fox.map(o => 
          `<li><span>[${o.threat_type}]</span> <strong>${o.ioc}</strong> <small>${o.ioc_type}</small> - ${o.tags.join(", ")}</li>`
        ).join("");
    } else { tfHtml = "<li>Nenhum IOC obtido.</li>"; }
    document.getElementById("threatfox-card-list").innerHTML = tfHtml;

    // URLhaus
    const urls = await getUrlhausRecent();
    let uhHtml = "";
    if (urls.length > 0) {
        uhHtml = urls.map(u =>
          `<li><a href="${u.url}" target="_blank">${u.url}</a> <small>${u.threat}</small></li>`
        ).join("");
    } else { uhHtml = "<li>Nenhuma URL maliciosa recente.</li>"; }
    document.getElementById("urlhaus-card-list").innerHTML = uhHtml;

    // MalwareBazaar
    const mal = await getMalwareBazaar();
    let mzHtml = "";
    if (mal.length > 0) {
        mzHtml = mal.map(m =>
          `<li><code>${m.sha256_hash}</code> <small>${m.file_type}</small> - <b>${m.tags && m.tags.join(", ")}</b></li>`
        ).join("");
    } else { mzHtml = "<li>Nenhum hash recente.</li>"; }
    document.getElementById("malwarebazaar-card-list").innerHTML = mzHtml;

    // CISA KEV
    const kev = await getCISAKnownExploited();
    let kevHtml = "";
    if (kev.length > 0) {
        kevHtml = kev.map(k =>
          `<li><strong>${k.cveID}</strong> <small>${k.vendorProject || ""} - ${k.product || ""}</small>: <em>${k.vulnerabilityName || ""}</em></li>`
        ).join("");
    } else { kevHtml = "<li>Sem vulnerabilidades recentes.</li>"; }
    document.getElementById("cisa-kev-card-list").innerHTML = kevHtml;
}

// Autoexecução após carregamento
// Novas funções para as melhorias solicitadas

// 1. Últimas 10 campanhas de grande porte de ransomware
async function getRansomwareCampaigns() {
    try {
        const postData = { query: "get_iocs", limit: 100 }; // Busca mais para filtrar
        const resp = await fetch("https://threatfox.abuse.ch/api/v1/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postData)
        });
        const data = await resp.json();
        if (data && data.data) {
            const ransomwareCampaigns = data.data.filter(ioc => 
                (ioc.tags && ioc.tags.some(tag => tag.toLowerCase().includes('ransomware'))) || 
                (ioc.threat_type && ioc.threat_type.toLowerCase().includes('ransomware')) ||
                (ioc.malware && ioc.malware.toLowerCase().includes('ransomware'))
            );
            return ransomwareCampaigns.slice(0, 10);
        }
    } catch (error) {
        console.error('Erro ao buscar campanhas de ransomware:', error);
    }
    return [];
}

// 2. Últimos 10 malwares reportados (alto risco ou superior)
async function getHighRiskMalware() {
    try {
        const postData = { query: "get_recent", selector: "time" };
        const resp = await fetch("https://mb-api.abuse.ch/api/v1/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postData)
        });
        const data = await resp.json();
        if (data && data.data) {
            // Filtrar por malwares que podem ser considerados de alto risco
            const highRiskMalware = data.data.filter(malware => 
                malware.signature && (
                    malware.signature.toLowerCase().includes('trojan') ||
                    malware.signature.toLowerCase().includes('ransomware') ||
                    malware.signature.toLowerCase().includes('backdoor') ||
                    malware.signature.toLowerCase().includes('stealer')
                )
            );
            return highRiskMalware.length > 0 ? highRiskMalware.slice(0, 10) : data.data.slice(0, 10);
        }
    } catch (error) {
        console.error('Erro ao buscar malwares de alto risco:', error);
    }
    return [];
}

// 4. Últimos 10 domínios brasileiros "negativados e/ou comprometidos"
async function getBrCompromisedDomains() {
    try {
        const resp = await fetch("https://urlhaus-api.abuse.ch/v1/urls/recent/");
        const data = await resp.json();
        if (data && data.urls) {
            const brDomains = data.urls.filter(url => 
                url.url.includes('.br/') || 
                url.url.includes('.com.br/') || 
                url.url.includes('.org.br/') ||
                url.url.includes('.net.br/')
            );
            return brDomains.slice(0, 10);
        }
    } catch (error) {
        console.error('Erro ao buscar domínios .br comprometidos:', error);
    }
    return [];
}

// Renderizar os novos cards
async function renderNewThreatIntelCards() {
    console.log('🔄 Atualizando seções de threat intelligence...');
    
    try {
        // Ransomware
        const ransomware = await getRansomwareCampaigns();
        let ransomwareHtml = "";
        if (ransomware.length > 0) {
            ransomwareHtml = ransomware.map(r => {
                const malware = r.malware || r.threat_type || 'Ransomware';
                const ioc = r.ioc.length > 50 ? r.ioc.substring(0, 50) + '...' : r.ioc;
                const confidence = r.confidence_level || 'Medium';
                return `
                    <li class="bg-slate-800 rounded-lg p-3 border-l-4 border-red-500">
                        <div class="flex justify-between items-start mb-2">
                            <span class="text-red-400 font-medium">${malware}</span>
                            <span class="text-xs px-2 py-1 rounded bg-red-900 text-red-200">${confidence}</span>
                        </div>
                        <div class="text-xs text-slate-400 font-mono">${ioc}</div>
                        <div class="text-xs text-slate-500 mt-1">${r.tags ? r.tags.join(', ') : 'Campanha ativa'}</div>
                    </li>
                `;
            }).join("");
        } else { 
            ransomwareHtml = "<li class='text-slate-400 text-center py-4'>🔍 Buscando campanhas de ransomware...</li>"; 
        }
        const ransomwareElement = document.getElementById("ransomware-campaigns-list");
        if (ransomwareElement) {
            ransomwareElement.innerHTML = ransomwareHtml;
        }

        // High-Risk Malware
        const malware = await getHighRiskMalware();
        let malwareHtml = "";
        if (malware.length > 0) {
            malwareHtml = malware.map(m => {
                const hash = m.sha256_hash ? m.sha256_hash.substring(0, 16) + '...' : 'N/A';
                const signature = m.signature || 'Unknown Malware';
                const fileType = m.file_type || 'Unknown';
                return `
                    <li class="bg-slate-800 rounded-lg p-3 border-l-4 border-orange-500">
                        <div class="flex justify-between items-start mb-2">
                            <span class="text-orange-400 font-medium">${signature}</span>
                            <span class="text-xs px-2 py-1 rounded bg-orange-900 text-orange-200">${fileType}</span>
                        </div>
                        <div class="text-xs text-slate-400 font-mono">${hash}</div>
                        <div class="text-xs text-slate-500 mt-1">Detectado recentemente</div>
                    </li>
                `;
            }).join("");
        } else { 
            malwareHtml = "<li class='text-slate-400 text-center py-4'>🔍 Buscando malwares de alto risco...</li>"; 
        }
        const malwareElement = document.getElementById("high-risk-malware-list");
        if (malwareElement) {
            malwareElement.innerHTML = malwareHtml;
        }

        // .BR Domains
        const brDomains = await getBrCompromisedDomains();
        let brDomainsHtml = "";
        if (brDomains.length > 0) {
            brDomainsHtml = brDomains.map(d => {
                const url = d.url.length > 60 ? d.url.substring(0, 60) + '...' : d.url;
                const threat = d.threat || 'Malicious';
                const status = d.url_status || 'Active';
                return `
                    <li class="bg-slate-800 rounded-lg p-3 border-l-4 border-yellow-500">
                        <div class="flex justify-between items-start mb-2">
                            <span class="text-yellow-400 font-medium">🇧🇷 Domínio .BR</span>
                            <span class="text-xs px-2 py-1 rounded bg-yellow-900 text-yellow-200">${threat}</span>
                        </div>
                        <div class="text-xs text-slate-400 break-all">${url}</div>
                        <div class="text-xs text-slate-500 mt-1">Status: ${status}</div>
                    </li>
                `;
            }).join("");
        } else { 
            brDomainsHtml = "<li class='text-slate-400 text-center py-4'>🔍 Buscando domínios .br comprometidos...</li>"; 
        }
        const brDomainsElement = document.getElementById("br-domains-list");
        if (brDomainsElement) {
            brDomainsElement.innerHTML = brDomainsHtml;
        }

        console.log('✅ Seções de threat intelligence atualizadas com sucesso');
    } catch (error) {
        console.error('❌ Erro ao renderizar seções de threat intelligence:', error);
    }
}

// 5. Simulação da API do DownDetector
function simulateDownDetectorAPI() {
    // Dados mocados baseados na análise do documento downdetector.docx
    const services = [
        { name: 'Microsoft Azure', status: 'major_outage', reports: 15420, trend: 'increasing', locations: ['BR', 'US'] },
        { name: 'Amazon AWS', status: 'minor_outage', reports: 2340, trend: 'stable', locations: ['US', 'EU'] },
        { name: 'Google Cloud', status: 'normal', reports: 450, trend: 'decreasing', locations: ['BR'] },
        { name: 'Cloudflare', status: 'normal', reports: 156, trend: 'stable', locations: ['EU'] },
        { name: 'WhatsApp', status: 'minor_outage', reports: 5890, trend: 'increasing', locations: ['BR', 'AR'] },
    ];
    return services.sort((a, b) => b.reports - a.reports);
}

// Renderizar o status do DownDetector com layout melhorado
function renderDownDetectorStatus() {
    const services = simulateDownDetectorAPI();
    let html = "";
    let onlineCount = 0, issuesCount = 0, downCount = 0;
    
    if (services.length > 0) {
        html = services.map(service => {
            // Contadores para o resumo
            if (service.status === 'normal') onlineCount++;
            else if (service.status === 'minor_outage') issuesCount++;
            else if (service.status === 'major_outage') downCount++;
            
            // Definir cores e ícones baseados no status
            let statusColor = 'bg-green-500';
            let statusText = 'Online';
            let statusIcon = '✅';
            let borderColor = 'border-green-500';
            let textColor = 'text-green-400';
            
            if (service.status === 'major_outage') {
                statusColor = 'bg-red-500';
                statusText = 'Offline';
                statusIcon = '🔴';
                borderColor = 'border-red-500';
                textColor = 'text-red-400';
            } else if (service.status === 'minor_outage') {
                statusColor = 'bg-yellow-500';
                statusText = 'Problemas';
                statusIcon = '⚠️';
                borderColor = 'border-yellow-500';
                textColor = 'text-yellow-400';
            }

            // Ícone de tendência
            let trendIcon = '➡️';
            let trendColor = 'text-slate-400';
            if (service.trend === 'increasing') {
                trendIcon = '📈';
                trendColor = 'text-red-400';
            } else if (service.trend === 'decreasing') {
                trendIcon = '📉';
                trendColor = 'text-green-400';
            }

            return `
                <div class="bg-slate-800 rounded-lg p-4 border-l-4 ${borderColor} hover:bg-slate-750 transition-colors">
                    <div class="flex items-center justify-between mb-3">
                        <div class="flex items-center space-x-3">
                            <div class="w-3 h-3 ${statusColor} rounded-full animate-pulse"></div>
                            <h4 class="font-semibold text-slate-200">${service.name}</h4>
                        </div>
                        <span class="text-xs px-2 py-1 rounded ${statusColor} text-white font-medium">${statusText}</span>
                    </div>
                    
                    <div class="space-y-2">
                        <div class="flex items-center justify-between">
                            <span class="text-sm text-slate-400">Relatórios</span>
                            <span class="font-bold ${textColor}">${service.reports.toLocaleString()}</span>
                        </div>
                        
                        <div class="flex items-center justify-between">
                            <span class="text-sm text-slate-400">Tendência</span>
                            <div class="flex items-center space-x-1">
                                <span class="${trendColor}">${trendIcon}</span>
                                <span class="text-xs ${trendColor} capitalize">${service.trend}</span>
                            </div>
                        </div>
                        
                        <div class="flex items-center justify-between">
                            <span class="text-sm text-slate-400">Regiões</span>
                            <div class="flex space-x-1">
                                ${service.locations.map(loc => `<span class="text-xs px-2 py-1 bg-slate-700 rounded text-slate-300">${loc}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Barra de Progresso baseada no número de relatórios -->
                    <div class="mt-3">
                        <div class="w-full bg-slate-700 rounded-full h-2">
                            <div class="${statusColor} h-2 rounded-full transition-all duration-500" style="width: ${Math.min((service.reports / 20000) * 100, 100)}%"></div>
                        </div>
                        <div class="text-xs text-slate-500 mt-1">Impacto: ${service.reports > 10000 ? 'Alto' : service.reports > 1000 ? 'Médio' : 'Baixo'}</div>
                    </div>
                </div>
            `;
        }).join("");
    } else {
        html = `
            <div class="col-span-full text-center py-8">
                <div class="text-4xl mb-2">✅</div>
                <p class="text-slate-400">Todos os serviços estão funcionando normalmente</p>
            </div>
        `;
    }
    
    // Atualizar o grid de serviços
    document.getElementById("downdetector-status").innerHTML = html;
    
    // Atualizar o resumo geral
    document.getElementById("services-online").textContent = onlineCount;
    document.getElementById("services-issues").textContent = issuesCount;
    document.getElementById("services-down").textContent = downCount;
    document.getElementById("total-services").textContent = services.length;
    
    // Atualizar timestamp
    const now = new Date();
    const timeString = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    document.getElementById("last-update-time").textContent = `Última atualização: ${timeString}`;
}




// Sistema de atualização automática para as novas seções
function startAutoUpdateNewSections() {
    console.log('🔄 Iniciando atualizações automáticas das novas seções...');
    
    // Atualizar a cada 10 minutos (600000ms)
    setInterval(async () => {
        console.log('🔄 Atualizando seções de threat intelligence...');
        try {
            await renderNewThreatIntelCards();
            renderDownDetectorStatus();
            console.log('✅ Seções atualizadas com sucesso');
        } catch (error) {
            console.error('❌ Erro ao atualizar seções:', error);
        }
    }, 600000); // 10 minutos
    
    // Atualizar DownDetector a cada 2 minutos (dados simulados podem variar)
    setInterval(() => {
        renderDownDetectorStatus();
    }, 120000); // 2 minutos
}

// Inicializar atualizações automáticas quando a página carregar
window.addEventListener("DOMContentLoaded", () => {
    // Renderização inicial
    renderThreatIntelCards();
    renderNewThreatIntelCards();
    renderDownDetectorStatus();
    
    // Iniciar atualizações automáticas
    startAutoUpdateNewSections();
});
