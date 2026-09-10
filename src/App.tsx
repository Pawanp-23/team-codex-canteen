import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'motion/react';
import { Language, AppView, HubTab, AuthUser } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import FloatingFoodHeroDemo from './components/ui/demo';
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
import { AuthModal } from './components/AuthModal';
import { AnimatedChatBot } from './components/AnimatedChatBot';
import { CheckCircle2, Sparkles, ArrowUp, Terminal } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [activeView, setActiveView] = useState<AppView>('landing');
  const [hubInitialTab, setHubInitialTab] = useState<HubTab>('pos');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Global Parallax Scroll Tracker
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Authentication state
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem('posbytz_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [bookDemoOpen, setBookDemoOpen] = useState(false);
  const [freeTrialOpen, setFreeTrialOpen] = useState(false);
  const [videoDemoOpen, setVideoDemoOpen] = useState(false);
  const [apiModalOpen, setApiModalOpen] = useState(false);

  // Set clean LTR document direction
  useEffect(() => {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = 'en';
  }, []);

  const handleLaunchLiveHubTab = (tab: HubTab = 'pos') => {
    setHubInitialTab(tab);
    setActiveView('live-hub');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('posbytz_auth_user', JSON.stringify(user));
    } catch {
      // Ignore storage errors
    }
    setAuthModalOpen(false);
    setToastMessage(`Welcome, ${user.name}! Successfully signed in as ${user.role}.`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('posbytz_auth_user');
    } catch {
      // Ignore storage errors
    }
    setToastMessage('Signed out successfully.');
    setTimeout(() => setToastMessage(null), 4000);
  };

  const openAuth = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen font-sans bg-[#fbf8ff] text-[#1a1b22]" dir="ltr">
      {/* Global Parallax Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F97316] via-[#EA580C] to-amber-500 z-50 origin-left pointer-events-none"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 p-4 rounded-2xl bg-stone-900 text-white shadow-2xl border border-stone-700 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Application Header */}
      <Header
        lang={lang}
        onToggleLang={(newLang) => setLang(newLang)}
        activeView={activeView}
        onSelectView={(view) => setActiveView(view)}
        onOpenBookDemo={() => setBookDemoOpen(true)}
        onOpenSignIn={() => openAuth('signin')}
        onNavigateHubTab={(tab) => handleLaunchLiveHubTab(tab)}
        onOpenVideoDemo={() => setVideoDemoOpen(true)}
        currentUser={currentUser}
        onOpenAuthModal={(mode) => openAuth(mode || 'signin')}
        onLogout={handleLogout}
      />

      {/* Main View Router */}
      {activeView === 'landing' && (
        <main className="pt-20">
          {/* Integrated Floating Food Hero Component with Multi-layer Parallax */}
          <FloatingFoodHeroDemo
            onLaunchTerminal={() => handleLaunchLiveHubTab('pos')}
            onWatchDemo={() => setVideoDemoOpen(true)}
          />

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
            onOpenVideoDemo={() => setVideoDemoOpen(true)}
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
          onOpenBookDemo={() => setBookDemoOpen(true)}
        />
      )}

      {apiModalOpen && (
        <ApiAccessModal
          lang={lang}
          onClose={() => setApiModalOpen(false)}
        />
      )}

      {/* Authentication (Login / Sign Up) Modal with validation */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authModalMode}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Floating Parallax Quick Action Controls on Scroll (Left Dock) */}
      {showScrollTop && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-6 z-40 flex items-center gap-2"
        >
          <button
            onClick={() => handleLaunchLiveHubTab('pos')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#18181B] text-white text-xs font-bold shadow-xl hover:bg-stone-900 border border-stone-800 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            title="Open Cloud POS Terminal"
            id="floating-dock-launch-pos"
          >
            <Terminal className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Launch POS Hub</span>
          </button>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 rounded-full bg-stone-900/90 text-white flex items-center justify-center shadow-xl hover:bg-stone-950 transition-all border border-stone-700 cursor-pointer"
            title="Back to top"
            id="floating-dock-back-to-top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* Interactive Animated ByteBot AI Chat Assistant */}
      <AnimatedChatBot
        onLaunchTerminal={() => handleLaunchLiveHubTab('pos')}
        onOpenOrderSystem={() => setActiveView('order-system')}
        onOpenBookDemo={() => setBookDemoOpen(true)}
        onOpenFreeTrial={() => setFreeTrialOpen(true)}
        onOpenVideoDemo={() => setVideoDemoOpen(true)}
      />
    </div>
  );
}

