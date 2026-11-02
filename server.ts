import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { POLITICOS_DATABASE, MUNICIPIOS_ESTADOS_BRASIL } from './src/data/mockDatabase.ts';
import { GLOSSARIO_TERMOS, buscarTermoGlossario } from './src/data/glossaryData.ts';
import { POSTGRESQL_SCHEMA_DDL, PIPELINE_SCRAPING_DOCS } from './src/data/schemaPostgres.ts';
import { DADOS_TRANSPARENCIA_SNAPSHOT, GASTOS_GOVERNO_HISTORICO, ANOS_DISPONIVEIS_GASTOS } from './src/data/transparenciaData.ts';
import { FEFC_GLOBAL_DATA, HISTORICO_FEFC_NACIONAL, obterDadosFEFCPolitico } from './src/data/fefcData.ts';
import { obterDadosCotaPolitico } from './src/data/cotaData.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const portArgIndex = process.argv.indexOf('--port');
const cliPort = portArgIndex !== -1 && process.argv[portArgIndex + 1] ? Number(process.argv[portArgIndex + 1]) : undefined;
const PORT = cliPort || (process.env.PORT && process.env.PORT !== '8080' && process.env.PORT !== process.env.NGINX_PORT ? Number(process.env.PORT) : 3000);

app.use(express.json());

// Initialize Google Gemini Client strictly server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API Routes
app.get('/api/politicos', (req, res) => {
  const { q, cargo, uf, ordenacao } = req.query as {
    q?: string;
    cargo?: string;
    uf?: string;
    ordenacao?: string;
  };

  let resultados = [...POLITICOS_DATABASE];

  if (q && q.trim()) {
    const termo = q.trim().toLowerCase();
    resultados = resultados.filter(
      p =>
        p.nomeUrna.toLowerCase().includes(termo) ||
        p.nomeCivil.toLowerCase().includes(termo) ||
        p.siglaPartido.toLowerCase().includes(termo) ||
        p.uf.toLowerCase() === termo ||
        (p.municipio && p.municipio.toLowerCase().includes(termo))
    );
  }

  if (cargo && cargo !== 'Todos') {
    resultados = resultados.filter(p => p.cargo.toLowerCase().includes(cargo.toLowerCase()));
  }

  if (uf && uf !== 'Todos') {
    resultados = resultados.filter(p => p.uf.toUpperCase() === uf.toUpperCase() || p.cargo === 'Presidente');
  }

  // Ordenação
  if (ordenacao === 'maisProjetosAprovados') {
    resultados.sort((a, b) => b.metricas.projetosViraramLeiTotal - a.metricas.projetosViraramLeiTotal);
  } else if (ordenacao === 'menosGastosCota') {
    resultados.sort((a, b) => a.metricas.gastoCotaTotalAno - b.metricas.gastoCotaTotalAno);
  } else if (ordenacao === 'semProcessosJustica') {
    resultados.sort((a, b) => {
      const aAtivos = a.processosJudiciais.filter(pr => pr.status === 'Investigado' || pr.status === 'Réu').length;
      const bAtivos = b.processosJudiciais.filter(pr => pr.status === 'Investigado' || pr.status === 'Réu').length;
      return aAtivos - bAtivos;
    });
  } else if (ordenacao === 'maiorPresenca') {
    resultados.sort((a, b) => b.metricas.presencaPlenarioPorcentagem - a.metricas.presencaPlenarioPorcentagem);
  } else if (ordenacao === 'alfabetica') {
    resultados.sort((a, b) => a.nomeUrna.localeCompare(b.nomeUrna));
  }

  res.json({
    total: resultados.length,
    timestamp: new Date().toISOString(),
    politicos: resultados,
  });
});

app.get('/api/politicos/:id', (req, res) => {
  const politico = POLITICOS_DATABASE.find(p => p.id === req.params.id);
  if (!politico) {
    return res.status(404).json({ error: 'Político não localizado na base oficial.' });
  }
  res.json(politico);
});

// Endpoint de Histórico do Fundão Eleitoral (FEFC) por Político
app.get('/api/politicos/:id/fundao-eleitoral', (req, res) => {
  const politico = POLITICOS_DATABASE.find(p => p.id === req.params.id);
  if (!politico) {
    return res.status(404).json({ error: 'Político não localizado na base oficial.' });
  }
  const fefcData = obterDadosFEFCPolitico(politico);
  res.json(fefcData);
});

