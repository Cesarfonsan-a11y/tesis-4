import React, { useState } from 'react';
import { PresentationSectionId } from './types';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// IMPORTS AJUSTADOS A TU ESTRUCTURA REAL
import { Sidebar } from './Sidebar';
import { CoverSlide } from './CoverSlide';
import { ObjectivesSlide } from './ObjectivesSlide';
import { SourcesSlide } from './SourcesSlide';
import { GenericContentSlide } from './GenericContentSlide';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<PresentationSectionId>('cover');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderSection = () => {
    switch (currentSection) {
      case 'cover':
        return <CoverSlide />;
      case 'objectives':
        return <ObjectivesSlide />;
      case 'sources':
        return <SourcesSlide />;
      case 'problem':
        return <GenericContentSlide section="problem" />;
      case 'solution':
        return <GenericContentSlide section="solution" />;
      case 'methodology':
        return <GenericContentSlide section="methodology" />;
      case 'conclusion':
        return <GenericContentSlide section="conclusion" />;
      default:
        return <CoverSlide />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0f172a] overflow-hidden text-slate-100 font-sans antialiased selection:bg-cyan-500/30">
      
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <Sidebar
        currentSection={currentSection}
        onSelect={setCurrentSection}
        isOpen={isSidebarOpen}
        onCloseMobile={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-slate-900">

        <header className="lg:hidden flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md z-30 sticky top-0">
          <span className="font-bold text-lg text-cyan-400 tracking-tight">OKTO</span>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 active:scale-95 transition"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="h-full w-full"
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default App;
