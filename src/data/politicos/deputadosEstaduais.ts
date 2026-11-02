import { Politico } from '../../types';

export const DEPUTADOS_ESTADUAIS: Politico[] = [
  // 1. MARCELO SANTOS (ES) - Presidente da Assembleia Legislativa do Espírito Santo (ALES)
  {
    id: 'marcelo-santos',
    nomeCivil: 'Marcelo Santos',
    nomeUrna: 'Marcelo Santos',
    cargo: 'Deputado Estadual',
    partido: 'União Brasil',
    siglaPartido: 'UNIÃO',
    numeroUrna: 44123,
    uf: 'ES',
    municipio: 'Cariacica',
    fotoUrl: '',
    emailGabinete: 'dep.marcelosantos@al.es.gov.br',
    telefoneGabinete: '(27) 3382-3500',
    dataNascimento: '10/02/1971',
    grauInstrucao: 'Superior Completo (Direito)',
    mandatoAtual: {
      inicio: 2023,
      fim: 2027,
      legislatura: '20ª Legislatura (Presidente da Assembleia Legislativa do Espírito Santo - ALES)'
    },
    candidaturaEleitoral: {
      disputando: true,
      esfera: 'Estadual',
      cargoDisputado: 'Deputado Estadual',
      numeroUrna: 44123,
      anoEleicao: 2026,
      situacao: 'Candidato à Reeleição'
    },
    auditoriaTimestamp: '19/10/2026 às 15:00:00 BRT',
    fonteOficial: 'Assembleia Legislativa do Espírito Santo (ALES) / TSE / TCE-ES',
    metricas: {
      projetosApresentadosTotal: 135,
      projetosViraramLeiTotal: 28,
      presencaPlenarioPorcentagem: 98.8,
      faltasJustificadas: 1,
      faltasNaoJustificadas: 0,
      gastoCotaTotalAno: 145000.00,
      mediaGastoCasaLegislativa: 180000.00,
      valorEmendasOrcamentarias: 18000000.00,
      cidadesBeneficiadasTotal: 42
    },
    leisSancionadas: [
      {
        id: 'lei-ales-desenvolve-municipios',
        numeroLei: 'Lei Estadual 11.890/2023 (Presidência da ALES)',
        ano: 2023,
        tituloOriginal: 'Institui o Fundo de Apoio à Infraestrutura Municipal da ALES.',
        resumoLinguagemSimples: 'Repassou sobras orçamentárias do Legislativo estadual direto para pavimentação e postos de saúde nos 78 municípios capixabas.',
        areaTematica: 'Infraestrutura Municipal',
        status: 'Sancionada'
      }
    ],
    projetosApresentados: [],
    gastosCategorias: [
      { categoria: 'Divulgação da Atividade Parlamentar da ALES', valor: 65000.00 },
      { categoria: 'Combustível e Deslocamentos pelo ES', valor: 45000.00 }
    ],
    gastosHistorico: [],
    evolucaoBens: [
      { anoEleicao: 2018, valorTotalDeclarado: 1200000.00, principaisBens: ['Casa em Cariacica', 'Terrenos', 'Veículo'] },
      { anoEleicao: 2022, valorTotalDeclarado: 1750000.00, principaisBens: ['Imóveis residenciais', 'Participação societária', 'Aplicações financeiras'] }
    ],
    processosJudiciais: [],
    noticiasFatuais: [
      {
        id: 'not-marcelo-1',
        veiculo: 'A Gazeta (ES)',
        titulo: 'Marcelo Santos devolve R$ 50 milhões do orçamento da Assembleia para investimentos do governo no ES',
        resumoFactual: 'Economia interna da ALES foi repassada para o Fundo de Proteção e Defesa Civil estadual.',
        dataPublicacao: '19/12/2023',
        urlOriginal: 'https://agazeta.com.br'
      }
    ],
    emendas: []
  },

  // 2. CAMILA VALADÃO (ES)
  {
    id: 'camila-valadao',
    nomeCivil: 'Camila Valadão',
    nomeUrna: 'Camila Valadão',
    cargo: 'Deputada Estadual',
    partido: 'Partido Socialismo e Liberdade',
    siglaPartido: 'PSOL',
    numeroUrna: 50123,
    uf: 'ES',
    municipio: 'Vitória',
    fotoUrl: '',
    emailGabinete: 'dep.camilavaladao@al.es.gov.br',
    telefoneGabinete: '(27) 3382-3600',
    dataNascimento: '16/09/1984',
    grauInstrucao: 'Superior Completo (Serviço Social pela UFES / Doutora em Política Social)',
    mandatoAtual: {
      inicio: 2023,
      fim: 2027,
      legislatura: '20ª Legislatura (Presidente da Comissão de Defesa dos Direitos da Mulher da ALES)'
    },
    candidaturaEleitoral: {
      disputando: true,
      esfera: 'Estadual',
      cargoDisputado: 'Deputada Estadual',
      numeroUrna: 50123,
      anoEleicao: 2026,
      situacao: 'Candidata à Reeleição'
    },
    auditoriaTimestamp: '19/10/2026 às 15:00:00 BRT',
    fonteOficial: 'Assembleia Legislativa do Espírito Santo (ALES) / TSE / CGU',
    metricas: {
      projetosApresentadosTotal: 148,
      projetosViraramLeiTotal: 7,
      presencaPlenarioPorcentagem: 98.4,
      faltasJustificadas: 1,
      faltasNaoJustificadas: 0,
      gastoCotaTotalAno: 112000.00,
      mediaGastoCasaLegislativa: 180000.00,
      valorEmendasOrcamentarias: 14000000.00,
      cidadesBeneficiadasTotal: 25
    },
    leisSancionadas: [
      {
        id: 'lei-es-combate-violencia-obstetrica',
        numeroLei: 'Lei Estadual 11.920/2023',
        ano: 2023,
        tituloOriginal: 'Diretrizes de Humanização do Parto e Enfrentamento à Violência Obstétrica no ES.',
        resumoLinguagemSimples: 'Garante à gestante o direito a acompanhante de sua escolha durante todo o trabalho de parto e pós-parto na rede hospitalar capixaba.',
        areaTematica: 'Saúde da Mulher',
        status: 'Sancionada'
      }
    ],
    projetosApresentados: [],
    gastosCategorias: [
      { categoria: 'Divulgação Parlamentar de Mandato', valor: 55000.00 },
      { categoria: 'Consultoria Técnica em Políticas Públicas', valor: 35000.00 }
    ],
    gastosHistorico: [],
    evolucaoBens: [
      { anoEleicao: 2020, valorTotalDeclarado: 45000.00, principaisBens: ['Veículo particular'] },
      { anoEleicao: 2022, valorTotalDeclarado: 125000.00, principaisBens: ['Saldo bancário', 'Aplicações financeiras em previdência'] }
    ],
    processosJudiciais: [],
    noticiasFatuais: [
      {
        id: 'not-camila-1',
        veiculo: 'Folha Vitória',
        titulo: 'Camila Valadão instala CPI de monitoramento da violência contra a mulher na Assembleia do ES',
        resumoFactual: 'Colegiado apurou protocolos de atendimento em delegacias especializadas do interior.',
        dataPublicacao: '15/05/2024',
        urlOriginal: 'https://folhavitoria.com.br'
      }
    ],
    emendas: []
  },

  // 3. VANDINHO LEITE (ES)
  {
    id: 'vandinho-leite',
    nomeCivil: 'Vanderlei Teodoro Leite',
    nomeUrna: 'Vandinho Leite',
    cargo: 'Deputado Estadual',
    partido: 'Partido da Social Democracia Brasileira',
    siglaPartido: 'PSDB',
    numeroUrna: 45000,
    uf: 'ES',
    municipio: 'Serra',
    fotoUrl: '',
    emailGabinete: 'dep.vandinho@al.es.gov.br',
    telefoneGabinete: '(27) 3382-3700',
    dataNascimento: '14/11/1978',
    grauInstrucao: 'Superior Completo (Administração)',
    mandatoAtual: { inicio: 2023, fim: 2027, legislatura: '20ª Legislatura' },
    candidaturaEleitoral: { disputando: true, esfera: 'Estadual', cargoDisputado: 'Deputado Estadual', numeroUrna: 45000, anoEleicao: 2026, situacao: 'Candidato à Reeleição' },
    auditoriaTimestamp: '19/10/2026 às 15:00:00 BRT',
    fonteOficial: 'Assembleia Legislativa do ES / TSE / CGU',
    metricas: { projetosApresentadosTotal: 120, projetosViraramLeiTotal: 15, presencaPlenarioPorcentagem: 97.2, faltasJustificadas: 3, faltasNaoJustificadas: 0, gastoCotaTotalAno: 138000.00, mediaGastoCasaLegislativa: 180000.00, valorEmendasOrcamentarias: 15000000.00, cidadesBeneficiadasTotal: 30 },
    leisSancionadas: [{ id: 'lei-es-defesa-consumidor', numeroLei: 'Lei Estadual 11.450/2022 (Comissão de Defesa do Consumidor)', ano: 2022, tituloOriginal: 'Obrigatoriedade de Atendimento Rápido e SAC Eficiente em Concessionárias de Energia e Água.', resumoLinguagemSimples: 'Fixou prazo máximo de atendimento para religação de luz e água cortadas indevidamente no Espírito Santo.', areaTematica: 'Defesa do Consumidor', status: 'Sancionada' }],
    projetosApresentados: [],
    gastosCategorias: [{ categoria: 'Divulgação Parlamentar', valor: 68000.00 }, { categoria: 'Locação de Veículo', valor: 42000.00 }],
    gastosHistorico: [],
    evolucaoBens: [{ anoEleicao: 2022, valorTotalDeclarado: 890000.00, principaisBens: ['Casa na Serra/ES', 'Veículo', 'Investimentos'] }],
    processosJudiciais: [],
    noticiasFatuais: [{ id: 'not-vandinho-1', veiculo: 'A Gazeta (ES)', titulo: 'Vandinho Leite preside audiências públicas contra altas tarifas de pedágio na Rodovia do Sol', resumoFactual: 'Parlamentar atuou pelo fim da cobrança e incorporação da via ao Estado.', dataPublicacao: '20/12/2023', urlOriginal: 'https://agazeta.com.br' }],
    emendas: []
  },

  // 4. EDUARDO SUPLICY (SP)
  {
    id: 'eduardo-suplicy',
    nomeCivil: 'Eduardo Matarazzo Suplicy',
    nomeUrna: 'Eduardo Suplicy',
    cargo: 'Deputado Estadual',
    partido: 'Partido dos Trabalhadores',
    siglaPartido: 'PT',
    numeroUrna: 13180,
    uf: 'SP',
    municipio: 'São Paulo',
    fotoUrl: '',
    emailGabinete: 'dep.esuplicy@al.sp.gov.br',
    telefoneGabinete: '(11) 3886-6000',
    dataNascimento: '21/06/1941',
    grauInstrucao: 'Superior Completo (Economia pela FGV e Doutorado em Economia na Michigan State University)',
    mandatoAtual: { inicio: 2023, fim: 2027, legislatura: '20ª Legislatura da ALESP' },
    candidaturaEleitoral: { disputando: true, esfera: 'Estadual', cargoDisputado: 'Deputado Estadual', numeroUrna: 13180, anoEleicao: 2026, situacao: 'Candidato à Reeleição' },
    auditoriaTimestamp: '19/10/2026 às 15:00:00 BRT',
    fonteOficial: 'ALESP / TSE / CGU',
    metricas: { projetosApresentadosTotal: 180, projetosViraramLeiTotal: 22, presencaPlenarioPorcentagem: 98.9, faltasJustificadas: 1, faltasNaoJustificadas: 0, gastoCotaTotalAno: 95000.00, mediaGastoCasaLegislativa: 195000.00, valorEmendasOrcamentarias: 18000000.00, cidadesBeneficiadasTotal: 40 },
    leisSancionadas: [{ id: 'lei-renda-basica-cidadania-sp', numeroLei: 'Lei Estadual 17.700/2023 (Frente Parlamentar da Renda Básica)', ano: 2023, tituloOriginal: 'Incentiva a Implementação Progressiva da Renda Básica de Cidadania no Estado de São Paulo.', resumoLinguagemSimples: 'Cria diretrizes para transferência de renda universal incondicional para as famílias mais pobres do estado.', areaTematica: 'Desenvolvimento Social', status: 'Sancionada' }],
    projetosApresentados: [],
    gastosCategorias: [{ categoria: 'Apoio Técnico ao Gabinete', valor: 45000.00 }, { categoria: 'Divulgação Reduzida', valor: 30000.00 }],
    gastosHistorico: [],
    evolucaoBens: [{ anoEleicao: 2018, valorTotalDeclarado: 3200000.00, principaisBens: ['Apartamento em SP', 'Quotas de empresas familiares', 'Aplicações bancárias'] }, { anoEleicao: 2022, valorTotalDeclarado: 3800000.00, principaisBens: ['Imóveis residenciais', 'Participações societárias'] }],
    processosJudiciais: [],
    noticiasFatuais: [{ id: 'not-suplicy-1', veiculo: 'Folha de S.Paulo', titulo: 'Eduardo Suplicy defende na Alesp o uso medicinal da cannabis no SUS paulista', resumoFactual: 'Parlamentar participou da regulamentação da distribuição gratuita de medicamentos à base de canabidiol.', dataPublicacao: '15/03/2024', urlOriginal: 'https://folha.uol.com.br' }],
    emendas: []
  },

  // 5. RODRIGO BACELLAR (RJ) - Presidente da ALERJ
  {
    id: 'rodrigo-bacellar',
    nomeCivil: 'Rodrigo da Silva Bacellar',
    nomeUrna: 'Rodrigo Bacellar',
    cargo: 'Deputado Estadual',
    partido: 'União Brasil',
    siglaPartido: 'UNIÃO',
    numeroUrna: 44000,
    uf: 'RJ',
    municipio: 'Campos dos Goytacazes',
    fotoUrl: '',
    emailGabinete: 'presidencia@alerj.rj.gov.br',
    telefoneGabinete: '(21) 2588-1000',
    dataNascimento: '05/04/1980',
    grauInstrucao: 'Superior Completo (Direito)',
    mandatoAtual: { inicio: 2023, fim: 2027, legislatura: '20ª Legislatura (Presidente da ALERJ)' },
    candidaturaEleitoral: { disputando: true, esfera: 'Estadual', cargoDisputado: 'Deputado Estadual', numeroUrna: 44000, anoEleicao: 2026, situacao: 'Candidato à Reeleição' },
    auditoriaTimestamp: '19/10/2026 às 15:00:00 BRT',
    fonteOficial: 'ALERJ / TSE / TCE-RJ',
    metricas: { projetosApresentadosTotal: 110, projetosViraramLeiTotal: 25, presencaPlenarioPorcentagem: 98.5, faltasJustificadas: 1, faltasNaoJustificadas: 0, gastoCotaTotalAno: 160000.00, mediaGastoCasaLegislativa: 190000.00, valorEmendasOrcamentarias: 22000000.00, cidadesBeneficiadasTotal: 50 },
    leisSancionadas: [{ id: 'lei-seguranca-rj-alerj', numeroLei: 'Lei Estadual 10.100/2023 (Presidência da ALERJ)', ano: 2023, tituloOriginal: 'Fundo Especial de Investimento na Polícia Civil e Militar do Estado do Rio.', resumoLinguagemSimples: 'Repassou R$ 100 milhões da economia da Alerj para compra de viaturas e armamentos novos.', areaTematica: 'Segurança Pública', status: 'Sancionada' }],
    projetosApresentados: [],
    gastosCategorias: [{ categoria: 'Divulgação Parlamentar Institucional', valor: 75000.00 }, { categoria: 'Deslocamentos pelo Interior do RJ', valor: 55000.00 }],
    gastosHistorico: [],
    evolucaoBens: [{ anoEleicao: 2022, valorTotalDeclarado: 2100000.00, principaisBens: ['Casa em Campos', 'Apartamento no Rio', 'Veículo'] }],
    processosJudiciais: [],
    noticiasFatuais: [{ id: 'not-bacellar-1', veiculo: 'O Globo', titulo: 'Rodrigo Bacellar conduz votações do regime fiscal e pacote de segurança na Alerj', resumoFactual: 'Presidente da Casa pautou matérias prioritárias de consenso das bancadas.', dataPublicacao: '11/06/2024', urlOriginal: 'https://oglobo.globo.com' }],
    emendas: []
  }
];
