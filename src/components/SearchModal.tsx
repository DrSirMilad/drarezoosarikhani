import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowUpRight, Sparkles, MapPin, Phone, Clock, FileText } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { searchIndex } from '../data/clinicData';

interface Props {
  isOpen: boolean;
  currentLang: Language;
  onClose: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const SearchModal: React.FC<Props> = ({
  isOpen,
  currentLang,
  onClose,
  onNavigateToSection,
}) => {
  const [query, setQuery] = useState('');
  const t = translations[currentLang];

  // Shortcut key handling (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredResults = searchIndex.filter((item) => {
    const title = item.title[currentLang] || item.title['fa'];
    const desc = item.description[currentLang] || item.description['fa'];
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return title.toLowerCase().includes(q) || desc.toLowerCase().includes(q);
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Contact':
        return <MapPin className="w-4 h-4 text-sky-500" />;
      case 'Hours':
        return <Clock className="w-4 h-4 text-cyan-500" />;
      case 'Doctor':
        return <Sparkles className="w-4 h-4 text-sky-600" />;
      default:
        return <FileText className="w-4 h-4 text-sky-400" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-sky-100 overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="relative flex items-center px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <Search className="w-6 h-6 text-sky-500 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                autoFocus
                className="w-full mx-4 bg-transparent text-slate-800 text-base sm:text-lg focus:outline-none placeholder-slate-400 font-medium"
              />
              {query ? (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/60"
                >
                  <X className="w-5 h-5" />
                </button>
              ) : (
                <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-semibold text-slate-400 bg-slate-200/70 rounded-lg">
                  ESC
                </kbd>
              )}
            </div>

            {/* Results List */}
            <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
              {filteredResults.length > 0 ? (
                filteredResults.map((item) => {
                  const title = item.title[currentLang] || item.title['fa'];
                  const desc = item.description[currentLang] || item.description['fa'];

                  return (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.005, x: 2 }}
                      onClick={() => {
                        onNavigateToSection(item.targetSectionId);
                        onClose();
                      }}
                      className="group p-4 rounded-2xl bg-slate-50/80 hover:bg-sky-50 border border-slate-100 hover:border-sky-200 cursor-pointer transition-all flex items-center justify-between"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-xl bg-white shadow-sm border border-slate-100 group-hover:border-sky-200">
                          {getCategoryIcon(item.category)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                              {title}
                            </span>
                            {item.badge && (
                              <span className="px-2 py-0.5 text-xs font-semibold bg-sky-100 text-sky-700 rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                            {desc}
                          </p>
                        </div>
                      </div>

                      <div className="p-2 text-slate-400 group-hover:text-sky-600 transition-colors">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="py-12 text-center text-slate-400">
                  <Search className="w-10 h-10 mx-auto mb-3 text-slate-300" />
                  <p>{t.searchModalNoResults}</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>Dr. Arezou Sarikhani Dental Clinic Search Index</span>
              <span>{t.searchCmdHint}</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
