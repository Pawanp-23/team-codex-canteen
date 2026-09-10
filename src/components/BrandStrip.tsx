import React from 'react';
import { Language } from '../types';
import { Coffee, Store, Utensils, CupSoda, ShoppingBag, Croissant } from 'lucide-react';

interface BrandStripProps {
  lang: Language;
}

export const BrandStrip: React.FC<BrandStripProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const brands = [
    { name: 'Karakccino', nameAr: 'كركشينو', icon: Coffee, color: 'text-[#F97316]' },
    { name: 'Vinyl & Brew', nameAr: 'فاينل آند برو', icon: Store, color: 'text-[#9d4300]' },
    { name: 'Sultan Dining', nameAr: 'سلطان داينينغ', icon: Utensils, color: 'text-[#F59E0B]' },
    { name: 'Malabar Kitchen', nameAr: 'مالابار كيتشن', icon: CupSoda, color: 'text-[#006c49]' },
    { name: 'Arabica Global', nameAr: 'أرابيكا جلوبال', icon: ShoppingBag, color: 'text-[#0EA5E9]' },
    { name: 'Le Croissant Club', nameAr: 'لو كرواسون كلوب', icon: Croissant, color: 'text-[#F97316]' },
  ];

  return (
    <section className="py-10 bg-white border-y border-[#E4E4E7] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        <p className="text-center text-[11px] font-bold uppercase tracking-widest text-[#A1A1AA] mb-6 font-heading">
          {isAr
            ? 'موثوق من أسرع سلاسل الضيافة والتجزئة نمواً في الإمارات والسعودية وحول العالم'
            : 'Trusted by high-growth hospitality & retail chains across the UAE, Saudi Arabia, and globally'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-85">
          {brands.map((brand, idx) => {
            const Icon = brand.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2 text-[20px] font-bold text-[#584237] hover:opacity-100 hover:scale-105 transition-all cursor-default font-heading"
              >
                <Icon className={`w-5 h-5 ${brand.color}`} />
                <span>{isAr ? brand.nameAr : brand.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
