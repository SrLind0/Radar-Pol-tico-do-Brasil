import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  TrendingUp,
  Receipt,
  DollarSign,
  Calendar,
  Filter,
  Info,
  Check,
  ChevronDown,
  RotateCcw,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Scale,
  Sliders,
  Layers,
  AlertCircle
} from 'lucide-react';
import {
  SERIE_HISTORICA_IMPOSTOS_2000_2026,
  PontoSerieHistorica,
  formatarValorEscala,
  formatarValorEixoY,
} from '../data/serieHistoricaImpostosData';
import { formatarMoedaCompleta, formatarPercentual } from '../data/transparenciaData';

interface Props {
  className?: string;
  anoInicialPadrao?: number;
  anoFinalPadrao?: number;
  somenteImpostosPadrao?: boolean;
}

export const SerieHistoricaImpostosChart: React.FC<Props> = ({
  className = '',
  anoInicialPadrao = 2000,
  anoFinalPadrao = 2026,
  somenteImpostosPadrao = false,
}) => {
  // 1. ESTADO DE CONTROLE: Visão "Impostos Federais" vs. "Visão Geral"
  // Quando true: isola e exibe EXCLUSIVAMENTE a arrecadação de impostos federais
  // Quando false: exibe a visão padrão completa (impostos/receitas vs gastos totais)
  const [apenasImpostosFederais, setApenasImpostosFederais] = useState<boolean>(somenteImpostosPadrao);

  // 2. ESTADOS DE CONTROLE TEMPORAL: Intervalo entre 2000 e 2026
  const [anoInicial, setAnoInicial] = useState<number>(anoInicialPadrao);
  const [anoFinal, setAnoFinal] = useState<number>(anoFinalPadrao);

  // Ponto ativo sob o cursor (hover) ou selecionado por toque/clique
  const [pontoHover, setPontoHover] = useState<PontoSerieHistorica | null>(null);
  const [pontoFixado, setPontoFixado] = useState<PontoSerieHistorica | null>(null);

  // Referência do SVG para cálculo do cursor interativo
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Lista de todos os anos permitidos estritamente de 2000 a 2026
  const todosOsAnos = useMemo<number[]>(() => {
    const anos: number[] = [];
    for (let a = 2000; a <= 2026; a++) {
      anos.push(a);
    }
    return anos;
  }, []);

  // Atalhos pré-definidos recomendados
  const aplicarAtalhoTemporal = (inicio: number, fim: number) => {
    setAnoInicial(inicio);
    setAnoFinal(fim);
    setPontoHover(null);
    setPontoFixado(null);
  };

  // Filtragem dos dados de acordo com o intervalo selecionado
  const dadosFiltrados = useMemo<PontoSerieHistorica[]>(() => {
    if (anoInicial > anoFinal) {
      return [];
    }
    return SERIE_HISTORICA_IMPOSTOS_2000_2026.filter(
      (p) => p.ano >= anoInicial && p.ano <= anoFinal
    );
  }, [anoInicial, anoFinal]);

  // Cálculos dinâmicos dos limites do eixo Y (Min e Max recalculados dinamicamente)
  const limitesY = useMemo<{ min: number; max: number; ticks: number[] }>(() => {
    if (dadosFiltrados.length === 0) {
      return { min: 0, max: 1e12, ticks: [0, 5e11, 1e12] };
    }

    let valores: number[] = [];
    if (apenasImpostosFederais) {
      valores = dadosFiltrados.map((d) => d.impostosFederais);
    } else {
      valores = [
        ...dadosFiltrados.map((d) => d.impostosFederais),
        ...dadosFiltrados.map((d) => d.gastosPrimarios),
      ];
    }

    const valorMaximo = Math.max(...valores);
    const valorMinimo = Math.min(...valores);

    // Margem de segurança de 10% no topo e na base (ou base 0 para visualização proporcional)
    const baseMin = 0; // Iniciar em 0 para não distorcer a escala de grandeza orçamentária
    const topoMax = Math.ceil((valorMaximo * 1.12) / 5e11) * 5e11 || 3.5e12;

    // Gera 5 níveis de grade para o eixo Y
    const steps = 4;
    const ticks: number[] = [];
    for (let i = 0; i <= steps; i++) {
      ticks.push(baseMin + ((topoMax - baseMin) / steps) * i);
    }

    return { min: baseMin, max: topoMax, ticks };
  }, [dadosFiltrados, apenasImpostosFederais]);

  // Ponto atualmente em destaque (hover ou fixado ou o mais recente)
  const pontoAtivo = useMemo<PontoSerieHistorica | null>(() => {
    if (pontoHover) return pontoHover;
    if (pontoFixado) return pontoFixado;
    if (dadosFiltrados.length > 0) {
      return dadosFiltrados[dadosFiltrados.length - 1];
    }
    return null;
  }, [pontoHover, pontoFixado, dadosFiltrados]);

  // Dimensões do viewBox do gráfico SVG responsivo
  const svgWidth = 840;
  const svgHeight = 360;
  const padLeft = 82;
  const padRight = 36;
  const padTop = 32;
  const padBottom = 54;
  const chartWidth = svgWidth - padLeft - padRight;
  const chartHeight = svgHeight - padTop - padBottom;

  // Função para converter coordenadas de dados para pixels do SVG
  const getX = (index: number, total: number): number => {
    if (total <= 1) return padLeft + chartWidth / 2;
    return padLeft + (index / (total - 1)) * chartWidth;
  };

  const getY = (valor: number): number => {
    const range = limitesY.max - limitesY.min;
    if (range <= 0) return padTop + chartHeight / 2;
    const norm = (valor - limitesY.min) / range;
    return padTop + chartHeight - norm * chartHeight;
  };

  // Traçado vetorial dos caminhos SVG (linhas e áreas com transição suave)
  const { pathImpostos, pathAreaImpostos, pathGastos, pathAreaGastos, pontosMapeados } = useMemo(() => {
    if (dadosFiltrados.length === 0) {
      return {
        pathImpostos: '',
        pathAreaImpostos: '',
        pathGastos: '',
        pathAreaGastos: '',
        pontosMapeados: [],
      };
    }

    const n = dadosFiltrados.length;
    const pontos = dadosFiltrados.map((d, i) => {
      const x = getX(i, n);
      const yImp = getY(d.impostosFederais);
      const yGas = getY(d.gastosPrimarios);
      return { ...d, x, yImp, yGas };
    });

    // Construtor de caminho Bézier suave (spline cúbica relaxada)
    const buildSmoothPath = (pts: { x: number; y: number }[]) => {
      if (pts.length === 0) return '';
      if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;
      if (pts.length === 2) return `M ${pts[0].x} ${pts[0].y} L ${pts[1].x} ${pts[1].y}`;

      let path = `M ${pts[0].x} ${pts[0].y}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = i > 0 ? pts[i - 1] : pts[i];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = i < pts.length - 2 ? pts[i + 2] : p2;

        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;
        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;

        path += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
      }
      return path;
    };

    // Pontos para impostos
    const ptsImp = pontos.map((p) => ({ x: p.x, y: p.yImp }));
    const pImp = buildSmoothPath(ptsImp);
    const pAreaImp = `${pImp} L ${pontos[n - 1].x} ${padTop + chartHeight} L ${pontos[0].x} ${padTop + chartHeight} Z`;

    // Pontos para gastos
    const ptsGas = pontos.map((p) => ({ x: p.x, y: p.yGas }));
    const pGas = buildSmoothPath(ptsGas);
    const pAreaGas = `${pGas} L ${pontos[n - 1].x} ${padTop + chartHeight} L ${pontos[0].x} ${padTop + chartHeight} Z`;

    return {
      pathImpostos: pImp,
      pathAreaImpostos: pAreaImp,
      pathGastos: pGas,
      pathAreaGastos: pAreaGas,
      pontosMapeados: pontos,
    };
  }, [dadosFiltrados, limitesY]);

  // Estatísticas calculadas do intervalo selecionado
  const estatisticasIntervalo = useMemo(() => {
    if (dadosFiltrados.length === 0) return null;
    const totalImpostos = dadosFiltrados.reduce((acc, p) => acc + p.impostosFederais, 0);
    const mediaImpostos = totalImpostos / dadosFiltrados.length;
    const maiorPonto = [...dadosFiltrados].sort((a, b) => b.impostosFederais - a.impostosFederais)[0];
    const primeiroPonto = dadosFiltrados[0];
    const ultimoPonto = dadosFiltrados[dadosFiltrados.length - 1];
    const crescimentoPeriodo = primeiroPonto.impostosFederais > 0
      ? ((ultimoPonto.impostosFederais - primeiroPonto.impostosFederais) / primeiroPonto.impostosFederais) * 100
      : 0;

    return {
      totalImpostos,
      mediaImpostos,
      maiorPonto,
      primeiroPonto,
      ultimoPonto,
      crescimentoPeriodo,
    };
  }, [dadosFiltrados]);

  // Tratamento de movimento do cursor sobre o gráfico para snap no ponto mais próximo
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current || pontosMapeados.length === 0) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * svgWidth;

    // Encontra o ponto com menor distância horizontal no SVG
    let maisProximo = pontosMapeados[0];
    let menorDist = Math.abs(maisProximo.x - mouseX);

    for (let i = 1; i < pontosMapeados.length; i++) {
      const dist = Math.abs(pontosMapeados[i].x - mouseX);
      if (dist < menorDist) {
        menorDist = dist;
        maisProximo = pontosMapeados[i];
      }
    }

    setPontoHover(maisProximo);
  };

  const handleMouseLeave = () => {
    setPontoHover(null);
  };

  return (
    <div className={`bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden ${className}`}>
      
      {/* =========================================================================
          CABEÇALHO SUPERIOR: BOTÃO DE SELEÇÃO E CONTROLES PRINCIPAIS
          ========================================================================= */}
      <div className="p-4 sm:p-6 bg-slate-50/80 border-b border-slate-200">
        
        {/* Título & Badge Informativo */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className={`p-1.5 rounded-xl text-white shadow-xs transition-colors ${
                apenasImpostosFederais ? 'bg-emerald-600' : 'bg-blue-600'
              }`}>
                {apenasImpostosFederais ? <Receipt className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                {apenasImpostosFederais
                  ? 'Série Histórica · Arrecadação de Impostos Federais (2000 a 2026)'
                  : 'Série Histórica · Receitas vs. Gastos Públicos da União (2000 a 2026)'}
              </h3>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border transition-colors ${
                apenasImpostosFederais
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  : 'bg-blue-100 text-blue-900 border-blue-300'
              }`}>
                {apenasImpostosFederais ? 'Modo Exclusivo de Impostos' : 'Visão Geral Orçamentária'}
              </span>
            </div>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              {apenasImpostosFederais
                ? 'Exibição isolada da receita tributária federal arrecadada pela União (IR, PIS/Cofins, CSLL, IPI, IOF e contribuições federais), excluindo despesas e dados estaduais/municipais.'
                : 'Comparativo histórico entre a arrecadação tributária total e os gastos primários do Governo Central da Lei de Responsabilidade Fiscal até o exercício vigente.'}
            </p>
          </div>

          {/* 1. BOTÃO DE SELEÇÃO: VISÃO "IMPOSTOS FEDERAIS" vs. "VISÃO GERAL" (REQUISITO 1) */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-bold text-slate-700 select-none hidden sm:inline">
                Filtro de Visualização:
              </span>

              {/* Botão de Alternância / Toggle Switch Destacado com Cor Primária Acessível */}
              <button
                type="button"
                onClick={() => setApenasImpostosFederais(!apenasImpostosFederais)}
                className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl font-black text-xs transition-all cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                  apenasImpostosFederais
                    ? 'bg-emerald-600 text-white shadow-xs hover:bg-emerald-700'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                }`}
                role="switch"
                aria-checked={apenasImpostosFederais}
                title="Ativar/Desativar isolamento exclusivo de Impostos Federais"
              >
                {/* Switch Knob Visual */}
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-transform ${
                  apenasImpostosFederais ? 'bg-white border-emerald-700' : 'bg-slate-300 border-slate-400'
                }`}>
                  {apenasImpostosFederais && <Check className="w-2.5 h-2.5 text-emerald-700 stroke-[3]" />}
                </div>

                {/* Rótulo Exato do Botão Solicitado */}
                <span>Arrecadação de Impostos (Governo Federal)</span>
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. FILTRO DE INTERVALO TEMPORAL (ANOS 2000 A 2026) (REQUISITO 2)
            ========================================================================= */}
        <div className="mt-4 pt-3.5 border-t border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Controles de Período: Select Boxes "Ano Inicial" e "Ano Final" */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-bold">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span>Intervalo:</span>
            </div>

            {/* Select Box: Ano Inicial (2000 a 2026) */}
            <div className="relative">
              <label htmlFor="ano-inicial-select" className="sr-only">Ano Inicial</label>
              <select
                id="ano-inicial-select"
                value={anoInicial}
                onChange={(e) => {
                  const novoInicio = Number(e.target.value);
                  setAnoInicial(novoInicio);
                  if (novoInicio > anoFinal) {
                    setAnoFinal(novoInicio);
                  }
                  setPontoHover(null);
                }}
                className="appearance-none bg-white border border-slate-300 hover:border-blue-500 text-slate-800 text-xs font-bold py-1.5 pl-3 pr-7 rounded-xl shadow-2xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden cursor-pointer"
              >
                {todosOsAnos.map((ano) => (
                  <option key={`ini-${ano}`} value={ano}>
                    De: {ano}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
            </div>

            <span className="text-slate-400 text-xs font-bold">até</span>

            {/* Select Box: Ano Final (2000 a 2026) */}
            <div className="relative">
              <label htmlFor="ano-final-select" className="sr-only">Ano Final</label>
              <select
                id="ano-final-select"
                value={anoFinal}
                onChange={(e) => {
                  const novoFim = Number(e.target.value);
                  setAnoFinal(novoFim);
                  if (novoFim < anoInicial) {
                    setAnoInicial(novoFim);
                  }
                  setPontoHover(null);
                }}
                className="appearance-none bg-white border border-slate-300 hover:border-blue-500 text-slate-800 text-xs font-bold py-1.5 pl-3 pr-7 rounded-xl shadow-2xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden cursor-pointer"
              >
                {todosOsAnos.map((ano) => (
                  <option key={`fim-${ano}`} value={ano}>
                    Até: {ano}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
            </div>

            {/* Contador de Anos Selecionados */}
            <span className="text-[11px] font-bold text-slate-500 px-2 py-0.5 rounded-lg bg-slate-200/70">
              {dadosFiltrados.length} {dadosFiltrados.length === 1 ? 'ano' : 'anos'}
            </span>
          </div>

          {/* Opções Pré-definidas (Shortcuts) Recomendadas */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 mr-1 hidden sm:inline">
              Atalhos rápidos:
            </span>

            {/* Shortcut 1: Todos os Anos (2000 - 2026) */}
            <button
              type="button"
              onClick={() => aplicarAtalhoTemporal(2000, 2026)}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                anoInicial === 2000 && anoFinal === 2026
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              Todos (2000 - 2026)
            </button>

            {/* Shortcut 2: Últimos 10 anos (2016 - 2026) */}
            <button
              type="button"
              onClick={() => aplicarAtalhoTemporal(2016, 2026)}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                anoInicial === 2016 && anoFinal === 2026
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              Últimos 10 anos
            </button>

            {/* Shortcut 3: Últimos 5 anos (2021 - 2026) */}
            <button
              type="button"
              onClick={() => aplicarAtalhoTemporal(2021, 2026)}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                anoInicial === 2021 && anoFinal === 2026
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              Últimos 5 anos
            </button>

            {/* Botão de Redefinir */}
            {(anoInicial !== 2000 || anoFinal !== 2026) && (
              <button
                type="button"
                onClick={() => aplicarAtalhoTemporal(2000, 2026)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition cursor-pointer"
                title="Restaurar período completo (2000 a 2026)"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Barra de Range Slider Duplo para ajuste contínuo */}
        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
            Ajuste Fino (2000 - 2026):
          </span>
          <div className="flex-1 flex items-center gap-2">
            <input
              type="range"
              min={2000}
              max={2026}
              value={anoInicial}
              onChange={(e) => {
                const val = Number(e.target.value);
                setAnoInicial(Math.min(val, anoFinal));
                setPontoHover(null);
              }}
              className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
              title={`Ano Inicial: ${anoInicial}`}
            />
            <input
              type="range"
              min={2000}
              max={2026}
              value={anoFinal}
              onChange={(e) => {
                const val = Number(e.target.value);
                setAnoFinal(Math.max(val, anoInicial));
                setPontoHover(null);
              }}
              className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
              title={`Ano Final: ${anoFinal}`}
            />
          </div>
        </div>
      </div>

      {/* =========================================================================
          PAINEL DE KPIS / ESTATÍSTICAS DO PERÍODO SELECIONADO
          ========================================================================= */}
      {estatisticasIntervalo && (
        <div className="p-4 sm:px-6 py-3 bg-slate-50/40 border-b border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          
          {/* Card 1: Total do Período */}
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              {apenasImpostosFederais ? 'Total Arrecadado no Intervalo' : 'Arrecadação Federal no Intervalo'}
            </span>
            <span className="text-sm sm:text-base font-black text-slate-900 block mt-0.5">
              {formatarValorEscala(estatisticasIntervalo.totalImpostos)}
            </span>
            <span className="text-[10px] text-slate-500 block">
              Soma de {dadosFiltrados.length} anos
            </span>
          </div>

          {/* Card 2: Média Anual */}
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Média Anual de Impostos
            </span>
            <span className="text-sm sm:text-base font-black text-emerald-700 block mt-0.5">
              {formatarValorEscala(estatisticasIntervalo.mediaImpostos)}
            </span>
            <span className="text-[10px] text-slate-500 block">
              Por ano fiscal selecionado
            </span>
          </div>

          {/* Card 3: Crescimento Nominal */}
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Variação {anoInicial} → {anoFinal}
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              {estatisticasIntervalo.crescimentoPeriodo >= 0 ? (
                <span className="inline-flex items-center text-emerald-600 font-black text-sm sm:text-base">
                  <ArrowUpRight className="w-4 h-4" />
                  +{estatisticasIntervalo.crescimentoPeriodo.toFixed(1)}%
                </span>
              ) : (
                <span className="inline-flex items-center text-red-600 font-black text-sm sm:text-base">
                  <ArrowDownRight className="w-4 h-4" />
                  {estatisticasIntervalo.crescimentoPeriodo.toFixed(1)}%
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-500 block">
              Crescimento nominal de arrecadação
            </span>
          </div>

          {/* Card 4: Pico Máximo */}
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Maior Arrecadação ({estatisticasIntervalo.maiorPonto.ano})
            </span>
            <span className="text-sm sm:text-base font-black text-slate-900 block mt-0.5">
              {formatarValorEscala(estatisticasIntervalo.maiorPonto.impostosFederais)}
            </span>
            <span className="text-[10px] text-slate-500 block">
              Ano de arrecadação recorde
            </span>
          </div>
        </div>
      )}

      {/* =========================================================================
          ÁREA DO GRÁFICO SVG INTERATIVO OU ESTADO SEM DADOS (REQUISITO 3)
          ========================================================================= */}
      <div className="p-4 sm:p-6 relative">
        
        {/* Caso sem dados / intervalo vazio */}
        {dadosFiltrados.length === 0 ? (
          <div className="py-16 px-4 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-800">
              Nenhum registro encontrado para o intervalo selecionado
            </h4>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              O ano inicial ({anoInicial}) não pode ser superior ao ano final ({anoFinal}). Ajuste os seletores temporais.
            </p>
            <button
              type="button"
              onClick={() => aplicarAtalhoTemporal(2000, 2026)}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-blue-700 transition cursor-pointer"
            >
              Restaurar Período Completo (2000 a 2026)
            </button>
          </div>
        ) : (
          <div>
            {/* SVG Responsivo com transição de eixos dinâmica */}
            <div className="w-full relative overflow-hidden select-none">
              <svg
                ref={svgRef}
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full h-auto drop-shadow-xs"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <defs>
                  {/* Gradiente para Impostos Federais */}
                  <linearGradient id="gradImpostos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#059669" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#059669" stopOpacity="0.02" />
                  </linearGradient>

                  {/* Gradiente para Gastos Primários */}
                  <linearGradient id="gradGastos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.30" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                {/* Grade Horizontal (Linhas de valor do Eixo Y) */}
                <g className="grid-lines opacity-60">
                  {limitesY.ticks.map((tick, i) => {
                    const y = getY(tick);
                    return (
                      <g key={`tick-${i}`}>
                        <line
                          x1={padLeft}
                          y1={y}
                          x2={svgWidth - padRight}
                          y2={y}
                          stroke="#e2e8f0"
                          strokeDasharray="4 4"
                          strokeWidth="1"
                        />
                        {/* Rótulos do Eixo Y em Bilhões / Trilhões */}
                        <text
                          x={padLeft - 10}
                          y={y + 4}
                          textAnchor="end"
                          className="text-[10px] font-mono font-bold fill-slate-400"
                        >
                          {formatarValorEixoY(tick)}
                        </text>
                      </g>
                    );
                  })}
                </g>

                {/* Eixo X: Linha base */}
                <line
                  x1={padLeft}
                  y1={padTop + chartHeight}
                  x2={svgWidth - padRight}
                  y2={padTop + chartHeight}
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                />

                {/* ÁREA E LINHA: GASTOS PÚBLICOS (Visível apenas se NÃO estiver em modo isolado) */}
                {!apenasImpostosFederais && (
                  <g className="transition-all duration-300">
                    <path d={pathAreaGastos} fill="url(#gradGastos)" />
                    <path
                      d={pathGastos}
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                )}

                {/* ÁREA E LINHA: ARRECADAÇÃO DE IMPOSTOS FEDERAIS (Sempre visível, em destaque verde) */}
                <g className="transition-all duration-300">
                  <path d={pathAreaImpostos} fill="url(#gradImpostos)" />
                  <path
                    d={pathImpostos}
                    fill="none"
                    stroke="#059669"
                    strokeWidth={apenasImpostosFederais ? '3.5' : '3'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* Rótulos do Eixo X (Anos) */}
                <g className="axis-x-labels">
                  {pontosMapeados.map((p, i) => {
                    // Se houver muitos pontos, espaça os anos para não poluir
                    const totalPontos = pontosMapeados.length;
                    const deveExibir =
                      totalPontos <= 12
                        ? true
                        : totalPontos <= 18
                        ? i % 2 === 0 || i === totalPontos - 1
                        : i % 3 === 0 || i === totalPontos - 1 || i === 0;

                    if (!deveExibir) return null;

                    const isHover = pontoAtivo?.ano === p.ano;

                    return (
                      <g key={`label-x-${p.ano}`}>
                        <line
                          x1={p.x}
                          y1={padTop + chartHeight}
                          x2={p.x}
                          y2={padTop + chartHeight + 4}
                          stroke="#94a3b8"
                          strokeWidth="1"
                        />
                        <text
                          x={p.x}
                          y={padTop + chartHeight + 18}
                          textAnchor="middle"
                          className={`text-[11px] font-bold transition-all ${
                            isHover ? 'fill-slate-900 font-black' : 'fill-slate-500'
                          }`}
                        >
                          {p.ano}
                        </text>
                      </g>
                    );
                  })}
                </g>

                {/* Cursor Vertical (Crosshair) no ano ativo */}
                {pontoAtivo && (
                  <g className="cursor-crosshair pointer-events-none">
                    {(() => {
                      const match = pontosMapeados.find((p) => p.ano === pontoAtivo.ano);
                      if (!match) return null;
                      return (
                        <>
                          <line
                            x1={match.x}
                            y1={padTop}
                            x2={match.x}
                            y2={padTop + chartHeight}
                            stroke="#0f172a"
                            strokeWidth="1.5"
                            strokeDasharray="3 3"
                            opacity="0.5"
                          />
                          {/* Ponto indicador de Impostos */}
                          <circle
                            cx={match.x}
                            cy={match.yImp}
                            r={apenasImpostosFederais ? 6 : 5}
                            fill="#059669"
                            stroke="#ffffff"
                            strokeWidth="2.5"
                            className="drop-shadow-xs"
                          />
                          {/* Ponto indicador de Gastos se em modo geral */}
                          {!apenasImpostosFederais && (
                            <circle
                              cx={match.x}
                              cy={match.yGas}
                              r={5}
                              fill="#2563eb"
                              stroke="#ffffff"
                              strokeWidth="2.5"
                              className="drop-shadow-xs"
                            />
                          )}
                        </>
                      );
                    })()}
                  </g>
                )}

                {/* Pontos Clicáveis Interativos */}
                <g className="interactive-points">
                  {pontosMapeados.map((p) => {
                    const isAtivo = pontoAtivo?.ano === p.ano;
                    return (
                      <g
                        key={`point-${p.ano}`}
                        className="cursor-pointer"
                        onClick={() => setPontoFixado(pontoFixado?.ano === p.ano ? null : p)}
                      >
                        {/* Círculo invisível ampliado para facilitar hover/toque em mobile */}
                        <circle cx={p.x} cy={p.yImp} r={16} fill="transparent" />

                        {/* Marcador de Impostos */}
                        <circle
                          cx={p.x}
                          cy={p.yImp}
                          r={isAtivo ? 5.5 : 3}
                          fill={isAtivo ? '#059669' : '#10b981'}
                          stroke="#ffffff"
                          strokeWidth={isAtivo ? '2' : '1.5'}
                          className="transition-transform duration-150"
                        />
                      </g>
                    );
                  })}
                </g>
              </svg>
            </div>

            {/* Dica de Interatividade */}
            <div className="mt-2 text-center">
              <span className="text-[11px] text-slate-500 inline-flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Passe o cursor sobre os pontos ou anos do gráfico para inspecionar os valores e variações
              </span>
            </div>
          </div>
        )}

        {/* =========================================================================
            TOOLTIP INTERATIVO RICO (REQUISITO 3.1)
            ========================================================================= */}
        {pontoAtivo && dadosFiltrados.length > 0 && (
          <div className="mt-4 p-4 rounded-2xl bg-slate-900 text-white shadow-xl border border-slate-800 transition-all animate-in fade-in zoom-in-98 duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              
              {/* Identificação do Ano e Status */}
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-xl ${
                  apenasImpostosFederais ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'
                }`}>
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg font-black text-white">
                      Ano {pontoAtivo.ano}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {pontoAtivo.status}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {pontoAtivo.titulo}
                  </span>
                </div>
              </div>

              {/* Variação Anual */}
              {pontoAtivo.variacaoAnterior !== undefined && (
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-400">Variação anual:</span>
                  {pontoAtivo.variacaoAnterior >= 0 ? (
                    <span className="inline-flex items-center text-emerald-400 font-bold text-xs bg-emerald-500/20 px-2 py-0.5 rounded-lg border border-emerald-500/30">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      +{pontoAtivo.variacaoAnterior.toFixed(1)}% vs. ano anterior
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-rose-400 font-bold text-xs bg-rose-500/20 px-2 py-0.5 rounded-lg border border-rose-500/30">
                      <ArrowDownRight className="w-3.5 h-3.5" />
                      {pontoAtivo.variacaoAnterior.toFixed(1)}% vs. ano anterior
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Grid de Valores Formatados em Moeda Brasileira */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
              
              {/* Valor 1: Arrecadação de Impostos Federais */}
              <div className={`p-3 rounded-xl border ${
                apenasImpostosFederais
                  ? 'bg-emerald-950/40 border-emerald-800/80 sm:col-span-3'
                  : 'bg-slate-800/60 border-slate-700'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider flex items-center gap-1">
                    <Receipt className="w-3 h-3" />
                    Arrecadação de Impostos (Governo Federal)
                  </span>
                  <span className="text-[10px] text-emerald-300 font-bold bg-emerald-900/60 px-1.5 py-0.2 rounded">
                    Receita Federal
                  </span>
                </div>
                <div className="text-lg sm:text-xl font-black text-white mt-1">
                  {formatarValorEscala(pontoAtivo.impostosFederais)}
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                  Exato: {formatarMoedaCompleta(pontoAtivo.impostosFederais)}
                </div>
              </div>

              {/* Se Visão Geral Completa: Exibir Gastos Primários e Saldo */}
              {!apenasImpostosFederais && (
                <>
                  {/* Valor 2: Gastos Primários */}
                  <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                    <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      Gastos Primários da União (Despesas)
                    </span>
                    <div className="text-lg sm:text-xl font-black text-white mt-1">
                      {formatarValorEscala(pontoAtivo.gastosPrimarios)}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      Exato: {formatarMoedaCompleta(pontoAtivo.gastosPrimarios)}
                    </div>
                  </div>

                  {/* Valor 3: Balanço Arrecadação vs Despesa */}
                  <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                    <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider flex items-center gap-1">
                      <Scale className="w-3 h-3" />
                      Balanço Arrecadação vs. Despesas
                    </span>
                    <div className={`text-lg sm:text-xl font-black mt-1 ${
                      pontoAtivo.balancoArrecadacaoDespesa >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {pontoAtivo.balancoArrecadacaoDespesa >= 0 ? '+' : ''}
                      {formatarValorEscala(pontoAtivo.balancoArrecadacaoDespesa)}
                    </div>
                    <span className="text-[10px] text-slate-400">
                      {pontoAtivo.balancoArrecadacaoDespesa >= 0 ? 'Arrecadação Superior aos Gastos' : 'Gastos Superiores à Arrecadação'}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Contexto Factual do Ano */}
            {pontoAtivo.descricao && (
              <p className="text-xs text-slate-300 mt-3 pt-2.5 border-t border-slate-800 leading-relaxed">
                <strong className="text-white">Contexto fiscal de {pontoAtivo.ano}: </strong>
                {pontoAtivo.descricao}
              </p>
            )}
          </div>
        )}

        {/* =========================================================================
            2. LEGENDA DINÂMICA (REQUISITO 3.2)
            ========================================================================= */}
        <div className="mt-4 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Legenda do Gráfico:
            </span>

            {/* Item 1: Impostos Federais (Sempre presente) */}
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 shadow-2xs border-2 border-white ring-1 ring-emerald-600" />
              <span className="font-black text-slate-800">
                Arrecadação de Impostos (Governo Federal)
              </span>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                {apenasImpostosFederais ? 'Série Isolada' : 'Receita Tributária'}
              </span>
            </div>

            {/* Item 2: Gastos Primários (Aparece somente na Visão Geral) */}
            {!apenasImpostosFederais ? (
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-blue-600 shadow-2xs border-2 border-white ring-1 ring-blue-600" />
                <span className="font-bold text-slate-700">
                  Gastos Primários da União (Despesas Centrais)
                </span>
                <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-md">
                  Tesouro Nacional
                </span>
              </div>
            ) : (
              <span className="text-[11px] text-slate-400 italic">
                * Outras despesas orçamentárias ocultadas pelo filtro ativo
              </span>
            )}
          </div>

          {/* Fonte Oficial */}
          <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-blue-600" />
            <span>Fonte: Secretaria da Receita Federal · Tesouro Nacional · Siafi</span>
          </div>
        </div>
      </div>
    </div>
  );
};
