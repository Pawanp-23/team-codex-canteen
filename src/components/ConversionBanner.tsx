import React from 'react';
import { Language } from '../types';
import { ArrowRight, ShieldCheck, Zap, CreditCard } from 'lucide-react';

interface ConversionBannerProps {
  lang: Language;
  onOpenFreeTrial: () => void;
  onOpenBookDemo: () => void;
}

export const ConversionBanner: React.FC<ConversionBannerProps> = ({
  lang,
  onOpenFreeTrial,
  onOpenBookDemo,
}) => {
  const isAr = lang === 'ar';

  return (
    <section className="py-16 md:py-24 bg-[#0A0A0A] relative overflow-hidden text-white">
      {/* Glow Effects */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-[#F97316]/20 blur-[130px] rounded-full"></div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 relative z-10 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-[11px] font-bold text-[#F97316] uppercase tracking-wider block mb-3 font-heading">
            {isAr ? 'الانتقال إلى الجيل القادم' : 'NEXT-GENERATION RETAIL & HOSPITALITY'}
          </span>
          <h2 className="text-[32px] md:text-[48px] leading-[40px] md:leading-[56px] font-extrabold text-white tracking-tight font-heading">
            {isAr
              ? 'هل أنت مستعد لتحديث وتطوير عمليات فروعك؟'
              : 'Ready to Modernize Your Operations?'}
          </h2>
          <p className="mt-5 text-[16px] md:text-[18px] leading-[26px] md:leading-[28px] text-[#A1A1AA] max-w-2xl mx-auto">
            {isAr
              ? 'انضم إلى أكثر من 5,000 منفذ ريادي يعمل على نظام بوس بايتز السحابي. ابدأ تجربتك المجانية لمدة 14 يوماً أو احجز جلسة مخصصة.'
              : 'Join 5,000+ forward-thinking outlets running on PosBytz Cloud ERP. Start your 14-day free trial today or book a personalized enterprise session.'}
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenFreeTrial}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#F97316] text-white font-bold text-sm shadow-[0_8px_25px_-2px_rgba(249,115,22,0.45)] hover:bg-[#EA580C] hover:scale-102 transition-all cursor-pointer"
              id="cta-free-trial-btn"
            >
              <span>{isAr ? 'التسجيل في التجربة المجانية' : 'Sign Up for Free Trial'}</span>
              <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
            </button>

            <button
              onClick={onOpenBookDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-white/10 text-white font-semibold text-sm border border-white/20 hover:bg-white/15 transition-all cursor-pointer"
              id="cta-book-demo-btn"
            >
              {isAr ? 'حجز عرض تنفيذي' : 'Book an Executive Demo'}
            </button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-400">
            <span className="flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-[#F97316]" />
              <span>{isAr ? 'لا يلزم بطاقة ائتمانية' : 'No Credit Card Required'}</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-stone-700"></span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'تفعيل فوري خلال دقيقتين' : 'Instant 2-Minute Activation'}</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-stone-700"></span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>{isAr ? 'إلغاء في أي وقت' : 'Cancel Anytime'}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
