import React from 'react';
import { Film, Sparkles, Database } from 'lucide-react';
import bannerImg from '../assets/images/netflix_banner_1789034954591.jpg';

export const Banner: React.FC = () => {
  return (
    <div id="banner-netflix" className="relative w-full overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#121212] shadow-2xl shadow-black/80">
      {/* 16:9 Aspect Ratio Container with mobile min-height */}
      <div className="relative w-full aspect-video min-h-[220px] sm:min-h-[320px] max-h-[440px] sm:max-h-[480px] md:max-h-[520px]">
        {/* Banner Image */}
        <img
          src={bannerImg}
          alt="Netflix Dashboard de Análise - 8.807 Títulos"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />

        {/* Ambient atmospheric gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 pointer-events-none" />

        {/* Bottom Bar Info Badge */}
        <div className="absolute bottom-2 left-2 right-2 sm:bottom-5 sm:left-5 sm:right-5 flex flex-wrap items-center justify-between gap-2 sm:gap-3 rounded-xl bg-black/85 backdrop-blur-md p-2.5 sm:px-4 sm:py-3 border border-white/10 shadow-lg">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="flex h-2.5 w-2.5 sm:h-3 sm:w-3 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E50914] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-[#E50914]"></span>
            </span>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-sm font-bold tracking-wide uppercase text-white flex items-center gap-1 sm:gap-1.5 flex-wrap truncate">
                <span>Catálogo Oficial</span>
                <span className="text-[#E50914] font-black">•</span>
                <span className="text-neutral-300 font-medium">8.807 Títulos Reais</span>
              </p>
              <p className="text-[9px] sm:text-xs text-neutral-400 truncate">
                Lançamentos: 1925 a 2021 • Entrada: 01/01/2008 a 25/09/2021
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-semibold text-neutral-300 shrink-0">
            <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/10 text-white text-[10px] sm:text-[11px]">
              <Film className="w-3 h-3 text-[#E50914]" />
              Filmes & Séries
            </span>
            <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/10 text-white text-[10px] sm:text-[11px]">
              <Database className="w-3 h-3 text-amber-400" />
              122 Países
            </span>
            <span className="hidden xs:inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#E50914]/30 border border-[#E50914]/50 text-white text-[10px] sm:text-[11px]">
              <Sparkles className="w-3 h-3 text-[#ff4a54]" />
              1925 - 2021
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
