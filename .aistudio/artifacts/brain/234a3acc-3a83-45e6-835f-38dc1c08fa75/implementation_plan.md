# Especificação Técnica: Integração do Fundão Eleitoral (FEFC)

Este documento estabelece a arquitetura de software, a modelagem de dados, as rotas de API e os padrões de interface (UI/UX) para incorporar os dados do **Fundo Especial de Financiamento de Campanha (FEFC - Fundão Eleitoral)** à plataforma de transparência política.

---

## 1. Modelagem de Dados & Schema

O Fundão Eleitoral possui regras próprias estabelecidas pela Lei nº 13.487/2017 e resoluções periódicas do Tribunal Superior Eleitoral (TSE). As despesas ocorrem estritamente em **anos eleitorais** (2018, 2020, 2022, 2024 e previsão 2026), com critérios de distribuição baseados na representatividade partidária na Câmara dos Deputados e no Senado Federal.

### 1.1. Schema Relacional (PostgreSQL DDL)

```sql
-- ====================================================================
-- MÓDULO: FUNDO ESPECIAL DE FINANCIAMENTO DE CAMPANHA (FEFC)
-- ====================================================================

-- 1. Totais Nacionais Consolidados por Ano Eleitoral
CREATE TABLE IF NOT EXISTS fefc_nacional_consolidado (
    ano_eleicao INT PRIMARY KEY,
    total_recursos_nacional NUMERIC(16, 2) NOT NULL,
    base_legal VARCHAR(150) NOT NULL, -- Ex: 'Lei 13.487/2017 - Resolução TSE 23.605/2019'
    variacao_percentual_eleicao_anterior NUMERIC(6, 2), -- Ex: 144.33 (%)
    partido_maior_cota_id INT REFERENCES partidos(id),
    partido_maior_cota_valor NUMERIC(16, 2) NOT NULL,
    data_consolidacao_tse DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Cotas Distribuidas por Partido em Cada Eleição
CREATE TABLE IF NOT EXISTS fefc_partidos_cotas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ano_eleicao INT NOT NULL,
    partido_id INT NOT NULL REFERENCES partidos(id),
    valor_cota_partido NUMERIC(16, 2) NOT NULL,
    percentual_fundo_nacional NUMERIC(5, 2) NOT NULL,
    criterio_calculo JSONB, -- { bancada_camara: 99, bancada_senado: 14, votos_validos: 15400000 }
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_fefc_partido_ano UNIQUE (ano_eleicao, partido_id)
);

CREATE INDEX idx_fefc_partidos_ano ON fefc_partidos_cotas(ano_eleicao);

-- 3. Recursos Recebidos e Declarados por Político / Candidatura
CREATE TABLE IF NOT EXISTS politico_fefc_campanhas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    politico_id UUID NOT NULL REFERENCES politicos(id) ON DELETE CASCADE,
    ano_eleicao INT NOT NULL,
    cargo_disputado VARCHAR(100) NOT NULL,
    uf CHAR(2) NOT NULL,
    municipio VARCHAR(150),
    partido_id INT NOT NULL REFERENCES partidos(id),
    numero_processo_prestacao_contas VARCHAR(50),
    status_prestacao_tse VARCHAR(50) NOT NULL, -- 'Aprovada com ressalvas', 'Aprovada', 'Em julgamento'
    valor_total_recebido_fefc NUMERIC(14, 2) NOT NULL,
    valor_total_despesas_fefc NUMERIC(14, 2) NOT NULL,
    sobra_campanha_devolvida NUMERIC(14, 2) DEFAULT 0.00,
    media_gasto_partido_estado NUMERIC(14, 2) NOT NULL, -- Benchmark comparativo
    media_gasto_cargo_nacional NUMERIC(14, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_politico_ano_campanha UNIQUE (politico_id, ano_eleicao)
);

CREATE INDEX idx_politico_fefc_politico ON politico_fefc_campanhas(politico_id);
CREATE INDEX idx_politico_fefc_ano ON politico_fefc_campanhas(ano_eleicao);

-- 4. Detalhamento de Despesas por Categoria Padronizada do TSE
CREATE TABLE IF NOT EXISTS politico_fefc_despesas_categorias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campanha_fefc_id UUID NOT NULL REFERENCES politico_fefc_campanhas(id) ON DELETE CASCADE,
    categoria_padronizada VARCHAR(100) NOT NULL,
    -- 'Marketing e Propaganda Digital', 'Produção de Rádio/TV/Vídeo', 'Serviços Prestados por Terceiros/Pessoal',
    -- 'Materiais Impressos e Adesivos', 'Transporte, Combustível e Viagens', 'Comitês e Locação de Imóveis',
    -- 'Pesquisas Eleitorais', 'Serviços Advocatícios e Contábeis', 'Outros Encargos Financeiros'
    valor_gasto NUMERIC(14, 2) NOT NULL,
    percentual_total_campanha NUMERIC(5, 2) NOT NULL,
    quantidade_notas_fiscais INT DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_fefc_despesas_campanha ON politico_fefc_despesas_categorias(campanha_fefc_id);
```

