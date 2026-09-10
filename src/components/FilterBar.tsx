import React from 'react';
import { RotateCcw, SlidersHorizontal, Film, Globe, Calendar } from 'lucide-react';
import { FilterState, TipoConteudo } from '../types';
import { PAISES_CATALOGO } from '../data/constants';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onReset: () => void;
  matchCount: number;
  totalCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onReset,
  matchCount,
  totalCount,
}) => {
  const isFiltered =
    filters.tipo !== 'todos' ||
    filters.pais !== 'todos' ||
    filters.anoMin > 1925;

  return (
    <section id="linha-filtros" className="w-full">
      <div className="rounded-2xl bg-[#181818] border border-[#2c2c2c] p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-[#2c2c2c]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#E50914]/15 text-[#E50914]">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider">
                Filtros do Catálogo
              </h3>
              <p className="text-xs text-[#a3a3a3]">
                Ajuste os 3 controles abaixo para filtrar os dados em tempo real
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <span className="text-xs text-neutral-300 bg-[#252525] px-3 py-1.5 rounded-full border border-[#383838]">
              Mostrando <strong className="text-white">{matchCount.toLocaleString('pt-BR')}</strong> de {totalCount.toLocaleString('pt-BR')}
            </span>

            {isFiltered && (
              <button
                type="button"
                id="reset-filtros-btn"
                onClick={onReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2b2b2b] hover:bg-[#E50914] text-xs font-semibold text-white transition-colors cursor-pointer"
                title="Limpar todos os filtros"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Limpar Filtros</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 items-end">
          {/* Filtro 1: Tipo */}
          <div className="flex flex-col gap-2">
            <label htmlFor="filtro-tipo" className="text-xs font-bold text-[#a3a3a3] uppercase tracking-wider flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5 text-[#E50914]" />
              Filtro 1: Tipo de Conteúdo
            </label>
            <select
              id="filtro-tipo"
              value={filters.tipo}
              onChange={(e) => onFilterChange({ tipo: e.target.value as TipoConteudo })}
              className="w-full bg-[#222] border border-[#333] hover:border-[#E50914] focus:border-[#E50914] focus:outline-none text-white text-sm rounded-xl px-3.5 py-2.5 transition-colors cursor-pointer"
            >
              <option value="todos">Todos os Formatos</option>
              <option value="Filme">Apenas Filmes</option>
              <option value="Série">Apenas Séries</option>
            </select>
          </div>

          {/* Filtro 2: País */}
          <div className="flex flex-col gap-2">
            <label htmlFor="filtro-pais" className="text-xs font-bold text-[#a3a3a3] uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              Filtro 2: País de Produção
            </label>
            <select
              id="filtro-pais"
              value={filters.pais}
              onChange={(e) => onFilterChange({ pais: e.target.value })}
              className="w-full bg-[#222] border border-[#333] hover:border-amber-400 focus:border-amber-400 focus:outline-none text-white text-sm rounded-xl px-3.5 py-2.5 transition-colors cursor-pointer"
            >
              <option value="todos">Todos os Países ({PAISES_CATALOGO.length})</option>
              {PAISES_CATALOGO.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro 3: Ano de Lançamento (controle deslizante) */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="filtro-ano" className="text-xs font-bold text-[#a3a3a3] uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                Filtro 3: Ano de Lançamento
              </label>
              <span className="text-xs font-extrabold text-[#E50914]">
                {filters.anoMin <= 1925 ? 'Todos os anos' : `A partir de ${filters.anoMin}`}
              </span>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <input
                type="range"
                id="filtro-ano"
                min={1925}
                max={2021}
                value={filters.anoMin}
                step={1}
                onChange={(e) => onFilterChange({ anoMin: Number(e.target.value) })}
                className="w-full accent-[#E50914] cursor-pointer h-2 bg-[#2c2c2c] rounded-lg"
              />
            </div>
            <div className="flex justify-between text-[10px] text-neutral-500">
              <span>1925</span>
              <span>1970</span>
              <span>2000</span>
              <span>2021</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
