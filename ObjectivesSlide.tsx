import React from 'react';
import { motion } from 'framer-motion';
import { PRESENTATION_CONTENT } from './constants';
import { Target, CheckCircle2 } from 'lucide-react';

export const ObjectivesSlide: React.FC = () => {
  const { objectives } = PRESENTATION_CONTENT;

  return (
    <div className="h-full p-8 md:p-16 flex flex-col justify-center max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* General Objective */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400">
              <Target size={32} />
            </div>
            <h2 className="text-3xl font-bold text-white">Objetivo General</h2>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl shadow-xl backdrop-blur-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
             <p className="text-xl text-slate-200 leading-relaxed font-light">
               {objectives.general}
             </p>
          </div>
        </motion.div>

        {/* Specific Objectives */}
        <div className="space-y-6">
          <motion.h3 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-white mb-4 pl-2 border-l-4 border-purple-500"
          >
            Objetivos Específicos
          </motion.h3>
          {objectives.specifics.map((obj: string, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (index * 0.15) }}
              className="flex items-start gap-4 bg-slate-900/40 p-5 rounded-xl border border-slate-800 hover:border-purple-500/30 transition-colors"
            >
              <CheckCircle2 className="text-purple-400 mt-1 shrink-0" size={24} />
              <p className="text-lg text-slate-300">{obj}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};
