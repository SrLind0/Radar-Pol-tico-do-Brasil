import { Politico } from '../../types';

export const EXECUTIVO_FEDERAL: Politico[] = [
  {
    id: 'lula',
    nomeCivil: 'Luiz Inácio Lula da Silva',
    nomeUrna: 'Lula',
    cargo: 'Presidente',
    partido: 'Partido dos Trabalhadores',
    siglaPartido: 'PT',
    numeroUrna: 13,
    uf: 'DF',
    municipio: 'Brasília',
    fotoUrl: '',
    emailGabinete: 'gabinetepessoal@presidencia.gov.br',
    telefoneGabinete: '(61) 3411-1221',
    dataNascimento: '27/10/1945',
    grauInstrucao: 'Ensino Fundamental Completo / Técnico em Tornearia Mecânica (SENAI)',
    mandatoAtual: {
      inicio: 2023,
      fim: 2027,
      legislatura: 'Governo Federal (3º Mandato Presidencial)'
    },
    candidaturaEleitoral: {
      disputando: true,
      esfera: 'Federal',
      cargoDisputado: 'Presidente da República',
      numeroUrna: 13,
      anoEleicao: 2026,
      situacao: 'Candidato à Reeleição'
    },
    auditoriaTimestamp: '19/10/2026 às 15:00:00 BRT',
    fonteOficial: 'TSE (DivulgaCandContas) / Presidência da República / Diário Oficial da União (DOU)',
    metricas: {
      projetosApresentadosTotal: 94,
      projetosViraramLeiTotal: 42,
      presencaPlenarioPorcentagem: 100.0,
      faltasJustificadas: 0,
      faltasNaoJustificadas: 0,
      gastoCotaTotalAno: 384200.00,
      mediaGastoCasaLegislativa: 412000.00,
      valorEmendasOrcamentarias: 0.00,
      cidadesBeneficiadasTotal: 5570
    },
    leisSancionadas: [
      {
        id: 'lei-bolsa-familia-2023',
        numeroLei: 'Lei 14.601/2023',
        ano: 2023,
        tituloOriginal: 'Recria o Programa Bolsa Família com adicional por criança e gestante.',
        resumoLinguagemSimples: 'O governo garante renda mínima de R$ 600 por família vulnerável, com adicional de R$ 150 por criança de até 6 anos e R$ 50 para gestantes e jovens.',
        areaTematica: 'Desenvolvimento Social',
        status: 'Sancionada',
        linkDiarioOficial: 'https://www.in.gov.br'
      },
      {
        id: 'lei-igualdade-salarial',
        numeroLei: 'Lei 14.611/2023',
        ano: 2023,
        tituloOriginal: 'Dispõe sobre a igualdade salarial e de critérios remuneratórios entre mulheres e homens.',
        resumoLinguagemSimples: 'A lei proíbe pagar salários diferentes para homens e mulheres que exercem a mesma função na mesma empresa, prevendo multa em caso de discriminação.',
        areaTematica: 'Trabalho e Renda',
        status: 'Sancionada',
        linkDiarioOficial: 'https://www.in.gov.br'
      },
      {
        id: 'lei-reforma-tributaria-ec132',
        numeroLei: 'Emenda Constitucional 132/2023',
        ano: 2023,
        tituloOriginal: 'Reforma o Sistema Tributário Nacional unificando impostos sobre o consumo.',
        resumoLinguagemSimples: 'A emenda junta cinco tributos antigos (PIS, Cofins, IPI, ICMS e ISS) em dois impostos novos sobre valor agregado (IBS e CBS) e cria cesta básica com imposto zero.',
        areaTematica: 'Economia e Tributos',
        status: 'Promulgada',
        linkDiarioOficial: 'https://www.in.gov.br'
      }
    ],
    projetosApresentados: [
      {
        id: 'plp-reforma-tributaria-regulamentacao',
        siglaTipo: 'PLP',
        numero: '68',
        ano: 2024,
        ementaOficial: 'Regulamenta o Imposto sobre Bens e Serviços (IBS) e a Contribuição sobre Bens e Serviços (CBS).',
        resumoLinguagemSimples: 'Define as alíquotas práticas e regras operacionais de cálculo da nova cobrança de impostos no país.',
        situacao: 'Aprovado na Câmara, em tramitação no Senado Federal'
      }
    ],
    gastosCategorias: [
      { categoria: 'Despesas Oficiais da Presidência (Custeadas pelo Orçamento Geral)', valor: 0.00 }
    ],
    gastosHistorico: [],
    evolucaoBens: [
      {
        anoEleicao: 2002,
        valorTotalDeclarado: 423000.00,
        principaisBens: ['Apartamento em São Bernardo do Campo', 'Contas poupança', 'Automóvel']
      },
      {
        anoEleicao: 2006,
        valorTotalDeclarado: 839000.00,
        principaisBens: ['Imóveis residenciais', 'Fundos de investimento', 'Planos de previdência']
      },
      {
        anoEleicao: 2022,
        valorTotalDeclarado: 7423000.00,
        principaisBens: ['Apartamentos e terrenos em SP', 'Previdência privada VGBL', 'Aplicações financeiras', 'Veículos']
      }
    ],
    processosJudiciais: [
      {
        id: 'proc-stf-habeas-corpus-suspeicao',
        numeroProcesso: 'HC 164.493 / STF',
        tribunal: 'Supremo Tribunal Federal',
        tipoAcao: 'Habeas Corpus de Suspeição da 13ª Vara de Curitiba',
        status: 'Absolvido',
        descricaoFato: 'O plenário do STF declarou a incompetência territorial e a suspeição do ex-juiz Sérgio Moro, anulando as condenações da Operação Lava Jato e restabelecendo os direitos políticos plenos.',
        dataAtualizacao: '23/06/2021',
        linkOficial: 'https://portal.stf.jus.br/processos/detalhe.asp?incidente=5606443',
        linkNoticia: 'https://g1.globo.com/politica/noticia/2021/06/23/stf-julga-suspeicao-de-moro-caso-triplex-lula.ghtml',
        veiculoNoticia: 'G1 Política',
        tituloNoticia: 'Plenário do STF confirma decisão que declarou suspeição de Moro no caso triplex de Lula'
      }
    ],
    noticiasFatuais: [
      {
        id: 'not-lula-1',
        veiculo: 'Agência Brasil',
        titulo: 'Presidente Lula sanciona programa Pé-de-Meia para permanência no ensino médio',
        resumoFactual: 'Cerimônia oficial no Palácio do Planalto instituiu o incentivo financeiro para estudantes de baixa renda da rede pública.',
        dataPublicacao: '16/01/2024',
        urlOriginal: 'https://agenciabrasil.ebc.com.br'
      }
    ],
    emendas: []
  },
  {
    id: 'geraldo-alckmin',
    nomeCivil: 'Geraldo José Rodrigues Alckmin Filho',
    nomeUrna: 'Geraldo Alckmin',
    cargo: 'Vice-Presidente',
    partido: 'Partido Socialista Brasileiro',
    siglaPartido: 'PSB',
    numeroUrna: 13,
    uf: 'SP',
    municipio: 'Pindamonhangaba',
    fotoUrl: '',
    emailGabinete: 'vicepresidencia@presidencia.gov.br',
    telefoneGabinete: '(61) 3411-1000',
    dataNascimento: '07/11/1952',
    grauInstrucao: 'Superior Completo (Medicina - Universidade de Taubaté / Anestesiologia)',
    mandatoAtual: {
      inicio: 2023,
      fim: 2027,
      legislatura: 'Vice-Presidência da República e Ministro do MDIC'
    },
    candidaturaEleitoral: {
      disputando: true,
      esfera: 'Federal',
      cargoDisputado: 'Vice-Presidente da República',
      numeroUrna: 13,
      anoEleicao: 2026,
      situacao: 'Mandato em Exercício'
    },
    auditoriaTimestamp: '19/10/2026 às 15:00:00 BRT',
    fonteOficial: 'TSE / Presidência da República / MDIC',
    metricas: {
      projetosApresentadosTotal: 18,
      projetosViraramLeiTotal: 8,
      presencaPlenarioPorcentagem: 100.0,
      faltasJustificadas: 0,
      faltasNaoJustificadas: 0,
      gastoCotaTotalAno: 356800.00,
      mediaGastoCasaLegislativa: 412000.00,
      valorEmendasOrcamentarias: 0.00,
      cidadesBeneficiadasTotal: 645
    },
    leisSancionadas: [
      {
        id: 'lei-depreciacao-acelerada',
        numeroLei: 'Lei 14.871/2024',
        ano: 2024,
        tituloOriginal: 'Autoriza quotas diferenciadas de depreciação acelerada para máquinas e equipamentos industriais novos.',
        resumoLinguagemSimples: 'Permite que indústrias abatam mais rápido dos impostos os gastos com compra de máquinas novas e modernas para modernizar fábricas brasileiras.',
        areaTematica: 'Indústria e Comércio',
        status: 'Sancionada',
        linkDiarioOficial: 'https://www.in.gov.br'
      }
    ],
    projetosApresentados: [],
    gastosCategorias: [
      { categoria: 'Despesas Oficiais de Gabinete da Vice-Presidência', valor: 0.00 }
    ],
    gastosHistorico: [],
    evolucaoBens: [
      {
        anoEleicao: 2006,
        valorTotalDeclarado: 695000.00,
        principaisBens: ['Imóvel residencial', 'Terreno rural', 'Depósitos bancários']
      },
      {
        anoEleicao: 2018,
        valorTotalDeclarado: 1379000.00,
        principaisBens: ['Apartamento em SP', 'Casa em Pindamonhangaba', 'Aplicações financeiras']
      },
      {
        anoEleicao: 2022,
        valorTotalDeclarado: 1005000.00,
        principaisBens: ['Imóveis residenciais', 'Participação societária agropecuária', 'Contas bancárias']
      }
    ],
    processosJudiciais: [
      {
        id: 'proc-alckmin-justica-eleitoral',
        numeroProcesso: 'Ação Eleitoral 0600122/SP',
        tribunal: 'TRE-SP',
        tipoAcao: 'Inquérito Eleitoral de Caixa 2 em Campanhas Anteriores',
        status: 'Arquivado',
        descricaoFato: 'Procedimento arquivado pela Justiça Eleitoral de São Paulo em 2022 por ausência de justa causa e falta de elementos comprobatórios materiais.',
        dataAtualizacao: '15/09/2022',
        linkOficial: 'https://www.tre-sp.jus.br',
        linkNoticia: 'https://www.poder360.com.br/justica/justica-eleitoral-de-sp-arquiva-inquerito-contra-alckmin/',
        veiculoNoticia: 'Poder360',
        tituloNoticia: 'Justiça Eleitoral de SP arquiva inquérito contra Geraldo Alckmin'
      }
    ],
    noticiasFatuais: [
      {
        id: 'not-alckmin-1',
        veiculo: 'Valor Econômico',
        titulo: 'Alckmin apresenta plano Nova Indústria Brasil com R$ 300 bilhões em incentivos',
        resumoFactual: 'Ministro do Desenvolvimento, Indústria e Comércio anunciou diretrizes para transição energética e inovação industrial.',
        dataPublicacao: '22/01/2024',
        urlOriginal: 'https://valor.globo.com'
      }
    ],
    emendas: []
  }
];
