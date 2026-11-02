import React from 'react';
import { Wifi, Battery, Signal, ArrowLeft } from 'lucide-react';

interface Props {
  isMobileFrame: boolean;
  onCloseMobileFrame: () => void;
  children: React.ReactNode;
}

export const MobileFrame: React.FC<Props> = ({
  isMobileFrame,
  onCloseMobileFrame,
  children,
}) => {
  if (!isMobileFrame) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-950 py-4 sm:py-8 px-2 flex flex-col items-center justify-center">
      <div className="mb-3 flex items-center justify-between w-full max-w-[430px] px-2 text-xs text-slate-400">
        <span className="flex items-center gap-1.5 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Simulador Mobile (iOS / Android)
        </span>
        <button
          onClick={onCloseMobileFrame}
          className="hover:text-white underline cursor-pointer"
        >
          Sair do Modo Celular
        </button>
      </div>

      {/* Frame do Smartphone */}
      <div className="w-full max-w-[420px] h-[870px] bg-slate-900 rounded-[50px] p-3 shadow-2xl border-4 border-slate-700 relative flex flex-col overflow-hidden ring-12 ring-slate-800">
        {/* Notch / Dynamic Island */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-950 rounded-full z-40 flex items-center justify-between px-3">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-950/40"></div>
        </div>

        {/* Status Bar */}
        <div className="h-9 px-6 pt-1 flex items-center justify-between text-[11px] text-white font-semibold z-30 shrink-0">
          <span>09:41</span>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Screen Content */}
        <div className="flex-1 bg-slate-100 rounded-[38px] overflow-y-auto overflow-x-hidden relative scrollbar-thin">
          {children}
        </div>

        {/* Home Indicator Bar */}
        <div className="h-5 flex items-center justify-center shrink-0">
          <div className="w-32 h-1 bg-slate-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
