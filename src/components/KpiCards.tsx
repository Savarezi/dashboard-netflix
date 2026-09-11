import React, { useState, useEffect } from 'react';
import { Film, Tv, Globe, Clapperboard } from 'lucide-react';
import { KPIStats, TipoConteudo } from '../types';

interface KpiCardsProps {
  kpis: KPIStats;
  totalGeral: number;
  currentTipo: TipoConteudo;
  onSelectTipo: (tipo: TipoConteudo) => void;
}

// Hook para contagem animada suave nos KPIs
const useCountUp = (target: number, duration: number = 750) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Curva easeOutExpo para desaceleração natural
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.round(easeProgress * target);
      setValue(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration]);

  return value;
};

export const KpiCards: React.FC<KpiCardsProps> = ({
  kpis,
  totalGeral,
  currentTipo,
  onSelectTipo,
}) => {
  const animatedTitulos = useCountUp(kpis.totalTitulos);
  const animatedFilmes = useCountUp(kpis.totalFilmes);
  const animatedSeries = useCountUp(kpis.totalSeries);
  const animatedPaises = useCountUp(kpis.totalPaises);

  const pctFilmes = kpis.totalTitulos ? ((kpis.totalFilmes / kpis.totalTitulos) * 100).toFixed(1) : '0';
  const pctSeries = kpis.totalTitulos ? ((kpis.totalSeries / kpis.totalTitulos) * 100).toFixed(1) : '0';

  return (
    <section id="linha-scorecards" className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Total de Títulos */}
        <div
          id="card-total-titulos"
          onClick={() => onSelectTipo('todos')}
          className={`relative overflow-hidden rounded-2xl bg-[#181818] border p-5 sm:p-6 transition-all duration-300 cursor-pointer group hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(229,9,20,0.18)] ${
            currentTipo === 'todos'
              ? 'border-[#E50914] shadow-lg shadow-red-900/25 ring-1 ring-[#E50914]/30'
              : 'border-[#2c2c2c] hover:border-neutral-500'
          }`}
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#E50914]" />
          {/* Luz de fundo sutil no hover */}
          <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#E50914]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#E50914]/20 transition-all" />

          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#a3a3a3]">
              Total de Títulos
            </span>
            <div className="p-2 rounded-xl bg-[#E50914]/15 text-[#E50914] group-hover:bg-[#E50914] group-hover:text-white transition-all shadow-sm">
              <Clapperboard className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {animatedTitulos.toLocaleString('pt-BR')}
            </span>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-xs text-[#a3a3a3]">
            <span>COUNT de id</span>
            {kpis.totalTitulos !== totalGeral ? (
              <span className="text-[#E50914] font-semibold">
                {((kpis.totalTitulos / totalGeral) * 100).toFixed(0)}% do catálogo
              </span>
            ) : (
              <span className="text-neutral-400 font-medium">100% da base</span>
            )}
          </div>
        </div>

        {/* Card 2: Total de Filmes */}
        <div
          id="card-total-filmes"
          onClick={() => onSelectTipo(currentTipo === 'Filme' ? 'todos' : 'Filme')}
          className={`relative overflow-hidden rounded-2xl bg-[#181818] border p-5 sm:p-6 transition-all duration-300 cursor-pointer group hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(229,9,20,0.18)] ${
            currentTipo === 'Filme'
              ? 'border-[#E50914] shadow-lg shadow-red-900/30 bg-[#1f1616] ring-1 ring-[#E50914]/30'
              : 'border-[#2c2c2c] hover:border-neutral-500'
          }`}
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#E50914]" />
          <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#E50914]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#E50914]/20 transition-all" />

          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#a3a3a3]">
              Total de Filmes
            </span>
            <div className="p-2 rounded-xl bg-red-500/15 text-[#E50914] group-hover:bg-[#E50914] group-hover:text-white transition-all shadow-sm">
              <Film className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {animatedFilmes.toLocaleString('pt-BR')}
            </span>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-xs text-[#a3a3a3]">
            <span>tipo = Filme</span>
            <span className="text-white font-semibold px-2 py-0.5 rounded bg-white/10">
              {pctFilmes}%
            </span>
          </div>
        </div>

        {/* Card 3: Total de Séries */}
        <div
          id="card-total-series"
          onClick={() => onSelectTipo(currentTipo === 'Série' ? 'todos' : 'Série')}
          className={`relative overflow-hidden rounded-2xl bg-[#181818] border p-5 sm:p-6 transition-all duration-300 cursor-pointer group hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(225,29,72,0.18)] ${
            currentTipo === 'Série'
              ? 'border-[#E50914] shadow-lg shadow-red-900/30 bg-[#1f1616] ring-1 ring-[#E50914]/30'
              : 'border-[#2c2c2c] hover:border-neutral-500'
          }`}
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#B00710]" />
          <div className="absolute -top-12 -right-12 w-28 h-28 bg-rose-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-rose-500/20 transition-all" />

          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#a3a3a3]">
              Total de Séries
            </span>
            <div className="p-2 rounded-xl bg-rose-500/15 text-rose-400 group-hover:bg-rose-600 group-hover:text-white transition-all shadow-sm">
              <Tv className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {animatedSeries.toLocaleString('pt-BR')}
            </span>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-xs text-[#a3a3a3]">
            <span>tipo = Série</span>
            <span className="text-white font-semibold px-2 py-0.5 rounded bg-white/10">
              {pctSeries}%
            </span>
          </div>
        </div>

        {/* Card 4: Total de Países */}
        <div
          id="card-total-paises"
          className="relative overflow-hidden rounded-2xl bg-[#181818] border border-[#2c2c2c] p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-500 hover:shadow-[0_12px_32px_rgba(245,166,35,0.15)] group"
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-500" />
          <div className="absolute -top-12 -right-12 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/20 transition-all" />

          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#a3a3a3]">
              Total de Países
            </span>
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 group-hover:bg-amber-500 group-hover:text-black transition-all shadow-sm">
              <Globe className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {animatedPaises.toLocaleString('pt-BR')}
            </span>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-xs text-[#a3a3a3]">
            <span>COUNT_DISTINCT de pais</span>
            <span className="text-amber-400 font-semibold">
              Origens de conteúdo
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
