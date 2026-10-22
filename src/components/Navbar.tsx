import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Globe, Phone, Menu, X, Calendar } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ClinicLogo } from './ClinicLogo';

interface Props {
  currentLang: Language;
  onOpenLanguageModal: () => void;
  onOpenSearchModal: () => void;
  onOpenBookingModal: () => void;
}

export const Navbar: React.FC<Props> = ({
  currentLang,
  onOpenLanguageModal,
  onOpenSearchModal,
  onOpenBookingModal,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLang];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: t.navHome },
    { href: '#about', label: t.navAbout },
    { href: '#services', label: t.navServices },
    { href: '#tech', label: t.navTech },
    { href: '#contact', label: t.navContact },
  ];

  const languageFlags: Record<Language, { flag: string; label: string }> = {
    fa: { flag: '🇮🇷', label: 'FA' },
    en: { flag: '🇬🇧', label: 'EN' },
    ar: { flag: '🇸🇦', label: 'AR' },
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-sky-500/5 py-3 border-b border-sky-100'
          : 'bg-white/90 backdrop-blur-md py-4 border-b border-sky-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a href="#home" className="flex items-center gap-2 sm:gap-3.5 group">
          <motion.div
            whileHover={{ scale: 1.08, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 sm:w-16 sm:h-16 flex items-center justify-center shrink-0 filter drop-shadow-md"
          >
            <ClinicLogo className="w-full h-full" showText={false} />
          </motion.div>
          <div>
            <div className="text-base sm:text-2xl font-black text-slate-900 group-hover:text-sky-600 transition-colors leading-tight tracking-tight">
              {t.doctorNameFull}
            </div>
            <div className="text-[10px] sm:text-sm text-sky-600 font-extrabold tracking-wide">
              {t.clinicTitle}
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="text-sm font-extrabold text-slate-700 hover:text-sky-600 transition-colors py-1 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
            </a>
          ))}
        </nav>

        {/* Right Actions (Search, Language, Booking CTA) */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Search Trigger */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenSearchModal}
            title={t.searchPlaceholder}
            className="p-2.5 rounded-2xl bg-slate-100 hover:bg-sky-50 text-slate-600 hover:text-sky-600 border border-slate-200 hover:border-sky-200 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span className="hidden xl:inline text-xs text-slate-400 font-mono">
              ⌘K
            </span>
          </motion.button>

          {/* Language Switcher Trigger */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenLanguageModal}
            className="px-3.5 py-2.5 rounded-2xl bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-600 border border-slate-200 hover:border-sky-200 transition-all flex items-center gap-2 font-bold text-xs cursor-pointer"
          >
            <Globe className="w-4 h-4 text-sky-500" />
            <span>{languageFlags[currentLang].flag}</span>
            <span>{languageFlags[currentLang].label}</span>
          </motion.button>

          {/* Direct Call Button */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="tel:09380454547"
            className="p-2.5 rounded-2xl bg-sky-50 text-sky-600 hover:bg-sky-100 border border-sky-200 transition-all"
            title={t.ctaCall}
          >
            <Phone className="w-4 h-4" />
          </motion.a>

          {/* Book Appointment CTA */}
          <motion.button
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenBookingModal}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/40 transition-all flex items-center gap-2 cursor-pointer border border-sky-400/30"
          >
            <Calendar className="w-4 h-4" />
            <span>{t.bookAppointmentBtn}</span>
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenLanguageModal}
            className="p-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
          >
            {languageFlags[currentLang].flag} {languageFlags[currentLang].label}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-2xl bg-slate-100 text-slate-800 hover:bg-sky-50"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden bg-white border-b border-sky-100 px-4 py-6 shadow-xl"
          >
            <div className="flex flex-col gap-4">
              {/* Search Bar Mobile */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearchModal();
                }}
                className="w-full p-3 rounded-2xl bg-slate-100 text-slate-600 text-sm flex items-center gap-3"
              >
                <Search className="w-5 h-5 text-sky-500" />
                <span>{t.searchPlaceholder}</span>
              </button>

              {/* Links */}
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="text-base font-bold text-slate-800 hover:text-sky-600 py-2 border-b border-slate-100"
                >
                  {link.label}
                </a>
              ))}

              {/* Mobile Actions */}
              <div className="pt-2 flex flex-col gap-3">
                <a
                  href="tel:09380454547"
                  className="w-full py-3 rounded-2xl bg-sky-50 text-sky-700 font-extrabold text-center flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>۰۹۳۸۰۴۵۴۵۴۷</span>
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBookingModal();
                  }}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-extrabold text-center shadow-lg shadow-sky-500/25"
                >
                  {t.bookAppointmentBtn}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

