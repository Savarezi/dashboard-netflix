export type TipoConteudo = 'todos' | 'Filme' | 'Série';

export interface NetflixTitle {
  id: string;
  tipo: 'Filme' | 'Série';
  titulo: string;
  diretor: string;
  elenco: string;
  pais: string;
  paises: string[];
  data_adicao: string;
  ano_adicao: number | null;
  ano_lancamento: number;
  classificacao: string;
  duracao: string;
  genero: string;
  generos: string[];
  descricao: string;
}

export interface FilterState {
  tipo: TipoConteudo;
  pais: string;
  anoMin: number;
  busca: string;
}

export interface KPIStats {
  totalTitulos: number;
  totalFilmes: number;
  totalSeries: number;
  totalPaises: number;
}

export interface TipoDataPoint {
  name: string;
  value: number;
  pct: number;
  color: string;
}

export interface GeneroDataPoint {
  generoOriginal: string;
  generoFormatado: string;
  count: number;
}

export interface EvolucaoDataPoint {
  ano: number;
  count: number;
}

export interface PaisDataPoint {
  pais: string;
  paisRotulo?: string;
  count: number;
}
