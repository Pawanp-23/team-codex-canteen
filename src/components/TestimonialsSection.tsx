import React from 'react';
import { Language } from '../types';
import { TESTIMONIALS } from '../data/content';
import { Star, CheckCircle2 } from 'lucide-react';

interface TestimonialsSectionProps {
  lang: Language;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  lang,
}) => {
  const isAr = lang === 'ar';

  return (
    <section className="py-20 md:py-28 bg-[#fbf8ff]" id="testimonials-section">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-bold text-[#F97316] uppercase tracking-wider block mb-2 font-heading">
            {isAr ? 'أثر مثبت بالأرقام' : 'Proven Impact'}
          </span>
          <h2 className="text-[28px] md:text-[40px] leading-[34px] md:leading-[48px] font-bold text-[#1a1b22] tracking-tight font-heading">
            {isAr
              ? 'مصمم للعمليات التي تتحرك بسرعة فائقة'
              : 'Built for Operations That Move Fast'}
          </h2>
          <p className="mt-4 text-[16px] md:text-[18px] leading-[26px] md:leading-[28px] text-[#52525B]">
            {isAr
              ? 'اكتشف لماذا تعتمد كبرى سلاسل المطاعم والمقاهي المختصة ومجموعات التجزئة على بوس بايتز يومياً.'
              : 'Discover why premier franchise operators, specialty roasters, and retail groups rely on PosBytz daily.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-7 border border-[#E4E4E7] shadow-sm flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-5">
                  {[...Array(5)].map((_, sIdx) => (
                    <Star key={sIdx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-2 text-xs font-bold text-stone-700">5.0</span>
                </div>

                <p className="text-[15px] leading-[25px] text-[#1a1b22] font-medium mb-6">
                  {isAr ? t.quoteAr : t.quote}
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-stone-100">
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm font-heading ${t.initialsBg} ${t.initialsColor}`}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-bold text-[#1a1b22] flex items-center gap-1.5 font-heading">
                    <span>{t.author}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="text-xs text-[#52525B] mt-0.5">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
