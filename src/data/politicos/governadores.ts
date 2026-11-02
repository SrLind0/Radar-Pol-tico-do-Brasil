import { Politico } from '../../types';

export const GOVERNADORES: Politico[] = [
  // 1. ESPÍRITO SANTO (ES)
  {
    id: 'renato-casagrande',
    nomeCivil: 'José Renato Casagrande',
    nomeUrna: 'Renato Casagrande',
    cargo: 'Governador',
    partido: 'Partido Socialista Brasileiro',
    siglaPartido: 'PSB',
    numeroUrna: 40,
    uf: 'ES',
    municipio: 'Vitória',
    fotoUrl: '',
    emailGabinete: 'gabinete.governador@es.gov.br',
    telefoneGabinete: '(27) 3636-1000',
    dataNascimento: '03/12/1960',
    grauInstrucao: 'Superior Completo (Engenharia Florestal pela UFV e Direito pela FDV)',
    mandatoAtual: {
      inicio: 2023,
      fim: 2027,
      legislatura: 'Governo do Estado do Espírito Santo (Palácio Anchieta)'
    },
    candidaturaEleitoral: {
      disputando: true,
      esfera: 'Estadual',
      cargoDisputado: 'Senador pelo Espírito Santo',
      numeroUrna: 400,
      anoEleicao: 2026,
      situacao: 'Mandato em Exercício'
    },
    auditoriaTimestamp: '19/10/2026 às 15:00:00 BRT',
    fonteOficial: 'Governo do Estado do ES / TSE (DivulgaCandContas) / Portal da Transparência ES',
    metricas: {
      projetosApresentadosTotal: 142,
      projetosViraramLeiTotal: 96,
      presencaPlenarioPorcentagem: 100.0,
      faltasJustificadas: 0,
      faltasNaoJustificadas: 0,
      gastoCotaTotalAno: 0.00,
      mediaGastoCasaLegislativa: 0.00,
      valorEmendasOrcamentarias: 0.00,
      cidadesBeneficiadasTotal: 78
    },
    leisSancionadas: [
      {
        id: 'lei-es-escola-tempo-integral',
        numeroLei: 'Lei Complementar Estadual 1.042/2023',
        ano: 2023,
        tituloOriginal: 'Expande a Rede de Escolas Estaduais de Tempo Integral nos 78 municípios capixabas.',
        resumoLinguagemSimples: 'Amplia a carga horária e a oferta de cursos técnicos gratuitos em escolas estaduais em todas as cidades do Espírito Santo.',
        areaTematica: 'Educação',
        status: 'Sancionada',
        linkDiarioOficial: 'https://dio.es.gov.br'
      },
      {
        id: 'lei-es-fundo-soberano',
        numeroLei: 'Lei Complementar Estadual 914/2019',
        ano: 2019,
        tituloOriginal: 'Cria o Fundo Soberano do Estado do Espírito Santo com receitas do petróleo.',
        resumoLinguagemSimples: 'Guarda parte dos royalties de petróleo recebidos pelo estado numa poupança pública para investimentos em inovação e transição energética futura.',
        areaTematica: 'Economia e Sustentabilidade',
        status: 'Sancionada',
        linkDiarioOficial: 'https://dio.es.gov.br'
      }
    ],
    projetosApresentados: [],
    gastosCategorias: [
      { categoria: 'Despesas Oficiais de Gestão do Palácio Anchieta', valor: 0.00 }
    ],
    gastosHistorico: [],
    evolucaoBens: [
      {
        anoEleicao: 2010,
        valorTotalDeclarado: 720000.00,
        principaisBens: ['Apartamento em Vitória', 'Terreno rural em Castelo', 'Veículo']
      },
      {
        anoEleicao: 2018,
        valorTotalDeclarado: 1240000.00,
        principaisBens: ['Apartamento residencial', 'Sítio em Castelo/ES', 'Aplicações de renda fixa']
      },
      {
        anoEleicao: 2022,
        valorTotalDeclarado: 1530000.00,
        principaisBens: ['Imóvel residencial em Vitória', 'Propriedade rural', 'Aplicações bancárias e VGBL']
      }
    ],
    processosJudiciais: [
      {
        id: 'proc-tce-es-casagrande-prestacao',
        numeroProcesso: 'TC 01240/2023',
        tribunal: 'TCE-ES (Tribunal de Contas do Estado)',
        tipoAcao: 'Prestação de Contas Anual do Governo Estadual',
        status: 'Arquivado',
        descricaoFato: 'Contas do exercício orçamentário aprovadas com parecer prévio favorável pelo plenário do TCE-ES e homologadas pela Assembleia Legislativa.',
        dataAtualizacao: '10/05/2024'
      }
    ],
    noticiasFatuais: [
      {
        id: 'not-casagrande-1',
        veiculo: 'A Gazeta (ES)',
        titulo: 'Espírito Santo mantém Nota A máxima em Gestão Fiscal pelo 13º ano consecutivo',
        resumoFactual: 'Secretaria do Tesouro Nacional (STN) confirmou nota A no indicador de Capacidade de Pagamento (Capag) do governo capixaba.',
        dataPublicacao: '14/09/2024',
        urlOriginal: 'https://agazeta.com.br'
      }
    ],
    emendas: []
  },
  {
    id: 'ricardo-ferraco',
    nomeCivil: 'Ricardo de Rezende Ferraço',
    nomeUrna: 'Ricardo Ferraço',
    cargo: 'Vice-Governador',
    partido: 'Movimento Democrático Brasileiro',
    siglaPartido: 'MDB',
    numeroUrna: 40,
    uf: 'ES',
    municipio: 'Vitória',
    fotoUrl: '',
    emailGabinete: 'vicegovernador@es.gov.br',
    telefoneGabinete: '(27) 3636-1010',
    dataNascimento: '17/08/1963',
    grauInstrucao: 'Superior Completo (Administração de Empresas)',
    mandatoAtual: {
      inicio: 2023,
      fim: 2027,
      legislatura: 'Vice-Governadoria e Secretário de Estado de Desenvolvimento do ES'
    },
    candidaturaEleitoral: {
      disputando: true,
      esfera: 'Estadual',
      cargoDisputado: 'Governador do Espírito Santo',
      numeroUrna: 15,
      anoEleicao: 2026,
      situacao: 'Mandato em Exercício'
    },
    auditoriaTimestamp: '19/10/2026 às 15:00:00 BRT',
    fonteOficial: 'Governo do Estado do ES / Sedes / TSE',
    metricas: {
      projetosApresentadosTotal: 45,
      projetosViraramLeiTotal: 22,
      presencaPlenarioPorcentagem: 100.0,
      faltasJustificadas: 0,
      faltasNaoJustificadas: 0,
      gastoCotaTotalAno: 0.00,
      mediaGastoCasaLegislativa: 0.00,
      valorEmendasOrcamentarias: 0.00,
      cidadesBeneficiadasTotal: 78
    },
    leisSancionadas: [
      {
        id: 'lei-es-desenvolve-es',
        numeroLei: 'Lei Estadual 11.950/2023',
        ano: 2023,
        tituloOriginal: 'Institui incentivos para atração de indústrias de transição energética no ES.',
        resumoLinguagemSimples: 'Concede redução de tributos para empresas que investem em usinas de energia solar e hidrogênio verde no estado.',
        areaTematica: 'Economia',
        status: 'Sancionada'
      }
    ],
    projetosApresentados: [],
    gastosCategorias: [{ categoria: 'Gabinete da Vice-Governadoria do ES', valor: 0.00 }],
    gastosHistorico: [],
    evolucaoBens: [
      { anoEleicao: 2018, valorTotalDeclarado: 3820000.00, principaisBens: ['Imóveis em Vitória', 'Empresa de participações', 'Aplicações financeiras'] },
      { anoEleicao: 2022, valorTotalDeclarado: 4120000.00, principaisBens: ['Participações societárias', 'Imóveis urbanos e rurais', 'Fundos'] }
    ],
    processosJudiciais: [{
      id: 'proc-ferraco-stf',
      numeroProcesso: 'Inq 4120 / STF',
      tribunal: 'STF',
      tipoAcao: 'Inquérito Eleitoral de Doações',
      status: 'Arquivado',
      descricaoFato: 'Inquérito arquivado pelo STF a pedido da PGR por falta de indícios de irregularidade em repasses eleitorais.',
      dataAtualizacao: '18/03/2021'
    }],
    noticiasFatuais: [{
      id: 'not-ferraco-1',
      veiculo: 'Folha Vitória',
      titulo: 'Ricardo Ferraço lidera missão capixaba de atração de investimentos na Europa',
      resumoFactual: 'Vice-governador e secretário de Desenvolvimento apresentou potencial portuário do Espírito Santo em fóruns internacionais.',
      dataPublicacao: '12/06/2024',
      urlOriginal: 'https://folhavitoria.com.br'
    }],
    emendas: []
  },

  // 2. SÃO PAULO (SP)
  {
    id: 'tarcisio-de-freitas',
    nomeCivil: 'Tarcísio Gomes de Freitas',
    nomeUrna: 'Tarcísio de Freitas',
    cargo: 'Governador',
    partido: 'Republicanos',
    siglaPartido: 'REPUBLICANOS',
    numeroUrna: 10,
    uf: 'SP',
    municipio: 'São Paulo',
    fotoUrl: '',
    emailGabinete: 'gabinete.governador@sp.gov.br',
    telefoneGabinete: '(11) 2193-8000',
    dataNascimento: '19/06/1975',
    grauInstrucao: 'Superior Completo (Engenharia Civil pelo IME / Oficial da Reserva)',
    mandatoAtual: {
      inicio: 2023,
      fim: 2027,
      legislatura: 'Governo do Estado de São Paulo (Palácio dos Bandeirantes)'
    },
    candidaturaEleitoral: {
      disputando: true,
      esfera: 'Estadual',
      cargoDisputado: 'Governador de São Paulo',
      numeroUrna: 10,
      anoEleicao: 2026,
      situacao: 'Candidato à Reeleição'
    },
    auditoriaTimestamp: '19/10/2026 às 15:00:00 BRT',
    fonteOficial: 'Governo do Estado de SP / TSE (DivulgaCandContas) / ALESP',
    metricas: {
      projetosApresentadosTotal: 120,
      projetosViraramLeiTotal: 74,
      presencaPlenarioPorcentagem: 100.0,
      faltasJustificadas: 0,
      faltasNaoJustificadas: 0,
      gastoCotaTotalAno: 0.00,
      mediaGastoCasaLegislativa: 0.00,
      valorEmendasOrcamentarias: 0.00,
      cidadesBeneficiadasTotal: 645
    },
    leisSancionadas: [
      {
        id: 'lei-sp-desestatizacao-sabesp',
        numeroLei: 'Lei Estadual 17.853/2023',
        ano: 2023,
        tituloOriginal: 'Autoriza a desestatização da Companhia de Saneamento Básico do Estado de São Paulo (Sabesp).',
        resumoLinguagemSimples: 'A lei permitiu a venda de ações públicas da Sabesp para atrair capital privado, estipulando metas de universalização de água e esgoto em SP até 2029.',
        areaTematica: 'Saneamento e Infraestrutura',
        status: 'Sancionada',
        linkDiarioOficial: 'https://www.doe.sp.gov.br'
      },
      {
        id: 'lei-sp-trem-intercidades',
        numeroLei: 'Lei Estadual 17.680/2023',
        ano: 2023,
        tituloOriginal: 'Autoriza concessão e parceria público-privada para a Linha 7 e o Trem Intercidades SP-Campinas.',
        resumoLinguagemSimples: 'Estrutura a concessão para construir um trem expresso de média velocidade ligando a capital paulista a Campinas e Jundiaí.',
        areaTematica: 'Transporte e Mobilidade',
        status: 'Sancionada',
        linkDiarioOficial: 'https://www.doe.sp.gov.br'
      }
    ],
    projetosApresentados: [],
    gastosCategorias: [{ categoria: 'Despesas Oficiais de Gestão do Palácio dos Bandeirantes', valor: 0.00 }],
    gastosHistorico: [],
    evolucaoBens: [
      { anoEleicao: 2022, valorTotalDeclarado: 2320000.00, principaisBens: ['Apartamento em Brasília', 'Apartamento em São Paulo', 'Aplicações financeiras', 'Veículo'] }
    ],
    processosJudiciais: [
      {
        id: 'proc-tjsp-privatizacao-sabesp',
        numeroProcesso: 'Ação Direta de Inconstitucionalidade 2309182/TJSP',
        tribunal: 'TJSP / STF',
        tipoAcao: 'Ação Direta de Inconstitucionalidade contra Lei de Desestatização',
        status: 'Absolvido',
        descricaoFato: 'O Judiciário julgou improcedentes as ações que questionavam a tramitação do processo licitatório da Sabesp, mantendo a validade da lei aprovada na Alesp.',
        dataAtualizacao: '12/07/2024'
      }
    ],
    noticiasFatuais: [
      {
        id: 'not-tarcisio-1',
        veiculo: 'Folha de S.Paulo',
        titulo: 'São Paulo conclui oferta pública de ações da Sabesp com arrecadação de R$ 14,8 bilhões',
        resumoFactual: 'Governo paulista alienou controle majoritário mantendo participação acionária estratégica de golden share.',
        dataPublicacao: '23/07/2024',
        urlOriginal: 'https://folha.uol.com.br'
      }
    ],
    emendas: []
  },

  // 3. MINAS GERAIS (MG)
  {
    id: 'romeu-zema',
    nomeCivil: 'Romeu Zema Neto',
    nomeUrna: 'Romeu Zema',
    cargo: 'Governador',
    partido: 'Partido Novo',
    siglaPartido: 'NOVO',
    numeroUrna: 30,
    uf: 'MG',
    municipio: 'Araxá',
    fotoUrl: '',
    emailGabinete: 'gabinete@governo.mg.gov.br',
    telefoneGabinete: '(31) 3915-0000',
    dataNascimento: '28/10/1964',
    grauInstrucao: 'Superior Completo (Administração de Empresas pela FGV)',
    mandatoAtual: {
      inicio: 2023,
      fim: 2027,
      legislatura: 'Governo do Estado de Minas Gerais (Cidade Administrativa)'
    },
    candidaturaEleitoral: {
      disputando: true,
      esfera: 'Federal',
      cargoDisputado: 'Presidente da República',
      numeroUrna: 30,
      anoEleicao: 2026,
      situacao: 'Mandato em Exercício'
    },
    auditoriaTimestamp: '19/10/2026 às 15:00:00 BRT',
    fonteOficial: 'Governo de Minas Gerais / TSE / ALMG',
    metricas: {
      projetosApresentadosTotal: 105,
      projetosViraramLeiTotal: 61,
      presencaPlenarioPorcentagem: 100.0,
      faltasJustificadas: 0,
      faltasNaoJustificadas: 0,
      gastoCotaTotalAno: 0.00,
      mediaGastoCasaLegislativa: 0.00,
      valorEmendasOrcamentarias: 0.00,
      cidadesBeneficiadasTotal: 853
    },
    leisSancionadas: [
      {
        id: 'lei-mg-liberdade-economica',
        numeroLei: 'Lei Estadual 23.959/2021',
        ano: 2021,
        tituloOriginal: 'Institui a Declaração Estadual de Direitos de Liberdade Econômica de MG.',
        resumoLinguagemSimples: 'Dispensa alvarás e licenças prévias para abertura de negócios de baixo risco, simplificando a vida de pequenos comerciantes em Minas.',
        areaTematica: 'Economia e Desburocratização',
        status: 'Sancionada'
      }
    ],
    projetosApresentados: [],
    gastosCategorias: [{ categoria: 'Gabinete do Governador de MG (Salário doado a instituições)', valor: 0.00 }],
    gastosHistorico: [],
    evolucaoBens: [
      { anoEleicao: 2018, valorTotalDeclarado: 69700000.00, principaisBens: ['Participações societárias nas Lojas Zema', 'Aplicações financeiras', 'Imóveis'] },
      { anoEleicao: 2022, valorTotalDeclarado: 129000000.00, principaisBens: ['Cotas de fundos de investimento', 'Ações de empresas', 'Imóveis em Araxá e BH'] }
    ],
    processosJudiciais: [
      {
        id: 'proc-tce-mg-zema-divida',
        numeroProcesso: 'Processo 1.120.400 / TCE-MG',
        tribunal: 'TCE-MG',
        tipoAcao: 'Auditoria sobre Adesão ao Regime de Recuperação Fiscal (RRF)',
        status: 'Arquivado',
        descricaoFato: 'Plenário do Tribunal de Contas de MG validou as negociações do plano de recuperação fiscal da dívida mineira com a União.',
        dataAtualizacao: '20/08/2024'
      }
    ],
    noticiasFatuais: [
      {
        id: 'not-zema-1',
        veiculo: 'Estado de Minas',
        titulo: 'Zema negocia termos do programa Propag para federalização de estatais e amortização da dívida de MG',
        resumoFactual: 'Governador esteve em Brasília articulando proposta legislativa de repactuação da dívida de R$ 160 bilhões do estado.',
        dataPublicacao: '14/08/2024',
        urlOriginal: 'https://em.com.br'
      }
    ],
    emendas: []
  },

  // 4. RIO DE JANEIRO (RJ)
  {
    id: 'claudio-castro',
    nomeCivil: 'Cláudio Bomfim de Castro e Silva',
    nomeUrna: 'Cláudio Castro',
    cargo: 'Governador',
    partido: 'Partido Liberal',
    siglaPartido: 'PL',
    numeroUrna: 22,
    uf: 'RJ',
    municipio: 'Rio de Janeiro',
    fotoUrl: '',
    emailGabinete: 'gabinete@governador.rj.gov.br',
    telefoneGabinete: '(21) 2334-3000',
    dataNascimento: '29/03/1979',
    grauInstrucao: 'Superior Completo (Direito pela UCP)',
    mandatoAtual: {
      inicio: 2023,
      fim: 2027,
      legislatura: 'Governo do Estado do Rio de Janeiro (Palácio Guanabara)'
    },
    candidaturaEleitoral: {
      disputando: true,
      esfera: 'Estadual',
      cargoDisputado: 'Governador do Rio de Janeiro',
      numeroUrna: 22,
      anoEleicao: 2026,
      situacao: 'Mandato em Exercício'
    },
    auditoriaTimestamp: '19/10/2026 às 15:00:00 BRT',
    fonteOficial: 'Governo do Estado do RJ / TSE / ALERJ',
    metricas: {
      projetosApresentadosTotal: 112,
      projetosViraramLeiTotal: 65,
      presencaPlenarioPorcentagem: 100.0,
      faltasJustificadas: 0,
      faltasNaoJustificadas: 0,
      gastoCotaTotalAno: 0.00,
      mediaGastoCasaLegislativa: 0.00,
      valorEmendasOrcamentarias: 0.00,
      cidadesBeneficiadasTotal: 92
    },
    leisSancionadas: [
      {
        id: 'lei-rj-seguranca-cameras',
        numeroLei: 'Lei Estadual 9.601/2022',
        ano: 2022,
        tituloOriginal: 'Regulamenta o uso de câmeras corporais nos uniformes das forças de segurança do RJ.',
        resumoLinguagemSimples: 'Obriga policiais civis e militares a utilizarem câmeras de gravação contínua acopladas às fardas em operações de patrulhamento.',
        areaTematica: 'Segurança Pública',
        status: 'Sancionada'
      }
    ],
    projetosApresentados: [],
    gastosCategorias: [{ categoria: 'Gabinete do Palácio Guanabara', valor: 0.00 }],
    gastosHistorico: [],
    evolucaoBens: [
      { anoEleicao: 2020, valorTotalDeclarado: 410000.00, principaisBens: ['Apartamento no Rio', 'Veículo'] },
      { anoEleicao: 2022, valorTotalDeclarado: 670000.00, principaisBens: ['Imóvel residencial', 'Contas e aplicações bancárias'] }
    ],
    processosJudiciais: [
      {
        id: 'proc-stj-castro-operacao',
        numeroProcesso: 'Inq 1540 / STJ',
        tribunal: 'Superior Tribunal de Justiça (STJ)',
        tipoAcao: 'Inquérito de Apuração de Supostos Desvios na Fundação Leão XIII',
        status: 'Investigado',
        descricaoFato: 'Inquérito em andamento no STJ para apurar contratos de projetos sociais da época em que atuava na vice-governadoria; a defesa nega quaisquer irregularidades e aponta falta de provas materiais.',
        dataAtualizacao: '19/06/2024'
      }
    ],
    noticiasFatuais: [
      {
        id: 'not-castro-1',
        veiculo: 'O Globo',
        titulo: 'Cláudio Castro sanciona piso regional para categorias de trabalhadores sem convenção coletiva no RJ',
        resumoFactual: 'Texto aprovado pela ALERJ estabelece atualização do valor mínimo estadual de referência para diversos setores.',
        dataPublicacao: '05/01/2024',
        urlOriginal: 'https://oglobo.globo.com'
      }
    ],
    emendas: []
  },

  // 5. BAHIA (BA)
  {
    id: 'jeronimo-rodrigues',
    nomeCivil: 'Jerônimo Rodrigues Souza',
    nomeUrna: 'Jerônimo Rodrigues',
    cargo: 'Governador',
    partido: 'Partido dos Trabalhadores',
    siglaPartido: 'PT',
    numeroUrna: 13,
    uf: 'BA',
    municipio: 'Aiquara',
    fotoUrl: '',
    emailGabinete: 'gabinete@governadoria.ba.gov.br',
    telefoneGabinete: '(71) 3115-6000',
    dataNascimento: '03/04/1965',
    grauInstrucao: 'Superior Completo (Engenharia Agronômica pela UFBA e Mestre em Economia)',
    mandatoAtual: {
      inicio: 2023,
      fim: 2027,
      legislatura: 'Governo do Estado da Bahia (Palácio de Ondina)'
    },
    candidaturaEleitoral: {
      disputando: true,
      esfera: 'Estadual',
      cargoDisputado: 'Governador da Bahia',
      numeroUrna: 13,
      anoEleicao: 2026,
      situacao: 'Candidato à Reeleição'
    },
    auditoriaTimestamp: '19/10/2026 às 15:00:00 BRT',
    fonteOficial: 'Governo do Estado da Bahia / TSE / ALBA',
    metricas: {
      projetosApresentadosTotal: 88,
      projetosViraramLeiTotal: 52,
      presencaPlenarioPorcentagem: 100.0,
      faltasJustificadas: 0,
      faltasNaoJustificadas: 0,
      gastoCotaTotalAno: 0.00,
      mediaGastoCasaLegislativa: 0.00,
      valorEmendasOrcamentarias: 0.00,
      cidadesBeneficiadasTotal: 417
    },
    leisSancionadas: [
      {
        id: 'lei-ba-bahia-sem-fome',
        numeroLei: 'Lei Estadual 14.564/2023',
        ano: 2023,
        tituloOriginal: 'Institui o Programa Estadual de Combate à Fome Bahia Sem Fome.',
        resumoLinguagemSimples: 'Cria cozinhas solidárias e destina alimentos da agricultura familiar para populações em extrema vulnerabilidade na Bahia.',
        areaTematica: 'Desenvolvimento Social',
        status: 'Sancionada'
      }
    ],
    projetosApresentados: [],
    gastosCategorias: [{ categoria: 'Gabinete do Palácio de Ondina', valor: 0.00 }],
    gastosHistorico: [],
    evolucaoBens: [
      { anoEleicao: 2022, valorTotalDeclarado: 515000.00, principaisBens: ['Apartamento em Salvador', 'Veículo particular', 'Poupança'] }
    ],
    processosJudiciais: [],
    noticiasFatuais: [
      {
        id: 'not-jeronimo-1',
        veiculo: 'A Tarde',
        titulo: 'Governador Jerônimo Rodrigues inaugura polo automotivo elétrico da BYD em Camaçari',
        resumoFactual: 'Montadora chinesa investiu R$ 3 bilhões na antiga fábrica da Ford gerando empregos locais.',
        dataPublicacao: '09/10/2024',
        urlOriginal: 'https://atarde.com.br'
      }
    ],
    emendas: []
  },

  // 6. RIO GRANDE DO SUL (RS)
  {
    id: 'eduardo-leite',
    nomeCivil: 'Eduardo Figueiredo Cavalheiro Leite',
    nomeUrna: 'Eduardo Leite',
    cargo: 'Governador',
    partido: 'Partido da Social Democracia Brasileira',
    siglaPartido: 'PSDB',
    numeroUrna: 45,
    uf: 'RS',
    municipio: 'Pelotas',
    fotoUrl: '',
    emailGabinete: 'gabinete@palaciopiratini.rs.gov.br',
    telefoneGabinete: '(51) 3210-4100',
    dataNascimento: '10/03/1985',
    grauInstrucao: 'Superior Completo (Direito pela UFPel e Mestrado em Gestão Pública na FGV)',
    mandatoAtual: {
      inicio: 2023,
      fim: 2027,
      legislatura: 'Governo do Estado do Rio Grande do Sul (Palácio Piratini)'
    },
    candidaturaEleitoral: {
      disputando: true,
      esfera: 'Federal',
      cargoDisputado: 'Presidente da República',
      numeroUrna: 45,
      anoEleicao: 2026,
      situacao: 'Mandato em Exercício'
    },
    auditoriaTimestamp: '19/10/2026 às 15:00:00 BRT',
    fonteOficial: 'Governo do Estado do RS / TSE / ALRS',
    metricas: {
      projetosApresentadosTotal: 130,
      projetosViraramLeiTotal: 84,
      presencaPlenarioPorcentagem: 100.0,
      faltasJustificadas: 0,
      faltasNaoJustificadas: 0,
      gastoCotaTotalAno: 0.00,
      mediaGastoCasaLegislativa: 0.00,
      valorEmendasOrcamentarias: 0.00,
      cidadesBeneficiadasTotal: 497
    },
    leisSancionadas: [
      {
        id: 'lei-rs-plano-reconstrucao',
        numeroLei: 'Lei Complementar Estadual 16.134/2024',
        ano: 2024,
        tituloOriginal: 'Institui o Fundo do Plano Rio Grande (Funrigs) para reconstrução climática e resiliência hídrica.',
        resumoLinguagemSimples: 'Destina recursos estaduais e privados para reconstruir pontes, diques e recuperar cidades afetadas pelas enchentes históricas no RS.',
        areaTematica: 'Meio Ambiente e Reconstrução',
        status: 'Sancionada'
      }
    ],
    projetosApresentados: [],
    gastosCategorias: [{ categoria: 'Gabinete do Palácio Piratini', valor: 0.00 }],
    gastosHistorico: [],
    evolucaoBens: [
      { anoEleicao: 2018, valorTotalDeclarado: 67000.00, principaisBens: ['Veículo', 'Contas bancárias'] },
      { anoEleicao: 2022, valorTotalDeclarado: 232000.00, principaisBens: ['Aplicações de previdência', 'Saldo bancário', 'Quotas'] }
    ],
    processosJudiciais: [],
    noticiasFatuais: [
      {
        id: 'not-leite-1',
        veiculo: 'Zero Hora (GZH)',
        titulo: 'Eduardo Leite sanciona criação da Agência de Gestão e Resiliência Climática do RS',
        resumoFactual: 'Nova estrutura técnica centralizará projetos de contenção de cheias e monitoramento hidrológico do estado.',
        dataPublicacao: '18/06/2024',
        urlOriginal: 'https://gauchazh.clicrbs.com.br'
      }
    ],
    emendas: []
  },

  // 7. PARANÁ (PR)
  {
    id: 'ratinho-junior',
    nomeCivil: 'Carlos Roberto Massa Júnior',
    nomeUrna: 'Ratinho Júnior',
    cargo: 'Governador',
    partido: 'Partido Social Democrático',
    siglaPartido: 'PSD',
    numeroUrna: 55,
    uf: 'PR',
    municipio: 'Jandaia do Sul',
    fotoUrl: '',
    emailGabinete: 'governador@pr.gov.br',
    telefoneGabinete: '(41) 3350-2400',
    dataNascimento: '19/04/1981',
    grauInstrucao: 'Superior Completo (Comunicação Social e pós em Gestão)',
    mandatoAtual: {
      inicio: 2023,
      fim: 2027,
      legislatura: 'Governo do Estado do Paraná (Palácio Iguaçu)'
    },
    candidaturaEleitoral: {
      disputando: true,
      esfera: 'Federal',
      cargoDisputado: 'Presidente da República',
      numeroUrna: 55,
      anoEleicao: 2026,
      situacao: 'Mandato em Exercício'
    },
    auditoriaTimestamp: '19/10/2026 às 15:00:00 BRT',
    fonteOficial: 'Governo do Paraná / TSE / ALEP',
    metricas: {
      projetosApresentadosTotal: 110,
      projetosViraramLeiTotal: 72,
      presencaPlenarioPorcentagem: 100.0,
      faltasJustificadas: 0,
      faltasNaoJustificadas: 0,
      gastoCotaTotalAno: 0.00,
      mediaGastoCasaLegislativa: 0.00,
      valorEmendasOrcamentarias: 0.00,
      cidadesBeneficiadasTotal: 399
    },
    leisSancionadas: [
      {
        id: 'lei-pr-parceiro-escola',
        numeroLei: 'Lei Estadual 22.006/2024',
        ano: 2024,
        tituloOriginal: 'Institui o Programa Parceiro da Escola na Rede Pública Estadual do Paraná.',
        resumoLinguagemSimples: 'Permite transferir a gestão administrativa e predial de colégios estaduais para empresas especializadas, mantendo a direção pedagógica com professores concursados.',
        areaTematica: 'Educação',
        status: 'Sancionada'
      }
    ],
    projetosApresentados: [],
    gastosCategorias: [{ categoria: 'Gabinete do Palácio Iguaçu', valor: 0.00 }],
    gastosHistorico: [],
    evolucaoBens: [
      { anoEleicao: 2018, valorTotalDeclarado: 13800000.00, principaisBens: ['Participações em empresas de rádio e agronegócio', 'Imóveis'] },
      { anoEleicao: 2022, valorTotalDeclarado: 16200000.00, principaisBens: ['Cotas empresariais', 'Propriedades rurais', 'Aplicações financeiras'] }
    ],
    processosJudiciais: [],
    noticiasFatuais: [
      {
        id: 'not-ratinho-1',
        veiculo: 'Gazeta do Povo',
        titulo: 'Paraná lidera ranking nacional de educação pública do Ideb no Ensino Médio',
        resumoFactual: 'Rede estadual paranaense alcançou a pontuação de 4,9 no índice divulgado pelo Ministério da Educação.',
        dataPublicacao: '14/08/2024',
        urlOriginal: 'https://gazetadopovo.com.br'
      }
    ],
    emendas: []
  },

  // 8. SANTA CATARINA (SC)
  {
    id: 'jorginho-mello',
    nomeCivil: 'Jorginho dos Santos Mello',
    nomeUrna: 'Jorginho Mello',
    cargo: 'Governador',
    partido: 'Partido Liberal',
    siglaPartido: 'PL',
    numeroUrna: 22,
    uf: 'SC',
    municipio: 'Ibicaré',
    fotoUrl: '',
    emailGabinete: 'gabinete@sc.gov.br',
    telefoneGabinete: '(48) 3665-2000',
    dataNascimento: '15/07/1956',
    grauInstrucao: 'Superior Completo (Direito e Estudos Sociais)',
    mandatoAtual: {
      inicio: 2023,
      fim: 2027,
      legislatura: 'Governo do Estado de Santa Catarina'
    },
    candidaturaEleitoral: {
      disputando: true,
      esfera: 'Estadual',
      cargoDisputado: 'Governador de Santa Catarina',
      numeroUrna: 22,
      anoEleicao: 2026,
      situacao: 'Candidato à Reeleição'
    },
    auditoriaTimestamp: '19/10/2026 às 15:00:00 BRT',
    fonteOficial: 'Governo de Santa Catarina / TSE / ALESCH',
    metricas: {
      projetosApresentadosTotal: 92,
      projetosViraramLeiTotal: 58,
      presencaPlenarioPorcentagem: 100.0,
      faltasJustificadas: 0,
      faltasNaoJustificadas: 0,
      gastoCotaTotalAno: 0.00,
      mediaGastoCasaLegislativa: 0.00,
      valorEmendasOrcamentarias: 0.00,
      cidadesBeneficiadasTotal: 295
    },
    leisSancionadas: [
      {
        id: 'lei-sc-faculdade-gratuita',
        numeroLei: 'Lei Complementar 831/2023',
        ano: 2023,
        tituloOriginal: 'Institui o Programa Universidade Gratuita no Estado de Santa Catarina.',
        resumoLinguagemSimples: 'O estado paga as mensalidades do ensino superior de alunos de baixa renda em faculdades comunitárias do sistema Acafe em troca de serviços à comunidade.',
        areaTematica: 'Educação Superior',
        status: 'Sancionada'
      }
    ],
    projetosApresentados: [],
    gastosCategorias: [{ categoria: 'Gabinete do Centro Administrativo de SC', valor: 0.00 }],
    gastosHistorico: [],
    evolucaoBens: [
      { anoEleicao: 2018, valorTotalDeclarado: 2400000.00, principaisBens: ['Imóveis em Florianópolis', 'Veículos', 'Aplicações'] },
      { anoEleicao: 2022, valorTotalDeclarado: 2850000.00, principaisBens: ['Apartamentos', 'Terrenos', 'Investimentos de renda fixa'] }
    ],
    processosJudiciais: [],
    noticiasFatuais: [
      {
        id: 'not-jorginho-1',
        veiculo: 'ND Mais',
        titulo: 'Governador Jorginho Mello expande bolsas do programa Universidade Gratuita para 2024',
        resumoFactual: 'Iniciativa já atende mais de 35 mil universitários catarinenses matriculados em cursos de graduação.',
        dataPublicacao: '20/03/2024',
        urlOriginal: 'https://ndmais.com.br'
      }
    ],
    emendas: []
  },

  // 9. PERNAMBUCO (PE)
  {
    id: 'raquel-lyra',
    nomeCivil: 'Raquel Teixeira Lyra Lucena',
    nomeUrna: 'Raquel Lyra',
    cargo: 'Governadora',
    partido: 'Partido da Social Democracia Brasileira',
    siglaPartido: 'PSDB',
    numeroUrna: 45,
    uf: 'PE',
    municipio: 'Recife',
    fotoUrl: '',
    emailGabinete: 'gabinete@palaciocampodasprincesas.pe.gov.br',
    telefoneGabinete: '(81) 3181-2100',
    dataNascimento: '02/12/1978',
    grauInstrucao: 'Superior Completo (Direito pela UFPE / Ex-Procuradora do Estado e Delegada)',
    mandatoAtual: {
      inicio: 2023,
      fim: 2027,
      legislatura: 'Governo do Estado de Pernambuco (Palácio do Campo das Princesas)'
    },
    candidaturaEleitoral: {
      disputando: true,
      esfera: 'Estadual',
      cargoDisputado: 'Governadora de Pernambuco',
      numeroUrna: 45,
      anoEleicao: 2026,
      situacao: 'Candidata à Reeleição'
    },
    auditoriaTimestamp: '19/10/2026 às 15:00:00 BRT',
    fonteOficial: 'Governo de Pernambuco / TSE / ALEPE',
    metricas: {
      projetosApresentadosTotal: 78,
      projetosViraramLeiTotal: 49,
      presencaPlenarioPorcentagem: 100.0,
      faltasJustificadas: 0,
      faltasNaoJustificadas: 0,
      gastoCotaTotalAno: 0.00,
      mediaGastoCasaLegislativa: 0.00,
      valorEmendasOrcamentarias: 0.00,
      cidadesBeneficiadasTotal: 185
    },
    leisSancionadas: [
      {
        id: 'lei-pe-juntos-pela-educacao',
        numeroLei: 'Lei Estadual 18.305/2023',
        ano: 2023,
        tituloOriginal: 'Institui o Programa Juntos pela Educação com repasse de R$ 5,5 bilhões para redes municipais e estadual.',
        resumoLinguagemSimples: 'Destina recursos para construir creches, reformar escolas e climatizar salas de aula em todo o estado de Pernambuco.',
        areaTematica: 'Educação',
        status: 'Sancionada'
      }
    ],
    projetosApresentados: [],
    gastosCategorias: [{ categoria: 'Gabinete do Palácio do Campo das Princesas', valor: 0.00 }],
    gastosHistorico: [],
    evolucaoBens: [
      { anoEleicao: 2016, valorTotalDeclarado: 410000.00, principaisBens: ['Apartamento em Caruaru', 'Veículo'] },
      { anoEleicao: 2022, valorTotalDeclarado: 630000.00, principaisBens: ['Imóvel residencial', 'Previdência privada', 'Saldo bancário'] }
    ],
    processosJudiciais: [],
    noticiasFatuais: [
      {
        id: 'not-raquel-1',
        veiculo: 'Diario de Pernambuco',
        titulo: 'Raquel Lyra assina empréstimo de R$ 1 bilhão com o BID para saneamento e infraestrutura no Agreste',
        resumoFactual: 'Projeto visa universalizar o abastecimento d’água e combater o racionamento histórico na região.',
        dataPublicacao: '15/07/2024',
        urlOriginal: 'https://diariodepernambuco.com.br'
      }
    ],
    emendas: []
  },

  // 10. CEARÁ (CE)
  {
    id: 'elmano-de-freitas',
    nomeCivil: 'Elmano de Freitas da Costa',
    nomeUrna: 'Elmano de Freitas',
    cargo: 'Governador',
    partido: 'Partido dos Trabalhadores',
    siglaPartido: 'PT',
    numeroUrna: 13,
    uf: 'CE',
    municipio: 'Baturité',
    fotoUrl: '',
    emailGabinete: 'gabinete@ceara.gov.br',
    telefoneGabinete: '(85) 3466-4000',
    dataNascimento: '12/04/1970',
    grauInstrucao: 'Superior Completo (Direito pela UFC)',
    mandatoAtual: {
      inicio: 2023,
      fim: 2027,
      legislatura: 'Governo do Estado do Ceará (Palácio da Abolição)'
    },
    candidaturaEleitoral: {
      disputando: true,
      esfera: 'Estadual',
      cargoDisputado: 'Governador do Ceará',
      numeroUrna: 13,
      anoEleicao: 2026,
      situacao: 'Candidato à Reeleição'
    },
    auditoriaTimestamp: '19/10/2026 às 15:00:00 BRT',
    fonteOficial: 'Governo do Estado do Ceará / TSE / ALECE',
    metricas: {
      projetosApresentadosTotal: 84,
      projetosViraramLeiTotal: 56,
      presencaPlenarioPorcentagem: 100.0,
      faltasJustificadas: 0,
      faltasNaoJustificadas: 0,
      gastoCotaTotalAno: 0.00,
      mediaGastoCasaLegislativa: 0.00,
      valorEmendasOrcamentarias: 0.00,
      cidadesBeneficiadasTotal: 184
    },
    leisSancionadas: [
      {
        id: 'lei-ce-ceara-sem-fome',
        numeroLei: 'Lei Estadual 18.312/2023',
        ano: 2023,
        tituloOriginal: 'Cria o Programa Ceará Sem Fome com cartão alimentação e cozinhas comunitárias.',
        resumoLinguagemSimples: 'Fornece auxílio mensal de alimentação para mais de 50 mil famílias em vulnerabilidade em todos os municípios cearenses.',
        areaTematica: 'Segurança Alimentar',
        status: 'Sancionada'
      }
    ],
    projetosApresentados: [],
    gastosCategorias: [{ categoria: 'Gabinete do Palácio da Abolição', valor: 0.00 }],
    gastosHistorico: [],
    evolucaoBens: [
      { anoEleicao: 2018, valorTotalDeclarado: 420000.00, principaisBens: ['Casa em Fortaleza', 'Veículo'] },
      { anoEleicao: 2022, valorTotalDeclarado: 640000.00, principaisBens: ['Imóvel residencial', 'Poupança e consórcio'] }
    ],
    processosJudiciais: [],
    noticiasFatuais: [
      {
        id: 'not-elmano-1',
        veiculo: 'O Povo',
        titulo: 'Elmano de Freitas firma acordo para centro de produção de hidrogênio verde no Porto do Pecém',
        resumoFactual: 'Acordo prevê investimentos de transição sustentável e fornecimento de energia limpa para exportação.',
        dataPublicacao: '11/04/2024',
        urlOriginal: 'https://opovo.com.br'
      }
    ],
    emendas: []
  },

  // 11. GOIÁS (GO)
  {
    id: 'ronaldo-caiado',
    nomeCivil: 'Ronaldo Ramos Caiado',
    nomeUrna: 'Ronaldo Caiado',
    cargo: 'Governador',
    partido: 'União Brasil',
    siglaPartido: 'UNIÃO',
    numeroUrna: 44,
    uf: 'GO',
    municipio: 'Anápolis',
    fotoUrl: '',
    emailGabinete: 'gabinete@palacioesmeraldas.go.gov.br',
    telefoneGabinete: '(62) 3201-5000',
    dataNascimento: '25/09/1949',
    grauInstrucao: 'Superior Completo (Medicina pela UFRJ / Cirurgia Ortopédica na França)',
    mandatoAtual: {
      inicio: 2023,
      fim: 2027,
      legislatura: 'Governo do Estado de Goiás (Palácio das Esmeraldas)'
    },
    candidaturaEleitoral: {
      disputando: true,
      esfera: 'Federal',
      cargoDisputado: 'Presidente da República',
      numeroUrna: 44,
      anoEleicao: 2026,
      situacao: 'Mandato em Exercício'
    },
    auditoriaTimestamp: '19/10/2026 às 15:00:00 BRT',
    fonteOficial: 'Governo de Goiás / TSE / ALEGO',
    metricas: {
      projetosApresentadosTotal: 118,
      projetosViraramLeiTotal: 79,
      presencaPlenarioPorcentagem: 100.0,
      faltasJustificadas: 0,
      faltasNaoJustificadas: 0,
      gastoCotaTotalAno: 0.00,
      mediaGastoCasaLegislativa: 0.00,
      valorEmendasOrcamentarias: 0.00,
      cidadesBeneficiadasTotal: 246
    },
    leisSancionadas: [
      {
        id: 'lei-go-seguranca-rural',
        numeroLei: 'Lei Estadual 21.034/2021',
        ano: 2021,
        tituloOriginal: 'Cria o Batalhão de Patrulha Rural Georreferenciada da Polícia Militar de Goiás.',
        resumoLinguagemSimples: 'Cadastra todas as fazendas e sítios com rotas digitais para atendimento rápido de viaturas contra furtos e crimes no campo.',
        areaTematica: 'Segurança Pública Rural',
        status: 'Sancionada'
      }
    ],
    projetosApresentados: [],
    gastosCategorias: [{ categoria: 'Gabinete do Palácio das Esmeraldas', valor: 0.00 }],
    gastosHistorico: [],
    evolucaoBens: [
      { anoEleicao: 2018, valorTotalDeclarado: 24800000.00, principaisBens: ['Fazendas no interior de Goiás', 'Gado bovino', 'Imóveis urbanos'] },
      { anoEleicao: 2022, valorTotalDeclarado: 29500000.00, principaisBens: ['Propriedades rurais agropecuárias', 'Participações societárias', 'Aplicações'] }
    ],
    processosJudiciais: [],
    noticiasFatuais: [
      {
        id: 'not-caiado-1',
        veiculo: 'O Popular',
        titulo: 'Goiás registra redução de homicídios e atinge melhor índice de segurança pública da série histórica',
        resumoFactual: 'Dados da Secretaria de Segurança Pública apontaram queda expressiva em crimes violentos letais intencionais no estado.',
        dataPublicacao: '08/01/2024',
        urlOriginal: 'https://opopular.com.br'
      }
    ],
    emendas: []
  },

  // 12. PARÁ (PA)
  {
    id: 'helder-barbalho',
    nomeCivil: 'Helder Zahluth Barbalho',
    nomeUrna: 'Helder Barbalho',
    cargo: 'Governador',
    partido: 'Movimento Democrático Brasileiro',
    siglaPartido: 'MDB',
    numeroUrna: 15,
    uf: 'PA',
    municipio: 'Belém',
    fotoUrl: '',
    emailGabinete: 'gabinete@palaciodosdespachos.pa.gov.br',
    telefoneGabinete: '(91) 3344-9000',
    dataNascimento: '18/05/1979',
    grauInstrucao: 'Superior Completo (Administração pela Unama e pós-graduação em Gestão)',
    mandatoAtual: {
      inicio: 2023,
      fim: 2027,
      legislatura: 'Governo do Estado do Pará (Palácio dos Despachos)'
    },
    candidaturaEleitoral: {
      disputando: true,
      esfera: 'Federal',
      cargoDisputado: 'Senador pelo Pará',
      numeroUrna: 150,
      anoEleicao: 2026,
      situacao: 'Mandato em Exercício'
    },
    auditoriaTimestamp: '19/10/2026 às 15:00:00 BRT',
    fonteOficial: 'Governo do Estado do Pará / TSE / ALEPA',
    metricas: {
      projetosApresentadosTotal: 104,
      projetosViraramLeiTotal: 70,
      presencaPlenarioPorcentagem: 100.0,
      faltasJustificadas: 0,
      faltasNaoJustificadas: 0,
      gastoCotaTotalAno: 0.00,
      mediaGastoCasaLegislativa: 0.00,
      valorEmendasOrcamentarias: 0.00,
      cidadesBeneficiadasTotal: 144
    },
    leisSancionadas: [
      {
        id: 'lei-pa-plano-amazonia-agora',
        numeroLei: 'Lei Estadual 9.048/2020',
        ano: 2020,
        tituloOriginal: 'Institui a Política Estadual de Mudanças Climáticas e o Plano Amazônia Agora.',
        resumoLinguagemSimples: 'Estabelece metas de desmatamento líquido zero até 2035 no Pará com regularização ambiental e incentivo à bioeconomia.',
        areaTematica: 'Meio Ambiente e Clima',
        status: 'Sancionada'
      }
    ],
    projetosApresentados: [],
    gastosCategorias: [{ categoria: 'Gabinete do Palácio dos Despachos', valor: 0.00 }],
    gastosHistorico: [],
    evolucaoBens: [
      { anoEleicao: 2018, valorTotalDeclarado: 10200000.00, principaisBens: ['Cotas do Grupo RBA de Comunicação', 'Fazendas', 'Imóveis em Belém'] },
      { anoEleicao: 2022, valorTotalDeclarado: 14500000.00, principaisBens: ['Participações societárias', 'Imóveis urbanos e rurais', 'Fundos'] }
    ],
    processosJudiciais: [
      {
        id: 'proc-stj-helder-respiradores',
        numeroProcesso: 'Inq 1420 / STJ',
        tribunal: 'STJ',
        tipoAcao: 'Inquérito de Compra de Respiradores durante a Pandemia',
        status: 'Arquivado',
        descricaoFato: 'O STJ determinou o arquivamento das investigações contra o governador a pedido do Ministério Público Federal por falta de dolo e ressarcimento integral dos valores aos cofres do estado.',
        dataAtualizacao: '16/03/2023'
      }
    ],
    noticiasFatuais: [
      {
        id: 'not-helder-1',
        veiculo: 'O Liberal',
        titulo: 'Belém acelera obras de infraestrutura e dragagem para sediar a COP30 em novembro de 2025',
        resumoFactual: 'Governador e comitiva da ONU vistoriaram o Parque da Cidade e o Porto Futuro na capital paraense.',
        dataPublicacao: '05/09/2024',
        urlOriginal: 'https://oliberal.com'
      }
    ],
    emendas: []
  },

  // 13. DISTRITO FEDERAL (DF)
  {
    id: 'ibaneis-rocha',
    nomeCivil: 'Ibaneis Rocha Barros Junior',
    nomeUrna: 'Ibaneis Rocha',
    cargo: 'Governador',
    partido: 'Movimento Democrático Brasileiro',
    siglaPartido: 'MDB',
    numeroUrna: 15,
    uf: 'DF',
    municipio: 'Brasília',
    fotoUrl: '',
    emailGabinete: 'gabinete@buriti.df.gov.br',
    telefoneGabinete: '(61) 3961-1500',
    dataNascimento: '10/07/1971',
    grauInstrucao: 'Superior Completo (Direito pelo CEUB / Ex-Presidente da OAB-DF)',
    mandatoAtual: {
      inicio: 2023,
      fim: 2027,
      legislatura: 'Governo do Distrito Federal (Palácio do Buriti)'
    },
    candidaturaEleitoral: {
      disputando: true,
      esfera: 'Estadual',
      cargoDisputado: 'Senador pelo Distrito Federal',
      numeroUrna: 150,
      anoEleicao: 2026,
      situacao: 'Mandato em Exercício'
    },
    auditoriaTimestamp: '19/10/2026 às 15:00:00 BRT',
    fonteOficial: 'Governo do Distrito Federal / TSE / CLDF',
    metricas: {
      projetosApresentadosTotal: 96,
      projetosViraramLeiTotal: 62,
      presencaPlenarioPorcentagem: 100.0,
      faltasJustificadas: 0,
      faltasNaoJustificadas: 0,
      gastoCotaTotalAno: 0.00,
      mediaGastoCasaLegislativa: 0.00,
      valorEmendasOrcamentarias: 0.00,
      cidadesBeneficiadasTotal: 35
    },
    leisSancionadas: [
      {
        id: 'lei-df-cartao-prato-cheio',
        numeroLei: 'Lei Distrital 6.640/2020',
        ano: 2020,
        tituloOriginal: 'Institui o Programa Prato Cheio para atendimento de famílias sem renda no DF.',
        resumoLinguagemSimples: 'Substitui a entrega de cestas básicas físicas por um cartão com crédito mensal de R$ 250 para compras no comércio local.',
        areaTematica: 'Assistência Social',
        status: 'Sancionada'
      }
    ],
    projetosApresentados: [],
    gastosCategorias: [{ categoria: 'Gabinete do Palácio do Buriti', valor: 0.00 }],
    gastosHistorico: [],
    evolucaoBens: [
      { anoEleicao: 2018, valorTotalDeclarado: 94100000.00, principaisBens: ['Escritório de advocacia', 'Mansão em Brasília', 'Aeronave particular', 'Imóveis'] },
      { anoEleicao: 2022, valorTotalDeclarado: 103000000.00, principaisBens: ['Honorários advocatícios a receber', 'Imóveis urbanos', 'Aplicações financeiras'] }
    ],
    processosJudiciais: [
      {
        id: 'proc-stf-8-janeiro-ibaneis',
        numeroProcesso: 'Inq 4923 / STF',
        tribunal: 'Supremo Tribunal Federal',
        tipoAcao: 'Inquérito sobre os Atos de 8 de Janeiro de 2023',
        status: 'Investigado',
        descricaoFato: 'Afastado temporariamente pelo STF em janeiro de 2023 e reconduzido ao cargo em março de 2023 após relatório da PF indicar ausência de conivência deliberada com invasões.',
        dataAtualizacao: '15/03/2023'
      }
    ],
    noticiasFatuais: [
      {
        id: 'not-ibaneis-1',
        veiculo: 'Correio Braziliense',
        titulo: 'Ibaneis Rocha entrega túnel de Taguatinga e amplia malha viária do transporte coletivo no DF',
        resumoFactual: 'Obra viária histórica beneficiou mais de 135 mil motoristas diários que cruzam a região oeste do Distrito Federal.',
        dataPublicacao: '05/06/2023',
        urlOriginal: 'https://correiobraziliense.com.br'
      }
    ],
    emendas: []
  },

  // 14. AMAZONAS (AM)
  {
    id: 'wilson-lima',
    nomeCivil: 'Wilson Miranda Lima',
    nomeUrna: 'Wilson Lima',
    cargo: 'Governador',
    partido: 'União Brasil',
    siglaPartido: 'UNIÃO',
    numeroUrna: 44,
    uf: 'AM',
    municipio: 'Manaus',
    fotoUrl: '',
    emailGabinete: 'gabinete@sede.am.gov.br',
    telefoneGabinete: '(92) 3303-8000',
    dataNascimento: '26/06/1976',
    grauInstrucao: 'Superior Completo (Jornalismo)',
    mandatoAtual: { inicio: 2023, fim: 2027, legislatura: 'Governo do Estado do Amazonas' },
    candidaturaEleitoral: { disputando: true, esfera: 'Estadual', cargoDisputado: 'Senador pelo Amazonas', numeroUrna: 440, anoEleicao: 2026, situacao: 'Mandato em Exercício' },
    auditoriaTimestamp: '19/10/2026 às 15:00:00 BRT',
    fonteOficial: 'Governo do AM / TSE / ALEAM',
    metricas: { projetosApresentadosTotal: 74, projetosViraramLeiTotal: 46, presencaPlenarioPorcentagem: 100.0, faltasJustificadas: 0, faltasNaoJustificadas: 0, gastoCotaTotalAno: 0, mediaGastoCasaLegislativa: 0, valorEmendasOrcamentarias: 0, cidadesBeneficiadasTotal: 62 },
    leisSancionadas: [{ id: 'lei-am-auxilio-estiagem', numeroLei: 'Lei 6.540/2023', ano: 2023, tituloOriginal: 'Auxílio Estadual Permanente e Emergência Climática na Bacia Amazônica.', resumoLinguagemSimples: 'Garante cestas e água potável a comunidades ribeirinhas isoladas pela seca extrema dos rios.', areaTematica: 'Ação Social', status: 'Sancionada' }],
    projetosApresentados: [],
    gastosCategorias: [{ categoria: 'Gabinete do Governo do AM', valor: 0 }],
    gastosHistorico: [],
    evolucaoBens: [{ anoEleicao: 2022, valorTotalDeclarado: 450000.00, principaisBens: ['Apartamento em Manaus', 'Veículo'] }],
    processosJudiciais: [],
    noticiasFatuais: [{ id: 'not-wilson-1', veiculo: 'A Crítica', titulo: 'Wilson Lima renova incentivos da Zona Franca de Manaus na reforma tributária', resumoFactual: 'Governo estadual atuou no Congresso para preservar vantagens comparativas do polo industrial.', dataPublicacao: '12/07/2024', urlOriginal: 'https://acritica.com' }],
    emendas: []
  },

  // 15. MATO GROSSO (MT)
  {
    id: 'mauro-mendes',
    nomeCivil: 'Mauro Mendes Ferreira',
    nomeUrna: 'Mauro Mendes',
    cargo: 'Governador',
    partido: 'União Brasil',
    siglaPartido: 'UNIÃO',
    numeroUrna: 44,
    uf: 'MT',
    municipio: 'Anápolis',
    fotoUrl: '',
    emailGabinete: 'gabinete@paiaguas.mt.gov.br',
    telefoneGabinete: '(65) 3613-4000',
    dataNascimento: '12/04/1964',
    grauInstrucao: 'Superior Completo (Engenharia Elétrica pela UFMT)',
    mandatoAtual: { inicio: 2023, fim: 2027, legislatura: 'Governo de Mato Grosso (Palácio Paiaguás)' },
    candidaturaEleitoral: { disputando: true, esfera: 'Estadual', cargoDisputado: 'Senador por Mato Grosso', numeroUrna: 440, anoEleicao: 2026, situacao: 'Mandato em Exercício' },
    auditoriaTimestamp: '19/10/2026 às 15:00:00 BRT',
    fonteOficial: 'Governo de MT / TSE / ALMT',
    metricas: { projetosApresentadosTotal: 92, projetosViraramLeiTotal: 65, presencaPlenarioPorcentagem: 100.0, faltasJustificadas: 0, faltasNaoJustificadas: 0, gastoCotaTotalAno: 0, mediaGastoCasaLegislativa: 0, valorEmendasOrcamentarias: 0, cidadesBeneficiadasTotal: 142 },
    leisSancionadas: [{ id: 'lei-mt-ferrovia-estadual', numeroLei: 'Lei 11.230/2020', ano: 2020, tituloOriginal: 'Cria o Marco Regulatório da Primeira Ferrovia Estadual Privada de MT.', resumoLinguagemSimples: 'Autoriza ferrovia ligando Rondonópolis a Cuiabá e Lucas do Rio Verde para escoar grãos com custos reduzidos.', areaTematica: 'Infraestrutura', status: 'Sancionada' }],
    projetosApresentados: [],
    gastosCategorias: [{ categoria: 'Gabinete Palácio Paiaguás', valor: 0 }],
    gastosHistorico: [],
    evolucaoBens: [{ anoEleicao: 2022, valorTotalDeclarado: 88000000.00, principaisBens: ['Empresas industriais', 'Fazendas', 'Aplicações financeiras'] }],
    processosJudiciais: [],
    noticiasFatuais: [{ id: 'not-mendes-1', veiculo: 'Gazeta Digital MT', titulo: 'Mato Grosso alcança superávit histórico e zera restos a pagar na gestão fiscal', resumoFactual: 'Estado realizou investimentos recordes em pavimentação de rodovias e hospitais regionais.', dataPublicacao: '20/05/2024', urlOriginal: 'https://gazetadigital.com.br' }],
    emendas: []
  },

  // 16. MATO GROSSO DO SUL (MS)
  {
    id: 'eduardo-riedel',
    nomeCivil: 'Eduardo Corrêa Riedel',
    nomeUrna: 'Eduardo Riedel',
    cargo: 'Governador',
    partido: 'Partido da Social Democracia Brasileira',
    siglaPartido: 'PSDB',
    numeroUrna: 45,
    uf: 'MS',
    municipio: 'Rio de Janeiro',
    fotoUrl: '',
    emailGabinete: 'gabinete@ms.gov.br',
    telefoneGabinete: '(67) 3318-1000',
    dataNascimento: '05/07/1969',
    grauInstrucao: 'Superior Completo (Ciências Biológicas pela UFRJ e Mestrado em Zootecnia pela Unesp)',
    mandatoAtual: { inicio: 2023, fim: 2027, legislatura: 'Governo de Mato Grosso do Sul' },
    candidaturaEleitoral: { disputando: true, esfera: 'Estadual', cargoDisputado: 'Governador de MS', numeroUrna: 45, anoEleicao: 2026, situacao: 'Candidato à Reeleição' },
    auditoriaTimestamp: '19/10/2026 às 15:00:00 BRT',
    fonteOficial: 'Governo de MS / TSE / ALEMS',
    metricas: { projetosApresentadosTotal: 68, projetosViraramLeiTotal: 44, presencaPlenarioPorcentagem: 100.0, faltasJustificadas: 0, faltasNaoJustificadas: 0, gastoCotaTotalAno: 0, mediaGastoCasaLegislativa: 0, valorEmendasOrcamentarias: 0, cidadesBeneficiadasTotal: 79 },
    leisSancionadas: [{ id: 'lei-ms-rota-biocanica', numeroLei: 'Lei 6.120/2023', ano: 2023, tituloOriginal: 'Incentivos Tributários para a Rota Bioceânica ligando o Centro-Oeste ao Oceano Pacífico.', resumoLinguagemSimples: 'Prepara o estado com pontes e rodovias para exportação via portos do Chile.', areaTematica: 'Logística', status: 'Sancionada' }],
    projetosApresentados: [],
    gastosCategorias: [{ categoria: 'Gabinete do Parque dos Poderes', valor: 0 }],
    gastosHistorico: [],
    evolucaoBens: [{ anoEleicao: 2022, valorTotalDeclarado: 20700000.00, principaisBens: ['Fazenda em Maracaju', 'Gado nelore', 'Aplicações financeiras'] }],
    processosJudiciais: [],
    noticiasFatuais: [{ id: 'not-riedel-1', veiculo: 'Campo Grande News', titulo: 'Mato Grosso do Sul firma novas fábricas de celulose e lidera atração de investimentos florestais', resumoFactual: 'Inauguração de unidade em Ribas do Rio Pardo consolida Vale da Celulose.', dataPublicacao: '01/08/2024', urlOriginal: 'https://campograndenews.com.br' }],
    emendas: []
  },

  // 17. PARAÍBA (PB)
  {
    id: 'joao-azevedo',
    nomeCivil: 'João Azevêdo Lins Filho',
    nomeUrna: 'João Azevêdo',
    cargo: 'Governador',
    partido: 'Partido Socialista Brasileiro',
    siglaPartido: 'PSB',
    numeroUrna: 40,
    uf: 'PB',
    municipio: 'João Pessoa',
    fotoUrl: '',
    emailGabinete: 'gabinete@palacioredencao.pb.gov.br',
    telefoneGabinete: '(83) 3218-4000',
    dataNascimento: '14/08/1953',
    grauInstrucao: 'Superior Completo (Engenharia Civil pela UFPB)',
    mandatoAtual: { inicio: 2023, fim: 2027, legislatura: 'Governo da Paraíba (Palácio da Redenção)' },
    candidaturaEleitoral: { disputando: true, esfera: 'Estadual', cargoDisputado: 'Senador pela Paraíba', numeroUrna: 400, anoEleicao: 2026, situacao: 'Mandato em Exercício' },
    auditoriaTimestamp: '19/10/2026 às 15:00:00 BRT',
    fonteOficial: 'Governo da Paraíba / TSE / ALPB',
    metricas: { projetosApresentadosTotal: 82, projetosViraramLeiTotal: 54, presencaPlenarioPorcentagem: 100.0, faltasJustificadas: 0, faltasNaoJustificadas: 0, gastoCotaTotalAno: 0, mediaGastoCasaLegislativa: 0, valorEmendasOrcamentarias: 0, cidadesBeneficiadasTotal: 223 },
    leisSancionadas: [{ id: 'lei-pb-conecta-pb', numeroLei: 'Lei 12.430/2022', ano: 2022, tituloOriginal: 'Conectividade e Escola Digital na Rede Estadual da Paraíba.', resumoLinguagemSimples: 'Fornece internet e computadores para estudantes do ensino médio em todos os 223 municípios.', areaTematica: 'Educação', status: 'Sancionada' }],
    projetosApresentados: [],
    gastosCategorias: [{ categoria: 'Gabinete Palácio da Redenção', valor: 0 }],
    gastosHistorico: [],
    evolucaoBens: [{ anoEleicao: 2022, valorTotalDeclarado: 1400000.00, principaisBens: ['Apartamento em João Pessoa', 'Poupança', 'Veículo'] }],
    processosJudiciais: [],
    noticiasFatuais: [{ id: 'not-azevedo-1', veiculo: 'Jornal da Paraíba', titulo: 'Paraíba lidera Consórcio Nordeste e articula investimentos com Governo Federal', resumoFactual: 'Governador presidiu fórum com ministros em Brasília para obras hídricas e rodoviárias.', dataPublicacao: '17/04/2024', urlOriginal: 'https://jornaldaparaiba.com.br' }],
    emendas: []
  },

  // 18. RIO GRANDE DO NORTE (RN)
  {
    id: 'fatima-bezerra',
    nomeCivil: 'Maria de Fátima Bezerra',
    nomeUrna: 'Fátima Bezerra',
    cargo: 'Governadora',
    partido: 'Partido dos Trabalhadores',
    siglaPartido: 'PT',
    numeroUrna: 13,
    uf: 'RN',
    municipio: 'Nova Palmeira',
    fotoUrl: '',
    emailGabinete: 'gabinete@palaciopotengi.rn.gov.br',
    telefoneGabinete: '(84) 3232-5000',
    dataNascimento: '19/05/1955',
    grauInstrucao: 'Superior Completo (Pedagogia pela UFRN)',
    mandatoAtual: { inicio: 2023, fim: 2027, legislatura: 'Governo do Rio Grande do Norte' },
    candidaturaEleitoral: { disputando: true, esfera: 'Estadual', cargoDisputado: 'Senadora pelo RN', numeroUrna: 130, anoEleicao: 2026, situacao: 'Mandato em Exercício' },
    auditoriaTimestamp: '19/10/2026 às 15:00:00 BRT',
    fonteOficial: 'Governo do RN / TSE / ALRN',
    metricas: { projetosApresentadosTotal: 72, projetosViraramLeiTotal: 48, presencaPlenarioPorcentagem: 100.0, faltasJustificadas: 0, faltasNaoJustificadas: 0, gastoCotaTotalAno: 0, mediaGastoCasaLegislativa: 0, valorEmendasOrcamentarias: 0, cidadesBeneficiadasTotal: 167 },
    leisSancionadas: [{ id: 'lei-rn-energia-eolica', numeroLei: 'Lei 11.200/2022', ano: 2022, tituloOriginal: 'Marco Regulatório de Energias Renováveis do RN.', resumoLinguagemSimples: 'Incentiva usinas eólicas em terra e no mar (offshore) mantendo o RN como líder nacional na geração de ventos.', areaTematica: 'Energia Limpa', status: 'Sancionada' }],
    projetosApresentados: [],
    gastosCategorias: [{ categoria: 'Gabinete Palácio Potengi', valor: 0 }],
    gastosHistorico: [],
    evolucaoBens: [{ anoEleicao: 2022, valorTotalDeclarado: 1200000.00, principaisBens: ['Apartamento em Natal', 'Poupança'] }],
    processosJudiciais: [],
    noticiasFatuais: [{ id: 'not-fatima-1', veiculo: 'Tribuna do Norte', titulo: 'Fátima Bezerra sanciona plano de recuperação de 800 km de rodovias estaduais do RN', resumoFactual: 'Financiamento estadual iniciou recuperação de trechos críticos de tráfego.', dataPublicacao: '05/03/2024', urlOriginal: 'https://tribunadonorte.com.br' }],
    emendas: []
  },

  // 19. ALAGOAS (AL)
  {
    id: 'paulo-dantas',
    nomeCivil: 'Paulo Suruagy do Amaral Dantas',
    nomeUrna: 'Paulo Dantas',
    cargo: 'Governador',
    partido: 'Movimento Democrático Brasileiro',
    siglaPartido: 'MDB',
    numeroUrna: 15,
    uf: 'AL',
    municipio: 'Maceió',
    fotoUrl: '',
    emailGabinete: 'gabinete@palaciorepublicadospalmares.al.gov.br',
    telefoneGabinete: '(82) 3315-2000',
    dataNascimento: '11/05/1979',
    grauInstrucao: 'Superior Completo (Administração de Empresas pelo Cesmac)',
    mandatoAtual: { inicio: 2023, fim: 2027, legislatura: 'Governo de Alagoas' },
    candidaturaEleitoral: { disputando: true, esfera: 'Estadual', cargoDisputado: 'Governador de Alagoas', numeroUrna: 15, anoEleicao: 2026, situacao: 'Candidato à Reeleição' },
    auditoriaTimestamp: '19/10/2026 às 15:00:00 BRT',
    fonteOficial: 'Governo de Alagoas / TSE / ALEAL',
    metricas: { projetosApresentadosTotal: 65, projetosViraramLeiTotal: 42, presencaPlenarioPorcentagem: 100.0, faltasJustificadas: 0, faltasNaoJustificadas: 0, gastoCotaTotalAno: 0, mediaGastoCasaLegislativa: 0, valorEmendasOrcamentarias: 0, cidadesBeneficiadasTotal: 102 },
    leisSancionadas: [{ id: 'lei-al-cria', numeroLei: 'Lei 8.800/2022', ano: 2022, tituloOriginal: 'Expansão do Programa CRIA - Criança Alagoana.', resumoLinguagemSimples: 'Repassa auxílio mensal para gestantes e mães com crianças até 5 anos para alimentação e exames médicos.', areaTematica: 'Primeira Infância', status: 'Sancionada' }],
    projetosApresentados: [],
    gastosCategorias: [{ categoria: 'Gabinete Palácio dos Palmares', valor: 0 }],
    gastosHistorico: [],
    evolucaoBens: [{ anoEleicao: 2022, valorTotalDeclarado: 5100000.00, principaisBens: ['Fazendas no interior de AL', 'Cabeças de gado', 'Imóveis'] }],
    processosJudiciais: [{ id: 'proc-stj-dantas-edema', numeroProcesso: 'Inq 1502 / STJ', tribunal: 'STJ', tipoAcao: 'Inquérito Operação Edema', status: 'Investigado', descricaoFato: 'Investigação em curso sobre nomeações parlamentares antigas na Assembleia; afastamento cautelar revogado pelo STF.', dataAtualizacao: '25/10/2022' }],
    noticiasFatuais: [{ id: 'not-dantas-1', veiculo: 'Gazeta de Alagoas', titulo: 'Alagoas amplia rede de creches do CRIA e alcança marca de 60 unidades construídas', resumoFactual: 'Inaugurações no Sertão e Agreste atendem mais de 10 mil crianças.', dataPublicacao: '12/06/2024', urlOriginal: 'https://gazetaweb.com' }],
    emendas: []
  },

  // 20. SERGIPE (SE)
  {
    id: 'fabio-mitidieri',
    nomeCivil: 'Fábio Cruz Mitidieri',
    nomeUrna: 'Fábio Mitidieri',
    cargo: 'Governador',
    partido: 'Partido Social Democrático',
    siglaPartido: 'PSD',
    numeroUrna: 55,
    uf: 'SE',
    municipio: 'Aracaju',
    fotoUrl: '',
    emailGabinete: 'gabinete@palaciodespachos.se.gov.br',
    telefoneGabinete: '(79) 3179-1000',
    dataNascimento: '24/02/1977',
    grauInstrucao: 'Superior Completo (Administração pela Unit)',
    mandatoAtual: { inicio: 2023, fim: 2027, legislatura: 'Governo de Sergipe' },
    candidaturaEleitoral: { disputando: true, esfera: 'Estadual', cargoDisputado: 'Governador de Sergipe', numeroUrna: 55, anoEleicao: 2026, situacao: 'Candidato à Reeleição' },
    auditoriaTimestamp: '19/10/2026 às 15:00:00 BRT',
    fonteOficial: 'Governo de Sergipe / TSE / ALESE',
    metricas: { projetosApresentadosTotal: 60, projetosViraramLeiTotal: 39, presencaPlenarioPorcentagem: 100.0, faltasJustificadas: 0, faltasNaoJustificadas: 0, gastoCotaTotalAno: 0, mediaGastoCasaLegislativa: 0, valorEmendasOrcamentarias: 0, cidadesBeneficiadasTotal: 75 },
    leisSancionadas: [{ id: 'lei-se-primeiro-emprego', numeroLei: 'Lei 9.200/2023', ano: 2023, tituloOriginal: 'Cria o Programa Primeiro Emprego Sergipe.', resumoLinguagemSimples: 'O governo do estado paga parte do salário de jovens de 18 a 29 anos contratados por empresas sergipanas.', areaTematica: 'Emprego e Juventude', status: 'Sancionada' }],
    projetosApresentados: [],
    gastosCategorias: [{ categoria: 'Gabinete Palácio dos Despachos SE', valor: 0 }],
    gastosHistorico: [],
    evolucaoBens: [{ anoEleicao: 2022, valorTotalDeclarado: 4800000.00, principaisBens: ['Imóveis em Aracaju', 'Quotas empresariais', 'Investimentos'] }],
    processosJudiciais: [],
    noticiasFatuais: [{ id: 'not-mitidieri-1', veiculo: 'Infonet', titulo: 'Sergipe avança na exploração de gás natural no mar e atrai indústrias petroquímicas', resumoFactual: 'Governador participou de lançamento de projetos de escoamento no Sergipe Deepwater.', dataPublicacao: '19/08/2024', urlOriginal: 'https://infonet.com.br' }],
    emendas: []
  },

  // 21. PIAUÍ (PI)
  {
    id: 'rafael-fonteles',
    nomeCivil: 'Rafael Tajra Fonteles',
    nomeUrna: 'Rafael Fonteles',
    cargo: 'Governador',
    partido: 'Partido dos Trabalhadores',
    siglaPartido: 'PT',
    numeroUrna: 13,
    uf: 'PI',
    municipio: 'Teresina',
    fotoUrl: '',
    emailGabinete: 'gabinete@palaciokarnak.pi.gov.br',
    telefoneGabinete: '(86) 3221-5000',
    dataNascimento: '12/10/1985',
    grauInstrucao: 'Superior Completo (Bacharelado e Mestrado em Física pela UFPI)',
    mandatoAtual: { inicio: 2023, fim: 2027, legislatura: 'Governo do Piauí (Palácio de Karnak)' },
    candidaturaEleitoral: { disputando: true, esfera: 'Estadual', cargoDisputado: 'Governador do Piauí', numeroUrna: 13, anoEleicao: 2026, situacao: 'Candidato à Reeleição' },
    auditoriaTimestamp: '19/10/2026 às 15:00:00 BRT',
    fonteOficial: 'Governo do Piauí / TSE / ALEPI',
    metricas: { projetosApresentadosTotal: 76, projetosViraramLeiTotal: 50, presencaPlenarioPorcentagem: 100.0, faltasJustificadas: 0, faltasNaoJustificadas: 0, gastoCotaTotalAno: 0, mediaGastoCasaLegislativa: 0, valorEmendasOrcamentarias: 0, cidadesBeneficiadasTotal: 224 },
    leisSancionadas: [{ id: 'lei-pi-inteligencia-artificial', numeroLei: 'Lei 8.150/2023', ano: 2023, tituloOriginal: 'Ensino Obrigatório de Inteligência Artificial e Programação no Ensino Médio.', resumoLinguagemSimples: 'Inclui disciplinas de tecnologia digital e IA nas escolas públicas de todo o Piauí.', areaTematica: 'Educação Tecnológica', status: 'Sancionada' }],
    projetosApresentados: [],
    gastosCategorias: [{ categoria: 'Gabinete Palácio de Karnak', valor: 0 }],
    gastosHistorico: [],
    evolucaoBens: [{ anoEleicao: 2022, valorTotalDeclarado: 8400000.00, principaisBens: ['Participação societária em colégios e cursos', 'Imóveis em Teresina', 'Aplicações'] }],
    processosJudiciais: [],
    noticiasFatuais: [{ id: 'not-fonteles-1', veiculo: 'Cidade Verde', titulo: 'Piauí assina contrato para maior parque de hidrogênio verde do mundo em Parnaíba', resumoFactual: 'Projeto europeu prevê investimentos de R$ 50 bilhões para geração de energia solar e amônia verde.', dataPublicacao: '15/12/2023', urlOriginal: 'https://cidadeverde.com' }],
    emendas: []
  },

  // 22. MARANHÃO (MA)
  {
    id: 'carlos-brandao',
    nomeCivil: 'Carlos Orleans Brandão Júnior',
    nomeUrna: 'Carlos Brandão',
    cargo: 'Governador',
    partido: 'Partido Socialista Brasileiro',
    siglaPartido: 'PSB',
    numeroUrna: 40,
    uf: 'MA',
    municipio: 'Colinas',
    fotoUrl: '',
    emailGabinete: 'gabinete@palaciolosleones.ma.gov.br',
    telefoneGabinete: '(98) 3218-8000',
    dataNascimento: '02/06/1958',
    grauInstrucao: 'Superior Completo (Medicina Veterinária pela UEMA)',
    mandatoAtual: { inicio: 2023, fim: 2027, legislatura: 'Governo do Maranhão (Palácio dos Leões)' },
    candidaturaEleitoral: { disputando: true, esfera: 'Estadual', cargoDisputado: 'Senador pelo Maranhão', numeroUrna: 400, anoEleicao: 2026, situacao: 'Mandato em Exercício' },
    auditoriaTimestamp: '19/10/2026 às 15:00:00 BRT',
    fonteOficial: 'Governo do Maranhão / TSE / ALEMA',
    metricas: { projetosApresentadosTotal: 70, projetosViraramLeiTotal: 45, presencaPlenarioPorcentagem: 100.0, faltasJustificadas: 0, faltasNaoJustificadas: 0, gastoCotaTotalAno: 0, mediaGastoCasaLegislativa: 0, valorEmendasOrcamentarias: 0, cidadesBeneficiadasTotal: 217 },
    leisSancionadas: [{ id: 'lei-ma-restaurantes-populares', numeroLei: 'Lei 11.800/2022', ano: 2022, tituloOriginal: 'Rede de Restaurantes Populares com refeições a R$ 1,00.', resumoLinguagemSimples: 'Expande a rede de alimentação servindo almoço balanceado a preço simbólico para a população de baixa renda.', areaTematica: 'Assistência Alimentar', status: 'Sancionada' }],
    projetosApresentados: [],
    gastosCategorias: [{ categoria: 'Gabinete Palácio dos Leões', valor: 0 }],
    gastosHistorico: [],
    evolucaoBens: [{ anoEleicao: 2022, valorTotalDeclarado: 1800000.00, principaisBens: ['Fazenda em Colinas', 'Apartamento em São Luís', 'Aplicações'] }],
    processosJudiciais: [],
    noticiasFatuais: [{ id: 'not-brandao-1', veiculo: 'Imirante', titulo: 'Carlos Brandão inaugura centro de oncologia regional em Imperatriz', resumoFactual: 'Unidade de saúde descentralizou tratamento de câncer para moradores do sul do Maranhão.', dataPublicacao: '23/02/2024', urlOriginal: 'https://imirante.com' }],
    emendas: []
  },

  // 23. RONDÔNIA (RO)
  {
    id: 'marcos-rocha',
    nomeCivil: 'Marcos José Rocha dos Santos',
    nomeUrna: 'Marcos Rocha',
    cargo: 'Governador',
    partido: 'União Brasil',
    siglaPartido: 'UNIÃO',
    numeroUrna: 44,
    uf: 'RO',
    municipio: 'Rio de Janeiro',
    fotoUrl: '',
    emailGabinete: 'gabinete@palacioriomadeira.ro.gov.br',
    telefoneGabinete: '(69) 3216-5000',
    dataNascimento: '03/08/1968',
    grauInstrucao: 'Superior Completo (Análise de Sistemas e Administração / Coronel da PM)',
    mandatoAtual: { inicio: 2023, fim: 2027, legislatura: 'Governo de Rondônia' },
    candidaturaEleitoral: { disputando: true, esfera: 'Estadual', cargoDisputado: 'Senador por Rondônia', numeroUrna: 440, anoEleicao: 2026, situacao: 'Mandato em Exercício' },
    auditoriaTimestamp: '19/10/2026 às 15:00:00 BRT',
    fonteOficial: 'Governo de Rondônia / TSE / ALERO',
    metricas: { projetosApresentadosTotal: 62, projetosViraramLeiTotal: 41, presencaPlenarioPorcentagem: 100.0, faltasJustificadas: 0, faltasNaoJustificadas: 0, gastoCotaTotalAno: 0, mediaGastoCasaLegislativa: 0, valorEmendasOrcamentarias: 0, cidadesBeneficiadasTotal: 52 },
    leisSancionadas: [{ id: 'lei-ro-regularizacao-fundiaria', numeroLei: 'Lei 5.120/2021', ano: 2021, tituloOriginal: 'Título Já e Regularização Fundiária Rural e Urbana.', resumoLinguagemSimples: 'Entrega escrituras registradas gratuitamente para pequenos agricultores familiares de Rondônia.', areaTematica: 'Agricultura Familiar', status: 'Sancionada' }],
    projetosApresentados: [],
    gastosCategorias: [{ categoria: 'Gabinete Palácio Rio Madeira', valor: 0 }],
    gastosHistorico: [],
    evolucaoBens: [{ anoEleicao: 2022, valorTotalDeclarado: 1900000.00, principaisBens: ['Casa em Porto Velho', 'Terrenos', 'Veículo'] }],
    processosJudiciais: [],
    noticiasFatuais: [{ id: 'not-rocha-1', veiculo: 'Rondônia Dinâmica', titulo: 'Rondônia alcança exportação recorde de carne bovina para o mercado asiático', resumoFactual: 'Status livre de febre aftosa sem vacinação impulsionou vendas externas de produtores locais.', dataPublicacao: '10/05/2024', urlOriginal: 'https://rondoniadinamica.com' }],
    emendas: []
  },

  // 24. ACRE (AC)
  {
    id: 'gladson-cameli',
    nomeCivil: 'Gladson de Lima Cameli',
    nomeUrna: 'Gladson Cameli',
    cargo: 'Governador',
    partido: 'Progressistas',
    siglaPartido: 'PP',
    numeroUrna: 11,
    uf: 'AC',
    municipio: 'Cruzeiro do Sul',
    fotoUrl: '',
    emailGabinete: 'gabinete@palacioriobranco.ac.gov.br',
    telefoneGabinete: '(68) 3215-2000',
    dataNascimento: '26/03/1978',
    grauInstrucao: 'Superior Completo (Engenharia Civil pela Unip)',
    mandatoAtual: { inicio: 2023, fim: 2027, legislatura: 'Governo do Acre (Palácio Rio Branco)' },
    candidaturaEleitoral: { disputando: true, esfera: 'Estadual', cargoDisputado: 'Senador pelo Acre', numeroUrna: 110, anoEleicao: 2026, situacao: 'Mandato em Exercício' },
    auditoriaTimestamp: '19/10/2026 às 15:00:00 BRT',
    fonteOficial: 'Governo do Acre / TSE / ALEAC',
    metricas: { projetosApresentadosTotal: 58, projetosViraramLeiTotal: 38, presencaPlenarioPorcentagem: 100.0, faltasJustificadas: 0, faltasNaoJustificadas: 0, gastoCotaTotalAno: 0, mediaGastoCasaLegislativa: 0, valorEmendasOrcamentarias: 0, cidadesBeneficiadasTotal: 22 },
    leisSancionadas: [{ id: 'lei-ac-ponte-jurua', numeroLei: 'Lei 3.900/2022', ano: 2022, tituloOriginal: 'Investimentos em Pontes e Mobilidade Regional no Juruá.', resumoLinguagemSimples: 'Elimina travessias por balsa interligando municípios isolados do interior do Acre.', areaTematica: 'Infraestrutura Viária', status: 'Sancionada' }],
    projetosApresentados: [],
    gastosCategorias: [{ categoria: 'Gabinete Palácio Rio Branco', valor: 0 }],
    gastosHistorico: [],
    evolucaoBens: [{ anoEleicao: 2022, valorTotalDeclarado: 5200000.00, principaisBens: ['Apartamento em Rio Branco', 'Empresa de engenharia', 'Aeronave'] }],
    processosJudiciais: [{ id: 'proc-stj-cameli-ptolomeu', numeroProcesso: 'Ação Penal 1040 / STJ', tribunal: 'STJ', tipoAcao: 'Ação Penal decorrente da Operação Ptolomeu', status: 'Réu', descricaoFato: 'Ação no STJ apurando contratos de obras públicas; o governador sustenta inocência, afirma que todos os serviços foram entregues e segue no exercício pleno do mandato.', dataAtualizacao: '15/05/2024' }],
    noticiasFatuais: [{ id: 'not-cameli-1', veiculo: 'Ac24horas', titulo: 'Gladson Cameli lidera plano de resposta humanitária às enchentes do Rio Acre', resumoFactual: 'Auxílio estadual atendeu mais de 25 mil desabrigados na capital e municípios do interior.', dataPublicacao: '04/04/2024', urlOriginal: 'https://ac24horas.com' }],
    emendas: []
  },

  // 25. TOCANTINS (TO)
  {
    id: 'wanderlei-barbosa',
    nomeCivil: 'Wanderlei Barbosa Castro',
    nomeUrna: 'Wanderlei Barbosa',
    cargo: 'Governador',
    partido: 'Republicanos',
    siglaPartido: 'REPUBLICANOS',
    numeroUrna: 10,
    uf: 'TO',
    municipio: 'Porto Nacional',
    fotoUrl: '',
    emailGabinete: 'gabinete@palacioaraguaia.to.gov.br',
    telefoneGabinete: '(63) 3212-4000',
    dataNascimento: '01/02/1964',
    grauInstrucao: 'Superior Incompleto',
    mandatoAtual: { inicio: 2023, fim: 2027, legislatura: 'Governo do Tocantins (Palácio Araguaia)' },
    candidaturaEleitoral: { disputando: true, esfera: 'Estadual', cargoDisputado: 'Senador pelo Tocantins', numeroUrna: 100, anoEleicao: 2026, situacao: 'Mandato em Exercício' },
    auditoriaTimestamp: '19/10/2026 às 15:00:00 BRT',
    fonteOficial: 'Governo do Tocantins / TSE / ALETO',
    metricas: { projetosApresentadosTotal: 66, projetosViraramLeiTotal: 44, presencaPlenarioPorcentagem: 100.0, faltasJustificadas: 0, faltasNaoJustificadas: 0, gastoCotaTotalAno: 0, mediaGastoCasaLegislativa: 0, valorEmendasOrcamentarias: 0, cidadesBeneficiadasTotal: 139 },
    leisSancionadas: [{ id: 'lei-to-hospital-palmas', numeroLei: 'Lei 4.100/2023', ano: 2023, tituloOriginal: 'Retomada das Obras do Hospital Geral de Palmas.', resumoLinguagemSimples: 'Destina recursos para concluir leitos de UTI e centro de trauma na capital tocantinense.', areaTematica: 'Saúde', status: 'Sancionada' }],
    projetosApresentados: [],
    gastosCategorias: [{ categoria: 'Gabinete Palácio Araguaia', valor: 0 }],
    gastosHistorico: [],
    evolucaoBens: [{ anoEleicao: 2022, valorTotalDeclarado: 2800000.00, principaisBens: ['Chácara em Porto Nacional', 'Imóveis em Palmas', 'Veículos'] }],
    processosJudiciais: [{ id: 'proc-stj-wanderlei-cesta', numeroProcesso: 'Inq 1580 / STJ', tribunal: 'STJ', tipoAcao: 'Inquérito sobre Distribuição de Cestas Básicas', status: 'Investigado', descricaoFato: 'Apuração preliminar no STJ sobre compras emergenciais; a defesa afirma conformidade de todos os atos com a legislação de socorro social.', dataAtualizacao: '21/08/2024' }],
    noticiasFatuais: [{ id: 'not-wanderlei-1', veiculo: 'Gazeta do Cerrado', titulo: 'Tocantins registra expansão na produção de grãos e consolida polo agrícola de Matopiba', resumoFactual: 'Safra recorde de soja impulsionou a ferrovia Norte-Sul no estado.', dataPublicacao: '18/06/2024', urlOriginal: 'https://gazetadocerrado.com.br' }],
    emendas: []
  },

  // 26. AMAPÁ (AP)
  {
    id: 'clecio-luis',
    nomeCivil: 'Clécio Luís Vilhena Vieira',
    nomeUrna: 'Clécio Luís',
    cargo: 'Governador',
    partido: 'Solidariedade',
    siglaPartido: 'SOLIDARIEDADE',
    numeroUrna: 77,
    uf: 'AP',
    municipio: 'Belém',
    fotoUrl: '',
    emailGabinete: 'gabinete@palaciosetentriao.ap.gov.br',
    telefoneGabinete: '(96) 2101-3000',
    dataNascimento: '08/04/1972',
    grauInstrucao: 'Superior Completo (Geografia pela Unifap)',
    mandatoAtual: { inicio: 2023, fim: 2027, legislatura: 'Governo do Amapá (Palácio do Setentrião)' },
    candidaturaEleitoral: { disputando: true, esfera: 'Estadual', cargoDisputado: 'Governador do Amapá', numeroUrna: 77, anoEleicao: 2026, situacao: 'Candidato à Reeleição' },
    auditoriaTimestamp: '19/10/2026 às 15:00:00 BRT',
    fonteOficial: 'Governo do Amapá / TSE / ALAP',
    metricas: { projetosApresentadosTotal: 54, projetosViraramLeiTotal: 35, presencaPlenarioPorcentagem: 100.0, faltasJustificadas: 0, faltasNaoJustificadas: 0, gastoCotaTotalAno: 0, mediaGastoCasaLegislativa: 0, valorEmendasOrcamentarias: 0, cidadesBeneficiadasTotal: 16 },
    leisSancionadas: [{ id: 'lei-ap-infraestrutura-santana', numeroLei: 'Lei 2.800/2023', ano: 2023, tituloOriginal: 'Conexão Viária e Expansão Portuária de Santana.', resumoLinguagemSimples: 'Revitaliza o polo portuário para exportação de produtos florestais sustentáveis e minerais.', areaTematica: 'Desenvolvimento Regional', status: 'Sancionada' }],
    projetosApresentados: [],
    gastosCategorias: [{ categoria: 'Gabinete Palácio do Setentrião', valor: 0 }],
    gastosHistorico: [],
    evolucaoBens: [{ anoEleicao: 2022, valorTotalDeclarado: 1300000.00, principaisBens: ['Apartamento em Macapá', 'Veículo', 'Depósitos'] }],
    processosJudiciais: [],
    noticiasFatuais: [{ id: 'not-clecio-1', veiculo: 'G1 AP', titulo: 'Governador Clécio Luís defende pesquisas de exploração sustentável na Margem Equatorial', resumoFactual: 'Debate no Amapá reuniu autoridades federais e especialistas em transição energética.', dataPublicacao: '25/05/2024', urlOriginal: 'https://g1.globo.com/ap' }],
    emendas: []
  },

  // 27. RORAIMA (RR)
  {
    id: 'antonio-denarium',
    nomeCivil: 'Antonio Oliverio Garcia de Almeida',
    nomeUrna: 'Antonio Denarium',
    cargo: 'Governador',
    partido: 'Progressistas',
    siglaPartido: 'PP',
    numeroUrna: 11,
    uf: 'RR',
    municipio: 'Anápolis',
    fotoUrl: '',
    emailGabinete: 'gabinete@palaciosenadorheliocampos.rr.gov.br',
    telefoneGabinete: '(95) 2121-7000',
    dataNascimento: '03/03/1964',
    grauInstrucao: 'Superior Completo (Administração)',
    mandatoAtual: { inicio: 2023, fim: 2027, legislatura: 'Governo de Roraima' },
    candidaturaEleitoral: { disputando: true, esfera: 'Estadual', cargoDisputado: 'Senador por Roraima', numeroUrna: 110, anoEleicao: 2026, situacao: 'Mandato em Exercício' },
    auditoriaTimestamp: '19/10/2026 às 15:00:00 BRT',
    fonteOficial: 'Governo de Roraima / TSE / ALERR',
    metricas: { projetosApresentadosTotal: 64, projetosViraramLeiTotal: 40, presencaPlenarioPorcentagem: 100.0, faltasJustificadas: 0, faltasNaoJustificadas: 0, gastoCotaTotalAno: 0, mediaGastoCasaLegislativa: 0, valorEmendasOrcamentarias: 0, cidadesBeneficiadasTotal: 15 },
    leisSancionadas: [{ id: 'lei-rr-linha-transmissao', numeroLei: 'Lei 1.750/2023', ano: 2023, tituloOriginal: 'Apoio à Instalação do Linhão de Tucuruí Manaus-Boa Vista.', resumoLinguagemSimples: 'Viabiliza a ligação de Roraima ao Sistema Interligado Nacional para dar segurança energética ao estado.', areaTematica: 'Energia', status: 'Sancionada' }],
    projetosApresentados: [],
    gastosCategorias: [{ categoria: 'Gabinete Palácio Hélio Campos', valor: 0 }],
    gastosHistorico: [],
    evolucaoBens: [{ anoEleicao: 2022, valorTotalDeclarado: 21500000.00, principaisBens: ['Fazendas no cerrado de Roraima', 'Gado de corte', 'Aplicações bancárias'] }],
    processosJudiciais: [{ id: 'proc-tse-denarium-cassacao', numeroProcesso: 'RO 0601662 / TSE', tribunal: 'TSE', tipoAcao: 'Recurso Ordinário Eleitoral sobre Programas Sociais em 2022', status: 'Investigado', descricaoFato: 'Processo no TSE sobre execução do programa Cesta da Família durante o ano eleitoral; governador permanece no exercício pleno sob efeito suspensivo aguardando julgamento final.', dataAtualizacao: '13/08/2024' }],
    noticiasFatuais: [{ id: 'not-denarium-1', veiculo: 'Folha de Boa Vista', titulo: 'Roraima atinge marca de 150 mil hectares plantados de soja e amplia exportações para a Guiana', resumoFactual: 'Expansão agropecuária diversificou economia do extremo norte brasileiro.', dataPublicacao: '14/07/2024', urlOriginal: 'https://folhabv.com.br' }],
    emendas: []
  }
];
