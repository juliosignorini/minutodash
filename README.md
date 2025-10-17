# 🛡️ minutodash | inteligência cibernética em tempo real.

Dashboard de cibersegurança em tempo real com métricas, alertas e análises de ameaças.

## ✨ Funcionalidades

- 📊 **Métricas em Tempo Real**: CVEs críticas, alertas CISA, análise de malware
- 🎯 **TTPs Mapeados**: Integração com framework MITRE ATT&CK
- 🗞️ **MinutoNews**: Digests semanais de tecnologia e cibersegurança
- 📋 **Relatórios RIC**: Relatórios semanais de incidentes cibernéticos
- 🌙 **Tema Claro/Escuro**: Alternância entre temas com persistência
- 📱 **Responsivo**: Funciona perfeitamente em desktop e mobile
- 🔄 **Auto Refresh**: Atualização automática a cada 5 minutos
- 🟢 **Status Dinâmico**: Indicador Online/Offline baseado em atividade

## 🆕 Novidades v7 (Outubro 2024)

### 🔧 Correções Implementadas
- **Duplicação de rodapés eliminada** na seção Analytics
- **Padronização completa** de caixas e indicadores em todas as seções
- **Consistência visual** aprimorada em todo o dashboard

### 🎨 Melhorias Visuais
- **Alinhamento à direita** dos títulos na seção Analytics
- **Emojis adicionados** aos indicadores das Estatísticas Adicionais
- **Layout modernizado** da seção minutocyber com formatação verde e bolinhas piscando
- **Fonte otimizada** para melhor equilíbrio visual e legibilidade

### 📊 Seção Analytics Aprimorada
- **Feeds de Dados**: Títulos alinhados à direita para melhor organização
- **Performance**: Layout consistente com outras seções
- **Fontes de Dados**: Formatação padronizada
- **Estatísticas Adicionais**: Indicadores com emojis e fonte aumentada
  - 🎯 **85%** Confidence
  - 🆕 **23** Novos IOCs  
  - 🚨 **12** Alertas
  - 📊 **4.2GB** Data/24h

### 🔐 Seção MinutoCyber Redesenhada
- **Layout moderno** com títulos à esquerda e descrições à direita
- **Formatação verde** com bolinhas piscando para indicar status "Live"
- **Seções organizadas**:
  - 📊 **+RIC** → Relatórios de Incidentes
  - 📰 **News** → Digest Tecnológico
  - ✍️ **Artigos** → Colunas Especializadas

## 🛠️ Tecnologias

- **Frontend**: HTML5, CSS3 (Tailwind), JavaScript ES6+
- **Gráficos**: Chart.js
- **Ícones**: Emojis nativos
- **Hospedagem**: Compatível com GitHub Pages, Vercel, Netlify

## 📦 Estrutura do Projeto

```
├── index.html              # Arquivo principal
├── minutodash.png          # Logo tema escuro
├── assets/
│   ├── images/
│   │   ├── minutodash_black.png    # Logo tema claro
│   │   ├── minutonews_dash.png     # Logo MinutoNews
│   │   └── creativecommons_64.png  # Ícone Creative Commons
│   ├── js/                 # Scripts auxiliares
│   │   ├── dashboard-automated.js   # Automação do dashboard
│   │   ├── section-footers.js      # Gerenciamento de rodapés
│   │   ├── api-integrations.js     # Integrações de API
│   │   └── extra-threat-intel.js   # Inteligência de ameaças
│   └── css/                # Estilos adicionais
├── AUDITORIA.txt          # Log de auditoria e melhorias
├── README_DEPLOY.txt      # Instruções de deploy
└── README.md              # Este arquivo
```

## 🚀 Deploy Rápido

### GitHub Pages
1. Fork este repositório
2. Vá em Settings > Pages
3. Source: Deploy from a branch
4. Branch: main / root
5. Salve e aguarde alguns minutos

### Vercel
1. Importe este repositório no Vercel
2. Deploy automático
3. URL personalizada disponível

### Netlify
1. Arraste a pasta do projeto para Netlify
2. Deploy instantâneo
3. Domínio personalizado gratuito

## 🔧 Configuração Local

```bash
# Clone o repositório
git clone https://github.com/SEU-USUARIO/minutodash.git

# Navegue para o diretório
cd minutodash

# Abra o index.html no navegador
# Ou use um servidor local:
python -m http.server 8000
# Acesse: http://localhost:8000
```

## 📊 Seções do Dashboard

### 🔥 Vulnerabilidades
- CVEs críticas do NIST NVD
- Alertas CISA atualizados
- Scores CVSS e impacto

### ⚠️ Ameaças
- Grupos APT ativos
- Países com mais ameaças
- Níveis de ameaça atuais

### 🦠 Malware
- Análise VirusTotal
- Famílias de malware ativas
- IOCs e indicadores

### 🌍 Geo
- Mapeamento geográfico de ameaças
- Análise por região e país
- Visualização interativa

### 🔐 MinutoCyber
- **+RIC**: Relatórios semanais de incidentes cibernéticos
- **News**: Digest tecnológico semanal curado
- **Artigos**: Colunas especializadas em cibersegurança

### 📈 Analytics
- **Feeds de Dados**: Métricas de performance e confiabilidade
- **Performance**: Estatísticas de sistema em tempo real
- **Fontes de Dados**: Integração com múltiplas APIs
- **Estatísticas Adicionais**: Indicadores avançados com emojis

### ⚙️ Infra Status
- Status de infraestrutura em tempo real
- Monitoramento de serviços críticos
- Indicadores de saúde do sistema

## 🎨 Temas

O dashboard suporta dois temas:

- 🌙 **Tema Escuro**: Padrão, ideal para uso prolongado
- ☀️ **Tema Claro**: Tons de cinza suaves, confortável para leitura

A preferência é salva automaticamente no navegador.

## 🔄 Atualizações

O dashboard inclui:
- ⏰ Auto refresh a cada 5 minutos
- 🔄 Botões de atualização manual
- 🟢 Status de conectividade dinâmico
- 📅 Timestamps atualizados
- 🎯 Indicadores "Live" em tempo real

## 📱 Compatibilidade

- ✅ Chrome/Chromium 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (design responsivo)

## 🎯 Qualidade e Performance

### Otimizações v7
- **Código limpo** e bem documentado
- **Performance aprimorada** com carregamento otimizado
- **Acessibilidade** melhorada com contraste adequado
- **Responsividade** testada em múltiplos dispositivos
- **Consistência visual** em todas as seções

### Métricas de Qualidade
- ✅ **Validação HTML5** completa
- ✅ **CSS otimizado** com Tailwind
- ✅ **JavaScript modular** e eficiente
- ✅ **Compatibilidade cross-browser** testada

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para detalhes.

## 🔗 Links Úteis

- [minutocyber](https://minutocyber.com/)
- [minutonews](https://news.minutocyber.com/)
- [minutocyber | RIC](https://minutocyber.com/ric)

## 📞 Suporte

Para dúvidas ou sugestões:
- 📧 Abra uma issue neste repositório
- 🌐 Visite [minutocyber.com](https://minutocyber.com/)

---

**MinutoDash v7** - Dashboard de cibersegurança profissional com design moderno e funcionalidades avançadas.
