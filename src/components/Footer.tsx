import React, { useState } from 'react';
import { Language, HubTab } from '../types';
import { Cloud, Send, ShieldCheck, Check } from 'lucide-react';

interface FooterProps {
  lang?: Language;
  onLaunchHubTab: (tab: HubTab) => void;
  onOpenBookDemo: () => void;
  onOpenApiModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onLaunchHubTab,
  onOpenBookDemo,
  onOpenApiModal,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#050505] text-[#f1effa] pt-16 pb-12 border-t border-[#27272A]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        {/* Brand & Newsletter Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-[#27272A]">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#F97316] flex items-center justify-center text-white">
                <Cloud className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-[22px] tracking-tight text-white font-heading">
                PosBytz Cloud ERP
              </span>
            </div>
            <p className="text-sm text-[#A1A1AA] max-w-md leading-relaxed">
              The premier cloud infrastructure powering high-velocity POS, live kitchen routing, automatic inventory depletion, UPI payments, and Indian GST compliance for modern food and retail chains.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2 font-heading">
              Retail Engineering & Insights
            </h4>
            <p className="text-xs text-[#A1A1AA] mb-4">
              Monthly engineering insights on Indian GST e-invoicing, omnichannel routing, and cloud POS architecture.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-sm font-semibold">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Thank you for subscribing to PosBytz insights.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  required
                  className="flex-1 px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-[#F97316]"
                  id="newsletter-email-input"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#F97316] text-white font-semibold text-sm hover:bg-[#EA580C] transition-all flex items-center gap-2 shrink-0 cursor-pointer"
                  id="newsletter-submit-btn"
                >
                  <span>Join</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4 Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 text-sm text-[#A1A1AA]">
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-heading">
              Core Modules
            </h5>
            <ul className="flex flex-col gap-2.5">
              <li>
                <button
                  onClick={() => onLaunchHubTab('pos')}
                  className="hover:text-[#F97316] transition-colors text-left"
                >
                  Point of Sale (POS)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onLaunchHubTab('kds')}
                  className="hover:text-[#F97316] transition-colors text-left"
                >
                  Kitchen Display (KDS)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onLaunchHubTab('inventory')}
                  className="hover:text-[#F97316] transition-colors text-left"
                >
                  Inventory & Recipes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onLaunchHubTab('zatca')}
                  className="hover:text-[#F97316] transition-colors text-left"
                >
                  Indian GST & E-Invoicing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onLaunchHubTab('analytics')}
                  className="hover:text-[#F97316] transition-colors text-left"
                >
                  Executive Analytics & BI
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-heading">
              Solutions
            </h5>
            <ul className="flex flex-col gap-2.5">
              <li>
                <button onClick={onOpenBookDemo} className="hover:text-white transition-colors text-left">
                  Specialty Coffee & Cafes
                </button>
              </li>
              <li>
                <button onClick={onOpenBookDemo} className="hover:text-white transition-colors text-left">
                  Full-Service Restaurants
                </button>
              </li>
              <li>
                <button onClick={onOpenBookDemo} className="hover:text-white transition-colors text-left">
                  Multi-Outlet Franchises
                </button>
              </li>
              <li>
                <button onClick={onOpenBookDemo} className="hover:text-white transition-colors text-left">
                  Supermarkets & Grocery
                </button>
              </li>
              <li>
                <button onClick={onOpenBookDemo} className="hover:text-white transition-colors text-left">
                  Cloud Kitchens & QSR
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-heading">
              Security & Trust
            </h5>
            <ul className="flex flex-col gap-2.5">
              <li className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>GST E-Invoice & B2C QR Verified</span>
              </li>
              <li>
                <span>FSSAI Compliance Ready</span>
              </li>
              <li>
                <span>PCI-DSS Level 1 Certified</span>
              </li>
              <li>
                <span>RBI Digital Payment Compliant</span>
              </li>
              <li>
                <span>ISO 27001 Cloud Infrastructure</span>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-heading">
              Developers
            </h5>
            <ul className="flex flex-col gap-2.5">
              <li>
                <button
                  onClick={onOpenApiModal}
                  className="hover:text-[#F97316] transition-colors text-left"
                >
                  REST & GraphQL API
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenApiModal}
                  className="hover:text-[#F97316] transition-colors text-left"
                >
                  Webhooks & Sandbox
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBookDemo}
                  className="hover:text-white transition-colors text-left"
                >
                  Partner Program
                </button>
              </li>
              <li>
                <a
                  href="#faq-section"
                  className="hover:text-white transition-colors text-left"
                >
                  System Status (99.98%)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-8 border-t border-[#27272A] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#A1A1AA]">
          <div>
            © {new Date().getFullYear()} PosBytz Cloud ERP. Designed & Architected by <span className="text-white font-semibold">Pawan Patil • Team CodeX</span>. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Security Center</span>
            <span className="hover:text-white cursor-pointer">Cookie Settings</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
