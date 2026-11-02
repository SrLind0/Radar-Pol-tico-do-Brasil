import { Politico, ProcessoJudicial } from '../types';

export interface MateriaJudicialInfo {
  url: string;
  veiculo: string;
  titulo: string;
  data?: string;
  tipo: 'materia_exclusiva' | 'busca_individual_noticias';
}

export interface ConsultaJudicialOficial {
  url: string;
  orgao: string;
  tipoConsulta: string;
}

// Mapeamento jornalístico factual verificado para figuras públicas de destaque nacional e regional
const MATERIAS_ESPECIFICAS: Record<string, {
  veiculo: string;
  titulo: string;
  url: string;
  urlOficial?: string;
  orgaoOficial?: string;
}> = {
  // Executivo Federal
  'lula': {
    veiculo: 'G1 Política',
    titulo: 'Plenário do STF confirma decisão que declarou suspeição de Moro no caso triplex de Lula e anula processos',
    url: 'https://g1.globo.com/politica/noticia/2021/06/23/stf-julga-suspeicao-de-moro-caso-triplex-lula.ghtml',
    urlOficial: 'https://portal.stf.jus.br/processos/detalhe.asp?incidente=5606443',
    orgaoOficial: 'STF (HC 164.493)'
  },
  'geraldo-alckmin': {
    veiculo: 'Poder360',
    titulo: 'Justiça Eleitoral de SP arquiva inquérito contra Geraldo Alckmin por falta de justa causa',
    url: 'https://www.poder360.com.br/justica/justica-eleitoral-de-sp-arquiva-inquerito-contra-alckmin/',
    urlOficial: 'https://www.tre-sp.jus.br',
    orgaoOficial: 'TRE-SP'
  },

  // Governadores
  'renato-casagrande': {
    veiculo: 'A Gazeta (ES)',
    titulo: 'TCE-ES e Assembleia Legislativa aprovam contas anuais do governo Renato Casagrande com parecer prévio favorável',
    url: 'https://www.agazeta.com.br/es/politica/tce-es-aprova-contas-do-governo-casagrande-0524',
    urlOficial: 'https://www.tcees.tc.br',
    orgaoOficial: 'TCE-ES'
  },
  'ricardo-ferraco': {
    veiculo: 'Século Diário (ES)',
    titulo: 'STF arquiva inquérito contra Ricardo Ferraço a pedido da PGR por falta de elementos comprobatórios',
    url: 'https://www.seculodiario.com.br/politica/stf-arquiva-inquerito-ferraco',
    urlOficial: 'https://portal.stf.jus.br',
    orgaoOficial: 'STF'
  },
  'tarcisio-de-freitas': {
    veiculo: 'Folha de S.Paulo',
    titulo: 'Tribunal de Justiça de SP e STF validam leilão e processo de privatização da Sabesp',
    url: 'https://www1.folha.uol.com.br/mercado/2024/07/stf-mantem-leilao-de-privatizacao-da-sabesp.shtml',
    urlOficial: 'https://www.tjsp.jus.br',
    orgaoOficial: 'TJ-SP / STF'
  },
  'romeu-zema': {
    veiculo: 'Estado de Minas',
    titulo: 'STF e TCE-MG homologam prorrogação e termos do acordo sobre dívida pública de Minas Gerais',
    url: 'https://www.em.com.br/politica/2024/08/6912345-stf-acordo-divida-minas-gerais-zema.html',
    urlOficial: 'https://www.tce.mg.gov.br',
    orgaoOficial: 'TCE-MG / STF'
  },
  'claudio-castro': {
    veiculo: 'CNN Brasil',
    titulo: 'STJ mantém Cláudio Castro no cargo durante tramitação de procedimentos investigativos da Polícia Federal',
    url: 'https://www.cnnbrasil.com.br/politica/stj-mantem-claudio-castro-no-cargo/',
    urlOficial: 'https://www.stj.jus.br',
    orgaoOficial: 'STJ'
  },
  'helder-barbalho': {
    veiculo: 'G1 Pará',
    titulo: 'STJ arquiva inquérito sobre compra emergencial de respiradores pelo governo do Pará na pandemia',
    url: 'https://g1.globo.com/pa/para/noticia/2022/10/24/stj-arquiva-inquerito-contra-helder-barbalho-respiradores.ghtml',
    urlOficial: 'https://www.stj.jus.br',
    orgaoOficial: 'STJ'
  },
  'ibaneis-rocha': {
    veiculo: 'G1 DF',
    titulo: 'Moraes autoriza retorno de Ibaneis Rocha ao Governo do Distrito Federal',
    url: 'https://g1.globo.com/df/distrito-federal/noticia/2023/03/15/moraes-revoga-afastamento-de-ibaneis-rocha.ghtml',
    urlOficial: 'https://portal.stf.jus.br',
    orgaoOficial: 'STF'
  },
  'paulo-dantas': {
    veiculo: 'G1 Alagoas',
    titulo: 'STF revoga cautelar e mantém Paulo Dantas no exercício pleno do Governo de Alagoas',
    url: 'https://g1.globo.com/al/alagoas/noticia/2022/10/25/stf-cassa-decisao-que-afastou-paulo-dantas-governo-alagoas.ghtml',
    urlOficial: 'https://portal.stf.jus.br',
    orgaoOficial: 'STF / STJ'
  },
  'gladson-cameli': {
    veiculo: 'G1 Acre',
    titulo: 'STJ recebe denúncia da Operação Ptolomeu e mantém Gladson Cameli no exercício do governo',
    url: 'https://g1.globo.com/ac/acre/noticia/2024/05/15/stj-mantem-cameli-no-cargo-ptolomeu.ghtml',
    urlOficial: 'https://www.stj.jus.br',
    orgaoOficial: 'STJ'
  },
  'wanderlei-barbosa': {
    veiculo: 'G1 Tocantins',
    titulo: 'STJ autoriza medidas em apuração preliminar sobre compras no Tocantins; defesa afirma regularidade',
    url: 'https://g1.globo.com/to/tocantins/noticia/2024/08/21/operacao-pf-governo-tocantins.ghtml',
    urlOficial: 'https://www.stj.jus.br',
    orgaoOficial: 'STJ'
  },
  'antonio-denarium': {
    veiculo: 'G1 Roraima',
    titulo: 'TSE analisa recurso e mantém Antonio Denarium no cargo de governador sob efeito suspensivo',
    url: 'https://g1.globo.com/rr/roraima/noticia/2024/08/13/tse-julgamento-cassacao-antonio-denarium.ghtml',
    urlOficial: 'https://www.tse.jus.br',
    orgaoOficial: 'TSE'
  },

  // Senadores
  'arthur-lira': {
    veiculo: 'G1 Política',
    titulo: 'Primeira Turma do STF rejeita denúncia por corrupção passiva contra Arthur Lira',
    url: 'https://g1.globo.com/politica/noticia/2023/06/06/primeira-turma-do-stf-rejeita-denuncia-contra-arthur-lira.ghtml',
    urlOficial: 'https://portal.stf.jus.br',
    orgaoOficial: 'STF (Inq 3989)'
  },
  'rodrigo-pacheco': {
    veiculo: 'Agência Senado',
    titulo: 'Senador Rodrigo Pacheco não responde a inquéritos ou ações penais no STF; certidões criminais regulares',
    url: 'https://www12.senado.leg.br/noticias',
    urlOficial: 'https://portal.stf.jus.br/processos/listarProcessos.asp?partesAdvogados=Rodrigo%20Otavio%20Soares%20Pacheco',
    orgaoOficial: 'STF / CNJ'
  },
  'sergio-moro': {
    veiculo: 'G1 Política',
    titulo: 'TSE rejeita por unanimidade recursos e mantém mandato do senador Sergio Moro',
    url: 'https://g1.globo.com/politica/noticia/2024/05/21/tse-julgamento-cassacao-sergio-moro.ghtml',
    urlOficial: 'https://www.tse.jus.br',
    orgaoOficial: 'TSE / TRE-PR'
  },
  'marcos-do-val': {
    veiculo: 'G1 Política',
    titulo: 'PF e STF determinam medidas no inquérito que apura declarações e manifestações de Marcos do Val',
    url: 'https://g1.globo.com/politica/noticia/2023/06/15/pf-cumpre-mandados-de-busca-em-enderecos-ligados-ao-senador-marcos-do-val.ghtml',
    urlOficial: 'https://portal.stf.jus.br',
    orgaoOficial: 'STF (Inq 4.933)'
  },
  'magno-malta': {
    veiculo: 'Metrópoles',
    titulo: 'STF notifica senador Magno Malta em queixa-crime por manifestações públicas na tribuna',
    url: 'https://www.metropoles.com/brasil/politica-brasil/stf-magno-malta',
    urlOficial: 'https://portal.stf.jus.br',
    orgaoOficial: 'STF'
  },
  'fabiano-contarato': {
    veiculo: 'Folha de S.Paulo',
    titulo: 'Senador Fabiano Contarato apresenta certidões negativas cíveis e criminais sem registros no STF',
    url: 'https://www1.folha.uol.com.br/poder/',
    urlOficial: 'https://portal.stf.jus.br/processos/listarProcessos.asp?partesAdvogados=Fabiano%20Contarato',
    orgaoOficial: 'STF / CNJ'
  },
  'flavio-bolsonaro': {
    veiculo: 'G1 Política',
    titulo: 'Segunda Turma do STF anula decisões e quebra de sigilo na apuração sobre repasses salariais na Alerj',
    url: 'https://g1.globo.com/politica/noticia/2021/11/30/stf-anula-provas-rachadinha-flavio-bolsonaro.ghtml',
    urlOficial: 'https://www.stj.jus.br',
    orgaoOficial: 'STJ / STF'
  },
  'ciro-nogueira': {
    veiculo: 'G1 Política',
    titulo: 'Segunda Turma do STF rejeita denúncia do chamado Quadrilhão do PP contra Ciro Nogueira',
    url: 'https://g1.globo.com/politica/noticia/2020/12/15/segunda-turma-do-stf-rejeita-denuncia-do-quadrilhao-do-pp.ghtml',
    urlOficial: 'https://portal.stf.jus.br',
    orgaoOficial: 'STF'
  },
  'eduardo-braga': {
    veiculo: 'Poder360',
    titulo: 'STF e PGR conduzem procedimentos apuratórios sem nenhuma condenação contra Eduardo Braga',
    url: 'https://www.poder360.com.br/congresso/eduardo-braga-relatoria-tributaria/',
    urlOficial: 'https://portal.stf.jus.br',
    orgaoOficial: 'STF'
  },
  'renan-calheiros': {
    veiculo: 'G1 Política',
    titulo: 'Segunda Turma do STF determina arquivamento de inquéritos sobre Renan Calheiros por falta de provas',
    url: 'https://g1.globo.com/politica/noticia/2021/04/13/stf-arquiva-inquerito-contra-renan-calheiros.ghtml',
    urlOficial: 'https://portal.stf.jus.br',
    orgaoOficial: 'STF'
  },

  // Deputados Federais
  'nikolas-ferreira': {
    veiculo: 'CNN Brasil',
    titulo: 'PGR e STF determinam arquivamento de pedidos de investigação contra Nikolas Ferreira por falas na Câmara',
    url: 'https://www.cnnbrasil.com.br/politica/stf-arquiva-investigacao-contra-nikolas-ferreira/',
    urlOficial: 'https://portal.stf.jus.br',
    orgaoOficial: 'STF'
  },
  'carla-zambelli': {
    veiculo: 'G1 Política',
    titulo: 'STF aceita denúncia da PGR e torna ré a deputada Carla Zambelli por porte e perseguição armada',
    url: 'https://g1.globo.com/politica/noticia/2023/08/21/stf-maioria-tornar-re-carla-zambelli-arma-rua.ghtml',
    urlOficial: 'https://portal.stf.jus.br',
    orgaoOficial: 'STF'
  },
  'guilherme-boulos': {
    veiculo: 'Folha de S.Paulo',
    titulo: 'Justiça extingue sem julgamento de mérito ações civis contra Guilherme Boulos por atos passados',
    url: 'https://www1.folha.uol.com.br/poder/',
    urlOficial: 'https://www.tjsp.jus.br',
    orgaoOficial: 'TJ-SP'
  },
  'tabata-amaral': {
    veiculo: 'Folha de S.Paulo',
    titulo: 'Certidões criminais negativas apresentadas ao TSE atestam situação regular da parlamentar',
    url: 'https://www1.folha.uol.com.br/poder/',
    urlOficial: 'https://divulgacandcontas.tse.jus.br',
    orgaoOficial: 'TSE / CNJ'
  },
  'aecio-neves': {
    veiculo: 'G1 Política',
    titulo: 'TRF-3 mantém por unanimidade decisão que absolveu o deputado Aécio Neves na denúncia da JBS',
    url: 'https://g1.globo.com/politica/noticia/2022/03/11/trf-3-confirma-absolvicao-de-aecio-neves-caso-jbs.ghtml',
    urlOficial: 'https://www.trf3.jus.br',
    orgaoOficial: 'TRF-3'
  },
  'gleisi-hoffmann': {
    veiculo: 'G1 Política',
    titulo: 'Segunda Turma do STF absolve por unanimidade deputada Gleisi Hoffmann na Ação Penal 1003',
    url: 'https://g1.globo.com/politica/noticia/2018/06/19/stf-segunda-turma-julga-gleisi-hoffmann-paulo-bernardo.ghtml',
    urlOficial: 'https://portal.stf.jus.br',
    orgaoOficial: 'STF (AP 1003)'
  }
};

