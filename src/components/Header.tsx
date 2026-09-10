import React, { useState, useEffect } from 'react';
import { Sparkles, BarChart3, Info, X, Calendar, Disc, Tv, Globe, Clock, Target, Users, TrendingUp } from 'lucide-react';

export const Header: React.FC = () => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isTargetAudienceOpen, setIsTargetAudienceOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsInfoOpen(false);
        setIsTargetAudienceOpen(false);
      }
    };
    if (isInfoOpen || isTargetAudienceOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isInfoOpen, isTargetAudienceOpen]);

  return (
    <>
      <header className="w-full border-b border-[#222] bg-[#0b0b0b]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
            {/* Netflix Red N Badge */}
            <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#E50914] to-[#990000] flex items-center justify-center font-black text-white text-lg sm:text-2xl shadow-lg shadow-red-950/60 ring-1 ring-white/20 select-none shrink-0">
              N
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="text-base sm:text-2xl font-black tracking-tight text-white flex items-center gap-1 truncate">
                  <span>DASHBOARD</span>
                  <span className="text-[#E50914]">NETFLIX</span>
                </h1>
                <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-[#E50914]/20 text-[#ff4a54] border border-[#E50914]/30 shrink-0">
                  <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  OFICIAL
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-[#a3a3a3] font-medium truncate">
                Base de Dados Traduzida <span className="text-white font-semibold">• 8.807 Títulos</span>
                <span className="hidden md:inline text-neutral-400 font-normal"> • Lançamentos: 1925 a 2021 • Entrada: 2008 a 2021</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap justify-end">
            <button
              type="button"
              onClick={() => setIsInfoOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-[#1e1e1e] hover:bg-[#2a2a2a] text-xs font-bold text-neutral-200 hover:text-white border border-[#333] hover:border-neutral-500 transition-all shadow-sm whitespace-nowrap cursor-pointer active:scale-95"
              title="Ver informações importantes sobre a fundação da Netflix"
            >
              <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Informação Importante</span>
            </button>

            <button
              type="button"
              onClick={() => setIsTargetAudienceOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-[#1e1e1e] hover:bg-[#2a2a2a] text-xs font-bold text-neutral-200 hover:text-white border border-[#333] hover:border-neutral-500 transition-all shadow-sm whitespace-nowrap cursor-pointer active:scale-95"
              title="Ver o público-alvo da análise"
            >
              <Target className="w-3.5 h-3.5 text-[#E50914] shrink-0" />
              <span>Público-Alvo</span>
            </button>

            <a
              href="#linha-graficos"
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#E50914] hover:bg-[#b00710] text-xs font-bold text-white transition-all shadow-md shadow-red-900/30 whitespace-nowrap active:scale-95"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Ver Gráficos</span>
            </a>
          </div>
        </div>
      </header>

      {/* Pop-up / Modal com Informações Importantes da Netflix */}
      {isInfoOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-info-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsInfoOpen(false)}
        >
          <div
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#141414] border border-[#333] shadow-2xl shadow-black/80 text-white p-5 sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão Fechar */}
            <button
              type="button"
              onClick={() => setIsInfoOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#222] hover:bg-[#333] text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Fechar janela"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Cabeçalho do Pop-up */}
            <div className="flex items-center gap-2.5 mb-4 pr-8">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-md shrink-0">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold tracking-wider uppercase text-amber-400">
                  História & Curiosidades
                </span>
                <h2 id="modal-info-title" className="text-lg sm:text-xl font-black text-white">
                  Informação Importante sobre a Netflix
                </h2>
              </div>
            </div>

            {/* Linha do Tempo & Informações */}
            <div className="space-y-3.5 text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {/* Fundação */}
              <div className="p-3.5 rounded-xl bg-[#1c1c1c] border border-[#2a2a2a] flex items-start gap-3">
                <Calendar className="w-5 h-5 text-[#E50914] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-white text-sm">
                    Fundação: 29 de Agosto de 1997
                  </h3>
                  <p className="text-neutral-300 mt-1">
                    Fundada em <strong>Scotts Valley, Califórnia</strong> por{' '}
                    <strong className="text-white">Reed Hastings</strong> e{' '}
                    <strong className="text-white">Marc Randolph</strong>.
                  </p>
                </div>
              </div>

              {/* Início não era streaming */}
              <div className="p-3.5 rounded-xl bg-[#1c1c1c] border border-[#2a2a2a] flex items-start gap-3">
                <Disc className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-white text-sm">
                    1997 a 2006: Locadora de DVD pelo correio
                  </h3>
                  <p className="text-neutral-300 mt-1">
                    Só que não era streaming no começo não: durante quase uma década era locadora de DVD pelo correio. Você escolhia online e recebia os discos em casa!
                  </p>
                </div>
              </div>

              {/* Chegada do Streaming */}
              <div className="p-3.5 rounded-xl bg-[#1c1c1c] border border-[#2a2a2a] flex items-start gap-3">
                <Tv className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-white text-sm">
                    2007: Lançamento do Serviço de Streaming
                  </h3>
                  <p className="text-neutral-300 mt-1">
                    Em 2007, a Netflix lançou a tecnologia de transmissão online via streaming sob demanda que a gente conhece hoje.
                  </p>
                </div>
              </div>

              {/* Chegada ao Brasil */}
              <div className="p-3.5 rounded-xl bg-[#1c1c1c] border border-[#2a2a2a] flex items-start gap-3">
                <Globe className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-white text-sm">
                    2011: Chegada ao Brasil
                  </h3>
                  <p className="text-neutral-300 mt-1">
                    Em <strong>5 de setembro de 2011</strong> começou a operar oficialmente no Brasil, marcando o início da era do streaming no país.
                  </p>
                </div>
              </div>

              {/* Destaque / Conclusão */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#E50914]/20 via-[#B00710]/15 to-transparent border border-[#E50914]/40 text-neutral-100 flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#ff4a54] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white">Linha do tempo da marca</h4>
                  <p className="mt-1 text-xs sm:text-sm text-neutral-200">
                    A Netflix tem <strong>29 anos de empresa</strong> desde a sua fundação, mas apenas <strong>18 anos atuando como streaming</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Rodapé do Modal */}
            <div className="mt-5 pt-4 border-t border-[#2a2a2a] flex items-center justify-between">
              <span className="text-[11px] text-neutral-500">
                Fontes: pt.wikipedia.org • web.l2kinternet.com.br
              </span>
              <button
                type="button"
                onClick={() => setIsInfoOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-[#222] hover:bg-[#333] text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pop-up / Modal com o Público-Alvo da Análise */}
      {isTargetAudienceOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-target-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsTargetAudienceOpen(false)}
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-[#141414] border border-[#333] shadow-2xl shadow-black/90 text-white p-5 sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão Fechar */}
            <button
              type="button"
              onClick={() => setIsTargetAudienceOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#222] hover:bg-[#333] text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Fechar janela"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Cabeçalho do Pop-up */}
            <div className="flex items-center gap-2.5 mb-4 pr-8">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E50914] to-[#990000] flex items-center justify-center text-white shadow-md shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold tracking-wider uppercase text-[#ff4a54]">
                  Propósito Estratégico
                </span>
                <h2 id="modal-target-title" className="text-lg sm:text-xl font-black text-white">
                  Público-Alvo da Análise
                </h2>
              </div>
            </div>

            {/* Mensagem do Usuário */}
            <div className="space-y-3.5 text-xs sm:text-sm text-neutral-300 leading-relaxed">
              <div className="p-4 rounded-xl bg-[#1c1c1c] border border-[#2a2a2a] text-neutral-200">
                <p className="text-sm sm:text-base font-medium leading-relaxed text-neutral-100">
                  O público-alvo da minha análise é qualquer pessoa interessada no mercado de streaming, mas principalmente para tomada de decisão de empresas de mídia, para entender o que produzir e onde investir.
                </p>
              </div>

              {/* Destaques estruturados para fácil leitura */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div className="p-3 rounded-xl bg-[#181818] border border-[#262626] flex items-start gap-2.5">
                  <Users className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white text-xs block">Interessados em Geral</strong>
                    <span className="text-[11px] text-neutral-400">Público geral curioso sobre o mercado de streaming.</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#181818] border border-[#262626] flex items-start gap-2.5">
                  <TrendingUp className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white text-xs block">Empresas de Mídia</strong>
                    <span className="text-[11px] text-neutral-400">Tomada de decisão estratégica: o que produzir e onde investir.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rodapé do Modal */}
            <div className="mt-5 pt-4 border-t border-[#2a2a2a] flex items-center justify-between">
              <span className="text-[11px] text-neutral-500">
                Dashboard Netflix • Inteligência de Conteúdo
              </span>
              <button
                type="button"
                onClick={() => setIsTargetAudienceOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-[#222] hover:bg-[#333] text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

