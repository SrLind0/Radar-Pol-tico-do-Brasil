import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  PieChart as PieChartIcon,
  Calendar,
  Info,
  DollarSign,
  Users,
  Building2,
  TrendingUp,
  HeartHandshake,
  Heart,
  GraduationCap,
  Shield,
  Truck,
  Cpu,
  Lock,
  Leaf,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Check,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  Compass,
  Sliders,
  Box,
  Vote,
  Scale,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';
import {
  GASTOS_GOVERNO_HISTORICO,
  ANOS_DISPONIVEIS_GASTOS,
  CategoriaGastoGoverno,
  GastosAnoGoverno,
  formatarMoedaCompacta,
  formatarMoedaCompleta,
  formatarPercentual,
} from '../data/transparenciaData';
import {
  HISTORICO_FEFC_NACIONAL,
  ANOS_ELEITORAIS_FEFC,
} from '../data/fefcData';
import { HistoricoFEFCNacionalAno } from '../types/fefc';
import { ThreePieChartCanvas } from './ThreePieChartCanvas';

interface Props {
  className?: string;
  anoInicial?: number;
}

export const GastosGovernoPieChart: React.FC<Props> = ({
  className = '',
  anoInicial = 2026,
}) => {
  // Métrica Selecionada: Orçamento Geral da União OU Fundão Eleitoral (FEFC)
  const [metricaSelecionada, setMetricaSelecionada] = useState<'orcamento' | 'fefc'>('orcamento');

  // Estados de Ano
  const [anoSelecionado, setAnoSelecionado] = useState<number>(anoInicial);
  const [anoFEFCSelecionado, setAnoFEFCSelecionado] = useState<number>(2026);
  
  // Controle de Dropdown de Anos
  const [isDropdownAnoAberto, setIsDropdownAnoAberto] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Seleção e Hover de Fatias
  const [categoriaHoverId, setCategoriaHoverId] = useState<string | null>(null);
  const [categoriaFixadaId, setCategoriaFixadaId] = useState<string | null>(null);

  // Configurações Padrão Conforme Solicitação:
  // - Ângulo 3D (perspectiva)
  // - Giro pausado (autoRotate3D = false)
  // - Formato Pizza ('pizza')
  const [tipoGrafico, setTipoGrafico] = useState<'rosca' | 'pizza'>('pizza');
  const [modoRender, setModoRender] = useState<'3d' | '2d'>('3d');
  const [autoRotate3D, setAutoRotate3D] = useState<boolean>(false);
  const [explosao3D, setExplosao3D] = useState<number>(0.15);
  const [cameraPreset, setCameraPreset] = useState<'perspectiva' | 'topo' | 'frente'>('perspectiva');

  // Filtro de Década para o Dropdown do Orçamento Geral
  const [filtroDecada, setFiltroDecada] = useState<'todos' | '2020s' | '2010s' | '2000s'>('todos');

  // Player Automático (Linha do Tempo)
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const playIntervalRef = useRef<number | null>(null);

  // Maior valor histórico do FEFC para cálculo dinâmico da escala relativa das barras
  const maxValorFEFC = useMemo(
    () => Math.max(...ANOS_ELEITORAIS_FEFC.map((ano) => HISTORICO_FEFC_NACIONAL[ano]?.totalGeral || 0)),
    []
  );

  // Dados do FEFC do ano eleitoral selecionado
  const dadosFEFC: HistoricoFEFCNacionalAno = useMemo(() => {
    return HISTORICO_FEFC_NACIONAL[anoFEFCSelecionado] || HISTORICO_FEFC_NACIONAL[2026];
  }, [anoFEFCSelecionado]);

  // Conversão dos partidos do FEFC para o formato do Gráfico 3D/2D
  const categoriasFEFC: CategoriaGastoGoverno[] = useMemo(() => {
    return dadosFEFC.rankingPartidos.map((p) => ({
      id: p.sigla,
      nome: `${p.sigla} · ${p.nome}`,
      valor: p.valor,
      cor: p.cor,
      icone: 'Vote',
      descricao: `Cota oficial do partido ${p.nome} (${p.sigla}) no valor de ${formatarMoedaCompleta(p.valor)} (${p.percentualDoFundo.toFixed(2)}% do total do FEFC). Calculada pelo TSE segundo a representatividade da bancada eleita no Congresso Nacional (art. 16-D da Lei nº 9.504/1997).`,
    }));
  }, [dadosFEFC]);

  // Anos de orçamento filtrados pela década selecionada
  const anosFiltradosOrcamento = useMemo(() => {
    switch (filtroDecada) {
      case '2020s':
        return ANOS_DISPONIVEIS_GASTOS.filter((a) => a >= 2020);
      case '2010s':
        return ANOS_DISPONIVEIS_GASTOS.filter((a) => a >= 2010 && a < 2020);
      case '2000s':
        return ANOS_DISPONIVEIS_GASTOS.filter((a) => a >= 2000 && a < 2010);
      default:
        return ANOS_DISPONIVEIS_GASTOS;
    }
  }, [filtroDecada]);

  // Dados do ano selecionado para o Orçamento Geral
  const dadosAnoOrcamento: GastosAnoGoverno = useMemo(() => {
    return GASTOS_GOVERNO_HISTORICO[anoSelecionado] || GASTOS_GOVERNO_HISTORICO[2026];
  }, [anoSelecionado]);

  // Categorias ativas a serem renderizadas de acordo com a métrica selecionada
  const categoriasAtuais = useMemo<CategoriaGastoGoverno[]>(() => {
    return metricaSelecionada === 'fefc' ? categoriasFEFC : dadosAnoOrcamento.categorias;
  }, [metricaSelecionada, categoriasFEFC, dadosAnoOrcamento]);

  const totalGeralAtual = useMemo<number>(() => {
    return metricaSelecionada === 'fefc' ? dadosFEFC.totalGeral : dadosAnoOrcamento.totalGeral;
  }, [metricaSelecionada, dadosFEFC, dadosAnoOrcamento]);

  // Categoria ativa (hover ou fixada, ou a de maior valor)
  const categoriaAtiva = useMemo<CategoriaGastoGoverno>(() => {
    const idAtivo = categoriaHoverId || categoriaFixadaId;
    if (idAtivo) {
      const encontrada = categoriasAtuais.find((c) => c.id === idAtivo);
      if (encontrada) return encontrada;
    }
    return [...categoriasAtuais].sort((a, b) => b.valor - a.valor)[0] || categoriasAtuais[0];
  }, [categoriaHoverId, categoriaFixadaId, categoriasAtuais]);

  // Efeito do Player Histórico (avança os anos)
  useEffect(() => {
    if (isPlaying) {
      playIntervalRef.current = window.setInterval(() => {
        if (metricaSelecionada === 'fefc') {
          setAnoFEFCSelecionado((anoAtual) => {
            const index = ANOS_ELEITORAIS_FEFC.indexOf(anoAtual);
            if (index <= 0) return ANOS_ELEITORAIS_FEFC[ANOS_ELEITORAIS_FEFC.length - 1];
            return ANOS_ELEITORAIS_FEFC[index - 1];
          });
        } else {
          setAnoSelecionado((anoAtual) => {
            if (anoAtual >= 2026) return 2000;
            return anoAtual + 1;
          });
        }
      }, 2000);
    } else {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
        playIntervalRef.current = null;
      }
    }

    return () => {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
    };
  }, [isPlaying, metricaSelecionada]);

  // Fechar dropdown de anos ao clicar fora ou pressionar Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownAnoAberto(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownAnoAberto(false);
      }
    };

    if (isDropdownAnoAberto) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDropdownAnoAberto]);

  // Resetar seleções de fatia ao mudar de métrica ou ano
  const trocarMetrica = (nova: 'orcamento' | 'fefc') => {
    setMetricaSelecionada(nova);
    setCategoriaHoverId(null);
    setCategoriaFixadaId(null);
    setIsDropdownAnoAberto(false);
  };

  // Arcos para modo 2D SVG
  const arcos2D = useMemo(() => {
    const total = totalGeralAtual;
    let anguloAcumulado = -Math.PI / 2;
    const cx = 160;
    const cy = 160;
    const raioExterno = 135;
    const raioInterno = tipoGrafico === 'rosca' ? 78 : 0;

    return categoriasAtuais.map((cat) => {
      const percentual = total > 0 ? cat.valor / total : 0;
      const anguloDelta = percentual * 2 * Math.PI;
      const anguloInicio = anguloAcumulado;
      const anguloFim = anguloAcumulado + anguloDelta;
      anguloAcumulado += anguloDelta;
      const anguloMeio = anguloInicio + anguloDelta / 2;

      const x1 = cx + raioExterno * Math.cos(anguloInicio);
      const y1 = cy + raioExterno * Math.sin(anguloInicio);
      const x2 = cx + raioExterno * Math.cos(anguloFim);
      const y2 = cy + raioExterno * Math.sin(anguloFim);
      const largeArc = anguloDelta > Math.PI ? 1 : 0;

      let d = '';
      if (raioInterno === 0) {
        d = `M ${cx} ${cy} L ${x1} ${y1} A ${raioExterno} ${raioExterno} 0 ${largeArc} 1 ${x2} ${y2} Z`;
      } else {
        const x3 = cx + raioInterno * Math.cos(anguloFim);
        const y3 = cy + raioInterno * Math.sin(anguloFim);
        const x4 = cx + raioInterno * Math.cos(anguloInicio);
        const y4 = cy + raioInterno * Math.sin(anguloInicio);
        d = `M ${x1} ${y1} A ${raioExterno} ${raioExterno} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${raioInterno} ${raioInterno} 0 ${largeArc} 0 ${x4} ${y4} Z`;
      }

      const isHovered = (categoriaHoverId || categoriaFixadaId) === cat.id;
      const deslocamento = isHovered ? 6 : 0;
      const dx = deslocamento * Math.cos(anguloMeio);
      const dy = deslocamento * Math.sin(anguloMeio);

      return {
        ...cat,
        percentual,
        cor: cat.cor,
        pathD: d,
        transform: `translate(${dx.toFixed(2)}, ${dy.toFixed(2)})`,
        isHovered,
      };
    });
  }, [categoriasAtuais, totalGeralAtual, tipoGrafico, categoriaHoverId, categoriaFixadaId]);

  const renderIcone = (iconeNome: string, classe: string = 'w-4 h-4') => {
    switch (iconeNome) {
      case 'Vote':
        return <Vote className={classe} />;
      case 'HeartHandshake':
        return <HeartHandshake className={classe} />;
      case 'Users':
        return <Users className={classe} />;
      case 'Heart':
        return <Heart className={classe} />;
      case 'GraduationCap':
        return <GraduationCap className={classe} />;
      case 'Shield':
        return <Shield className={classe} />;
      case 'Truck':
        return <Truck className={classe} />;
      case 'Cpu':
        return <Cpu className={classe} />;
      case 'Lock':
        return <Lock className={classe} />;
      case 'Leaf':
        return <Leaf className={classe} />;
      default:
        return <Building2 className={classe} />;
    }
  };

  return (
    <div className={`bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden ${className}`}>
      
      {/* Header do Gráfico com Alternador de Métricas (Orçamento Geral vs. Fundão Eleitoral) */}
      <div className="p-4 sm:p-6 border-b border-slate-200 bg-slate-50/70">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className={`p-1.5 rounded-xl text-white shadow-xs ${
                metricaSelecionada === 'fefc' ? 'bg-amber-600' : 'bg-blue-600'
              }`}>
                {metricaSelecionada === 'fefc' ? <Vote className="w-4 h-4" /> : <Box className="w-4 h-4" />}
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                {metricaSelecionada === 'fefc'
                  ? 'Gráfico 3D · Gastos do Fundão Eleitoral (FEFC) por Partido'
                  : 'Gráfico de Pizza 3D · Gastos e Orçamento do Governo Federal'}
              </h3>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                metricaSelecionada === 'fefc'
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-blue-100 text-blue-800 border-blue-200'
              }`}>
                {metricaSelecionada === 'fefc'
                  ? `Eleições ${anoFEFCSelecionado} · ${dadosFEFC.tipoEleicao}`
                  : 'Série Histórica Completa (2000 a 2026 · 27 Anos)'}
              </span>
            </div>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              {metricaSelecionada === 'fefc'
                ? 'Histórico completo do Fundo Especial de Financiamento de Campanha (Lei nº 13.487/2017). Acompanhe a distribuição oficial de recursos públicos entre os partidos políticos e compare com outras áreas orçamentárias.'
                : 'Explore a distribuição orçamentária da União em um modelo tridimensional interativo. Arraste para girar em 3D, selecione qualquer ano desde 2000 e acompanhe a evolução dos recursos públicos.'}
            </p>
          </div>

          {/* Controles de Renderização (3D/2D) e Tipo (Pizza/Rosca) */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-2xl bg-white p-1 border border-slate-300 shadow-xs">
              <button
                onClick={() => setModoRender('3d')}
                className={`px-3 py-1 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                  modoRender === '3d'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Visualização Tridimensional com Iluminação PBR"
              >
                <Box className="w-3.5 h-3.5" />
                <span>3D WebGL</span>
              </button>
              <button
                onClick={() => setModoRender('2d')}
                className={`px-3 py-1 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                  modoRender === '2d'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Visualização 2D Vetorial"
              >
                <PieChartIcon className="w-3.5 h-3.5" />
                <span>2D Plano</span>
              </button>
            </div>

            <div className="inline-flex rounded-2xl bg-white p-1 border border-slate-300 shadow-xs">
              <button
                onClick={() => setTipoGrafico('pizza')}
                className={`px-2.5 py-1 text-xs font-bold rounded-xl transition cursor-pointer ${
                  tipoGrafico === 'pizza'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Pizza Sólida (Padrão)"
              >
                Pizza
              </button>
              <button
                onClick={() => setTipoGrafico('rosca')}
                className={`px-2.5 py-1 text-xs font-bold rounded-xl transition cursor-pointer ${
                  tipoGrafico === 'rosca'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Rosca com centro aberto"
              >
                Rosca
              </button>
            </div>
          </div>
        </div>

        {/* SELETOR DE MÉTRICA PRINCIPAL: ORÇAMENTO DA UNIÃO vs. FUNDÃO ELEITORAL */}
        <div className="mt-4 pt-3.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex p-1 bg-slate-200/80 rounded-2xl border border-slate-300/80 shadow-2xs">
            <button
              type="button"
              onClick={() => trocarMetrica('orcamento')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                metricaSelecionada === 'orcamento'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Orçamento Geral da União (2000–2026)</span>
            </button>
            <button
              type="button"
              onClick={() => trocarMetrica('fefc')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                metricaSelecionada === 'fefc'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Vote className="w-3.5 h-3.5" />
              <span>Gastos do Fundão Eleitoral (FEFC)</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-amber-500 text-white font-mono">
                Novo
              </span>
            </button>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            {metricaSelecionada === 'fefc'
              ? 'Fonte: Tribunal Superior Eleitoral (TSE) · DivulgaCandContas'
              : 'Fonte: Portal da Transparência / SOF Ministério do Planejamento'}
          </div>
        </div>

        {/* BARRA DE FILTRO POR ANO: MOSTRA APENAS O SELECIONADO COM SETA PARA BAIXO */}
        <div className="mt-3 pt-3 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            
            {/* Seletor Dropdown do Ano Simplificado */}
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsDropdownAnoAberto(!isDropdownAnoAberto)}
                  className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white border border-slate-300 hover:border-blue-500 shadow-xs hover:shadow-sm text-slate-800 transition cursor-pointer group"
                  aria-expanded={isDropdownAnoAberto}
                  title={
                    metricaSelecionada === 'fefc'
                      ? 'Clique para selecionar o ano eleitoral do Fundão (2018 a 2026)'
                      : 'Clique para abrir a lista completa de anos (2000 a 2026)'
                  }
                >
                  <div className={`p-1.5 rounded-xl transition ${
                    metricaSelecionada === 'fefc'
                      ? 'bg-amber-50 text-amber-700 group-hover:bg-amber-600 group-hover:text-white'
                      : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
                  }`}>
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                      {metricaSelecionada === 'fefc' ? 'Ano Eleitoral' : 'Ano Selecionado'}
                    </span>
                    <span className="text-sm font-black text-slate-900 block leading-tight">
                      {metricaSelecionada === 'fefc' ? dadosFEFC.ano : dadosAnoOrcamento.ano}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border ml-0.5 ${
                    metricaSelecionada === 'fefc'
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>
                    {metricaSelecionada === 'fefc'
                      ? dadosFEFC.tipoEleicao
                      : dadosAnoOrcamento.ano === 2026
                      ? 'LOA Vigente'
                      : dadosAnoOrcamento.ano === 2000
                      ? 'LRF 2000'
                      : dadosAnoOrcamento.status}
                  </span>
                  <div className="p-1 rounded-lg text-slate-400 group-hover:text-blue-600 transition">
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isDropdownAnoAberto ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </div>
                </button>

                {/* Botões Rápidos de Navegação Ano Anterior / Próximo Ano */}
                {metricaSelecionada === 'fefc' ? (
                  <div className="inline-flex rounded-xl bg-white border border-slate-200 p-0.5 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => {
                        const idx = ANOS_ELEITORAIS_FEFC.indexOf(anoFEFCSelecionado);
                        if (idx < ANOS_ELEITORAIS_FEFC.length - 1) {
                          setAnoFEFCSelecionado(ANOS_ELEITORAIS_FEFC[idx + 1]);
                          setCategoriaHoverId(null);
                          setCategoriaFixadaId(null);
                        }
                      }}
                      disabled={anoFEFCSelecionado <= 2018}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                      title="Eleição anterior"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const idx = ANOS_ELEITORAIS_FEFC.indexOf(anoFEFCSelecionado);
                        if (idx > 0) {
                          setAnoFEFCSelecionado(ANOS_ELEITORAIS_FEFC[idx - 1]);
                          setCategoriaHoverId(null);
                          setCategoriaFixadaId(null);
                        }
                      }}
                      disabled={anoFEFCSelecionado >= 2026}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                      title="Próxima eleição"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="inline-flex rounded-xl bg-white border border-slate-200 p-0.5 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => {
                        if (anoSelecionado > 2000) {
                          setAnoSelecionado(anoSelecionado - 1);
                          setCategoriaHoverId(null);
                          setCategoriaFixadaId(null);
                        }
                      }}
                      disabled={anoSelecionado <= 2000}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                      title="Ano anterior"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (anoSelecionado < 2026) {
                          setAnoSelecionado(anoSelecionado + 1);
                          setCategoriaHoverId(null);
                          setCategoriaFixadaId(null);
                        }
                      }}
                      disabled={anoSelecionado >= 2026}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                      title="Próximo ano"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Menu Dropdown Suspenso com Lista Limpa de Anos */}
              {isDropdownAnoAberto && (
                <div className="absolute top-full left-0 mt-2 z-50 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 w-72 sm:w-88 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
                    <div>
                      <h4 className="text-xs font-black text-slate-900">
                        {metricaSelecionada === 'fefc' ? 'Anos Eleitorais do FEFC' : 'Selecionar Ano de Referência'}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {metricaSelecionada === 'fefc'
                          ? 'Série de eleições desde a criação do fundo (2018–2026)'
                          : 'Série histórica de 2000 a 2026 (27 anos)'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsDropdownAnoAberto(false)}
                      className="text-slate-400 hover:text-slate-600 p-1 rounded-lg text-xs font-bold cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  {metricaSelecionada === 'fefc' ? (
                    /* Anos Eleitorais do Fundão Eleitoral */
                    <div className="space-y-1.5">
                      {ANOS_ELEITORAIS_FEFC.map((ano) => {
                        const info = HISTORICO_FEFC_NACIONAL[ano];
                        const isSelected = anoFEFCSelecionado === ano;
                        return (
                          <button
                            key={ano}
                            type="button"
                            onClick={() => {
                              setAnoFEFCSelecionado(ano);
                              setCategoriaHoverId(null);
                              setCategoriaFixadaId(null);
                              setIsDropdownAnoAberto(false);
                            }}
                            className={`w-full p-2.5 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                              isSelected
                                ? 'bg-amber-600 text-white shadow-xs'
                                : 'bg-slate-50 hover:bg-slate-100 text-slate-800'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-black text-sm">{ano}</span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-md ${
                                isSelected ? 'bg-amber-700 text-white' : 'bg-slate-200 text-slate-700'
                              }`}>
                                {info.tipoEleicao}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs">
                                {formatarMoedaCompacta(info.totalGeral)}
                              </span>
                              {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    /* Orçamento Geral: Abas Rápidas por Década e Grade de 27 Anos */
                    <>
                      <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-xl mb-3 text-[11px]">
                        <button
                          type="button"
                          onClick={() => setFiltroDecada('todos')}
                          className={`py-1 rounded-lg font-bold transition cursor-pointer ${
                            filtroDecada === 'todos' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                          }`}
                        >
                          Todos
                        </button>
                        <button
                          type="button"
                          onClick={() => setFiltroDecada('2020s')}
                          className={`py-1 rounded-lg font-bold transition cursor-pointer ${
                            filtroDecada === '2020s' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                          }`}
                        >
                          2020+
                        </button>
                        <button
                          type="button"
                          onClick={() => setFiltroDecada('2010s')}
                          className={`py-1 rounded-lg font-bold transition cursor-pointer ${
                            filtroDecada === '2010s' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                          }`}
                        >
                          2010s
                        </button>
                        <button
                          type="button"
                          onClick={() => setFiltroDecada('2000s')}
                          className={`py-1 rounded-lg font-bold transition cursor-pointer ${
                            filtroDecada === '2000s' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                          }`}
                        >
                          2000s
                        </button>
                      </div>

                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 max-h-56 overflow-y-auto pr-1">
                        {anosFiltradosOrcamento.map((ano) => {
                          const isSelected = anoSelecionado === ano;
                          return (
                            <button
                              key={ano}
                              type="button"
                              onClick={() => {
                                setAnoSelecionado(ano);
                                setCategoriaHoverId(null);
                                setCategoriaFixadaId(null);
                                setIsDropdownAnoAberto(false);
                              }}
                              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                                isSelected
                                  ? 'bg-blue-600 text-white shadow-xs'
                                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                              }`}
                            >
                              <span>{ano}</span>
                              {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Botão Player de Reprodução da Linha do Tempo */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs shadow-xs transition cursor-pointer ${
                  isPlaying
                    ? 'bg-amber-600 text-white animate-pulse'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                }`}
                title={isPlaying ? 'Pausar evolução' : 'Avançar automaticamente de ano em ano'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-600" />}
                <span>{isPlaying ? 'Pausar Evolução' : 'Evolução Automática'}</span>
              </button>
            </div>
          </div>

          {/* Banner de Contexto Histórico */}
          <div className={`mt-2.5 p-3 rounded-2xl border flex items-start gap-2.5 text-xs ${
            metricaSelecionada === 'fefc'
              ? 'bg-amber-50/80 border-amber-200 text-amber-950'
              : 'bg-blue-50/70 border-blue-100 text-blue-950'
          }`}>
            <Info className={`w-4 h-4 shrink-0 mt-0.5 ${
              metricaSelecionada === 'fefc' ? 'text-amber-700' : 'text-blue-600'
            }`} />
            <div className="flex-1 leading-relaxed">
              {metricaSelecionada === 'fefc' ? (
                <>
                  <strong className="font-bold text-amber-900">
                    Eleições {dadosFEFC.ano} ({dadosFEFC.tipoEleicao}):{' '}
                  </strong>
                  <span>{dadosFEFC.descricaoContexto}</span>
                  <div className="mt-1 text-[11px] text-amber-800 font-medium">
                    📜 Base Legal: {dadosFEFC.baseLegal}
                  </div>
                </>
              ) : (
                <>
                  <strong className="font-bold text-blue-900">
                    {dadosAnoOrcamento.titulo} ({dadosAnoOrcamento.status}):{' '}
                  </strong>
                  <span>{dadosAnoOrcamento.descricaoGeral}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 4 CARDS DE INDICADORES: ADAPTADOS PARA CADA MÉTRICA */}
        {metricaSelecionada === 'fefc' ? (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            {/* 1. Total Gasto no Ano */}
            <div className="p-3.5 bg-white rounded-2xl border border-amber-200 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider block">
                Total do FEFC ({dadosFEFC.ano})
              </span>
              <span className="text-base sm:text-lg font-black text-slate-900 block mt-0.5">
                {formatarMoedaCompacta(dadosFEFC.totalGeral)}
              </span>
              <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                {formatarMoedaCompleta(dadosFEFC.totalGeral)}
              </span>
            </div>

            {/* 2. Variação % em Relação à Eleição Anterior */}
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                Variação vs. Eleição Anterior
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                {dadosFEFC.variacaoRelacaoEleicaoAnterior > 0 ? (
                  <span className="inline-flex items-center text-red-600 font-black text-base sm:text-lg">
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                    +{dadosFEFC.variacaoRelacaoEleicaoAnterior.toFixed(1)}%
                  </span>
                ) : dadosFEFC.variacaoRelacaoEleicaoAnterior < 0 ? (
                  <span className="inline-flex items-center text-emerald-600 font-black text-base sm:text-lg">
                    <ArrowDownRight className="w-4 h-4 shrink-0" />
                    {dadosFEFC.variacaoRelacaoEleicaoAnterior.toFixed(1)}%
                  </span>
                ) : dadosFEFC.ano === 2018 ? (
                  <span className="text-blue-700 font-black text-sm">
                    Marco Legal (1º Ano)
                  </span>
                ) : (
                  <span className="inline-flex items-center text-slate-700 font-black text-base sm:text-lg">
                    <Minus className="w-4 h-4 shrink-0" />
                    0.0% (Teto Mantido)
                  </span>
                )}
              </div>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                {dadosFEFC.ano === 2022
                  ? 'Salto histórico aprovado pelo Congresso'
                  : dadosFEFC.ano === 2018
                  ? 'Criação pós-decisão do STF'
                  : 'Comparado à eleição anterior'}
              </span>
            </div>

            {/* 3. Partido com Maior Consumo de Recursos */}
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                Maior Cota Partidária
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: dadosFEFC.partidoMaiorCota.cor }}
                />
                <span className="text-base sm:text-lg font-black text-slate-900 truncate">
                  {dadosFEFC.partidoMaiorCota.sigla}
                </span>
                <span className="text-[11px] font-bold text-blue-700 font-mono">
                  {dadosFEFC.partidoMaiorCota.percentualDoFundo.toFixed(1)}%
                </span>
              </div>
              <span className="text-[10px] text-slate-500 block mt-0.5 font-mono">
                {formatarMoedaCompacta(dadosFEFC.partidoMaiorCota.valor)}
              </span>
            </div>

            {/* 4. Critério de Divisão Legal */}
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                Critério de Rateio (Lei 9.504)
              </span>
              <span className="text-xs font-bold text-slate-800 block mt-0.5">
                48% Câmara · 35% Votos
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                15% Senado · 2% Igualitário
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                Gasto Primário ({dadosAnoOrcamento.ano})
              </span>
              <span className="text-base sm:text-lg font-black text-slate-900 block mt-0.5">
                {formatarMoedaCompacta(dadosAnoOrcamento.totalGeral)}
              </span>
              <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                {formatarMoedaCompleta(dadosAnoOrcamento.totalGeral)}
              </span>
            </div>

            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                Arrecadação Federal
              </span>
              <span className="text-base sm:text-lg font-black text-emerald-700 block mt-0.5">
                {formatarMoedaCompacta(dadosAnoOrcamento.arrecadacaoTotal)}
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                Receitas brutas da União
              </span>
            </div>

            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                Gasto Médio por Cidadão
              </span>
              <span className="text-base sm:text-lg font-black text-blue-700 block mt-0.5">
                {formatarMoedaCompleta(dadosAnoOrcamento.gastoPerCapita)}
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                População: {(dadosAnoOrcamento.populacaoEstimada / 1e6).toFixed(1)} mi
              </span>
            </div>

            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                Cota Parlamentar Congresso
              </span>
              <span className="text-base sm:text-lg font-black text-amber-700 block mt-0.5">
                {formatarMoedaCompacta(dadosAnoOrcamento.gastosCongresso.total)}
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                Câmara + Senado em {dadosAnoOrcamento.ano}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ÁREA CENTRAL: GRÁFICO 3D OU 2D + CONTROLES DE CÂMERA & LEGENDA */}
      <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* COLUNA DO GRÁFICO (5 colunas no desktop) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          
          {modoRender === '3d' ? (
            <div className="w-full flex flex-col items-center">
              <div className="w-full bg-slate-900/5 rounded-2xl border border-slate-200 p-2 shadow-inner relative">
                <ThreePieChartCanvas
                  categorias={categoriasAtuais}
                  totalGeral={totalGeralAtual}
                  tipo={tipoGrafico}
                  hoveredId={categoriaHoverId}
                  selectedId={categoriaFixadaId}
                  onHover={setCategoriaHoverId}
                  onSelect={setCategoriaFixadaId}
                  autoRotate={autoRotate3D}
                  explosao={explosao3D}
                  cameraPreset={cameraPreset}
                />

                {/* Badge Flutuante no Canvas 3D */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-xl border border-slate-200 text-[10px] font-bold text-slate-700 shadow-2xs pointer-events-none">
                  <span>3D Interativo · Arraste para girar</span>
                </div>
              </div>

              {/* Barra de Controles de Câmera e Efeito 3D */}
              <div className="w-full mt-3 p-3 bg-slate-50 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-blue-600" />
                    Ângulo:
                  </span>
                  <div className="inline-flex rounded-xl bg-white p-0.5 border border-slate-200 shadow-2xs">
                    <button
                      onClick={() => setCameraPreset('perspectiva')}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                        cameraPreset === 'perspectiva' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
                      }`}
                      title="Ângulo tridimensional em perspectiva"
                    >
                      3D
                    </button>
                    <button
                      onClick={() => setCameraPreset('topo')}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                        cameraPreset === 'topo' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
                      }`}
                      title="Vista ortogonal de topo"
                    >
                      Topo
                    </button>
                    <button
                      onClick={() => setCameraPreset('frente')}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                        cameraPreset === 'frente' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
                      }`}
                      title="Vista frontal inclinada"
                    >
                      Inclinado
                    </button>
                  </div>
                </div>

                {/* Slider de Explosão 3D */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                    <Sliders className="w-3 h-3 text-slate-500" />
                    Explosão:
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={0.5}
                    step={0.05}
                    value={explosao3D}
                    onChange={(e) => setExplosao3D(parseFloat(e.target.value))}
                    className="w-16 sm:w-20 accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                    title="Separar fatias no espaço 3D"
                  />
                </div>

                {/* Auto Rotate 3D Toggle (Padrão: Giro Pausado) */}
                <button
                  onClick={() => setAutoRotate3D(!autoRotate3D)}
                  className={`px-2.5 py-1 rounded-xl text-[10px] font-bold transition cursor-pointer flex items-center gap-1 ${
                    autoRotate3D
                      ? 'bg-blue-100 text-blue-800 border border-blue-200'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                  title={autoRotate3D ? 'Pausar rotação contínua' : 'Ativar rotação lenta contínua'}
                >
                  <RotateCcw className={`w-3 h-3 ${autoRotate3D ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
                  <span>{autoRotate3D ? 'Giro Ativo' : 'Giro Pausado'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Modo 2D SVG Clássico */
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
              <svg viewBox="0 0 320 320" className="w-full h-full drop-shadow-sm select-none">
                <g>
                  {arcos2D.map((arco) => (
                    <path
                      key={arco.id}
                      d={arco.pathD}
                      fill={arco.cor}
                      transform={arco.transform}
                      className="transition-transform duration-200 cursor-pointer hover:opacity-95"
                      style={{
                        stroke: '#ffffff',
                        strokeWidth: arco.isHovered ? '2.5' : '1.5',
                        strokeLinejoin: 'round',
                        filter: arco.isHovered ? 'brightness(1.08)' : 'none',
                      }}
                      onMouseEnter={() => setCategoriaHoverId(arco.id)}
                      onMouseLeave={() => setCategoriaHoverId(null)}
                      onClick={() => setCategoriaFixadaId(categoriaFixadaId === arco.id ? null : arco.id)}
                    />
                  ))}
                </g>

                {tipoGrafico === 'rosca' && (
                  <circle cx="160" cy="160" r="74" fill="#ffffff" className="pointer-events-none drop-shadow-xs" />
                )}
              </svg>

              {tipoGrafico === 'rosca' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {categoriaHoverId || categoriaFixadaId ? 'Fatia em Foco' : 'Total Geral'}
                  </span>
                  <span className="text-base sm:text-lg font-black text-slate-900 leading-tight mt-0.5 line-clamp-1">
                    {categoriaHoverId || categoriaFixadaId
                      ? categoriaAtiva.nome
                      : formatarMoedaCompacta(totalGeralAtual)}
                  </span>
                  <span className="text-xs font-extrabold text-blue-600 mt-0.5">
                    {categoriaHoverId || categoriaFixadaId
                      ? `${formatarPercentual(categoriaAtiva.valor / totalGeralAtual)} do total`
                      : metricaSelecionada === 'fefc' ? `Eleição ${dadosFEFC.ano}` : `Ano ${dadosAnoOrcamento.ano}`}
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="mt-2 text-center">
            <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Passe o cursor ou clique em qualquer fatia 3D para inspecionar os detalhes
            </p>
          </div>
        </div>

        {/* COLUNA DA LEGENDA & CARTÃO DETALHADO (7 colunas no desktop) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Cartão de Foco na Categoria / Partido Selecionado (Tooltip Expandido) */}
          <div
            className="p-4 rounded-2xl border transition-all duration-200"
            style={{
              borderColor: categoriaAtiva.cor,
              backgroundColor: `${categoriaAtiva.cor}0a`,
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div
                  className="p-2 rounded-xl text-white shadow-xs"
                  style={{ backgroundColor: categoriaAtiva.cor }}
                >
                  {renderIcone(categoriaAtiva.icone, 'w-5 h-5')}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-slate-900 text-sm sm:text-base">
                      {categoriaAtiva.nome}
                    </h4>
                    <span
                      className="text-[11px] font-extrabold px-2 py-0.5 rounded-lg text-white font-mono"
                      style={{ backgroundColor: categoriaAtiva.cor }}
                    >
                      {formatarPercentual(categoriaAtiva.valor / totalGeralAtual)}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    {metricaSelecionada === 'fefc' ? 'Cota do Fundo Eleitoral: ' : 'Valor Alocado no Ano: '}
                    <strong className="text-slate-900 font-bold">
                      {formatarMoedaCompleta(categoriaAtiva.valor)}
                    </strong>{' '}
                    ({formatarMoedaCompacta(categoriaAtiva.valor)})
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-700 mt-3 pt-2.5 border-t border-slate-200/80 leading-relaxed">
              <span className="font-bold text-slate-900">
                {metricaSelecionada === 'fefc' ? 'Regras e Destinação Legal: ' : 'Finalidade dos recursos: '}
              </span>
              {categoriaAtiva.descricao}
            </p>

            {metricaSelecionada === 'fefc' && (
              <div className="mt-2.5 pt-2 border-t border-slate-200/60">
                <span className="text-[11px] font-bold text-slate-600 block mb-1">
                  💡 Onde esses recursos são aplicados nas campanhas:
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-600 list-disc list-inside">
                  <li>Produção de rádio, TV e impulsionamento digital</li>
                  <li>Contratação de militância, advogados e contadores</li>
                  <li>Material gráfico, bandeiras, santinhos e adesivos</li>
                  <li>Deslocamentos aéreos e eventos em municípios</li>
                </ul>
              </div>
            )}
          </div>

          {/* Grid de Legendas com Valores e Percentuais */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {metricaSelecionada === 'fefc'
                  ? `Ranking de Cotas por Partido · ${dadosFEFC.ano} (${categoriasAtuais.length} agremiações)`
                  : `Distribuição por Área em ${dadosAnoOrcamento.ano} (${dadosAnoOrcamento.categorias.length} pastas)`}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                100% dos Recursos Alocados
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
              {categoriasAtuais.map((cat) => {
                const percentual = totalGeralAtual > 0 ? cat.valor / totalGeralAtual : 0;
                const isSelected = (categoriaHoverId || categoriaFixadaId) === cat.id;

                return (
                  <button
                    key={cat.id}
                    onMouseEnter={() => setCategoriaHoverId(cat.id)}
                    onMouseLeave={() => setCategoriaHoverId(null)}
                    onClick={() =>
                      setCategoriaFixadaId(categoriaFixadaId === cat.id ? null : cat.id)
                    }
                    className={`text-left p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs scale-101 ring-1 ring-slate-900'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="w-3 h-3 rounded-full shrink-0 shadow-2xs"
                        style={{ backgroundColor: cat.cor }}
                      />
                      <span className="text-xs font-bold truncate">
                        {cat.nome}
                      </span>
                    </div>

                    <div className="text-right shrink-0">
                      <span
                        className={`text-xs font-black block font-mono ${
                          isSelected ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {formatarMoedaCompacta(cat.valor)}
                      </span>
                      <span
                        className={`text-[10px] font-bold ${
                          isSelected ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {formatarPercentual(percentual)}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* SEÇÃO COMPARATIVA: FUNDÃO ELEITORAL VS OUTRAS CONTAS PÚBLICAS & SÉRIE HISTÓRICA */}
      {metricaSelecionada === 'fefc' && (
        <div className="p-4 sm:p-6 bg-slate-50/80 border-t border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-600" />
                Comparativo Institucional: FEFC vs. Outras Contas Públicas ({dadosFEFC.ano})
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Comparação de magnitude entre o Fundão Eleitoral e despesas do Orçamento Geral da União no mesmo período.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Card 1: FEFC vs Meio Ambiente */}
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 text-xs shadow-2xs">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                FEFC vs. Ministério do Meio Ambiente
              </span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="font-mono font-bold text-amber-700">FEFC: R$ 4,96 Bi</span>
                <span className="font-mono text-emerald-700 font-semibold">MMA: R$ 3,80 Bi</span>
              </div>
              <div className="mt-2 w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
                <div className="bg-amber-500 h-full w-[56%]" title="Fundão Eleitoral (56%)" />
                <div className="bg-emerald-500 h-full w-[44%]" title="Meio Ambiente (44%)" />
              </div>
              <p className="mt-2 text-[11px] text-slate-600">
                O Fundão Eleitoral de {dadosFEFC.ano} equivale a <strong>130%</strong> do orçamento anual total destinado à proteção ambiental e combate ao desmatamento.
              </p>
            </div>

            {/* Card 2: FEFC vs Ciência e Tecnologia */}
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 text-xs shadow-2xs">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                FEFC vs. Ciência e Tecnologia (MCTI)
              </span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="font-mono font-bold text-amber-700">FEFC: R$ 4,96 Bi</span>
                <span className="font-mono text-blue-700 font-semibold">MCTI: R$ 15,2 Bi</span>
              </div>
              <div className="mt-2 w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
                <div className="bg-amber-500 h-full w-[24%]" title="Fundão Eleitoral (24%)" />
                <div className="bg-blue-500 h-full w-[76%]" title="Ciência e Tecnologia (76%)" />
              </div>
              <p className="mt-2 text-[11px] text-slate-600">
                O FEFC representa aproximadamente <strong>32%</strong> de todos os investimentos federais em pesquisa científica e inovação tecnológica do país.
              </p>
            </div>

            {/* Card 3: FEFC vs Cota Parlamentar (CEAP) */}
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 text-xs shadow-2xs">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                FEFC vs. Cota Parlamentar (CEAP)
              </span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="font-mono font-bold text-amber-700">FEFC: R$ 4,96 Bi</span>
                <span className="font-mono text-purple-700 font-semibold">Cota Anual: R$ 0,24 Bi</span>
              </div>
              <div className="mt-2 w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
                <div className="bg-amber-500 h-full w-[95%]" title="Fundão Eleitoral (95%)" />
                <div className="bg-purple-500 h-full w-[5%]" title="Cota Parlamentar Anual (5%)" />
              </div>
              <p className="mt-2 text-[11px] text-slate-600">
                O Fundão Eleitoral supera em mais de <strong>20 vezes</strong> o total gasto em um ano inteiro com cota de atividade parlamentar por todos os 513 deputados e 81 senadores juntos.
              </p>
            </div>
          </div>

          {/* Comparativo Temporal da Série Eleitoral (2018 a 2026) */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200">
            <h5 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
              Evolução Temporal do Fundão Eleitoral (2018 a 2026)
            </h5>
            <div className="grid grid-cols-5 gap-2">
              {ANOS_ELEITORAIS_FEFC.slice().reverse().map((ano) => {
                const info = HISTORICO_FEFC_NACIONAL[ano];
                const isSelected = anoFEFCSelecionado === ano;
                const alturaBarra = maxValorFEFC > 0 ? Math.round((info.totalGeral / maxValorFEFC) * 100) : 0;

                return (
                  <button
                    key={ano}
                    type="button"
                    onClick={() => setAnoFEFCSelecionado(ano)}
                    className={`p-2.5 rounded-xl border text-center transition cursor-pointer flex flex-col items-center justify-between ${
                      isSelected
                        ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/20'
                        : 'bg-slate-50/50 hover:bg-slate-100/70 border-slate-200'
                    }`}
                  >
                    <span className="text-[11px] font-black text-slate-900">{ano}</span>
                    <span className="text-[9px] text-slate-500 font-semibold">{info.tipoEleicao}</span>
                    <div className="w-full bg-slate-200 h-14 rounded-lg my-1.5 flex items-end overflow-hidden p-0.5">
                      <div
                        className={`w-full rounded-md transition-all duration-500 ${
                          isSelected ? 'bg-amber-600' : 'bg-slate-400'
                        }`}
                        style={{ height: `${alturaBarra}%` }}
                      />
                    </div>
                    <span className="font-mono text-[10px] font-bold text-slate-900">
                      {formatarMoedaCompacta(info.totalGeral)}
                    </span>
                    <span className={`text-[9px] font-bold mt-0.5 ${
                      info.variacaoRelacaoEleicaoAnterior > 0
                        ? 'text-red-600'
                        : 'text-slate-500'
                    }`}>
                      {info.variacaoRelacaoEleicaoAnterior > 0
                        ? `+${info.variacaoRelacaoEleicaoAnterior.toFixed(0)}%`
                        : info.ano === 2018
                        ? 'Inicial'
                        : '0%'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Rodapé com Informações de Auditoria e Fontes Oficiais */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            Fonte primária:{' '}
            <strong>
              {metricaSelecionada === 'fefc' ? dadosFEFC.baseLegal : dadosAnoOrcamento.fontePrimaria}
            </strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://divulgacandcontas.tse.jus.br"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-800 hover:text-amber-950 font-semibold underline inline-flex items-center gap-1"
          >
            TSE DivulgaCandContas
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-slate-300">·</span>
          <a
            href="https://portaldatransparencia.gov.br"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-900 font-semibold underline inline-flex items-center gap-1"
          >
            Portal da Transparência Gov.br
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-slate-300">·</span>
          <a
            href="https://transparenciapolitica.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-900 font-semibold underline inline-flex items-center gap-1"
          >
            transparenciapolitica.app
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
