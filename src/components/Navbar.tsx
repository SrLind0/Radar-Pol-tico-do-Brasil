import React from 'react';
import {
  ShieldCheck,
  Smartphone,
  Monitor,
  GitCompare,
  BookOpen,
  Database,
  Users,
  Search
} from 'lucide-react';

interface Props {
  currentTab: 'inicio' | 'comparador' | 'glossario' | 'arquitetura';
  onTabChange: (tab: 'inicio' | 'comparador' | 'glossario' | 'arquitetura') => void;
  isMobileFrame: boolean;
  onToggleMobileFrame: () => void;
  comparadosCount: number;
}

export const Navbar: React.FC<Props> = ({
  currentTab,
  onTabChange,
  isMobileFrame,
  onToggleMobileFrame,
  comparadosCount,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900 text-white border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        
        {/* Brand / Logo */}
        <div
          onClick={() => onTabChange('inicio')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-emerald-500 via-teal-600 to-blue-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                Radar Político <span className="text-emerald-400 font-extrabold text-xs sm:text-sm">Brasil</span>
              </h1>
              <span className="hidden md:inline-block text-[10px] uppercase font-bold tracking-wider bg-slate-800 text-emerald-400 px-2 py-0.5 rounded-full border border-slate-700">
                100% Oficial
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              Transparência Pública em Linguagem Simples
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-1.5">
          <button
            onClick={() => onTabChange('inicio')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              currentTab === 'inicio'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Início</span>
          </button>

          <button
            onClick={() => onTabChange('comparador')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 relative ${
              currentTab === 'comparador'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <GitCompare className="w-4 h-4" />
            <span className="hidden sm:inline">Comparador</span>
            {comparadosCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-900 text-[10px] font-black flex items-center justify-center">
                {comparadosCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onTabChange('glossario')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              currentTab === 'glossario'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Glossário</span>
          </button>

          <button
            onClick={() => onTabChange('arquitetura')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              currentTab === 'arquitetura'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Database className="w-4 h-4" />
            <span className="hidden sm:inline">Schema SQL</span>
          </button>
        </nav>

        {/* Action Right: Mobile Frame Simulator Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleMobileFrame}
            className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              isMobileFrame
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
            }`}
            title={isMobileFrame ? 'Alternar para Tela Cheia' : 'Simular formato de Smartphone'}
          >
            {isMobileFrame ? (
              <>
                <Monitor className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px] hidden lg:inline">Modo Desktop</span>
              </>
            ) : (
              <>
                <Smartphone className="w-4 h-4 text-slate-300" />
                <span className="text-[11px] hidden lg:inline">Simular Mobile</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
