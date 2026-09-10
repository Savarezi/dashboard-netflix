import React from 'react';
import { Database, ShieldCheck, Github } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[#222] bg-[#0d0d0d] py-8 text-neutral-400 text-xs mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#E50914] flex items-center justify-center font-bold text-white text-xs">
            N
          </div>
          <span className="font-semibold text-neutral-300">
            Dashboard Analítico de Títulos Netflix
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-neutral-400 text-[11px]">
          <span className="flex items-center gap-1">
            <Database className="w-3.5 h-3.5 text-[#E50914]" />
            Base oficial netflix_titles (8.807 registros reais)
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Sem dados fictícios
          </span>
        </div>

        <div className="text-xs text-neutral-300 flex items-center gap-2 justify-center">
          <span>Criado por <strong className="text-white font-medium">Patrícia Oliveira</strong></span>
          <a
            href="https://github.com/Savarezi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1f1f1f] hover:bg-[#2a2a2a] text-white hover:text-[#ff4a54] transition-colors border border-[#333]"
            title="GitHub de Patrícia Oliveira"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="font-medium text-[11px]">GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
