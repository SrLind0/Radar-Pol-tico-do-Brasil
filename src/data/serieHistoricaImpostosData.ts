import { GASTOS_GOVERNO_HISTORICO, ANOS_DISPONIVEIS_GASTOS } from './gastosHistorico2000_2026';

export interface PontoSerieHistorica {
  ano: number;
  impostosFederais: number; // Arrecadação de Impostos Federais (Governo Central)
  gastosPrimarios: number;  // Despesas Primárias Totais do Governo Central
  balancoArrecadacaoDespesa: number; // Arrecadação menos Gastos Totais (Balanço Arrecadação vs Despesa)
  populacao: number;
  arrecadacaoPerCapita: number;
  titulo: string;
  status: string;
  descricao: string;
  variacaoAnterior?: number; // Percentual vs ano anterior
}

// Constrói a série temporal ordenada cronologicamente (2000 a 2026)
export const SERIE_HISTORICA_IMPOSTOS_2000_2026: PontoSerieHistorica[] = (() => {
  // Anos de 2000 a 2026 em ordem crescente
  const anosCrescentes = [...ANOS_DISPONIVEIS_GASTOS].sort((a, b) => a - b);

  return anosCrescentes.map((ano, index) => {
    const dados = GASTOS_GOVERNO_HISTORICO[ano];
    const impostos = dados ? dados.arrecadacaoTotal : 0;
    const gastos = dados ? dados.totalGeral : 0;
    const balanco = impostos - gastos;
    
    // Cálculo dinâmico simples de regressão demográfica brasileira como fallback caso os dados não venham preenchidos
    const populacaoFallback = 213000000 - ((2026 - ano) * 1500000);
    const populacao = dados?.populacaoEstimada || populacaoFallback;
    const perCapita = Number((impostos / populacao).toFixed(2));

    let variacaoAnterior: number | undefined = undefined;
    if (index > 0) {
      const anoAnterior = anosCrescentes[index - 1];
      const dadosAnt = GASTOS_GOVERNO_HISTORICO[anoAnterior];
      if (dadosAnt && dadosAnt.arrecadacaoTotal > 0) {
        variacaoAnterior = ((impostos - dadosAnt.arrecadacaoTotal) / dadosAnt.arrecadacaoTotal) * 100;
      }
    }

    return {
      ano,
      impostosFederais: impostos,
      gastosPrimarios: gastos,
      balancoArrecadacaoDespesa: balanco,
      populacao,
      arrecadacaoPerCapita: perCapita,
      titulo: dados?.titulo || `Ano ${ano}`,
      status: dados?.status || 'Consolidado',
      descricao: dados?.descricaoGeral || '',
      variacaoAnterior,
    };
  });
})();

// Função utilitária para formatar valores no padrão brasileiro de bilhões e trilhões
export function formatarValorEscala(valor: number): string {
  const abs = Math.abs(valor);
  if (abs >= 1e12) {
    const tri = valor / 1e12;
    return `R$ ${tri.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 2 })} ${Math.abs(tri) === 1 ? 'Trilhão' : 'Trilhões'}`;
  }
  if (abs >= 1e9) {
    const bi = valor / 1e9;
    return `R$ ${bi.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} ${Math.abs(bi) === 1 ? 'Bilhão' : 'Bilhões'}`;
  }
  if (abs >= 1e6) {
    const mi = valor / 1e6;
    return `R$ ${mi.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} Milhões`;
  }
  return `R$ ${valor.toLocaleString('pt-BR')}`;
}

export function formatarValorEixoY(valor: number): string {
  const abs = Math.abs(valor);
  if (abs >= 1e12) {
    return `${(valor / 1e12).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} Tri`;
  }
  if (abs >= 1e9) {
    return `${Math.round(valor / 1e9)} Bi`;
  }
  return `${valor}`;
}
