import React, { useState } from 'react';
import { Language, Integration } from '../types';
import { INTEGRATIONS } from '../data/content';
import { Code2, ArrowUpRight, CheckCircle } from 'lucide-react';

interface IntegrationsSectionProps {
  lang: Language;
  onOpenApiModal: () => void;
  onOpenBookDemo: () => void;
}

export const IntegrationsSection: React.FC<IntegrationsSectionProps> = ({
  lang,
  onOpenApiModal,
  onOpenBookDemo,
}) => {
  const [filter, setFilter] = useState<string>('all');
  const isAr = lang === 'ar';

  const filterTabs = [
    { id: 'all', label: isAr ? 'كافة التكاملات' : 'All Integrations' },
    { id: 'payments', label: isAr ? 'المدفوعات والتقسيط' : 'Payments & BNPL' },
    { id: 'delivery', label: isAr ? 'تطبيقات التوصيل والمطبخ' : 'Delivery & Kitchen' },
    { id: 'compliance', label: isAr ? 'زاتكا والامتثال الضريبي' : 'ZATCA & Tax' },
    { id: 'ecommerce', label: isAr ? 'منصات التجارة الرقمية' : 'Commerce Platforms' },
  ];

  const filteredIntegrations =
    filter === 'all'
      ? INTEGRATIONS
      : INTEGRATIONS.filter((item) => item.category === filter);

  return (
    <section className="py-20 md:py-28 bg-white border-t border-[#E4E4E7]" id="integrations-section">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[11px] font-bold text-[#F97316] uppercase tracking-wider block mb-2 font-heading">
            {isAr ? 'البنية التحتية المتصلة' : 'Connected Infrastructure'}
          </span>
          <h2 className="text-[28px] md:text-[40px] leading-[34px] md:leading-[48px] font-bold text-[#1a1b22] tracking-tight font-heading">
            {isAr
              ? 'متكامل تماماً مع أدواتك وأنظمتك الحالية'
              : 'Unified With Your Existing Tech Stack'}
          </h2>
          <p className="mt-4 text-[16px] md:text-[18px] leading-[26px] md:leading-[28px] text-[#52525B]">
            {isAr
              ? 'اربط مع أكثر من 50 بوابة دفع إقليمية وأساطيل توصيل ومتاجر رقمية ومنصات فوترة حكومية بموصلات معتمدة ثنائية الاتجاه.'
              : 'Plug into 50+ localized payment gateways, delivery fleets, e-commerce stores, and government tax compliance portals with pre-built bi-directional connectors.'}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterTabs.map((tab) => {
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#F97316] text-white shadow-[0_8px_20px_-2px_rgba(249,115,22,0.35)]'
                    : 'bg-[#fbf8ff] text-stone-600 hover:text-stone-900 hover:bg-stone-200/70'
                }`}
                id={`filter-btn-${tab.id}`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Integrations Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIntegrations.map((item) => (
            <div
              key={item.id}
              className="bg-[#fbf8ff] rounded-2xl p-6 border border-[#E4E4E7] shadow-xs hover:shadow-lg hover:border-orange-200 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-sm font-heading ${item.iconBg}`}
                  >
                    {item.iconText}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white text-stone-700 border border-stone-200">
                    {item.categoryLabel}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-[18px] font-bold text-[#1a1b22] font-heading group-hover:text-[#F97316] transition-colors">
                    {item.name}
                  </h3>
                  {item.verified && (
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                </div>

                <span className="text-[12px] font-mono text-stone-400 block mb-3">
                  {item.tag}
                </span>

                <p className="text-[14px] leading-[22px] text-[#52525B] mb-5">
                  {isAr ? item.descriptionAr : item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  {item.badge}
                </span>
                <button
                  onClick={onOpenBookDemo}
                  className="text-stone-400 hover:text-[#F97316] transition-colors p-1"
                  title="Connect Integration"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom API Enterprise Banner */}
        <div className="mt-14 rounded-2xl bg-gradient-to-r from-[#0F172A] to-[#18181B] p-6 md:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-stone-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-[#F97316] flex items-center justify-center shrink-0">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base md:text-lg font-bold font-heading text-white">
                {isAr
                  ? 'هل تحتاج إلى ربط برمجي خاص (Enterprise API)؟'
                  : 'Need a Custom Enterprise API Connector?'}
              </h4>
              <p className="text-xs md:text-sm text-stone-400 mt-1">
                {isAr
                  ? 'ابنِ برمجياتك الوسيطة بسهولة عبر واجهات GraphQL و REST و Webhooks مع بيئات تجريبية آمنة.'
                  : 'Build proprietary middleware using our GraphQL & REST webhook APIs with dedicated sandbox environments.'}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenApiModal}
            className="w-full md:w-auto px-6 py-2.5 rounded-full bg-white text-stone-900 font-semibold text-sm hover:bg-stone-100 transition-all shrink-0 hover:scale-102 cursor-pointer shadow-md"
            id="request-api-docs-btn"
          >
            {isAr ? 'طلب مفتاح ووثائق API' : 'Request API Docs'}
          </button>
        </div>
      </div>
    </section>
  );
};