// Endpoints de Cota Parlamentar (CEAP / CEAPS)
app.get('/api/politicos/:id/cota/resumo', (req, res) => {
  const politico = POLITICOS_DATABASE.find(p => p.id === req.params.id);
  if (!politico) {
    return res.status(404).json({ error: 'Político não localizado na base oficial.' });
  }
  const cotaData = obterDadosCotaPolitico(politico);
  res.json(cotaData);
});

app.get('/api/politicos/:id/cota/mensal', (req, res) => {
  const politico = POLITICOS_DATABASE.find(p => p.id === req.params.id);
  if (!politico) {
    return res.status(404).json({ error: 'Político não localizado na base oficial.' });
  }
  const cotaData = obterDadosCotaPolitico(politico);
  res.json({
    politicoId: politico.id,
    nomeUrna: politico.nomeUrna,
    ano: cotaData.anoReferencia,
    limiteMensalUF: cotaData.limiteMensalUF,
    meses: cotaData.meses,
  });
});

app.get('/api/politicos/:id/cota/despesas', (req, res) => {
  const politico = POLITICOS_DATABASE.find(p => p.id === req.params.id);
  if (!politico) {
    return res.status(404).json({ error: 'Político não localizado na base oficial.' });
  }
  const cotaData = obterDadosCotaPolitico(politico);
  const { mes, categoria } = req.query as { mes?: string; categoria?: string };
  let despesas = cotaData.despesasRecentes;
  if (mes) {
    const numMes = parseInt(mes, 10);
    despesas = despesas.filter(d => d.mes === numMes);
  }
  if (categoria) {
    despesas = despesas.filter(d => d.categoria.toLowerCase().includes(categoria.toLowerCase()));
  }
  res.json({
    politicoId: politico.id,
    total: despesas.length,
    despesas,
  });
});

app.get('/api/politicos/:id/cota/benchmark', (req, res) => {
  const politico = POLITICOS_DATABASE.find(p => p.id === req.params.id);
  if (!politico) {
    return res.status(404).json({ error: 'Político não localizado na base oficial.' });
  }
  const cotaData = obterDadosCotaPolitico(politico);
  res.json({
    politicoId: politico.id,
    nomeUrna: politico.nomeUrna,
    uf: cotaData.uf,
    siglaPartido: cotaData.siglaPartido,
    totalAnoAtual: cotaData.totalAnoAtual,
    mediaMensalAno: cotaData.mediaMensalAno,
    limiteMensalUF: cotaData.limiteMensalUF,
    percentualUsoLimite: cotaData.percentualMedioUsoLimite,
    comparativo: cotaData.comparativo,
  });
});

app.get('/api/glossario', (req, res) => {
  const { termo } = req.query as { termo?: string };
  if (termo) {
    const item = buscarTermoGlossario(termo);
    return res.json(item || { error: 'Termo não encontrado' });
  }
  res.json(GLOSSARIO_TERMOS);
});

app.get('/api/schema-sql', (_req, res) => {
  res.json({
    ddl: POSTGRESQL_SCHEMA_DDL,
    pipeline: PIPELINE_SCRAPING_DOCS,
  });
});

app.get('/api/localidades', (_req, res) => {
  res.json(MUNICIPIOS_ESTADOS_BRASIL);
});

// Cache em memória para dados de transparência política
let cacheTransparencia: { data: typeof DADOS_TRANSPARENCIA_SNAPSHOT; timestamp: number } | null = null;
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutos

