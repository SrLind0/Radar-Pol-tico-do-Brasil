import React, { useState } from 'react';
import { Politico } from '../types';
import {
  Award,
  DollarSign,
  Scale,
  Percent,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  GitCompare,
  Vote
} from 'lucide-react';
import { CandidateAvatar } from './CandidateAvatar';
import { PoliticianChatModal } from './PoliticianChatModal';
import { getGastoCotaAnualPolitico } from '../data/cotaData';

interface Props {
  politico: Politico;
  onOpenDetail: (politico: Politico) => void;
  onToggleCompare: (politico: Politico) => void;
  isCompared: boolean;
}

export const PoliticianCard: React.FC<Props> = ({
  politico,
  onOpenDetail,
  onToggleCompare,
  isCompared,
}) => {
  const [chatOpen, setChatOpen] = useState(false);

  const temProcessosAtivos = politico.processosJudiciais.some(
    p => p.status === 'Investigado' || p.status === 'Réu'
  );

  const infoCota = getGastoCotaAnualPolitico(politico);

  return (
    <>
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-200 overflow-hidden flex flex-col group">
        
        {/* Topo do Card com Avatar Institucional, Nome e Partido */}
        <div className="p-4 sm:p-5 flex items-start gap-3.5 relative">
          <CandidateAvatar
            nomeUrna={politico.nomeUrna}
            siglaPartido={politico.siglaPartido}
            numeroUrna={politico.numeroUrna}
            size="md"
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                {politico.cargo}
              </span>
              <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                UF: {politico.uf}
              </span>
              {politico.candidaturaEleitoral?.disputando && (
                <span className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200/60 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Vote className="w-2.5 h-2.5 text-amber-600" />
                  Eleição {politico.candidaturaEleitoral.esfera}
                </span>
              )}
            </div>

            <h3
              onClick={() => onOpenDetail(politico)}
              className="text-base font-bold text-slate-900 mt-1 cursor-pointer hover:text-blue-600 transition-colors truncate"
              title={politico.nomeUrna}
            >
              {politico.nomeUrna}
            </h3>
            <p className="text-[11px] text-slate-500 truncate" title={politico.nomeCivil}>
              {politico.nomeCivil}
            </p>

            <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-600">
              <ShieldCheck className="w-3 h-3 text-emerald-500 shrink-0" />
              <span className="truncate">Auditoria Oficial: {politico.auditoriaTimestamp}</span>
            </div>
          </div>
        </div>

        {/* Grade de 4 Métricas Objetivas (Sem viés ideológico) */}
        <div className="grid grid-cols-2 gap-2 px-4 pb-4">
          {/* Métrica 1: Leis Sancionadas */}
          <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Award className="w-3 h-3 text-emerald-600" /> Virou Lei
            </span>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-base font-black text-slate-900">
                {politico.metricas.projetosViraramLeiTotal}
              </span>
              <span className="text-[10px] text-slate-400">
                de {politico.metricas.projetosApresentadosTotal} PLs
              </span>
            </div>
          </div>

          {/* Métrica 2: Presença em Plenário */}
          <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Percent className="w-3 h-3 text-blue-600" /> Presença
            </span>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-base font-black text-slate-900">
                {politico.metricas.presencaPlenarioPorcentagem}%
              </span>
              <span className="text-[10px] text-slate-400">em votações</span>
            </div>
          </div>

          {/* Métrica 3: Gastos com Cota Parlamentar por Ano */}
          <div
            className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between"
            title={`Cota Parlamentar: ${infoCota.valorFormatado} / ano (${infoCota.subtitulo})`}
          >
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-indigo-600" /> Cota Gasta / Ano
            </span>
            <div className="mt-1">
              <div className="flex items-baseline gap-1">
                <span className="text-xs font-black text-slate-900 font-mono">
                  {infoCota.valorCompacto}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold">/ano</span>
              </div>
              <span className="text-[9px] block text-slate-500 font-medium truncate mt-0.5">
                {infoCota.subtitulo}
              </span>
            </div>
          </div>

          {/* Métrica 4: Situação na Justiça */}
          <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Scale className="w-3 h-3 text-slate-600" /> Justiça
            </span>
            <div className="mt-1">
              {temProcessosAtivos ? (
                <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded flex items-center gap-0.5 w-fit">
                  <AlertTriangle className="w-2.5 h-2.5" />
                  {politico.processosJudiciais[0]?.status}
                </span>
              ) : (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded flex items-center gap-0.5 w-fit">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  Sem registros
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Rodapé do Card com Ações */}
        <div className="mt-auto px-4 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
          <button
            onClick={() => onToggleCompare(politico)}
            className={`text-xs font-semibold px-2.5 py-1.5 rounded-xl border flex items-center gap-1 transition-colors cursor-pointer ${
              isCompared
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900'
            }`}
            title="Comparar com outro político"
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isCompared ? 'Comparando' : 'Comparar'}</span>
          </button>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setChatOpen(true)}
              className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer"
              title="Perguntar sobre este Político"
            >
              <MessageSquare className="w-4 h-4" />
            </button>

            <button
              onClick={() => onOpenDetail(politico)}
              className="text-xs font-bold text-slate-900 hover:text-blue-600 bg-white hover:bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 flex items-center gap-1 transition-all cursor-pointer shadow-xs"
            >
              Ficha Completa
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      <PoliticianChatModal
        politico={politico}
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
      />
    </>
  );
};
