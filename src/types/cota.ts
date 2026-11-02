export interface DespesaCotaDetalhada {
  id: string;
  data: string;
  ano: number;
  mes: number;
  fornecedor: string;
  cnpjCpf: string;
  categoria: string;
  valor: number;
  numeroDocumento: string;
  tipoDocumento: string;
  urlDocumento?: string;
}

export interface MesCotaParlamentar {
  ano: number;
  mes: number;
  nomeMes: string;
  valorGasto: number;
  limiteMensal: number;
  percentualUtilizado: number;
  atingiuAlerta90: boolean;
  mediaEstado: number;
  mediaPartido: number;
}

export interface CategoriaCotaResumo {
  categoria: string;
  valor: number;
  percentual: number;
  cor: string;
  icone: string;
}

export interface CotaParlamentarResumo {
  politicoId: string;
  nomeUrna: string;
  cargo: string;
  siglaPartido: string;
  uf: string;
  anoReferencia: number;
  totalAnoAtual: number;
  totalMandato: number;
  mediaMensalAno: number;
  limiteMensalUF: number;
  percentualMedioUsoLimite: number;
  categoriaMaisConsumida: string;
  comparativo: {
    mediaUfTotal: number;
    diferencaUfPercentual: number;
    mediaPartidoTotal: number;
    diferencaPartidoPercentual: number;
  };
  meses: MesCotaParlamentar[];
  categorias: CategoriaCotaResumo[];
  despesasRecentes: DespesaCotaDetalhada[];
}
