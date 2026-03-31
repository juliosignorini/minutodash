# MinutoDash 🛡️

**Cyber Threat Intelligence Dashboard** — Dashboard em tempo real para monitoramento de ameaças cibernéticas, vulnerabilidades e inteligência de segurança.

## 🎯 Visão Geral

MinutoDash é um dashboard moderno e interativo construído com **React 19**, **Tailwind CSS 4** e **shadcn/ui** que oferece visibilidade completa sobre o panorama de ameaças cibernéticas. Integra dados de múltiplas APIs de inteligência de ameaças para fornecer insights em tempo real sobre CVEs, malware, APT groups e origem geográfica de ataques.

## ✨ Recursos Principais

### 📊 Seções do Dashboard

1. **Painel de Ameaças** — Visão geral com CVEs críticas, nível de ameaça global, security advisories e APT groups rastreados
2. **Executive Risk Score** — Score de risco global calculado em tempo real com fatores de risco e evolução temporal
3. **Vulnerabilidades** — Timeline de ameaças (30 dias) e distribuição por severidade com animação de entrada
4. **Inteligência de Ameaças** — Abas com APT Groups, Advisories e CVEs Críticas Recentes (dados NVD LIVE)
5. **Malware & Setores** — Distribuição de malware com dados dinâmicos e setores mais afetados
6. **Origem Geográfica de Ameaças** — Mapa-múndi minimalista com zoom por região (Mundo, América Latina, Europa, Ásia)
7. **Analytics** — Gráficos de tendências e distribuição de ameaças
8. **Status de Serviços** — Monitoramento de status de APIs e serviços críticos (GitHub, Notion, etc.)
9. **Infraestrutura** — Status de componentes críticos de infraestrutura

### 🎨 Design & UX

- **Tema escuro premium** com paleta de cores estratégica para análise de segurança
- **Animações fluidas** com Framer Motion (entrada em cascata, preenchimento de progress bars, transições de zoom)
- **Mapa interativo** com react-simple-maps — zoom por região, tooltips detalhados, dots animados
- **Progress bars horizontais** com gradiente e glow para distribuição de severidade
- **Responsivo** — funciona em desktop, tablet e mobile
- **Acessibilidade** — foco em contraste, navegação por teclado e ARIA labels

### 🔌 Integrações de API

- **NVD (NIST)** — CVEs críticas, distribuição por severidade (chamadas serializadas com retry)
- **DShield** — Ameaças globais e IPs atacantes
- **MITRE ATT&CK** — Grupos APT e técnicas de ataque
- **GitHub Status** — Status da API GitHub
- **Notion Status** — Status do Notion
- **StatusPage** — Monitoramento de múltiplos serviços

## 🚀 Como Usar

### Pré-requisitos

- Node.js 22.x ou superior
- pnpm (recomendado) ou npm/yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/minutodash.git
cd minutodash

# Instale as dependências
pnpm install

# Inicie o servidor de desenvolvimento
pnpm dev
```

O dashboard estará disponível em `http://localhost:3000`

### Build para Produção

```bash
# Build otimizado
pnpm build

# Preview do build
pnpm preview
```

## 📁 Estrutura do Projeto

