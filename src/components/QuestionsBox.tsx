import React, { useState } from 'react';
import { Film, Flame, TrendingUp, Globe, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { PERGUNTAS_DASHBOARD } from '../data/constants';

interface QuestionsBoxProps {
  onScrollToChart?: (chartKey: string) => void;
}

export const QuestionsBox: React.FC<QuestionsBoxProps> = ({ onScrollToChart }) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const getIcon = (icone: string) => {
    switch (icone) {
      case 'Film':
        return <Film className="w-5 h-5 text-white" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-amber-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-emerald-400" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-sky-400" />;
      default:
        return <HelpCircle className="w-5 h-5 text-white" />;
    }
  };

  const getTargetChart = (id: number) => {
    switch (id) {
      case 1:
        return 'chart-proporcao';
      case 2:
        return 'chart-generos';
      case 3:
        return 'chart-evolucao';
      case 4:
        return 'chart-paises';
      default:
        return '';
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="perguntas-dashboard" className="w-full">
      <div className="rounded-2xl bg-gradient-to-br from-[#80050b] via-[#B00710] to-[#E50914] p-5 sm:p-6 md:p-8 shadow-xl shadow-red-950/40 text-white border border-red-500/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/20">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
              <span className="text-xs font-bold tracking-wider uppercase text-red-100">
                Objetivo Analítico
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              As 4 Perguntas Que Este Dashboard Responde
            </h2>
          </div>
          <span className="self-start sm:self-auto text-xs px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white/90 font-medium">
            Clique em cada pergunta para ver a resposta rápida
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
          {PERGUNTAS_DASHBOARD.map((item) => {
            const isExpanded = expandedId === item.id;
            const targetId = getTargetChart(item.id);

            return (
              <div
                key={item.id}
                id={`pergunta-card-${item.id}`}
                className={`transition-all duration-200 rounded-xl border ${
                  isExpanded
                    ? 'bg-black/85 border-white/40 shadow-xl'
                    : 'bg-black/40 hover:bg-black/60 border-white/15 hover:border-white/30'
                } p-4 text-left flex flex-col justify-between`}
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleExpand(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleExpand(item.id);
                    }
                  }}
                  className="cursor-pointer flex items-start justify-between gap-3 w-full"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-white/10 border border-white/10 shrink-0 mt-0.5">
                      {getIcon(item.icone)}
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                        {item.pergunta}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-[#ff8d94] mt-1">
                        {item.respostaCurta}
                      </p>
                    </div>
                  </div>

                  <div className="text-white/60 hover:text-white p-1 shrink-0">
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-white" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white/70" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-3.5 pt-3 border-t border-white/15 animate-fadeIn">
                    <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                      {item.detalhe}
                    </p>
                    {onScrollToChart && (
                      <button
                        type="button"
                        onClick={() => onScrollToChart(targetId)}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#E50914] hover:bg-[#b00710] px-3 py-1.5 rounded-lg transition-colors shadow-sm"
                      >
                        Visualizar no Gráfico
                        <span>↓</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
