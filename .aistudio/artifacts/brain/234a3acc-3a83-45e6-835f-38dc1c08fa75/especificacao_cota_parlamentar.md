# Especificação Técnica: Módulo de Cota Parlamentar (CEAP / CEAPS)

## 1. Estratégia de Ingestão de Dados (ETL / Cron Job)
- **Fontes Oficiais**:
  - **Câmara dos Deputados**: API REST v2 (`https://dadosabertos.camara.leg.br/api/v2/deputados/{id}/despesas`).
  - **Senado Federal**: Dados Abertos do Senado / Portal da Transparência (`https://dadosabertos.senado.leg.br/rest/v1/senador/{id}/despesas/ceaps`).
  - **Deduplicação & Validação**: Checagem de hash SHA-256 (`numDocumento + cnpjCpfFornecedor + valorLiquido + dataDocumento`).
- **Rotina de Sincronização (Cron)**:
  - Execução diária às 03:00 (janela de menor tráfego da API pública).
  - Webhooks de fallback e cache Redis/Memory TTL de 12 horas.

## 2. Modelagem de Dados Relacional (PostgreSQL)
- Tabelas: `despesas_cota_parlamentar`, `cotas_limites_mensais_uf`, `politico_cota_mensal_resumo`.
- Índices otimizados para agregação temporal (`politico_id`, `ano`, `mes`) e ranking por categoria.

## 3. Arquitetura de API / Endpoints Internos
- `GET /api/politicos/:id/cota-parlamentar/resumo`: Acumulado anual, mandato, média mensal, categoria líder.
- `GET /api/politicos/:id/cota-parlamentar/mensal`: Série histórica mês a mês com sinalização de limite (>90%).
- `GET /api/politicos/:id/cota-parlamentar/despesas`: Lista paginada de notas fiscais com URL do comprovante original.
- `GET /api/politicos/:id/cota-parlamentar/benchmark`: Comparativo do parlamentar vs média dos colegas do mesmo estado e mesmo partido.

## 4. Especificação de UI/UX
- **KPI Cards**: Total Ano, Total Mandato, Média Mensal, % do Limite Utilizado.
- **Gráfico de Rosca / Barras Horizontais**: Distribuição por tipo de gasto (Passagens, Divulgação, Locação, Combustível, Consultoria).
- **Filtro Mensal Dinâmico**: Seletor compacto por ano/mês com alertas visuais para meses com consumo superior a 90% do teto.
- **Tabela de Comprovantes Oficiais**: CNPJ/Nome do fornecedor, valor, data e link direto de auditoria da NF-e no portal da Câmara/Senado.
