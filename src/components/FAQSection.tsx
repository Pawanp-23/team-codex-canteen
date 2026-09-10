import React, { useState } from 'react';
import { Language } from '../types';
import { FAQS } from '../data/content';
import { ChevronDown, Headphones } from 'lucide-react';

interface FAQSectionProps {
  lang?: Language;
  onOpenBookDemo: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  onOpenBookDemo,
}) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-20 md:py-28 bg-white border-t border-[#E4E4E7]" id="faq-section">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-bold text-[#F97316] uppercase tracking-wider block mb-2 font-heading">
            Clear Answers
          </span>
          <h2 className="text-[28px] md:text-[40px] leading-[34px] md:leading-[48px] font-bold text-[#1a1b22] tracking-tight font-heading">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-[16px] md:text-[18px] leading-[26px] md:leading-[28px] text-[#52525B]">
            Everything you need to know about cloud architecture, hardware flexibility, offline resilience, and Indian GST regulatory compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* FAQ Accordion */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#E4E4E7] bg-[#fbf8ff] overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full p-5 md:p-6 text-left flex items-center justify-between gap-4 font-bold text-[#1a1b22] hover:text-[#F97316] transition-colors cursor-pointer"
                    id={`faq-btn-${idx}`}
                  >
                    <span className="text-[16px] md:text-[17px] font-heading leading-snug">
                      {faq.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 border border-stone-200 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-orange-50 border-orange-200 text-[#F97316]' : 'text-stone-500'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 md:px-6 md:pb-6 text-[15px] leading-[25px] text-[#52525B] border-t border-stone-200/60 pt-4 animate-in fade-in duration-150">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Solutions Architect Assistance Box */}
          <div className="lg:col-span-4 bg-gradient-to-b from-[#0F172A] to-[#18181B] rounded-2xl p-7 text-white shadow-xl border border-stone-800 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-[#F97316] flex items-center justify-center mb-6">
                <Headphones className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold mb-3 font-heading text-white">
                Still have architectural questions?
              </h3>

              <p className="text-sm leading-relaxed text-stone-300 mb-6">
                Speak directly with our enterprise solutions architects for a tailored workflow audit of your outlets.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={onOpenBookDemo}
                className="w-full py-3 rounded-full bg-[#F97316] text-white font-semibold text-sm hover:bg-[#EA580C] transition-all shadow-md text-center"
                id="faq-schedule-call-btn"
              >
                Schedule Architecture Call
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-stone-400 mt-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Avg response: under 15 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
