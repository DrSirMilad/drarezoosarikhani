import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Globe, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface Props {
  isOpen: boolean;
  currentLang: Language;
  onSelectLanguage: (lang: Language) => void;
  onClose: () => void;
}

export const LanguageSelectorModal: React.FC<Props> = ({
  isOpen,
  currentLang,
  onSelectLanguage,
  onClose,
}) => {
  const t = translations[currentLang];

  const languages: { code: Language; name: string; nativeName: string; dir: 'rtl' | 'ltr'; flag: string }[] = [
    { code: 'fa', name: 'Farsi', nativeName: 'فارسی (پارسی)', dir: 'rtl', flag: '🇮🇷' },
    { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr', flag: '🇬🇧' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl', flag: '🇸🇦' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl border border-sky-100 z-10 text-slate-800"
          >
            {/* Ambient Top Glow */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 bg-sky-400/20 rounded-full blur-2xl pointer-events-none" />

            {/* Icon Header */}
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="w-16 h-16 mx-auto mb-4 bg-gradient-to-tr from-sky-500 to-cyan-400 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-sky-500/20"
              >
                <Globe className="w-8 h-8" />
              </motion.div>

              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 leading-tight">
                {t.welcomeTitle}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                {t.welcomeSubtitle}
              </p>
            </div>

            {/* Language Cards */}
            <div className="space-y-3 mb-8">
              {languages.map((lang, index) => {
                const isSelected = currentLang === lang.code;
                return (
                  <motion.button
                    key={lang.code}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + index * 0.08 }}
                    whileHover={{ scale: 1.02, x: isSelected ? 0 : 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onSelectLanguage(lang.code);
                    }}
                    className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white border-transparent shadow-lg shadow-sky-500/25 ring-2 ring-sky-300'
                        : 'bg-slate-50 hover:bg-sky-50/60 border-slate-200 text-slate-800 hover:border-sky-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <span className="text-2xl sm:text-3xl">{lang.flag}</span>
                      <div className={lang.dir === 'rtl' ? 'text-right' : 'text-left'}>
                        <div className={`font-bold text-base sm:text-lg ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                          {lang.nativeName}
                        </div>
                        <div className={`text-xs ${isSelected ? 'text-sky-100' : 'text-slate-500'}`}>
                          {lang.name}
                        </div>
                      </div>
                    </div>

                    {isSelected ? (
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-slate-300 group-hover:border-sky-400" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Action Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="w-full py-4 px-6 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-2xl shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2 transition-all"
            >
              <Sparkles className="w-5 h-5 text-sky-400" />
              <span>{t.continueBtn}</span>
            </motion.button>

            {/* Bottom Note */}
            <p className="text-center text-xs text-slate-400 mt-4">
              * You can change language anytime from the top navigation bar.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
