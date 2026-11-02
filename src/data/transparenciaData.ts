export interface IndicadoresGastos {
  total: number;
  deputados: number;
  senadores: number;
  ano: number;
}

export interface IndicadoresReceita {
  ano: number;
  receitas: number;
  receitaTributaria: number;
  fonte: string;
}

export interface SetorDespesa {
  id: string;
  nome: string;
  valor: number;
}

export interface DespesasSetores {
  periodo: string;
  setores: SetorDespesa[];
  totalGeral: number;
}

export interface TransparenciaFederalData {
  gastos: IndicadoresGastos;
  receita: IndicadoresReceita;
  despesasSetores: DespesasSetores;
  ultimaAtualizacao: string;
  fonte: string;
}

export type { CategoriaGastoGoverno, GastosAnoGoverno } from './gastosHistorico2000_2026';
export { GASTOS_GOVERNO_HISTORICO, ANOS_DISPONIVEIS_GASTOS } from './gastosHistorico2000_2026';

// Snapshot oficial sincronizado diretamente com https://transparenciapolitica.app
export const DADOS_TRANSPARENCIA_SNAPSHOT: TransparenciaFederalData = {
  gastos: {
    total: 166126313.88,
    deputados: 141002433.21,
    senadores: 25123880.67,
    ano: 2026,
  },
  receita: {
    ano: 2025,
    receitas: 2886000000000,
    receitaTributaria: 2886000000000,
    fonte: 'Receita Federal',
  },
  despesasSetores: {
    periodo: 'jan/2023 - presente',
    totalGeral: 1319217419566.32,
    setores: [
      { id: 'protecaoSocial', nome: 'Proteção Social', valor: 1005267364845.06 },
      { id: 'saude', nome: 'Saúde', valor: 120222977931.88 },
      { id: 'seguranca', nome: 'Segurança', valor: 110483127733.66 },
      { id: 'educacao', nome: 'Educação', valor: 55693927543.27 },
      { id: 'transportes', nome: 'Transportes', valor: 15829139435.65 },
      { id: 'cultura', nome: 'Cultura', valor: 7407853328.48 },
      { id: 'habitacao', nome: 'Habitação', valor: 2569423508.60 },
      { id: 'meioAmbiente', nome: 'Meio Ambiente', valor: 1743605239.72 },
    ],
  },
  ultimaAtualizacao: '2026-10-19T21:00:00.000Z',
  fonte: 'Transparência Política (transparenciapolitica.app) · Portal da Transparência · Câmara · Senado',
};

// Funções utilitárias de formatação monetária e percentual
export function formatarMoedaCompacta(valor: number): string {
  if (valor >= 1e12) {
    return `R$ ${(valor / 1e12).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Tri`;
  }
  if (valor >= 1e9) {
    return `R$ ${(valor / 1e9).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 2 })} Bi`;
  }
  if (valor >= 1e6) {
    return `R$ ${(valor / 1e6).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 2 })} Mi`;
  }
  if (valor >= 1e3) {
    return `R$ ${(valor / 1e3).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} Mil`;
  }
  return `R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatarMoedaCompleta(valor: number): string {
  return `R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatarPercentual(fracao: number): string {
  return `${(fracao * 100).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;
}

