import React from 'react';
import { UserCheck, Vote, ShieldCheck } from 'lucide-react';

interface Props {
  nomeUrna: string;
  siglaPartido: string;
  numeroUrna?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBallotBadge?: boolean;
}

// Gera iniciais limpas do nome de urna (ex: "Tabata Amaral" -> "TA", "Lula" -> "LU")
function extrairIniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/);
  if (partes.length === 1) {
    return partes[0].substring(0, 2).toUpperCase();
  }
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}

// Gera um tom de gradiente institucional consistente pelo partido
function obterGradientePartido(sigla: string): string {
  const s = sigla.toUpperCase();
  if (s.includes('PT') || s.includes('PSOL') || s.includes('PC')) {
    return 'from-rose-700 via-red-800 to-slate-900 text-white';
  }
  if (s.includes('PL') || s.includes('PP') || s.includes('REPUBLICANOS')) {
    return 'from-blue-700 via-indigo-900 to-slate-900 text-white';
  }
  if (s.includes('PSB') || s.includes('PDT') || s.includes('REDE')) {
    return 'from-amber-600 via-orange-800 to-slate-900 text-white';
  }
  if (s.includes('PSD') || s.includes('MDB') || s.includes('UNIÃO')) {
    return 'from-teal-700 via-emerald-800 to-slate-900 text-white';
  }
  if (s.includes('NOVO') || s.includes('PODEMOS')) {
    return 'from-orange-600 via-amber-800 to-slate-900 text-white';
  }
  return 'from-slate-700 via-slate-800 to-slate-900 text-white';
}

export const CandidateAvatar: React.FC<Props> = ({
  nomeUrna,
  siglaPartido,
  numeroUrna,
  size = 'md',
  className = '',
  showBallotBadge = true,
}) => {
  const iniciais = extrairIniciais(nomeUrna);
  const gradiente = obterGradientePartido(siglaPartido);

  const sizeClasses = {
    sm: 'w-11 h-11 text-xs rounded-xl',
    md: 'w-16 h-16 text-base rounded-2xl',
    lg: 'w-20 h-20 sm:w-24 sm:h-24 text-xl sm:text-2xl rounded-3xl',
    xl: 'w-28 h-28 text-3xl rounded-3xl',
  };

  const badgeSizeClasses = {
    sm: 'text-[9px] px-1 py-0.2 -bottom-1 -right-1',
    md: 'text-[10px] px-1.5 py-0.5 -bottom-1 -right-1',
    lg: 'text-xs px-2 py-0.5 -bottom-1.5 -right-1.5',
    xl: 'text-sm px-2.5 py-1 -bottom-2 -right-2',
  };

  return (
    <div
      className={`relative shrink-0 flex items-center justify-center font-black tracking-wider select-none bg-linear-to-br ${gradiente} border-2 border-white/20 shadow-md ${sizeClasses[size]} ${className}`}
      title={`Representação institucional de ${nomeUrna} (${siglaPartido}) - Sem fotografia para salvaguarda de direitos de imagem`}
    >
      <div className="flex flex-col items-center justify-center">
        <span className="font-mono">{iniciais}</span>
        {size !== 'sm' && (
          <span className="text-[9px] uppercase tracking-widest font-semibold opacity-75 leading-none mt-0.5">
            {siglaPartido}
          </span>
        )}
      </div>

      {showBallotBadge && numeroUrna && (
        <span
          className={`absolute font-mono font-bold bg-slate-950 text-emerald-400 border border-slate-700 rounded-md shadow-xs flex items-center gap-0.5 ${badgeSizeClasses[size]}`}
          title={`Número eleitoral oficial: ${numeroUrna}`}
        >
          <Vote className="w-2.5 h-2.5 text-emerald-400 inline-block" />
          {numeroUrna}
        </span>
      )}
    </div>
  );
};
