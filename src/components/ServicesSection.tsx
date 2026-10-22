import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ShieldCheck, Layers, Activity, HeartPulse, Check, ArrowRight, Calendar } from 'lucide-react';
import { Language, ServiceItem } from '../types';
import { translations } from '../data/translations';
import { clinicServices } from '../data/clinicData';

interface Props {
  currentLang: Language;
  onSelectServiceToBook: (serviceId: string) => void;
}

export const ServicesSection: React.FC<Props> = ({ currentLang, onSelectServiceToBook }) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const t = translations[currentLang];

  const categories = [
    { id: 'all', label: t.filterAll },
    { id: 'cosmetic', label: t.filterCosmetic },
    { id: 'restorative', label: t.filterRestorative },
    { id: 'ortho', label: t.filterOrtho },
    { id: 'surgery', label: t.filterSurgery },
    { id: 'preventive', label: t.filterPreventive },
  ];

  const filteredServices = activeTab === 'all'
    ? clinicServices
    : clinicServices.filter((s) => s.category === activeTab);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-sky-500" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-cyan-500" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-blue-500" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-sky-600" />;
      default:
        return <HeartPulse className="w-6 h-6 text-cyan-600" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-white via-sky-50/40 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-4 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-4 inline-block">
            {t.servicesSectionTitle}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-6 leading-tight">
            {t.servicesSectionHeading}
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-sky-500 to-cyan-400 mx-auto rounded-full" />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-md shadow-sky-500/20'
                    : 'bg-white hover:bg-sky-50 text-slate-700 border border-slate-200 hover:border-sky-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Services Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => {
              const title = t[service.titleKey] || service.titleKey;
              const desc = t[service.descKey] || service.descKey;

              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-3xl p-8 border border-sky-100/80 shadow-xl shadow-sky-500/5 hover:shadow-sky-500/15 hover:border-sky-300 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Icon + Popular Tag */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {getServiceIcon(service.icon)}
                      </div>
                      {service.popular && (
                        <span className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-[11px] font-extrabold">
                          پیشنهاد محبوب
                        </span>
                      )}
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">
                      {title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {desc}
                    </p>

                    {/* Benefits List */}
                    <div className="space-y-2 mb-8 pt-4 border-t border-slate-100">
                      {service.benefits.map((b, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                          <Check className="w-4 h-4 text-sky-500 shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Action */}
                  <button
                    onClick={() => onSelectServiceToBook(service.id)}
                    className="w-full py-3.5 px-5 rounded-2xl bg-sky-50 hover:bg-gradient-to-r hover:from-sky-500 hover:to-cyan-500 text-sky-700 hover:text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 group/btn shadow-sm"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{t.bookServiceQuick}</span>
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
