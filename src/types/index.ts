export type CargoPolitico = 
  | 'Presidente'
  | 'Vice-Presidente'
  | 'Senador'
  | 'Senadora'
  | 'Deputado Federal'
  | 'Deputada Federal'
  | 'Governador'
  | 'Governadora'
  | 'Vice-Governador'
  | 'Vice-Governadora'
  | 'Deputado Estadual'
  | 'Deputada Estadual'
  | 'Prefeito'
  | 'Prefeita'
  | 'Vereador'
  | 'Vereadora';

export type StatusProcesso = 
  | 'Investigado'
  | 'Réu'
  | 'Absolvido'
  | 'Condenado'
  | 'Arquivado'
  | 'Anulado'
  | 'Sem registros';

export interface ProcessoJudicial {
  id: string;
  numeroProcesso: string;
  tribunal: string; // Ex: STF, STJ, TJSP, TRF-1
  tipoAcao: string; // Ex: Inquérito, Ação Penal, Ação Civil Pública por Improbidade
  status: StatusProcesso;
  descricaoFato: string;
  dataAtualizacao: string;
  linkOficial?: string;
  linkNoticia?: string; // Link direto para a matéria jornalística cobrindo o caso
  veiculoNoticia?: string; // Veículo de imprensa (ex: G1, Folha, CNN, Poder360)
  tituloNoticia?: string; // Título da matéria de cobertura
}

export interface LeiSancionada {
  id: string;
  numeroLei: string; // Ex: Lei 14.133/2021
  ano: number;
  tituloOriginal: string;
  resumoLinguagemSimples: string; // 1 a 2 frases simples (máx 25 palavras/frase)
  areaTematica: string; // Saúde, Educação, Segurança, Economia, etc.
  status: 'Sancionada' | 'Promulgada';
  linkDiarioOficial?: string;
}

export interface ProjetoApresentado {
  id: string;
  siglaTipo: string; // PL, PEC, PLP
  numero: string;
  ano: number;
  ementaOficial: string;
  resumoLinguagemSimples: string;
  situacao: string;
}

export interface GastoCotaMensal {
  mes: string;
  valor: number;
}

export interface GastoCategoria {
  categoria: string; // Passagens aéreas, Combustível, Divulgação, Consultorias, etc.
  valor: number;
}

export interface EvolucaoPatrimonial {
  anoEleicao: number;
  valorTotalDeclarado: number;
  principaisBens: string[];
}

export interface NoticiaImprensa {
  id: string;
  veiculo: string; // Ex: G1, Folha de S.Paulo, Estadão, Agência Brasil
  titulo: string;
  resumoFactual: string;
  dataPublicacao: string;
  urlOriginal: string;
}

export interface EmendaDestinada {
  id: string;
  ano: number;
  tipo: 'Individual' | 'Bancada' | 'Comissão' | 'Relator (RP9 Histórico)';
  valorTotal: number;
  municipiosBeneficiados: string[];
  areaPrincipal: string;
}

export type EsferaEleitoral = 'Federal' | 'Estadual' | 'Municipal';

export type FiltroEleitoral = 'Todos' | 'Federal' | 'Estadual' | 'Municipal' | 'EmDisputa';

export interface Politico {
  id: string;
  nomeCivil: string;
  nomeUrna: string;
  cargo: CargoPolitico;
  partido: string;
  siglaPartido: string;
  numeroUrna?: number;
  uf: string;
  municipio?: string;
  fotoUrl?: string;
  emailGabinete: string;
  telefoneGabinete: string;
  dataNascimento: string;
  grauInstrucao: string;
  mandatoAtual: {
    inicio: number;
    fim: number;
    legislatura: string;
  };
  candidaturaEleitoral?: {
    disputando: boolean;
    esfera: EsferaEleitoral;
    cargoDisputado: string;
    numeroUrna: number;
    anoEleicao: number;
    situacao: 'Candidato à Reeleição' | 'Candidata à Reeleição' | 'Candidato a Novo Cargo' | 'Candidata a Novo Cargo' | 'Mandato em Exercício';
  };
  auditoriaTimestamp: string;
  fonteOficial: string;
  emExercicio?: boolean;
  
  // Métricas de Impacto
  metricas: {
    projetosApresentadosTotal: number;
    projetosViraramLeiTotal: number;
    presencaPlenarioPorcentagem: number; // 0 - 100
    faltasJustificadas: number;
    faltasNaoJustificadas: number;
    gastoCotaTotalAno: number;
    mediaGastoCasaLegislativa: number;
    valorEmendasOrcamentarias: number;
    cidadesBeneficiadasTotal: number;
  };

  leisSancionadas: LeiSancionada[];
  projetosApresentados: ProjetoApresentado[];
  gastosCategorias: GastoCategoria[];
  gastosHistorico: GastoCotaMensal[];
  evolucaoBens: EvolucaoPatrimonial[];
  processosJudiciais: ProcessoJudicial[];
  noticiasFatuais: NoticiaImprensa[];
  emendas: EmendaDestinada[];
}

export interface TermoGlossario {
  termo: string;
  definicaoSimples: string; // 1 frase clara sem jargão
  exemploPratico: string;
  categoria: 'Legislativo' | 'Jurídico' | 'Orçamento' | 'Eleitoral';
}

export type FiltroOrdenacao = 
  | 'relevancia'
  | 'maisProjetosAprovados'
  | 'menosGastosCota'
  | 'semProcessosJustica'
  | 'maiorPresenca'
  | 'alfabetica';

export interface LocalizacaoFiltro {
  cep?: string;
  uf?: string;
  municipio?: string;
}

export * from './fefc';
export * from './cota';
