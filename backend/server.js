const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Cache simples para evitar muitas requisições
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

function getFromCache(key) {
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return cached.data;
    }
    return null;
}

function setCache(key, data) {
    cache.set(key, {
        data,
        timestamp: Date.now()
    });
}

// Dados simulados realistas baseados nos formatos reais das APIs
function generateRealisticThreatFoxData() {
    const malwareFamilies = ['LockBit', 'BlackCat', 'Royal', 'Play', 'Clop', 'BianLian', 'Akira'];
    const iocTypes = ['url', 'domain', 'ip:port', 'md5_hash', 'sha256_hash'];
    const confidenceLevels = ['High', 'Medium', 'Low'];
    
    const data = [];
    for (let i = 0; i < 15; i++) {
        const malware = malwareFamilies[Math.floor(Math.random() * malwareFamilies.length)];
        const iocType = iocTypes[Math.floor(Math.random() * iocTypes.length)];
        const confidence = confidenceLevels[Math.floor(Math.random() * confidenceLevels.length)];
        
        let iocValue;
        switch (iocType) {
            case 'url':
                iocValue = `hxxp://malicious-${Math.random().toString(36).substring(7)}.onion/panel`;
                break;
            case 'domain':
                iocValue = `${malware.toLowerCase()}-${Math.random().toString(36).substring(7)}.com`;
                break;
            case 'ip:port':
                iocValue = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}:${8000 + Math.floor(Math.random() * 1000)}`;
                break;
            case 'md5_hash':
                iocValue = Array(32).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
                break;
            case 'sha256_hash':
                iocValue = Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
                break;
        }
        
        data.push({
            id: `${Date.now()}_${i}`,
            ioc: iocValue,
            ioc_type: iocType,
            malware: malware,
            malware_printable: malware,
            malware_alias: null,
            malware_malpedia: `https://malpedia.caad.fkie.fraunhofer.de/details/${malware.toLowerCase()}`,
            confidence_level: confidence,
            first_seen: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
            last_seen: null,
            reference: `https://twitter.com/malware_traffic/status/${Math.floor(Math.random() * 1000000000000000)}`,
            reporter: `researcher_${Math.floor(Math.random() * 100)}`,
            tags: ['ransomware', malware.toLowerCase(), 'c2']
        });
    }
    
    return data;
}

function generateRealisticMalwareBazaarData() {
    const signatures = [
        'Trojan.Win32.Emotet', 'Backdoor.Win32.Qakbot', 'Trojan.Win32.IcedID',
        'Ransomware.Win32.LockBit', 'Stealer.Win32.RedLine', 'RAT.Win32.AsyncRAT',
        'Trojan.Win32.Dridex', 'Backdoor.Win32.Cobalt', 'Stealer.Win32.Vidar'
    ];
    
    const fileTypes = ['exe', 'dll', 'doc', 'pdf', 'zip', 'scr'];
    
    const data = [];
    for (let i = 0; i < 12; i++) {
        const signature = signatures[Math.floor(Math.random() * signatures.length)];
        const fileType = fileTypes[Math.floor(Math.random() * fileTypes.length)];
        
        data.push({
            sha256_hash: Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
            sha1_hash: Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
            md5_hash: Array(32).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
            first_seen: new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000).toISOString(),
            last_seen: null,
            file_name: `malware_sample_${i + 1}.${fileType}`,
            file_size: Math.floor(Math.random() * 5000000) + 100000,
            file_type_mime: fileType === 'exe' ? 'application/x-dosexec' : `application/${fileType}`,
            file_type: fileType.toUpperCase(),
            reporter: `analyst_${Math.floor(Math.random() * 50)}`,
            anonymous: 0,
            signature: signature,
            imphash: Array(32).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
            ssdeep: `${Math.floor(Math.random() * 10000)}:${Array(10).fill(0).map(() => Math.random().toString(36).charAt(0)).join('')}`,
            tlsh: `T1${Array(70).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
            tags: [signature.split('.')[2].toLowerCase(), 'malware', 'windows'],
            intelligence: {
                clamav: [`${signature.replace(/\./g, '_')}_${Math.floor(Math.random() * 1000)}`],
                downloads: Math.floor(Math.random() * 500) + 10,
                uploads: 1,
                mail: null
            }
        });
    }
    
    return data;
}

function generateRealisticUrlhausData() {
    const brDomains = [
        'banco-brasil-seguro.com.br', 'caixa-economica.net.br', 'correios-rastreio.org.br',
        'receita-federal.gov.br.fake.com', 'detran-consulta.com.br', 'inss-beneficios.net.br',
        'bradesco-internet.com.br.phishing.net', 'itau-bankline.org.br'
    ];
    
    const threats = ['phishing', 'malware', 'c2', 'exploit'];
    const statuses = ['online', 'offline', 'unknown'];
    
    const data = [];
    for (let i = 0; i < 10; i++) {
        const domain = brDomains[Math.floor(Math.random() * brDomains.length)];
        const threat = threats[Math.floor(Math.random() * threats.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const path = ['/', '/login', '/portal', '/acesso', '/validacao', '/confirmacao'][Math.floor(Math.random() * 6)];
        
        data.push({
            id: Date.now() + i,
            urlhaus_reference: `https://urlhaus.abuse.ch/url/${Math.floor(Math.random() * 1000000)}/`,
            url: `https://${domain}${path}`,
            url_status: status,
            host: domain,
            date_added: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            threat: threat,
            blacklists: {
                spamhaus_dbl: status === 'online' ? 'listed' : 'not listed',
                surbl: status === 'online' ? 'listed' : 'not listed'
            },
            reporter: `security_researcher_${Math.floor(Math.random() * 100)}`,
            larted: status === 'offline' ? 'true' : 'false',
            takedown_time_seconds: status === 'offline' ? Math.floor(Math.random() * 86400) : null,
            tags: [threat, 'brazil', 'phishing']
        });
    }
    
    return data;
}

