import React from 'react';
import { Language, HubTab } from '../types';
import { ERP_MODULES } from '../data/content';
import {
  Store,
  ShoppingCart,
  Layers,
  FileSpreadsheet,
  Users,
  BadgeCheck,
  ArrowRight,
} from 'lucide-react';

interface ERPModulesBentoProps {
  lang: Language;
  onLaunchHubTab: (tab: HubTab) => void;
}

export const ERPModulesBento: React.FC<ERPModulesBentoProps> = ({
  lang,
  onLaunchHubTab,
}) => {
  const isAr = lang === 'ar';

  const iconMap: Record<string, React.ElementType> = {
    point_of_sale: Store,
    shopping_cart_checkout: ShoppingCart,
    inventory_2: Layers,
    account_balance: FileSpreadsheet,
    groups: Users,
    badge: BadgeCheck,
  };

  return (
    <section className="py-20 md:py-28 bg-[#fbf8ff]" id="capabilities-section">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-bold text-[#F97316] uppercase tracking-wider block mb-2 font-heading">
            {isAr ? 'إمكانيات النظام الشاملة' : 'Complete ERP Capabilities'}
          </span>
          <h2 className="text-[28px] md:text-[40px] leading-[34px] md:leading-[48px] font-bold text-[#1a1b22] tracking-tight font-heading">
            {isAr
              ? 'مصمم للتوسع السلس وتعدد الفروع'
              : 'Engineered for Multi-Unit Scalability'}
          </h2>
          <p className="mt-4 text-[16px] md:text-[18px] leading-[26px] md:leading-[28px] text-[#52525B]">
            {isAr
              ? 'انشر الوحدات بشكل فردي أو استفد من القوة الكاملة لمنظومة تخطيط الموارد الموحدة وشاملة الأطراف.'
              : 'Deploy individual components or harness the combined power of an end-to-end unified enterprise resource planning engine.'}
          </p>
        </div>

        {/* 6-Card Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ERP_MODULES.map((module) => {
            const IconComponent = iconMap[module.icon] || Store;
            return (
              <div
                key={module.id}
                className="bg-white rounded-2xl p-7 border border-[#E4E4E7] shadow-sm hover:shadow-xl hover:border-orange-200 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${module.iconBg} ${module.iconColor} group-hover:scale-110 transition-transform`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${module.badgeBg} ${module.badgeColor}`}
                    >
                      {module.badge}
                    </span>
                  </div>

                  <h3 className="text-[20px] font-bold text-[#1a1b22] mb-3 font-heading group-hover:text-[#F97316] transition-colors">
                    {isAr ? module.titleAr : module.title}
                  </h3>

                  <p className="text-[14px] leading-[22px] text-[#52525B] mb-6">
                    {isAr ? module.descriptionAr : module.description}
                  </p>
                </div>

                <button
                  onClick={() => module.targetTab && onLaunchHubTab(module.targetTab)}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#F97316] group-hover:text-[#EA580C] transition-colors pt-2 border-t border-stone-100 cursor-pointer"
                  id={`bento-btn-${module.id}`}
                >
                  <span>{isAr ? module.linkTextAr : module.linkText}</span>
                  <ArrowRight
                    className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${
                      isAr ? 'rotate-180 group-hover:-translate-x-1' : ''
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
