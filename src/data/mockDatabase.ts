import { Politico } from '../types';
import { EXECUTIVO_FEDERAL } from './politicos/executivoFederal';
import { GOVERNADORES } from './politicos/governadores';
import { SENADORES } from './politicos/senadores';
import { DEPUTADOS_FEDERAIS } from './politicos/deputadosFederais';
import { DEPUTADOS_ESTADUAIS } from './politicos/deputadosEstaduais';
import { MUNICIPAIS } from './politicos/municipais';

// Base consolidada com todos os políticos brasileiros em exercício e em disputa eleitoral
export const POLITICOS_DATABASE: Politico[] = [
  ...EXECUTIVO_FEDERAL,
  ...GOVERNADORES,
  ...SENADORES,
  ...DEPUTADOS_FEDERAIS,
  ...DEPUTADOS_ESTADUAIS,
  ...MUNICIPAIS,
];

export interface EstadoInfo {
  estado: string; // Sigla UF (ex: 'ES')
  nomeEstado: string; // Nome completo (ex: 'Espírito Santo')
  cidade: string; // Capital de referência (ex: 'Vitória')
  cepExemplo: string; // CEP de referência (ex: '29010-000')
  regiao: 'Sudeste' | 'Sul' | 'Nordeste' | 'Centro-Oeste' | 'Norte';
}

export const MUNICIPIOS_ESTADOS_BRASIL: EstadoInfo[] = [
  // SUDESTE
  { estado: 'ES', nomeEstado: 'Espírito Santo', cidade: 'Vitória', cepExemplo: '29010-000', regiao: 'Sudeste' },
  { estado: 'MG', nomeEstado: 'Minas Gerais', cidade: 'Belo Horizonte', cepExemplo: '30130-110', regiao: 'Sudeste' },
  { estado: 'RJ', nomeEstado: 'Rio de Janeiro', cidade: 'Rio de Janeiro', cepExemplo: '20040-002', regiao: 'Sudeste' },
  { estado: 'SP', nomeEstado: 'São Paulo', cidade: 'São Paulo', cepExemplo: '01310-100', regiao: 'Sudeste' },

  // SUL
  { estado: 'PR', nomeEstado: 'Paraná', cidade: 'Curitiba', cepExemplo: '80020-320', regiao: 'Sul' },
  { estado: 'RS', nomeEstado: 'Rio Grande do Sul', cidade: 'Porto Alegre', cepExemplo: '90010-150', regiao: 'Sul' },
  { estado: 'SC', nomeEstado: 'Santa Catarina', cidade: 'Florianópolis', cepExemplo: '88010-000', regiao: 'Sul' },

  // NORDESTE
  { estado: 'AL', nomeEstado: 'Alagoas', cidade: 'Maceió', cepExemplo: '57020-050', regiao: 'Nordeste' },
  { estado: 'BA', nomeEstado: 'Bahia', cidade: 'Salvador', cepExemplo: '40020-000', regiao: 'Nordeste' },
  { estado: 'CE', nomeEstado: 'Ceará', cidade: 'Fortaleza', cepExemplo: '60025-000', regiao: 'Nordeste' },
  { estado: 'MA', nomeEstado: 'Maranhão', cidade: 'São Luís', cepExemplo: '65010-000', regiao: 'Nordeste' },
  { estado: 'PB', nomeEstado: 'Paraíba', cidade: 'João Pessoa', cepExemplo: '58010-000', regiao: 'Nordeste' },
  { estado: 'PE', nomeEstado: 'Pernambuco', cidade: 'Recife', cepExemplo: '50010-000', regiao: 'Nordeste' },
  { estado: 'PI', nomeEstado: 'Piauí', cidade: 'Teresina', cepExemplo: '64000-000', regiao: 'Nordeste' },
  { estado: 'RN', nomeEstado: 'Rio Grande do Norte', cidade: 'Natal', cepExemplo: '59010-000', regiao: 'Nordeste' },
  { estado: 'SE', nomeEstado: 'Sergipe', cidade: 'Aracaju', cepExemplo: '49010-000', regiao: 'Nordeste' },

  // CENTRO-OESTE
  { estado: 'DF', nomeEstado: 'Distrito Federal', cidade: 'Brasília', cepExemplo: '70160-900', regiao: 'Centro-Oeste' },
  { estado: 'GO', nomeEstado: 'Goiás', cidade: 'Goiânia', cepExemplo: '74003-010', regiao: 'Centro-Oeste' },
  { estado: 'MT', nomeEstado: 'Mato Grosso', cidade: 'Cuiabá', cepExemplo: '78005-000', regiao: 'Centro-Oeste' },
  { estado: 'MS', nomeEstado: 'Mato Grosso do Sul', cidade: 'Campo Grande', cepExemplo: '79002-000', regiao: 'Centro-Oeste' },

  // NORTE
  { estado: 'AC', nomeEstado: 'Acre', cidade: 'Rio Branco', cepExemplo: '69900-000', regiao: 'Norte' },
  { estado: 'AP', nomeEstado: 'Amapá', cidade: 'Macapá', cepExemplo: '68900-000', regiao: 'Norte' },
  { estado: 'AM', nomeEstado: 'Amazonas', cidade: 'Manaus', cepExemplo: '69005-000', regiao: 'Norte' },
  { estado: 'PA', nomeEstado: 'Pará', cidade: 'Belém', cepExemplo: '66010-000', regiao: 'Norte' },
  { estado: 'RO', nomeEstado: 'Rondônia', cidade: 'Porto Velho', cepExemplo: '76801-000', regiao: 'Norte' },
  { estado: 'RR', nomeEstado: 'Roraima', cidade: 'Boa Vista', cepExemplo: '69301-000', regiao: 'Norte' },
  { estado: 'TO', nomeEstado: 'Tocantins', cidade: 'Palmas', cepExemplo: '77001-000', regiao: 'Norte' }
];
