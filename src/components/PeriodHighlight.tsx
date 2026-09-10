import React from 'react';
import { Calendar, Clock, Film, Layers, CheckCircle2 } from 'lucide-react';

export const PeriodHighlight: React.FC = () => {
  return (
    <div
      id="periodo-analisado-destaque"
      className="w-full rounded-2xl bg-gradient-to-r from-[#181818] via-[#1f1617] to-[#181818] border border-red-600/30 p-4 sm:p-5 shadow-xl shadow-black/60 relative overflow-hidden"
    >
      {/* Glow accent in the background */}
      <div className="absolute -left-10 -top-10 w-40 h-40 bg-[#E50914]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#E50914]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Title / Badge Section */}
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E50914] flex items-center justify-center text-white shrink-0 shadow-lg shadow-red-900/50">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#E50914] text-white">
                Destaque Oficial
              </span>
              <span className="text-xs text-neutral-400 font-medium">
                Escopo Temporal dos Dados
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight mt-0.5">
              Período Analisado no Catálogo Netflix
            </h2>
          </div>
        </div>

        {/* Two Highlighted Data Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:max-w-2xl w-full">
          {/* Item 1: Lançamentos */}
          <div className="flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-black/60 border border-white/10 hover:border-red-500/40 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-red-950/80 border border-red-500/30 flex items-center justify-center text-[#ff4a54] shrink-0">
              <Film className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400 flex items-center gap-1">
                Lançamentos Originais
              </p>
              <p className="text-sm sm:text-base font-black text-white truncate">
                <span className="text-white">1925</span>
                <span className="text-[#E50914] mx-1.5 font-normal">a</span>
                <span className="text-white">2021</span>
              </p>
              <p className="text-[10px] text-neutral-400 font-medium truncate">
                96 anos de história do cinema & TV
              </p>
            </div>
          </div>

          {/* Item 2: Entrada na plataforma */}
          <div className="flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-black/60 border border-white/10 hover:border-red-500/40 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-red-950/80 border border-red-500/30 flex items-center justify-center text-[#ff4a54] shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400 flex items-center gap-1">
                Entrada na Plataforma
              </p>
              <p className="text-sm sm:text-base font-black text-white truncate">
                <span className="text-white">01/01/2008</span>
                <span className="text-[#E50914] mx-1.5 font-normal">a</span>
                <span className="text-white">25/09/2021</span>
              </p>
              <p className="text-[10px] text-neutral-400 font-medium truncate">
                Histórico completo de adições ao catálogo
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Summary Pill Bar */}
      <div className="mt-3.5 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-300">
        <p className="flex items-center gap-1.5 text-[11px] sm:text-xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>
            <strong className="text-white">Período analisado:</strong> Lançamentos de{' '}
            <span className="text-white font-bold underline decoration-red-500 decoration-2">
              1925 a 2021
            </span>
            . Entrada na plataforma:{' '}
            <span className="text-white font-bold underline decoration-red-500 decoration-2">
              01/01/2008 a 25/09/2021
            </span>
            .
          </span>
        </p>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-400">
          <Layers className="w-3.5 h-3.5 text-[#E50914]" />
          8.807 Títulos Verificados
        </span>
      </div>
    </div>
  );
};
