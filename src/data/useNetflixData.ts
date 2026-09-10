import { useState, useEffect, useMemo } from 'react';
import { NetflixTitle, FilterState, KPIStats, TipoDataPoint, GeneroDataPoint, EvolucaoDataPoint, PaisDataPoint } from '../types';
import { GENERO_TRADUCAO } from './constants';

export const INITIAL_FILTERS: FilterState = {
  tipo: 'todos',
  pais: 'todos',
  anoMin: 1925,
  busca: '',
};

export function useNetflixData() {
  const [data, setData] = useState<NetflixTitle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        setLoading(true);
        const res = await fetch('/data/netflix_titles.json');
        if (!res.ok) {
          throw new Error('Falha ao carregar a base de dados oficial netflix_titles');
        }
        const json: NetflixTitle[] = await res.json();
        if (isMounted) {
          setData(json);
          setLoading(false);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Erro desconhecido');
          setLoading(false);
        }
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredData = useMemo(() => {
    if (!data.length) return [];
    const searchLower = filters.busca.trim().toLowerCase();

    return data.filter((item) => {
      // Filtro 1: Tipo
      if (filters.tipo !== 'todos' && item.tipo !== filters.tipo) {
        return false;
      }
      // Filtro 2: País
      if (filters.pais !== 'todos' && !item.paises.includes(filters.pais)) {
        return false;
      }
      // Filtro 3: Ano de lançamento (controle deslizante)
      if (filters.anoMin > 1925 && item.ano_lancamento < filters.anoMin) {
        return false;
      }
      // Busca opcional de texto
      if (searchLower) {
        const matchesTitle = item.titulo.toLowerCase().includes(searchLower);
        const matchesCast = item.elenco.toLowerCase().includes(searchLower);
        const matchesDirector = item.diretor.toLowerCase().includes(searchLower);
        const matchesDesc = item.descricao.toLowerCase().includes(searchLower);
        if (!matchesTitle && !matchesCast && !matchesDirector && !matchesDesc) {
          return false;
        }
      }
      return true;
    });
  }, [data, filters]);

  // KPIs
  const kpis = useMemo<KPIStats>(() => {
    const totalTitulos = filteredData.length;
    let totalFilmes = 0;
    let totalSeries = 0;
    const countriesSet = new Set<string>();

    for (const item of filteredData) {
      if (item.tipo === 'Filme') totalFilmes++;
      else if (item.tipo === 'Série') totalSeries++;

      for (const p of item.paises) {
        countriesSet.add(p);
      }
    }

    return {
      totalTitulos,
      totalFilmes,
      totalSeries,
      totalPaises: countriesSet.size,
    };
  }, [filteredData]);

  // Gráfico 1: Proporção: Filmes vs Séries
  const tipoData = useMemo<TipoDataPoint[]>(() => {
    const total = kpis.totalTitulos || 1;
    return [
      {
        name: 'Filmes',
        value: kpis.totalFilmes,
        pct: Number(((kpis.totalFilmes / total) * 100).toFixed(1)),
        color: '#E50914',
      },
      {
        name: 'Séries',
        value: kpis.totalSeries,
        pct: Number(((kpis.totalSeries / total) * 100).toFixed(1)),
        color: '#FF5252',
      },
    ];
  }, [kpis]);

  // Gráfico 2: Top 10 Gêneros Mais Assistidos (Barra horizontal, do maior para o menor)
  const generoData = useMemo<GeneroDataPoint[]>(() => {
    const counts: Record<string, number> = {};
    for (const item of filteredData) {
      for (const g of item.generos) {
        counts[g] = (counts[g] || 0) + 1;
      }
    }

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([generoOriginal, count]) => ({
        generoOriginal,
        generoFormatado: GENERO_TRADUCAO[generoOriginal] || generoOriginal,
        count,
      }));
  }, [filteredData]);

  // Gráfico 3: Evolução: Títulos Adicionados por Ano
  const evolucaoData = useMemo<EvolucaoDataPoint[]>(() => {
    const yearCounts: Record<number, number> = {};
    for (const item of filteredData) {
      if (item.ano_adicao && item.ano_adicao >= 2008) {
        yearCounts[item.ano_adicao] = (yearCounts[item.ano_adicao] || 0) + 1;
      }
    }

    return Object.keys(yearCounts)
      .map(Number)
      .sort((a, b) => a - b)
      .map((ano) => ({
        ano,
        count: yearCounts[ano],
      }));
  }, [filteredData]);

  // Gráfico 4: Top 10 Países que Mais Produzem (Barra horizontal, do maior para o menor)
  const paisData = useMemo<PaisDataPoint[]>(() => {
    const counts: Record<string, number> = {};
    for (const item of filteredData) {
      for (const p of item.paises) {
        counts[p] = (counts[p] || 0) + 1;
      }
    }

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([pais, count]) => ({
        pais,
        count,
      }));
  }, [filteredData]);

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  return {
    data,
    filteredData,
    loading,
    error,
    filters,
    setFilters,
    resetFilters,
    kpis,
    tipoData,
    generoData,
    evolucaoData,
    paisData,
  };
}
