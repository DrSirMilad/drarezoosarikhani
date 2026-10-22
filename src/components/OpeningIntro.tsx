import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowLeft, ArrowRight, Zap, Globe, Volume2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ClinicLogo } from './ClinicLogo';

interface Props {
  currentLang: Language;
  onSelectLanguage: (lang: Language) => void;
  onEnterSite: () => void;
  customLogoUrl?: string | null;
}

export const OpeningIntro: React.FC<Props> = ({
  currentLang,
  onSelectLanguage,
  onEnterSite,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const t = translations[currentLang];

  // Soft soothing ambient audio synthesizer using Web Audio API
  const playSoftAmbientChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // Soft harmonic relaxing notes (E Major 7 chord: 324Hz, 405Hz, 486Hz, 607Hz)
      const frequencies = [324, 405, 486, 607];
      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Gentle attack and long smooth decay
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.06 / (idx + 1), ctx.currentTime + 0.2 + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.0 + idx * 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + 3.5);
      });
    } catch (err) {
      console.log('Audio Context autoplay prevented or unsupported');
    }
  };

  useEffect(() => {
    // Play initial soft chime on load
    const timer = setTimeout(() => {
      playSoftAmbientChime();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleLanguageChange = (lang: Language) => {
    playSoftAmbientChime();
    onSelectLanguage(lang);
  };

  const handleEnter = () => {
    playSoftAmbientChime();
    setIsVisible(false);
    setTimeout(() => {
      onEnterSite();
    }, 600);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-slate-950 text-white flex items-center justify-center overflow-hidden font-sans select-none"
        >
          {/* Animated Tech Grid Canvas Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15)_0%,transparent_70%)]" />

          {/* Floating Light Beams */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-40 -left-40 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl pointer-events-none"
          />

          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.5, 0.2],
              rotate: [360, 0, 360],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"
          />

          {/* Central Motion Graphics Container */}
          <div className="relative z-10 max-w-2xl w-full px-6 text-center flex flex-col items-center">
            
            {/* Animated Logo Emblem Assembly with Inverted White Background */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 200, delay: 0.2 }}
              className="relative mb-8"
            >
              {/* Outer Glow Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl border-2 border-dashed border-sky-400/40 absolute -inset-2 pointer-events-none"
              />

              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-white p-2 shadow-2xl shadow-sky-500/50 flex items-center justify-center border-4 border-slate-100">
                <ClinicLogo className="w-full h-full" dark={true} showText={true} />
              </div>
            </motion.div>

            {/* Doctor Name & Title Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-3 mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold tracking-wider uppercase">
                <Zap className="w-3.5 h-3.5 text-sky-400" />
                <span>{t.heroBadge}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                {t.doctorNameFull}
              </h1>

              <p className="text-slate-400 text-sm sm:text-base font-medium max-w-md mx-auto">
                {t.specialtyTitle}
              </p>
            </motion.div>

            {/* Language Selection Buttons inside Intro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center justify-center gap-3 mb-8 bg-slate-900/80 p-2 rounded-2xl border border-slate-800 backdrop-blur-md"
            >
              <Globe className="w-4 h-4 text-sky-400 ml-1 shrink-0" />
              {(['fa', 'en', 'ar'] as Language[]).map((lang) => {
                const label =
                  lang === 'fa'
                    ? t.farsiName
                    : lang === 'en'
                    ? t.englishName
                    : t.arabicName;

                return (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      currentLang === lang
                        ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </motion.div>

            {/* Main CTA Button: Enter Clinic */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEnter}
              className="py-4 px-10 bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 text-white font-extrabold text-base rounded-2xl shadow-2xl shadow-sky-500/40 flex items-center justify-center gap-3 border border-sky-400/30 hover:border-sky-300 transition-all cursor-pointer group"
            >
              <Volume2 className="w-5 h-5 text-sky-200" />
              <span>{t.continueBtn}</span>
              {currentLang === 'en' ? (
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              ) : (
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              )}
            </motion.button>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