// Endpoint de Indicadores Macro (Sincronizado com fontes abertas e fallback auditado)
app.get('/api/transparencia/indicadores', async (_req, res) => {
  const agora = Date.now();
  if (cacheTransparencia && agora - cacheTransparencia.timestamp < CACHE_TTL_MS) {
    return res.json({ ...cacheTransparencia.data, cached: true });
  }

  try {
    const [gastosRes, receitaRes, setoresRes] = await Promise.allSettled([
      fetch('https://transparenciapolitica.app/api/gastos-total', { signal: AbortSignal.timeout(3000) }),
      fetch('https://transparenciapolitica.app/api/receita-impostos', { signal: AbortSignal.timeout(3000) }),
      fetch('https://transparenciapolitica.app/api/despesas-setores', { signal: AbortSignal.timeout(3000) }),
    ]);

    let gastos = { ...DADOS_TRANSPARENCIA_SNAPSHOT.gastos };
    let receita = { ...DADOS_TRANSPARENCIA_SNAPSHOT.receita };
    let despesasSetores = { ...DADOS_TRANSPARENCIA_SNAPSHOT.despesasSetores };
    let teveAtualizacaoExterna = false;

    if (gastosRes.status === 'fulfilled' && gastosRes.value.ok) {
      const gJson = await gastosRes.value.json();
      if (gJson && typeof gJson.total === 'number') {
        gastos = {
          ...gastos,
          total: Number(gJson.total),
          deputados: typeof gJson.deputados === 'number' ? Number(gJson.deputados) : gastos.deputados,
          senadores: typeof gJson.senadores === 'number' ? Number(gJson.senadores) : gastos.senadores,
          ano: typeof gJson.ano === 'number' ? Number(gJson.ano) : gastos.ano,
          membrosCamara: 513,
          membrosSenado: 81,
          mediaPorDeputado: Number((Number(gJson.deputados || gastos.deputados) / 513).toFixed(2)),
          mediaPorSenador: Number((Number(gJson.senadores || gastos.senadores) / 81).toFixed(2)),
        };
        teveAtualizacaoExterna = true;
      }
    }

    if (receitaRes.status === 'fulfilled' && receitaRes.value.ok) {
      const rJson = await receitaRes.value.json();
      if (rJson && typeof rJson.receitas === 'number') {
        receita = {
          ...receita,
          ano: typeof rJson.ano === 'number' ? Number(rJson.ano) : receita.ano,
          receitas: Number(rJson.receitas),
          receitaTributaria: typeof rJson.receitaTributaria === 'number' ? Number(rJson.receitaTributaria) : Number(rJson.receitas),
          receitaLiquidaGovernoCentral: typeof rJson.receitaLiquidaGovernoCentral === 'number' ? Number(rJson.receitaLiquidaGovernoCentral) : receita.receitaLiquidaGovernoCentral,
          resultadoPrimario: typeof rJson.resultadoPrimario === 'number' ? Number(rJson.resultadoPrimario) : receita.resultadoPrimario,
        };
        teveAtualizacaoExterna = true;
      }
    }

    if (setoresRes.status === 'fulfilled' && setoresRes.value.ok) {
      const sJson = await setoresRes.value.json();
      if (sJson && Array.isArray(sJson.setores) && sJson.setores.length > 0) {
        despesasSetores = {
          periodo: String(sJson.periodo || despesasSetores.periodo),
          totalGeral: typeof sJson.totalGeral === 'number' ? Number(sJson.totalGeral) : despesasSetores.totalGeral,
          fonte: String(sJson.fonte || despesasSetores.fonte),
          setores: sJson.setores.map((s: any) => ({
            id: String(s.id),
            nome: String(s.nome),
            valor: Number(s.valor) || 0,
            percentual: typeof s.percentual === 'number' ? s.percentual : undefined,
            descricao: s.descricao ? String(s.descricao) : undefined,
          })),
        };
        teveAtualizacaoExterna = true;
      }
    }

    const payload = {
      gastos,
      receita,
      despesasSetores,
      ultimaAtualizacao: new Date().toISOString(),
      fonte: teveAtualizacaoExterna
        ? 'Transparência Política (transparenciapolitica.app) · Portal da Transparência (CGU) · Tesouro Transparente'
        : DADOS_TRANSPARENCIA_SNAPSHOT.fonte,
      status: (teveAtualizacaoExterna ? 'ao_vivo' : 'auditado') as 'ao_vivo' | 'auditado',
      cached: false,
      fallback: !teveAtualizacaoExterna,
    };

    cacheTransparencia = { data: payload, timestamp: agora };
    return res.json(payload);
  } catch (_err) {
    return res.json({
      ...DADOS_TRANSPARENCIA_SNAPSHOT,
      cached: false,
      fallback: true,
      status: 'fallback',
    });
  }
});