// Endpoint para ThreatFox API (Campanhas de Ransomware)
app.post('/api/threatfox', async (req, res) => {
    try {
        console.log('🔄 Gerando dados simulados do ThreatFox...');
        
        const cacheKey = 'threatfox_ransomware';
        const cached = getFromCache(cacheKey);
        if (cached) {
            console.log('✅ Dados do ThreatFox obtidos do cache');
            return res.json(cached);
        }

        // Simular dados realistas baseados no formato real da API
        const simulatedData = generateRealisticThreatFoxData();
        
        // Filtrar por ransomware
        const ransomwareCampaigns = simulatedData.filter(ioc => 
            ioc.tags && ioc.tags.some(tag => tag.toLowerCase().includes('ransomware')) ||
            (ioc.malware && ['LockBit', 'BlackCat', 'Royal', 'Play', 'Clop'].includes(ioc.malware))
        ).slice(0, 8);

        setCache(cacheKey, ransomwareCampaigns);
        console.log(`✅ ThreatFox: ${ransomwareCampaigns.length} campanhas de ransomware geradas (dados simulados realistas)`);
        res.json(ransomwareCampaigns);

    } catch (error) {
        console.error('❌ Erro ao gerar dados do ThreatFox:', error.message);
        res.status(500).json({ 
            error: 'Erro ao gerar dados do ThreatFox',
            details: error.message 
        });
    }
});

// Endpoint para MalwareBazaar API (Malwares de Alto Risco)
app.post('/api/malwarebazaar', async (req, res) => {
    try {
        console.log('🔄 Gerando dados simulados do MalwareBazaar...');
        
        const cacheKey = 'malwarebazaar_highrisk';
        const cached = getFromCache(cacheKey);
        if (cached) {
            console.log('✅ Dados do MalwareBazaar obtidos do cache');
            return res.json(cached);
        }

        // Simular dados realistas baseados no formato real da API
        const simulatedData = generateRealisticMalwareBazaarData();
        
        // Filtrar por malwares de alto risco
        const highRiskMalware = simulatedData.filter(malware => 
            malware.signature && (
                malware.signature.toLowerCase().includes('trojan') ||
                malware.signature.toLowerCase().includes('ransomware') ||
                malware.signature.toLowerCase().includes('backdoor') ||
                malware.signature.toLowerCase().includes('stealer')
            )
        ).slice(0, 10);

        setCache(cacheKey, highRiskMalware);
        console.log(`✅ MalwareBazaar: ${highRiskMalware.length} malwares de alto risco gerados (dados simulados realistas)`);
        res.json(highRiskMalware);

    } catch (error) {
        console.error('❌ Erro ao gerar dados do MalwareBazaar:', error.message);
        res.status(500).json({ 
            error: 'Erro ao gerar dados do MalwareBazaar',
            details: error.message 
        });
    }
});

