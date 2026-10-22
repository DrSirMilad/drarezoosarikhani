import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DoctorSection } from './components/DoctorSection';
import { ServicesSection } from './components/ServicesSection';
import { DigitalTechSection } from './components/DigitalTechSection';
import { SmileTransformationSection } from './components/SmileTransformationSection';
import { LocationContactSection } from './components/LocationContactSection';
import { Footer } from './components/Footer';
import { LanguageSelectorModal } from './components/LanguageSelectorModal';
import { SearchModal } from './components/SearchModal';
import { AppointmentBookingModal } from './components/AppointmentBookingModal';
import { OpeningIntro } from './components/OpeningIntro';
import { AiChatbot } from './components/AiChatbot';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    const saved = localStorage.getItem('clinic_lang') as Language;
    return saved || 'fa';
  });

  const [showIntro, setShowIntro] = useState<boolean>(true);

  const [isLangModalOpen, setIsLangModalOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>();

  // Update HTML direction (RTL for Farsi & Arabic, LTR for English)
  useEffect(() => {
    const dir = currentLang === 'en' ? 'ltr' : 'rtl';
    document.documentElement.dir = dir;
    document.documentElement.lang = currentLang;
    localStorage.setItem('clinic_lang', currentLang);
  }, [currentLang]);

  const handleSelectLanguage = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem('clinic_visited', 'true');
    setIsLangModalOpen(false);
  };

  const handleOpenBookingForService = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
    setIsBookingModalOpen(true);
  };

  const handleNavigateToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased selection:bg-sky-200 selection:text-sky-900">
      {/* High-Tech Motion Graphic Opening Intro */}
      {showIntro && (
        <OpeningIntro
          currentLang={currentLang}
          onSelectLanguage={(lang) => setCurrentLang(lang)}
          onEnterSite={() => {
            sessionStorage.setItem('clinic_intro_seen', 'true');
            setShowIntro(false);
          }}
        />
      )}

      {/* Sticky Navigation Header */}
      <Navbar
        currentLang={currentLang}
        onOpenLanguageModal={() => setIsLangModalOpen(true)}
        onOpenSearchModal={() => setIsSearchModalOpen(true)}
        onOpenBookingModal={() => {
          setPreselectedServiceId(undefined);
          setIsBookingModalOpen(true);
        }}
      />

      {/* Main Parallax Scrolling Sections */}
      <main className="relative">
        <HeroSection
          currentLang={currentLang}
          onOpenBookingModal={() => {
            setPreselectedServiceId(undefined);
            setIsBookingModalOpen(true);
          }}
        />

        <DoctorSection currentLang={currentLang} />

        <ServicesSection
          currentLang={currentLang}
          onSelectServiceToBook={handleOpenBookingForService}
        />

        <DigitalTechSection currentLang={currentLang} />

        <SmileTransformationSection currentLang={currentLang} />

        <LocationContactSection currentLang={currentLang} />
      </main>

      {/* Footer */}
      <Footer currentLang={currentLang} />

      {/* Floating AI Dental Concierge Assistant */}
      <AiChatbot currentLang={currentLang} />

      {/* Enriched Floating Large WhatsApp Action Button Positioned at Bottom-Right */}
      <a
        href="https://wa.me/989380454547"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="ارتباط در واتس‌اپ"
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-emerald-500 text-white shadow-2xl shadow-emerald-500/40 hover:scale-110 hover:bg-emerald-600 transition-all flex items-center justify-center border-2 border-white animate-bounce group"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:pr-2 transition-all duration-300 font-bold text-xs">
          مشاوره مستقیم واتس‌اپ
        </span>
      </a>

      {/* Welcoming Language Selection Modal */}
      <LanguageSelectorModal
        isOpen={isLangModalOpen}
        currentLang={currentLang}
        onSelectLanguage={handleSelectLanguage}
        onClose={() => {
          localStorage.setItem('clinic_visited', 'true');
          setIsLangModalOpen(false);
        }}
      />

      {/* Global Quick Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        currentLang={currentLang}
        onClose={() => setIsSearchModalOpen(false)}
        onNavigateToSection={handleNavigateToSection}
      />

      {/* Streamlined Appointment Booking Modal */}
      <AppointmentBookingModal
        isOpen={isBookingModalOpen}
        currentLang={currentLang}
        preselectedServiceId={preselectedServiceId}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
}