// Endpoint de Gastos do Governo por Ano e Categoria (Gráfico de Pizza)
app.get('/api/transparencia/gastos-governo', (req, res) => {
  const { ano } = req.query as { ano?: string };
  if (ano) {
    const numAno = parseInt(ano, 10);
    const dadosAno = GASTOS_GOVERNO_HISTORICO[numAno];
    if (dadosAno) {
      return res.json(dadosAno);
    }
    return res.status(404).json({ error: `Ano ${ano} não encontrado nos registros orçamentários.` });
  }
  res.json({
    anosDisponiveis: ANOS_DISPONIVEIS_GASTOS,
    historico: GASTOS_GOVERNO_HISTORICO,
  });
});

// Endpoints do Fundão Eleitoral (FEFC)
app.get('/api/transparencia/fundao-eleitoral/global', (_req, res) => {
  res.json(FEFC_GLOBAL_DATA);
});

app.get('/api/transparencia/fundao-eleitoral/ano/:ano', (req, res) => {
  const numAno = parseInt(req.params.ano, 10);
  const anoData = HISTORICO_FEFC_NACIONAL[numAno];
  if (!anoData) {
    return res.status(404).json({ error: `Ano eleitoral ${req.params.ano} não localizado no histórico do FEFC.` });
  }
  res.json(anoData);
});

// Endpoint de Detalhamento CEAPS de Senadores (transparenciapolitica.app)
app.get('/api/transparencia/senador-ceaps', async (req, res) => {
  const { nome } = req.query as { nome?: string };
  if (!nome) {
    return res.status(400).json({ error: 'Parâmetro nome é obrigatório' });
  }

  try {
    const url = `https://transparenciapolitica.app/api/senado/ceaps?nome=${encodeURIComponent(nome)}`;
    const response = await fetch(url, { signal: AbortSignal.timeout(6000) });
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Erro ao consultar CEAPS no Senado' });
    }
    const data = await response.json();
    return res.json(data);
  } catch (err: any) {
    return res.status(504).json({ error: 'Tempo limite ao consultar base do Senado', details: err?.message });
  }
});

// Endpoint de Despesas de Deputados Federais (Câmara dos Deputados)
app.get('/api/transparencia/deputado-despesas/:id', async (req, res) => {
  const { id } = req.params;
  const numId = id.replace(/\D/g, '');
  if (!numId) {
    return res.status(400).json({ error: 'ID do deputado inválido' });
  }

  try {
    const ano = new Date().getFullYear();
    const url = `https://dadosabertos.camara.leg.br/api/v2/deputados/${numId}/despesas?ano=${ano}&ordem=DESC&ordenarPor=dataDocumento&itens=15`;
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(6000),
    });

    if (!response.ok) {
      // Fallback para ano anterior caso o ano corrente ainda não tenha registros
      const urlAnterior = `https://dadosabertos.camara.leg.br/api/v2/deputados/${numId}/despesas?ano=${ano - 1}&ordem=DESC&ordenarPor=dataDocumento&itens=15`;
      const fallbackRes = await fetch(urlAnterior, {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(6000),
      });
      if (!fallbackRes.ok) {
        return res.status(response.status).json({ error: 'Erro ao consultar despesas da Câmara' });
      }
      const fbData = await fallbackRes.json();
      return res.json(fbData);
    }

    const data = await response.json();
    return res.json(data);
  } catch (err: any) {
    return res.status(504).json({ error: 'Tempo limite ao consultar base da Câmara', details: err?.message });
  }
});


