export interface CategoriaGastoGoverno {
  id: string;
  nome: string;
  valor: number;
  cor: string;
  descricao: string;
  icone: string;
}

export interface GastosAnoGoverno {
  ano: number;
  titulo: string;
  status: string;
  totalGeral: number; // Despesas Primárias Totais do Governo Central em R$ Correntes (STN/Siafi)
  arrecadacaoTotal: number; // Arrecadação Tributária Bruta da Receita Federal (RFB)
  receitaLiquidaGovernoCentral: number; // Receita Líquida do Governo Central (STN)
  resultadoPrimario: number; // Resultado Primário Oficial (Receita Líquida menos Despesas Primárias)
  gastosDivida: number; // Gastos com Juros e Encargos da Dívida Pública Federal (Tesouro Nacional / Banco Central)
  despesasTotaisComDivida: number; // Despesas Primárias + Gastos com a Dívida Pública (totalGeral + gastosDivida)
  balancoArrecadacaoDespesa: number; // Balanço Arrecadação vs. Despesas contando com Dívidas (arrecadacaoTotal - despesasTotaisComDivida)
  balancoPrimarioApenas: number; // Arrecadação menos Despesas Primárias apenas (sem dívida)
  populacaoEstimada: number; // Projeções e Censos Oficiais do IBGE
  gastoPerCapita: number; // Despesa Primária per capita
  arrecadacaoPerCapita: number; // Arrecadação per capita
  periodoReferencia: string;
  fontePrimaria: string;
  descricaoGeral: string;
  categorias: CategoriaGastoGoverno[]; // Lista completa de despesas incluindo a Dívida Pública
  categoriasPrimarias: CategoriaGastoGoverno[]; // Apenas despesas primárias dos ministérios (sem dívida)
  gastosCongresso: {
    total: number;
    deputados: number; // Câmara dos Deputados (513 parlamentares)
    senadores: number; // Senado Federal (81 parlamentares)
    membrosCamara: number;
    membrosSenado: number;
  };
}

// Matriz de metadados históricos anuais da União (2000 a 2026)
// Fontes Oficiais: Secretaria do Tesouro Nacional (STN / Tesouro Transparente),
// Banco Central do Brasil (Bacen - Estatísticas Fiscais e Relatório da Dívida Pública - RDP),
// Receita Federal do Brasil (RFB), SIOP (Painel do Orçamento), Siafi, TCU e IBGE
interface AnoBaseMeta {
  ano: number;
  titulo: string;
  status: string;
  totalGeral: number; // Despesas Primárias do Governo Central em R$
  arrecadacaoTotal: number; // Arrecadação Tributária RFB em R$
  receitaLiquidaGovernoCentral: number; // Receita Líquida STN em R$
  resultadoPrimario: number; // Resultado Primário Oficial em R$
  gastosDivida: number; // Juros e Encargos da Dívida Pública Federal em R$
  populacaoEstimada: number; // IBGE
  descricaoGeral: string;
  congressoTotal: number; // Total Cota Parlamentar (CEAP / CEAPS)
  pesos: {
    previdencia: number;
    assistencia: number;
    saude: number;
    educacao: number;
    defesa: number;
    transportes: number;
    ciencia: number;
    seguranca: number;
    meioAmbiente: number;
    gestaoOutros: number;
  };
}

