// server-apis-complete.js

// NIST NVD Integration
const nistNvdApi = require('nist-nvd');

// CISA Integration
const cisaApi = require('cisa');

// CERT.BR Integration
const certBrApi = require('cert-br');

// VirusTotal Integration
const virusTotalApi = require('virustotal-api');

// ThreatFox Integration
const threatFoxApi = require('threatfox');

// URLhaus Integration
const urlhausApi = require('urlhaus');

// MITRE ATT&CK Integration
const mitreAttackApi = require('mitre-attack');

// Shodan Integration
const shodanApi = require('shodan-api');

// AlienVault OTX Integration
const alienVaultApi = require('alienvault');

module.exports = {
    nistNvdApi,
    cisaApi,
    certBrApi,
    virusTotalApi,
    threatFoxApi,
    urlhausApi,
    mitreAttackApi,
    shodanApi,
    alienVaultApi
}; 
