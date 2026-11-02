export const POSTGRESQL_SCHEMA_DDL = `-- ====================================================================
-- PLATAFORMA DE TRANSPARÊNCIA POLÍTICA BRASILEIRA
-- DDL RELACIONAL POSTGRESQL (FASE 1: FEDERAL E EXPANSÃO ESTADUAL/MUNICIPAL)
-- Otimizado para buscas instantâneas (< 1s) via índices GIN e neutralidade
-- ====================================================================

-- 1. Habilitar extensões necessárias para busca textual em português e UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- 2. Tabela de Partidos Políticos Oficiais registrados no TSE
CREATE TABLE IF NOT EXISTS partidos (
    id SERIAL PRIMARY KEY,
    sigla VARCHAR(20) NOT NULL UNIQUE,
    nome_completo VARCHAR(150) NOT NULL,
    numero_legenda INT NOT NULL UNIQUE,
    registro_tse_data DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabela Principal de Políticos (Deputados, Senadores, Executivo, Vereadores)
CREATE TABLE IF NOT EXISTS politicos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_externo_camara VARCHAR(50),
    id_externo_senado VARCHAR(50),
    id_externo_tse VARCHAR(50),
    nome_civil VARCHAR(255) NOT NULL,
    nome_urna VARCHAR(150) NOT NULL,
    cargo_atual VARCHAR(100) NOT NULL, -- 'Deputado Federal', 'Senador', etc.
    partido_id INT REFERENCES partidos(id),
    uf CHAR(2) NOT NULL,
    municipio VARCHAR(150),
    foto_url TEXT,
    email_gabinete VARCHAR(150),
    telefone_gabinete VARCHAR(50),
    data_nascimento DATE,
    grau_instrucao VARCHAR(100),
    documento_cpf_cripto BYTEA, -- Sigilo fiscal/LGPD
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices de busca ultra-rápida (Trigram + Full Text Search com Unaccent)
CREATE INDEX idx_politicos_nome_urna_trgm ON politicos USING gin (nome_urna gin_trgm_ops);
CREATE INDEX idx_politicos_nome_civil_trgm ON politicos USING gin (nome_civil gin_trgm_ops);
CREATE INDEX idx_politicos_uf ON politicos (uf);
CREATE INDEX idx_politicos_cargo ON politicos (cargo_atual);

-- 4. Tabela de Mandatos
CREATE TABLE IF NOT EXISTS mandatos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    politico_id UUID NOT NULL REFERENCES politicos(id) ON DELETE CASCADE,
    cargo VARCHAR(100) NOT NULL,
    legislatura_numero INT,
    ano_inicio INT NOT NULL,
    ano_fim INT NOT NULL,
    uf CHAR(2) NOT NULL,
    municipio VARCHAR(150),
    situacao_mandato VARCHAR(50) DEFAULT 'Em Exercício' -- 'Titular', 'Suplente'
);

CREATE INDEX idx_mandatos_politico ON mandatos (politico_id);

-- 5. Projetos de Lei e Matérias Legislativas
CREATE TABLE IF NOT EXISTS materias_legislativas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    politico_id UUID NOT NULL REFERENCES politicos(id) ON DELETE CASCADE,
    tipo VARCHAR(10) NOT NULL, -- 'PL', 'PEC', 'PLP', 'MPV'
    numero VARCHAR(20) NOT NULL,
    ano INT NOT NULL,
    ementa_original TEXT NOT NULL,
    resumo_linguagem_simples TEXT, -- Tradução IA em até 2 frases curtas
    virou_lei BOOLEAN DEFAULT FALSE,
    numero_lei_sancionada VARCHAR(50),
    data_sancao DATE,
    link_diario_oficial TEXT,
    status_tramitacao VARCHAR(150) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_materias_politico_lei ON materias_legislativas (politico_id, virou_lei);

-- 6. Gastos de Cota Parlamentar (CEAP - Câmara e Senado)
CREATE TABLE IF NOT EXISTS gastos_cota_parlamentar (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    politico_id UUID NOT NULL REFERENCES politicos(id) ON DELETE CASCADE,
    ano INT NOT NULL,
    mes INT NOT NULL,
    tipo_despesa VARCHAR(150) NOT NULL, -- 'Passagens aéreas', 'Divulgação', etc.
    fornecedor_nome VARCHAR(255),
    fornecedor_cnpj_cpf VARCHAR(20),
    valor_liquido NUMERIC(12, 2) NOT NULL,
    numero_documento_fiscal VARCHAR(100),
    data_emissao DATE,
    link_nota_fiscal TEXT
);

CREATE INDEX idx_gastos_cota_politico_ano ON gastos_cota_parlamentar (politico_id, ano);

-- 7. Bens Declarados ao TSE (Evolução Patrimonial Oficial)
CREATE TABLE IF NOT EXISTS bens_declarados_tse (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    politico_id UUID NOT NULL REFERENCES politicos(id) ON DELETE CASCADE,
    ano_eleicao INT NOT NULL,
    tipo_bem VARCHAR(150) NOT NULL,
    descricao_bem TEXT,
    valor_declarado NUMERIC(15, 2) NOT NULL
);

CREATE INDEX idx_bens_politico_ano ON bens_declarados_tse (politico_id, ano_eleicao);

-- 8. Situação Processual na Justiça (Aba Estritamente Oficial - Sem Juízo de Valor)
CREATE TABLE IF NOT EXISTS processos_judiciais (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    politico_id UUID NOT NULL REFERENCES politicos(id) ON DELETE CASCADE,
    numero_processo VARCHAR(100) NOT NULL,
    tribunal_orgao VARCHAR(50) NOT NULL, -- 'STF', 'STJ', 'TRF-1', 'TJSP'
    tipo_acao VARCHAR(150) NOT NULL, -- 'Inquérito', 'Ação Penal', 'Ação Civil Pública'
    status_processual VARCHAR(50) NOT NULL, -- 'Investigado', 'Réu', 'Absolvido', 'Condenado', 'Arquivado'
    descricao_fato_objetivo TEXT NOT NULL, -- Fato estritamente processual
    data_ultima_atualizacao DATE NOT NULL,
    link_consulta_publica TEXT
);

CREATE INDEX idx_processos_politico_status ON processos_judiciais (politico_id, status_processual);

-- 9. Notícias Jornalísticas Factuais
CREATE TABLE IF NOT EXISTS noticias_imprensa (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    politico_id UUID NOT NULL REFERENCES politicos(id) ON DELETE CASCADE,
    veiculo_imprensa VARCHAR(100) NOT NULL,
    titulo_materia VARCHAR(255) NOT NULL,
    resumo_factual TEXT NOT NULL,
    url_materia TEXT NOT NULL,
    data_publicacao DATE NOT NULL,
    aviso_legal TEXT DEFAULT 'Trata-se de notícia jornalística factual, não equivalendo a condenação judicial transitada em julgado.'
);

-- 10. Emendas Orçamentárias Destinadas
CREATE TABLE IF NOT EXISTS emendas_orcamentarias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    politico_id UUID NOT NULL REFERENCES politicos(id) ON DELETE CASCADE,
    ano INT NOT NULL,
    tipo_emenda VARCHAR(50) NOT NULL, -- 'Individual', 'Bancada', 'Comissão'
    valor_empenhado NUMERIC(14, 2) NOT NULL,
    valor_pago NUMERIC(14, 2) NOT NULL,
    municipio_destino VARCHAR(150) NOT NULL,
    uf_destino CHAR(2) NOT NULL,
    funcao_governo VARCHAR(100) NOT NULL -- 'Saúde', 'Educação', 'Saneamento'
);

-- 11. Tabela de Auditoria e Timestamps de Sincronização
CREATE TABLE IF NOT EXISTS logs_sincronizacao_oficial (
    id SERIAL PRIMARY KEY,
    fonte_orgao VARCHAR(100) NOT NULL, -- 'Camara_Deputados_API', 'Senado_API', 'TSE_DivulgaCand'
    data_hora_execucao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    registros_atualizados INT,
    status_execucao VARCHAR(50),
    checksum_dados VARCHAR(64)
);

-- 12. Tabelas do Fundo Especial de Financiamento de Campanha (FEFC - Fundão Eleitoral)
CREATE TABLE IF NOT EXISTS fefc_nacional_consolidado (
    id SERIAL PRIMARY KEY,
    ano_eleicao INT NOT NULL UNIQUE,
    tipo_eleicao VARCHAR(50) NOT NULL, -- 'Geral', 'Municipal', 'Previsão LOA'
    total_geral NUMERIC(15, 2) NOT NULL,
    variacao_percentual_eleicao_anterior NUMERIC(6, 2) DEFAULT 0.0,
    base_legal TEXT NOT NULL,
    descricao_contexto TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS fefc_partidos_cotas (
    id SERIAL PRIMARY KEY,
    fefc_nacional_id INT REFERENCES fefc_nacional_consolidado(id) ON DELETE CASCADE,
    ano_eleicao INT NOT NULL,
    partido_sigla VARCHAR(20) NOT NULL,
    partido_nome VARCHAR(150) NOT NULL,
    valor_cota NUMERIC(15, 2) NOT NULL,
    percentual_do_fundo NUMERIC(5, 2) NOT NULL,
    cor_identificacao VARCHAR(10) DEFAULT '#2563eb'
);
CREATE INDEX idx_fefc_partidos_ano ON fefc_partidos_cotas (ano_eleicao);

CREATE TABLE IF NOT EXISTS politico_fefc_campanhas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    politico_id UUID NOT NULL REFERENCES politicos(id) ON DELETE CASCADE,
    ano_eleicao INT NOT NULL,
    cargo_disputado VARCHAR(100) NOT NULL,
    total_recebido_fefc NUMERIC(12, 2) NOT NULL,
    media_partido_estado NUMERIC(12, 2) NOT NULL,
    percentual_vs_media NUMERIC(6, 2) NOT NULL,
    url_tse_prestacao_contas TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_politico_fefc_busca ON politico_fefc_campanhas (politico_id, ano_eleicao);

CREATE TABLE IF NOT EXISTS politico_fefc_despesas_categorias (
    id SERIAL PRIMARY KEY,
    campanha_id UUID NOT NULL REFERENCES politico_fefc_campanhas(id) ON DELETE CASCADE,
    categoria VARCHAR(100) NOT NULL,
    valor NUMERIC(12, 2) NOT NULL,
    percentual_do_gasto NUMERIC(5, 2) NOT NULL,
    descricao_explicativa TEXT
);

-- 13. Tabelas de Cota Parlamentar (CEAP / CEAPS)
CREATE TABLE IF NOT EXISTS cota_parlamentar_limites_uf (
    id SERIAL PRIMARY KEY,
    casa_legislativa VARCHAR(20) NOT NULL, -- 'Camara' ou 'Senado'
    uf CHAR(2) NOT NULL,
    ano_referencia INT NOT NULL,
    limite_mensal NUMERIC(10, 2) NOT NULL,
    UNIQUE(casa_legislativa, uf, ano_referencia)
);

CREATE TABLE IF NOT EXISTS cota_parlamentar_despesas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    politico_id UUID NOT NULL REFERENCES politicos(id) ON DELETE CASCADE,
    casa_legislativa VARCHAR(20) NOT NULL,
    ano INT NOT NULL,
    mes INT NOT NULL,
    data_emissao DATE,
    tipo_despesa_original VARCHAR(255) NOT NULL,
    categoria_padronizada VARCHAR(100) NOT NULL,
    fornecedor_nome VARCHAR(255) NOT NULL,
    fornecedor_cnpj_cpf VARCHAR(20),
    numero_documento VARCHAR(100),
    valor_liquido_reembolsado NUMERIC(10, 2) NOT NULL,
    url_comprovante_fiscal TEXT,
    hash_deduplicacao VARCHAR(64) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_cota_politico_ano_mes ON cota_parlamentar_despesas (politico_id, ano, mes);

CREATE TABLE IF NOT EXISTS cota_parlamentar_mensal_resumo (
    id SERIAL PRIMARY KEY,
    politico_id UUID NOT NULL REFERENCES politicos(id) ON DELETE CASCADE,
    ano INT NOT NULL,
    mes INT NOT NULL,
    total_gasto NUMERIC(10, 2) NOT NULL,
    limite_mensal NUMERIC(10, 2) NOT NULL,
    percentual_utilizacao NUMERIC(5, 2) NOT NULL,
    atingiu_alerta_90_porcento BOOLEAN DEFAULT FALSE,
    media_estado_mes NUMERIC(10, 2) NOT NULL,
    media_partido_mes NUMERIC(10, 2) NOT NULL,
    categoria_maior_gasto VARCHAR(100),
    UNIQUE(politico_id, ano, mes)
);
`;

