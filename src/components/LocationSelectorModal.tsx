import React, { useState, useMemo } from 'react';
import { LocalizacaoFiltro } from '../types';
import { MUNICIPIOS_ESTADOS_BRASIL, EstadoInfo } from '../data/mockDatabase';
import { MapPin, Search, X, Check, Navigation, Loader2, Sparkles, Building2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  localizacaoAtual: LocalizacaoFiltro;
  onSelectLocalizacao: (loc: LocalizacaoFiltro) => void;
}

// Mapeamento oficial dos Correios de todas as faixas de CEP brasileiras
function resolverUfPorCep(cep: string): { uf: string; municipio: string; nomeEstado: string } {
  const clean = cep.replace(/\D/g, '');
  const prefix2 = parseInt(clean.substring(0, 2), 10);
  const prefix3 = parseInt(clean.substring(0, 3), 10);
  const prefix5 = parseInt(clean.substring(0, 5), 10);

  // 1. Espírito Santo (29000-000 a 29999-999)
  if (prefix2 === 29) {
    let cidade = 'Vitória';
    if (prefix5 >= 29100 && prefix5 <= 29139) cidade = 'Vila Velha';
    else if (prefix5 >= 29160 && prefix5 <= 29179) cidade = 'Serra';
    else if (prefix5 >= 29140 && prefix5 <= 29159) cidade = 'Cariacica';
    else if (prefix5 >= 29300 && prefix5 <= 29329) cidade = 'Cachoeiro de Itapemirim';
    else if (prefix5 >= 29700 && prefix5 <= 29719) cidade = 'Colatina';
    else if (prefix5 >= 29900 && prefix5 <= 29929) cidade = 'Linhares';
    return { uf: 'ES', municipio: cidade, nomeEstado: 'Espírito Santo' };
  }

  // 2. São Paulo (01000 a 19999)
  if (prefix2 >= 1 && prefix2 <= 19) {
    return { uf: 'SP', municipio: 'São Paulo', nomeEstado: 'São Paulo' };
  }

  // 3. Rio de Janeiro (20000 a 28999)
  if (prefix2 >= 20 && prefix2 <= 28) {
    return { uf: 'RJ', municipio: 'Rio de Janeiro', nomeEstado: 'Rio de Janeiro' };
  }

  // 4. Minas Gerais (30000 a 39999)
  if (prefix2 >= 30 && prefix2 <= 39) {
    return { uf: 'MG', municipio: 'Belo Horizonte', nomeEstado: 'Minas Gerais' };
  }

  // 5. Bahia (40000 a 48999)
  if (prefix2 >= 40 && prefix2 <= 48) {
    return { uf: 'BA', municipio: 'Salvador', nomeEstado: 'Bahia' };
  }

  // 6. Sergipe (49000 a 49999)
  if (prefix2 === 49) {
    return { uf: 'SE', municipio: 'Aracaju', nomeEstado: 'Sergipe' };
  }

  // 7. Pernambuco (50000 a 56999)
  if (prefix2 >= 50 && prefix2 <= 56) {
    return { uf: 'PE', municipio: 'Recife', nomeEstado: 'Pernambuco' };
  }

  // 8. Alagoas (57000 a 57999)
  if (prefix2 === 57) {
    return { uf: 'AL', municipio: 'Maceió', nomeEstado: 'Alagoas' };
  }

  // 9. Paraíba (58000 a 58999)
  if (prefix2 === 58) {
    return { uf: 'PB', municipio: 'João Pessoa', nomeEstado: 'Paraíba' };
  }

  // 10. Rio Grande do Norte (59000 a 59999)
  if (prefix2 === 59) {
    return { uf: 'RN', municipio: 'Natal', nomeEstado: 'Rio Grande do Norte' };
  }

  // 11. Ceará (60000 a 63999)
  if (prefix2 >= 60 && prefix2 <= 63) {
    return { uf: 'CE', municipio: 'Fortaleza', nomeEstado: 'Ceará' };
  }

  // 12. Piauí (64000 a 64999)
  if (prefix2 === 64) {
    return { uf: 'PI', municipio: 'Teresina', nomeEstado: 'Piauí' };
  }

  // 13. Maranhão (65000 a 65999)
  if (prefix2 === 65) {
    return { uf: 'MA', municipio: 'São Luís', nomeEstado: 'Maranhão' };
  }

  // 14. Amapá (68900 a 68999)
  if (prefix3 === 689) {
    return { uf: 'AP', municipio: 'Macapá', nomeEstado: 'Amapá' };
  }

  // 15. Pará (66000 a 68899)
  if (prefix2 >= 66 && prefix2 <= 68) {
    return { uf: 'PA', municipio: 'Belém', nomeEstado: 'Pará' };
  }

  // 16. Roraima (69300 a 69399)
  if (prefix3 === 693) {
    return { uf: 'RR', municipio: 'Boa Vista', nomeEstado: 'Roraima' };
  }

  // 17. Acre (69900 a 69999)
  if (prefix3 === 699) {
    return { uf: 'AC', municipio: 'Rio Branco', nomeEstado: 'Acre' };
  }

  // 18. Amazonas (69000 a 69299 e 69400 a 69899)
  if (prefix2 === 69) {
    return { uf: 'AM', municipio: 'Manaus', nomeEstado: 'Amazonas' };
  }

  // 19. Distrito Federal (70000 a 72799 e 73000 a 73699)
  if ((prefix2 >= 70 && prefix2 <= 71) || (prefix3 >= 720 && prefix3 <= 727) || (prefix3 >= 730 && prefix3 <= 736)) {
    return { uf: 'DF', municipio: 'Brasília', nomeEstado: 'Distrito Federal' };
  }

  // 20. Goiás (72800 a 72999 e 73700 a 76799)
  if ((prefix3 >= 728 && prefix3 <= 729) || (prefix2 >= 74 && prefix2 <= 75) || (prefix3 >= 737 && prefix3 <= 739) || (prefix3 >= 760 && prefix3 <= 767)) {
    return { uf: 'GO', municipio: 'Goiânia', nomeEstado: 'Goiás' };
  }

  // 21. Rondônia (76800 a 76999 e 78900 a 78999)
  if ((prefix3 >= 768 && prefix3 <= 769) || (prefix3 >= 789 && prefix3 <= 789)) {
    return { uf: 'RO', municipio: 'Porto Velho', nomeEstado: 'Rondônia' };
  }

  // 22. Tocantins (77000 a 77999)
  if (prefix2 === 77) {
    return { uf: 'TO', municipio: 'Palmas', nomeEstado: 'Tocantins' };
  }

  // 23. Mato Grosso (78000 a 78899)
  if (prefix2 === 78) {
    return { uf: 'MT', municipio: 'Cuiabá', nomeEstado: 'Mato Grosso' };
  }

  // 24. Mato Grosso do Sul (79000 a 79999)
  if (prefix2 === 79) {
    return { uf: 'MS', municipio: 'Campo Grande', nomeEstado: 'Mato Grosso do Sul' };
  }

  // 25. Paraná (80000 a 87999)
  if (prefix2 >= 80 && prefix2 <= 87) {
    return { uf: 'PR', municipio: 'Curitiba', nomeEstado: 'Paraná' };
  }

  // 26. Santa Catarina (88000 a 89999)
  if (prefix2 >= 88 && prefix2 <= 89) {
    return { uf: 'SC', municipio: 'Florianópolis', nomeEstado: 'Santa Catarina' };
  }

  // 27. Rio Grande do Sul (90000 a 99999)
  if (prefix2 >= 90 && prefix2 <= 99) {
    return { uf: 'RS', municipio: 'Porto Alegre', nomeEstado: 'Rio Grande do Sul' };
  }

  return { uf: 'ES', municipio: 'Vitória', nomeEstado: 'Espírito Santo' };
}