// Endpoint para URLhaus API (Domínios .BR Comprometidos)
app.get('/api/urlhaus', async (req, res) => {
    try {
        console.log('🔄 Gerando dados simulados do URLhaus...');
        
        const cacheKey = 'urlhaus_br_domains';
        const cached = getFromCache(cacheKey);
        if (cached) {
            console.log('✅ Dados do URLhaus obtidos do cache');
            return res.json(cached);
        }

        // Simular dados realistas baseados no formato real da API
        const simulatedData = generateRealisticUrlhausData();

        setCache(cacheKey, simulatedData);
        console.log(`✅ URLhaus: ${simulatedData.length} domínios .br comprometidos gerados (dados simulados realistas)`);
        res.json(simulatedData);

    } catch (error) {
        console.error('❌ Erro ao gerar dados do URLhaus:', error.message);
        res.status(500).json({ 
            error: 'Erro ao gerar dados do URLhaus',
            details: error.message 
        });
    }
});

// Endpoint para Docker Hub Status (completar a seção Infra Status)
app.get('/api/docker-status', async (req, res) => {
    try {
        console.log('🔄 Buscando status do Docker Hub...');
        
        const cacheKey = 'docker_status';
        const cached = getFromCache(cacheKey);
        if (cached) {
            console.log('✅ Status do Docker Hub obtido do cache');
            return res.json(cached);
        }

        // Tentar buscar dados reais primeiro
        try {
            const response = await fetch("https://status.docker.com/api/v2/status.json", {
                headers: {
                    "User-Agent": "MinutoDash-Backend/1.0"
                },
                timeout: 5000
            });

            if (response.ok) {
                const data = await response.json();
                setCache(cacheKey, data);
                console.log('✅ Status do Docker Hub obtido com sucesso (dados reais)');
                return res.json(data);
            }
        } catch (fetchError) {
            console.log('⚠️ Não foi possível obter dados reais do Docker, usando simulação');
        }

        // Fallback para dados simulados
        const simulatedData = {
            page: {
                id: "docker",
                name: "Docker Hub",
                url: "https://status.docker.com",
                time_zone: "Etc/UTC",
                updated_at: new Date().toISOString()
            },
            status: {
                indicator: Math.random() > 0.1 ? "none" : "minor",
                description: Math.random() > 0.1 ? "All Systems Operational" : "Minor Service Outage"
            }
        };

        setCache(cacheKey, simulatedData);
        console.log('✅ Status do Docker Hub gerado (dados simulados)');
        res.json(simulatedData);

    } catch (error) {
        console.error('❌ Erro ao buscar status do Docker:', error.message);
        res.status(500).json({ 
            error: 'Erro ao buscar status do Docker Hub',
            details: error.message 
        });
    }
});

// Endpoint de health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        cache_size: cache.size,
        mode: 'simulation_with_real_fallback',
        note: 'APIs simuladas com dados realistas baseados nos formatos reais'
    });
});

// Endpoint para listar cache (debug)
app.get('/cache', (req, res) => {
    const cacheInfo = {};
    for (const [key, value] of cache.entries()) {
        cacheInfo[key] = {
            timestamp: new Date(value.timestamp).toISOString(),
            age_minutes: Math.round((Date.now() - value.timestamp) / 60000),
            data_size: JSON.stringify(value.data).length,
            entries_count: Array.isArray(value.data) ? value.data.length : 1
        };
    }
    res.json(cacheInfo);
});

app.listen(PORT, () => {
    console.log(`🚀 Backend proxy rodando na porta ${PORT}`);
    console.log(`📡 Endpoints disponíveis:`);
    console.log(`   POST /api/threatfox - Campanhas de Ransomware (simulado)`);
    console.log(`   POST /api/malwarebazaar - Malwares de Alto Risco (simulado)`);
    console.log(`   GET /api/urlhaus - Domínios .BR Comprometidos (simulado)`);
    console.log(`   GET /api/docker-status - Status do Docker Hub (real + fallback)`);
    console.log(`   GET /health - Health Check`);
    console.log(`   GET /cache - Cache Info`);
    console.log(`🎭 Modo: Simulação com dados realistas baseados nos formatos reais das APIs`);
    console.log(`💡 Nota: Para usar dados reais, configure Auth-Keys em https://auth.abuse.ch/`);
});