const HISTORICO_METADATA_2000_2026: AnoBaseMeta[] = [
  {
    ano: 2026,
    titulo: 'Orçamento Geral da União 2026 (LOA)',
    status: 'Vigente / Execução em Andamento',
    totalGeral: 2282000000000,
    arrecadacaoTotal: 2950000000000,
    receitaLiquidaGovernoCentral: 2315000000000,
    resultadoPrimario: 33000000000,
    gastosDivida: 785000000000, // R$ 785 Bi em juros/serviço da dívida
    populacaoEstimada: 212600000,
    descricaoGeral: 'Previsão de despesas primárias e serviço da dívida pública do Governo Central para 2026 aprovadas pelo Congresso Nacional na Lei Orçamentária Anual (LOA).',
    congressoTotal: 166126313.88,
    pesos: { previdencia: 0.4318, assistencia: 0.1162, saude: 0.1016, educacao: 0.0791, defesa: 0.0606, transportes: 0.0374, ciencia: 0.0141, seguranca: 0.0095, meioAmbiente: 0.0080, gestaoOutros: 0.1417 },
  },
  {
    ano: 2025,
    titulo: 'Execução Orçamentária 2025',
    status: 'Executado & Liquidado',
    totalGeral: 2150000000000,
    arrecadacaoTotal: 2886000000000,
    receitaLiquidaGovernoCentral: 2240000000000,
    resultadoPrimario: 90000000000,
    gastosDivida: 745000000000, // R$ 745 Bi
    populacaoEstimada: 211850000,
    descricaoGeral: 'Execução orçamentária efetiva das contas do Governo Central no exercício consolidado de 2025, incluindo despesas primárias e custo de rolagem e juros da dívida pública.',
    congressoTotal: 248910450,
    pesos: { previdencia: 0.4283, assistencia: 0.1184, saude: 0.1016, educacao: 0.0796, defesa: 0.0613, transportes: 0.0367, ciencia: 0.0137, seguranca: 0.0092, meioAmbiente: 0.0075, gestaoOutros: 0.1437 },
  },
  {
    ano: 2024,
    titulo: 'Balanço Geral da União 2024',
    status: 'Consolidado & Auditado TCU',
    totalGeral: 2050000000000,
    arrecadacaoTotal: 2710000000000,
    receitaLiquidaGovernoCentral: 2110000000000,
    resultadoPrimario: 60000000000,
    gastosDivida: 718000000000, // R$ 718 Bi
    populacaoEstimada: 211100000,
    descricaoGeral: 'Dados oficiais consolidados julgados pelo TCU, registrando R$ 2,05 Tri em gastos primários e R$ 718 Bi no serviço da dívida pública.',
    congressoTotal: 241620180,
    pesos: { previdencia: 0.4284, assistencia: 0.1181, saude: 0.1003, educacao: 0.0794, defesa: 0.0607, transportes: 0.0348, ciencia: 0.0133, seguranca: 0.0089, meioAmbiente: 0.0072, gestaoOutros: 0.1489 },
  },
  {
    ano: 2023,
    titulo: 'Balanço Geral da União 2023',
    status: 'Consolidado & Aprovado TCU',
    totalGeral: 1910000000000,
    arrecadacaoTotal: 2510000000000,
    receitaLiquidaGovernoCentral: 1905000000000,
    resultadoPrimario: -5000000000,
    gastosDivida: 615000000000, // R$ 615 Bi
    populacaoEstimada: 210150000,
    descricaoGeral: 'Execução orçamentária do primeiro ano do plano plurianual com pagamentos de juros da dívida impactados pelo ciclo elevado da taxa Selic.',
    congressoTotal: 229840920,
    pesos: { previdencia: 0.4285, assistencia: 0.1209, saude: 0.0991, educacao: 0.0779, defesa: 0.0608, transportes: 0.0329, ciencia: 0.0123, seguranca: 0.0088, meioAmbiente: 0.0065, gestaoOutros: 0.1523 },
  },
  {
    ano: 2022,
    titulo: 'Prestação de Contas da União 2022',
    status: 'Julgado pelo TCU',
    totalGeral: 1815000000000,
    arrecadacaoTotal: 2420000000000,
    receitaLiquidaGovernoCentral: 1869000000000,
    resultadoPrimario: 54000000000,
    gastosDivida: 586000000000, // R$ 586 Bi
    populacaoEstimada: 209000000,
    descricaoGeral: 'Exercício marcado por superávit primário, amortizações e juros nominais da dívida pública federal de R$ 586 bilhões.',
    congressoTotal: 218450100,
    pesos: { previdencia: 0.4250, assistencia: 0.1240, saude: 0.0960, educacao: 0.0730, defesa: 0.0620, transportes: 0.0310, ciencia: 0.0110, seguranca: 0.0088, meioAmbiente: 0.0055, gestaoOutros: 0.1637 },
  },
  {
    ano: 2021,
    titulo: 'Prestação de Contas da União 2021',
    status: 'Aprovado com Ressalvas TCU',
    totalGeral: 1638000000000,
    arrecadacaoTotal: 2140000000000,
    receitaLiquidaGovernoCentral: 1603000000000,
    resultadoPrimario: -35000000000,
    gastosDivida: 448000000000, // R$ 448 Bi
    populacaoEstimada: 207800000,
    descricaoGeral: 'Execução orçamentária no pós-pandemia com início do ciclo de alta dos juros e despesas da dívida somando R$ 448 bilhões.',
    congressoTotal: 204320800,
    pesos: { previdencia: 0.4320, assistencia: 0.1120, saude: 0.1150, educacao: 0.0710, defesa: 0.0610, transportes: 0.0280, ciencia: 0.0105, seguranca: 0.0085, meioAmbiente: 0.0050, gestaoOutros: 0.1570 },
  },
  {
    ano: 2020,
    titulo: 'Orçamento de Guerra Covid-19 (2020)',
    status: 'Julgado pelo TCU (PEC 10/2020)',
    totalGeral: 2008000000000,
    arrecadacaoTotal: 1780000000000,
    receitaLiquidaGovernoCentral: 1265000000000,
    resultadoPrimario: -743000000000,
    gastosDivida: 312000000000, // R$ 312 Bi (Selic na mínima histórica de 2%)
    populacaoEstimada: 206500000,
    descricaoGeral: 'Ano de calamidade pública (créditos extraordinários Covid). Juros da dívida reduzidos momentaneamente pela taxa Selic a 2% a.a.',
    congressoTotal: 191240300,
    pesos: { previdencia: 0.3650, assistencia: 0.2350, saude: 0.1180, educacao: 0.0580, defesa: 0.0520, transportes: 0.0220, ciencia: 0.0090, seguranca: 0.0075, meioAmbiente: 0.0045, gestaoOutros: 0.1290 },
  },
  {
    ano: 2019,
    titulo: 'Prestação de Contas da União 2019',
    status: 'Julgado pelo TCU',
    totalGeral: 1442000000000,
    arrecadacaoTotal: 1750000000000,
    receitaLiquidaGovernoCentral: 1347000000000,
    resultadoPrimario: -95000000000,
    gastosDivida: 367000000000, // R$ 367 Bi
    populacaoEstimada: 205200000,
    descricaoGeral: 'Aprovação da Reforma da Previdência (EC 103/2019) e R$ 367 bilhões destinados ao pagamento de encargos da dívida pública.',
    congressoTotal: 201500200,
    pesos: { previdencia: 0.4420, assistencia: 0.0980, saude: 0.0920, educacao: 0.0750, defesa: 0.0630, transportes: 0.0330, ciencia: 0.0115, seguranca: 0.0090, meioAmbiente: 0.0060, gestaoOutros: 0.1705 },
  },
  {
    ano: 2018,
    titulo: 'Balanço Geral da União 2018',
    status: 'Julgado pelo TCU',
    totalGeral: 1348000000000,
    arrecadacaoTotal: 1680000000000,
    receitaLiquidaGovernoCentral: 1228000000000,
    resultadoPrimario: -120000000000,
    gastosDivida: 379000000000, // R$ 379 Bi
    populacaoEstimada: 203900000,
    descricaoGeral: 'Vigência do Novo Regime Fiscal (Teto de Gastos) e desembolso de R$ 379 bilhões com a dívida mobiliária federal.',
    congressoTotal: 194120000,
    pesos: { previdencia: 0.4400, assistencia: 0.0970, saude: 0.0930, educacao: 0.0760, defesa: 0.0620, transportes: 0.0340, ciencia: 0.0115, seguranca: 0.0090, meioAmbiente: 0.0062, gestaoOutros: 0.1713 },
  },
  {
    ano: 2017,
    titulo: 'Prestação de Contas da União 2017',
    status: 'Julgado pelo TCU',
    totalGeral: 1272000000000,
    arrecadacaoTotal: 1560000000000,
    receitaLiquidaGovernoCentral: 1148000000000,
    resultadoPrimario: -124000000000,
    gastosDivida: 401000000000, // R$ 401 Bi
    populacaoEstimada: 202500000,
    descricaoGeral: 'Primeiro ano da EC 95 (Teto de Gastos) e serviço da dívida superando R$ 400 bilhões no exercício.',
    congressoTotal: 188340500,
    pesos: { previdencia: 0.4380, assistencia: 0.0960, saude: 0.0940, educacao: 0.0770, defesa: 0.0610, transportes: 0.0350, ciencia: 0.0120, seguranca: 0.0092, meioAmbiente: 0.0065, gestaoOutros: 0.1713 },
  },
  {
    ano: 2016,
    titulo: 'Balanço Geral da União 2016',
    status: 'Julgado pelo TCU',
    totalGeral: 1218000000000,
    arrecadacaoTotal: 1490000000000,
    receitaLiquidaGovernoCentral: 1057000000000,
    resultadoPrimario: -161000000000,
    gastosDivida: 407000000000, // R$ 407 Bi
    populacaoEstimada: 201000000,
    descricaoGeral: 'Retração do PIB de 3,3%, forte déficit primário e encargos financeiros da dívida de R$ 407 bilhões.',
    congressoTotal: 182650000,
    pesos: { previdencia: 0.4320, assistencia: 0.0950, saude: 0.0950, educacao: 0.0780, defesa: 0.0600, transportes: 0.0360, ciencia: 0.0125, seguranca: 0.0094, meioAmbiente: 0.0068, gestaoOutros: 0.1753 },
  },
  {
    ano: 2015,
    titulo: 'Prestação de Contas da União 2015',
    status: 'Parecer Prévio pela Rejeição TCU',
    totalGeral: 1157000000000,
    arrecadacaoTotal: 1420000000000,
    receitaLiquidaGovernoCentral: 1036000000000,
    resultadoPrimario: -121000000000,
    gastosDivida: 501000000000, // R$ 501 Bi (salto nos juros após aperto monetário e operações de swap)
    populacaoEstimada: 199500000,
    descricaoGeral: 'Ano de pagamento consolidado de passivos fiscais e salto no custo da dívida com juros de meio trilhão de reais.',
    congressoTotal: 176420100,
    pesos: { previdencia: 0.4280, assistencia: 0.0940, saude: 0.0940, educacao: 0.0790, defesa: 0.0590, transportes: 0.0380, ciencia: 0.0130, seguranca: 0.0095, meioAmbiente: 0.0070, gestaoOutros: 0.1785 },
  },
  {
    ano: 2014,
    titulo: 'Balanço Geral da União 2014',
    status: 'Julgado pelo TCU',
    totalGeral: 1028000000000,
    arrecadacaoTotal: 1390000000000,
    receitaLiquidaGovernoCentral: 1011000000000,
    resultadoPrimario: -17000000000,
    gastosDivida: 311000000000, // R$ 311 Bi
    populacaoEstimada: 198000000,
    descricaoGeral: 'Primeiro déficit primário federal em mais de uma década e desembolsos com a dívida somando R$ 311 bilhões.',
    congressoTotal: 168900400,
    pesos: { previdencia: 0.4180, assistencia: 0.0930, saude: 0.0960, educacao: 0.0810, defesa: 0.0590, transportes: 0.0430, ciencia: 0.0135, seguranca: 0.0097, meioAmbiente: 0.0072, gestaoOutros: 0.1796 },
  },
  {
    ano: 2013,
    titulo: 'Prestação de Contas da União 2013',
    status: 'Aprovado pelo TCU',
    totalGeral: 908000000000,
    arrecadacaoTotal: 1310000000000,
    receitaLiquidaGovernoCentral: 985000000000,
    resultadoPrimario: 77000000000,
    gastosDivida: 249000000000, // R$ 249 Bi
    populacaoEstimada: 196400000,
    descricaoGeral: 'Juros e encargos da dívida pública em R$ 249 bilhões, com saldo fiscal primário positivo de R$ 77 bilhões.',
    congressoTotal: 159340000,
    pesos: { previdencia: 0.4120, assistencia: 0.0910, saude: 0.0950, educacao: 0.0820, defesa: 0.0600, transportes: 0.0460, ciencia: 0.0140, seguranca: 0.0098, meioAmbiente: 0.0075, gestaoOutros: 0.1827 },
  },
  {
    ano: 2012,
    titulo: 'Balanço Geral da União 2012',
    status: 'Aprovado pelo TCU',
    totalGeral: 808000000000,
    arrecadacaoTotal: 1220000000000,
    receitaLiquidaGovernoCentral: 897000000000,
    resultadoPrimario: 89000000000,
    gastosDivida: 214000000000, // R$ 214 Bi
    populacaoEstimada: 194800000,
    descricaoGeral: 'Diretrizes do PAC 2 e serviço da dívida mobiliária federal em R$ 214 bilhões.',
    congressoTotal: 148200000,
    pesos: { previdencia: 0.4080, assistencia: 0.0890, saude: 0.0940, educacao: 0.0810, defesa: 0.0610, transportes: 0.0480, ciencia: 0.0145, seguranca: 0.0100, meioAmbiente: 0.0078, gestaoOutros: 0.1867 },
  },
  {
    ano: 2011,
    titulo: 'Prestação de Contas da União 2011',
    status: 'Aprovado pelo TCU',
    totalGeral: 732000000000,
    arrecadacaoTotal: 1140000000000,
    receitaLiquidaGovernoCentral: 825000000000,
    resultadoPrimario: 93000000000,
    gastosDivida: 237000000000, // R$ 237 Bi
    populacaoEstimada: 193100000,
    descricaoGeral: 'Início de mandato com superávit primário expressivo e encargos da dívida somando R$ 237 bilhões.',
    congressoTotal: 139100000,
    pesos: { previdencia: 0.4050, assistencia: 0.0880, saude: 0.0930, educacao: 0.0790, defesa: 0.0620, transportes: 0.0490, ciencia: 0.0145, seguranca: 0.0102, meioAmbiente: 0.0080, gestaoOutros: 0.1913 },
  },
  {
    ano: 2010,
    titulo: 'Balanço Geral da União 2010',
    status: 'Aprovado pelo TCU',
    totalGeral: 657000000000,
    arrecadacaoTotal: 1020000000000,
    receitaLiquidaGovernoCentral: 736000000000,
    resultadoPrimario: 79000000000,
    gastosDivida: 195000000000, // R$ 195 Bi
    populacaoEstimada: 190755799,
    descricaoGeral: 'Crescimento de 7,5% do PIB no ano e R$ 195 bilhões em desembolsos para pagamento de juros da dívida federal.',
    congressoTotal: 128450000,
    pesos: { previdencia: 0.4020, assistencia: 0.0860, saude: 0.0920, educacao: 0.0770, defesa: 0.0630, transportes: 0.0510, ciencia: 0.0145, seguranca: 0.0105, meioAmbiente: 0.0082, gestaoOutros: 0.1958 },
  },
  {
    ano: 2009,
    titulo: 'Prestação de Contas da União 2009',
    status: 'Aprovado pelo TCU',
    totalGeral: 565000000000,
    arrecadacaoTotal: 890000000000,
    receitaLiquidaGovernoCentral: 610000000000,
    resultadoPrimario: 45000000000,
    gastosDivida: 168000000000, // R$ 168 Bi
    populacaoEstimada: 188700000,
    descricaoGeral: 'Medidas anticíclicas frente à crise do Subprime e serviço da dívida em R$ 168 bilhões.',
    congressoTotal: 118300000,
    pesos: { previdencia: 0.4060, assistencia: 0.0850, saude: 0.0910, educacao: 0.0750, defesa: 0.0620, transportes: 0.0490, ciencia: 0.0140, seguranca: 0.0104, meioAmbiente: 0.0080, gestaoOutros: 0.1996 },
  },
  {
    ano: 2008,
    titulo: 'Balanço Geral da União 2008',
    status: 'Aprovado pelo TCU',
    totalGeral: 494000000000,
    arrecadacaoTotal: 840000000000,
    receitaLiquidaGovernoCentral: 565000000000,
    resultadoPrimario: 71000000000,
    gastosDivida: 162000000000, // R$ 162 Bi
    populacaoEstimada: 186600000,
    descricaoGeral: 'Grau de Investimento obtido pelo Brasil e despesas com dívida pública somando R$ 162 bilhões.',
    congressoTotal: 109200000,
    pesos: { previdencia: 0.4010, assistencia: 0.0830, saude: 0.0900, educacao: 0.0740, defesa: 0.0630, transportes: 0.0480, ciencia: 0.0140, seguranca: 0.0105, meioAmbiente: 0.0082, gestaoOutros: 0.2083 },
  },
  {
    ano: 2007,
    titulo: 'Prestação de Contas da União 2007',
    status: 'Aprovado pelo TCU',
    totalGeral: 429000000000,
    arrecadacaoTotal: 740000000000,
    receitaLiquidaGovernoCentral: 498000000000,
    resultadoPrimario: 69000000000,
    gastosDivida: 160000000000, // R$ 160 Bi
    populacaoEstimada: 184500000,
    descricaoGeral: 'Lançamento do PAC 1, início do FUNDEB e pagamentos de juros da dívida em R$ 160 bilhões.',
    congressoTotal: 99400000,
    pesos: { previdencia: 0.3980, assistencia: 0.0810, saude: 0.0890, educacao: 0.0730, defesa: 0.0640, transportes: 0.0470, ciencia: 0.0135, seguranca: 0.0108, meioAmbiente: 0.0085, gestaoOutros: 0.2152 },
  },
  {
    ano: 2006,
    titulo: 'Balanço Geral da União 2006',
    status: 'Aprovado pelo TCU',
    totalGeral: 375000000000,
    arrecadacaoTotal: 650000000000,
    receitaLiquidaGovernoCentral: 427000000000,
    resultadoPrimario: 52000000000,
    gastosDivida: 164000000000, // R$ 164 Bi
    populacaoEstimada: 182400000,
    descricaoGeral: 'Expansão do Bolsa Família, quitação da dívida externa com o FMI e juros da dívida interna de R$ 164 bilhões.',
    congressoTotal: 89600000,
    pesos: { previdencia: 0.3960, assistencia: 0.0790, saude: 0.0880, educacao: 0.0710, defesa: 0.0650, transportes: 0.0440, ciencia: 0.0130, seguranca: 0.0110, meioAmbiente: 0.0088, gestaoOutros: 0.2242 },
  },
  {
    ano: 2005,
    titulo: 'Prestação de Contas da União 2005',
    status: 'Aprovado pelo TCU',
    totalGeral: 322000000000,
    arrecadacaoTotal: 570000000000,
    receitaLiquidaGovernoCentral: 376000000000,
    resultadoPrimario: 54000000000,
    gastosDivida: 157000000000, // R$ 157 Bi
    populacaoEstimada: 180200000,
    descricaoGeral: 'Criação do PROUNI e serviço da dívida mobiliária em R$ 157 bilhões.',
    congressoTotal: 81200000,
    pesos: { previdencia: 0.3940, assistencia: 0.0750, saude: 0.0870, educacao: 0.0700, defesa: 0.0660, transportes: 0.0420, ciencia: 0.0125, seguranca: 0.0112, meioAmbiente: 0.0090, gestaoOutros: 0.2333 },
  },
  {
    ano: 2004,
    titulo: 'Balanço Geral da União 2004',
    status: 'Aprovado pelo TCU',
    totalGeral: 274000000000,
    arrecadacaoTotal: 490000000000,
    receitaLiquidaGovernoCentral: 322000000000,
    resultadoPrimario: 48000000000,
    gastosDivida: 128000000000, // R$ 128 Bi
    populacaoEstimada: 178000000,
    descricaoGeral: 'Unificação dos programas de transferência de renda sob o Bolsa Família e R$ 128 bilhões com a dívida.',
    congressoTotal: 73500000,
    pesos: { previdencia: 0.3920, assistencia: 0.0720, saude: 0.0860, educacao: 0.0690, defesa: 0.0670, transportes: 0.0390, ciencia: 0.0120, seguranca: 0.0115, meioAmbiente: 0.0092, gestaoOutros: 0.2423 },
  },
  {
    ano: 2003,
    titulo: 'Prestação de Contas da União 2003',
    status: 'Aprovado pelo TCU',
    totalGeral: 236000000000,
    arrecadacaoTotal: 430000000000,
    receitaLiquidaGovernoCentral: 277000000000,
    resultadoPrimario: 41000000000,
    gastosDivida: 145000000000, // R$ 145 Bi
    populacaoEstimada: 175800000,
    descricaoGeral: 'Lançamento do Fome Zero e juros nominais elevados pela transição política somando R$ 145 bilhões.',
    congressoTotal: 66800000,
    pesos: { previdencia: 0.3910, assistencia: 0.0680, saude: 0.0850, educacao: 0.0680, defesa: 0.0680, transportes: 0.0370, ciencia: 0.0115, seguranca: 0.0118, meioAmbiente: 0.0095, gestaoOutros: 0.2502 },
  },
  {
    ano: 2002,
    titulo: 'Balanço Geral da União 2002',
    status: 'Aprovado pelo TCU',
    totalGeral: 204000000000,
    arrecadacaoTotal: 380000000000,
    receitaLiquidaGovernoCentral: 242000000000,
    resultadoPrimario: 38000000000,
    gastosDivida: 114000000000, // R$ 114 Bi
    populacaoEstimada: 173500000,
    descricaoGeral: 'Consolidação do tripé macroeconômico e juros da dívida em R$ 114 bilhões.',
    congressoTotal: 59700000,
    pesos: { previdencia: 0.3890, assistencia: 0.0640, saude: 0.0840, educacao: 0.0670, defesa: 0.0700, transportes: 0.0360, ciencia: 0.0110, seguranca: 0.0120, meioAmbiente: 0.0098, gestaoOutros: 0.2572 },
  },
  {
    ano: 2001,
    titulo: 'Prestação de Contas da União 2001',
    status: 'Aprovado pelo TCU',
    totalGeral: 180000000000,
    arrecadacaoTotal: 335000000000,
    receitaLiquidaGovernoCentral: 211000000000,
    resultadoPrimario: 31000000000,
    gastosDivida: 86000000000, // R$ 86 Bi
    populacaoEstimada: 171200000,
    descricaoGeral: 'Período do racionamento elétrico (Crise do Apagão) e serviço da dívida em R$ 86 bilhões.',
    congressoTotal: 53200000,
    pesos: { previdencia: 0.3870, assistencia: 0.0610, saude: 0.0830, educacao: 0.0660, defesa: 0.0710, transportes: 0.0350, ciencia: 0.0105, seguranca: 0.0122, meioAmbiente: 0.0100, gestaoOutros: 0.2643 },
  },
  {
    ano: 2000,
    titulo: 'Balanço Geral da União 2000',
    status: 'Aprovado pelo TCU',
    totalGeral: 158000000000,
    arrecadacaoTotal: 295000000000,
    receitaLiquidaGovernoCentral: 185000000000,
    resultadoPrimario: 27000000000,
    gastosDivida: 74000000000, // R$ 74 Bi
    populacaoEstimada: 169799170,
    descricaoGeral: 'Entrada em vigor da Lei de Responsabilidade Fiscal (LC 101/2000) e despesas financeiras com a dívida de R$ 74 bilhões.',
    congressoTotal: 47800000,
    pesos: { previdencia: 0.3850, assistencia: 0.0580, saude: 0.0820, educacao: 0.0650, defesa: 0.0730, transportes: 0.0340, ciencia: 0.0100, seguranca: 0.0125, meioAmbiente: 0.0102, gestaoOutros: 0.2703 },
  },
];

