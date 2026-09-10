import React, { useState } from 'react';
import { Language, HubTab } from '../types';
import { HARDWARE_IMAGE_URL, HARDWARE_TABS } from '../data/content';
import { CheckCircle2, ChevronRight, Terminal } from 'lucide-react';

interface OperationsDarkCanvasProps {
  lang?: Language;
  onLaunchHubTab: (tab: HubTab) => void;
}

export const OperationsDarkCanvas: React.FC<OperationsDarkCanvasProps> = ({
  onLaunchHubTab,
}) => {
  const [activeTabIdx, setActiveTabIdx] = useState(0);

  const currentTab = HARDWARE_TABS[activeTabIdx];

  const tabMapping: Record<number, HubTab> = {
    0: 'pos',
    1: 'kds',
    2: 'inventory',
    3: 'analytics',
  };

  const labels = [
    'Ring Up Orders in Seconds',
    'Fire Orders Straight to the Line',
    'Stock that Counts Itself',
    'Decisions, Not Just Dashboards',
  ];

  return (
    <section className="py-20 md:py-28 bg-[#0A0A0A] text-[#f1effa] relative overflow-hidden">
      {/* Ambient Backlight Halo */}
      <div className="pointer-events-none absolute -top-40 right-10 w-[500px] h-[500px] bg-[#F97316]/18 blur-[120px] rounded-full"></div>
      <div className="pointer-events-none absolute -bottom-40 left-10 w-[400px] h-[400px] bg-[#006c49]/10 blur-[100px] rounded-full"></div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <span className="text-[11px] font-bold text-[#F97316] uppercase tracking-wider block mb-2 font-heading">
            All-In-One Cloud ERP Ecosystem
          </span>
          <h2 className="text-[28px] md:text-[40px] leading-[34px] md:leading-[48px] font-bold text-white tracking-tight font-heading">
            One Platform for Your Entire Restaurant & Retail Operations
          </h2>
          <p className="mt-4 text-[16px] md:text-[18px] leading-[26px] md:leading-[28px] text-[#A1A1AA]">
            Every counter, kitchen display, warehouse shelf, and accounting ledger working synchronously from a single source of truth — zero spreadsheets, zero manual reconciliation.
          </p>
        </div>

        {/* Interactive Switcher Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-10 border-b border-[#27272A] pb-4">
          {HARDWARE_TABS.map((tab, idx) => {
            const isActive = activeTabIdx === idx;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabIdx(idx)}
                className={`px-5 py-2.5 rounded-full text-[14px] font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#F97316] text-white shadow-[0_8px_20px_-2px_rgba(249,115,22,0.35)] scale-102'
                    : 'bg-[#0F172A] text-[#A1A1AA] hover:text-white hover:bg-stone-800'
                }`}
                id={`ops-tab-btn-${idx}`}
              >
                {labels[idx]}
              </button>
            );
          })}
        </div>

        {/* Tab Content Grid: Narrative + Hardware Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Detailed Narrative */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-md bg-[#0F172A] text-[#F97316] text-[11px] font-bold uppercase tracking-wider mb-3 font-heading border border-orange-500/20">
                {currentTab.badge}
              </span>
              <h3 className="text-[24px] md:text-[30px] leading-[32px] md:leading-[38px] text-white font-bold mb-4 font-heading">
                {currentTab.title}
              </h3>
              <p className="text-[15px] md:text-[16px] leading-[24px] text-[#A1A1AA] mb-6">
                {currentTab.desc}
              </p>

              <ul className="flex flex-col gap-4 text-sm text-stone-200">
                {currentTab.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
                    <span className="leading-snug">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onLaunchHubTab(tabMapping[activeTabIdx])}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F97316] text-white font-semibold text-sm shadow-lg hover:bg-[#EA580C] transition-all hover:scale-102 active:scale-98"
                id="ops-explore-hardware-btn"
              >
                <Terminal className="w-4 h-4" />
                <span>Test Module in Live Terminal</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-[#A1A1AA]">
                iOS • Android • Windows compatible
              </span>
            </div>
          </div>

          {/* Hardware Photo Presentation */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden bg-[#18181B] shadow-2xl p-3 border border-[#27272A] group">
              <img
                src={HARDWARE_IMAGE_URL}
                alt="PosBytz POS hardware setup in store terminal"
                className="w-full h-auto object-cover rounded-xl"
              />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#0A0A0A]/90 backdrop-blur-md border border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-lg">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white">
                    Active Register #01 — Fast Pay & UPI Enabled
                  </span>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#F97316] font-heading">
                  Sub-second Latency
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Enterprise Metrics KPI Strip */}
        <div className="mt-20 pt-10 border-t border-[#27272A] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center p-4 rounded-xl hover:bg-white/[0.02] transition-colors">
            <span className="text-[36px] md:text-[44px] leading-none font-extrabold text-white tracking-tight font-heading">
              5,000+
            </span>
            <span className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mt-2">
              Active Outlets
            </span>
          </div>

          <div className="flex flex-col items-center p-4 rounded-xl hover:bg-white/[0.02] transition-colors">
            <span className="text-[36px] md:text-[44px] leading-none font-extrabold text-[#F97316] tracking-tight font-heading">
              25+
            </span>
            <span className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mt-2">
              Countries Scaled
            </span>
          </div>

          <div className="flex flex-col items-center p-4 rounded-xl hover:bg-white/[0.02] transition-colors">
            <span className="text-[36px] md:text-[44px] leading-none font-extrabold text-white tracking-tight font-heading">
              99.98%
            </span>
            <span className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mt-2">
              SLA Cloud Uptime
            </span>
          </div>

          <div className="flex flex-col items-center p-4 rounded-xl hover:bg-white/[0.02] transition-colors">
            <span className="text-[36px] md:text-[44px] leading-none font-extrabold text-[#4edea3] tracking-tight font-heading">
              24/7/365
            </span>
            <span className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mt-2">
              Regional Support
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
