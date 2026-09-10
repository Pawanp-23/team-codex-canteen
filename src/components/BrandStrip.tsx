import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Language } from '../types';
import { Coffee, Store, Utensils, CupSoda, ShoppingBag, Croissant } from 'lucide-react';

interface BrandStripProps {
  lang?: Language;
}

export const BrandStrip: React.FC<BrandStripProps> = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const driftX1 = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  const brands = [
    { name: 'Chai Point & Brews', icon: Coffee, color: 'text-[#F97316]' },
    { name: 'Bengaluru Roastery', icon: Store, color: 'text-[#EA580C]' },
    { name: 'Mumbai Grill House', icon: Utensils, color: 'text-[#F59E0B]' },
    { name: 'Malabar Kitchen', icon: CupSoda, color: 'text-emerald-600' },
    { name: 'Delhi Biryani Co.', icon: ShoppingBag, color: 'text-sky-600' },
    { name: 'Punjab Sweet & Spice', icon: Croissant, color: 'text-[#F97316]' },
  ];

  return (
    <section
      ref={containerRef}
      className="py-10 bg-white/90 backdrop-blur-sm border-y border-stone-200/80 overflow-hidden relative"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        <p className="text-center text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-6 font-display">
          Trusted by high-growth hospitality, quick-service cafes, and retail chains across India
        </p>

        <motion.div
          style={{ x: driftX1 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-90"
        >
          {brands.map((brand, idx) => {
            const Icon = brand.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2.5 text-[18px] md:text-[20px] font-bold text-stone-700 hover:text-stone-950 hover:scale-105 transition-all cursor-default font-display"
              >
                <div className="w-8 h-8 rounded-lg bg-stone-50 border border-stone-200/60 flex items-center justify-center shadow-xs">
                  <Icon className={`w-4 h-4 ${brand.color}`} />
                </div>
                <span>{brand.name}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