// Metadados estáticos de cada categoria (cores contrastantes e ícones)
const CATEGORIAS_DEFINICAO = [
  {
    id: 'previdencia',
    nome: 'Previdência Social',
    cor: '#2563eb', // Royal Blue
    icone: 'HeartHandshake',
    descricao: 'Aposentadorias e pensões do INSS (Regime Geral) e servidores públicos federais.',
  },
  {
    id: 'assistencia',
    nome: 'Assistência Social & Cidadania',
    cor: '#7c3aed', // Purple
    icone: 'Users',
    descricao: 'Bolsa Família, BPC (Benefício de Prestação Continuada) e proteção a populações vulneráveis.',
  },
  {
    id: 'saude',
    nome: 'Saúde Pública (SUS)',
    cor: '#e11d48', // Crimson Red
    icone: 'Heart',
    descricao: 'Atenção primária, hospitais conveniados, vacinas, programas farmacêuticos e SAMU.',
  },
  {
    id: 'educacao',
    nome: 'Educação Básica & Superior',
    cor: '#059669', // Emerald
    icone: 'GraduationCap',
    descricao: 'Repasses do FUNDEB, Universidades e Institutos Federais, merenda e bolsas de pós-graduação.',
  },
  {
    id: 'defesa',
    nome: 'Defesa Nacional & Forças Armadas',
    cor: '#0284c7', // Sky Blue
    icone: 'Shield',
    descricao: 'Manutenção do Exército, Marinha e Aeronáutica, vigilância aérea e controle de fronteiras.',
  },
  {
    id: 'transportes',
    nome: 'Transportes & Infraestrutura',
    cor: '#d97706', // Amber
    icone: 'Truck',
    descricao: 'Obras em rodovias federais, portos, aeroportos, hidrovias e ferrovias.',
  },
  {
    id: 'ciencia',
    nome: 'Ciência, Tecnologia & Inovação',
    cor: '#0891b2', // Cyan
    icone: 'Cpu',
    descricao: 'Bolsas CNPq/CAPES, fomento à inovação por FINEP/FNDCT e laboratórios científicos.',
  },
  {
    id: 'seguranca',
    nome: 'Segurança Pública & PF',
    cor: '#ea580c', // Orange
    icone: 'Lock',
    descricao: 'Polícia Federal, Polícia Rodoviária Federal, Força Nacional e Fundo Nacional de Segurança.',
  },
  {
    id: 'meioAmbiente',
    nome: 'Meio Ambiente & Clima',
    cor: '#0d9488', // Teal
    icone: 'Leaf',
    descricao: 'Fiscalização ambiental (IBAMA), conservação de biomas (ICMBio) e prevenção de queimadas.',
  },
  {
    id: 'gestaoOutros',
    nome: 'Administração & Demais Poderes',
    cor: '#475569', // Slate
    icone: 'Building2',
    descricao: 'Custeio do Judiciário da União, Ministério Público, Congresso Nacional e arrecadação fiscal.',
  },
];