### 1.2. Interfaces TypeScript do Frontend & Backend

```typescript
// /src/types/fefc.ts

export interface CategoriaDespesaFEFC {
  categoria: string;
  valor: number;
  percentual: number;
  descricaoSimples: string;
}

export interface CampanhaFEFCPolitico {
  anoEleicao: number;
  cargoDisputado: string;
  uf: string;
  valorTotalRecebido: number;
  valorTotalGasto: number;
  mediaPartidoEstado: number;
  statusJulgamentoTSE: string;
  linkDivulgaCandContas: string;
  despesasCategorias: CategoriaDespesaFEFC[];
}

export interface HistoricoFEFCNacionalAno {
  ano: number;
  totalGeral: number; // Ex: 4.961.058.480,00
  variacaoRelacaoEleicaoAnterior: number; // Ex: +144.3% ou 0.0%
  baseLegal: string;
  partidoMaiorCota: {
    sigla: string;
    nome: string;
    valor: number;
    percentualDoFundo: number;
  };
  rankingPartidos: Array<{
    sigla: string;
    valor: number;
    percentual: number;
  }>;
}
```

---

## 2. Arquitetura de API / Endpoints

### 2.1. Rotas RESTful no `server.ts`

```
┌────────────────────────────────────────────────────────────────────────────────┐
│ ENDPOINTS DA API REST (/api/transparencia/fundao-eleitoral)                     │
├────────────────────────────────────────────────┬───────────────────────────────┤
│ Endpoint                                       │ Finalidade                    │
├────────────────────────────────────────────────┼───────────────────────────────┤
│ GET /api/transparencia/fundao-eleitoral/global │ Série temporal de todos os    │
│                                                │ anos eleitorais (2018-2026)   │
├────────────────────────────────────────────────┼───────────────────────────────┤
│ GET /api/transparencia/fundao-eleitoral/ano/:a │ Dados do ano especificado,    │
│                                                │ cotas de todos os partidos    │
├────────────────────────────────────────────────┼───────────────────────────────┤
│ GET /api/politicos/:id/fundao-eleitoral        │ Perfil eleitoral do político: │
│                                                │ histórico, despesas e médias  │
└────────────────────────────────────────────────┴───────────────────────────────┘
```

#### Contrato 1: `GET /api/transparencia/fundao-eleitoral/global`
- **Response 200 OK**:
```json
{
  "anosDisponiveis": [2026, 2024, 2022, 2020, 2018],
  "historico": {
    "2024": {
      "ano": 2024,
      "totalGeral": 4961058480.00,
      "variacaoRelacaoEleicaoAnterior": 0.00,
      "partidoMaiorCota": {
        "sigla": "PL",
        "nome": "Partido Liberal",
        "valor": 886836177.00,
        "percentualDoFundo": 17.88
      }
    },
    "2022": {
      "ano": 2022,
      "totalGeral": 4961058480.00,
      "variacaoRelacaoEleicaoAnterior": 144.38,
      "partidoMaiorCota": {
        "sigla": "UNIÃO",
        "nome": "União Brasil",
        "valor": 782496732.00,
        "percentualDoFundo": 15.77
      }
    }
  }
}
```

