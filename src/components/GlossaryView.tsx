import React, { useState } from 'react';
import { GLOSSARIO_TERMOS } from '../data/glossaryData';
import { BookOpen, Search, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

export const GlossaryView: React.FC = () => {
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>('Todas');

  const categorias = ['Todas', 'Legislativo', 'Jurídico', 'Orçamento', 'Eleitoral'];

  const termosFiltrados = GLOSSARIO_TERMOS.filter((t) => {
    const matchBusca =
      t.termo.toLowerCase().includes(busca.toLowerCase()) ||
      t.definicaoSimples.toLowerCase().includes(busca.toLowerCase()) ||
      t.exemploPratico.toLowerCase().includes(busca.toLowerCase());

    const matchCategoria =
      categoriaAtiva === 'Todas' || t.categoria === categoriaAtiva;

    return matchBusca && matchCategoria;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="p-2.5 rounded-2xl bg-blue-50 text-blue-700">
              <BookOpen className="w-6 h-6" />
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Glossário Cidadão em Linguagem Simples
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Tradução dos principais termos legislativos, jurídicos e orçamentários para que qualquer pessoa compreenda a política.
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200 w-fit flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-blue-600" />
            Padrão Plain Language
          </span>
        </div>

        {/* Busca e Categorias */}
        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar termo ou expressão (ex: PEC, Quórum, Trânsito em Julgado)..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full bg-slate-100 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-transparent focus:border-blue-500 focus:bg-white focus:outline-hidden"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaAtiva(cat)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  categoriaAtiva === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid de Cards de Termos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {termosFiltrados.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {item.categoria}
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-2">
                {item.termo}
              </h3>

              <div className="p-3 bg-blue-50/50 rounded-2xl border border-blue-100/60 text-xs text-slate-800 leading-relaxed font-medium">
                "{item.definicaoSimples}"
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
              <strong className="text-slate-700">Como funciona na prática:</strong> {item.exemploPratico}
            </div>
          </div>
        ))}
      </div>

      {termosFiltrados.length === 0 && (
        <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center text-slate-500">
          Nenhum termo encontrado para sua busca. Tente buscar por termos como "PEC", "Quórum" ou "Emenda".
        </div>
      )}
    </div>
  );
};