export const LocationSelectorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  localizacaoAtual,
  onSelectLocalizacao,
}) => {
  const [cepInput, setCepInput] = useState(localizacaoAtual.cep || '');
  const [erroCep, setErroCep] = useState('');
  const [buscandoCep, setBuscandoCep] = useState(false);
  const [buscaEstado, setBuscaEstado] = useState('');
  const [regiaoFiltro, setRegiaoFiltro] = useState<string>('Todas');

  const regioes = ['Todas', 'Sudeste', 'Sul', 'Nordeste', 'Centro-Oeste', 'Norte'];

  const estadosFiltrados = useMemo(() => {
    return MUNICIPIOS_ESTADOS_BRASIL.filter((est) => {
      const matchBusca =
        est.nomeEstado.toLowerCase().includes(buscaEstado.toLowerCase()) ||
        est.cidade.toLowerCase().includes(buscaEstado.toLowerCase()) ||
        est.estado.toLowerCase().includes(buscaEstado.toLowerCase());

      const matchRegiao = regiaoFiltro === 'Todas' || est.regiao === regiaoFiltro;

      return matchBusca && matchRegiao;
    });
  }, [buscaEstado, regiaoFiltro]);

  if (!isOpen) return null;

  const handleBuscarCep = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCep = cepInput.replace(/\D/g, '');
    if (cleanCep.length !== 8) {
      setErroCep('Digite um CEP válido com 8 números (ex: 29010-000 ou 01310-100).');
      return;
    }

    setBuscandoCep(true);
    setErroCep('');

    try {
      // 1. Tentar consulta em tempo real no ViaCEP com timeout rápido de 1.8s
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1800);

      const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (!data.erro && data.uf) {
          onSelectLocalizacao({
            cep: cleanCep,
            uf: data.uf,
            municipio: data.localidade || 'Vitória',
          });
          onClose();
          return;
        }
      }
    } catch {
      // Falha de rede ou timeout: recorre à tabela de faixas oficiais dos Correios
    } finally {
      setBuscandoCep(false);
    }

    // 2. Fallback garantido na tabela oficial de faixas de CEP dos Correios
    const fallback = resolverUfPorCep(cleanCep);
    onSelectLocalizacao({
      cep: cleanCep,
      uf: fallback.uf,
      municipio: fallback.municipio,
    });
    onClose();
  };

  const handleSimularGPS = () => {
    // Simula geolocalização do usuário em Vitória - Espírito Santo
    onSelectLocalizacao({
      cep: '29010-000',
      uf: 'ES',
      municipio: 'Vitória',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col p-5 sm:p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-700">
              <MapPin className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900">
                Selecione seu Estado ou CEP
              </h3>
              <p className="text-[11px] text-slate-500">
                Cobertura completa dos 26 estados + Distrito Federal
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulário de Busca por CEP */}
        <div className="mt-4 shrink-0">
          <form onSubmit={handleBuscarCep} className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>Buscar por CEP de Qualquer Cidade do Brasil</span>
              <span className="text-[10px] text-blue-600 font-normal">Ex: 29010-000 (ES)</span>
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={cepInput}
                  onChange={(e) => {
                    setCepInput(e.target.value);
                    setErroCep('');
                  }}
                  placeholder="Digite seu CEP (ex: 29010-000, 29100-000...)"
                  className="w-full bg-slate-100 text-slate-900 text-xs px-3.5 py-2.5 rounded-xl border border-transparent focus:border-blue-500 focus:bg-white focus:outline-hidden font-mono tracking-wider"
                />
              </div>
              <button
                type="submit"
                disabled={buscandoCep}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs flex items-center gap-1.5 shrink-0"
              >
                {buscandoCep ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Buscando...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-3.5 h-3.5" />
                    <span>Localizar</span>
                  </>
                )}
              </button>
            </div>
            {erroCep && <p className="text-[11px] text-red-500 font-medium">{erroCep}</p>}
          </form>

          {/* Botão de GPS / Atalho para Vitória - ES */}
          <div className="mt-3 flex gap-2">
            <button
              onClick={handleSimularGPS}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5 text-emerald-600" />
              <span>Usar GPS (Vitória - ES)</span>
            </button>
          </div>
        </div>

        {/* Divisor */}
        <div className="my-4 border-t border-slate-100 flex items-center justify-between shrink-0">
          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
            Ou escolha entre os 27 Estados do Brasil ({estadosFiltrados.length}):
          </span>
        </div>

        {/* Filtro de Busca de Estados e Abas de Região */}
        <div className="space-y-2 shrink-0 mb-3">
          <input
            type="text"
            placeholder="Filtrar estado por nome, sigla ou capital (ex: Espírito Santo, ES, Vitória)..."
            value={buscaEstado}
            onChange={(e) => setBuscaEstado(e.target.value)}
            className="w-full bg-slate-100 text-slate-900 text-xs px-3 py-2 rounded-xl border border-transparent focus:border-blue-500 focus:bg-white focus:outline-hidden"
          />

          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
            {regioes.map((reg) => (
              <button
                key={reg}
                onClick={() => setRegiaoFiltro(reg)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  regiaoFiltro === reg
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        {/* Lista Completa dos 27 Estados do Brasil */}
        <div className="flex-1 overflow-y-auto pr-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {estadosFiltrados.map((m) => {
              const selecionado = localizacaoAtual.uf === m.estado;
              const isES = m.estado === 'ES';

              return (
                <button
                  key={m.estado}
                  onClick={() => {
                    onSelectLocalizacao({
                      cep: m.cepExemplo,
                      uf: m.estado,
                      municipio: m.cidade,
                    });
                    onClose();
                  }}
                  className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                    selecionado
                      ? 'bg-blue-50 border-blue-500 text-blue-900 shadow-xs'
                      : isES
                      ? 'bg-emerald-50/40 hover:bg-emerald-50 border-emerald-200 text-slate-800'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-xs bg-slate-200/80 text-slate-800 px-1.5 py-0.5 rounded">
                        {m.estado}
                      </span>
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {m.nomeEstado}
                      </p>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                      Capital: <span className="text-slate-700 font-medium">{m.cidade}</span> · {m.regiao}
                    </p>
                  </div>
                  {selecionado ? (
                    <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  ) : (
                    <span className="text-[10px] text-slate-400 font-mono shrink-0">
                      {m.cepExemplo.substring(0, 5)}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {estadosFiltrados.length === 0 && (
            <p className="text-xs text-slate-500 text-center py-6">
              Nenhum estado localizado com o termo digitado.
            </p>
          )}
        </div>

        {/* Rodapé com Status Atual */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between items-center text-xs shrink-0">
          <span className="text-[11px] text-slate-500 truncate">
            {localizacaoAtual.uf ? (
              <>
                Local atual: <strong className="text-slate-800">{localizacaoAtual.municipio} - {localizacaoAtual.uf}</strong>
              </>
            ) : (
              'Mostrando todos os representantes'
            )}
          </span>
          {localizacaoAtual.uf && (
            <button
              onClick={() => {
                onSelectLocalizacao({});
                onClose();
              }}
              className="text-xs font-semibold text-red-600 hover:text-red-700 cursor-pointer shrink-0"
            >
              Ver Brasil todo
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