#### Contrato 2: `GET /api/politicos/:id/fundao-eleitoral`
- **Response 200 OK**:
```json
{
  "politicoId": "uuid-1234",
  "nomeUrna": "Nome do Candidato",
  "totalAcumuladoTodasEleicoes": 3450000.00,
  "eleicoes": [
    {
      "anoEleicao": 2022,
      "cargoDisputado": "Deputado Federal",
      "uf": "SP",
      "valorTotalGasto": 2500000.00,
      "mediaPartidoEstado": 1850000.00,
      "diferencaPercentualMedia": 35.14,
      "statusJulgamentoTSE": "Contas Aprovadas com Ressalvas",
      "despesasCategorias": [
        { "categoria": "Marketing & Redes Sociais", "valor": 950000.00, "percentual": 38.0 },
        { "categoria": "Equipe & Pessoal de Campanha", "valor": 650000.00, "percentual": 26.0 },
        { "categoria": "Produção de Vídeo e TV", "valor": 500000.00, "percentual": 20.0 },
        { "categoria": "Material Impresso & Adesivos", "valor": 400000.00, "percentual": 16.0 }
      ]
    }
  ]
}
```

---

## 3. Especificação de UI/UX

A experiência segue estritamente as diretrizes de **Linguagem Simples**, neutralidade cívica (sem viés opinativo) e ausência de ruído visual.

### 3.1. Gráfico Interativo Global

1. **Localização no Painel**:
   - Adicionado no seletor de dados macroeconômicos do `GastosGovernoPieChart` ou aba dedicada `Fundão Eleitoral`.
2. **Controles de Filtragem Temporal**:
   - Menu suspenso com os anos eleitorais: `2026 (Previsão LOA)`, `2024 (Municipal)`, `2022 (Geral)`, `2020 (Municipal)`, `2018 (Geral - Estreia do FEFC)`.
   - Seletor de visualização: *Pizza 3D por Partido*, *Evolução Histórica em Barras* ou *Comparativo FEFC vs. Orçamento Primário*.
3. **Tooltip Interativo com 3 Dados-Chave**:
   - **Valor Total do Fundo**: em formato legível (`R$ 4,96 Bi`).
   - **Variação %**: Badge neutro (`+144,4% vs. Eleição Anterior`).
   - **Maior Beneficiário**: Partido com a maior fatia (`PL: R$ 886,8 Mi (17,9%)`).

### 3.2. Perfil Individual do Político (`PoliticianDetailModal`)

1. **Card "Fundão Eleitoral (FEFC)" na Aba 2 (Dinheiro Público)**:
   - **KPI Principal**: Montante total recebido de dinheiro público do fundo eleitoral.
   - **Seletor de Ano Eleitoral**: Botões segmentados para alternar entre as eleições disputadas pelo político (ex: `2022`, `2020`, `2018`).
2. **Breakdown por Categoria de Despesa**:
   - Gráfico de barras horizontais com progresso visual proporcional e percentuais exatos.
   - Ícones específicos para cada rubrica (Publicidade, Pessoal, TV/Rádio, Logística).
3. **Benchmark Visual Neutro (Candidato vs. Média do Partido na UF)**:
   - Termômetro / barra horizontal dividida:
     - Marcador A: Valor gasto pelo político.
     - Marcador B: Linha pontilhada da média dos concorrentes do mesmo partido no estado.
   - Texto em linguagem simples: *"O candidato utilizou 35% a mais de recursos do que a média dos candidatos a Deputado Federal do seu partido em SP"*.

---

## 4. Plano de Implementação Passo a Passo

### Fase 1: Backend e Infraestrutura de Dados
1. Criar `src/data/fefcDatabase.ts` contendo os dados consolidados do TSE (2018 a 2026) e registros por político do `POLITICOS_DATABASE`.
2. Criar os 3 endpoints no `server.ts` com suporte a cache em memória (`cacheFefc`) para resposta abaixo de 50ms.
3. Atualizar o schema formal em `src/data/schemaPostgres.ts` para documentação da arquitetura SQL.

### Fase 2: Componentes do Frontend
1. Criar `src/types/fefc.ts` e exportar em `src/types/index.ts`.
2. Criar `src/components/PoliticianFefcSection.tsx` para exibição modular no modal do político.
3. Atualizar `src/components/PoliticianDetailModal.tsx` incorporando a nova seção no fluxo de abas.
4. Integrar a camada "Fundão Eleitoral" no gráfico macroeconômico `GastosGovernoPieChart.tsx`.

### Fase 3: Validação de Dados & Auditoria
1. Testar coerência matemática: $\sum \text{categorias} = \text{total gasto da campanha}$.
2. Executar `compile_applet` e `lint_applet` para validação de integridade do TypeScript.
3. Validar responsividade em dispositivos móveis (360px a 1280px).
