import React from 'react';
import { motion } from 'framer-motion';
import { PRESENTATION_CONTENT } from '../../constants';
import { ExternalLink } from 'lucide-react';

export const CoverSlide: React.FC = () => {
  const { cover } = PRESENTATION_CONTENT;

  return (
    <div className="h-full flex flex-col items-center justify-center relative overflow-hidden p-8 text-center">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-[#0f172a] -z-20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] animate-pulse -z-10" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-2 mb-12"
      >
        <h1 className="text-xl md:text-3xl font-bold text-white mb-4 tracking-wider uppercase">{cover.mainUniversity}</h1>
        <p className="text-slate-400 text-sm uppercase tracking-[0.2em]">{cover.university1}</p>
        <p className="text-slate-400 text-sm uppercase tracking-[0.2em]">{cover.university2}</p>
        <p className="text-cyan-400 font-semibold text-base mt-2">{cover.program}</p>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-12 relative"
      >
        <div className="absolute inset-0 bg-cyan-400/20 blur-3xl rounded-full -z-10" />
        
        {/* Title OKTO removed as requested */}
        
        <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full mb-8" />
        
        <p className="text-3xl md:text-5xl text-white max-w-5xl mx-auto leading-tight font-bold tracking-tight">
          {cover.subtitle}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="space-y-1 mb-8"
      >
        <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Autores</p>
        {cover.authors.map((author: string, i: number) => (
          <p key={i} className="text-lg text-white font-medium">{author}</p>
        ))}
        <p className="text-slate-500 text-sm mt-8">{cover.date}</p>
      </motion.div>

      {/* URL Footer */}
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 1.2 }}
         className="absolute bottom-8 flex items-center gap-2 text-slate-500/50 hover:text-cyan-500/80 transition-colors"
      >
         <ExternalLink size={14} />
         <span className="text-xs tracking-widest uppercase">{cover.projectUrl}</span>
      </motion.div>
    </div>
  );
};