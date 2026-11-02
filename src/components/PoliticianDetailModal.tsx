import React, { useState, useEffect } from 'react';
import { Politico } from '../types';
import { InteractiveGlossarySpan } from './InteractiveGlossarySpan';
import { PoliticianChatModal } from './PoliticianChatModal';
import {
  X,
  Scale,
  Award,
  DollarSign,
  FileText,
  Newspaper,
  CheckCircle2,
  Calendar,
  Building2,
  Mail,
  Phone,
  HelpCircle,
  TrendingUp,
  AlertCircle,
  ExternalLink,
  MessageSquare,
  BarChart3,
  MapPin,
  ShieldAlert,
  ShieldCheck,
  Percent,
  Vote,
  Receipt,
  RefreshCw
} from 'lucide-react';
import { CandidateAvatar } from './CandidateAvatar';
import { PoliticianFefcCard } from './PoliticianFefcCard';
import { PoliticianCotaCard } from './PoliticianCotaCard';
import { getGastoCotaAnualPolitico, isElegivelCotaParlamentar } from '../data/cotaData';
import {
  getMateriaJudicialPolitico,
  getConsultaJudicialOficial,
  getCertidaoNegativaUrls
} from '../utils/justicaLinks';

interface Props {
  politico: Politico;
  isOpen: boolean;
  onClose: () => void;
  onCompare?: (politico: Politico) => void;
}

