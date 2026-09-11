import React, { useState, useEffect } from 'react';
import { Sparkles, BarChart3, Info, X, Calendar, Disc, Tv, Globe, Clock, Target, Users, TrendingUp, ArrowLeft, Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Header: React.FC = () => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isTargetAudienceOpen, setIsTargetAudienceOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.warn('Fullscreen not available or denied:', err);
    }
  };

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

            <button
              type="button"
              onClick={toggleFullscreen}
              className="inline-flex items-center justify-center p-1.5 sm:p-2 rounded-xl bg-[#1e1e1e] hover:bg-[#2a2a2a] text-neutral-400 hover:text-white border border-[#333] hover:border-neutral-500 transition-all shadow-sm cursor-pointer active:scale-95"
              title={isFullscreen ? 'Sair do Modo Apresentação (Tela Cheia)' : 'Modo Apresentação (Tela Cheia)'}
              aria-label="Alternar modo tela cheia"
            >
              {isFullscreen ? (
                <Minimize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ff4a54]" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-300 hover:text-white" />
              )}
            </button>
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

      {/* Modal / Pop-up de Tela Cheia (Fullscreen Overlay): Público-Alvo & Pitch Analítico */}
      <AnimatePresence>
        {isTargetAudienceOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-target-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-[#080808]/95 backdrop-blur-2xl text-white p-4 sm:p-8 md:p-12 overflow-y-auto"
            onClick={() => setIsTargetAudienceOpen(false)}
          >
            {/* Background Cinematográfico alinhado aos tons escuros do Dashboard */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
              <img
                src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2000&auto=format&fit=crop"
                alt="Cinema & Streaming Background"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center opacity-15 filter contrast-125 brightness-50 scale-105"
              />
              {/* Overlays em degradê e vinheta profunda */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#0b0b0b]/90 to-[#080808]/95" />
              <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#E50914]/15 rounded-full blur-[140px]" />
              <div className="absolute -bottom-32 right-1/4 w-[500px] h-[300px] bg-red-900/10 rounded-full blur-[140px]" />
            </div>

            {/* Barra Superior do Fullscreen */}
            <div
              className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between pb-4 border-b border-[#222]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E50914] to-[#990000] flex items-center justify-center font-black text-white text-lg shadow-lg shadow-red-950/60 ring-1 ring-white/20 select-none shrink-0">
                  N
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-black tracking-wider uppercase text-white">
                    PÚBLICO-ALVO
                  </span>
                  <span className="hidden sm:inline-block text-neutral-600">•</span>
                  <span className="hidden sm:inline-block text-xs font-semibold text-neutral-400">
                    Tese Estratégica
                  </span>
                </div>
              </div>

              {/* Botão Fechar Estilizado */}
              <button
                type="button"
                onClick={() => setIsTargetAudienceOpen(false)}
                className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181818] hover:bg-[#252525] border border-[#333] hover:border-neutral-500 text-neutral-300 hover:text-white transition-all text-xs font-semibold cursor-pointer active:scale-95 shadow-sm"
                aria-label="Fechar tela cheia"
              >
                <span className="hidden sm:inline">Fechar</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/50 text-neutral-400 font-mono border border-neutral-700/50">ESC</span>
                <X className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
              </button>
            </div>

            {/* Conteúdo Centralizado do Pitch */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-4xl mx-auto my-auto py-8 sm:py-12 flex flex-col items-center text-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Badge de Destaque */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E50914]/15 border border-[#E50914]/30 text-xs font-bold tracking-widest uppercase text-[#ff4a54] mb-8 shadow-md shadow-red-950/30">
                <Target className="w-3.5 h-3.5 text-[#E50914]" />
                <span>Público-Alvo & Inteligência de Negócio</span>
              </div>

              {/* Bloco 1 do Pitch: Números e Contraste */}
              <h2
                id="modal-target-title"
                className="text-2xl sm:text-4xl md:text-5xl lg:text-[50px] font-black tracking-tight text-white leading-tight sm:leading-snug md:leading-tight mb-8 sm:mb-10 max-w-3xl"
              >
                Em{' '}
                <span className="inline-block px-3 py-0.5 mx-1 rounded-xl bg-[#1e1e1e] text-white font-black border border-[#333] shadow-md">
                  2020
                </span>
                , enquanto{' '}
                <span className="inline-block text-[#ff4a54] font-black underline decoration-[#E50914] decoration-4 underline-offset-8 drop-shadow-[0_0_25px_rgba(229,9,20,0.45)]">
                  90% das empresas QUEBRAVAM
                </span>
                ... a Netflix ganhou{' '}
                <span className="inline-block text-emerald-400 font-black drop-shadow-[0_0_25px_rgba(52,211,153,0.4)]">
                  36 MILHÕES de assinantes
                </span>
                .
              </h2>

              {/* Divisor Decorativo com o vermelho do dashboard */}
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#E50914]/60 to-transparent mb-8 sm:mb-10" />

              {/* Bloco 2 do Pitch: O Porquê */}
              <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-neutral-200 tracking-tight leading-snug mb-6 sm:mb-8 max-w-2xl">
                Por quê? Porque ela sabia exatamente o que produzir.{' '}
                <span className="text-white font-black underline decoration-amber-400/80 decoration-2 underline-offset-4">
                  E foi isso que eu analisei.
                </span>
              </p>

              {/* Bloco 3 do Pitch: Conexão com Decisão de Negócio */}
              <p className="text-base sm:text-xl md:text-2xl font-medium text-neutral-300 leading-relaxed max-w-3xl">
                Este dashboard vai mostrar para vocês como transformar isso em decisão de negócio — para{' '}
                <span className="inline-block font-extrabold text-[#ff4a54] underline decoration-[#E50914]/80 decoration-2 underline-offset-6 drop-shadow-[0_0_20px_rgba(229,9,20,0.35)]">
                  gestores de mídia saberem exatamente onde investir
                </span>
                .
              </p>

              {/* Botão de Ação: Voltar ao Dashboard no Vermelho Oficial Netflix */}
              <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsTargetAudienceOpen(false)}
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-[#E50914] hover:bg-[#b00710] text-white font-black text-sm sm:text-base transition-all shadow-xl shadow-red-950/70 hover:shadow-red-900/80 hover:scale-105 active:scale-95 cursor-pointer ring-1 ring-white/20"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar ao Dashboard</span>
                </button>
              </div>
            </motion.div>

            {/* Rodapé Informativo */}
            <div
              className="relative z-10 w-full max-w-5xl mx-auto pt-4 border-t border-[#222] flex items-center justify-between text-xs text-neutral-500"
              onClick={(e) => e.stopPropagation()}
            >
              <span>Dashboard Analítico Netflix • Tese Estratégica</span>
              <span className="hidden sm:inline">Pressione ESC para fechar a qualquer momento</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