// Chat Guiado ("Perguntar sobre este Político")
// Strict RAG, 0 alucinação, sem juízo de valor, até 3 frases em Linguagem Simples
app.post('/api/chat-politico', async (req, res) => {
  const { politicoId, pergunta } = req.body as { politicoId: string; pergunta: string };

  if (!politicoId || !pergunta) {
    return res.status(400).json({ error: 'Parâmetros politicoId e pergunta são obrigatórios.' });
  }

  const politico = POLITICOS_DATABASE.find(p => p.id === politicoId);
  if (!politico) {
    return res.status(404).json({ error: 'Político não encontrado na base de dados.' });
  }

  // Resumo factual estruturado para RAG estrito
  const dadosOficiaisJSON = {
    nomeUrna: politico.nomeUrna,
    nomeCivil: politico.nomeCivil,
    cargo: politico.cargo,
    partido: `${politico.partido} (${politico.siglaPartido})`,
    uf: politico.uf,
    mandato: `${politico.mandatoAtual.inicio}-${politico.mandatoAtual.fim}`,
    fonteOficial: politico.fonteOficial,
    auditoriaTimestamp: politico.auditoriaTimestamp,
    metricas: {
      projetosApresentados: politico.metricas.projetosApresentadosTotal,
      leisSancionadasTotal: politico.metricas.projetosViraramLeiTotal,
      presencaPlenario: `${politico.metricas.presencaPlenarioPorcentagem}%`,
      gastoCotaAno: `R$ ${politico.metricas.gastoCotaTotalAno.toLocaleString('pt-BR')}`,
      mediaGastoCasa: `R$ ${politico.metricas.mediaGastoCasaLegislativa.toLocaleString('pt-BR')}`,
      emendasTotal: `R$ ${politico.metricas.valorEmendasOrcamentarias.toLocaleString('pt-BR')}`,
      cidadesBeneficiadas: politico.metricas.cidadesBeneficiadasTotal,
    },
    leisSancionadas: politico.leisSancionadas.map(l => ({
      numero: l.numeroLei,
      ano: l.ano,
      resumoSimples: l.resumoLinguagemSimples,
    })),
    gastosPorCategoria: politico.gastosCategorias,
    evolucaoPatrimonioDeclaradoTSE: politico.evolucaoBens.map(b => ({
      ano: b.anoEleicao,
      valor: `R$ ${b.valorTotalDeclarado.toLocaleString('pt-BR')}`,
      bens: b.principaisBens,
    })),
    processosJudiciaisOficiais: politico.processosJudiciais.map(pr => ({
      numero: pr.numeroProcesso,
      tribunal: pr.tribunal,
      tipo: pr.tipoAcao,
      status: pr.status,
      descricao: pr.descricaoFato,
    })),
  };

  const systemInstruction = `Você é o assistente oficial de transparência pública do Radar Político Brasil.
Sua missão é responder à dúvida do cidadão sobre a atuação do político consultado.

DIRETRIZES DE NEUTRALIDADE E LINGUAGEM SIMPLES (OBRIGATÓRIAS E INVIOLÁVEIS):
1. Neutralidade Absoluta: NUNCA classifique uma lei, emenda, voto ou gasto como "bom", "ruim", "positivo" ou "negativo".
2. Proibição de Juízos de Valor: Não use adjetivos qualificativos (como "corrupto", "traidor", "herói", "polêmico", "excelente"). Atenha-se exclusivamente aos números e registros oficiais fornecidos.
3. Prevenção de Alucinação (RAG Estrito): Consulte UNICAMENTE o JSON de dados oficiais fornecido neste prompt. Se a resposta para a dúvida não constar explicitamente no JSON, declare com clareza: "Não há registro cadastrado nas fontes oficiais disponíveis para esta informação."
4. Regras de Linguagem Simples (Plain Language):
   - Responda em no máximo 3 frases diretas e curtas.
   - Use ordem direta (Sujeito + Verbo + Predicado).
   - Substitua qualquer jargão parlamentar ou jurídico por termos do cotidiano brasileiro.
   - Máximo de 25 palavras por frase.
5. Citação de Fonte: Finalize sempre citando a fonte oficial dos dados (${politico.fonteOficial}).`;

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.length > 10) {
      const generatePromise = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `DADOS OFICIAIS DO POLÍTICO:\n${JSON.stringify(dadosOficiaisJSON, null, 2)}\n\nDÚVIDA DO CIDADÃO: "${pergunta}"\n\nResponda em até 3 frases diretas em Linguagem Simples, sem qualquer viés político, citando a fonte oficial.`,
              },
            ],
          },
        ],
        config: {
          systemInstruction,
          temperature: 0.1, // Maxima fidelidade factual
        },
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Timeout na consulta Gemini')), 6000)
      );

      const response = await Promise.race([generatePromise, timeoutPromise]);

      const respostaTexto = response.text || 'Informação processada com base nas fontes oficiais.';
      return res.json({
        resposta: respostaTexto,
        politicoNome: politico.nomeUrna,
        timestamp: politico.auditoriaTimestamp,
        fonte: politico.fonteOficial,
      });
    }
  } catch (error) {
    console.warn('Fallback ativado no chat político:', error);
  }

  // Resposta padrão fundamentada em caso de contingência
  const perguntaLower = pergunta.toLowerCase();
  let respostaFallback = '';

  if (perguntaLower.includes('passagem') || perguntaLower.includes('cota') || perguntaLower.includes('gasto') || perguntaLower.includes('dinheiro')) {
    const gastoAereo = politico.gastosCategorias.find(g => g.categoria.toLowerCase().includes('aéreas') || g.categoria.toLowerCase().includes('passagens'));
    const valorAereo = gastoAereo ? `R$ ${gastoAereo.valor.toLocaleString('pt-BR')}` : 'R$ 0';
    respostaFallback = `${politico.nomeUrna} registrou R$ ${politico.metricas.gastoCotaTotalAno.toLocaleString('pt-BR')} em gastos de cota parlamentar no ano de 2024. O valor inclui ${valorAereo} em passagens aéreas e transporte oficial. Fonte: ${politico.fonteOficial}.`;
  } else if (perguntaLower.includes('lei') || perguntaLower.includes('projeto') || perguntaLower.includes('aprovou') || perguntaLower.includes('sancion')) {
    const qtd = politico.leisSancionadas.length;
    const primeiraLei = politico.leisSancionadas[0] ? `${politico.leisSancionadas[0].numeroLei}` : '';
    respostaFallback = `${politico.nomeUrna} apresentou ${politico.metricas.projetosApresentadosTotal} propostas, sendo ${qtd} convertidas em leis sancionadas, como a ${primeiraLei}. Cada medida foi aprovada pelo Congresso e sancionada pelo Executivo. Fonte: ${politico.fonteOficial}.`;
  } else if (perguntaLower.includes('processo') || perguntaLower.includes('justiça') || perguntaLower.includes('crime') || perguntaLower.includes('investig')) {
    if (politico.processosJudiciais.length === 0) {
      respostaFallback = `Não constam processos judiciais em andamento contra ${politico.nomeUrna} nas certidões dos tribunais consultados. Os dados são sincronizados com os registros públicos do Judiciário. Fonte: ${politico.fonteOficial}.`;
    } else {
      const primeiro = politico.processosJudiciais[0];
      respostaFallback = `Consta no ${primeiro.tribunal} o processo ${primeiro.numeroProcesso} com status de ${primeiro.status}. Trata-se de ${primeiro.tipoAcao} registrado formalmente no Judiciário. Fonte: ${politico.fonteOficial}.`;
    }
  } else if (perguntaLower.includes('patrimonio') || perguntaLower.includes('bens') || perguntaLower.includes('rico') || perguntaLower.includes('declarou')) {
    const ultimoBem = politico.evolucaoBens[politico.evolucaoBens.length - 1];
    respostaFallback = `Na eleição de ${ultimoBem.anoEleicao}, ${politico.nomeUrna} declarou à Justiça Eleitoral o patrimônio de R$ ${ultimoBem.valorTotalDeclarado.toLocaleString('pt-BR')}. A declaração completa é pública e inclui aplicações financeiras e bens cadastrados. Fonte: ${politico.fonteOficial}.`;
  } else {
    respostaFallback = `${politico.nomeUrna} exerce o cargo de ${politico.cargo} pelo partido ${politico.siglaPartido} representando o estado de ${politico.uf}. A presença em plenário é de ${politico.metricas.presencaPlenarioPorcentagem}% e conta com ${politico.metricas.projetosViraramLeiTotal} leis sancionadas. Fonte: ${politico.fonteOficial}.`;
  }

  res.json({
    resposta: respostaFallback,
    politicoNome: politico.nomeUrna,
    timestamp: politico.auditoriaTimestamp,
    fonte: politico.fonteOficial,
  });
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Radar Político Brasil] Servidor ativo em http://0.0.0.0:${PORT}`);
  });
}

startServer();
