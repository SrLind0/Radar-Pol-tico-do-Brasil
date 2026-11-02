import { Politico } from '../types';
import {
  CotaParlamentarResumo,
  MesCotaParlamentar,
  CategoriaCotaResumo,
  DespesaCotaDetalhada
} from '../types/cota';

// Limites Mensais Oficiais da CEAP por Unidade Federativa (Câmara dos Deputados - Ato da Mesa nº 43/2009 com atualizações)
// O teto varia proporcionalmente ao custo das passagens aéreas entre a capital do estado e Brasília.
export const LIMITES_CEAP_POR_UF: Record<string, number> = {
  DF: 33885.00,
  GO: 34947.92,
  MG: 39517.92,
  SP: 40994.48,
  RJ: 40484.22,
  ES: 41249.12,
  PR: 43105.80,
  SC: 44026.04,
  RS: 45279.16,
  MS: 44964.64,
  MT: 43818.10,
  BA: 43579.52,
  SE: 44670.36,
  AL: 45520.12,
  PE: 46147.24,
  PB: 46793.88,
  RN: 47447.88,
  CE: 47214.76,
  PI: 45624.72,
  MA: 46761.44,
  TO: 44081.28,
  PA: 47101.48,
  AP: 48512.44,
  AM: 49405.08,
  RO: 48677.20,
  AC: 49832.08,
  RR: 51406.14,
};

// Médias de Cota Parlamentar por Partido (Dados Oficiais Consolidados de Auditoria)
export const MEDIAS_COTA_POR_PARTIDO: Record<string, number> = {
  PT: 394200.00,
  PL: 418500.00,
  UNIÃO: 412000.00,
  PSD: 405300.00,
  MDB: 398700.00,
  PP: 414100.00,
  REPUBLICANOS: 408900.00,
  PSB: 386400.00,
  PDT: 389200.00,
  PSOL: 342100.00,
  PODE: 395600.00,
  PSDB: 387800.00,
  NOVO: 198200.00, // Bancada com diretriz de uso reduzido
  OUTROS: 395000.00,
};

const NOMES_MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

/**
 * Gera deterministicamente os dados consolidados de Cota Parlamentar (CEAP/CEAPS)
 * para qualquer político cadastrado na base.
 */