```
minutodash/
├── client/
│   ├── public/              # Assets estáticos
│   ├── src/
│   │   ├── components/      # Componentes React reutilizáveis
│   │   │   ├── sections/    # Seções do dashboard
│   │   │   ├── ui/          # Componentes shadcn/ui
│   │   │   ├── InteractiveThreatMap.tsx
│   │   │   ├── DashboardHeader.tsx
│   │   │   └── SourceFooter.tsx
│   │   ├── pages/           # Páginas (Home)
│   │   ├── hooks/           # Custom hooks (useApiData, etc.)
│   │   ├── lib/             # Utilitários (apiService, data, etc.)
│   │   ├── contexts/        # React contexts
│   │   ├── App.tsx          # Roteamento principal
│   │   ├── main.tsx         # Entry point React
│   │   └── index.css        # Design tokens globais
│   └── index.html           # HTML template
├── server/                  # Placeholder para compatibilidade
├── shared/                  # Placeholder para compatibilidade
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## 🛠️ Stack Tecnológico

| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| React | 19 | Framework UI |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4 | Styling |
| shadcn/ui | Latest | Componentes UI |
| Recharts | Latest | Gráficos e visualizações |
| react-simple-maps | Latest | Mapa interativo |
| Framer Motion | Latest | Animações |
| Wouter | Latest | Roteamento client-side |
| Vite | 7.x | Build tool |

## 🎨 Design Philosophy

- **Cyber Intelligence Briefing** — Layout premium inspirado em briefings de inteligência
- **Funcional & Elegante** — Prioriza clareza de informação sem sacrificar estética
- **Minimalismo Estratégico** — Sem elementos decorativos desnecessários
- **Cores Semânticas** — Vermelho (crítico), Laranja (alto), Amarelo (médio), Verde (baixo)
- **Animações Propositais** — Cada animação comunica estado ou transição

## 📊 Dados & APIs

### Fontes de Dados

- **NVD (NIST)** — National Vulnerability Database (CVEs)
- **DShield** — Internet Storm Center (ameaças globais)
- **MITRE ATT&CK** — Grupos APT e técnicas
- **GitHub Status API** — Status de serviços GitHub
- **Notion Status** — Status do Notion
- **StatusPage** — Monitoramento de infraestrutura

### Tratamento de Dados

- **Deduplicação** — Evita chamadas duplicadas do React Strict Mode
- **Serialização** — Chamadas NVD serializadas com delay para evitar rate limiting
- **Retry Logic** — Até 2 tentativas com backoff exponencial
- **Cache** — Dados cacheados por 5 minutos (configurável)

## 🔒 Segurança

- **HTTPS** — Todas as chamadas de API via HTTPS
- **CORS** — Proxy Manus para contornar restrições CORS
- **No Secrets** — Nenhuma chave de API armazenada no código
- **Environment Variables** — Configurações sensíveis via `.env`

## 🚀 Deployment

### Manus (Recomendado)

```bash
# Publicar via Manus UI
# 1. Salve um checkpoint
# 2. Clique em "Publish" na Management UI
# 3. Escolha domínio customizado ou use o auto-gerado
```

### GitHub Pages / Vercel / Netlify

```bash
# Build estático
pnpm build

# Deploy do diretório dist/
```

## 📝 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local`:

```env
VITE_APP_TITLE=MinutoDash
VITE_APP_LOGO=https://seu-logo-url.com/logo.svg
VITE_ANALYTICS_ENDPOINT=https://seu-analytics.com
VITE_ANALYTICS_WEBSITE_ID=seu-id
```

## 🐛 Troubleshooting

### Dados NVD não carregam

- Verifique a conexão com a internet
- O NVD tem rate limiting — aguarde alguns segundos
- Verifique os logs do browser console

### Mapa não aparece

- Verifique se o arquivo TopoJSON está acessível (CDN)
- Limpe o cache do browser
- Tente recarregar a página

### Animações lentas

- Desative extensões do browser que modificam CSS
- Verifique a performance do GPU
- Reduza a qualidade de animações em dispositivos lentos

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a MIT License — veja o arquivo LICENSE para detalhes.

## 👨‍💻 Autor

Desenvolvido como uma solução de cyber threat intelligence dashboard.

## 🙏 Agradecimentos

- NIST NVD por dados de vulnerabilidades
- MITRE ATT&CK pela framework de técnicas
- Comunidade open-source React/Tailwind
- shadcn/ui pelos componentes premium

## 📞 Suporte

Para suporte, abra uma issue no GitHub ou entre em contato através de [seu-email@example.com].

---

**Última atualização:** Março 2026  
**Versão:** 1.0.0  
**Status:** ✅ Produção
