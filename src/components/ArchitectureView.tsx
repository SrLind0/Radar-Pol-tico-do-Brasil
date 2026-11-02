import React, { useState } from 'react';
import { POSTGRESQL_SCHEMA_DDL, PIPELINE_SCRAPING_DOCS } from '../data/schemaPostgres';
import { Database, Code2, Cpu, Copy, Check, Server, ShieldCheck, Zap } from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState<'schema' | 'pipeline' | 'prompt'>('schema');

  const handleCopy = () => {
    navigator.clipboard.writeText(POSTGRESQL_SCHEMA_DDL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Banner Principal da Arquitetura */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-700">
              <Database className="w-6 h-6" />
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Arquitetura Técnica & Schema PostgreSQL (Fase 1)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Estrutura relacional escalável com índices GIN, pipeline de workers assíncronos e motor de IA sem viés ideológico.
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200 w-fit flex items-center gap-1.5">
            <Server className="w-4 h-4 text-indigo-600" />
            PostgreSQL + Node.js + Gemini 3.8 Flash
          </span>
        </div>

        {/* Abas */}
        <div className="mt-5 flex gap-2 border-b border-slate-100 pb-2">
          <button
            onClick={() => setAbaAtiva('schema')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              abaAtiva === 'schema'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Schema DDL PostgreSQL
          </button>
          <button
            onClick={() => setAbaAtiva('pipeline')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              abaAtiva === 'pipeline'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Pipeline de Coleta & Scraping
          </button>
          <button
            onClick={() => setAbaAtiva('prompt')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              abaAtiva === 'prompt'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Engenharia de Prompt (Linguagem Simples)
          </button>
        </div>
      </div>

      {/* ABA 1: SCHEMA POSTGRESQL DDL */}
      {abaAtiva === 'schema' && (
        <div className="bg-slate-950 rounded-3xl p-5 border border-slate-800 text-slate-200 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <Code2 className="w-4 h-4" />
              <span>schema_transparencia_fase1.sql</span>
            </div>
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar SQL</span>
                </>
              )}
            </button>
          </div>

          <pre className="text-xs font-mono text-slate-300 overflow-x-auto max-h-[500px] leading-relaxed scrollbar-thin">
            {POSTGRESQL_SCHEMA_DDL}
          </pre>
        </div>
      )}

      {/* ABA 2: PIPELINE DE SCRAPING & WORKERS */}
      {abaAtiva === 'pipeline' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              Fluxo Contínuo de Sincronização Oficial
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Para atender à neutralidade absoluta e frescor dos dados sem sobrecarregar as APIs oficiais, o backend adota uma arquitetura orientada a filas com workers assíncronos (BullMQ / Celery):
            </p>

            <div className="space-y-3 pt-2">
              {PIPELINE_SCRAPING_DOCS.arquitetura.map((etapa, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <h4 className="font-bold text-xs text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    {etapa.etapa}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 pl-7 leading-relaxed">
                    {etapa.descricao}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ABA 3: ENGENHARIA DE PROMPT */}
      {abaAtiva === 'prompt' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-indigo-700">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="font-bold text-base text-slate-900">
              Diretriz Constitucional de Neutralidade e Prompt de IA
            </h3>
          </div>

          <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100 text-xs text-slate-800 space-y-2">
            <p className="font-semibold text-indigo-900">
              Instrução de Sistema (System Instruction) do Modelo Gemini 3.8 Flash:
            </p>
            <blockquote className="italic border-l-4 border-indigo-400 pl-3 py-1 font-mono text-[11px] text-slate-700 bg-white/70 p-2 rounded">
              "Você é um especialista em Linguagem Simples (Plain Language). Sua tarefa é resumir o texto legislativo/jurídico a seguir em no máximo 2 frases curtas. Regras obrigatórias:
              1. Use a ordem direta (Sujeito + Verbo + Predicado).
              2. Substitua qualquer jargão jurídico ou parlamentar por termos do cotidiano brasileiro.
              3. Não emita opiniões sobre a qualidade da medida. Apenas declare o que a lei ou proposta faz de forma concreta na prática.
              4. Máximo de 25 palavras por frase."
            </blockquote>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl border border-red-200 bg-red-50/40 text-xs">
              <span className="font-bold text-red-800 uppercase block mb-1">
                ❌ Proibido (Alucinação / Juízo de Valor)
              </span>
              <p className="text-slate-600">
                "O deputado corrupto votou contra a população para beneficiar banqueiros."
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/40 text-xs">
              <span className="font-bold text-emerald-800 uppercase block mb-1">
                ✓ Permitido (Factual e em Linguagem Simples)
              </span>
              <p className="text-slate-700">
                "O parlamentar votou 'Não' ao Projeto de Lei Complementar 68/2024. O texto estabeleceu as alíquotas do novo imposto sobre o consumo."
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
