import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from 'recharts';
import { TipoDataPoint, GeneroDataPoint, EvolucaoDataPoint, PaisDataPoint } from '../types';

interface ChartsGridProps {
  tipoData: TipoDataPoint[];
  generoData: GeneroDataPoint[];
  evolucaoData: EvolucaoDataPoint[];
  paisData: PaisDataPoint[];
  onSelectTipo?: (tipo: 'Filme' | 'Série') => void;
}

// Custom tooltip styling for dark luxury theme
const CustomTooltip = ({ active, payload, label, unit = 'títulos' }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    const val = data.value;
    const name = label || data.name || data.payload?.name || data.payload?.generoFormatado || data.payload?.pais;
    const pct = data.payload?.pct;

    return (
      <div className="rounded-xl bg-[#141414]/95 backdrop-blur-md border border-[#333] px-3.5 py-2.5 shadow-2xl text-xs z-50">
        <p className="font-bold text-white mb-1">{name}</p>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: data.color || '#E50914' }} />
          <span className="text-neutral-300">
            <strong className="text-white font-extrabold">{val?.toLocaleString('pt-BR')}</strong> {unit}
            {pct !== undefined && <span className="ml-1 text-[#E50914] font-bold">({pct}%)</span>}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export const ChartsGrid: React.FC<ChartsGridProps> = ({
  tipoData,
  generoData,
  evolucaoData,
  paisData,
  onSelectTipo,
}) => {
  const totalTitulosGrafico1 = tipoData.reduce((acc, curr) => acc + curr.value, 0);

  // Invert arrays for horizontal bar charts so largest appears on top
  const topGenerosInvertidos = [...generoData].reverse();
  const topPaisesInvertidos = [...paisData].reverse();

  return (
    <section id="linha-graficos" className="w-full space-y-6 sm:space-y-8">
      {/* Upper row: Gráfico 1 & Gráfico 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Gráfico 1 - Título: "Proporção: Filmes vs Séries" */}
        <div
          id="chart-proporcao"
          className="lg:col-span-5 rounded-2xl bg-[#181818] border border-[#2c2c2c] p-5 sm:p-6 shadow-xl flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs font-bold text-[#E50914] tracking-wider uppercase">
                Gráfico 1 • Distribuição
              </span>
              <span className="text-[11px] text-neutral-400">
                {totalTitulosGrafico1.toLocaleString('pt-BR')} analisados
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              Proporção: Filmes vs Séries
            </h3>
            <p className="text-xs text-[#a3a3a3] mt-1">
              Divisão percentual entre produções em formato de filme e séries completas
            </p>
          </div>

          <div className="relative w-full h-[280px] sm:h-[320px] my-3">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tipoData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={105}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, pct }) => `${name} (${pct}%)`}
                  labelLine={{ stroke: '#555', strokeWidth: 1 }}
                >
                  {tipoData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="#181818"
                      strokeWidth={3}
                      className="cursor-pointer hover:opacity-85 transition-opacity"
                      onClick={() => onSelectTipo && onSelectTipo(entry.name === 'Filmes' ? 'Filme' : 'Série')}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  align="center"
                  iconType="circle"
                  formatter={(value: string) => {
                    const item = tipoData.find((t) => t.name === value);
                    return (
                      <span className="text-xs font-semibold text-neutral-300 mr-2">
                        {value}: <strong className="text-white">{item?.value.toLocaleString('pt-BR')}</strong> ({item?.pct}%)
                      </span>
                    );
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Center metric */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {totalTitulosGrafico1.toLocaleString('pt-BR')}
              </span>
              <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
                Total
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#2a2a2a] flex items-center justify-between text-xs text-neutral-400">
            <span>💡 Quase 7 em cada 10 títulos são filmes</span>
            <span className="text-white font-bold text-[11px]">
              {tipoData[0]?.pct}% Filmes
            </span>
          </div>
        </div>

        {/* Gráfico 2 - Título: "Top 10 Gêneros Mais Assistidos" */}
        <div
          id="chart-generos"
          className="lg:col-span-7 rounded-2xl bg-[#181818] border border-[#2c2c2c] p-5 sm:p-6 shadow-xl flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs font-bold text-[#E50914] tracking-wider uppercase">
                Gráfico 2 • Categorias
              </span>
              <span className="text-[11px] text-neutral-400">Ranking dos 10 maiores</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              Top 10 Gêneros Mais Assistidos
            </h3>
            <p className="text-xs text-[#a3a3a3] mt-1">
              Categorias e estilos com maior volume de produções no catálogo
            </p>
          </div>

          <div className="w-full h-[320px] sm:h-[350px] my-2">
            {generoData.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center text-xs text-neutral-400">
                Nenhum gênero encontrado com os filtros atuais.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topGenerosInvertidos}
                  layout="vertical"
                  margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#2c2c2c" horizontal={false} />
                  <XAxis
                    type="number"
                    stroke="#777"
                    tick={{ fill: '#a3a3a3', fontSize: 10 }}
                    tickFormatter={(val) => val.toLocaleString('pt-BR')}
                  />
                  <YAxis
                    type="category"
                    dataKey="generoFormatado"
                    stroke="#777"
                    tick={{ fill: '#d9d9d9', fontSize: 10, fontWeight: 500 }}
                    width={115}
                  />
                  <Tooltip content={<CustomTooltip unit="títulos" />} />
                  <Bar
                    dataKey="count"
                    fill="#E50914"
                    radius={[0, 6, 6, 0]}
                    barSize={16}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="pt-3 border-t border-[#2a2a2a] flex items-center justify-between text-xs text-neutral-400">
            <span>🏆 Gênero líder: <strong className="text-white">{generoData[0]?.generoFormatado}</strong></span>
            <span className="text-red-400 font-semibold">{generoData[0]?.count.toLocaleString('pt-BR')} títulos</span>
          </div>
        </div>
      </div>

      {/* Lower row: Gráfico 3 & Gráfico 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Gráfico 3 - Título: "Evolução: Títulos Adicionados por Ano" */}
        <div
          id="chart-evolucao"
          className="lg:col-span-7 rounded-2xl bg-[#181818] border border-[#2c2c2c] p-5 sm:p-6 shadow-xl flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs font-bold text-[#E50914] tracking-wider uppercase">
                Gráfico 3 • Linha do Tempo
              </span>
              <span className="text-[11px] text-neutral-400">2008 até 2021</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              Evolução: Títulos Adicionados por Ano
            </h3>
            <p className="text-xs text-[#a3a3a3] mt-1">
              Crescimento histórico do acervo de acordo com a data de entrada na plataforma
            </p>
          </div>

          <div className="w-full h-[280px] sm:h-[320px] my-2">
            {evolucaoData.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center text-xs text-neutral-400">
                Sem registros de data de adição para os filtros atuais.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={evolucaoData}
                  margin={{ top: 15, right: 25, left: -5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                  <XAxis
                    dataKey="ano"
                    stroke="#777"
                    tick={{ fill: '#a3a3a3', fontSize: 11 }}
                  />
                  <YAxis
                    stroke="#777"
                    tick={{ fill: '#a3a3a3', fontSize: 11 }}
                    tickFormatter={(val) => val.toLocaleString('pt-BR')}
                  />
                  <Tooltip
                    content={<CustomTooltip unit="títulos adicionados" />}
                    labelFormatter={(label) => `Ano de Adição: ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#E50914"
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#E50914', stroke: '#fff', strokeWidth: 1.5 }}
                    activeDot={{ r: 7, fill: '#ffffff', stroke: '#E50914', strokeWidth: 2.5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="pt-3 border-t border-[#2a2a2a] flex items-center justify-between text-xs text-neutral-400">
            <span>📈 Auge de expansão global do streaming entre 2018 e 2020</span>
            <span className="text-emerald-400 font-semibold">Pico em 2019: 2.016 adições</span>
          </div>
        </div>

        {/* Gráfico 4 - Título: "Top 10 Países que Mais Produzem" */}
        <div
          id="chart-paises"
          className="lg:col-span-5 rounded-2xl bg-[#181818] border border-[#2c2c2c] p-5 sm:p-6 shadow-xl flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs font-bold text-amber-500 tracking-wider uppercase">
                Gráfico 4 • Produção Global
              </span>
              <span className="text-[11px] text-neutral-400">10 principais polos</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              Top 10 Países que Mais Produzem
            </h3>
            <p className="text-xs text-[#a3a3a3] mt-1">
              Países líderes no volume total de obras disponibilizadas
            </p>
          </div>

          <div className="w-full h-[280px] sm:h-[320px] my-2">
            {paisData.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center text-xs text-neutral-400">
                Nenhum país encontrado para o filtro selecionado.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topPaisesInvertidos}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#2c2c2c" horizontal={false} />
                  <XAxis
                    type="number"
                    stroke="#777"
                    tick={{ fill: '#a3a3a3', fontSize: 11 }}
                    tickFormatter={(val) => val.toLocaleString('pt-BR')}
                  />
                  <YAxis
                    type="category"
                    dataKey="pais"
                    stroke="#777"
                    tick={{ fill: '#d9d9d9', fontSize: 11, fontWeight: 500 }}
                    width={110}
                  />
                  <Tooltip content={<CustomTooltip unit="títulos" />} />
                  <Bar
                    dataKey="count"
                    fill="#F5A623"
                    radius={[0, 6, 6, 0]}
                    barSize={16}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="pt-3 border-t border-[#2a2a2a] flex items-center justify-between text-xs text-neutral-400">
            <span>🌍 EUA e Índia respondem por mais da metade do catálogo</span>
            <span className="text-amber-400 font-bold">Top 1: United States</span>
          </div>
        </div>
      </div>
    </section>
  );
};
