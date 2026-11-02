/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Politico, FiltroOrdenacao, LocalizacaoFiltro, FiltroEleitoral } from './types';
import { POLITICOS_DATABASE } from './data/mockDatabase';
import { Navbar } from './components/Navbar';
import { SearchAndFilters } from './components/SearchAndFilters';
import { PoliticianCard } from './components/PoliticianCard';
import { PoliticianDetailModal } from './components/PoliticianDetailModal';
import { CompareView } from './components/CompareView';
import { GlossaryView } from './components/GlossaryView';
import { ArchitectureView } from './components/ArchitectureView';
import { LocationSelectorModal } from './components/LocationSelectorModal';
import { AdMobBanner } from './components/AdMobBanner';
import { MobileFrame } from './components/MobileFrame';
import { TransparenciaFederalHeader } from './components/TransparenciaFederalHeader';
import {
  ShieldCheck,
  Award,
  Scale,
  Sparkles,
  GitCompare,
  FileCheck2,
  Info,
  Vote,
  ShieldAlert
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'inicio' | 'comparador' | 'glossario' | 'arquitetura'>('inicio');
  const [isMobileFrame, setIsMobileFrame] = useState(false);
  const [limiteExibicao, setLimiteExibicao] = useState(30);

  // Filtros e Busca
  const [busca, setBusca] = useState('');
  const [cargoSelecionado, setCargoSelecionado] = useState('Todos');
  const [filtroEleitoral, setFiltroEleitoral] = useState<FiltroEleitoral>('Todos');
  const [ordenacao, setOrdenacao] = useState<FiltroOrdenacao>('relevancia');
  const [localizacao, setLocalizacao] = useState<LocalizacaoFiltro>({});
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // Modal de Detalhes do Político
  const [selectedPolitico, setSelectedPolitico] = useState<Politico | null>(null);

  // Comparador
  const [politicoA, setPoliticoA] = useState<Politico | null>(POLITICOS_DATABASE[0] || null);
  const [politicoB, setPoliticoB] = useState<Politico | null>(POLITICOS_DATABASE[1] || null);

  // Toggle de Comparação rápida a partir dos cards
  const handleToggleCompare = (p: Politico) => {
    if (politicoA?.id === p.id) {
      setPoliticoA(null);
    } else if (politicoB?.id === p.id) {
      setPoliticoB(null);
    } else if (!politicoA) {
      setPoliticoA(p);
    } else {
      setPoliticoB(p);
    }
  };

  const comparadosCount = (politicoA ? 1 : 0) + (politicoB ? 1 : 0);

  // Filtragem e Ordenação no Client
  const politicosFiltrados = useMemo(() => {
    let list = [...POLITICOS_DATABASE];

    // Busca textual
    if (busca.trim()) {
      const q = busca.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.nomeUrna.toLowerCase().includes(q) ||
          p.nomeCivil.toLowerCase().includes(q) ||
          p.siglaPartido.toLowerCase().includes(q) ||
          p.uf.toLowerCase() === q ||
          (p.municipio && p.municipio.toLowerCase().includes(q))
      );
    }

    // Cargo
    if (cargoSelecionado !== 'Todos') {
      list = list.filter((p) =>
        p.cargo.toLowerCase().includes(cargoSelecionado.toLowerCase())
      );
    }

    // Filtro por Disputa Eleitoral (Federal, Estadual, Municipal ou Todos em Disputa)
    if (filtroEleitoral === 'EmDisputa') {
      list = list.filter((p) => p.candidaturaEleitoral?.disputando);
    } else if (filtroEleitoral === 'Federal') {
      list = list.filter(
        (p) => p.candidaturaEleitoral?.disputando && p.candidaturaEleitoral?.esfera === 'Federal'
      );
    } else if (filtroEleitoral === 'Estadual') {
      list = list.filter(
        (p) => p.candidaturaEleitoral?.disputando && p.candidaturaEleitoral?.esfera === 'Estadual'
      );
    } else if (filtroEleitoral === 'Municipal') {
      list = list.filter(
        (p) => p.candidaturaEleitoral?.disputando && p.candidaturaEleitoral?.esfera === 'Municipal'
      );
    }

    // Localidade (UF ou Município)
    if (localizacao.uf) {
      list = list.filter(
        (p) =>
          p.uf.toUpperCase() === localizacao.uf?.toUpperCase() ||
          p.cargo === 'Presidente' ||
          p.cargo === 'Vice-Presidente'
      );
    }

    // Ordenação
    if (ordenacao === 'maisProjetosAprovados') {
      list.sort(
        (a, b) =>
          b.metricas.projetosViraramLeiTotal - a.metricas.projetosViraramLeiTotal
      );
    } else if (ordenacao === 'menosGastosCota') {
      list.sort(
        (a, b) => a.metricas.gastoCotaTotalAno - b.metricas.gastoCotaTotalAno
      );
    } else if (ordenacao === 'semProcessosJustica') {
      list.sort((a, b) => {
        const aAtivos = a.processosJudiciais.filter(
          (pr) => pr.status === 'Investigado' || pr.status === 'Réu'
        ).length;
        const bAtivos = b.processosJudiciais.filter(
          (pr) => pr.status === 'Investigado' || pr.status === 'Réu'
        ).length;
        return aAtivos - bAtivos;
      });
    } else if (ordenacao === 'maiorPresenca') {
      list.sort(
        (a, b) =>
          b.metricas.presencaPlenarioPorcentagem -
          a.metricas.presencaPlenarioPorcentagem
      );
    } else if (ordenacao === 'alfabetica') {
      list.sort((a, b) => a.nomeUrna.localeCompare(b.nomeUrna));
    }

    return list;
  }, [busca, cargoSelecionado, filtroEleitoral, localizacao, ordenacao]);

  const appContent = (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
      {/* Header de Navegação */}
      <Navbar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        isMobileFrame={isMobileFrame}
        onToggleMobileFrame={() => setIsMobileFrame(!isMobileFrame)}
        comparadosCount={comparadosCount}
      />

      {/* Faixa Institucional de Neutralidade e Auditoria */}
      <div className="bg-slate-900 text-slate-300 px-4 py-2 text-[11px] border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>
              Plataforma Cívica Independente · Neutralidade Absoluta · Sem Juízo de Valor Político
            </span>
          </div>
          <span className="text-[10px] text-slate-400">
            Fontes Oficiais: TSE (DivulgaCandContas) · Câmara · Senado · CGU · STF
          </span>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        {/* Banner do AdMob Cívico (com bloqueio obrigatório de política e apostas) */}
        <AdMobBanner tipo="inline" />

        {/* TAB 1: INÍCIO E DESCOBERTA */}
        {currentTab === 'inicio' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            
            {/* Banner de Boas-vindas Cívico */}
            <div className="bg-linear-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-5 sm:p-7 text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3 border border-emerald-500/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  Educação Eleitoral & Linguagem Simples (Plain Language)
                </div>
                <h2 className="text-xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                  Conheça a atuação real dos seus representantes públicos no Brasil
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Consulte projetos que de fato viraram lei, presença em votações, gastos da cota parlamentar e certidões judiciais oficiais traduzidas de forma direta e sem jargões.
                </p>
              </div>

              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-12 translate-y-12">
                <FileCheck2 className="w-72 h-72 text-white" />
              </div>
            </div>

            {/* Painel Macroeconômico de Transparência Pública (Sincronizado com transparenciapolitica.app) */}
            <TransparenciaFederalHeader totalPoliticosCadastrados={POLITICOS_DATABASE.length} />

            {/* Barra de Pesquisa Instantânea + Filtros Rápidos */}
            <SearchAndFilters
              busca={busca}
              onBuscaChange={(val) => {
                setBusca(val);
                setLimiteExibicao(30);
              }}
              cargoSelecionado={cargoSelecionado}
              onCargoChange={(val) => {
                setCargoSelecionado(val);
                setLimiteExibicao(30);
              }}
              filtroEleitoral={filtroEleitoral}
              onFiltroEleitoralChange={(val) => {
                setFiltroEleitoral(val);
                setLimiteExibicao(30);
              }}
              ordenacao={ordenacao}
              onOrdenacaoChange={setOrdenacao}
              localizacao={localizacao}
              onOpenLocationModal={() => setIsLocationModalOpen(true)}
              totalResultados={politicosFiltrados.length}
              onGoToCompare={() => setCurrentTab('comparador')}
              comparadosCount={comparadosCount}
              onClearLocation={() => {
                setLocalizacao({});
                setLimiteExibicao(30);
              }}
            />

            {/* Aviso quando o filtro de estado/localidade está ativo */}
            {localizacao.uf && (
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-blue-900 shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-lg bg-blue-600 text-white font-mono font-bold text-[10px]">
                    {localizacao.uf}
                  </span>
                  <span>
                    Filtro regional ativo:{' '}
                    <strong>
                      {localizacao.municipio ? `${localizacao.municipio} (${localizacao.uf})` : localizacao.uf}
                    </strong>{' '}
                    — exibindo representantes locais e o Executivo Federal ({politicosFiltrados.length} encontrados)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsLocationModalOpen(true)}
                    className="text-blue-700 hover:text-blue-900 font-semibold underline cursor-pointer"
                  >
                    Trocar estado
                  </button>
                  <span className="text-slate-300">|</span>
                  <button
                    onClick={() => {
                      setLocalizacao({});
                      setLimiteExibicao(30);
                    }}
                    className="text-red-600 hover:text-red-700 font-semibold cursor-pointer"
                  >
                    Limpar filtro
                  </button>
                </div>
              </div>
            )}

            {/* Grid de Cards de Políticos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {politicosFiltrados.slice(0, limiteExibicao).map((politico) => (
                <PoliticianCard
                  key={politico.id}
                  politico={politico}
                  onOpenDetail={setSelectedPolitico}
                  onToggleCompare={handleToggleCompare}
                  isCompared={politicoA?.id === politico.id || politicoB?.id === politico.id}
                />
              ))}
            </div>

            {/* Botão de Paginação / Carregar Mais */}
            {politicosFiltrados.length > limiteExibicao && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3 pb-2">
                <button
                  onClick={() => setLimiteExibicao((prev) => prev + 30)}
                  className="px-6 py-3 rounded-2xl bg-white border border-slate-300 font-bold text-xs text-slate-800 hover:bg-slate-50 transition shadow-xs cursor-pointer inline-flex items-center gap-2 hover:border-slate-400"
                >
                  <span>Exibindo {Math.min(limiteExibicao, politicosFiltrados.length)} de {politicosFiltrados.length} representantes</span>
                  <span className="text-blue-600 font-bold">· Carregar mais (+30)</span>
                </button>
                <button
                  onClick={() => setLimiteExibicao(politicosFiltrados.length)}
                  className="px-4 py-3 rounded-2xl bg-slate-200/80 hover:bg-slate-300/80 text-xs font-bold text-slate-700 transition cursor-pointer"
                >
                  Mostrar todos ({politicosFiltrados.length})
                </button>
              </div>
            )}

            {politicosFiltrados.length === 0 && (
              <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-2">
                <p className="text-sm font-bold text-slate-700">
                  Nenhum representante encontrado para os filtros selecionados.
                </p>
                <p className="text-xs text-slate-500">
                  Tente alterar o termo de busca ou remover o filtro de cargo ou localização.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: COMPARADOR LADO A LADO */}
        {currentTab === 'comparador' && (
          <CompareView
            politicosDisponiveis={POLITICOS_DATABASE}
            politicoA={politicoA}
            politicoB={politicoB}
            onSelectA={setPoliticoA}
            onSelectB={setPoliticoB}
            onOpenDetail={setSelectedPolitico}
          />
        )}

        {/* TAB 3: GLOSSÁRIO CIDADÃO */}
        {currentTab === 'glossario' && <GlossaryView />}

        {/* TAB 4: ARQUITETURA TÉCNICA & SCHEMA POSTGRESQL */}
        {currentTab === 'arquitetura' && <ArchitectureView />}
      </main>

      {/* Rodapé Geral */}
      <footer className="mt-auto bg-slate-900 text-slate-400 border-t border-slate-800 text-xs py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="font-bold text-slate-200 text-sm flex items-center justify-center sm:justify-start gap-2">
              <span>Radar Político Brasil</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Sincronizado com transparenciapolitica.app
              </span>
            </p>
            <p className="text-[11px] text-slate-400 mt-1 max-w-xl">
              Plataforma apartidária de transparência e cidadania ativa. Dados públicos sincronizados com{' '}
              <a
                href="https://transparenciapolitica.app"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-emerald-400 font-semibold hover:text-emerald-300"
              >
                Transparência Política
              </a>
              , Câmara dos Deputados, Senado Federal, Tribunal Superior Eleitoral e Portal da Transparência do Governo Federal.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
            <button
              onClick={() => setCurrentTab('arquitetura')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Schema PostgreSQL
            </button>
            <button
              onClick={() => setCurrentTab('glossario')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Glossário Cidadão
            </button>
            <button
              onClick={() => setCurrentTab('comparador')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Comparador
            </button>
          </div>
        </div>
      </footer>

      {/* Modal Ficha Completa do Político */}
      {selectedPolitico && (
        <PoliticianDetailModal
          politico={selectedPolitico}
          isOpen={!!selectedPolitico}
          onClose={() => setSelectedPolitico(null)}
          onCompare={(p) => {
            handleToggleCompare(p);
            setSelectedPolitico(null);
            setCurrentTab('comparador');
          }}
        />
      )}

      {/* Modal Seletor de Localização (CEP) */}
      <LocationSelectorModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        localizacaoAtual={localizacao}
        onSelectLocalizacao={setLocalizacao}
      />
    </div>
  );

  return (
    <MobileFrame
      isMobileFrame={isMobileFrame}
      onCloseMobileFrame={() => setIsMobileFrame(false)}
    >
      {appContent}
    </MobileFrame>
  );
}
