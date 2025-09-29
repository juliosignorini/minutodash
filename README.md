# Dashboard MinutoCyber - Inteligência Cibernética em Tempo Real

## 📊 Visão Geral

Dashboard interativo de cibersegurança que apresenta dados em tempo real sobre ameaças, vulnerabilidades, malware e indicadores de comprometimento (IOCs). Desenvolvido para fornecer uma visão executiva e técnica da situação de segurança cibernética.

## 🚀 Funcionalidades

### 📈 Métricas Principais
- **CVEs Críticas**: Monitoramento de vulnerabilidades críticas via NIST NVD
- **Alertas CISA**: Alertas oficiais do US-CERT
- **Análise de Malware**: Samples e famílias de malware ativas
- **IOCs**: Indicadores de comprometimento com reputação

### 🌍 Visualizações Interativas
- **Mapa Mundial de Ameaças**: Visualização geográfica de ameaças por país
- **Gráficos de Distribuição**: Severidade, países, setores atacados
- **Timeline Interativo**: Tendências de 7 dias com múltiplas métricas
- **Executive Risk Score**: Score de risco calculado algoritmicamente

### 🎯 Recursos Avançados
- **Busca Global**: Pesquisa unificada por IOCs, CVEs, APTs
- **Filtros Dinâmicos**: Por severidade, tipo e período temporal
- **Temas**: Alternância entre modo claro e escuro
- **Exportação**: YARA Rules, Sigma Rules, CSV, JSON
- **Responsivo**: Layout adaptável para desktop e mobile

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Gráficos**: Chart.js
- **APIs**: NIST NVD, CISA, VirusTotal, MITRE ATT&CK
- **Dados**: Feeds de threat intelligence em tempo real

## 📁 Estrutura do Projeto

```
dashboard-minutocyber/
├── index.html              # Arquivo principal do dashboard
├── world-map.png           # Imagem do mapa mundial
└── README.md              # Documentação do projeto
```

## 🎨 Correções Implementadas

### ✅ Botões de Filtro
- **Tema Escuro**: Fundo cinza escuro (#334155) harmonioso
- **Tema Claro**: Fundo cinza claro (#e8e8e8) consistente com caixas
- Efeitos hover apropriados para cada tema
- Transições suaves (0.2s)

### ✅ Dropdowns de Filtro
- **Tema Escuro**: Fundo cinza escuro matching com botões
- **Tema Claro**: Fundo cinza claro igual às caixas de conteúdo
- Bordas harmonizadas com cada tema
- Texto com contraste adequado

### ✅ Mapa Mundial
- **Imagem de fundo**: Mapa mundial real em vez de retângulos
- **Indicadores**: Círculos coloridos por país com dados de ameaças
- **Filtros funcionais**: Alto, Médio, Baixo
- **Interatividade**: Tooltips e botão de tela cheia

## 🚀 Como Usar

1. **Instalação**: Extraia o arquivo ZIP em um servidor web
2. **Acesso**: Abra `index.html` em um navegador moderno
3. **Navegação**: Use as abas para alternar entre seções
4. **Filtros**: Utilize os filtros para refinar visualizações
5. **Temas**: Alterne entre modo claro/escuro conforme preferência

## 📊 Seções do Dashboard

### 🎯 Executive
- Risk Score executivo
- Métricas de negócio
- Principais fatores de risco

### 🔥 Vulnerabilidades
- CVEs críticas do NIST NVD
- Distribuição por severidade
- Exploits ativos

### ⚠️ Ameaças
- Grupos APT ativos
- TTPs mapeados (MITRE ATT&CK)
- Campanhas ativas

### 🦠 Malware
- Análise de famílias
- Samples recentes
- Threat scores

### 🌍 Geo
- Mapa mundial interativo
- Distribuição por países
- Estatísticas geográficas

### 📰 News
- Digest semanal MinutoNews
- Relatórios de incidentes (RIC)
- Atualizações de segurança

## 🔧 Configuração

### Temas
O dashboard suporta alternância automática entre temas:
- **Escuro**: Padrão, otimizado para uso prolongado
- **Claro**: Alternativo, melhor para apresentações

### APIs
O dashboard integra com múltiplas fontes:
- NIST NVD (vulnerabilidades)
- CISA KEV (alertas críticos)
- VirusTotal (reputação de IOCs)
- MITRE ATT&CK (TTPs e grupos)

## 📈 Performance

- **Carregamento**: < 2s em conexões normais
- **Atualizações**: Dados em tempo real via APIs
- **Responsividade**: Otimizado para desktop e mobile
- **Compatibilidade**: Chrome, Firefox, Safari, Edge

## 🔒 Segurança

- **CSP**: Content Security Policy implementado
- **HTTPS**: Recomendado para produção
- **APIs**: Chaves de API não expostas no frontend
- **Sanitização**: Inputs sanitizados contra XSS

## 📝 Licença

Este projeto está licenciado sob CC BY-NC-SA 4.0 - veja os detalhes em [minutocyber.com](https://minutocyber.com)

## 👨‍💻 Autor

**Julio Signorini**  
MinutoCyber - Inteligência Cibernética  
[minutocyber.com](https://minutocyber.com)

## 🤝 Contribuições

Contribuições são bem-vindas! Por favor:
1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📞 Suporte

Para suporte técnico ou dúvidas:
- Website: [minutocyber.com](https://minutocyber.com)
- Email: contato@minutocyber.com

---

**Desenvolvido com ❤️ pela equipe MinutoCyber**
