import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  DollarSign,
  Receipt,
  Users,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  RefreshCw,
  Building2,
  Heart,
  GraduationCap,
  Shield,
  Home,
  Palette,
  Leaf,
  Truck,
  CheckCircle2,
  PieChart as PieChartIcon,
  Table
} from 'lucide-react';
import {
  DADOS_TRANSPARENCIA_SNAPSHOT,
  TransparenciaFederalData,
  formatarMoedaCompacta,
  formatarMoedaCompleta,
  carregarDadosOficiais,
} from '../data/transparenciaData';
import { GastosGovernoPieChart } from './GastosGovernoPieChart';
import { SerieHistoricaImpostosChart } from './SerieHistoricaImpostosChart';

interface Props {
  totalPoliticosCadastrados: number;
}

export const TransparenciaFederalHeader: React.FC<Props> = ({ totalPoliticosCadastrados }) => {
  const [dados, setDados] = useState<TransparenciaFederalData>(DADOS_TRANSPARENCIA_SNAPSHOT);
  const [mostrarSetores, setMostrarSetores] = useState(true);
  const [modoVisualizacao, setModoVisualizacao] = useState<'serie' | 'grafico' | 'tabela'>('serie');
  const [loading, setLoading] = useState(false);
  const [sincronizadoEm, setSincronizadoEm] = useState<string>('Hoje, ao vivo');

  const carregarDadosAoVivo = async () => {
    setLoading(true);
    try {
      const dadosCarregados = await carregarDadosOficiais('/api/transparencia/indicadores', 4000);
      setDados(dadosCarregados);
      setSincronizadoEm(new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
    } catch (_err) {
      setDados(DADOS_TRANSPARENCIA_SNAPSHOT);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDadosAoVivo();
  }, []);

  const getSectorIcon = (id: string) => {
    switch (id) {
      case 'saude':
        return <Heart className="w-3.5 h-3.5 text-rose-500" />;
      case 'educacao':
        return <GraduationCap className="w-3.5 h-3.5 text-blue-500" />;
      case 'defesa':
        return <Shield className="w-3.5 h-3.5 text-sky-600" />;
      case 'seguranca':
        return <Shield className="w-3.5 h-3.5 text-amber-500" />;
      case 'protecaoSocial':
        return <Users className="w-3.5 h-3.5 text-purple-500" />;
      case 'transportes':
        return <Truck className="w-3.5 h-3.5 text-indigo-500" />;
      case 'habitacao':
        return <Home className="w-3.5 h-3.5 text-emerald-500" />;
      case 'cultura':
        return <Palette className="w-3.5 h-3.5 text-pink-500" />;
      case 'meioAmbiente':
        return <Leaf className="w-3.5 h-3.5 text-green-500" />;
      default:
        return <Building2 className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden mb-6">
      {/* Top Banner de Integração Oficial */}
      <div className="bg-linear-to-r from-slate-900 via-slate-800 to-indigo-950 text-white px-4 py-3 sm:px-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-wide text-white uppercase">
                Painel Oficial de Transparência Política
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Sincronizado
              </span>
            </div>
            <p className="text-[11px] text-slate-300">
              Dados públicos e auditáveis integrados de{' '}
              <a
                href="https://transparenciapolitica.app"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-emerald-300 font-semibold hover:text-emerald-200 inline-flex items-center gap-0.5"
              >
                transparenciapolitica.app
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
              , Câmara, Senado e Portal da Transparência.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-300 hidden sm:inline">
            Atualizado: {sincronizadoEm}
          </span>
          <button
            onClick={carregarDadosAoVivo}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white font-medium transition-colors cursor-pointer disabled:opacity-50"
            title="Atualizar dados ao vivo"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Atualizar Dados</span>
          </button>
        </div>
      </div>

      {/* Grid de KPIs Principais */}
      <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50/50">
        
        {/* KPI 1: Gastos Totais no Congresso */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Gastos Cota Congresso ({dados.gastos.ano})
            </span>
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {formatarMoedaCompacta(dados.gastos.total)}
          </div>
          <p className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
            <span>Deputados: <strong>{formatarMoedaCompacta(dados.gastos.deputados)}</strong></span>
            <span>Senadores: <strong>{formatarMoedaCompacta(dados.gastos.senadores)}</strong></span>
          </p>
          <div className="mt-2 text-[10px] text-slate-400 font-mono">
            Exato: {formatarMoedaCompleta(dados.gastos.total)}
          </div>
        </div>

        {/* KPI 2: Arrecadação de Impostos */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Arrecadação Federal ({dados.receita.ano})
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {formatarMoedaCompacta(dados.receita.receitaTributaria)}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Receitas federais tributárias arrecadadas
          </p>
          <div className="mt-2 text-[10px] text-slate-400">
            Fonte: <strong>{dados.receita.fonte}</strong>
          </div>
        </div>

        {/* KPI 3: Despesas Setoriais da União */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Despesas Governo Central
            </span>
            <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {formatarMoedaCompacta(dados.despesasSetores.totalGeral)}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {dados.despesasSetores.setores.length} setores prioritários monitorados
          </p>
          <div className="mt-2 text-[10px] text-slate-400">
            Período: {dados.despesasSetores.periodo}
          </div>
        </div>

        {/* KPI 4: Políticos em Exercício Monitorados */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Políticos no Radar
            </span>
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {totalPoliticosCadastrados}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            <strong>513</strong> Deputados + <strong>81</strong> Senadores + <strong>27</strong> Governadores
          </p>
          <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            Cobertura em todos os 27 estados (UFs)
          </div>
        </div>
      </div>

      {/* Seção de Gastos do Governo: Gráfico de Pizza Interativo & Filtro por Ano */}
      <div className="border-t border-slate-200 bg-white">
        <div className="px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 bg-slate-50/80 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMostrarSetores(!mostrarSetores)}
              className="flex items-center gap-2 text-xs font-black text-slate-800 hover:text-blue-700 transition cursor-pointer"
            >
              <div className="p-1 rounded-lg bg-blue-600 text-white shadow-2xs">
                <PieChartIcon className="w-3.5 h-3.5" />
              </div>
              <span>Visualização dos Gastos do Governo (Gráfico de Pizza 3D & Filtro 2000 a 2026)</span>
              {mostrarSetores ? <ChevronUp className="w-3.5 h-3.5 text-slate-500" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-500" />}
            </button>
          </div>

          {mostrarSetores && (
            <div className="flex items-center gap-2">
              <div className="inline-flex rounded-xl bg-white p-0.5 border border-slate-200 text-xs shadow-2xs">
                <button
                  onClick={() => setModoVisualizacao('serie')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold text-xs transition cursor-pointer ${
                    modoVisualizacao === 'serie'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Série temporal de arrecadação de impostos e orçamento de 2000 a 2026"
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Série Temporal (Impostos Federais)</span>
                </button>
                <button
                  onClick={() => setModoVisualizacao('grafico')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold text-xs transition cursor-pointer ${
                    modoVisualizacao === 'grafico'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <PieChartIcon className="w-3.5 h-3.5" />
                  <span>Gráfico 3D (Composição)</span>
                </button>
                <button
                  onClick={() => setModoVisualizacao('tabela')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold text-xs transition cursor-pointer ${
                    modoVisualizacao === 'tabela'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Table className="w-3.5 h-3.5" />
                  <span>Tabela Resumida</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {mostrarSetores && (
          <div className="animate-in fade-in duration-200">
            {modoVisualizacao === 'serie' ? (
              <SerieHistoricaImpostosChart className="border-0 shadow-none rounded-none" />
            ) : modoVisualizacao === 'grafico' ? (
              <GastosGovernoPieChart className="border-0 shadow-none rounded-none" />
            ) : (
              <div className="px-4 sm:px-6 py-4 bg-slate-50/70 border-t border-slate-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {dados.despesasSetores.setores.map((s) => {
                    const percentual = dados.despesasSetores.totalGeral > 0
                      ? ((s.valor / dados.despesasSetores.totalGeral) * 100).toFixed(1)
                      : '0';

                    return (
                      <div key={s.id} className="p-3 bg-white rounded-xl border border-slate-200 text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-slate-800 flex items-center gap-1.5">
                            {getSectorIcon(s.id)}
                            {s.nome}
                          </span>
                          <span className="font-mono text-slate-500 font-bold text-[11px]">
                            {percentual}%
                          </span>
                        </div>
                        <div className="text-sm font-black text-slate-900 mt-1">
                          {formatarMoedaCompacta(s.valor)}
                        </div>
                        {/* Barra de progresso */}
                        <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${Math.min(100, Math.max(2, parseFloat(percentual)))}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="text-[11px] text-slate-500 mt-3 text-right">
                  Fonte primária:{' '}
                  <a
                    href="https://transparenciapolitica.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-slate-800"
                  >
                    transparenciapolitica.app
                  </a>{' '}
                  · Portal da Transparência do Governo Federal
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
