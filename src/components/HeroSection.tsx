import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, Calendar, Phone, ShieldCheck, Heart, Award, Star } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ClinicLogo } from './ClinicLogo';

interface Props {
  currentLang: Language;
  onOpenBookingModal: () => void;
}

export const HeroSection: React.FC<Props> = ({ currentLang, onOpenBookingModal }) => {
  const t = translations[currentLang];

  // Parallax Scroll Hooks
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 200]);
  const textY = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 overflow-hidden flex items-center bg-gradient-to-b from-sky-50 via-sky-50/40 to-white">
      {/* Background Parallax Orbs and Wave Art */}
      <motion.div
        style={{ y: bgY, opacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-200/40 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-200/30 rounded-full blur-2xl" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Content (Col 7) */}
          <motion.div style={{ y: textY }} className="lg:col-span-7 text-right">
            
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100/80 border border-sky-200 text-sky-800 text-xs sm:text-sm font-semibold mb-6 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>{t.heroBadge}</span>
            </motion.div>

            {/* Display Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.2] mb-6 tracking-tight"
            >
              {t.heroHeadingMain} <br />
              <span className="bg-gradient-to-r from-sky-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
                {t.heroHeadingAccent}
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-600 text-sm sm:text-xl leading-relaxed mb-8 max-w-2xl font-normal"
            >
              {t.heroSubheading}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenBookingModal}
                className="py-4 px-8 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 text-white font-bold text-base shadow-xl shadow-sky-500/25 hover:shadow-sky-500/35 transition-all flex items-center justify-center gap-3"
              >
                <Calendar className="w-5 h-5" />
                <span>{t.ctaBook}</span>
              </motion.button>

              <a
                href="tel:09380454547"
                className="py-4 px-8 rounded-2xl bg-white hover:bg-sky-50 text-slate-800 hover:text-sky-600 font-bold text-base border border-slate-200 hover:border-sky-300 shadow-md transition-all flex items-center justify-center gap-3"
              >
                <Phone className="w-5 h-5 text-sky-500" />
                <span>{t.ctaCall}</span>
              </a>
            </motion.div>

            {/* Highlight Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-slate-200/60">
              <div className="flex items-center gap-3 bg-white/60 sm:bg-transparent p-3 sm:p-0 rounded-2xl sm:rounded-none">
                <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-black text-slate-900 text-base sm:text-2xl">{t.statYears}</div>
                  <div className="text-xs text-slate-500">{t.statYearsLabel}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/60 sm:bg-transparent p-3 sm:p-0 rounded-2xl sm:rounded-none">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center text-cyan-600 shrink-0">
                  <Star className="w-5 h-5 fill-cyan-500" />
                </div>
                <div>
                  <div className="font-black text-slate-900 text-base sm:text-2xl">{t.statPatients}</div>
                  <div className="text-xs text-slate-500">{t.statPatientsLabel}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/60 sm:bg-transparent p-3 sm:p-0 rounded-2xl sm:rounded-none">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-black text-slate-900 text-base sm:text-2xl">{t.statComfort}</div>
                  <div className="text-xs text-slate-500">{t.statComfortLabel}</div>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Parallax Visual Showcase (Col 5) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Main Interactive Card */}
            <div className="relative mx-auto max-w-md bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-sky-100 text-center">
              
              {/* Doctor Avatar Badge with Official Logo */}
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="relative w-48 h-48 mx-auto mb-6"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-sky-400 to-cyan-300 rounded-full blur-xl opacity-70 animate-pulse" />
                <div className="relative w-full h-full rounded-full bg-white p-3 shadow-2xl border-4 border-sky-100 flex flex-col items-center justify-center overflow-hidden">
                  <ClinicLogo className="w-full h-full" showText={true} />
                </div>
              </motion.div>

              {/* Doctor Credentials */}
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-1 tracking-tight">
                دکتر آرزو ساریخانی
              </h3>
              <p className="text-xs sm:text-sm text-sky-600 font-extrabold mb-4">
                {t.specialtyTitle}
              </p>

              <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-100 text-right space-y-2.5 text-xs text-slate-700 font-semibold">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-ping" />
                  <span>فارغ‌التحصیل دانشگاه علوم پزشکی شهید بهشتی</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                  <span>عضو رسمی سازمان نظام پزشکی ایران</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span>تخصص در زیبایی، اندو و ترمیم‌های پیشرفته</span>
                </div>
              </div>

              {/* Floating Element 1: Painless Computerized Anesthesia */}
              <motion.div
                animate={{ y: [-8, 8, -8], rotate: [-1, 1, -1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 right-0 sm:-top-6 sm:-right-6 p-2.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl border border-sky-100 flex items-center gap-2 sm:gap-3 text-right max-w-[180px] sm:max-w-none z-20"
              >
                <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-cyan-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/30">
                  <ShieldCheck className="w-4 h-4 sm:w-6 sm:h-6 fill-white" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs font-black text-slate-900 leading-tight">{t.statComfortLabel}</div>
                  <div className="text-[9px] sm:text-[10px] text-slate-500 font-bold leading-tight">{t.techAnesthesiaTitle}</div>
                </div>
              </motion.div>

              {/* Floating Element 2: 3D Scanner */}
              <motion.div
                animate={{ y: [8, -8, 8], rotate: [1, -1, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 left-0 sm:-bottom-6 sm:-left-6 p-2.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl border border-sky-100 flex items-center gap-2 sm:gap-3 text-right max-w-[200px] sm:max-w-none z-20"
              >
                <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-sky-500/30">
                  <Sparkles className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs font-black text-slate-900 leading-tight">{t.techSectionTitle}</div>
                  <div className="text-[9px] sm:text-[10px] text-sky-600 font-bold leading-tight">{t.techScannerTitle}</div>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
