import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

interface AdMobBannerProps {
  tipo?: 'footer' | 'card' | 'inline';
}

export const AdMobBanner: React.FC<AdMobBannerProps> = ({ tipo = 'inline' }) => {
  return (
    <div className={`my-4 overflow-hidden rounded-xl border border-slate-200 bg-linear-to-r from-slate-50 via-white to-slate-50 shadow-xs ${tipo === 'footer' ? 'border-t' : ''}`}>
      <div className="flex items-center justify-between px-3 py-1 bg-slate-100/70 border-b border-slate-200 text-[10px] text-slate-500 font-medium">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Espaço Cívico Sustentável · Google AdMob
        </span>
        <span className="flex items-center gap-1 text-emerald-700 font-semibold" title="Filtro de Conteúdo Sensível Ativo">
          <ShieldCheck className="w-3 h-3 text-emerald-600" />
          Filtro Ativo: Sem Política ou Apostas (Bets)
        </span>
      </div>

      <div className="p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold text-sm">
            AD
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-800">
              Incentivo à Cidadania & Educação Pública Digital
            </p>
            <p className="text-[11px] text-slate-500 leading-tight">
              Os anúncios cobrem os custos de servidores, proxies de extração de dados abertos e tokens de IA.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[10px] px-2 py-1 rounded bg-slate-200 text-slate-600 font-medium flex items-center gap-1">
            <Info className="w-3 h-3" />
            Isenção Garantida
          </span>
        </div>
      </div>
    </div>
  );
};