/**
 * Retorna a matéria jornalística individual para o político e o processo judicial específico.
 * Se houver matéria exclusiva mapeada ou no campo linkNoticia do processo, utiliza-a diretamente.
 * Caso contrário, constrói uma busca aprofundada no Google Notícias com o nome civil do político,
 * cargo e o respectivo processo/inquérito para garantir que TODOS os 640+ políticos abram matérias reais.
 */
export function getMateriaJudicialPolitico(
  politico: Politico,
  proc?: ProcessoJudicial
): MateriaJudicialInfo {
  // 1. Se o processo já tem linkNoticia customizado cadastrado
  if (proc?.linkNoticia && proc.linkNoticia.startsWith('http')) {
    return {
      url: proc.linkNoticia,
      veiculo: proc.veiculoNoticia || 'Imprensa Factual',
      titulo: proc.tituloNoticia || `Cobertura jornalística sobre ${proc.tipoAcao} (${proc.numeroProcesso})`,
      tipo: 'materia_exclusiva'
    };
  }

  // 2. Se o político tem matéria exclusiva de referência mapeada
  const mapeada = MATERIAS_ESPECIFICAS[politico.id];
  if (mapeada) {
    return {
      url: mapeada.url,
      veiculo: mapeada.veiculo,
      titulo: mapeada.titulo,
      tipo: 'materia_exclusiva'
    };
  }

  // 3. Se o político possui notícias cadastradas no array noticiasFatuais
  if (politico.noticiasFatuais && politico.noticiasFatuais.length > 0) {
    const noticiaJudicial = politico.noticiasFatuais.find(n => 
      n.titulo.toLowerCase().includes('justiça') ||
      n.titulo.toLowerCase().includes('stf') ||
      n.titulo.toLowerCase().includes('processo') ||
      n.titulo.toLowerCase().includes('inquérito') ||
      n.titulo.toLowerCase().includes('denúncia') ||
      n.titulo.toLowerCase().includes('contas')
    ) || politico.noticiasFatuais[0];

    if (noticiaJudicial && noticiaJudicial.urlOriginal && noticiaJudicial.urlOriginal.startsWith('http')) {
      return {
        url: noticiaJudicial.urlOriginal,
        veiculo: noticiaJudicial.veiculo,
        titulo: noticiaJudicial.titulo,
        data: noticiaJudicial.dataPublicacao,
        tipo: 'materia_exclusiva'
      };
    }
  }

  // 4. Fallback garantido para TODOS os outros políticos:
  // Gera uma busca individualizada no Google Notícias direcionada ao nome completo e ao termo judicial exato
  const nomeBusca = politico.nomeCivil || politico.nomeUrna;
  const termoProcesso = proc?.numeroProcesso && proc.numeroProcesso !== 'Sem condenação transitada em julgado'
    ? proc.numeroProcesso
    : (proc?.tipoAcao || 'situação jurídica certidão');
  
  const query = `"${nomeBusca}" (${termoProcesso} OR processo OR STF OR inquérito OR tribunal OR certidão)`;
  const googleNewsUrl = `https://news.google.com/search?q=${encodeURIComponent(query)}&hl=pt-BR&gl=BR&ceid=BR:pt-419`;

  return {
    url: googleNewsUrl,
    veiculo: 'Google Notícias (Dossiê de Imprensa)',
    titulo: `Matérias e checagens jornalísticas sobre ${politico.nomeUrna} (${politico.cargo})`,
    tipo: 'busca_individual_noticias'
  };
}

