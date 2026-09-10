import { useNetflixData } from './data/useNetflixData';
import { Header } from './components/Header';
import { PeriodHighlight } from './components/PeriodHighlight';
import { Banner } from './components/Banner';
import { QuestionsBox } from './components/QuestionsBox';
import { KpiCards } from './components/KpiCards';
import { FilterBar } from './components/FilterBar';
import { ChartsGrid } from './components/ChartsGrid';
import { Footer } from './components/Footer';
import { Loader2 } from 'lucide-react';

export default function App() {
  const {
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
  } = useNetflixData();

  const handleScrollToChart = (chartId: string) => {
    const el = document.getElementById(chartId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-2', 'ring-[#E50914]', 'ring-offset-2', 'ring-offset-black');
      setTimeout(() => {
        el.classList.remove('ring-2', 'ring-[#E50914]', 'ring-offset-2', 'ring-offset-black');
      }, 2000);
    }
  };

  const handleSelectTipo = (tipo: 'Filme' | 'Série' | 'todos') => {
    setFilters((prev) => ({ ...prev, tipo }));
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-[#f5f5f5] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Navigation Header */}
      <Header />

      {/* Main Page Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10">
        {/* 1. Imagem: Banner Cinematográfico 16:9 Netflix Oficial */}
        <Banner />

        {/* 2. Destaque Oficial: Período analisado logo após a imagem */}
        <PeriodHighlight />

        {/* TOPO - As 4 perguntas que o dashboard vai responder (em caixa de texto no topo) */}
        <QuestionsBox onScrollToChart={handleScrollToChart} />

        {/* LINHA 1 - Cards Principais (Scorecards grandes) */}
        <KpiCards
          kpis={kpis}
          totalGeral={data.length || 8807}
          currentTipo={filters.tipo}
          onSelectTipo={handleSelectTipo}
        />

        {/* LINHA 2 - Filtros (controles para usuário leigo) */}
        <FilterBar
          filters={filters}
          onFilterChange={(newFilters) => setFilters((prev) => ({ ...prev, ...newFilters }))}
          onReset={resetFilters}
          matchCount={filteredData.length}
          totalCount={data.length || 8807}
        />

        {/* Loading State or Charts Grid */}
        {loading ? (
          <div className="w-full py-24 flex flex-col items-center justify-center gap-3 rounded-2xl bg-[#181818] border border-[#2c2c2c]">
            <Loader2 className="w-8 h-8 text-[#E50914] animate-spin" />
            <p className="text-sm font-semibold text-neutral-300">
              Carregando base de dados oficial (8.807 títulos)...
            </p>
          </div>
        ) : error ? (
          <div className="w-full p-6 rounded-2xl bg-red-950/40 border border-red-800/60 text-center">
            <p className="text-sm text-red-300 font-semibold">{error}</p>
          </div>
        ) : (
          /* LINHA 3 - Gráficos Limpos (para leigos entenderem, COM TÍTULO EM CADA UM) */
          <ChartsGrid
            tipoData={tipoData}
            generoData={generoData}
            evolucaoData={evolucaoData}
            paisData={paisData}
            onSelectTipo={(tipo) => handleSelectTipo(tipo)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
