import React from 'react';
import { DataSource } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  Search, 
  ArrowRight, 
  BookMarked, 
  Database, 
  Lock, 
  Unlock, 
  Quote, 
  Layers 
} from 'lucide-react';

interface SourceDetailProps {
  source: DataSource;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const SourceDetail: React.FC<SourceDetailProps> = ({ source }) => {
  const Icon = source.icon;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={source.id}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-full p-6 md:p-10 overflow-y-auto"
      >
        {/* Decorative Background Blob */}
        <div 
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none -z-10 transition-colors duration-700"
          style={{ backgroundColor: source.color }}
        />

        {/* Header Section */}
        <div className="flex flex-col xl:flex-row items-start xl:items-end justify-between mb-10 pb-6 border-b border-slate-700/60 relative">
          <div className="flex items-start gap-6">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="p-5 rounded-3xl shadow-2xl backdrop-blur-md border border-white/10"
              style={{ backgroundColor: `${source.color}15` }}
            >
              <Icon size={48} strokeWidth={1.5} style={{ color: source.color }} />
            </motion.div>
            
            <div className="pt-1">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 mb-2"
              >
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-slate-800 text-slate-300 border border-slate-700">
                  {source.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/5 text-white border border-white/10 flex items-center gap-2">
                  <Layers size={12} />
                  {source.sourceType}
                </span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight"
              >
                {source.title}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-slate-400 text-xl font-light mt-2 max-w-2xl"
              >
                {source.subtitle}
              </motion.p>
            </div>
          </div>

          <div className="hidden xl:block text-right opacity-40">
             <div className="text-sm uppercase tracking-widest text-slate-500 mb-1">ID de Fuente</div>
             <span className="text-6xl font-black text-slate-700 font-mono tracking-tighter">{source.id}</span>
          </div>
        </div>

        {/* Main Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 xl:grid-cols-12 gap-8"
        >
          
          {/* Left Column: Description & Key Data (7 columns) */}
          <div className="xl:col-span-7 space-y-8">
            
            {/* Description Card */}
            <motion.div variants={itemVariants} className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-slate-600 transition-colors">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Search size={20} className="text-sky-400" />
                Descripción de la Fuente
              </h3>
              <p className="text-slate-300 leading-relaxed text-lg font-light">
                {source.description}
              </p>
            </motion.div>

            {/* Key Data Grid */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold text-white mb-5 flex items-center gap-2 pl-2">
                <Database size={20} className="text-emerald-400" />
                Datos Clave para la Tesis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {source.keyData.map((item: string, index: number) => (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(30, 41, 59, 0.8)" }}
                    className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 flex items-start gap-3 transition-all"
                  >
                    <div className="mt-1 w-2 h-2 rounded-full flex-shrink-0 shadow-[0_0_10px_currentColor]" style={{ backgroundColor: source.color }} />
                    <span className="text-slate-200 text-sm font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Relevance, Access, Citation (5 columns) */}
          <div className="xl:col-span-5 space-y-6">
            
            {/* Relevance Card (Highlighted) */}
            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl p-1 border border-slate-700/50 shadow-xl"
            >
              <div className="bg-slate-900/90 rounded-xl p-6 h-full backdrop-blur-xl">
                <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2 border-b border-slate-800 pb-3">
                  <CheckCircle2 size={20} className="text-amber-400" />
                  Aporte Metodológico
                </h3>
                <ul className="space-y-4">
                  {source.relevance.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-3 text-slate-300 group">
                      <ArrowRight size={16} className="mt-1 text-amber-500/70 group-hover:text-amber-400 transition-colors flex-shrink-0" />
                      <span className="text-sm leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Access Info */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 gap-4">
               <div className="bg-slate-800/30 rounded-xl p-5 border border-slate-700/50 flex items-center gap-4">
                  <div className={`p-3 rounded-lg bg-slate-800 ${source.access.toLowerCase().includes('público') ? 'text-green-400' : 'text-orange-400'}`}>
                    {source.access.toLowerCase().includes('público') ? <Unlock size={20} /> : <Lock size={20} />}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Nivel de Acceso</span>
                    <p className="text-sm text-slate-200 font-medium leading-tight">{source.access}</p>
                  </div>
               </div>
            </motion.div>

            {/* Citation Box */}
            <motion.div variants={itemVariants} className="bg-indigo-950/20 rounded-xl p-6 border border-indigo-500/20 relative overflow-hidden group">
              <Quote className="absolute top-4 right-4 text-indigo-500/10 transform group-hover:scale-110 transition-transform duration-500" size={60} />
              <div className="flex items-start gap-3 relative z-10">
                <BookMarked className="text-indigo-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="text-xs font-bold text-indigo-300 mb-2 uppercase tracking-wide">Referencia APA</h4>
                  <p className="text-xs md:text-sm text-slate-300 font-serif italic leading-relaxed opacity-90">
                    "{source.citation}"
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};