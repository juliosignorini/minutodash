
====== MINUTODASH - INSTRUÇÕES DE DEPLOY E USO ======

1. O QUE É?
---------------
Dashboard web para apresentar indicadores de cyber threat intelligence e vulnerabilidades críticas, consultando APIs públicas de forma automatizada.

2. COMO PUBLICAR O DASHBOARD?
----------------------------
- Faça upload do conteúdo da pasta 'minutodash_v7/' para um host de arquivos estáticos (Vercel, Netlify, GitHub Pages, etc).
- NÃO é necessário backend Python/Node salvo se desejar orquestrar as APIs você mesmo (ver nota abaixo).
- Certifique-se de que todos arquivos estejam acessíveis publicamente.

3. FUNCIONAMENTO AUTOMÁTICO
---------------------------
- Os painéis e indicadores principais são atualizados automaticamente a cada 15 minutos.
- É exibido loading ao buscar dados, e mensagens de erro claras caso haja lentidão, erro de rede ou bloqueio do proxy CORS.
- Não é necessário recarregar a página para obter dados atualizados.

4. NOTAS SOBRE CORS E APIs
--------------------------
- Todas as consultas a APIs externas passam via proxy (https://api.allorigins.win). Se este proxy apresentar instabilidades, edite os arquivos JS e substitua por outro proxy CORS público disponível, ou crie seu micro-serviço relay.
- Para máximo controle e eliminação de riscos externos, recomenda-se eventualmente instalar backend próprio (Flask, Express) para orquestrar e proteger as chamadas.
