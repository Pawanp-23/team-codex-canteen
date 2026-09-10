import React, { useState, useEffect } from 'react';
import { Language, AppView, HubTab } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { BrandStrip } from './components/BrandStrip';
import { CoreOrderSystem } from './components/CoreOrderSystem';
import { OperationsDarkCanvas } from './components/OperationsDarkCanvas';
import { ERPModulesBento } from './components/ERPModulesBento';
import { IntegrationsSection } from './components/IntegrationsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { ConversionBanner } from './components/ConversionBanner';
import { Footer } from './components/Footer';
import { LiveERPHub } from './components/LiveERPHub';
import { DemoModal } from './components/DemoModal';
import { BookDemoModal } from './components/BookDemoModal';
import { FreeTrialModal } from './components/FreeTrialModal';
import { ApiAccessModal } from './components/ApiAccessModal';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [activeView, setActiveView] = useState<AppView>('landing');
  const [hubInitialTab, setHubInitialTab] = useState<HubTab>('pos');

  // Modals state
  const [bookDemoOpen, setBookDemoOpen] = useState(false);
  const [freeTrialOpen, setFreeTrialOpen] = useState(false);
  const [videoDemoOpen, setVideoDemoOpen] = useState(false);
  const [apiModalOpen, setApiModalOpen] = useState(false);

  // Sync HTML document direction with language
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const handleLaunchLiveHubTab = (tab: HubTab = 'pos') => {
    setHubInitialTab(tab);
    setActiveView('live-hub');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`min-h-screen font-sans bg-[#fbf8ff] text-[#1a1b22] ${
        lang === 'ar' ? 'font-arabic' : ''
      }`}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Top Application Header */}
      <Header
        lang={lang}
        onToggleLang={(newLang) => setLang(newLang)}
        activeView={activeView}
        onSelectView={(view) => setActiveView(view)}
        onOpenBookDemo={() => setBookDemoOpen(true)}
        onOpenSignIn={() => handleLaunchLiveHubTab('pos')}
        onNavigateHubTab={(tab) => handleLaunchLiveHubTab(tab)}
      />

      {/* Main View Router */}
      {activeView === 'landing' && (
        <main className="pt-20">
          {/* Hero Section with Pawan Patil & Team CodeX Attribution */}
          <HeroSection
            lang={lang}
            onOpenBookDemo={() => setBookDemoOpen(true)}
            onOpenFreeTrial={() => setFreeTrialOpen(true)}
            onOpenVideoDemo={() => setVideoDemoOpen(true)}
            onLaunchLiveTerminal={() => handleLaunchLiveHubTab('pos')}
            onOpenOrderSystem={() => {
              const el = document.getElementById('core-order-system-block');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                setActiveView('order-system');
              }
            }}
          />

          {/* Trusted Brands Strip */}
          <BrandStrip lang={lang} />

          {/* Core Evaluation Requirements Section (1-6) */}
          <div id="core-order-system-block" className="py-10 bg-stone-50 border-y border-stone-200">
            <CoreOrderSystem lang={lang} />
          </div>

          {/* Core Operations Dark Canvas with Interactive Tabs */}
          <OperationsDarkCanvas
            lang={lang}
            onLaunchHubTab={handleLaunchLiveHubTab}
          />

          {/* Complete 6-Module Bento Grid */}
          <ERPModulesBento
            lang={lang}
            onLaunchHubTab={handleLaunchLiveHubTab}
          />

          {/* Connected Infrastructure & Integrations */}
          <IntegrationsSection
            lang={lang}
            onOpenApiModal={() => setApiModalOpen(true)}
            onOpenBookDemo={() => setBookDemoOpen(true)}
          />

          {/* Customer Reviews & Testimonials */}
          <TestimonialsSection lang={lang} />

          {/* FAQ Accordion & Architecture Advisor */}
          <FAQSection
            lang={lang}
            onOpenBookDemo={() => setBookDemoOpen(true)}
          />

          {/* High-Impact Conversion Banner */}
          <ConversionBanner
            lang={lang}
            onOpenFreeTrial={() => setFreeTrialOpen(true)}
            onOpenBookDemo={() => setBookDemoOpen(true)}
          />

          {/* Comprehensive Footer */}
          <Footer
            lang={lang}
            onLaunchHubTab={handleLaunchLiveHubTab}
            onOpenBookDemo={() => setBookDemoOpen(true)}
            onOpenApiModal={() => setApiModalOpen(true)}
          />
        </main>
      )}

      {activeView === 'order-system' && (
        <div className="pt-20 min-h-[85vh]">
          <CoreOrderSystem
            lang={lang}
            onReturnToHome={() => setActiveView('landing')}
          />
        </div>
      )}

      {activeView === 'live-hub' && (
        <div className="pt-20">
          <LiveERPHub
            lang={lang}
            initialTab={hubInitialTab}
            onReturnToLanding={() => setActiveView('landing')}
          />
        </div>
      )}

      {/* Interactive Modals */}
      {bookDemoOpen && (
        <BookDemoModal
          lang={lang}
          onClose={() => setBookDemoOpen(false)}
        />
      )}

      {freeTrialOpen && (
        <FreeTrialModal
          lang={lang}
          onClose={() => setFreeTrialOpen(false)}
          onLaunchLiveHub={() => handleLaunchLiveHubTab('pos')}
        />
      )}

      {videoDemoOpen && (
        <DemoModal
          lang={lang}
          onClose={() => setVideoDemoOpen(false)}
          onLaunchLiveHub={() => handleLaunchLiveHubTab('pos')}
        />
      )}

      {apiModalOpen && (
        <ApiAccessModal
          lang={lang}
          onClose={() => setApiModalOpen(false)}
        />
      )}
    </div>
  );
}