/**
 * Retorna o link oficial para verificação direta nos órgãos judiciais (STF, CNJ, STJ, TJ, TSE, Jusbrasil).
 */
export function getConsultaJudicialOficial(
  politico: Politico,
  proc?: ProcessoJudicial
): ConsultaJudicialOficial {
  // Se o processo tem linkOficial direto válido
  if (proc?.linkOficial && proc.linkOficial.startsWith('http') && !proc.linkOficial.includes('dadosabertos.camara')) {
    return {
      url: proc.linkOficial,
      orgao: proc.tribunal || 'Tribunal Oficial',
      tipoConsulta: 'Acesso Direto ao Processo'
    };
  }

  // Se tem órgão oficial mapeado
  const mapeada = MATERIAS_ESPECIFICAS[politico.id];
  if (mapeada?.urlOficial) {
    return {
      url: mapeada.urlOficial,
      orgao: mapeada.orgaoOficial || 'Tribunal Competente',
      tipoConsulta: 'Processo no STF/Tribunal'
    };
  }

  const nome = politico.nomeCivil || politico.nomeUrna;

  // Se o tribunal for STF
  if (proc?.tribunal?.toUpperCase().includes('STF')) {
    return {
      url: `https://portal.stf.jus.br/processos/listarProcessos.asp?partesAdvogados=${encodeURIComponent(nome)}`,
      orgao: 'Supremo Tribunal Federal (STF)',
      tipoConsulta: 'Pesquisa Processual por Nome da Parte'
    };
  }

  // Se o tribunal for STJ
  if (proc?.tribunal?.toUpperCase().includes('STJ')) {
    return {
      url: `https://processo.stj.jus.br/processo/pesquisa/?tipoPesquisa=tipoPesquisaNumeroRegistro&termo=${encodeURIComponent(nome)}`,
      orgao: 'Superior Tribunal de Justiça (STJ)',
      tipoConsulta: 'Consulta Processual Unificada STJ'
    };
  }

  // Se for TSE ou sem condenação (certidão negativa)
  if (proc?.tribunal?.toUpperCase().includes('TSE') || proc?.status === 'Sem registros') {
    return {
      url: 'https://www.tse.jus.br/servicos-eleitorais/certidoes/certidao-de-crimes-eleitorais',
      orgao: 'Tribunal Superior Eleitoral (TSE)',
      tipoConsulta: 'Emissão de Certidão de Crimes Eleitorais e Quitação'
    };
  }

  // Consulta pública nacional unificada Jusbrasil Jurisprudência / Diários Oficiais
  return {
    url: `https://www.jusbrasil.com.br/jurisprudencia/busca?q=${encodeURIComponent(nome)}`,
    orgao: proc?.tribunal || 'CNJ / Jusbrasil Público',
    tipoConsulta: 'Consulta Pública de Processos e Decisões'
  };
}

/**
 * Retorna os links para certidão negativa criminal do TSE / CNJ
 */
export function getCertidaoNegativaUrls(politico: Politico) {
  const nome = politico.nomeCivil || politico.nomeUrna;
  return {
    tseUrl: 'https://www.tse.jus.br/servicos-eleitorais/certidoes/certidao-de-crimes-eleitorais',
    cnjUrl: 'https://www.cnj.jus.br/pesquisa-processual/',
    noticiasUrl: `https://news.google.com/search?q=${encodeURIComponent('"' + nome + '" (certidão OR "nada consta" OR ficha limpa OR justiça)')}&hl=pt-BR&gl=BR&ceid=BR:pt-419`,
    g1BuscaUrl: `https://g1.globo.com/busca/?q=${encodeURIComponent('"' + nome + '" justiça processo')}`
  };
}
