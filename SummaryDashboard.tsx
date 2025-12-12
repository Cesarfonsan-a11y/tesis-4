import React from 'react';
import { motion } from 'framer-motion';
import { 
  Database, 
  ArrowRight, 
  BrainCircuit, 
  LineChart, 
  Filter, 
  Layers, 
  Search, 
  ShieldCheck 
} from 'lucide-react';

export const SummaryDashboard: React.FC = () => {
  return (
    <div className="w-full h-full p-6 md:p-10 overflow-y-auto bg-[#0f172a]">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          ¿Cómo funciona OKTO?
        </h2>
        <p className="text-slate-400 text-lg max-w-3xl mx-auto">
          Transformamos el caos de datos dispersos en inteligencia accionable mediante un proceso de tres etapas.
        </p>
      </motion.div>

      {/* THE FLOW DIAGRAM (Replaces Charts) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-12 relative">
        {/* Step 1: Input */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 flex flex-col items-center text-center relative z-10"
        >
          <div className="bg-blue-500/10 p-4 rounded-full text-blue-400 mb-4 border border-blue-500/20">
            <Database size={32} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">1. Ingesta de Datos</h3>
          <p className="text-sm text-slate-400 mb-4">Recolección masiva de fuentes heterogéneas.</p>
          
          <div className="w-full space-y-2 text-left">
            <div className="bg-slate-900/80 p-3 rounded-lg flex items-center gap-3 border border-slate-700">
              <div className="bg-blue-500 w-2 h-2 rounded-full" />
              <span className="text-slate-300 text-xs font-medium">RUNT & ANDEMOS (Oficial)</span>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-lg flex items-center gap-3 border border-slate-700">
              <div className="bg-purple-500 w-2 h-2 rounded-full" />
              <span className="text-slate-300 text-xs font-medium">Portales Web (Scraping)</span>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-lg flex items-center gap-3 border border-slate-700">
              <div className="bg-emerald-500 w-2 h-2 rounded-full" />
              <span className="text-slate-300 text-xs font-medium">SIMIT & Garantías (Técnico)</span>
            </div>
          </div>
        </motion.div>

        {/* Arrow Connector 1 (Desktop) */}
        <div className="hidden lg:flex absolute top-1/2 left-[30%] -translate-y-1/2 z-0 text-slate-600">
            <ArrowRight size={40} strokeWidth={1} />
        </div>

        {/* Step 2: Processing (The Engine) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-indigo-900/40 to-slate-900 rounded-2xl p-6 border border-indigo-500/30 flex flex-col items-center text-center relative z-10 shadow-lg shadow-indigo-500/10"
        >
          <div className="absolute inset-0 bg-indigo-500/5 animate-pulse rounded-2xl" />
          <div className="bg-indigo-500/10 p-4 rounded-full text-indigo-300 mb-4 border border-indigo-500/30 relative">
            <BrainCircuit size={32} />
          </div>
          <h3 className="text-xl font-bold text-indigo-100 mb-2">2. Motor OKTO</h3>
          <p className="text-sm text-indigo-200/60 mb-4">Procesamiento inteligente y modelado.</p>
          
          <div className="w-full space-y-2">
            <div className="flex items-center gap-2 justify-center p-2 rounded bg-indigo-950/50 border border-indigo-500/20">
               <Filter size={14} className="text-indigo-400" />
               <span className="text-xs text-indigo-200">Limpieza & ETL</span>
            </div>
            <div className="flex items-center gap-2 justify-center p-2 rounded bg-indigo-950/50 border border-indigo-500/20">
               <Layers size={14} className="text-indigo-400" />
               <span className="text-xs text-indigo-200">Unificación de Placas/Versiones</span>
            </div>
            <div className="flex items-center gap-2 justify-center p-2 rounded bg-indigo-950/50 border border-indigo-500/20">
               <BrainCircuit size={14} className="text-indigo-400" />
               <span className="text-xs text-indigo-200">Algoritmos ML (Regresión)</span>
            </div>
          </div>
        </motion.div>

        {/* Arrow Connector 2 (Desktop) */}
        <div className="hidden lg:flex absolute top-1/2 right-[30%] -translate-y-1/2 z-0 text-slate-600">
            <ArrowRight size={40} strokeWidth={1} />
        </div>

        {/* Step 3: Output */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 flex flex-col items-center text-center relative z-10"
        >
          <div className="bg-emerald-500/10 p-4 rounded-full text-emerald-400 mb-4 border border-emerald-500/20">
            <LineChart size={32} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">3. Valor Entregado</h3>
          <p className="text-sm text-slate-400 mb-4">Decisiones estratégicas para el usuario.</p>
          
          <div className="w-full grid grid-cols-2 gap-2 text-left">
            <div className="bg-slate-900 p-2 rounded border border-slate-700 flex flex-col items-center text-center">
               <span className="text-emerald-400 font-bold text-lg">$</span>
               <span className="text-[10px] text-slate-300 uppercase font-bold">Precio Justo</span>
            </div>
            <div className="bg-slate-900 p-2 rounded border border-slate-700 flex flex-col items-center text-center">
               <span className="text-blue-400 font-bold text-lg">%</span>
               <span className="text-[10px] text-slate-300 uppercase font-bold">Depreciación</span>
            </div>
            <div className="bg-slate-900 p-2 rounded border border-slate-700 flex flex-col items-center text-center col-span-2">
               <span className="text-purple-400 font-bold text-lg">KPIs</span>
               <span className="text-[10px] text-slate-300 uppercase font-bold">Alertas de Oportunidad</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Detailed Explanation Cards (The Logic) */}
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Layers className="text-cyan-400" size={24}/>
        Lógica de Integración (La "Receta")
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <motion.div 
            whileHover={{ y: -5 }}
            className="bg-slate-800/30 p-5 rounded-xl border border-slate-700 hover:border-blue-500/40 transition-all"
         >
            <h4 className="text-blue-400 font-bold mb-2 flex items-center gap-2">
              <ShieldCheck size={18} />
              1. Estructura (RUNT/Fasecolda)
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Responde: <strong>¿Qué es este carro?</strong> <br/>
              Establece la "verdad base". Valida que la versión exista, su cilindraje real y su avalúo oficial base. Sin esto, el modelo alucina.
            </p>
         </motion.div>

         <motion.div 
            whileHover={{ y: -5 }}
            className="bg-slate-800/30 p-5 rounded-xl border border-slate-700 hover:border-purple-500/40 transition-all"
         >
            <h4 className="text-purple-400 font-bold mb-2 flex items-center gap-2">
              <Search size={18} />
              2. Dinámica (Web/Concesionarios)
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Responde: <strong>¿Cuánto pide el mercado?</strong> <br/>
              Captura la volatilidad de la oferta en tiempo real. Alimenta al modelo con miles de puntos de precio actuales.
            </p>
         </motion.div>

         <motion.div 
            whileHover={{ y: -5 }}
            className="bg-slate-800/30 p-5 rounded-xl border border-slate-700 hover:border-emerald-500/40 transition-all"
         >
            <h4 className="text-emerald-400 font-bold mb-2 flex items-center gap-2">
              <Filter size={18} />
              3. Ajuste (SIMIT/Técnico)
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Responde: <strong>¿Qué riesgo tiene?</strong> <br/>
              Es el factor diferenciador. Castiga el precio si hay multas, siniestros o historial técnico negativo. Convierte un "precio promedio" en un "precio justo individual".
            </p>
         </motion.div>
      </div>
    </div>
  );
};