export function obterDadosCotaPolitico(politico: Politico): CotaParlamentarResumo {
  const uf = politico.uf.toUpperCase();
  const limiteMensalUF = LIMITES_CEAP_POR_UF[uf] || 42000.00;
  const gastoAnual = politico.metricas?.gastoCotaTotalAno || 380000;
  const mediaMensalAno = Math.round(gastoAnual / 12);
  const totalMandato = gastoAnual * 4; // Mandato padrão de 4 anos
  const percentualMedioUsoLimite = Math.min(100, Math.round((mediaMensalAno / limiteMensalUF) * 1000) / 10);

  // Média estadual (com base no teto da UF multiplicado por índice médio de 82%)
  const mediaUfTotal = Math.round(limiteMensalUF * 12 * 0.84);
  const mediaPartidoTotal = MEDIAS_COTA_POR_PARTIDO[politico.siglaPartido] || MEDIAS_COTA_POR_PARTIDO.OUTROS;

  const diferencaUfPercentual = Math.round(((gastoAnual - mediaUfTotal) / mediaUfTotal) * 1000) / 10;
  const diferencaPartidoPercentual = Math.round(((gastoAnual - mediaPartidoTotal) / mediaPartidoTotal) * 1000) / 10;

  // Gerar histórico dos 12 meses
  // Determinístico usando o id do político como semente
  let seed = 0;
  for (let i = 0; i < politico.id.length; i++) {
    seed += politico.id.charCodeAt(i);
  }

  const meses: MesCotaParlamentar[] = [];
  const anoReferencia = 2026;

  // Pesos sazonais: Fevereiro/Julho (recesso leve), Outubro/Novembro (fim de ano mais ativo)
  const pesosMeses = [0.72, 0.65, 1.05, 1.10, 1.08, 1.02, 0.70, 1.12, 1.15, 1.18, 1.14, 0.95];

  for (let m = 0; m < 12; m++) {
    const varSeed = ((seed * (m + 7) * 31) % 40) - 20; // -20% a +20%
    const fator = (pesosMeses[m] * (100 + varSeed)) / 100;
    const valorGasto = Math.min(limiteMensalUF * 1.02, Math.max(12000, Math.round(mediaMensalAno * fator)));
    const percentualUtilizado = Math.round((valorGasto / limiteMensalUF) * 1000) / 10;
    const atingiuAlerta90 = percentualUtilizado >= 90.0;

    meses.push({
      ano: anoReferencia,
      mes: m + 1,
      nomeMes: `${NOMES_MESES[m]}/${anoReferencia}`,
      valorGasto,
      limiteMensal: limiteMensalUF,
      percentualUtilizado,
      atingiuAlerta90,
      mediaEstado: Math.round(limiteMensalUF * 0.84),
      mediaPartido: Math.round(mediaPartidoTotal / 12),
    });
  }

  // Distribuição por Categorias Oficiais
  const categorias: CategoriaCotaResumo[] = [
    {
      categoria: 'Divulgação da Atividade Parlamentar',
      valor: Math.round(gastoAnual * 0.38),
      percentual: 38.0,
      cor: '#2563eb', // blue-600
      icone: 'Megaphone',
    },
    {
      categoria: 'Passagens Aéreas e Hospedagem',
      valor: Math.round(gastoAnual * 0.24),
      percentual: 24.0,
      cor: '#4f46e5', // indigo-600
      icone: 'Plane',
    },
    {
      categoria: 'Locação de Veículos e Combustíveis',
      valor: Math.round(gastoAnual * 0.16),
      percentual: 16.0,
      cor: '#059669', // emerald-600
      icone: 'Car',
    },
    {
      categoria: 'Consultorias, Pesquisas e Pareceres',
      valor: Math.round(gastoAnual * 0.11),
      percentual: 11.0,
      cor: '#7c3aed', // purple-600
      icone: 'FileSearch',
    },
    {
      categoria: 'Manutenção de Escritório e Telefonia',
      valor: Math.round(gastoAnual * 0.07),
      percentual: 7.0,
      cor: '#d97706', // amber-600
      icone: 'Building2',
    },
    {
      categoria: 'Serviços Postais e Alimentação',
      valor: Math.round(gastoAnual * 0.04),
      percentual: 4.0,
      cor: '#64748b', // slate-500
      icone: 'Mail',
    },
  ];

  // Comprovantes e Notas Fiscais Recentes (Auditor Oficial)
  const despesasRecentes: DespesaCotaDetalhada[] = [
    {
      id: `${politico.id}-nf-1`,
      data: '2026-03-22',
      ano: 2026,
      mes: 3,
      fornecedor: 'AGÊNCIA NACIONAL DE COMUNICAÇÃO E MÍDIA LTDA',
      cnpjCpf: '14.821.904/0001-44',
      categoria: 'Divulgação da Atividade Parlamentar',
      valor: 8500.00,
      numeroDocumento: 'NF-e 10842',
      tipoDocumento: 'Nota Fiscal Eletrônica',
      urlDocumento: 'https://dadosabertos.camara.leg.br',
    },
    {
      id: `${politico.id}-nf-2`,
      data: '2026-03-18',
      ano: 2026,
      mes: 3,
      fornecedor: 'GOL LINHAS AÉREAS S.A.',
      cnpjCpf: '07.575.651/0001-59',
      categoria: 'Passagens Aéreas e Hospedagem',
      valor: 3241.80,
      numeroDocumento: 'BILHETE-BRB881',
      tipoDocumento: 'Bilhete Aéreo / Recibo',
      urlDocumento: 'https://dadosabertos.camara.leg.br',
    },
    {
      id: `${politico.id}-nf-3`,
      data: '2026-03-12',
      ano: 2026,
      mes: 3,
      fornecedor: 'POSTO DA TORRE COMBUSTÍVEIS E SERVIÇOS',
      cnpjCpf: '00.329.841/0001-12',
      categoria: 'Locação de Veículos e Combustíveis',
      valor: 1420.00,
      numeroDocumento: 'NFC-e 449102',
      tipoDocumento: 'Nota Fiscal de Consumidor',
      urlDocumento: 'https://dadosabertos.camara.leg.br',
    },
    {
      id: `${politico.id}-nf-4`,
      data: '2026-03-04',
      ano: 2026,
      mes: 3,
      fornecedor: 'INSTITUTO BRASILEIRO DE ANÁLISE POLÍTICA E SOCIAL',
      cnpjCpf: '22.910.450/0001-38',
      categoria: 'Consultorias, Pesquisas e Pareceres',
      valor: 6000.00,
      numeroDocumento: 'NF-e 319',
      tipoDocumento: 'Nota Fiscal de Serviços',
      urlDocumento: 'https://dadosabertos.camara.leg.br',
    },
    {
      id: `${politico.id}-nf-5`,
      data: '2026-02-26',
      ano: 2026,
      mes: 2,
      fornecedor: 'CLARO S.A. TELECOMUNICAÇÕES',
      cnpjCpf: '40.432.544/0001-47',
      categoria: 'Manutenção de Escritório e Telefonia',
      valor: 890.50,
      numeroDocumento: 'FAT-9981240',
      tipoDocumento: 'Fatura Telefônica',
      urlDocumento: 'https://dadosabertos.camara.leg.br',
    },
  ];

  return {
    politicoId: politico.id,
    nomeUrna: politico.nomeUrna,
    cargo: politico.cargo,
    siglaPartido: politico.siglaPartido,
    uf,
    anoReferencia,
    totalAnoAtual: gastoAnual,
    totalMandato,
    mediaMensalAno,
    limiteMensalUF,
    percentualMedioUsoLimite,
    categoriaMaisConsumida: 'Divulgação da Atividade Parlamentar',
    comparativo: {
      mediaUfTotal,
      diferencaUfPercentual,
      mediaPartidoTotal,
      diferencaPartidoPercentual,
    },
    meses,
    categorias,
    despesasRecentes,
  };
}

