import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Language } from '../types';
import { HERO_IMAGE_URL } from '../data/content';
import {
  ArrowRight,
  PlayCircle,
  Cloud,
  WifiOff,
  TrendingUp,
  ShieldCheck,
  Zap,
  Gauge,
  Network,
  Banknote,
  Terminal,
  Sparkles,
  UtensilsCrossed,
} from 'lucide-react';

interface HeroSectionProps {
  lang?: Language;
  onOpenBookDemo: () => void;
  onOpenFreeTrial: () => void;
  onOpenVideoDemo: () => void;
  onLaunchLiveTerminal: () => void;
  onOpenOrderSystem?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBookDemo,
  onOpenFreeTrial,
  onOpenVideoDemo,
  onLaunchLiveTerminal,
  onOpenOrderSystem,
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax Scroll Tracking for Hero Section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
    restDelta: 0.001,
  });

  // Parallax Transforms
  const glowY = useTransform(smoothScroll, [0, 1], [0, -100]);
  const textY = useTransform(smoothScroll, [0, 1], [0, 45]);
  const mockupY = useTransform(smoothScroll, [0, 1], [0, -40]);
  const mockupRotate = useTransform(smoothScroll, [0, 1], [0, 1.5]);

  // Floating live indicators multi-layer parallax speeds
  const indicatorY1 = useTransform(smoothScroll, [0, 1], [0, -90]); // table turn floats faster
  const indicatorY2 = useTransform(smoothScroll, [0, 1], [0, 60]);  // inventory drifts down
  const indicatorY3 = useTransform(smoothScroll, [0, 1], [0, -70]); // revenue badge lifts

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-28 bg-ambient-light border-b border-stone-200/60"
    >
      {/* Background Micro Grid */}
      <div className="absolute inset-0 bg-dot-matrix opacity-30 pointer-events-none" />

      {/* Atmospheric Ambient Brand Gradients with Parallax Drift */}
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[980px] h-[520px] bg-gradient-to-b from-[#F97316]/14 via-[#EA580C]/6 to-transparent blur-3xl opacity-80"
      />
      <div className="pointer-events-none absolute top-1/3 -right-48 w-96 h-96 rounded-full bg-orange-100/40 blur-3xl" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Eyebrow Pills with Pawan Patil & Team CodeX attribution */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1B22] text-white border border-stone-800 shadow-md text-xs whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5 text-[#F97316] shrink-0" />
            <span>
              Engineered by <strong className="text-[#F97316]">Pawan Patil</strong> • <strong className="text-orange-200">Team CodeX</strong>
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 shadow-xs whitespace-nowrap text-xs font-semibold">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <span>
              🇮🇳 Indian Edition • UPI Payments, GST Invoicing & Zomato/Swiggy Ready
            </span>
          </div>
        </div>

        {/* Hero Headline & Value Proposition with Parallax Shift */}
        <motion.div
          style={{ y: textY }}
          className="max-w-4xl mx-auto text-center mb-10"
        >
          <h1 className="text-[34px] sm:text-[44px] md:text-[58px] leading-[1.14] font-black text-stone-900 tracking-tight font-display">
            The{' '}
            <span className="text-[#F97316] relative inline-block">
              Cloud ERP & POS
              <span className="absolute bottom-1 left-0 w-full h-3 bg-orange-200/50 -z-0 rounded-sm transform -rotate-1"></span>
            </span>{' '}
            Built for Indian Restaurants, Cafes & Retail
          </h1>

          <p className="mt-6 text-[16px] md:text-[18px] leading-[26px] md:leading-[30px] text-stone-600 max-w-2xl mx-auto font-body">
            PosBytz unifies fast cafeteria billing with UPI QR, live ingredient recipe stock depletion, Kitchen Display System (KDS), and Indian GST e-invoicing into one seamless cloud engine.
          </p>

          {/* CTA Action Cluster */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            {onOpenOrderSystem && (
              <button
                onClick={onOpenOrderSystem}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#1A1B22] text-white font-bold text-sm shadow-lg hover:bg-stone-900 hover:shadow-xl transition-all border border-stone-800 transform hover:-translate-y-0.5 active:translate-y-0"
                id="hero-order-portal-btn"
              >
                <UtensilsCrossed className="w-4 h-4 text-[#F97316]" />
                <span>Open Order & Stock Portal (CodeX)</span>
              </button>
            )}

            <button
              onClick={onOpenFreeTrial}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#F97316] text-white font-bold text-sm shadow-[0_8px_22px_-2px_rgba(249,115,22,0.4)] hover:bg-[#EA580C] hover:shadow-[0_12px_28px_-2px_rgba(249,115,22,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              id="hero-get-started-btn"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenVideoDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-stone-900 font-bold text-sm border-2 border-stone-200/90 shadow-sm hover:bg-stone-50 hover:border-orange-300 transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0 group"
              id="hero-watch-demo-btn"
            >
              <div className="relative flex items-center justify-center">
                <PlayCircle className="w-5 h-5 text-[#F97316] fill-orange-100 group-hover:scale-110 transition-transform" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <span>Watch Packaging Video</span>
              <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-950 text-[10px] font-extrabold uppercase tracking-wider font-mono">
                Automated Visual
              </span>
            </button>
          </div>

          {/* Trust Badges Under Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-5 md:gap-x-6 text-stone-600 text-xs font-semibold">
            <span className="flex items-center gap-1.5">
              <Cloud className="w-4 h-4 text-[#EA580C]" />
              <span>Cloud Based</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-stone-300"></span>

            <span className="flex items-center gap-1.5">
              <WifiOff className="w-4 h-4 text-emerald-600" />
              <span>Offline-First POS</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-stone-300"></span>

            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-sky-600" />
              <span>Real-Time Stock Depletion</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-stone-300"></span>

            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Indian GST & UPI Ready</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-stone-300"></span>

            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#EA580C]" />
              <span>99.9% Uptime SLA</span>
            </span>
          </div>
        </motion.div>

        {/* Hero Visual Showcase with Live ERP Pill Highlights and Parallax Depth */}
        <motion.div
          style={{
            y: mockupY,
            rotateX: mockupRotate,
          }}
          className="relative max-w-5xl mx-auto mt-6 perspective-1000"
        >
          <div className="relative rounded-2xl p-2 md:p-3 bg-gradient-to-b from-white/95 to-stone-100/90 backdrop-blur-md shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] border border-stone-200/90 group">
            {/* Mockup Window Bar */}
            <div className="px-4 py-2.5 flex items-center justify-between rounded-t-xl bg-white shadow-xs mb-2 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                <span className="ml-3 text-xs text-stone-400 font-mono hidden sm:inline-block">
                  posbytz.cloud/hub/hq-enterprise
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onLaunchLiveTerminal}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F97316] text-white text-xs font-bold shadow-xs hover:bg-[#EA580C] transition-all"
                  title="Test the live cloud POS terminal and ERP hub"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Launch Interactive App</span>
                </button>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Terminal 04 Online</span>
                </span>
              </div>
            </div>

            {/* Hero Image / Clickable to launch interactive hub */}
            <div
              className="relative overflow-hidden rounded-xl bg-[#0F172A] cursor-pointer"
              onClick={onLaunchLiveTerminal}
              title="Click to open interactive POS and ERP hub"
            >
              <img
                src={HERO_IMAGE_URL}
                alt="PosBytz Cloud ERP dashboard terminal and cafe operations"
                className="w-full h-auto object-cover max-h-[560px] transition-transform duration-500 group-hover:scale-[1.01]"
              />

              {/* Hover Launch Ribbon */}
              <div className="absolute inset-0 bg-stone-950/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                <div className="px-6 py-3 rounded-full bg-[#F97316] text-white font-bold text-sm shadow-2xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <Terminal className="w-4 h-4" />
                  <span>Click to Enter Live Interactive POS Hub</span>
                </div>
              </div>

              {/* Parallax Floating Live Indicator 1: Table Turn */}
              <motion.div
                style={{ y: indicatorY1 }}
                className="hidden md:flex absolute top-6 left-6 items-center gap-3 p-3 rounded-xl bg-white/95 backdrop-blur-md shadow-2xl border border-stone-100 pointer-events-none"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <Gauge className="w-5 h-5" />
                </div>
                <div className="flex flex-col pr-2">
                  <span className="text-xs font-semibold text-stone-500">
                    Average Table Turn
                  </span>
                  <span className="text-sm font-bold text-stone-900 font-heading">
                    18m 42s <span className="text-emerald-600 font-semibold">(+38% Speed)</span>
                  </span>
                </div>
              </motion.div>

              {/* Parallax Floating Live Indicator 2: Central Inventory */}
              <motion.div
                style={{ y: indicatorY2 }}
                className="hidden md:flex absolute bottom-8 left-8 items-center gap-3 p-3.5 rounded-xl bg-white/95 backdrop-blur-md shadow-2xl border border-stone-100 pointer-events-none"
              >
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-[#F97316]">
                  <Network className="w-5 h-5" />
                </div>
                <div className="flex flex-col pr-3">
                  <span className="text-xs font-semibold text-stone-500">
                    Central Inventory Matrix
                  </span>
                  <span className="text-sm font-bold text-stone-900 font-heading">
                    12 Outlets In Sync
                  </span>
                </div>
              </motion.div>

              {/* Parallax Floating Live Indicator 3: Revenue */}
              <motion.div
                style={{ y: indicatorY3 }}
                className="hidden lg:flex absolute bottom-10 right-8 items-center gap-3 p-3.5 rounded-xl bg-[#0A0A0A]/95 text-white backdrop-blur-md shadow-2xl border border-stone-800 pointer-events-none"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Banknote className="w-5 h-5" />
                </div>
                <div className="flex flex-col pr-3">
                  <span className="text-xs font-semibold text-stone-400">
                    Today's Real-time Revenue
                  </span>
                  <span className="text-base font-extrabold text-white font-heading tracking-tight">
                    ₹ 12,48,750.00
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
