import React from 'react';
import { PresentationSectionId } from '../types';
import { 
  LayoutTemplate, 
  Target, 
  Database, 
  AlertTriangle, 
  Cpu, 
  GitMerge, 
  Flag 
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
  currentSection: PresentationSectionId;
  onSelect: (id: PresentationSectionId) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
}

const SECTIONS: { id: PresentationSectionId; label: string; icon: any }[] = [
  { id: 'cover', label: 'Inicio', icon: LayoutTemplate },
  { id: 'objectives', label: 'Objetivos', icon: Target },
  { id: 'sources', label: 'Fuentes de Datos', icon: Database },
  { id: 'problem', label: 'Problemática', icon: AlertTriangle },
  { id: 'solution', label: 'Solución OKTO', icon: Cpu },
  { id: 'methodology', label: 'Metodología & Impacto', icon: GitMerge },
  { id: 'conclusion', label: 'Conclusión', icon: Flag },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentSection, onSelect, isOpen, onCloseMobile }) => {
  return (
    <aside 
      className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static flex flex-col shadow-2xl
      `}
    >
      <div className="p-6 border-b border-slate-800 bg-slate-900 z-10">
        <div className="flex items-center gap-3 text-white">
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-lg shadow-lg shadow-cyan-500/20">
             <Cpu size={24} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight">OKTO</h1>
            <p className="text-[10px] text-cyan-400 font-medium uppercase tracking-wider">Business Analytics</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
        {SECTIONS.map((section) => {
            const Icon = section.icon;
            const isActive = currentSection === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => { onSelect(section.id); onCloseMobile(); }}
                className={`relative w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group
                  ${isActive 
                    ? 'bg-slate-800 text-cyan-400 shadow-lg border border-slate-700/50' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}
                `}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
                  />
                )}
                
                <Icon size={20} className={`transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                <span className="font-medium text-sm tracking-wide">{section.label}</span>
              </button>
            );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
          <p className="text-[10px] text-slate-500 text-center uppercase tracking-widest font-semibold">
             Tesis Maestría 2025
          </p>
        </div>
      </div>
    </aside>
  );
};