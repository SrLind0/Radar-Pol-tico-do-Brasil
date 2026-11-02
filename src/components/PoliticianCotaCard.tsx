import React, { useState, useMemo } from 'react';
import { Politico } from '../types';
import { obterDadosCotaPolitico } from '../data/cotaData';
import { CotaParlamentarResumo, MesCotaParlamentar } from '../types/cota';
import { InteractiveGlossarySpan } from './InteractiveGlossarySpan';
import {
  BarChart3,
  DollarSign,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  Receipt,
  ExternalLink,
  ChevronDown,
  Info,
  ShieldCheck,
  Megaphone,
  Plane,
  Car,
  FileSearch,
  Building2,
  Mail,
  HelpCircle,
  FileText
} from 'lucide-react';

interface Props {
  politico: Politico;
}

export const PoliticianCotaCard: React.FC<Props> = ({ politico }) => {
  const cotaData: CotaParlamentarResumo = useMemo(() => {
    return obterDadosCotaPolitico(politico);
  }, [politico]);

  // Mês selecionado no histórico navegável (1 a 12, padrão mês mais recente com dados: 3 = Março)
  const [mesSelecionado, setMesSelecionado] = useState<number>(3);
  const [isDropdownMesAberto, setIsDropdownMesAberto] = useState<boolean>(false);

  // Mês ativo
  const mesAtivo: MesCotaParlamentar | undefined = useMemo(() => {
    return cotaData.meses.find((m) => m.mes === mesSelecionado) || cotaData.meses[0];
  }, [cotaData, mesSelecionado]);

  // Meses que ultrapassaram 90% do teto
  const mesesComAlerta90 = useMemo(() => {
    return cotaData.meses.filter((m) => m.atingiuAlerta90);
  }, [cotaData]);

  // Se o cargo não for elegível à cota parlamentar (ex: Executivo ou inativo)
  if (!cotaData.elegivel) {
    return (
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4 text-center">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200/80 flex items-center justify-center mx-auto shadow-xs">
          <Building2 className="w-7 h-7" />
        </div>
        <div className="max-w-md mx-auto space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100/80 text-amber-900 border border-amber-200">
            Regra Oficial de Benefício
          </span>
          <h4 className="font-black text-base sm:text-lg text-slate-900 tracking-tight">
            {cotaData.motivoIneligibilidade || 'Cargo do Poder Executivo — Não possui direito à Cota Parlamentar (CEAP)'}
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            A Cota para o Exercício da Atividade Parlamentar (CEAP/CEAPS) é uma verba indenizatória restrita a <strong>Deputados Federais</strong> e <strong>Senadores</strong> no exercício do mandato legislativo.
          </p>
          <p className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            Chefes do Poder Executivo (Presidente, Governadores e Prefeitos) e parlamentares licenciados <strong>não utilizam e não possuem cota parlamentar</strong>.
          </p>
        </div>
        <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400">
          Fundamentação Legal: Ato da Mesa da Câmara dos Deputados nº 43/2009 · Ato da Comissão Diretora do Senado Federal nº 4/2014
        </div>
      </div>
    );
  }

  const renderIconeCategoria = (icone: string, classe: string = 'w-4 h-4') => {
    switch (icone) {
      case 'Megaphone':
        return <Megaphone className={classe} />;
      case 'Plane':
        return <Plane className={classe} />;
      case 'Car':
        return <Car className={classe} />;
      case 'FileSearch':
        return <FileSearch className={classe} />;
      case 'Building2':
        return <Building2 className={classe} />;
      case 'Mail':
        return <Mail className={classe} />;
      default:
        return <Receipt className={classe} />;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-5">
      {/* Cabeçalho do Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-blue-50 text-blue-700">
              <BarChart3 className="w-4 h-4" />
            </span>
            <h4 className="font-bold text-sm sm:text-base text-slate-900">
              Gasto com <InteractiveGlossarySpan termo="Cota Parlamentar">Cota Parlamentar</InteractiveGlossarySpan> (CEAP / CEAPS)
            </h4>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Reembolso oficial por notas fiscais no exercício do mandato de {politico.nomeUrna}. Teto legal regulamentado pelo Ato da Mesa da {politico.cargo.includes('Senad') ? 'Mesa do Senado' : 'Câmara dos Deputados'}.
          </p>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-center">
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            Teto {cotaData.uf}: R$ {cotaData.limiteMensalUF.toLocaleString('pt-BR')}/mês
          </span>
        </div>
      </div>

      {/* 4 Cards de Métricas Principais (KPIs) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-200">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Total Gasto (Ano)
          </span>
          <span className="text-base sm:text-lg font-black text-slate-900 block mt-0.5 font-mono">
            R$ {cotaData.totalAnoAtual.toLocaleString('pt-BR')}
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5 block">
            Ano Referência 2026
          </span>
        </div>

        <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-200">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Média Mensal
          </span>
          <span className="text-base sm:text-lg font-black text-blue-700 block mt-0.5 font-mono">
            R$ {cotaData.mediaMensalAno.toLocaleString('pt-BR')}
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5 block">
            Consumo médio / mês
          </span>
        </div>

        <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-200">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Uso do Limite Mensal
          </span>
          <span className={`text-base sm:text-lg font-black block mt-0.5 font-mono ${
            cotaData.percentualMedioUsoLimite >= 90
              ? 'text-amber-600'
              : cotaData.percentualMedioUsoLimite <= 75
              ? 'text-emerald-700'
              : 'text-slate-800'
          }`}>
            {cotaData.percentualMedioUsoLimite.toFixed(1)}%
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5 block">
            do teto legal da UF ({cotaData.uf})
          </span>
        </div>

        <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-200">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Total no Mandato
          </span>
          <span className="text-base sm:text-lg font-black text-slate-900 block mt-0.5 font-mono">
            R$ {(cotaData.totalMandato / 1000000).toFixed(2)}M
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5 block">
            Mandato 4 Anos (Estimado)
          </span>
        </div>
      </div>

      {/* SEÇÃO DE BENCHMARK & COMPARATIVO ESTADUAL / PARTIDÁRIO */}
      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <h5 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
            Benchmarking de Gastos: Político vs. Bancada da UF & Partido
          </h5>
          <span className="text-[10px] font-semibold text-slate-500">
            Média da Casa ({politico.cargo})
          </span>
        </div>

        {/* Barra 1: Gasto do Político */}
        <div>
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-slate-800 font-bold">{politico.nomeUrna}</span>
            <span className="font-mono text-blue-700 font-bold">
              R$ {cotaData.totalAnoAtual.toLocaleString('pt-BR')} ({cotaData.percentualMedioUsoLimite}% do teto)
            </span>
          </div>
          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                cotaData.percentualMedioUsoLimite >= 90
                  ? 'bg-amber-500'
                  : 'bg-blue-600'
              }`}
              style={{ width: `${Math.min(100, cotaData.percentualMedioUsoLimite)}%` }}
            />
          </div>
        </div>

        {/* Barra 2: Média dos Colegas da mesma UF */}
        <div>
          <div className="flex justify-between text-xs font-semibold mb-1 text-slate-600">
            <span>Média da Bancada de {cotaData.uf}</span>
            <span className="font-mono text-slate-700">
              R$ {cotaData.comparativo.mediaUfTotal.toLocaleString('pt-BR')}
            </span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-slate-400 rounded-full"
              style={{
                width: `${Math.min(100, (cotaData.comparativo.mediaUfTotal / (cotaData.limiteMensalUF * 12)) * 100)}%`,
              }}
            />
          </div>
        </div>

        {/* Barra 3: Média do Partido Nacional */}
        <div>
          <div className="flex justify-between text-xs font-semibold mb-1 text-slate-600">
            <span>Média Nacional do {cotaData.siglaPartido}</span>
            <span className="font-mono text-slate-700">
              R$ {cotaData.comparativo.mediaPartidoTotal.toLocaleString('pt-BR')}
            </span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-slate-400 rounded-full"
              style={{
                width: `${Math.min(100, (cotaData.comparativo.mediaPartidoTotal / (cotaData.limiteMensalUF * 12)) * 100)}%`,
              }}
            />
          </div>
        </div>

        {/* Conclusão Factual e Neutra em Linguagem Simples */}
        <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs">
          {cotaData.comparativo.diferencaUfPercentual < 0 ? (
            <p className="text-emerald-800 font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                O parlamentar utilizou{' '}
                <strong>{Math.abs(cotaData.comparativo.diferencaUfPercentual).toFixed(1)}% a menos</strong> que a média dos deputados/senadores de {cotaData.uf}.
              </span>
            </p>
          ) : (
            <p className="text-slate-700 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                O parlamentar utilizou{' '}
                <strong>+{cotaData.comparativo.diferencaUfPercentual.toFixed(1)}%</strong> em relação à média de {cotaData.uf}, respeitando integralmente o teto legal permitido por lei.
              </span>
            </p>
          )}
        </div>
      </div>

      {/* SEÇÃO: HISTÓRICO MENSAL NAVEGÁVEL & ALERTA DE >90% */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h5 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              Histórico Mensal Navegável ({cotaData.anoReferencia})
            </h5>
            <p className="text-[11px] text-slate-500">
              Selecione qualquer mês para inspecionar o consumo individual da cota parlamentar.
            </p>
          </div>

          {/* Seletor Dropdown do Mês */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownMesAberto(!isDropdownMesAberto)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-300 hover:border-blue-500 text-xs font-bold text-slate-800 transition cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>{mesAtivo.nomeMes}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isDropdownMesAberto ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownMesAberto && (
              <div className="absolute right-0 top-full mt-1.5 z-40 bg-white border border-slate-200 rounded-xl shadow-lg p-2 w-52 max-h-56 overflow-y-auto space-y-1">
                {cotaData.meses.map((m) => (
                  <button
                    key={m.mes}
                    type="button"
                    onClick={() => {
                      setMesSelecionado(m.mes);
                      setIsDropdownMesAberto(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center justify-between cursor-pointer ${
                      m.mes === mesSelecionado
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{m.nomeMes}</span>
                    {m.atingiuAlerta90 && (
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                        m.mes === mesSelecionado ? 'bg-amber-400 text-amber-950' : 'bg-amber-100 text-amber-800'
                      }`}>
                        &gt;90%
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mini Gráfico de Barras dos 12 Meses */}
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5 pt-1">
          {cotaData.meses.map((m) => {
            const isSelected = m.mes === mesSelecionado;
            const alturaPct = Math.round((m.valorGasto / m.limiteMensal) * 100);

            return (
              <button
                key={m.mes}
                type="button"
                onClick={() => setMesSelecionado(m.mes)}
                className={`p-1.5 rounded-lg border text-center transition flex flex-col items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-600/20'
                    : 'bg-slate-50/60 hover:bg-slate-100 border-slate-200'
                }`}
                title={`${m.nomeMes}: R$ ${m.valorGasto.toLocaleString('pt-BR')} (${m.percentualUtilizado}% do teto)`}
              >
                <span className="text-[10px] font-bold text-slate-700">
                  {m.nomeMes.slice(0, 3)}
                </span>
                <div className="w-full bg-slate-200 h-10 rounded my-1 flex items-end overflow-hidden p-0.5">
                  <div
                    className={`w-full rounded transition-all duration-300 ${
                      m.atingiuAlerta90
                        ? 'bg-amber-500'
                        : isSelected
                        ? 'bg-blue-600'
                        : 'bg-slate-400'
                    }`}
                    style={{ height: `${Math.min(100, alturaPct)}%` }}
                  />
                </div>
                <span className={`text-[9px] font-mono font-bold ${
                  m.atingiuAlerta90 ? 'text-amber-700' : 'text-slate-600'
                }`}>
                  {m.percentualUtilizado.toFixed(0)}%
                </span>
              </button>
            );
          })}
        </div>

        {/* Alerta de Consumo > 90% */}
        {mesAtivo.atingiuAlerta90 ? (
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">Aviso de Limite Quase Esgotado em {mesAtivo.nomeMes}:</strong>{' '}
              O parlamentar consumiu <strong>{mesAtivo.percentualUtilizado}%</strong> da cota permitida (R$ {mesAtivo.valorGasto.toLocaleString('pt-BR')} de R$ {mesAtivo.limiteMensal.toLocaleString('pt-BR')}).
              A despesa permaneceu dentro da margem estipulada pelas normas da casa legislativa.
            </div>
          </div>
        ) : (
          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Consumo em <strong>{mesAtivo.nomeMes}</strong>: R$ {mesAtivo.valorGasto.toLocaleString('pt-BR')} ({mesAtivo.percentualUtilizado}% do teto legal).
              </span>
            </div>
            <span className="font-mono text-[11px] text-slate-500">
              Saldo Restante: R$ {(mesAtivo.limiteMensal - mesAtivo.valorGasto).toLocaleString('pt-BR')}
            </span>
          </div>
        )}
      </div>

      {/* SEÇÃO: DETALHAMENTO DOS GASTOS POR CATEGORIA */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <h5 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <Receipt className="w-3.5 h-3.5 text-blue-600" />
            Detalhamento da Cota por Categoria de Gasto
          </h5>
          <span className="text-[11px] text-slate-500">
            Valores Acumulados no Ano
          </span>
        </div>

        <div className="space-y-2">
          {cotaData.categorias.map((cat, idx) => (
            <div key={idx} className="p-2.5 rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center justify-between text-xs mb-1">
                <div className="flex items-center gap-2">
                  <span
                    className="p-1 rounded-lg text-white"
                    style={{ backgroundColor: cat.cor }}
                  >
                    {renderIconeCategoria(cat.icone, 'w-3 h-3')}
                  </span>
                  <span className="font-semibold text-slate-800">{cat.categoria}</span>
                </div>
                <div className="text-right font-mono">
                  <span className="font-bold text-slate-900">
                    R$ {cat.valor.toLocaleString('pt-BR')}
                  </span>
                  <span className="text-[11px] text-slate-500 ml-1.5">
                    ({cat.percentual}%)
                  </span>
                </div>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: cat.cor,
                    width: `${cat.percentual}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SEÇÃO: ÚLTIMAS NOTAS FISCAIS E COMPROVANTES AUDITADOS */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <h5 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Comprovantes e Notas Fiscais Auditadas no Portal da Transparência
            </h5>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Sincronizado diretamente com a API dos Dados Abertos do Congresso Nacional.
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-slate-50/40">
          {cotaData.despesasRecentes.map((nf) => (
            <div
              key={nf.id}
              className="p-3 bg-white hover:bg-slate-50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 truncate">
                    {nf.fornecedor}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-mono shrink-0">
                    {nf.numeroDocumento}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-slate-500 mt-0.5">
                  <span>CNPJ: {nf.cnpjCpf}</span>
                  <span>·</span>
                  <span>{nf.categoria}</span>
                  <span>·</span>
                  <span>Data: {new Date(nf.data).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
                <span className="font-mono font-bold text-slate-900 text-sm">
                  R$ {nf.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
                <a
                  href={nf.urlDocumento || 'https://dadosabertos.camara.leg.br'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-bold transition"
                  title="Auditar nota fiscal no portal oficial"
                >
                  <FileText className="w-3 h-3" />
                  Ver NF
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
