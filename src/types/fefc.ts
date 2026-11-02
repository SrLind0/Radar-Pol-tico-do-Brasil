export interface CategoriaDespesaFEFC {
  categoria: string;
  valor: number;
  percentual: number;
  icone: string;
}

export interface CampanhaFEFCPolitico {
  anoEleicao: number;
  cargoDisputado: string;
  uf: string;
  valorTotalRecebido: number;
  valorTotalGasto: number;
  sobraDevolvida?: number;
  mediaPartidoEstado: number;
  diferencaPercentualMedia: number; // Positivo: gastou mais que a média; Negativo: gastou menos
  statusJulgamentoTSE: string; // Ex: 'Contas Aprovadas', 'Contas Aprovadas com Ressalvas', 'Em Julgamento'
  linkDivulgaCandContas: string;
  despesasCategorias: CategoriaDespesaFEFC[];
}

export interface PoliticoFEFCData {
  politicoId: string;
  nomeUrna: string;
  siglaPartido: string;
  totalAcumuladoTodasCampanhas: number;
  campanhas: CampanhaFEFCPolitico[];
}

export interface PartidoCotaFEFC {
  sigla: string;
  nome: string;
  valor: number;
  percentualDoFundo: number;
  cor: string;
}

export interface HistoricoFEFCNacionalAno {
  ano: number;
  tipoEleicao: 'Geral' | 'Municipal' | 'Previsão LOA';
  totalGeral: number;
  variacaoRelacaoEleicaoAnterior: number; // Porcentagem de aumento ou redução
  baseLegal: string;
  descricaoContexto: string;
  partidoMaiorCota: PartidoCotaFEFC;
  rankingPartidos: PartidoCotaFEFC[];
}

export interface FEFCGlobalResponse {
  anosDisponiveis: number[];
  historico: Record<number, HistoricoFEFCNacionalAno>;
  comparativoOutrosGastos: {
    anoReferencia: number;
    fefcTotal: number;
    meioAmbienteTotal: number;
    cienciaTecnologiaTotal: number;
    cotaParlamentarCongresso: number;
  };
}
