import React from 'react';
import { Phone, Instagram, MessageCircle, Mail, MapPin } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ClinicLogo } from './ClinicLogo';

interface Props {
  currentLang: Language;
}

export const Footer: React.FC<Props> = ({ currentLang }) => {
  const t = translations[currentLang];

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-12 pb-12 border-b border-slate-800">
          
          {/* Brand Info (Col 5) */}
          <div className="md:col-span-5 text-right space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center shrink-0">
                <ClinicLogo className="w-full h-full" showText={false} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">{t.doctorNameFull}</h3>
                <p className="text-xs text-sky-400 font-extrabold">{t.specialtyTitle}</p>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              {t.footerDesc}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/989380454547"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-800 hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors text-slate-300"
                title="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>

              <a
                href="https://www.instagram.com/dr_sarikhani_dds/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-800 hover:bg-pink-500/20 hover:text-pink-400 transition-colors text-slate-300"
                title="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href="tel:09380454547"
                className="p-3 rounded-xl bg-slate-800 hover:bg-sky-500/20 hover:text-sky-400 transition-colors text-slate-300"
                title="Phone"
              >
                <Phone className="w-5 h-5" />
              </a>

              <a
                href="mailto:info@drarezousarikhani.com"
                className="p-3 rounded-xl bg-slate-800 hover:bg-blue-500/20 hover:text-blue-400 transition-colors text-slate-300"
                title="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Quick Summary (Col 4) */}
          <div className="md:col-span-4 text-right space-y-3 text-xs text-slate-300">
            <h4 className="text-sm font-bold text-sky-400 mb-3">{t.contactTitle}</h4>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
              <span>{t.addressValue}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-cyan-500 shrink-0" />
              <span className="font-mono text-sky-300">۰۹۳۸۰۴۵۴۵۴۷</span>
            </div>
          </div>

          {/* Links / Hours Summary (Col 3) */}
          <div className="md:col-span-3 text-right space-y-2 text-xs text-slate-400">
            <h4 className="text-sm font-bold text-sky-400 mb-3">{t.hoursLabel}</h4>
            <p>شنبه تا پنج‌شنبه: ۹:۰۰ صبح الی ۲۰:۰۰</p>
            <p className="text-slate-500">جمعه‌ها و تعطیلات رسمی: تعطیل</p>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 text-center text-xs text-slate-500">
          {t.footerCopyright}
        </div>
      </div>
    </footer>
  );
};
