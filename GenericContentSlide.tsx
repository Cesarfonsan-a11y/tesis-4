import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRESENTATION_CONTENT } from '../../constants';
import { 
  AlertTriangle, 
  TrendingUp, 
  Cpu, 
  BarChart, 
  LineChart, 
  PieChart as PieIcon, 
  Lightbulb, 
  Database,
  Calculator,
  RefreshCw,
  Sparkles,
  ChevronRight,
  TrendingDown,
  Timer,
  Scan,
  Target,
  DollarSign,
  ArrowUpRight,
  Car,
  Info,
  Ban,
  PackageCheck,
  Globe,
  FileCode,
  Layers,
  Link,
  Coins,
  ArrowRight
} from 'lucide-react';
import { PresentationSectionId } from '../../types';

interface Props {
  section: 'problem' | 'solution' | 'methodology' | 'conclusion';
}

export const GenericContentSlide: React.FC<Props> = ({ section }) => {
  const [activeTab, setActiveTab] = useState(0);

  // --- STATE FOR PREDICTIVE SIMULATOR ---
  const [simState, setSimState] = useState<'idle' | 'loading' | 'complete'>('idle');
  const [inputs, setInputs] = useState({ brand: 'Renault', model: 'Duster', year: 2021, km: 45000 });
  const [result, setResult] = useState({ price: 0, min: 0, max: 0, confidence: 0, days: 0 });

  const runSimulation = () => {
    setSimState('loading');
    setTimeout(() => {
      let base = inputs.brand === 'Toyota' ? 95000000 : 78000000;
      if (inputs.brand === 'Mazda') base = 88000000;
      
      const ageFactor = (2025 - inputs.year) * 0.08;
      const kmFactor = (inputs.km / 10000) * 0.015;
      
      const estimated = base * (1 - ageFactor - kmFactor);
      const variance = estimated * 0.04;

      setResult({
        price: Math.round(estimated / 100000) * 100000,
        min: Math.round((estimated - variance) / 100000) * 100000,
        max: Math.round((estimated + variance) / 100000) * 100000,
        confidence: 94.2,
        days: Math.round(30 + (inputs.km / 2000))
      });
      setSimState('complete');
    }, 1500);
  };

  const formatMoney = (val: number) => `$ ${(val/1000000).toFixed(1)}M`; // Short format for chart

  // --- STATE FOR OPPORTUNITY MATRIX ---
  const [matrixState, setMatrixState] = useState<'idle' | 'scanning' | 'analyzed'>('idle');
  const [marketData, setMarketData] = useState<any[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<any>(null);
  const [bestDeal, setBestDeal] = useState<any>(null);

  const scanMarket = () => {
    setMatrixState('scanning');
    setMarketData([]);
    setSelectedPoint(null);
    setBestDeal(null);

    // Realistic Market Generation Logic (Exponential Decay)
    const points = [];
    const baseNewPrice = 90000000; // 90M New
    
    // We create 50 simulated cars
    for (let i = 0; i < 50; i++) {
        // Random mileage between 0 and 100k
        const km = Math.floor(Math.random() * 100000); 
        
        // Fair Price Model: NewPrice * e^(-decay * km)
        // A car loses ~50% value at 100k km in this simple model
        const decayRate = 0.000007; 
        const fairPrice = baseNewPrice * Math.exp(-decayRate * km);
        
        // Market Inefficiency (Noise)
        // Some sellers ask too much (+15%), some are desperate (-15%)
        const marketNoise = (Math.random() * 0.35) - 0.15; 
        let actualPrice = fairPrice * (1 + marketNoise);
        
        // Force at least one "Super Deal" for the demo
        if (i === 10) actualPrice = fairPrice * 0.75; 

        // Classification
        let status = 'fair';
        const gapPercent = ((fairPrice - actualPrice) / fairPrice) * 100;

        if (gapPercent > 8) status = 'opportunity'; // Cheaper than fair
        if (gapPercent < -8) status = 'overpriced'; // More expensive than fair

        points.push({ 
          id: i, 
          km, 
          price: actualPrice, 
          fairPrice, 
          status, 
          gapPercent,
          model: `Mazda CX-30 (${2024 - Math.floor(km/15000)})` 
        });
    }

    // Identify the absolute best deal (highest positive gap)
    const best = points.reduce((prev: any, current: any) => (prev.gapPercent > current.gapPercent) ? prev : current);

    setTimeout(() => {
        setMarketData(points);
        setBestDeal(best);
        setSelectedPoint(best); // Auto-select best deal
        setMatrixState('analyzed');
    }, 2000);
  };
  // ---------------------------------------

  // Render Logic based on Section Type
  if (section === 'problem') {
    const { problem } = PRESENTATION_CONTENT;
    const tabs = ["Contexto", "Evidencia", "Oportunidad"];

    return (
      <div className="h-full flex flex-col p-6 md:p-12 max-w-7xl mx-auto">
        <SlideTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        
        <div className="flex-1 mt-8 relative">
          <AnimatePresence mode="wait">
            {activeTab === 0 && (
              <motion.div key="context" {...fadeProps} className="space-y-8">
                <h2 className="text-4xl font-bold text-white">{problem.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {problem.points.map((p: string, i: number) => (
                    <div key={i} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex gap-4">
                      <AlertTriangle className="text-orange-500 shrink-0" />
                      <p className="text-slate-300 text-lg">{p}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-orange-500/10 border border-orange-500/20 p-6 rounded-xl text-center">
                  <p className="text-xl text-orange-200 font-semibold">{problem.conclusion}</p>
                </div>
              </motion.div>
            )}

            {activeTab === 1 && (
              <motion.div key="evidence" {...fadeProps} className="flex flex-col items-center justify-center h-full">
                <div className="text-center mb-12">
                   <h3 className="text-2xl text-slate-400 uppercase tracking-widest mb-2">Parque Automotor (RUNT)</h3>
                   <p className="text-8xl font-black text-white">{problem.evidence.total}</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                   {problem.evidence.breakdown.map((item: any, i: number) => (
                     <div key={i} className="bg-slate-800 p-6 rounded-2xl text-center border-t-4 border-blue-500">
                        <p className="text-3xl font-bold text-white mb-1">{item.value}</p>
                        <p className="text-sm text-slate-400 uppercase">{item.label}</p>
                     </div>
                   ))}
                </div>
                <div className="mt-12 bg-slate-800/80 px-8 py-4 rounded-full border border-slate-600">
                  <p className="text-slate-300">💡 Insight: {problem.evidence.insight}</p>
                </div>
              </motion.div>
            )}

             {activeTab === 2 && (
              <motion.div key="opp" {...fadeProps} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
                <div>
                   <h2 className="text-4xl font-bold text-white mb-6">Oportunidad de Innovación</h2>
                   <p className="text-xl text-slate-400 mb-8">El mercado necesita una plataforma que:</p>
                   <ul className="space-y-4">
                     {problem.opportunity.map((item: string, i: number) => (
                       <li key={i} className="flex items-center gap-3 text-lg text-slate-200">
                         <div className="w-2 h-2 bg-green-400 rounded-full" />
                         {item}
                       </li>
                     ))}
                   </ul>
                </div>
                <div className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 p-8 rounded-3xl border border-cyan-500/30 flex items-center justify-center text-center">
                    <div>
                      <Lightbulb size={64} className="text-yellow-400 mx-auto mb-6" />
                      <h3 className="text-3xl font-bold text-white mb-4">La Primera Plataforma Integral</h3>
                      <p className="text-cyan-200">Democratización de la inteligencia automotriz en Colombia.</p>
                    </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  if (section === 'solution') {
     const { solution } = PRESENTATION_CONTENT;
     const tabs = ["Plataforma OKTO", "Matriz Oportunidad", "Simulador Predictivo"];

     return (
       <div className="h-full flex flex-col p-6 md:p-12 max-w-7xl mx-auto">
        <SlideTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        <div className="flex-1 mt-8 relative">
           <AnimatePresence mode="wait">
             {activeTab === 0 && (
                <motion.div key="platform" {...fadeProps} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">
                   <div>
                     <h2 className="text-5xl font-black text-white mb-8 tracking-tight">Solución <span className="text-cyan-400">OKTO</span></h2>
                     <div className="space-y-4">
                        {solution.capabilities.map((cap: string, i: number) => (
                          <div key={i} className="flex items-center gap-4 p-4 bg-slate-800 rounded-xl border-l-4 border-cyan-500">
                             <Cpu className="text-cyan-500" />
                             <span className="text-xl text-white font-medium">{cap}</span>
                          </div>
                        ))}
                     </div>
                   </div>
                   <div className="relative h-96 bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden flex items-center justify-center shadow-2xl">
                      <div className="absolute inset-0 bg-grid-slate-800/[0.2] bg-[bottom_1px_center]" style={{ backgroundSize: '20px 20px' }}></div>
                      <div className="relative z-10 text-center space-y-4">
                         <div className="inline-flex gap-4">
                            <div className="w-16 h-16 bg-blue-600 rounded-lg animate-bounce delay-75 shadow-lg flex items-center justify-center"><BarChart className="text-white"/></div>
                            <div className="w-16 h-16 bg-cyan-500 rounded-lg animate-bounce delay-150 shadow-lg flex items-center justify-center"><PieIcon className="text-white"/></div>
                            <div className="w-16 h-16 bg-purple-600 rounded-lg animate-bounce delay-300 shadow-lg flex items-center justify-center"><TrendingUp className="text-white"/></div>
                         </div>
                         <p className="text-slate-400 text-sm">Integración en Tiempo Real</p>
                      </div>
                   </div>
                </motion.div>
             )}

             {/* --- INTERACTIVE OPPORTUNITY MATRIX (REFACTORED) --- */}
             {activeTab === 1 && (
                <motion.div key="matrix" {...fadeProps} className="h-full grid grid-cols-1 md:grid-cols-12 gap-6">
                   {/* Left: Info & Stats */}
                   <div className="md:col-span-4 flex flex-col space-y-4">
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                           <Target className="text-green-400" /> Matriz de Arbitraje
                        </h2>
                        <p className="text-sm text-slate-400 leading-relaxed">
                           Identifica vehículos "fuera de tendencia". La IA calcula la curva justa (gris) y detecta oportunidades (verde) o sobrecostos (rojo).
                        </p>
                      </div>

                      <button 
                         onClick={scanMarket}
                         disabled={matrixState === 'scanning'}
                         className="w-full bg-slate-800 border border-slate-700 hover:border-green-500 hover:bg-slate-750 text-white font-bold py-3 rounded-xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 group"
                      >
                         {matrixState === 'scanning' ? (
                            <><RefreshCw className="animate-spin text-green-400" /> Analizando Mercado...</>
                         ) : (
                            <><Scan size={20} className="text-green-400 group-hover:scale-110 transition-transform" /> Escanear Lote (50 Vehículos)</>
                         )}
                      </button>

                      {/* Selected Vehicle Card */}
                      <AnimatePresence mode="wait">
                      {selectedPoint ? (
                         <motion.div 
                           key="selected"
                           initial={{ opacity: 0, x: -20 }}
                           animate={{ opacity: 1, x: 0 }}
                           exit={{ opacity: 0, scale: 0.9 }}
                           className={`flex-1 rounded-xl p-5 border shadow-lg flex flex-col justify-between
                              ${selectedPoint.status === 'opportunity' ? 'bg-green-900/20 border-green-500/50' : 
                                selectedPoint.status === 'overpriced' ? 'bg-red-900/20 border-red-500/50' : 
                                'bg-slate-800 border-slate-700'}
                           `}
                         >
                            <div>
                               <div className="flex justify-between items-start mb-4">
                                  <div className="p-2 bg-slate-900 rounded-lg">
                                     <Car size={24} className="text-slate-200" />
                                  </div>
                                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase
                                     ${selectedPoint.status === 'opportunity' ? 'bg-green-500 text-black' : 
                                       selectedPoint.status === 'overpriced' ? 'bg-red-500 text-white' : 
                                       'bg-slate-600 text-slate-200'}
                                  `}>
                                     {selectedPoint.status === 'opportunity' ? 'Oportunidad' : 
                                      selectedPoint.status === 'overpriced' ? 'Sobreprecio' : 'Justo'}
                                  </span>
                               </div>
                               <h3 className="text-xl font-bold text-white">{selectedPoint.model}</h3>
                               <p className="text-slate-400 text-sm mb-4">{selectedPoint.km.toLocaleString()} km</p>
                               
                               <div className="space-y-3">
                                  <div className="flex justify-between items-end border-b border-white/10 pb-2">
                                     <span className="text-xs text-slate-400 uppercase">Precio Mercado</span>
                                     <span className="font-mono text-white">{formatMoney(selectedPoint.fairPrice)}</span>
                                  </div>
                                  <div className="flex justify-between items-end border-b border-white/10 pb-2">
                                     <span className="text-xs text-slate-400 uppercase">Precio Venta</span>
                                     <span className="font-mono text-xl font-bold text-white">{formatMoney(selectedPoint.price)}</span>
                                  </div>
                               </div>
                            </div>

                            {selectedPoint.gapPercent > 0 && (
                               <div className="mt-4 bg-green-500/20 p-3 rounded-lg border border-green-500/30 flex items-center gap-3">
                                  <TrendingUp className="text-green-400" />
                                  <div>
                                     <span className="text-xs text-green-300 block uppercase font-bold">Ahorro Potencial</span>
                                     <span className="text-lg font-bold text-green-400">
                                        {selectedPoint.gapPercent.toFixed(1)}% ({formatMoney(selectedPoint.fairPrice - selectedPoint.price)})
                                     </span>
                                  </div>
                               </div>
                            )}
                         </motion.div>
                      ) : (
                         <div className="flex-1 bg-slate-800/30 rounded-xl border border-slate-700/50 flex flex-col items-center justify-center text-center p-6 text-slate-500">
                            <Info size={40} className="mb-2 opacity-50" />
                            <p className="text-sm">Selecciona un punto en la gráfica para ver el análisis de arbitraje.</p>
                         </div>
                      )}
                      </AnimatePresence>
                   </div>

                   {/* Right: The Chart */}
                   <div className="md:col-span-8 bg-[#0b1121] rounded-2xl border border-slate-700 relative overflow-hidden shadow-inner">
                      
                      {/* Grid & Axis Labels */}
                      <div className="absolute left-10 bottom-8 top-8 w-px bg-slate-800 z-0"></div>
                      <div className="absolute left-10 bottom-8 right-8 h-px bg-slate-800 z-0"></div>
                      <span className="absolute left-2 top-1/2 -rotate-90 text-[10px] text-slate-500 tracking-widest">PRECIO (COP)</span>
                      <span className="absolute bottom-2 left-1/2 text-[10px] text-slate-500 tracking-widest">KILOMETRAJE (0 - 100k)</span>

                      {/* Fair Value Curve Background (Visual Guide) */}
                      {matrixState !== 'idle' && (
                         <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-30">
                            <defs>
                               <linearGradient id="fairZoneGrad" x1="0" x2="1" y1="0" y2="1">
                                  <stop offset="0%" stopColor="#64748b" stopOpacity="0.1" />
                                  <stop offset="100%" stopColor="#64748b" stopOpacity="0" />
                               </linearGradient>
                            </defs>
                            {/* Curve approx: y starts high, decays. 
                                In SVG coords: (0,0) is top-left. Price high = y small. Price low = y large. 
                                Km low = x small. 
                            */}
                            <path d="M 50,50 Q 200,80 800,250 L 800,300 L 50,200 Z" fill="url(#fairZoneGrad)" />
                         </svg>
                      )}

                      {/* Chart Area */}
                      <div className="absolute inset-0 z-10 m-8 mb-10 ml-12">
                         
                         {/* Empty State */}
                         {matrixState === 'idle' && (
                            <div className="absolute inset-0 flex items-center justify-center flex-col text-slate-600 animate-pulse">
                               <Scan size={64} strokeWidth={1} />
                               <p className="mt-4 text-sm font-light tracking-wide uppercase">Esperando señal de mercado...</p>
                            </div>
                         )}

                         {/* Radar Scan Line */}
                         {matrixState === 'scanning' && (
                            <div className="absolute top-0 bottom-0 w-1 bg-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.6)] z-50 animate-[scan_1.5s_linear_infinite]" />
                         )}

                         {/* Plot Points */}
                         <AnimatePresence>
                            {marketData.map((point) => {
                               // Map values to percentages for absolute positioning
                               // Km: 0 -> 100k
                               const xPos = (point.km / 100000) * 100;
                               // Price: 0 -> 100M (approx max)
                               const yPos = 100 - ((point.price / 100000000) * 100);

                               return (
                                  <motion.button
                                     key={point.id}
                                     initial={{ opacity: 0, scale: 0 }}
                                     animate={{ 
                                       opacity: 1, 
                                       scale: selectedPoint?.id === point.id ? 1.5 : 1
                                     }}
                                     transition={{ delay: point.id * 0.02, type: "spring" }}
                                     onClick={() => setSelectedPoint(point)}
                                     className={`absolute w-3 h-3 -ml-1.5 -mt-1.5 rounded-full border shadow-sm hover:scale-150 transition-transform focus:outline-none z-20
                                        ${point.status === 'opportunity' ? 'bg-green-500 border-green-300 shadow-[0_0_8px_rgba(34,197,94,0.8)] z-30' : 
                                          point.status === 'overpriced' ? 'bg-red-500 border-red-400 opacity-60' : 
                                          'bg-slate-500 border-slate-400 opacity-40'}
                                     `}
                                     style={{ left: `${xPos}%`, top: `${yPos}%` }}
                                  />
                               );
                            })}
                         </AnimatePresence>
                         
                         {/* Dynamic Legend Overlay */}
                         {matrixState === 'analyzed' && (
                            <motion.div 
                              initial={{ opacity: 0 }} 
                              animate={{ opacity: 1 }}
                              className="absolute top-0 right-0 bg-slate-900/80 p-3 rounded-lg border border-slate-700 backdrop-blur text-xs space-y-2 pointer-events-none"
                            >
                               <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_currentColor]"></div>
                                  <span className="text-slate-300">Oportunidad (Subvalorado)</span>
                               </div>
                               <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-slate-500"></div>
                                  <span className="text-slate-300">Precio Justo (Mercado)</span>
                               </div>
                               <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                  <span className="text-slate-300">Sobrevalorado</span>
                               </div>
                            </motion.div>
                         )}

                      </div>
                   </div>
                </motion.div>
             )}

             {/* --- PREDICTIVE SIMULATOR (Existing) --- */}
             {activeTab === 2 && (
                <motion.div key="predict" {...fadeProps} className="h-full grid grid-cols-1 md:grid-cols-12 gap-6">
                   
                   {/* Left: Controls */}
                   <div className="md:col-span-5 bg-slate-800/80 p-6 rounded-2xl border border-slate-700 flex flex-col justify-center">
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Calculator className="text-cyan-400" />
                        Parámetros del Vehículo
                      </h3>
                      
                      <div className="space-y-5">
                        <div>
                          <label className="text-slate-400 text-sm mb-1 block">Marca & Modelo</label>
                          <select 
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none"
                            value={inputs.brand}
                            onChange={(e) => setInputs({...inputs, brand: e.target.value})}
                          >
                            <option value="Renault">Renault Duster</option>
                            <option value="Chevrolet">Chevrolet Onix</option>
                            <option value="Mazda">Mazda CX-5</option>
                            <option value="Toyota">Toyota Corolla</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-slate-400 text-sm mb-1 block">Año Modelo ({inputs.year})</label>
                          <input 
                            type="range" min="2015" max="2024" step="1" 
                            value={inputs.year}
                            onChange={(e) => setInputs({...inputs, year: parseInt(e.target.value)})}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                          />
                          <div className="flex justify-between text-xs text-slate-500 mt-1">
                            <span>2015</span>
                            <span>2024</span>
                          </div>
                        </div>

                        <div>
                          <label className="text-slate-400 text-sm mb-1 block">Kilometraje ({inputs.km.toLocaleString()} km)</label>
                          <input 
                            type="range" min="0" max="150000" step="1000" 
                            value={inputs.km}
                            onChange={(e) => setInputs({...inputs, km: parseInt(e.target.value)})}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                          />
                        </div>

                        <button 
                          onClick={runSimulation}
                          disabled={simState === 'loading'}
                          className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-900/50 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                        >
                          {simState === 'loading' ? (
                            <>
                              <RefreshCw className="animate-spin" /> Procesando...
                            </>
                          ) : (
                            <>
                              <Sparkles size={20} /> Ejecutar Modelo OKTO
                            </>
                          )}
                        </button>
                      </div>
                   </div>

                   {/* Right: Results */}
                   <div className="md:col-span-7 relative">
                      <AnimatePresence mode="wait">
                        {simState === 'idle' ? (
                          <motion.div 
                            key="idle"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="h-full bg-slate-900/50 rounded-2xl border-2 border-dashed border-slate-800 flex flex-col items-center justify-center text-slate-500"
                          >
                             <Cpu size={48} className="mb-4 opacity-50" />
                             <p>Ingresa parámetros para predecir</p>
                          </motion.div>
                        ) : simState === 'loading' ? (
                          <motion.div 
                            key="loading"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="h-full bg-slate-900 rounded-2xl border border-slate-700 flex flex-col items-center justify-center"
                          >
                             <div className="relative">
                               <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
                               <div className="absolute inset-0 flex items-center justify-center">
                                 <BrainCircuitIcon className="text-cyan-400" size={24} />
                               </div>
                             </div>
                             <p className="text-cyan-400 mt-4 font-mono animate-pulse">Analizando 7.8M de registros...</p>
                          </motion.div>
                        ) : (
                          <motion.div 
                            key="result"
                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                            className="h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-cyan-500/50 p-6 flex flex-col justify-between shadow-2xl shadow-cyan-900/20"
                          >
                             <div>
                               <div className="flex justify-between items-start mb-6">
                                 <div>
                                   <span className="text-slate-400 text-sm uppercase tracking-wider">Precio Justo Estimado</span>
                                   <h2 className="text-5xl font-black text-white tracking-tight mt-1 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                                     {formatMoney(result.price * 1000000).replace('$ M', '000')}
                                   </h2>
                                 </div>
                                 <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/30 flex items-center gap-1">
                                    <Sparkles size={12} /> Alta Confianza: {result.confidence}%
                                 </div>
                               </div>

                               <div className="grid grid-cols-2 gap-4 mb-6">
                                  <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-700">
                                     <span className="text-slate-500 text-xs uppercase block mb-1">Rango de Mercado</span>
                                     <div className="text-slate-300 font-mono text-sm">
                                       Min: <span className="text-white">{formatMoney(result.min * 1000000).replace('$ M', '000')}</span>
                                     </div>
                                     <div className="text-slate-300 font-mono text-sm">
                                       Max: <span className="text-white">{formatMoney(result.max * 1000000).replace('$ M', '000')}</span>
                                     </div>
                                  </div>
                                  <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-700">
                                     <span className="text-slate-500 text-xs uppercase block mb-1">Rotación Estimada</span>
                                     <div className="flex items-center gap-2">
                                        <Timer className="text-orange-400" size={20} />
                                        <span className="text-2xl font-bold text-white">{result.days}</span>
                                        <span className="text-slate-400 text-sm">días</span>
                                     </div>
                                  </div>
                               </div>
                             </div>

                             <div className="bg-blue-900/20 p-4 rounded-xl border border-blue-500/20">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="text-blue-300 text-sm font-bold flex items-center gap-2">
                                    <TrendingDown size={16} /> Proyección a 12 Meses
                                  </h4>
                                  <span className="text-red-400 font-bold text-sm">-12%</span>
                                </div>
                                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-[88%] h-full" />
                                </div>
                                <p className="text-right text-xs text-slate-400 mt-2">
                                  Valor futuro est: {formatMoney(result.price * 1000000 * 0.88).replace('$ M', '000')}
                                </p>
                             </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                   </div>
                </motion.div>
             )}
           </AnimatePresence>
        </div>
       </div>
     );
  }

  if (section === 'methodology') {
    const { methodology, impact } = PRESENTATION_CONTENT;
    const tabs = ["CRISP-DM", "Alcance", "Impacto"];

    // NEW DATA FOR SCOPE SECTION
    const scopeData = [
      {
         title: "Alcance General",
         icon: Target,
         color: "blue",
         desc: "Plataforma Integral de Business Analytics",
         bullets: [
            "Comprensión y proyección del mercado de usados.",
            "Metodología CRISP-DM.",
            "Dirigido a concesionarios, aseguradoras y analistas."
         ]
      },
      {
         title: "Funcionalidad",
         icon: Layers,
         color: "indigo",
         desc: "Descriptiva, Predictiva y Visualización",
         bullets: [
            "Indicadores de oferta, precio y depreciación.",
            "Modelos ML para estimación de precios y demanda.",
            "Dashboards interactivos y reportes ejecutivos."
         ]
      },
      {
         title: "Tecnología",
         icon: Cpu,
         color: "cyan",
         desc: "Stack Moderno de Data Science",
         bullets: [
            "Python/R (Pandas, Scikit-learn, TensorFlow).",
            "Pipelines ETL para integración de datos.",
            "Despliegue en la nube y BI (Looker/PowerBI)."
         ]
      },
      {
         title: "Datos",
         icon: Database,
         color: "emerald",
         desc: "Fuentes Primarias y Secundarias",
         bullets: [
            "Portales Web, RUNT, SIMIT, ANDEMOS.",
            "Cobertura Nacional (2020-2024).",
            "Convenios privados (GarantiPlus)."
         ]
      },
      {
         title: "Exclusiones",
         icon: Ban,
         color: "red",
         desc: "Lo que NO incluye el proyecto",
         bullets: [
            "No venta directa ni intermediación comercial.",
            "No software transaccional.",
            "No vehículos nuevos ni motos.",
            "Cero datos personales sensibles."
         ]
      },
      {
         title: "Entregables",
         icon: PackageCheck,
         color: "amber",
         desc: "Valor Tangible al Finalizar",
         bullets: [
            "Prototipo funcional analítico.",
            "Documentación técnica (ETL/Modelos).",
            "Reporte ejecutivo de hallazgos estratégicos."
         ]
      }
    ];

    return (
       <div className="h-full flex flex-col p-6 md:p-12 max-w-7xl mx-auto">
        <SlideTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        <div className="flex-1 mt-8 relative overflow-y-auto pr-2">
           <AnimatePresence mode="wait">
             {activeTab === 0 && (
               <motion.div key="crisp" {...fadeProps} className="flex flex-col items-center justify-center h-full">
                  <h2 className="text-3xl font-bold text-white mb-10">Metodología CRISP-DM</h2>
                  <div className="flex flex-wrap justify-center gap-4">
                     {methodology.steps.map((step: string, i: number) => (
                       <div key={i} className="flex items-center">
                          <div className="w-40 h-32 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center text-center p-4 shadow-lg hover:border-cyan-500 transition-colors">
                             <span className="text-slate-200 font-semibold">{step}</span>
                          </div>
                          {i < methodology.steps.length - 1 && (
                            <div className="w-8 h-1 bg-slate-700 hidden md:block" />
                          )}
                       </div>
                     ))}
                  </div>
               </motion.div>
             )}

             {/* --- UPDATED SCOPE TAB (GRID LAYOUT) --- */}
             {activeTab === 1 && (
               <motion.div key="scope" {...fadeProps} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 h-full overflow-y-auto pb-4">
                  {scopeData.map((scope, i) => {
                     const Icon = scope.icon;
                     return (
                        <div key={i} className={`bg-slate-800/40 p-6 rounded-2xl border border-slate-700/60 hover:bg-slate-800 hover:border-${scope.color}-500/50 transition-all group flex flex-col`}>
                           <div className="flex items-center gap-4 mb-4">
                              <div className={`p-3 rounded-lg bg-${scope.color}-500/10 text-${scope.color}-400 group-hover:scale-110 transition-transform`}>
                                 <Icon size={24} />
                              </div>
                              <div>
                                 <h3 className="text-lg font-bold text-white">{scope.title}</h3>
                                 <p className={`text-xs text-${scope.color}-300 font-medium`}>{scope.desc}</p>
                              </div>
                           </div>
                           <ul className="space-y-2 flex-1">
                              {scope.bullets.map((bullet: string, idx: number) => (
                                 <li key={idx} className="flex items-start gap-2 text-slate-400 text-sm leading-snug">
                                    <div className={`w-1.5 h-1.5 rounded-full bg-${scope.color}-500 mt-1.5 shrink-0`} />
                                    <span>{bullet}</span>
                                 </li>
                              ))}
                           </ul>
                        </div>
                     )
                  })}
               </motion.div>
             )}

             {activeTab === 2 && (
               <motion.div key="impact" {...fadeProps} className="flex flex-col gap-8 pb-8">
                  {/* Grid for Sector Impact */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {impact.sectors.map((sec: any, i: number) => (
                      <div key={i} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:bg-slate-800 transition-colors">
                        <h3 className="text-xl font-bold text-cyan-400 mb-2">{sec.name}</h3>
                        <p className="text-white text-lg">{sec.benefit}</p>
                      </div>
                    ))}
                  </div>

                  {/* Pricing Deep Dive (Answer to User Question) */}
                  {impact.pricingFocus && (
                    <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-8 rounded-2xl border border-indigo-500/30 shadow-lg relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-8 opacity-5 text-indigo-400 pointer-events-none">
                          <Coins size={120} />
                       </div>
                       
                       {/* Definition Header */}
                       <div className="mb-6 relative z-10">
                         <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                            <Sparkles className="text-indigo-400" /> 
                            {impact.pricingFocus.title}
                         </h3>
                         <p className="text-slate-300 text-lg leading-relaxed max-w-4xl">
                            {impact.pricingFocus.definition}
                         </p>
                         <div className="flex flex-wrap gap-2 mt-4">
                            {impact.pricingFocus.tags.map((tag: string, i: number) => (
                               <span key={i} className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
                                  {tag}
                               </span>
                            ))}
                         </div>
                       </div>

                       {/* EXAMPLE COMPARISON CARD (Answer to User's Specific Request) */}
                       {impact.pricingFocus.example && (
                          <div className="bg-slate-950/50 rounded-xl p-6 border border-slate-700/50 relative z-10">
                             <div className="flex items-center gap-2 mb-4">
                                <Car size={20} className="text-slate-400" />
                                <h4 className="text-white font-bold text-lg">{impact.pricingFocus.example.title}</h4>
                             </div>
                             
                             <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
                                {/* Traditional Approach */}
                                <div className="md:col-span-5 bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                                   <div className="text-xs font-bold text-slate-500 uppercase mb-2">{impact.pricingFocus.example.traditional.label}</div>
                                   <div className="space-y-1">
                                      <div className="flex justify-between text-slate-300 text-sm">
                                         <span>Precio:</span> <span className="font-mono">{impact.pricingFocus.example.traditional.price}</span>
                                      </div>
                                      <div className="flex justify-between text-slate-300 text-sm">
                                         <span>Venta en:</span> <span className="font-mono">{impact.pricingFocus.example.traditional.time}</span>
                                      </div>
                                      <div className="flex justify-between text-red-400 font-bold text-sm mt-2 pt-2 border-t border-slate-700/50">
                                         <span>Depreciación:</span> <span>{impact.pricingFocus.example.traditional.loss}</span>
                                      </div>
                                   </div>
                                </div>

                                {/* Arrow Divider */}
                                <div className="md:col-span-1 flex justify-center text-slate-600">
                                   <ArrowRight size={24} className="hidden md:block" />
                                   <ArrowRight size={24} className="md:hidden rotate-90" />
                                </div>

                                {/* OKTO Approach */}
                                <div className="md:col-span-5 bg-gradient-to-br from-indigo-900/50 to-cyan-900/30 p-4 rounded-lg border border-cyan-500/30">
                                   <div className="text-xs font-bold text-cyan-400 uppercase mb-2 flex items-center gap-2">
                                      <Sparkles size={12} /> {impact.pricingFocus.example.okto.label}
                                   </div>
                                   <div className="space-y-1">
                                      <div className="flex justify-between text-white font-bold text-sm">
                                         <span>Precio Óptimo:</span> <span className="font-mono">{impact.pricingFocus.example.okto.price}</span>
                                      </div>
                                      <div className="flex justify-between text-white text-sm">
                                         <span>Venta en:</span> <span className="font-mono text-green-400">{impact.pricingFocus.example.okto.time}</span>
                                      </div>
                                      <div className="flex justify-between text-green-400 font-bold text-sm mt-2 pt-2 border-t border-cyan-500/20 shadow-[0_-10px_20px_-5px_rgba(34,211,238,0.1)]">
                                         <span>Impacto:</span> <span>{impact.pricingFocus.example.okto.gain}</span>
                                      </div>
                                   </div>
                                </div>
                             </div>
                             
                             {/* Bottom Summary Tags */}
                             <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-end">
                                {impact.pricingFocus.example.impacts.map((imp: string, i: number) => (
                                   <div key={i} className="flex items-center gap-1 text-xs text-green-300 font-medium bg-green-500/10 px-2 py-1 rounded">
                                      <TrendingUp size={12} /> {imp}
                                   </div>
                                ))}
                             </div>
                          </div>
                       )}

                    </div>
                  )}
               </motion.div>
             )}
           </AnimatePresence>
        </div>
       </div>
    );
  }

  // Conclusion Section
  if (section === 'conclusion') {
      const { cover } = PRESENTATION_CONTENT;
      return (
        <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-slate-900 to-[#0B1120]">
           <motion.div {...fadeProps} className="max-w-4xl space-y-8">
              <h2 className="text-6xl font-black text-white mb-8">Conclusión</h2>
              <div className="space-y-4 text-2xl text-slate-300 font-light">
                 <p>OKTO moderniza y democratiza la inteligencia automotriz.</p>
                 <p>Reduce riesgos y asimetrías de información.</p>
                 <p>Introduce modelos predictivos inéditos en Colombia.</p>
              </div>
              <div className="py-12">
                 <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                    OKTO
                 </h1>
                 <p className="text-slate-500 mt-4 text-sm tracking-widest uppercase">El nuevo estándar de inteligencia automotriz</p>
              </div>
              
              {/* Added Project Link Section for Reference */}
              <div className="flex flex-col items-center gap-4 mt-8">
                 {/* QR Code removed as requested */}
                 <div className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700">
                    <Link size={16} />
                    <span className="font-mono">{cover.projectUrl}</span>
                 </div>
              </div>

              <p className="text-xl text-white font-medium mt-8">Gracias</p>
           </motion.div>
        </div>
      )
  }

  return null;
};

// Internal Helper for Brain Icon to avoid import conflict if any
const BrainCircuitIcon = ({ className, size }: { className?: string, size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
    <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
    <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
    <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
    <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
    <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
    <path d="M6 18a4 4 0 0 1-1.97-3.284" />
    <path d="M17.97 14.716A4 4 0 0 1 18 18" />
  </svg>
);

// Helper Components
const SlideTabs = ({ tabs, activeTab, onChange }: { tabs: string[], activeTab: number, onChange: (i: number) => void }) => (
  <div className="flex justify-center space-x-2 bg-slate-900/50 p-1 rounded-xl self-center backdrop-blur-sm border border-slate-800">
     {tabs.map((tab, i) => (
       <button
         key={i}
         onClick={() => onChange(i)}
         className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
           activeTab === i 
             ? 'bg-slate-700 text-white shadow-md' 
             : 'text-slate-500 hover:text-slate-300'
         }`}
       >
         {tab}
       </button>
     ))}
  </div>
);

const ScopeCard = ({ title, content, icon: Icon, color }: any) => (
  <div className={`h-64 bg-slate-800/40 border border-slate-700 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-${color}-500/50 transition-colors`}>
     <div className={`p-4 rounded-full bg-${color}-500/10 text-${color}-400 mb-6`}>
        <Icon size={32} />
     </div>
     <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
     <p className="text-slate-400">{content}</p>
  </div>
);

const fadeProps = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3 }
};