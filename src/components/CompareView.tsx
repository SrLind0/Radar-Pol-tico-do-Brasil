import React, { useState } from 'react';
import { Politico } from '../types';
import {
  GitCompare,
  X,
  Plus,
  Scale,
  Award,
  DollarSign,
  TrendingUp,
  Percent,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  ShieldCheck,
  ChevronRight,
  Vote
} from 'lucide-react';
import { CandidateAvatar } from './CandidateAvatar';
import { getGastoCotaAnualPolitico } from '../data/cotaData';

interface Props {
  politicosDisponiveis: Politico[];
  politicoA: Politico | null;
  politicoB: Politico | null;
  onSelectA: (politico: Politico | null) => void;
  onSelectB: (politico: Politico | null) => void;
  onOpenDetail: (politico: Politico) => void;
}

export const CompareView: React.FC<Props> = ({
  politicosDisponiveis,
  politicoA,
  politicoB,
  onSelectA,
  onSelectB,
  onOpenDetail,
}) => {
  const [modalSelectFor, setModalSelectFor] = useState<'A' | 'B' | null>(null);
  const [busca, setBusca] = useState('');

  const candidatosFiltrados = politicosDisponiveis.filter(
    (p) =>
      p.nomeUrna.toLowerCase().includes(busca.toLowerCase()) ||
      p.siglaPartido.toLowerCase().includes(busca.toLowerCase()) ||
      p.uf.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Cabeçalho do Comparador */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-50 text-blue-700">
                <GitCompare className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Comparador Lado a Lado
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Compare a atuação, leis sancionadas, cota parlamentar, patrimônio e registros judiciais de dois representantes de forma 100% objetiva.
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200 w-fit flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Dados Consolidados e Isentos
          </span>
        </div>

        {/* Seletores Visuais dos dois Políticos */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card Político A */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 flex items-center justify-between gap-3">
            {politicoA ? (
              <div className="flex items-center gap-3 min-w-0">
                <CandidateAvatar
                  nomeUrna={politicoA.nomeUrna}
                  siglaPartido={politicoA.siglaPartido}
                  numeroUrna={politicoA.numeroUrna}
                  size="md"
                />
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                    POLÍTICO A
                  </span>
                  <h3 className="text-base font-bold text-slate-900 truncate mt-1">
                    {politicoA.nomeUrna}
                  </h3>
                  <p className="text-xs text-slate-500 truncate">
                    {politicoA.cargo} · {politicoA.siglaPartido}-{politicoA.uf}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-slate-400">
                <div className="w-14 h-14 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center">
                  <Plus className="w-6 h-6 text-slate-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-700">Selecione o 1º Político</p>
                  <p className="text-[11px] text-slate-400">Clique para escolher da lista</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={() => setModalSelectFor('A')}
                className="px-3 py-1.5 text-xs font-bold bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                {politicoA ? 'Trocar' : 'Selecionar'}
              </button>
              {politicoA && (
                <button
                  onClick={() => onSelectA(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200"
                  title="Remover"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Card Político B */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 flex items-center justify-between gap-3">
            {politicoB ? (
              <div className="flex items-center gap-3 min-w-0">
                <CandidateAvatar
                  nomeUrna={politicoB.nomeUrna}
                  siglaPartido={politicoB.siglaPartido}
                  numeroUrna={politicoB.numeroUrna}
                  size="md"
                />
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                    POLÍTICO B
                  </span>
                  <h3 className="text-base font-bold text-slate-900 truncate mt-1">
                    {politicoB.nomeUrna}
                  </h3>
                  <p className="text-xs text-slate-500 truncate">
                    {politicoB.cargo} · {politicoB.siglaPartido}-{politicoB.uf}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-slate-400">
                <div className="w-14 h-14 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center">
                  <Plus className="w-6 h-6 text-slate-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-700">Selecione o 2º Político</p>
                  <p className="text-[11px] text-slate-400">Clique para escolher da lista</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={() => setModalSelectFor('B')}
                className="px-3 py-1.5 text-xs font-bold bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                {politicoB ? 'Trocar' : 'Selecionar'}
              </button>
              {politicoB && (
                <button
                  onClick={() => onSelectB(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200"
                  title="Remover"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabela Comparativa Lado a Lado */}
      {politicoA && politicoB ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between">
            <h3 className="font-bold text-sm uppercase tracking-wider text-slate-200">
              Tabela de Comparação Direta (Métricas Oficiais)
            </h3>
            <span className="text-xs text-slate-400">
              Valores extraídos de bases públicas
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs sm:text-sm">
            {/* Linha 1: Leis Sancionadas */}
            <div className="p-4 sm:p-5 grid grid-cols-3 items-center gap-2 hover:bg-slate-50/50">
              <div className="text-center sm:text-left">
                <span className="text-lg sm:text-xl font-black text-emerald-700">
                  {politicoA.metricas.projetosViraramLeiTotal} Leis
                </span>
                <p className="text-[10px] text-slate-400">
                  {politicoA.metricas.projetosApresentadosTotal} PLs apresentados
                </p>
              </div>

              <div className="text-center font-bold text-slate-700 flex flex-col items-center">
                <Award className="w-5 h-5 text-emerald-600 mb-1" />
                <span>Projetos que Viraram Lei</span>
              </div>

              <div className="text-center sm:text-right">
                <span className="text-lg sm:text-xl font-black text-emerald-700">
                  {politicoB.metricas.projetosViraramLeiTotal} Leis
                </span>
                <p className="text-[10px] text-slate-400">
                  {politicoB.metricas.projetosApresentadosTotal} PLs apresentados
                </p>
              </div>
            </div>

            {/* Linha 2: Presença em Sessões */}
            <div className="p-4 sm:p-5 grid grid-cols-3 items-center gap-2 hover:bg-slate-50/50">
              <div className="text-center sm:text-left">
                <span className="text-lg sm:text-xl font-black text-slate-900">
                  {politicoA.metricas.presencaPlenarioPorcentagem}%
                </span>
                <p className="text-[10px] text-slate-400">
                  Faltas justif.: {politicoA.metricas.faltasJustificadas}
                </p>
              </div>

              <div className="text-center font-bold text-slate-700 flex flex-col items-center">
                <Percent className="w-5 h-5 text-blue-600 mb-1" />
                <span>Presença em Votações</span>
              </div>

              <div className="text-center sm:text-right">
                <span className="text-lg sm:text-xl font-black text-slate-900">
                  {politicoB.metricas.presencaPlenarioPorcentagem}%
                </span>
                <p className="text-[10px] text-slate-400">
                  Faltas justif.: {politicoB.metricas.faltasJustificadas}
                </p>
              </div>
            </div>

            {/* Linha 3: Gastos de Mandato / Cota Parlamentar por Ano */}
            <div className="p-4 sm:p-5 grid grid-cols-3 items-center gap-2 hover:bg-slate-50/50">
              <div className="text-center sm:text-left">
                {(() => {
                  const cotaA = getGastoCotaAnualPolitico(politicoA);
                  return (
                    <>
                      <span className="text-sm sm:text-base font-black font-mono text-slate-900 block">
                        {cotaA.valorFormatado} / ano
                      </span>
                      <p className="text-[10px] text-slate-400">
                        {cotaA.subtitulo}
                      </p>
                    </>
                  );
                })()}
              </div>

              <div className="text-center font-bold text-slate-700 flex flex-col items-center">
                <DollarSign className="w-5 h-5 text-indigo-600 mb-1" />
                <span>Gastos de Cota / Ano</span>
              </div>

              <div className="text-center sm:text-right">
                {(() => {
                  const cotaB = getGastoCotaAnualPolitico(politicoB);
                  return (
                    <>
                      <span className="text-sm sm:text-base font-black font-mono text-slate-900 block">
                        {cotaB.valorFormatado} / ano
                      </span>
                      <p className="text-[10px] text-slate-400">
                        {cotaB.subtitulo}
                      </p>
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Linha 4: Patrimônio Declarado ao TSE */}
            <div className="p-4 sm:p-5 grid grid-cols-3 items-center gap-2 hover:bg-slate-50/50">
              <div className="text-center sm:text-left">
                {(() => {
                  const bA = politicoA.evolucaoBens[politicoA.evolucaoBens.length - 1];
                  return (
                    <>
                      <span className="text-sm sm:text-base font-black font-mono text-slate-900">
                        R$ {bA?.valorTotalDeclarado.toLocaleString('pt-BR') || '0'}
                      </span>
                      <p className="text-[10px] text-slate-400">
                        Declaração Eleição {bA?.anoEleicao}
                      </p>
                    </>
                  );
                })()}
              </div>

              <div className="text-center font-bold text-slate-700 flex flex-col items-center">
                <TrendingUp className="w-5 h-5 text-amber-600 mb-1" />
                <span>Patrimônio Declarado (TSE)</span>
              </div>

              <div className="text-center sm:text-right">
                {(() => {
                  const bB = politicoB.evolucaoBens[politicoB.evolucaoBens.length - 1];
                  return (
                    <>
                      <span className="text-sm sm:text-base font-black font-mono text-slate-900">
                        R$ {bB?.valorTotalDeclarado.toLocaleString('pt-BR') || '0'}
                      </span>
                      <p className="text-[10px] text-slate-400">
                        Declaração Eleição {bB?.anoEleicao}
                      </p>
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Linha 5: Situação Processual na Justiça */}
            <div className="p-4 sm:p-5 grid grid-cols-3 items-center gap-2 hover:bg-slate-50/50">
              <div className="text-center sm:text-left">
                {politicoA.processosJudiciais.length === 0 ? (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Sem processos
                  </span>
                ) : (
                  <div>
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                      {politicoA.processosJudiciais[0].status}
                    </span>
                    <p className="text-[10px] text-slate-500 mt-1">
                      {politicoA.processosJudiciais.length} processo(s)
                    </p>
                  </div>
                )}
              </div>

              <div className="text-center font-bold text-slate-700 flex flex-col items-center">
                <Scale className="w-5 h-5 text-slate-700 mb-1" />
                <span>Processos na Justiça</span>
              </div>

              <div className="text-center sm:text-right">
                {politicoB.processosJudiciais.length === 0 ? (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Sem processos
                  </span>
                ) : (
                  <div>
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                      {politicoB.processosJudiciais[0].status}
                    </span>
                    <p className="text-[10px] text-slate-500 mt-1">
                      {politicoB.processosJudiciais.length} processo(s)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Linha 6: Emendas Destinadas */}
            <div className="p-4 sm:p-5 grid grid-cols-3 items-center gap-2 hover:bg-slate-50/50">
              <div className="text-center sm:text-left">
                <span className="text-sm font-bold text-slate-900 font-mono">
                  {politicoA.metricas.valorEmendasOrcamentarias > 0
                    ? `R$ ${(politicoA.metricas.valorEmendasOrcamentarias / 1000000).toFixed(1)}M`
                    : 'R$ 0'}
                </span>
                <p className="text-[10px] text-slate-400">
                  {politicoA.metricas.cidadesBeneficiadasTotal} cidades
                </p>
              </div>

              <div className="text-center font-bold text-slate-700 flex flex-col items-center">
                <MapPin className="w-5 h-5 text-purple-600 mb-1" />
                <span>Emendas ao Orçamento</span>
              </div>

              <div className="text-center sm:text-right">
                <span className="text-sm font-bold text-slate-900 font-mono">
                  {politicoB.metricas.valorEmendasOrcamentarias > 0
                    ? `R$ ${(politicoB.metricas.valorEmendasOrcamentarias / 1000000).toFixed(1)}M`
                    : 'R$ 0'}
                </span>
                <p className="text-[10px] text-slate-400">
                  {politicoB.metricas.cidadesBeneficiadasTotal} cidades
                </p>
              </div>
            </div>
          </div>

          {/* Botões para Ficha Completa */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center gap-4">
            <button
              onClick={() => onOpenDetail(politicoA)}
              className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
            >
              Ver Ficha de {politicoA.nomeUrna} <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onOpenDetail(politicoB)}
              className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 cursor-pointer"
            >
              Ver Ficha de {politicoB.nomeUrna} <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-3">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto">
            <GitCompare className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Selecione dois representantes para comparar
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Escolha candidatos a presidente, governador, prefeito ou parlamentares acima para visualizar uma comparação direta e neutra de histórico e gastos.
          </p>
        </div>
      )}

      {/* Modal de Seleção de Político */}
      {modalSelectFor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full max-h-[80vh] flex flex-col p-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">
                Escolher Político {modalSelectFor}
              </h3>
              <button
                onClick={() => setModalSelectFor(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-3">
              <input
                type="text"
                placeholder="Filtrar por nome, partido ou UF..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full bg-slate-100 text-slate-900 text-xs px-3.5 py-2.5 rounded-xl border border-transparent focus:border-blue-500 focus:bg-white focus:outline-hidden"
              />
            </div>

            <div className="mt-3 flex-1 overflow-y-auto space-y-2 pr-1">
              {candidatosFiltrados.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    if (modalSelectFor === 'A') onSelectA(p);
                    if (modalSelectFor === 'B') onSelectB(p);
                    setModalSelectFor(null);
                    setBusca('');
                  }}
                  className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-slate-100 cursor-pointer transition-colors border border-transparent hover:border-slate-200"
                >
                  <CandidateAvatar
                    nomeUrna={p.nomeUrna}
                    siglaPartido={p.siglaPartido}
                    numeroUrna={p.numeroUrna}
                    size="sm"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {p.nomeUrna}
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate">
                      {p.cargo} · {p.siglaPartido}-{p.uf}
                    </p>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {p.leisSancionadas.length} Leis
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
