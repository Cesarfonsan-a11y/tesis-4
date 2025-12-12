import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SOURCES } from '../../constants';
import { SourceDetail } from '../SourceDetail';
import { SummaryDashboard } from '../SummaryDashboard';
import { ArrowLeft, ZoomIn } from 'lucide-react';

export const SourcesSlide: React.FC = () => {
  const [selectedSourceId, setSelectedSourceId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'summary' | 'detail'>('summary');

  const handleSourceClick = (id: string) => {
    setSelectedSourceId(id);
    setViewMode('detail');
  };

  const handleBack = () => {
    setSelectedSourceId(null);
    setViewMode('summary');
  };

  return (
    <div className="h-full w-full relative">
      <AnimatePresence mode="wait">
        {viewMode === 'summary' ? (
          <motion.div 
            key="summary"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="h-full p-6 md:p-10 overflow-y-auto"
          >
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Fuentes de Información</h2>
              <p className="text-slate-400">Ecosistema de datos para validación, estructura y dinámica de mercado.</p>
            </div>

            {/* Grid of Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
              {SOURCES.map((source: any, index: number) => {
                const Icon = source.icon;
                return (
                  <motion.div
                    key={source.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleSourceClick(source.id)}
                    className="group bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 hover:bg-slate-800 transition-all cursor-pointer hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 rounded-lg bg-slate-900 text-slate-300 group-hover:text-white transition-colors">
                        <Icon size={20} style={{ color: source.color }} />
                      </div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 border border-slate-700 px-2 py-0.5 rounded-full group-hover:border-slate-500 transition-colors">
                        {source.id}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-200 group-hover:text-cyan-400 transition-colors mb-1">{source.title}</h3>
                    <p className="text-xs text-slate-500 mb-3 line-clamp-1">{source.subtitle}</p>
                    <div className="bg-slate-900/50 rounded-lg p-2 mb-3">
                      <p className="text-xs text-slate-300 italic">Role: {source.role}</p>
                    </div>
                    <div className="flex items-center text-cyan-500 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity gap-1">
                      <ZoomIn size={12} />
                      Explorar detalle
                    </div>
                  </motion.div>
                )
              })}
            </div>
            
            {/* Embedded Summary Dashboard */}
             <div className="mt-8 pt-8 border-t border-slate-800">
               <SummaryDashboard />
             </div>

          </motion.div>
        ) : (
          <motion.div 
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="h-full flex flex-col"
          >
            <div className="p-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-20 flex items-center gap-4">
              <button 
                onClick={handleBack}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors text-sm font-medium"
              >
                <ArrowLeft size={16} />
                Volver al Resumen
              </button>
              <span className="text-slate-500 text-sm border-l border-slate-700 pl-4">Detalle de Fuente</span>
            </div>
            <div className="flex-1 overflow-hidden relative">
               {selectedSourceId && <SourceDetail source={SOURCES.find(s => s.id === selectedSourceId)!} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};