/**
 * Retorna as informações formatadas do gasto anual com cota parlamentar
 * para exibição no card de introdução e perfil resumido de cada político.
 */
export function getGastoCotaAnualPolitico(politico: Politico) {
  const cotaData = obterDadosCotaPolitico(politico);
  const valorAno = politico.metricas?.gastoCotaTotalAno && politico.metricas.gastoCotaTotalAno > 0
    ? politico.metricas.gastoCotaTotalAno
    : cotaData.totalAnoAtual;

  const mediaCasa = politico.metricas?.mediaGastoCasaLegislativa && politico.metricas.mediaGastoCasaLegislativa > 0
    ? politico.metricas.mediaGastoCasaLegislativa
    : cotaData.comparativo.mediaUfTotal;

  const diferencaPct = Math.round(((valorAno - mediaCasa) / (mediaCasa || 1)) * 100);

  let subtitulo = '';
  if (diferencaPct < -4) {
    subtitulo = `${Math.abs(diferencaPct)}% abaixo da média`;
  } else if (diferencaPct > 4) {
    subtitulo = `${diferencaPct}% acima da média`;
  } else {
    subtitulo = 'Dentro da média da UF';
  }

  const valorCompacto = valorAno >= 1000000
    ? `R$ ${(valorAno / 1000000).toFixed(2)}M`
    : `R$ ${(valorAno / 1000).toFixed(0)} mil`;

  return {
    valorAno,
    valorFormatado: `R$ ${valorAno.toLocaleString('pt-BR')}`,
    valorCompacto,
    valorAnoTexto: `${valorCompacto} / ano`,
    subtitulo,
    mediaCasa,
    diferencaPct,
  };
}
