import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Clock, Mail, Instagram, Navigation, MessageCircle, ExternalLink } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface Props {
  currentLang: Language;
}

export const LocationContactSection: React.FC<Props> = ({ currentLang }) => {
  const t = translations[currentLang];

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'تهران، تهرانپارس، بلوار شاهد، بین خیابان ادیب(208) و ارفاقی(210)، پلاک 301'
  )}`;

  const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(
    'تهران، تهرانپارس، بلوار شاهد، پلاک ۳۰۱'
  )}`;

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-sky-50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3 inline-block">
            {t.contactTitle}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4 leading-tight">
            {t.addressLabel}
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-sky-500 to-cyan-400 mx-auto rounded-full" />
        </div>

        {/* Contact Info Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card Left: Address & Direct Phone (Col 7) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-gradient-to-br from-sky-50/80 via-white to-cyan-50/60 p-8 sm:p-10 rounded-3xl border border-sky-100 shadow-xl shadow-sky-500/5 flex flex-col justify-between text-right"
          >
            <div className="space-y-8">
              {/* Address Item */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-sky-500/20">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                    {t.addressLabel}
                  </h3>
                  <p className="text-slate-800 text-base sm:text-xl leading-relaxed font-bold">
                    {t.addressValue}
                  </p>
                </div>
              </div>

              {/* Phone Item & WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="w-full">
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                    {t.phoneLabel}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href="tel:09380454547"
                      className="text-2xl sm:text-3xl font-black text-slate-900 hover:text-sky-600 font-mono dir-ltr tracking-wider"
                    >
                      09380454547
                    </a>

                    {/* Enlarged WhatsApp Button */}
                    <a
                      href="https://wa.me/989380454547"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm sm:text-base flex items-center gap-2.5 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all transform hover:-translate-y-0.5"
                    >
                      <MessageCircle className="w-5 h-5 fill-white" />
                      <span>ارتباط مستقیم در واتس‌اپ</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours Item */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                    {t.hoursLabel}
                  </h3>
                  <p className="text-slate-700 text-sm sm:text-base font-semibold">
                    {t.hoursValue}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Action Buttons */}
            <div className="pt-8 border-t border-sky-100 flex flex-col sm:flex-row gap-3 mt-8">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Navigation className="w-4 h-4 text-sky-400" />
                <span>{t.mapDirectionsBtn}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>

              <a
                href={wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-6 rounded-2xl bg-sky-100 hover:bg-sky-200 text-sky-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
              >
                <span>{t.mapWazeBtn}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>

          </motion.div>

          {/* Card Right: Online Social (Col 5) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-slate-900 rounded-3xl p-8 text-white shadow-xl flex flex-col justify-between text-right relative overflow-hidden"
          >
            <div className="space-y-6 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-500/30 text-sky-300 flex items-center justify-center">
                <Instagram className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-2xl font-black mb-2">اینستاگرام رسمی مطب</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 font-medium">
                  نمونه کارهای درمان زیبایی، طراحی لبخند و لمینت‌های دکتر آرزو ساریخانی.
                </p>
                <a
                  href="https://www.instagram.com/dr_sarikhani_dds/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black text-xs dir-ltr shadow-md"
                >
                  <span>@dr_sarikhani_dds</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="pt-6 border-t border-slate-800">
                <div className="flex items-center gap-3 text-slate-300 text-xs font-mono">
                  <Mail className="w-4 h-4 text-sky-400" />
                  <span>info@drarezousarikhani.com</span>
                </div>
              </div>
            </div>

            {/* Quick Navigation Note */}
            <div className="mt-8 p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300">
              <div className="font-bold text-sky-300 flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-sky-400" />
                <span>مسیریابی هوشمند با یک کلیک</span>
              </div>
              <p className="text-slate-400 text-[11px] font-medium leading-relaxed">
                جهت مسیریابی مستقیم به مطب، دکمه گوگل مپ یا ویز را در کادر آدرس انتخاب نمایید.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
