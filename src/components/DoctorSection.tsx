import React from 'react';
import { motion } from 'motion/react';
import { Award, GraduationCap, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface Props {
  currentLang: Language;
}

export const DoctorSection: React.FC<Props> = ({ currentLang }) => {
  const t = translations[currentLang];

  const credentials = [
    t.eduTag1,
    t.eduTag2,
    t.eduTag3,
    t.eduTag4,
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Background Accent Lines */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-4 inline-block">
            {t.aboutSectionTitle}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-6 leading-tight">
            {t.aboutSectionHeading}
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-sky-500 to-cyan-400 mx-auto rounded-full" />
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Card Left: Doctor Highlights */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 bg-gradient-to-br from-sky-50/80 via-white to-cyan-50/60 p-8 sm:p-10 rounded-3xl border border-sky-100 shadow-xl shadow-sky-500/5 text-right"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 to-cyan-400 text-white flex items-center justify-center shadow-lg shadow-sky-500/20 shrink-0">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900">
                  {t.doctorNameFull}
                </h3>
                <p className="text-sm font-bold text-sky-600">
                  {t.specialtyTitle}
                </p>
              </div>
            </div>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
              {t.aboutBio}
            </p>

            <div className="space-y-3">
              {credentials.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-sky-100 shadow-sm"
                >
                  <CheckCircle2 className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-sm font-semibold">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card Right: Modern Philosophy & Values */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Feature 1 */}
            <div className="p-6 rounded-3xl bg-slate-50 hover:bg-sky-50/60 border border-slate-100 hover:border-sky-200 transition-all shadow-sm flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-sky-500/20">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-extrabold text-slate-900 mb-2">
                  طراحی اختصاصی لبخند (DSD)
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  بررسی دقیق هارمونی چهره و فرم دندان‌ها به کمک اسکنرهای سه‌بعدی و هوش مصنوعی پیش از شروع هرگونه فرایند درمانی.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-3xl bg-slate-50 hover:bg-sky-50/60 border border-slate-100 hover:border-sky-200 transition-all shadow-sm flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-cyan-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-extrabold text-slate-900 mb-2">
                  تزریق بی‌حسی کامپیوتری بدون حس درد
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  استفاده از سیستم تزریق کنترل‌شده توسط کامپیوتر جهت حذف استرس و سوزش سوزن بی‌حسی در تمام جلسات.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-3xl bg-slate-50 hover:bg-sky-50/60 border border-slate-100 hover:border-sky-200 transition-all shadow-sm flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-extrabold text-slate-900 mb-2">
                  بالاترین میزان رضایت بیماران
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  بیش از ۵۰۰۰ بیمار رضایتمند طی ۱۰ سال گذشته با کادر صمیمی، محیط کاملاً ایزوله و استریل در تهرانپارس.
                </p>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
