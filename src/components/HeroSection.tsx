import React from 'react';
import { Language, AppView } from '../types';
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
} from 'lucide-react';

interface HeroSectionProps {
  lang: Language;
  onOpenBookDemo: () => void;
  onOpenFreeTrial: () => void;
  onOpenVideoDemo: () => void;
  onLaunchLiveTerminal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onOpenBookDemo,
  onOpenFreeTrial,
  onOpenVideoDemo,
  onLaunchLiveTerminal,
}) => {
  const isAr = lang === 'ar';

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
      {/* Ambient Brand Gradients */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[920px] h-[480px] bg-gradient-to-b from-[#F97316]/18 via-[#9d4300]/5 to-transparent blur-3xl opacity-70"></div>
      <div className="pointer-events-none absolute top-1/3 -right-48 w-96 h-96 rounded-full bg-[#dae2fd]/40 blur-3xl"></div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Eyebrow Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FFF7ED] text-[#9d4300] border border-orange-200/60 shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F97316] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F97316]"></span>
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider font-heading">
              {isAr
                ? 'نظام سحابي متكامل • موثوق من أكثر من 5,000 علامة تجارية في 25+ دولة'
                : 'All-in-one Cloud ERP • Trusted by 5,000+ Brands Across 25+ Countries'}
            </span>
          </div>
        </div>

        {/* Hero Headline & Value Proposition */}
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h1 className="text-[36px] md:text-[56px] leading-[44px] md:leading-[64px] font-extrabold text-[#1a1b22] tracking-tight font-heading">
            {isAr ? (
              <>
                نظام{' '}
                <span className="text-[#F97316] underline decoration-[#FFF7ED] decoration-wavy underline-offset-8">
                  تخطيط الموارد السحابي
                </span>{' '}
                المصمم للمطاعم ومتاجر التجزئة
              </>
            ) : (
              <>
                The{' '}
                <span className="text-[#F97316] underline decoration-[#fed7aa] decoration-wavy underline-offset-8">
                  Cloud ERP
                </span>{' '}
                Software Built for Retail & Restaurants
              </>
            )}
          </h1>

          <p className="mt-6 text-[16px] md:text-[18px] leading-[26px] md:leading-[28px] text-[#52525B] max-w-2xl mx-auto">
            {isAr
              ? 'يوحد بوس بايتز نقاط البيع السريعة، وإدارة المخزون والوصفات، والتجارة الإلكترونية، والمحاسبة المعتمدة من زاتكا، والولاء في محرك سحابي واحد فائق الاستجابة.'
              : 'PosBytz unifies high-velocity POS, inventory, omnichannel e-commerce, accounting, CRM, and payroll into one responsive cloud engine. Eliminate data silos once and for all.'}
          </p>

          {/* CTA Action Cluster */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenFreeTrial}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#F97316] text-white font-semibold text-sm shadow-[0_8px_20px_-2px_rgba(249,115,22,0.35)] hover:bg-[#EA580C] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              id="hero-get-started-btn"
            >
              <span>{isAr ? 'ابدأ تجربة مجانية الآن' : 'Get Started Free'}</span>
              <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
            </button>

            <button
              onClick={onOpenVideoDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-[#1a1b22] font-semibold text-sm border border-stone-200/80 shadow-sm hover:bg-stone-50 hover:border-stone-300 transition-all duration-150"
              id="hero-watch-demo-btn"
            >
              <PlayCircle className="w-5 h-5 text-[#F97316] fill-orange-100" />
              <span>{isAr ? 'شاهد عرضاً سريعاً (دقيقتان)' : 'Watch 2-Min Demo'}</span>
            </button>
          </div>

          {/* Trust Badges Under Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-5 md:gap-x-6 text-[#584237] text-xs font-semibold">
            <span className="flex items-center gap-1.5">
              <Cloud className="w-4 h-4 text-[#9d4300]" />
              <span>{isAr ? 'سحابي 100%' : 'Cloud Based'}</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-[#A1A1AA]"></span>

            <span className="flex items-center gap-1.5">
              <WifiOff className="w-4 h-4 text-[#006c49]" />
              <span>{isAr ? 'يعمل دون إنترنت' : 'Offline-First POS'}</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-[#A1A1AA]"></span>

            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#0EA5E9]" />
              <span>{isAr ? 'تحليلات مباشرة' : 'Real-Time Insights'}</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-[#A1A1AA]"></span>

            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span>{isAr ? 'جاهز للمرحلة الثانية (زاتكا)' : 'ZATCA Phase 2 Ready'}</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-[#A1A1AA]"></span>

            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#9d4300]" />
              <span>99.9% {isAr ? 'جاهزية خوادم' : 'Uptime'}</span>
            </span>
          </div>
        </div>

        {/* Hero Visual Showcase with Live ERP Pill Highlights */}
        <div className="relative max-w-5xl mx-auto mt-6">
          <div className="relative rounded-2xl p-2 md:p-3 bg-gradient-to-b from-white/95 to-stone-100/90 backdrop-blur-md shadow-2xl border border-stone-200/80 group">
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
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F97316] text-white text-xs font-semibold shadow-xs hover:bg-[#EA580C] transition-all"
                  title="Test the live cloud POS terminal and ERP hub"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>{isAr ? 'تجربة النظام المباشر' : 'Launch Interactive App'}</span>
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
              <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="px-6 py-3 rounded-full bg-[#F97316] text-white font-bold text-sm shadow-2xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <Terminal className="w-4 h-4" />
                  <span>{isAr ? 'اضغط لفتح نقطة البيع ولوحة التحكم التفاعلية' : 'Click to Enter Live Interactive POS Hub'}</span>
                </div>
              </div>

              {/* Dynamic Floating Live Indicator 1: Table Turn */}
              <div className="hidden md:flex absolute top-6 left-6 items-center gap-3 p-3 rounded-xl bg-white/95 backdrop-blur-md shadow-xl border border-stone-100 animate-fade-in pointer-events-none">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <Gauge className="w-5 h-5" />
                </div>
                <div className="flex flex-col pr-2">
                  <span className="text-xs font-semibold text-stone-500">
                    {isAr ? 'معدل دوران الطاولات' : 'Average Table Turn'}
                  </span>
                  <span className="text-sm font-bold text-stone-900 font-heading">
                    18m 42s <span className="text-emerald-600 font-semibold">(+38% Speed)</span>
                  </span>
                </div>
              </div>

              {/* Dynamic Floating Live Indicator 2: Central Inventory */}
              <div className="hidden md:flex absolute bottom-8 left-8 items-center gap-3 p-3.5 rounded-xl bg-white/95 backdrop-blur-md shadow-xl border border-stone-100 pointer-events-none">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-[#F97316]">
                  <Network className="w-5 h-5" />
                </div>
                <div className="flex flex-col pr-3">
                  <span className="text-xs font-semibold text-stone-500">
                    {isAr ? 'مصفوفة المخزون المركزية' : 'Central Inventory Matrix'}
                  </span>
                  <span className="text-sm font-bold text-stone-900 font-heading">
                    {isAr ? '12 فرعاً متزامناً لحظياً' : '12 Outlets In Sync'}
                  </span>
                </div>
              </div>

              {/* Dynamic Floating Live Indicator 3: Revenue */}
              <div className="hidden lg:flex absolute bottom-10 right-8 items-center gap-3 p-3.5 rounded-xl bg-[#0A0A0A]/95 text-white backdrop-blur-md shadow-2xl border border-stone-800 pointer-events-none">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Banknote className="w-5 h-5" />
                </div>
                <div className="flex flex-col pr-3">
                  <span className="text-xs font-semibold text-stone-400">
                    {isAr ? 'إيرادات اليوم في الوقت الفعلي' : "Today's Real-time Revenue"}
                  </span>
                  <span className="text-base font-extrabold text-white font-heading tracking-tight">
                    AED 1,248,750.00
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
