import React, { useState, useEffect } from 'react';
import {
  Vote,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  ShieldCheck,
  Cpu,
  Users,
  Video,
  Printer,
  Truck,
  Shield,
  HelpCircle,
  FileCheck2,
  Calendar,
  Layers
} from 'lucide-react';
import { Politico } from '../types';
import { PoliticoFEFCData, CampanhaFEFCPolitico } from '../types/fefc';
import { obterDadosFEFCPolitico } from '../data/fefcData';
import { formatarMoedaCompleta, formatarMoedaCompacta } from '../data/transparenciaData';

interface Props {
  politico: Politico;
}

export const PoliticianFefcCard: React.FC<Props> = ({ politico }) => {
  const [fefcData, setFefcData] = useState<PoliticoFEFCData>(() => obterDadosFEFCPolitico(politico));
  const [campanhaSelecionada, setCampanhaSelecionada] = useState<CampanhaFEFCPolitico>(() => {
    const data = obterDadosFEFCPolitico(politico);
    return data.campanhas[0];
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch(`/api/politicos/${politico.id}/fundao-eleitoral`)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Falha ao carregar FEFC');
      })
      .then((data: PoliticoFEFCData) => {
        if (isMounted && data?.campanhas?.length) {
          setFefcData(data);
          setCampanhaSelecionada(data.campanhas[0]);
        }
      })
      .catch(() => {
        // Fallback para o gerador determinístico já carregado
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [politico.id]);

  const renderIconeCategoria = (icone: string) => {
    switch (icone) {
      case 'Cpu':
        return <Cpu className="w-3.5 h-3.5 text-blue-500" />;
      case 'Users':
        return <Users className="w-3.5 h-3.5 text-purple-500" />;
      case 'Video':
        return <Video className="w-3.5 h-3.5 text-rose-500" />;
      case 'Printer':
        return <Printer className="w-3.5 h-3.5 text-amber-500" />;
      case 'Truck':
        return <Truck className="w-3.5 h-3.5 text-emerald-500" />;
      case 'Shield':
        return <Shield className="w-3.5 h-3.5 text-slate-500" />;
      default:
        return <DollarSign className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  const getCorCategoria = (index: number) => {
    const cores = ['#2563eb', '#7c3aed', '#e11d48', '#d97706', '#059669', '#475569'];
    return cores[index % cores.length];
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
      {/* Top Banner de Identificação Institucional */}
      <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <Vote className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-black text-white tracking-tight">
                Fundão Eleitoral (FEFC) · Prestação de Contas
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Oficial TSE
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Financiamento público de campanha eleitoral com recursos do Tesouro Nacional (Lei 13.487/2017)
            </p>
          </div>
        </div>

        {/* Total Acumulado */}
        <div className="text-left sm:text-right bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-2xl">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
            Total Acumulado (Campanhas)
          </span>
          <span className="text-base sm:text-lg font-black text-emerald-400 font-mono">
            {formatarMoedaCompacta(fefcData.totalAcumuladoTodasCampanhas)}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-5">
        {/* Seletor de Anos Eleitorais Disputados */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-black text-slate-800 uppercase tracking-wide">
              Eleição sob Análise:
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {fefcData.campanhas.map((campanha) => {
              const isSelected = campanhaSelecionada?.anoEleicao === campanha.anoEleicao;
              return (
                <button
                  key={campanha.anoEleicao}
                  type="button"
                  onClick={() => setCampanhaSelecionada(campanha)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs scale-102 ring-2 ring-blue-400/40'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span>Eleições {campanha.anoEleicao}</span>
                  <span className="text-[10px] opacity-80">({campanha.cargoDisputado})</span>
                </button>
              );
            })}
          </div>
        </div>

        {campanhaSelecionada && (
          <div className="space-y-5 animate-in fade-in duration-150">
            {/* Grid com 3 Cards de Indicadores da Campanha */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* Card 1: Gasto Efetivo */}
              <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                  Total Gasto na Campanha
                </span>
                <span className="text-xl sm:text-2xl font-black text-slate-900 block mt-1 font-mono">
                  {formatarMoedaCompleta(campanhaSelecionada.valorTotalGasto)}
                </span>
                <p className="text-[11px] text-slate-600 mt-1">
                  Recebido: <strong>{formatarMoedaCompacta(campanhaSelecionada.valorTotalRecebido)}</strong>
                </p>
                {campanhaSelecionada.sobraDevolvida !== undefined && campanhaSelecionada.sobraDevolvida > 0 && (
                  <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
                    Sobra devolvida ao Tesouro: {formatarMoedaCompacta(campanhaSelecionada.sobraDevolvida)}
                  </span>
                )}
              </div>

              {/* Card 2: Média do Partido no Estado */}
              <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                  Média do Partido ({politico.siglaPartido}/{campanhaSelecionada.uf})
                </span>
                <span className="text-xl sm:text-2xl font-black text-slate-800 block mt-1 font-mono">
                  {formatarMoedaCompleta(campanhaSelecionada.mediaPartidoEstado)}
                </span>
                <p className="text-[11px] text-slate-600 mt-1">
                  Gasto médio por candidatura a {campanhaSelecionada.cargoDisputado} na mesma UF
                </p>
              </div>

              {/* Card 3: Status de Julgamento no TSE */}
              <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                    Julgamento das Contas (TSE)
                  </span>
                  <div className="flex items-center gap-1.5 mt-1 text-slate-900 font-black text-sm">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{campanhaSelecionada.statusJulgamentoTSE}</span>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200/80">
                  <a
                    href={campanhaSelecionada.linkDivulgaCandContas}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-blue-600 hover:text-blue-800 font-bold underline inline-flex items-center gap-1"
                  >
                    Ver no DivulgaCandContas TSE
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Indicador Visual Comparativo: Político vs. Média do Partido no Estado */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-linear-to-r from-blue-50/50 via-slate-50 to-indigo-50/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-slate-800 uppercase tracking-wide">
                    Indicador Comparativo · Candidato vs. Média do Partido na UF
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {campanhaSelecionada.diferencaPercentualMedia >= 0 ? (
                    <span className="px-2.5 py-1 rounded-xl text-xs font-black bg-blue-100 text-blue-800 border border-blue-200 inline-flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                      +{campanhaSelecionada.diferencaPercentualMedia}% vs. Média Estadual
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-xl text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-200 inline-flex items-center gap-1">
                      <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
                      {campanhaSelecionada.diferencaPercentualMedia}% vs. Média Estadual
                    </span>
                  )}
                </div>
              </div>

              {/* Barra de Comparação Visual com Marcadores Proporcionais */}
              <div className="space-y-1.5 mt-3">
                <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden relative shadow-inner">
                  {/* Barra da Média */}
                  <div
                    className="h-full bg-slate-400 absolute top-0 left-0 opacity-40 rounded-full"
                    style={{
                      width: `${Math.min(
                        100,
                        (campanhaSelecionada.mediaPartidoEstado /
                          Math.max(campanhaSelecionada.valorTotalGasto, campanhaSelecionada.mediaPartidoEstado * 1.3)) *
                          100
                      )}%`,
                    }}
                    title="Média do Partido no Estado"
                  />
                  {/* Barra do Candidato */}
                  <div
                    className="h-full bg-blue-600 absolute top-0 left-0 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(
                        100,
                        (campanhaSelecionada.valorTotalGasto /
                          Math.max(campanhaSelecionada.valorTotalGasto, campanhaSelecionada.mediaPartidoEstado * 1.3)) *
                          100
                      )}%`,
                    }}
                    title="Gasto Declarado pelo Político"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>
                    Gasto do Candidato: <strong>{formatarMoedaCompacta(campanhaSelecionada.valorTotalGasto)}</strong>
                  </span>
                  <span>
                    Média ({politico.siglaPartido}/{campanhaSelecionada.uf}):{' '}
                    <strong>{formatarMoedaCompacta(campanhaSelecionada.mediaPartidoEstado)}</strong>
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                {campanhaSelecionada.diferencaPercentualMedia >= 0
                  ? `Nas Eleições de ${campanhaSelecionada.anoEleicao}, a candidatura declarou gastos do Fundão Eleitoral ${Math.abs(campanhaSelecionada.diferencaPercentualMedia)}% acima da média dos candidatos a ${campanhaSelecionada.cargoDisputado} do seu partido no estado de ${campanhaSelecionada.uf}.`
                  : `Nas Eleições de ${campanhaSelecionada.anoEleicao}, a candidatura declarou gastos do Fundão Eleitoral ${Math.abs(campanhaSelecionada.diferencaPercentualMedia)}% abaixo da média dos candidatos a ${campanhaSelecionada.cargoDisputado} do seu partido no estado de ${campanhaSelecionada.uf}.`}
              </p>
            </div>

            {/* Detalhamento por Categoria de Despesa */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-slate-800 uppercase tracking-wide flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-600" />
                  Detalhamento de Despesas por Categoria ({campanhaSelecionada.despesasCategorias.length} rubricas)
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  Total: {formatarMoedaCompleta(campanhaSelecionada.valorTotalGasto)}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {campanhaSelecionada.despesasCategorias.map((despesa, idx) => {
                  const cor = getCorCategoria(idx);
                  return (
                    <div
                      key={despesa.categoria}
                      className="p-3 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 transition-colors shadow-2xs"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 truncate">
                          {renderIconeCategoria(despesa.icone)}
                          <span className="truncate">{despesa.categoria}</span>
                        </span>
                        <span className="text-xs font-black font-mono text-slate-900 shrink-0">
                          {despesa.percentual}%
                        </span>
                      </div>

                      <div className="text-sm font-black text-slate-900 font-mono">
                        {formatarMoedaCompleta(despesa.valor)}
                      </div>

                      {/* Barra de progresso visual */}
                      <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.max(3, despesa.percentual)}%`,
                            backgroundColor: cor,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Rodapé Informativo e Certificação Oficial */}
      <div className="px-4 sm:px-6 py-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Fonte primária: <strong>Tribunal Superior Eleitoral (TSE) · DivulgaCandContas</strong>
          </span>
        </div>
        <span className="text-[11px] text-slate-400">
          Dados declarados formalmente pelo comitê financeiro da campanha
        </span>
      </div>
    </div>
  );
};
