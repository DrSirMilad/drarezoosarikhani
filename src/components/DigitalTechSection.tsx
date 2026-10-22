import React from 'react';
import { motion } from 'motion/react';
import { Scan, Syringe, Zap, Bot, Sparkles, CheckCircle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { digitalTechSuite } from '../data/clinicData';

interface Props {
  currentLang: Language;
}

export const DigitalTechSection: React.FC<Props> = ({ currentLang }) => {
  const t = translations[currentLang];

  const getTechIcon = (iconName: string) => {
    switch (iconName) {
      case 'Scan':
        return <Scan className="w-8 h-8 text-sky-500" />;
      case 'Syringe':
        return <Syringe className="w-8 h-8 text-cyan-500" />;
      case 'Zap':
        return <Zap className="w-8 h-8 text-blue-500" />;
      default:
        return <Bot className="w-8 h-8 text-sky-600" />;
    }
  };

  return (
    <section id="tech" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Ambient Tech Glow Backgrounds */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-bold uppercase tracking-wider mb-4 inline-block">
            {t.techSectionTitle}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 leading-tight">
            {t.techSectionHeading}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            بهره‌گیری از آخرین دستاوردهای دندانپزشکی دیجیتال سال ۲۰۲۶ برای بالابردن دقت درمان به سطح میکرون و حذف کامل استرس.
          </p>
          <div className="w-20 h-1.5 bg-gradient-to-r from-sky-400 to-cyan-400 mx-auto rounded-full mt-6" />
        </div>

        {/* Tech Suite Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {digitalTechSuite.map((tech, idx) => {
            const title = t[tech.titleKey] || tech.titleKey;
            const desc = t[tech.descKey] || tech.descKey;

            return (
              <motion.div
                key={tech.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-slate-800/80 backdrop-blur-xl p-8 rounded-3xl border border-sky-500/20 hover:border-sky-400/50 shadow-2xl transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Icon + Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-sky-500/30 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                      {getTechIcon(tech.icon)}
                    </div>
                    <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-[10px] font-bold border border-sky-500/30">
                      {tech.tagKey}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors">
                    {title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {desc}
                  </p>
                </div>

                {/* Bottom Highlight */}
                <div className="pt-4 border-t border-slate-700/80 flex items-center gap-2 text-xs text-cyan-400 font-semibold">
                  <CheckCircle className="w-4 h-4 shrink-0 text-cyan-400" />
                  <span>{tech.highlightKey}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