export const PIPELINE_SCRAPING_DOCS = {
  nome: 'Pipeline Assíncrono de Ingestão e Tradução para Linguagem Simples',
  arquitetura: [
    {
      etapa: '1. Orquestrador de Agendamento (BullMQ / Celery)',
      descricao: 'Executa rotinas diárias e semanais para coleta em batches por casa legislativa (Câmara dos Deputados às 02h00, Senado às 03h00, TSE aos domingos).'
    },
    {
      etapa: '2. Conectores Oficiais (Extract)',
      descricao: 'Consome APIs REST com paginação e taxa controlada: /proposicoes, /deputados/{id}/despesas, DivulgaCandContas (arquivos CSV e JSON oficiais).'
    },
    {
      etapa: '3. Normalização & Deduplicação (Transform)',
      descricao: 'Padroniza nomes de urna, CNPJs de fornecedores, cruzamento de registros judiciais públicos via CNJ DataJud.'
    },
    {
      etapa: '4. IA de Tradução para Linguagem Simples (Gemini 3.8 Flash)',
      descricao: 'Aplica rigorosamente o prompt de neutralidade: Sujeito + Verbo + Predicado, corte de jargões técnicos, sem adjetivação ou emissão de mérito, limite de 25 palavras por frase.'
    },
    {
      etapa: '5. Carga e Indexação (Load)',
      descricao: 'Armazenamento no PostgreSQL com índices GIN Trigram e sincronização imediata no cache de busca rápida (< 1s).'
    }
  ]
};
