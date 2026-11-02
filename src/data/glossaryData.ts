import { TermoGlossario } from '../types';

export const GLOSSARIO_TERMOS: TermoGlossario[] = [
  {
    termo: 'PEC',
    definicaoSimples: 'Proposta para alterar ou acrescentar novas regras diretamente no texto da Constituição Federal.',
    exemploPratico: 'Precisa ser aprovada por 3/5 dos parlamentares em duas votações na Câmara e no Senado.',
    categoria: 'Legislativo'
  },
  {
    termo: 'Medida Provisória',
    definicaoSimples: 'Regra com força de lei criada imediatamente pelo Presidente em situações urgentes.',
    exemploPratico: 'Passa a valer logo após ser publicada, mas perde a validade se o Congresso não aprovar em até 120 dias.',
    categoria: 'Legislativo'
  },
  {
    termo: 'Quórum',
    definicaoSimples: 'Número mínimo obrigatório de parlamentares presentes para iniciar uma reunião ou votar uma proposta.',
    exemploPratico: 'Se não houver quórum suficiente no plenário, a votação é suspensa para outra data.',
    categoria: 'Legislativo'
  },
  {
    termo: 'Emenda de Relator',
    definicaoSimples: 'Recurso do orçamento federal indicado pelo deputado relator sem detalhar quem pediu originalmente.',
    exemploPratico: 'Ficou conhecida popularmente como "orçamento secreto" e foi considerada inconstitucional pelo STF em 2022.',
    categoria: 'Orçamento'
  },
  {
    termo: 'Trânsito em Julgado',
    definicaoSimples: 'Momento em que uma decisão judicial se torna definitiva e não aceita mais nenhum recurso.',
    exemploPratico: 'A partir do trânsito em julgado, a sentença não pode mais ser questionada na Justiça.',
    categoria: 'Jurídico'
  },
  {
    termo: 'Cota Parlamentar',
    definicaoSimples: 'Verba mensal oficial destinada a ressarcir gastos do exercício da atividade parlamentar, como viagens e aluguel de escritório.',
    exemploPratico: 'Também chamada de CEAP, exige apresentação de nota fiscal para reembolso.',
    categoria: 'Orçamento'
  },
  {
    termo: 'Votação Nominal',
    definicaoSimples: 'Tipo de votação em que o voto individual e o nome de cada parlamentar ficam gravados publicamente.',
    exemploPratico: 'Permite ao eleitor consultar se o seu deputado votou Sim, Não ou se Absteve em um projeto.',
    categoria: 'Legislativo'
  },
  {
    termo: 'Obstrução',
    definicaoSimples: 'Estratégia regimental usada por parlamentares para atrasar ou tentar impedir a votação de um projeto.',
    exemploPratico: 'A bancada da oposição pode pedir discursos longos ou verificação de quórum para travar a sessão.',
    categoria: 'Legislativo'
  },
  {
    termo: 'Veto Presidencial',
    definicaoSimples: 'Ato pelo qual o Presidente da República rejeita no todo ou em parte um projeto aprovado pelo Congresso.',
    exemploPratico: 'O Congresso Nacional pode derrubar o veto do presidente se a maioria absoluta dos membros votar contra.',
    categoria: 'Legislativo'
  },
  {
    termo: 'Sancionada',
    definicaoSimples: 'Lei que foi aprovada pelos parlamentares e assinada pelo chefe do Poder Executivo, entrando no ordenamento jurídico.',
    exemploPratico: 'Após a sanção e publicação no Diário Oficial, a regra se torna obrigatória para a sociedade.',
    categoria: 'Legislativo'
  },
  {
    termo: 'Inquérito',
    definicaoSimples: 'Procedimento preliminar de investigação conduzido pela Polícia ou Ministério Público para apurar se houve crime.',
    exemploPratico: 'Estar em inquérito significa estar sendo investigado, sem que haja acusação formal aceita pela Justiça.',
    categoria: 'Jurídico'
  },
  {
    termo: 'Réu',
    definicaoSimples: 'Pessoa física ou jurídica contra quem a Justiça aceitou formalmente uma denúncia ou ação processual.',
    exemploPratico: 'O réu tem direito à ampla defesa e só se torna culpado se houver condenação definitiva.',
    categoria: 'Jurídico'
  },
  {
    termo: 'Ação Civil Pública',
    definicaoSimples: 'Processo judicial proposto para proteger bens públicos, o patrimônio coletivo ou combater improbidade.',
    exemploPratico: 'Pode ser movida pelo Ministério Público para pedir a devolução de dinheiro público aos cofres do Estado.',
    categoria: 'Jurídico'
  },
  {
    termo: 'Improbidade Administrativa',
    definicaoSimples: 'Conduta desonesta ou ilegal de agente público que causa enriquecimento ilícito ou dano aos cofres públicos.',
    exemploPratico: 'A punição pode incluir a perda da função pública, suspensão de direitos políticos e ressarcimento.',
    categoria: 'Jurídico'
  },
  {
    termo: 'Emenda Individual',
    definicaoSimples: 'Fatia obrigatória do orçamento federal que cada deputado e senador tem direito de destinar para obras e projetos.',
    exemploPratico: 'Metade do valor dessa emenda deve ser obrigatoriamente aplicada na área da saúde pública.',
    categoria: 'Orçamento'
  },
  {
    termo: 'Foro por Prerrogativa de Função',
    definicaoSimples: 'Regra jurídica pela qual certas autoridades públicas só podem ser julgadas em tribunais superiores por atos do mandato.',
    exemploPratico: 'Deputados federais e senadores são julgados pelo Supremo Tribunal Federal em crimes cometidos durante o cargo.',
    categoria: 'Jurídico'
  },
  {
    termo: 'Fundo Partidário',
    definicaoSimples: 'Verba pública distribuída anualmente aos partidos para pagar contas administrativas e funcionamento das legendas.',
    exemploPratico: 'Diferente do Fundo Eleitoral, o Fundo Partidário custeia a manutenção do partido fora das eleições.',
    categoria: 'Eleitoral'
  },
  {
    termo: 'Fundo Eleitoral (Fundão)',
    definicaoSimples: 'Recurso público exclusivo para financiar campanhas eleitorais de candidatos a cada dois anos.',
    exemploPratico: 'O valor total é definido no orçamento da União e distribuído segundo o tamanho da bancada dos partidos.',
    categoria: 'Eleitoral'
  }
];

export function buscarTermoGlossario(termo: string): TermoGlossario | undefined {
  const normalizado = termo.trim().toLowerCase();
  return GLOSSARIO_TERMOS.find(
    item => item.termo.toLowerCase() === normalizado ||
            normalizado.includes(item.termo.toLowerCase())
  );
}
