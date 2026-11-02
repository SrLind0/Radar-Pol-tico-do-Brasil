import React, { useState } from 'react';
import { buscarTermoGlossario } from '../data/glossaryData';
import { HelpCircle, X, BookOpen } from 'lucide-react';

interface Props {
  termo: string;
  children?: React.ReactNode;
}

export const InteractiveGlossarySpan: React.FC<Props> = ({ termo, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const info = buscarTermoGlossario(termo);

  if (!info) {
    return <span>{children || termo}</span>;
  }

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        className="inline-flex items-center gap-0.5 text-blue-600 hover:text-blue-800 font-medium underline decoration-dotted decoration-blue-500 underline-offset-4 cursor-pointer transition-colors"
        title="Toque para ver a explicação simples"
      >
        <span>{children || termo}</span>
        <HelpCircle className="w-3.5 h-3.5 text-blue-500 inline-block opacity-75" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
        >
          <div
            className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
                  <BookOpen className="w-4 h-4" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                  Glossário Cidadão
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="pt-3">
              <h4 className="text-base font-bold text-slate-900">{info.termo}</h4>
              <p className="mt-2 text-sm text-slate-700 font-medium leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                "{info.definicaoSimples}"
              </p>
              <div className="mt-3 text-xs text-slate-500">
                <strong className="text-slate-700">Exemplo prático:</strong> {info.exemploPratico}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="text-xs font-semibold px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