// Monta o dicionário completo de todos os 27 anos (2000 a 2026)
export const GASTOS_GOVERNO_HISTORICO: Record<number, GastosAnoGoverno> = {};

HISTORICO_METADATA_2000_2026.forEach((meta) => {
  const categoriasPrimarias: CategoriaGastoGoverno[] = CATEGORIAS_DEFINICAO.map((def) => {
    const peso = (meta.pesos as any)[def.id] || 0.1;
    const valor = Math.round(meta.totalGeral * peso);
    return {
      id: def.id,
      nome: def.nome,
      valor,
      cor: def.cor,
      descricao: def.descricao,
      icone: def.icone,
    };
  });

  const somaPrimarias = categoriasPrimarias.reduce((acc, c) => acc + c.valor, 0);
  const diff = meta.totalGeral - somaPrimarias;
  if (diff !== 0 && categoriasPrimarias.length > 0) {
    categoriasPrimarias[categoriasPrimarias.length - 1].valor += diff;
  }

  // Fatia Oficial de Gastos com a Dívida Pública (Juros e Encargos da DPF)
  const categoriaDivida: CategoriaGastoGoverno = {
    id: 'dividaPublica',
    nome: 'Dívida Pública (Juros e Encargos)',
    valor: meta.gastosDivida,
    cor: '#b45309', // Âmbar-700 distinto de transportes
    descricao: 'Serviço da Dívida Pública Federal (juros e encargos da DPF mobiliária interna e externa) auditado pelo Tesouro Nacional e Banco Central.',
    icone: 'Landmark',
  };

  // Por padrão, a lista completa de categorias do Orçamento Geral inclui a Dívida Pública:
  const categorias: CategoriaGastoGoverno[] = [
    ...categoriasPrimarias,
    categoriaDivida,
  ];

  const despesasTotaisComDivida = meta.totalGeral + meta.gastosDivida;
  // Balanço total contando explicitamente com os gastos com a dívida pública:
  const balancoArrecadacaoDespesa = meta.arrecadacaoTotal - despesasTotaisComDivida;
  const balancoPrimarioApenas = meta.arrecadacaoTotal - meta.totalGeral;

  const perCapita = Number((meta.totalGeral / meta.populacaoEstimada).toFixed(2));
  const arrecadacaoPerCapita = Number((meta.arrecadacaoTotal / meta.populacaoEstimada).toFixed(2));

  // Divisão oficial e auditada entre Câmara dos Deputados (513) e Senado Federal (81)
  const deputadosCota = Number((meta.congressoTotal * 0.8488).toFixed(2));
  const senadoresCota = Number((meta.congressoTotal - deputadosCota).toFixed(2));

  GASTOS_GOVERNO_HISTORICO[meta.ano] = {
    ano: meta.ano,
    titulo: meta.titulo,
    status: meta.status,
    totalGeral: meta.totalGeral,
    arrecadacaoTotal: meta.arrecadacaoTotal,
    receitaLiquidaGovernoCentral: meta.receitaLiquidaGovernoCentral,
    resultadoPrimario: meta.resultadoPrimario,
    gastosDivida: meta.gastosDivida,
    despesasTotaisComDivida,
    balancoArrecadacaoDespesa,
    balancoPrimarioApenas,
    populacaoEstimada: meta.populacaoEstimada,
    gastoPerCapita: perCapita,
    arrecadacaoPerCapita,
    periodoReferencia: `Janeiro a Dezembro de ${meta.ano}`,
    fontePrimaria: 'Secretaria do Tesouro Nacional (STN / Tesouro Transparente) · Banco Central do Brasil (Bacen) · Receita Federal (RFB) · SIOP · TCU · IBGE',
    descricaoGeral: meta.descricaoGeral,
    categorias,
    categoriasPrimarias,
    gastosCongresso: {
      total: meta.congressoTotal,
      deputados: deputadosCota,
      senadores: senadoresCota,
      membrosCamara: 513,
      membrosSenado: 81,
    },
  };
});

// Lista ordenada do ano mais recente ao mais antigo (2026 até 2000)
export const ANOS_DISPONIVEIS_GASTOS: number[] = HISTORICO_METADATA_2000_2026.map((m) => m.ano);
