import React from 'react';
import { FiltroOrdenacao, LocalizacaoFiltro, FiltroEleitoral } from '../types';
import {
  Search,
  MapPin,
  SlidersHorizontal,
  Award,
  DollarSign,
  Scale,
  Percent,
  ArrowDownAZ,
  RotateCcw,
  GitCompare,
  Navigation,
  Vote,
  Globe2
} from 'lucide-react';

interface Props {
  busca: string;
  onBuscaChange: (val: string) => void;
  cargoSelecionado: string;
  onCargoChange: (cargo: string) => void;
  filtroEleitoral: FiltroEleitoral;
  onFiltroEleitoralChange: (filtro: FiltroEleitoral) => void;
  ordenacao: FiltroOrdenacao;
  onOrdenacaoChange: (ord: FiltroOrdenacao) => void;
  localizacao: LocalizacaoFiltro;
  onOpenLocationModal: () => void;
  totalResultados: number;
  onGoToCompare: () => void;
  comparadosCount: number;
  onClearLocation?: () => void;
}

export const SearchAndFilters: React.FC<Props> = ({
  busca,
  onBuscaChange,
  cargoSelecionado,
  onCargoChange,
  filtroEleitoral,
  onFiltroEleitoralChange,
  ordenacao,
  onOrdenacaoChange,
  localizacao,
  onOpenLocationModal,
  totalResultados,
  onGoToCompare,
  comparadosCount,
  onClearLocation,
}) => {
  const cargos = [
    'Todos',
    'Presidente',
    'Governador',
    'Senador',
    'Deputado Federal',
    'Deputado Estadual',
    'Prefeito',
    'Vereador',
  ];

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-xs space-y-4">
      {/* Linha Superior: Barra de Busca + Seletor de Localização (CEP) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Input de Busca Instantânea */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={busca}
            onChange={(e) => onBuscaChange(e.target.value)}
            placeholder="Pesquisa instantânea: nome civil, de urna, partido ou UF..."
            className="w-full bg-slate-100 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm pl-11 pr-4 py-3 rounded-2xl border border-transparent focus:border-blue-500 focus:bg-white focus:outline-hidden transition-all shadow-inner"
          />
          {busca && (
            <button
              onClick={() => onBuscaChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 bg-slate-200 hover:bg-slate-300 px-2 py-0.5 rounded-lg"
            >
              Limpar
            </button>
          )}
        </div>

        {/* Botão de Localização (CEP ou GPS) */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onOpenLocationModal}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all border cursor-pointer ${
              localizacao.uf
                ? 'bg-blue-50 text-blue-800 border-blue-300 ring-2 ring-blue-100 shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
            }`}
            title="Escolha qualquer um dos 27 estados do Brasil ou digite seu CEP"
          >
            <MapPin className={`w-4 h-4 ${localizacao.uf ? 'text-blue-700' : 'text-slate-500'}`} />
            <span>
              {localizacao.municipio ? `${localizacao.municipio} - ${localizacao.uf}` : 'Todos os 27 Estados / CEP'}
            </span>
          </button>

          {localizacao.uf && onClearLocation && (
            <button
              onClick={onClearLocation}
              className="p-2.5 text-slate-400 hover:text-red-600 bg-slate-100 hover:bg-red-50 border border-slate-200 rounded-2xl transition-colors cursor-pointer"
              title="Remover filtro de estado e ver Brasil todo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Botão de Destaque para o Comparador */}
        <button
          onClick={onGoToCompare}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-2xl text-xs sm:text-sm font-bold transition-colors border border-blue-200 cursor-pointer shrink-0 relative"
        >
          <GitCompare className="w-4 h-4 text-blue-600" />
          <span>Comparador</span>
          {comparadosCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">
              {comparadosCount}
            </span>
          )}
        </button>
      </div>

      {/* Filtro Obrigatório: Disputa Eleitoral (Federal, Estadual, Municipal) em todos os estados */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[11px] font-bold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded-lg uppercase tracking-wider mr-1 shrink-0 flex items-center gap-1">
          <Vote className="w-3.5 h-3.5 text-amber-700" />
          Disputa Eleitoral:
        </span>

        <button
          onClick={() => onFiltroEleitoralChange('Todos')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            filtroEleitoral === 'Todos'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Todos os Políticos
        </button>

        <button
          onClick={() => onFiltroEleitoralChange('EmDisputa')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
            filtroEleitoral === 'EmDisputa'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
          title="Mostrar todos os políticos que estão disputando as eleições"
        >
          <span>🗳️ Todos em Disputa</span>
        </button>

        <button
          onClick={() => onFiltroEleitoralChange('Federal')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
            filtroEleitoral === 'Federal'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
          title="Candidatos a Presidente, Senador e Deputado Federal"
        >
          <span>🏛️ Eleição Federal</span>
        </button>

        <button
          onClick={() => onFiltroEleitoralChange('Estadual')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
            filtroEleitoral === 'Estadual'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
          title="Candidatos a Governador e Deputado Estadual"
        >
          <span>🏢 Eleição Estadual</span>
        </button>

        <button
          onClick={() => onFiltroEleitoralChange('Municipal')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
            filtroEleitoral === 'Municipal'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
          title="Candidatos a Prefeito e Vereador"
        >
          <span>🏙️ Eleição Municipal</span>
        </button>
      </div>

      {/* Linha de Categorias por Cargo */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mr-1 shrink-0">
          Cargos:
        </span>
        {cargos.map((cargo) => (
          <button
            key={cargo}
            onClick={() => onCargoChange(cargo)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              cargoSelecionado === cargo
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            {cargo === 'Todos' ? 'Todos os Cargos' : cargo}
          </button>
        ))}
      </div>

      {/* Linha de Filtros Rápidos Obrigatórios da Especificação */}
      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mr-1">
            Ordenar por:
          </span>

          <button
            onClick={() => onOrdenacaoChange('maisProjetosAprovados')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer ${
              ordenacao === 'maisProjetosAprovados'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            Mais Projetos Aprovados
          </button>

          <button
            onClick={() => onOrdenacaoChange('menosGastosCota')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer ${
              ordenacao === 'menosGastosCota'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            Menos Gastos de Cota
          </button>

          <button
            onClick={() => onOrdenacaoChange('semProcessosJustica')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer ${
              ordenacao === 'semProcessosJustica'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            Sem Registros na Justiça
          </button>

          <button
            onClick={() => onOrdenacaoChange('maiorPresenca')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer ${
              ordenacao === 'maiorPresenca'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Percent className="w-3.5 h-3.5" />
            Maior Presença
          </button>

          <button
            onClick={() => onOrdenacaoChange('alfabetica')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer ${
              ordenacao === 'alfabetica'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <ArrowDownAZ className="w-3.5 h-3.5" />
            Ordem Alfabética
          </button>
        </div>

        <div className="text-xs text-slate-500 font-medium ml-auto">
          Exibindo <strong className="text-slate-800">{totalResultados}</strong> representantes
        </div>
      </div>
    </div>
  );
};
