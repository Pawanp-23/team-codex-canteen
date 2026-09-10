import React, { useState } from 'react';
import { Language, AppView, HubTab, AuthUser } from '../types';
import {
  Cloud,
  ChevronDown,
  User,
  Menu,
  X,
  Store,
  Layers,
  ChefHat,
  BarChart3,
  ShieldCheck,
  LogOut,
  Sparkles,
  KeyRound,
} from 'lucide-react';

interface HeaderProps {
  lang?: Language;
  onToggleLang?: (newLang: Language) => void;
  activeView: AppView;
  onSelectView: (view: AppView) => void;
  onOpenBookDemo: () => void;
  onOpenSignIn: () => void;
  onNavigateHubTab?: (tab: HubTab) => void;
  currentUser?: AuthUser | null;
  onOpenAuthModal?: (mode?: 'signin' | 'signup') => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onSelectView,
  onOpenBookDemo,
  onOpenSignIn,
  onNavigateHubTab,
  currentUser,
  onOpenAuthModal,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [integrationsOpen, setIntegrationsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleLaunchTerminal = (tab: HubTab = 'pos') => {
    onSelectView('live-hub');
    if (onNavigateHubTab) onNavigateHubTab(tab);
    setProductsOpen(false);
    setSolutionsOpen(false);
    setIntegrationsOpen(false);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#fbf8ff]/90 backdrop-blur-xl border-b border-black/[0.04] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onSelectView('landing')}
            className="flex items-center gap-2.5 transition-transform hover:scale-[1.02] text-left group"
            id="brand-logo-btn"
          >
            <div className="w-10 h-10 rounded-xl bg-[#F97316] flex items-center justify-center shadow-[0_8px_20px_-2px_rgba(249,115,22,0.35)] text-white">
              <Cloud className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-[22px] tracking-tight text-[#1a1b22] leading-none font-heading">
                PosBytz
              </span>
              <span className="text-[10px] font-bold text-[#F97316] tracking-widest uppercase leading-none mt-1">
                Cloud ERP
              </span>
            </div>
          </button>

          {/* Quick View Switcher Pill */}
          <div className="hidden md:flex items-center p-1 rounded-full bg-stone-200/60 text-xs font-semibold">
            <button
              onClick={() => onSelectView('landing')}
              className={`px-3 py-1 rounded-full transition-all ${
                activeView === 'landing'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Product Tour
            </button>
            <button
              onClick={() => onSelectView('order-system')}
              className={`px-3 py-1 rounded-full transition-all flex items-center gap-1 ${
                activeView === 'order-system'
                  ? 'bg-[#1A1B22] text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>📋 Order Portal</span>
            </button>
            <button
              onClick={() => handleLaunchTerminal('pos')}
              className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                activeView === 'live-hub'
                  ? 'bg-[#F97316] text-white shadow-sm'
                  : 'text-stone-600 hover:text-[#F97316]'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>⚡ Live ERP</span>
            </button>
          </div>
        </div>

        {/* Desktop Navigation Mega Menus */}
        <nav className="hidden xl:flex items-center gap-6">
          {/* Products Dropdown */}
          <div
            className="relative py-2"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              className="text-[14px] font-semibold text-stone-700 hover:text-[#F97316] transition-colors flex items-center gap-1 py-1"
              id="nav-products-btn"
            >
              <span>Products</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  productsOpen ? 'rotate-180 text-[#F97316]' : ''
                }`}
              />
            </button>
            {productsOpen && (
              <div className="absolute top-full left-0 w-72 p-3 bg-white rounded-2xl shadow-[0_12px_32px_-4px_rgba(15,23,42,0.12)] border border-stone-100 flex flex-col gap-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <button
                  onClick={() => handleLaunchTerminal('pos')}
                  className="p-2.5 rounded-xl text-left hover:bg-orange-50/70 transition-colors flex items-start gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#F97316] flex items-center justify-center shrink-0 mt-0.5">
                    <Store className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-stone-900 group-hover:text-[#F97316] flex items-center gap-1">
                      <span>Point of Sale (POS)</span>
                      <span className="text-[10px] font-semibold px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded">Live</span>
                    </div>
                    <div className="text-xs text-stone-500">High-velocity touch terminal</div>
                  </div>
                </button>

                <button
                  onClick={() => handleLaunchTerminal('kds')}
                  className="p-2.5 rounded-xl text-left hover:bg-stone-50 transition-colors flex items-start gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <ChefHat className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-stone-900 group-hover:text-emerald-700">
                      Kitchen Display (KDS)
                    </div>
                    <div className="text-xs text-stone-500">Zomato, Swiggy & dine-in routing</div>
                  </div>
                </button>

                <button
                  onClick={() => handleLaunchTerminal('inventory')}
                  className="p-2.5 rounded-xl text-left hover:bg-stone-50 transition-colors flex items-start gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-stone-900 group-hover:text-amber-700">
                      Smart Inventory Matrix
                    </div>
                    <div className="text-xs text-stone-500">Gram-level recipe depletion</div>
                  </div>
                </button>

                <button
                  onClick={() => handleLaunchTerminal('zatca')}
                  className="p-2.5 rounded-xl text-left hover:bg-stone-50 transition-colors flex items-start gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-stone-900 group-hover:text-rose-700 flex items-center gap-1.5">
                      <span>Indian GST & E-Invoicing</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase">India</span>
                    </div>
                    <div className="text-xs text-stone-500">Automated CGST/SGST & B2C QR</div>
                  </div>
                </button>

                <button
                  onClick={() => handleLaunchTerminal('analytics')}
                  className="p-2.5 rounded-xl text-left hover:bg-stone-50 transition-colors flex items-start gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-stone-900 group-hover:text-indigo-700">
                      Executive Analytics & BI
                    </div>
                    <div className="text-xs text-stone-500">Multi-branch P&L dashboard</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Solutions Dropdown */}
          <div
            className="relative py-2"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <button
              className="text-[14px] font-semibold text-stone-700 hover:text-[#F97316] transition-colors flex items-center gap-1 py-1"
              id="nav-solutions-btn"
            >
              <span>Solutions</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  solutionsOpen ? 'rotate-180 text-[#F97316]' : ''
                }`}
              />
            </button>
            {solutionsOpen && (
              <div className="absolute top-full left-0 w-64 p-3 bg-white rounded-2xl shadow-[0_12px_32px_-4px_rgba(15,23,42,0.12)] border border-stone-100 flex flex-col gap-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <button
                  onClick={() => {
                    onSelectView('landing');
                    setSolutionsOpen(false);
                  }}
                  className="p-2 rounded-lg text-left text-sm font-medium text-stone-700 hover:bg-stone-50 hover:text-stone-900"
                >
                  Restaurants & Specialty Cafes
                </button>
                <button
                  onClick={() => {
                    onSelectView('landing');
                    setSolutionsOpen(false);
                  }}
                  className="p-2 rounded-lg text-left text-sm font-medium text-stone-700 hover:bg-stone-50 hover:text-stone-900"
                >
                  Retail & Fashion Stores
                </button>
                <button
                  onClick={() => {
                    onSelectView('landing');
                    setSolutionsOpen(false);
                  }}
                  className="p-2 rounded-lg text-left text-sm font-medium text-stone-700 hover:bg-stone-50 hover:text-stone-900"
                >
                  Multi-Outlet Franchises
                </button>
                <button
                  onClick={() => {
                    onSelectView('landing');
                    setSolutionsOpen(false);
                  }}
                  className="p-2 rounded-lg text-left text-sm font-medium text-stone-700 hover:bg-stone-50 hover:text-stone-900"
                >
                  Supermarkets & FMCG
                </button>
              </div>
            )}
          </div>

          {/* Integrations Dropdown */}
          <div
            className="relative py-2"
            onMouseEnter={() => setIntegrationsOpen(true)}
            onMouseLeave={() => setIntegrationsOpen(false)}
          >
            <button
              className="text-[14px] font-semibold text-stone-700 hover:text-[#F97316] transition-colors flex items-center gap-1 py-1"
              id="nav-integrations-btn"
            >
              <span>Integrations</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  integrationsOpen ? 'rotate-180 text-[#F97316]' : ''
                }`}
              />
            </button>
            {integrationsOpen && (
              <div className="absolute top-full left-0 w-64 p-3 bg-white rounded-2xl shadow-[0_12px_32px_-4px_rgba(15,23,42,0.12)] border border-stone-100 flex flex-col gap-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-2 py-1 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                  Certified Connectors
                </div>
                <button
                  onClick={() => handleLaunchTerminal('zatca')}
                  className="p-2 rounded-lg text-left text-sm font-medium text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 flex items-center justify-between"
                >
                  <span>GST & E-Invoicing Rails</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                </button>
                <button
                  onClick={() => {
                    onSelectView('landing');
                    setIntegrationsOpen(false);
                    const el = document.getElementById('integrations-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="p-2 rounded-lg text-left text-sm font-medium text-stone-700 hover:bg-stone-50"
                >
                  Razorpay, Paytm & UPI QR
                </button>
                <button
                  onClick={() => {
                    onSelectView('landing');
                    setIntegrationsOpen(false);
                    const el = document.getElementById('integrations-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="p-2 rounded-lg text-left text-sm font-medium text-stone-700 hover:bg-stone-50"
                >
                  Zomato, Swiggy & Dunzo
                </button>
                <button
                  onClick={() => {
                    onSelectView('landing');
                    setIntegrationsOpen(false);
                    const el = document.getElementById('integrations-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="p-2 rounded-lg text-left text-sm font-medium text-stone-700 hover:bg-stone-50"
                >
                  Shopify, WooCommerce & ONDC
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              onSelectView('landing');
              const el = document.getElementById('faq-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-[14px] font-semibold text-stone-700 hover:text-[#F97316] transition-colors"
          >
            Pricing
          </button>

          <button
            onClick={() => {
              onSelectView('landing');
              const el = document.getElementById('testimonials-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-[14px] font-semibold text-stone-700 hover:text-[#F97316] transition-colors"
          >
            Resources
          </button>
        </nav>

        {/* Action Controls & Creator Attribution Badge */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Creator Attribution Badge - Guaranteed Single Line, Never Squished */}
          <div className="hidden lg:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1a1b22] text-white text-xs font-semibold whitespace-nowrap shrink-0 shadow-sm border border-stone-800">
            <span className="w-2 h-2 rounded-full bg-[#F97316] shrink-0 animate-pulse"></span>
            <span className="font-mono tracking-tight text-white font-medium">
              Pawan Patil • Team CodeX
            </span>
          </div>

          {/* India Edition Status Pill */}
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 whitespace-nowrap shrink-0">
            <span>🇮🇳 India • ₹ INR</span>
          </div>

          {/* Auth Controls or User Profile Pill */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 hover:bg-orange-100 transition-colors shadow-sm"
                id="user-profile-menu-btn"
              >
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-6 h-6 rounded-full object-cover border border-orange-300"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-[#F97316] text-white text-[11px] font-bold flex items-center justify-center">
                    {currentUser.name.charAt(0)}
                  </div>
                )}
                <div className="text-left hidden md:block">
                  <div className="text-xs font-bold text-stone-900 leading-none truncate max-w-[110px]">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-orange-700 font-semibold leading-none mt-0.5">
                    {currentUser.role}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
              </button>

              {/* User Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-stone-200 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="p-3 bg-stone-50 rounded-xl mb-2">
                    <p className="text-xs font-bold text-stone-900">{currentUser.name}</p>
                    <p className="text-[11px] text-stone-500 truncate">{currentUser.email}</p>
                    {currentUser.phone && (
                      <p className="text-[11px] text-stone-500">{currentUser.phone}</p>
                    )}
                    <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-orange-100 text-orange-800 text-[10px] font-bold">
                      <span>{currentUser.role}</span>
                      {currentUser.rollNo && <span>• {currentUser.rollNo}</span>}
                    </div>
                  </div>

                  <button
                    onClick={() => handleLaunchTerminal('pos')}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-orange-50 hover:text-[#F97316] rounded-xl flex items-center gap-2 transition-colors"
                  >
                    <Store className="w-4 h-4 text-[#F97316]" />
                    <span>Launch POS Terminal</span>
                  </button>

                  <button
                    onClick={() => {
                      onSelectView('order-system');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-100 rounded-xl flex items-center gap-2 transition-colors"
                  >
                    <Layers className="w-4 h-4 text-stone-500" />
                    <span>Open Order & Stock Portal</span>
                  </button>

                  <div className="my-1 border-t border-stone-100" />

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      if (onLogout) onLogout();
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2 transition-colors"
                    id="header-logout-btn"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onOpenAuthModal && onOpenAuthModal('signin')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold text-stone-700 hover:text-stone-950 hover:bg-stone-100 transition-colors"
                id="header-signin-btn"
              >
                <KeyRound className="w-3.5 h-3.5 text-[#F97316]" />
                <span>Sign In</span>
              </button>

              <button
                onClick={() => onOpenAuthModal && onOpenAuthModal('signup')}
                className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-full bg-stone-900 hover:bg-black text-white font-bold text-xs whitespace-nowrap transition-all shadow-sm"
                id="header-signup-btn"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Book a Demo CTA */}
          <button
            onClick={onOpenBookDemo}
            className="hidden md:inline-flex items-center justify-center px-3.5 py-1.5 rounded-full bg-[#F97316] text-white font-bold text-xs whitespace-nowrap shadow-[0_6px_16px_-2px_rgba(249,115,22,0.35)] hover:bg-[#EA580C] transition-all transform hover:-translate-y-0.5 active:translate-y-0 shrink-0"
            id="book-demo-btn"
          >
            Book Demo
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-100 shrink-0"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-stone-200 px-6 py-4 flex flex-col gap-3 shadow-xl animate-in fade-in slide-in-from-top-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              Workspace Mode
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onSelectView('landing');
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  activeView === 'landing' ? 'bg-[#F97316] text-white' : 'bg-stone-100 text-stone-700'
                }`}
              >
                Website
              </button>
              <button
                onClick={() => handleLaunchTerminal('pos')}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  activeView === 'live-hub' ? 'bg-[#F97316] text-white' : 'bg-stone-100 text-stone-700'
                }`}
              >
                Live Hub
              </button>
            </div>
          </div>

          {currentUser ? (
            <div className="p-3 bg-orange-50/70 rounded-2xl border border-orange-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-stone-900">{currentUser.name}</p>
                <p className="text-[11px] text-stone-500">{currentUser.email} • {currentUser.role}</p>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onLogout) onLogout();
                }}
                className="px-2.5 py-1 bg-rose-100 text-rose-700 text-xs font-bold rounded-lg"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenAuthModal) onOpenAuthModal('signin');
                }}
                className="py-2 rounded-xl text-center font-bold text-xs text-stone-800 bg-stone-100"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenAuthModal) onOpenAuthModal('signup');
                }}
                className="py-2 rounded-xl text-center font-bold text-xs text-white bg-stone-900"
              >
                Create Account
              </button>
            </div>
          )}

          <button
            onClick={() => handleLaunchTerminal('pos')}
            className="p-2 rounded-lg text-left text-sm font-semibold text-stone-800 hover:bg-orange-50 flex items-center gap-2"
          >
            <Store className="w-4 h-4 text-[#F97316]" />
            <span>Point of Sale (POS) Terminal</span>
          </button>
          <button
            onClick={() => handleLaunchTerminal('kds')}
            className="p-2 rounded-lg text-left text-sm font-semibold text-stone-800 hover:bg-emerald-50 flex items-center gap-2"
          >
            <ChefHat className="w-4 h-4 text-emerald-600" />
            <span>Kitchen Display System (KDS)</span>
          </button>
          <button
            onClick={() => handleLaunchTerminal('inventory')}
            className="p-2 rounded-lg text-left text-sm font-semibold text-stone-800 hover:bg-amber-50 flex items-center gap-2"
          >
            <Layers className="w-4 h-4 text-amber-600" />
            <span>Inventory & Recipe Depletion</span>
          </button>
          <button
            onClick={() => handleLaunchTerminal('zatca')}
            className="p-2 rounded-lg text-left text-sm font-semibold text-stone-800 hover:bg-rose-50 flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-rose-600" />
            <span>GST & E-Invoicing Terminal</span>
          </button>

          <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenBookDemo();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl text-center font-semibold text-white bg-[#F97316] shadow-md"
            >
              Book a Demo
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
