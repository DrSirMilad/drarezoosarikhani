import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, MoveHorizontal, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import beforeImg from '../assets/images/before_smile_1785117305495.jpg';
import afterImg from '../assets/images/after_smile_1785117318946.jpg';

interface Props {
  currentLang: Language;
}

export const SmileTransformationSection: React.FC<Props> = ({ currentLang }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const t = translations[currentLang];

  const handleSliderMove = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <section id="gallery" className="py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-bold uppercase tracking-wider mb-4 inline-block">
            {t.smileTransformTitle}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 leading-tight">
            {t.smileTransformHeading}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-medium">
            {t.smileTransformDesc}
          </p>
          <div className="w-20 h-1.5 bg-gradient-to-r from-sky-500 to-cyan-400 mx-auto rounded-full mt-6" />
        </div>

        {/* Before/After Interactive Comparison Container */}
        <div className="max-w-4xl mx-auto bg-slate-900/90 p-3 sm:p-6 rounded-3xl shadow-2xl border border-slate-800 relative">
          
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[500px] rounded-2xl overflow-hidden select-none bg-slate-950 border border-slate-800">
            
            {/* "AFTER" Layer (Full Image Background) */}
            <div className="absolute inset-0">
              <img
                src={afterImg}
                alt="پس از درمان لمینت و زیبایی"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-emerald-500/90 backdrop-blur-md text-[10px] sm:text-xs font-black text-white border border-emerald-300/40 shadow-lg flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{t.afterLabel} (نتیجه درمان)</span>
              </div>
            </div>

            {/* "BEFORE" Layer (Overlay with Clip-Path for perfect responsive overlay) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src={beforeImg}
                alt="قبل از شروع درمان"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md text-[10px] sm:text-xs font-black text-slate-200 border border-slate-700 shadow-lg">
                <span>{t.beforeLabel} (وضعیت اولیه)</span>
              </div>
            </div>

            {/* Divider Line & Interactive Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.9)] z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white text-sky-600 shadow-2xl border-2 border-sky-500 flex items-center justify-center">
                <MoveHorizontal className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>

            {/* Drag Handle Overlay */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={handleSliderMove}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 touch-none"
            />
          </div>

          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-bold px-1 gap-2 text-center sm:text-right">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
              <span>عکس‌های واقعی تغییرات لبخند بیماران دکتر آرزو ساریخانی</span>
            </div>
            <div className="text-[11px] sm:text-xs text-sky-300">
              ↔️ کشیدن نوار وسط برای مقایسه قبل و بعد
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