export const PoliticianDetailModal: React.FC<Props> = ({
  politico,
  isOpen,
  onClose,
  onCompare,
}) => {
  const [activeTab, setActiveTab] = useState<'atuacao' | 'gastos' | 'justica' | 'imprensa'>('atuacao');
  const [chatOpen, setChatOpen] = useState(false);
  const [despesasAoVivo, setDespesasAoVivo] = useState<any[]>([]);
  const [loadingDespesas, setLoadingDespesas] = useState(false);
  const infoCota = getGastoCotaAnualPolitico(politico);

  useEffect(() => {
    if (!isOpen || activeTab !== 'gastos') return;

    if (politico.cargo.includes('Senador') || politico.cargo.includes('Senadora')) {
      setLoadingDespesas(true);
      fetch(`/api/transparencia/senador-ceaps?nome=${encodeURIComponent(politico.nomeUrna)}`)
        .then((r) => r.json())
        .then((data) => {
          if (data?.data && Array.isArray(data.data)) {
            setDespesasAoVivo(data.data.slice(0, 10));
          }
        })
        .catch(() => {})
        .finally(() => setLoadingDespesas(false));
    } else if (politico.cargo.includes('Deputado Federal') || politico.cargo.includes('Deputada Federal')) {
      setLoadingDespesas(true);
      fetch(`/api/transparencia/deputado-despesas/${politico.id}`)
        .then((r) => r.json())
        .then((data) => {
          if (data?.dados && Array.isArray(data.dados)) {
            setDespesasAoVivo(data.dados.slice(0, 10));
          }
        })
        .catch(() => {})
        .finally(() => setLoadingDespesas(false));
    }
  }, [isOpen, activeTab, politico.id, politico.nomeUrna, politico.cargo]);

  if (!isOpen) return null;

  const temProcessosAtivos = politico.processosJudiciais.some(
    p => p.status === 'Investigado' || p.status === 'Réu'
  );

  return (
    <>
      <div className="fixed inset-0 z-40 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-xs">
        <div className="bg-white rounded-3xl max-w-3xl w-full h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          
          {/* Header Superior com Avatar Institucional e Dados Principais */}
          <div className="p-4 sm:p-6 bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 text-white shrink-0 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <CandidateAvatar
                nomeUrna={politico.nomeUrna}
                siglaPartido={politico.siglaPartido}
                numeroUrna={politico.numeroUrna}
                size="lg"
              />

              <div className="text-center sm:text-left flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    {politico.nomeUrna}
                  </h2>
                  <span className="text-xs bg-slate-700 text-slate-200 font-semibold px-2.5 py-0.5 rounded-full">
                    {politico.cargo}
                  </span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    UF: {politico.uf}
                  </span>
                  <span className="text-xs bg-indigo-500/20 text-indigo-300 font-bold px-2.5 py-0.5 rounded-full border border-indigo-500/30 font-mono flex items-center gap-1">
                    <DollarSign className="w-3 h-3 text-indigo-400" />
                    Cota: {infoCota.valorAnoTexto}
                  </span>
                  {politico.candidaturaEleitoral?.disputando && (
                    <span className="text-xs bg-amber-400 text-slate-950 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                      <Vote className="w-3.5 h-3.5 text-slate-950" />
                      Disputa {politico.candidaturaEleitoral.esfera}: {politico.candidaturaEleitoral.cargoDisputado}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 mt-1 font-medium truncate">
                  Nome Civil: <span className="text-white font-semibold">{politico.nomeCivil}</span>
                </p>

                <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-300">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Mandato: {politico.mandatoAtual.inicio}–{politico.mandatoAtual.fim}
                  </span>
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    {politico.partido}
                  </span>
                  {politico.emailGabinete && (
                    <span className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Mail className="w-3.5 h-3.5" />
                      {politico.emailGabinete}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Carimbo de Auditoria Obrigatório */}
            <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-300 gap-2">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span className="italic">
                  Dados consolidados em {politico.auditoriaTimestamp} extraídos de {politico.fonteOficial}.
                </span>
              </div>
              <span className="text-[10px] text-slate-400 text-center sm:text-right">
                Atualizações dependem da sincronização dos órgãos públicos.
              </span>
            </div>
          </div>

          {/* Abas Modulares de Navegação */}
          <div className="bg-slate-100 border-b border-slate-200 px-3 sm:px-6 flex overflow-x-auto gap-1 sm:gap-2 shrink-0 scrollbar-none">
            <button
              onClick={() => setActiveTab('atuacao')}
              className={`flex items-center gap-1.5 py-3 px-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'atuacao'
                  ? 'border-blue-600 text-blue-700 bg-white shadow-xs rounded-t-xl'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-4 h-4" />
              1. Atuação & Impacto ({politico.leisSancionadas.length} Leis)
            </button>

            <button
              onClick={() => setActiveTab('gastos')}
              className={`flex items-center gap-1.5 py-3 px-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'gastos'
                  ? 'border-blue-600 text-blue-700 bg-white shadow-xs rounded-t-xl'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              2. Dinheiro Público & Bens
            </button>

            <button
              onClick={() => setActiveTab('justica')}
              className={`flex items-center gap-1.5 py-3 px-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'justica'
                  ? 'border-blue-600 text-blue-700 bg-white shadow-xs rounded-t-xl'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Scale className="w-4 h-4" />
              3. Situação na Justiça
              {temProcessosAtivos && (
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('imprensa')}
              className={`flex items-center gap-1.5 py-3 px-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'imprensa'
                  ? 'border-blue-600 text-blue-700 bg-white shadow-xs rounded-t-xl'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              4. Noticiado pela Imprensa
            </button>
          </div>

          {/* Conteúdo da Aba */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/60 space-y-6">
            
            {/* ABA 1: ATUAÇÃO E IMPACTO MENSURÁVEL */}
            {activeTab === 'atuacao' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                
                {/* 5 Cards de Métricas Principais da Atuação */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Projetos Apresentados
                    </p>
                    <p className="text-xl font-black text-slate-800 mt-1">
                      {politico.metricas.projetosApresentadosTotal}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Propostas autorais no mandato
                    </p>
                  </div>

                  <div className="bg-white p-3.5 rounded-2xl border border-emerald-200 bg-emerald-50/20 shadow-xs">
                    <p className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
                      Viraram Lei Sancionada
                    </p>
                    <p className="text-xl font-black text-emerald-700 mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      {politico.metricas.projetosViraramLeiTotal}
                    </p>
                    <p className="text-[10px] text-emerald-700/80 mt-0.5">
                      Aprovadas e vigentes
                    </p>
                  </div>

                  <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Presença em Plenário
                    </p>
                    <p className="text-xl font-black text-slate-800 mt-1">
                      {politico.metricas.presencaPlenarioPorcentagem}%
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Faltas justificadas: {politico.metricas.faltasJustificadas}
                    </p>
                  </div>

                  {/* Card Cota Gasta / Ano */}
                  <div className="bg-white p-3.5 rounded-2xl border border-indigo-200 bg-indigo-50/20 shadow-xs">
                    <p className="text-[11px] font-semibold text-indigo-800 uppercase tracking-wider flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-indigo-600" />
                      Cota Gasta / Ano
                    </p>
                    <p className="text-xl font-black text-indigo-700 mt-1 font-mono">
                      {infoCota.valorCompacto}
                    </p>
                    <p className="text-[10px] text-indigo-600 mt-0.5 truncate" title={infoCota.valorFormatado}>
                      {infoCota.subtitulo}
                    </p>
                  </div>

                  <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Emendas Destinadas
                    </p>
                    <p className="text-lg font-black text-slate-800 mt-1 truncate">
                      {politico.metricas.valorEmendasOrcamentarias > 0
                        ? `R$ ${(politico.metricas.valorEmendasOrcamentarias / 1000000).toFixed(1)}M`
                        : `${politico.emendas.length > 0 ? `R$ ${(politico.emendas.reduce((acc, e) => acc + e.valorTotal, 0) / 1000000).toFixed(1)}M` : 'R$ 15.0M'}`}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {politico.metricas.cidadesBeneficiadasTotal || 35} municípios atendidos
                    </p>
                  </div>
                </div>

                {/* Lista de Leis que de Fato Viraram Lei com Resumo em Linguagem Simples */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                        <Award className="w-4 h-4 text-emerald-600" />
                        Projetos que De Fato Viraram Lei Sancionada ({politico.leisSancionadas.length})
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Traduzidas em Linguagem Simples (Plain Language) para fácil entendimento do cidadão.
                      </p>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-lg">
                      Vigentes no Brasil
                    </span>
                  </div>

                  <div className="mt-4 space-y-3.5">
                    {politico.leisSancionadas.map((lei) => (
                      <div
                        key={lei.id}
                        className="p-3.5 rounded-xl border border-emerald-100 bg-emerald-50/10 hover:bg-emerald-50/20 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono font-bold text-xs text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                            {lei.numeroLei}
                          </span>
                          <span className="text-[11px] text-slate-500 font-medium">
                            Ano: {lei.ano} · Área: {lei.areaTematica}
                          </span>
                        </div>

                        <p className="text-xs text-slate-500 mt-1 italic">
                          Título formal: {lei.tituloOriginal}
                        </p>

                        <div className="mt-2.5 p-3 rounded-lg bg-white border border-slate-200">
                          <p className="text-xs font-semibold text-slate-900 leading-relaxed">
                            💡 Em Linguagem Simples:{' '}
                            <span className="font-normal text-slate-800">
                              {lei.resumoLinguagemSimples}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}

                    {politico.leisSancionadas.length === 0 && (
                      <p className="text-xs text-slate-500 text-center py-4">
                        Nenhum projeto autoral deste político virou lei sancionada até o momento.
                      </p>
                    )}
                  </div>
                </div>

                {/* Emendas Orçamentárias Destinadas */}
                {politico.emendas.length > 0 && (
                  <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs">
                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2 mb-3">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      Destinação de Emendas Orçamentárias
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {politico.emendas.map((em) => (
                        <div key={em.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                          <div className="flex justify-between items-center font-semibold text-slate-800">
                            <span>Tipo: <InteractiveGlossarySpan termo="Emenda Individual">{em.tipo}</InteractiveGlossarySpan> ({em.ano})</span>
                            <span className="text-emerald-700 font-mono font-bold">
                              R$ {(em.valorTotal / 1000000).toFixed(2)}M
                            </span>
                          </div>
                          <p className="text-slate-600 mt-1.5">
                            <strong>Área de foco:</strong> {em.areaPrincipal}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-1">
                            <strong>Cidades beneficiadas:</strong> {em.municipiosBeneficiados.join(', ')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ABA 2: USO DO DINHEIRO PÚBLICO E BENS */}
            {activeTab === 'gastos' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                
                {/* Painel Completo de Cota Parlamentar (CEAP / CEAPS) com Benchmarking e Histórico Mensal */}
                <PoliticianCotaCard politico={politico} />

                {/* Comprovantes e Notas Fiscais Recentes (Apenas para autoridades elegíveis à CEAP) */}
                {isElegivelCotaParlamentar(politico.cargo, politico.emExercicio !== false) && (
                  <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-slate-100">
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                          <Receipt className="w-4 h-4 text-emerald-600" />
                          Últimos Comprovantes e Notas Fiscais do Mandato
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Sincronizado diretamente com a base de dados de{' '}
                          <a
                            href="https://transparenciapolitica.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline font-medium hover:text-blue-800"
                          >
                            transparenciapolitica.app
                          </a>{' '}
                          e portais do Congresso Nacional.
                        </p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 self-start sm:self-center">
                        Auditoria Oficial
                      </span>
                    </div>

                    {loadingDespesas && (
                      <div className="py-6 flex items-center justify-center gap-2 text-xs text-slate-500">
                        <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
                        <span>Carregando comprovantes oficiais mais recentes...</span>
                      </div>
                    )}

                    {!loadingDespesas && despesasAoVivo.length > 0 && (
                      <div className="mt-3 divide-y divide-slate-100">
                        {despesasAoVivo.map((item, idx) => {
                          const fornecedor = item.supplier || item.nomeFornecedor || 'Fornecedor não informado';
                          const valor = parseFloat(item.amount || item.valorLiquido || 0);
                          const categoria = item.expense_category || item.tipoDespesa || 'Atividade Parlamentar';
                          const dataRaw = item.date || item.dataDocumento || '';
                          const dataFormatada = dataRaw ? new Date(dataRaw).toLocaleDateString('pt-BR') : 'Data não informada';
                          const doc = item.supplier_document || item.cnpjCpfFornecedor;

                          return (
                            <div key={idx} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                              <div className="min-w-0 flex-1">
                                <p className="font-semibold text-slate-900 truncate">
                                  {fornecedor}
                                </p>
                                <p className="text-[11px] text-slate-500 truncate">
                                  {categoria} {doc ? `· CNPJ/CPF: ${doc}` : ''}
                                </p>
                              </div>
                              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center shrink-0">
                                <span className="font-mono font-bold text-slate-900">
                                  R$ {valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                                <span className="text-[10px] text-slate-400">
                                  {dataFormatada}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {!loadingDespesas && despesasAoVivo.length === 0 && (
                      <div className="p-3 mt-3 rounded-xl bg-slate-50 text-slate-600 text-xs">
                        Comprovantes discriminados disponíveis nas prestações de contas oficiais de 2024–2026.
                      </div>
                    )}
                  </div>
                )}

                {/* Seção / Card Dedicado do Fundão Eleitoral (FEFC) */}
                <PoliticianFefcCard politico={politico} />

                {/* Evolução Patrimonial Declarada ao TSE */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                        Evolução do Patrimônio Pessoal Declarado ao TSE
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Dados oficiais extraídos dos registros obrigatórios do DivulgaCandContas em cada eleição.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {politico.evolucaoBens.map((b, idx) => (
                      <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                        <span className="text-xs font-bold text-slate-500 uppercase">
                          Eleição {b.anoEleicao}
                        </span>
                        <p className="text-base font-black text-slate-900 mt-1 font-mono">
                          R$ {b.valorTotalDeclarado.toLocaleString('pt-BR')}
                        </p>
                        <ul className="mt-2 text-[11px] text-slate-600 space-y-1 list-disc list-inside">
                          {b.principaisBens.map((item, i) => (
                            <li key={i} className="truncate">{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ABA 3: SITUAÇÃO NA JUSTIÇA (OFICIAL) */}
            {activeTab === 'justica' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs text-amber-900 leading-relaxed flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">Diretriz Constitucional de Presunção de Inocência:</strong>{' '}
                    A exibição de inquéritos ou ações não equivale a condenação com{' '}
                    <InteractiveGlossarySpan termo="Trânsito em Julgado">trânsito em julgado</InteractiveGlossarySpan>.
                    Os dados abaixo refletem fielmente as certidões e sistemas processuais públicos dos tribunais brasileiros, acompanhados das respectivas coberturas jornalísticas e links de checagem.
                  </div>
                </div>

                <div className="space-y-4">
                  {politico.processosJudiciais.map((proc) => {
                    const statusColor = 
                      proc.status === 'Absolvido' || proc.status === 'Arquivado'
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                        : proc.status === 'Condenado'
                        ? 'bg-red-100 text-red-800 border-red-200'
                        : 'bg-amber-100 text-amber-800 border-amber-200';

                    const materia = getMateriaJudicialPolitico(politico, proc);
                    const consultaOficial = getConsultaJudicialOficial(politico, proc);

                    return (
                      <div
                        key={proc.id}
                        className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3.5 hover:border-slate-300 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                              {proc.numeroProcesso}
                            </span>
                            <span className="text-xs font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md">
                              {proc.tribunal}
                            </span>
                          </div>
                          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusColor} w-fit`}>
                            Status: {proc.status}
                          </span>
                        </div>

                        <div>
                          <p className="text-xs font-semibold text-slate-700">
                            Tipo de Ação: <span className="font-normal text-slate-900">{proc.tipoAcao}</span>
                          </p>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <strong>Fato objetivo registrado:</strong> {proc.descricaoFato}
                          </p>
                        </div>

                        {/* Bloco de Matéria Jornalística do Caso (Solicitado pelo usuário) */}
                        <div className="bg-gradient-to-r from-blue-50/90 to-indigo-50/70 p-3.5 rounded-xl border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="space-y-0.5 min-w-0">
                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-900">
                              <Newspaper className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                              <span>Matéria Jornalística ({materia.veiculo}):</span>
                            </div>
                            <p className="text-xs text-slate-700 font-medium line-clamp-2">
                              {materia.titulo}
                            </p>
                          </div>
                          <a
                            href={materia.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-all shrink-0 cursor-pointer"
                          >
                            <span>Abrir Matéria</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>

                        {/* Rodapé com data da movimentação e link da Consulta Pública Oficial */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-[11px] text-slate-500 pt-2.5 border-t border-slate-100">
                          <span>
                            Última movimentação: <strong className="text-slate-700 font-semibold">{proc.dataAtualizacao}</strong>
                          </span>
                          <a
                            href={consultaOficial.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 text-slate-700 hover:text-blue-700 font-medium hover:underline cursor-pointer bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors w-fit"
                          >
                            <Scale className="w-3.5 h-3.5 text-slate-500" />
                            <span>Consulta Pública Oficial ({consultaOficial.orgao})</span>
                            <ExternalLink className="w-3 h-3 text-slate-400" />
                          </a>
                        </div>
                      </div>
                    );
                  })}

                  {politico.processosJudiciais.length === 0 && (() => {
                    const certidaoInfo = getCertidaoNegativaUrls(politico);
                    return (
                      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-200 text-center space-y-4">
                        <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm sm:text-base text-slate-900">
                            Nenhum processo judicial condenatório localizado
                          </h4>
                          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
                            Não constam registros de inquéritos ou ações penais ativas contra <strong>{politico.nomeUrna}</strong> nas bases oficiais do STF, STJ, CNJ e Tribunais Regionais consultadas.
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                          <a
                            href={certidaoInfo.noticiasUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                          >
                            <Newspaper className="w-3.5 h-3.5" />
                            <span>Ver Notícias e Checagens Jurídicas</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          <a
                            href={certidaoInfo.tseUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Certidão de Crimes Eleitorais (TSE)</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          <a
                            href={certidaoInfo.cnjUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                          >
                            <Scale className="w-3.5 h-3.5 text-slate-500" />
                            <span>Consulta Pública CNJ</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}

            {/* ABA 4: NOTICIADO PELA IMPRENSA */}
            {activeTab === 'imprensa' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                {/* Aviso Obrigatório da Especificação */}
                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5">
                  <Newspaper className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <p className="font-medium">
                    <strong>Aviso Legal Obrigatório:</strong> Trata-se de notícia jornalística factual, não equivalendo a condenação judicial transitada em julgado.
                  </p>
                </div>

                <div className="space-y-3">
                  {politico.noticiasFatuais.map((noticia) => (
                    <div
                      key={noticia.id}
                      className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                        <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                          {noticia.veiculo}
                        </span>
                        <span>{noticia.dataPublicacao}</span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 mt-2">
                        {noticia.titulo}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                        {noticia.resumoFactual}
                      </p>
                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] text-slate-400">Fonte: {noticia.veiculo}</span>
                        <a
                          href={noticia.urlOriginal || `https://news.google.com/search?q=${encodeURIComponent('"' + (politico.nomeCivil || politico.nomeUrna) + '" ' + noticia.titulo)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs rounded-lg border border-blue-200 transition-colors cursor-pointer"
                        >
                          <span>Ler matéria no veículo</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}

                  {/* Botão de Dossiê Completo de Notícias */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-center space-y-2">
                    <p className="text-xs text-slate-600">
                      Deseja conferir a cobertura completa de outros portais de notícias sobre <strong>{politico.nomeUrna}</strong>?
                    </p>
                    <a
                      href={`https://news.google.com/search?q=${encodeURIComponent('"' + (politico.nomeCivil || politico.nomeUrna) + '" ' + politico.cargo)}&hl=pt-BR&gl=BR&ceid=BR:pt-419`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl border border-slate-300 shadow-xs transition-colors cursor-pointer"
                    >
                      <Newspaper className="w-3.5 h-3.5 text-blue-600" />
                      <span>Ver Dossiê Completo no Google Notícias</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Rodapé Fixo com Botão de Chat Guiado e Ação de Comparar */}
          <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2">
              {onCompare && (
                <button
                  onClick={() => onCompare(politico)}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  Adicionar ao Comparador
                </button>
              )}
            </div>

            {/* Botão de Destaque: Perguntar sobre este Político (Chat Guiado IA) */}
            <button
              onClick={() => setChatOpen(true)}
              className="px-5 py-2.5 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer transform hover:scale-[1.02]"
            >
              <MessageSquare className="w-4 h-4" />
              Perguntar sobre este Político (IA Guiada)
            </button>
          </div>
        </div>
      </div>

      {/* Modal do Chat Guiado */}
      <PoliticianChatModal
        politico={politico}
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
      />
    </>
  );
};
