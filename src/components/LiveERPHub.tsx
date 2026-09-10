import React, { useState } from 'react';
import {
  Language,
  HubTab,
  MenuItem,
  CartItem,
  KDSTicket,
  InventoryItem,
  ZATCAInvoice,
} from '../types';
import {
  SAMPLE_MENU_ITEMS,
  INITIAL_INVENTORY,
  INITIAL_KDS_TICKETS,
  INITIAL_ZATCA_INVOICES,
} from '../data/content';
import confetti from 'canvas-confetti';
import {
  Store,
  ChefHat,
  Layers,
  ShieldCheck,
  BarChart3,
  Search,
  Plus,
  Minus,
  Trash2,
  Receipt,
  CreditCard,
  Banknote,
  Sparkles,
  QrCode,
  ArrowLeft,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Send,
  Printer,
  X,
  RefreshCw,
  SlidersHorizontal,
} from 'lucide-react';

interface LiveERPHubProps {
  lang: Language;
  initialTab?: HubTab;
  onReturnToLanding: () => void;
}

export const LiveERPHub: React.FC<LiveERPHubProps> = ({
  lang,
  initialTab = 'pos',
  onReturnToLanding,
}) => {
  const [activeTab, setActiveTab] = useState<HubTab>(initialTab);
  const [selectedBranch, setSelectedBranch] = useState('Dubai Marina HQ');
  const [activeTable, setActiveTable] = useState('Table 04');
  const [menuFilter, setMenuFilter] = useState<'all' | 'beverages' | 'food' | 'desserts'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Cart State
  const [cart, setCart] = useState<CartItem[]>([
    {
      ...SAMPLE_MENU_ITEMS[0],
      quantity: 2,
      modifiers: ['Oat Milk (+AED 3)'],
    },
    {
      ...SAMPLE_MENU_ITEMS[4],
      quantity: 1,
      modifiers: ['Extra Warm'],
    },
  ]);

  // Inventory State
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);

  // KDS State
  const [tickets, setTickets] = useState<KDSTicket[]>(INITIAL_KDS_TICKETS);

  // ZATCA Invoices
  const [invoices, setInvoices] = useState<ZATCAInvoice[]>(INITIAL_ZATCA_INVOICES);

  // Receipt Modal State
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastPayment, setLastPayment] = useState<{
    method: string;
    total: number;
    invoiceNum: string;
  } | null>(null);

  const isAr = lang === 'ar';

  // Computed Cart Totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const vatRate = 0.15;
  const vatAmount = subtotal * vatRate;
  const grandTotal = subtotal + vatAmount;

  // Add Item to Cart
  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1, modifiers: [] }];
    });

    // Deplete Inventory in real-time
    setInventory((prev) =>
      prev.map((inv) => {
        if (item.category === 'beverages' && inv.id === 'inv-1') {
          return { ...inv, currentStock: Math.max(0, +(inv.currentStock - 0.018).toFixed(3)) };
        }
        if (item.category === 'beverages' && inv.id === 'inv-2') {
          return { ...inv, currentStock: Math.max(0, +(inv.currentStock - 0.18).toFixed(2)) };
        }
        if (item.category === 'food' && inv.id === 'inv-3') {
          return { ...inv, currentStock: Math.max(0, inv.currentStock - 1) };
        }
        if (item.category === 'desserts' && inv.id === 'inv-5') {
          return { ...inv, currentStock: Math.max(0, inv.currentStock - 1) };
        }
        return inv;
      })
    );
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.id === itemId) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Process Checkout
  const handleProcessPayment = (method: string) => {
    if (cart.length === 0) return;

    const newInvoiceNum = `INV-2025-09-00${Math.floor(1850 + Math.random() * 500)}`;
    const newInvoice: ZATCAInvoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: newInvoiceNum,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      buyerName: `Walk-in Guest (${activeTable})`,
      subtotal: +subtotal.toFixed(2),
      vatAmount: +vatAmount.toFixed(2),
      grandTotal: +grandTotal.toFixed(2),
      currency: 'AED',
      qrPayload: 'AQVQb3NCeXR6IENSUDIWCzMxMDI5NDgxODIwMDAwMw==',
      cryptographicHash: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      fatooraStatus: 'CLEARED',
    };

    // Add order to KDS tickets
    const newKdsTicket: KDSTicket = {
      id: `kds-${Date.now()}`,
      orderNumber: `ORD-${Math.floor(9000 + Math.random() * 999)}`,
      source: 'POS Dine-in',
      tableOrChannel: `${activeTable} • Dine-in`,
      items: cart.map((c) => ({
        name: c.name,
        qty: c.quantity,
        modifiers: c.modifiers,
      })),
      elapsedSeconds: 0,
      status: 'preparing',
      createdAt: 'Just now',
    };

    setTickets([newKdsTicket, ...tickets]);
    setInvoices([newInvoice, ...invoices]);
    setLastPayment({
      method,
      total: grandTotal,
      invoiceNum: newInvoiceNum,
    });
    setShowReceipt(true);
    setCart([]);

    // Celebrate checkout completion
    try {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#F97316', '#10B981', '#0EA5E9', '#F59E0B'],
      });
    } catch {
      // ignore
    }
  };

  // Bump KDS status
  const handleBumpKDS = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          if (t.status === 'preparing') return { ...t, status: 'ready' };
          if (t.status === 'ready') return { ...t, status: 'completed' };
        }
        return t;
      })
    );
  };

  // Filtered Menu Items
  const filteredMenuItems = SAMPLE_MENU_ITEMS.filter((item) => {
    const matchesCategory = menuFilter === 'all' || item.category === menuFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameAr.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col font-sans">
      {/* Top POS Hub Header Bar */}
      <div className="bg-[#0A0A0A] border-b border-stone-800 px-4 md:px-6 py-3 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button
            onClick={onReturnToLanding}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 text-stone-300 hover:text-white hover:bg-stone-800 text-xs font-semibold border border-stone-800 transition-colors"
            id="hub-back-btn"
          >
            <ArrowLeft className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
            <span>{isAr ? 'العودة للموقع' : 'Back to Website'}</span>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#F97316] flex items-center justify-center text-white font-bold text-sm">
              PB
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <span>PosBytz Cloud Hub</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] font-normal text-emerald-400">Terminal 04 Active</span>
              </div>
              <div className="text-[11px] text-stone-400 font-mono">
                posbytz.cloud/hub/hq-enterprise
              </div>
            </div>
          </div>
        </div>

        {/* Branch Selector & Shift */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1 text-xs text-stone-300">
            <span className="text-stone-500 font-medium">{isAr ? 'الفرع:' : 'Outlet:'}</span>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
            >
              <option value="Dubai Marina HQ" className="bg-stone-900 text-white">Dubai Marina HQ</option>
              <option value="Riyadh Al Olaya" className="bg-stone-900 text-white">Riyadh Al Olaya</option>
              <option value="Jeddah Corniche" className="bg-stone-900 text-white">Jeddah Corniche</option>
              <option value="Abu Dhabi Mall" className="bg-stone-900 text-white">Abu Dhabi Mall</option>
            </select>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-emerald-950/70 border border-emerald-800/60 text-emerald-400 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ZATCA Phase 2: LIVE</span>
          </div>
        </div>
      </div>

      {/* Screen Mode Tabs (POS, KDS, Inventory, ZATCA, Analytics) */}
      <div className="bg-[#18181B] border-b border-stone-800 px-4 md:px-6 py-2 flex items-center justify-between overflow-x-auto no-scrollbar gap-2">
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab('pos')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'pos'
                ? 'bg-[#F97316] text-white shadow-md'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>{isAr ? 'كاشير نقاط البيع (POS)' : 'POS Terminal'}</span>
          </button>

          <button
            onClick={() => setActiveTab('kds')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer relative ${
              activeTab === 'kds'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <ChefHat className="w-4 h-4" />
            <span>{isAr ? 'شاشات المطبخ (KDS)' : 'Kitchen Display'}</span>
            {tickets.filter((t) => t.status === 'preparing').length > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 font-bold text-[10px] flex items-center justify-center">
                {tickets.filter((t) => t.status === 'preparing').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'inventory'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{isAr ? 'مصفوفة المخزون' : 'Live Inventory'}</span>
          </button>

          <button
            onClick={() => setActiveTab('zatca')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'zatca'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isAr ? 'منظومة فاتورة (زاتكا)' : 'ZATCA Clearance'}</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>{isAr ? 'التحليلات والمبيعات' : 'Executive BI'}</span>
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-4 text-xs text-stone-400">
          <span>
            {isAr ? 'المبيعات اليومية:' : 'Daily Sales:'}{' '}
            <strong className="text-white">AED 48,290.00</strong>
          </span>
          <span className="w-1 h-1 rounded-full bg-stone-600"></span>
          <span>
            {isAr ? 'الطاولات النشطة:' : 'Occupied Tables:'}{' '}
            <strong className="text-emerald-400">8 / 12</strong>
          </span>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto">
        {/* TAB 1: POINT OF SALE (POS) */}
        {activeTab === 'pos' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start max-w-[1400px] mx-auto">
            {/* Left/Center: Menu & Table Map (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-5">
              {/* Tables Quick Bar */}
              <div className="bg-stone-900/90 rounded-2xl p-4 border border-stone-800">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-400 font-heading">
                    {isAr ? 'خريطة الصالة والطاولات النشطة' : 'Floor Map & Active Tables'}
                  </div>
                  <span className="text-xs text-emerald-400 font-medium">
                    {isAr ? 'طاولة محددة:' : 'Selected:'} {activeTable}
                  </span>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                  {['T01', 'T02', 'T03', 'T04', 'T05', 'T06', 'T07', 'T08'].map((tbl, i) => {
                    const isSelected = activeTable === `Table ${tbl.replace('T', '')}`;
                    const isOccupied = i === 1 || i === 3 || i === 6;
                    return (
                      <button
                        key={tbl}
                        onClick={() => setActiveTable(`Table ${tbl.replace('T', '')}`)}
                        className={`p-2.5 rounded-xl text-center border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#F97316] text-white border-orange-400 font-bold shadow-md'
                            : isOccupied
                            ? 'bg-stone-800/80 text-amber-300 border-amber-500/40 hover:bg-stone-800'
                            : 'bg-stone-950 text-stone-400 border-stone-800 hover:bg-stone-900'
                        }`}
                      >
                        <div className="text-xs font-bold">{tbl}</div>
                        <div className="text-[10px] opacity-80 mt-0.5">
                          {isOccupied ? 'Occupied' : 'Free'}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Menu Filters & Search */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-900/90 rounded-2xl p-3 border border-stone-800">
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  {(['all', 'beverages', 'food', 'desserts'] as const).map((cat) => {
                    const labels: Record<string, { en: string; ar: string }> = {
                      all: { en: 'All Items', ar: 'كافة الأصناف' },
                      beverages: { en: '☕ Specialty Drinks', ar: '☕ مشروبات مختصة' },
                      food: { en: '🍔 Gourmet Food', ar: '🍔 وجبات رئيسية' },
                      desserts: { en: '🥐 Artisan Bakery', ar: '🥐 مخبوزات وحلويات' },
                    };
                    return (
                      <button
                        key={cat}
                        onClick={() => setMenuFilter(cat)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                          menuFilter === cat
                            ? 'bg-stone-100 text-stone-950 font-bold'
                            : 'bg-stone-800/60 text-stone-300 hover:bg-stone-800'
                        }`}
                      >
                        {isAr ? labels[cat].ar : labels[cat].en}
                      </button>
                    );
                  })}
                </div>

                <div className="relative w-full sm:w-60">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isAr ? 'بحث في القائمة...' : 'Search menu items...'}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#F97316]"
                  />
                </div>
              </div>

              {/* Menu Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredMenuItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleAddToCart(item)}
                    className="bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 hover:border-orange-500/50 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div className="relative h-36 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[11px] font-mono text-white">
                        {item.calories}
                      </div>
                      <div className="absolute bottom-2 left-2 px-2 py-1 rounded-lg bg-[#F97316] text-white font-extrabold text-xs shadow-md">
                        AED {item.price.toFixed(2)}
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-[#F97316] transition-colors line-clamp-1">
                          {isAr ? item.nameAr : item.name}
                        </h4>
                        <div className="text-[11px] text-stone-400 mt-1 line-clamp-1">
                          {item.ingredients.map((ing) => ing.name).join(', ')}
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                        <span className="text-emerald-400 text-[11px] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Recipe Linked</span>
                        </span>
                        <div className="w-7 h-7 rounded-lg bg-stone-800 text-stone-200 group-hover:bg-[#F97316] group-hover:text-white flex items-center justify-center transition-colors">
                          <Plus className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Interactive Order Cart & Checkout (4 cols) */}
            <div className="lg:col-span-4 bg-stone-900 rounded-2xl p-5 border border-stone-800 flex flex-col justify-between sticky top-20 shadow-2xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                  <div>
                    <h3 className="font-bold text-base text-white flex items-center gap-2">
                      <span>{isAr ? 'الطلب الحالي' : 'Current Order'}</span>
                      <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-[#F97316] text-xs font-mono font-bold">
                        {activeTable}
                      </span>
                    </h3>
                    <div className="text-xs text-stone-400 mt-0.5">
                      Cashier: Chef Tariq • Terminal #04
                    </div>
                  </div>

                  {cart.length > 0 && (
                    <button
                      onClick={handleClearCart}
                      className="text-xs text-stone-400 hover:text-rose-400 transition-colors p-1"
                      title="Clear Order"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Cart Items List */}
                <div className="py-4 flex flex-col gap-3 max-h-[340px] overflow-y-auto no-scrollbar">
                  {cart.length === 0 ? (
                    <div className="py-12 text-center text-stone-500">
                      <Receipt className="w-10 h-10 mx-auto mb-2 opacity-40 text-[#F97316]" />
                      <p className="text-xs">
                        {isAr ? 'سلة الطلبات فارغة، اضغط على صنف لإضافته' : 'No items added. Click menu items to add.'}
                      </p>
                    </div>
                  ) : (
                    cart.map((c) => (
                      <div
                        key={c.id}
                        className="bg-stone-950/70 p-3 rounded-xl border border-stone-800/80 flex items-center justify-between gap-3"
                      >
                        <div className="flex-1">
                          <div className="text-xs font-bold text-white leading-tight">
                            {isAr ? c.nameAr : c.name}
                          </div>
                          {c.modifiers.length > 0 && (
                            <div className="text-[10px] text-orange-400 mt-0.5 font-medium">
                              {c.modifiers.join(', ')}
                            </div>
                          )}
                          <div className="text-xs font-mono text-stone-400 mt-1">
                            AED {(c.price * c.quantity).toFixed(2)}
                          </div>
                        </div>

                        {/* Quantity Buttons */}
                        <div className="flex items-center gap-2 bg-stone-900 px-2 py-1 rounded-lg border border-stone-800">
                          <button
                            onClick={() => handleUpdateQuantity(c.id, -1)}
                            className="text-stone-400 hover:text-white p-0.5"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-white min-w-4 text-center">
                            {c.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(c.id, 1)}
                            className="text-stone-400 hover:text-white p-0.5"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Subtotal & Tax Calculation */}
              <div className="pt-4 border-t border-stone-800 flex flex-col gap-2 text-xs text-stone-300">
                <div className="flex justify-between">
                  <span className="text-stone-400">{isAr ? 'المجموع الفرعي:' : 'Subtotal:'}</span>
                  <span className="font-mono">AED {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">
                    {isAr ? 'ضريبة القيمة المضافة (15%):' : 'VAT (15% ZATCA Compliant):'}
                  </span>
                  <span className="font-mono text-amber-400">AED {vatAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-stone-800">
                  <span>{isAr ? 'المبلغ الإجمالي:' : 'Grand Total:'}</span>
                  <span className="text-[#F97316] font-mono">AED {grandTotal.toFixed(2)}</span>
                </div>

                {/* Instant Payment Actions */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    disabled={cart.length === 0}
                    onClick={() => handleProcessPayment('Mada / Card')}
                    className="p-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:pointer-events-none text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Mada / Card</span>
                  </button>

                  <button
                    disabled={cart.length === 0}
                    onClick={() => handleProcessPayment('Cash')}
                    className="p-3 rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-40 disabled:pointer-events-none text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Banknote className="w-4 h-4" />
                    <span>{isAr ? 'نقداً' : 'Cash'}</span>
                  </button>
                </div>

                <button
                  disabled={cart.length === 0}
                  onClick={() => handleProcessPayment('Tabby BNPL')}
                  className="w-full mt-1 p-2.5 rounded-xl bg-gradient-to-r from-emerald-900 to-teal-900 hover:from-emerald-800 hover:to-teal-800 disabled:opacity-40 disabled:pointer-events-none text-emerald-200 font-semibold text-xs flex items-center justify-center gap-2 border border-emerald-700/50 transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isAr ? 'تقسيط عبر تابي (4 دفعات)' : 'Split in 4 with Tabby BNPL'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: KITCHEN DISPLAY SYSTEM (KDS) */}
        {activeTab === 'kds' && (
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white font-heading">
                  {isAr ? 'شاشات المطبخ الرقمية (KDS)' : 'Live Kitchen Display Routing'}
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  {isAr
                    ? 'تدفق تذاكر الطهي مباشرة من الكاشير وتطبيقات التوصيل (طلبات، دليفرو) مع مؤقتات دقيقة'
                    : 'Direct ticket routing from counter & aggregators with cook times and station dispatch'}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-stone-400">
                  {isAr ? 'التذاكر النشطة:' : 'Active Tickets:'}{' '}
                  <strong className="text-white">{tickets.length}</strong>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {tickets.map((ticket) => {
                const isReady = ticket.status === 'ready';
                const isCompleted = ticket.status === 'completed';
                return (
                  <div
                    key={ticket.id}
                    className={`rounded-2xl border p-5 transition-all flex flex-col justify-between ${
                      isCompleted
                        ? 'bg-stone-900/40 border-stone-800 opacity-60'
                        : isReady
                        ? 'bg-emerald-950/40 border-emerald-500/50 shadow-lg'
                        : 'bg-stone-900 border-stone-800 shadow-md'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                        <div>
                          <span className="text-xs font-mono font-bold text-orange-400">
                            {ticket.orderNumber}
                          </span>
                          <h4 className="text-sm font-bold text-white mt-0.5">
                            {ticket.tableOrChannel}
                          </h4>
                        </div>

                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            isCompleted
                              ? 'bg-stone-800 text-stone-400'
                              : isReady
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {ticket.status}
                        </span>
                      </div>

                      {/* Items */}
                      <div className="py-4 flex flex-col gap-2">
                        {ticket.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-start justify-between text-xs"
                          >
                            <div className="flex items-start gap-2">
                              <span className="font-bold text-[#F97316] font-mono">
                                {item.qty}x
                              </span>
                              <div>
                                <span className="font-semibold text-white">{item.name}</span>
                                {item.modifiers && item.modifiers.length > 0 && (
                                  <span className="block text-[10px] text-stone-400">
                                    • {item.modifiers.join(', ')}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-stone-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{ticket.createdAt}</span>
                      </div>

                      {!isCompleted && (
                        <button
                          onClick={() => handleBumpKDS(ticket.id)}
                          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            isReady
                              ? 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                          }`}
                        >
                          {isReady
                            ? isAr
                              ? 'تسليم الطلب (Bump)'
                              : 'Bump / Served'
                            : isAr
                            ? 'جاهز للتقديم'
                            : 'Mark Ready'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: LIVE INVENTORY MATRIX */}
        {activeTab === 'inventory' && (
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-white font-heading">
                  {isAr ? 'مصفوفة المخزون وهندسة الوصفات' : 'Central Inventory & Recipe Depletion'}
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  {isAr
                    ? 'يتم خصم المكونات الخام لحظياً مع كل عملية بيع مسجلة عند الكاشير'
                    : 'Raw ingredients dynamically decrement down to grams when dishes are rung up'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setInventory(INITIAL_INVENTORY)}
                  className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs text-stone-300 flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{isAr ? 'إعادة ضبط المخزون' : 'Reset Inventory'}</span>
                </button>
              </div>
            </div>

            <div className="bg-stone-900 rounded-2xl border border-stone-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-950 text-stone-400 uppercase tracking-wider text-[11px] font-mono border-b border-stone-800">
                    <tr>
                      <th className="p-4">{isAr ? 'المكون / الصنف' : 'Raw Ingredient'}</th>
                      <th className="p-4">{isAr ? 'التصنيف' : 'Category'}</th>
                      <th className="p-4">{isAr ? 'المخزون الحالي' : 'Live On-Hand'}</th>
                      <th className="p-4">{isAr ? 'معدل الخصم' : 'Depletion Per Sale'}</th>
                      <th className="p-4">{isAr ? 'الحد الأدنى' : 'Reorder Level'}</th>
                      <th className="p-4">{isAr ? 'الحالة' : 'Status'}</th>
                      <th className="p-4 text-right">{isAr ? 'إجراء سريع' : 'Action'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800/60">
                    {inventory.map((item) => {
                      const isLow = item.currentStock <= item.minThreshold;
                      return (
                        <tr key={item.id} className="hover:bg-stone-800/40 transition-colors">
                          <td className="p-4">
                            <div className="font-bold text-white text-sm">
                              {isAr ? item.nameAr : item.name}
                            </div>
                            <div className="text-[10px] text-stone-500 font-mono">
                              SKU: {item.id.toUpperCase()}
                            </div>
                          </td>
                          <td className="p-4 text-stone-300">{item.category}</td>
                          <td className="p-4">
                            <span className="font-mono font-bold text-sm text-white">
                              {item.currentStock} {item.unit}
                            </span>
                          </td>
                          <td className="p-4 text-stone-400 font-mono">{item.depletionRate}</td>
                          <td className="p-4 text-stone-400 font-mono">
                            {item.minThreshold} {item.unit}
                          </td>
                          <td className="p-4">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                isLow
                                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              }`}
                            >
                              {isLow ? (
                                <>
                                  <AlertTriangle className="w-3 h-3" />
                                  <span>Restock Alert</span>
                                </>
                              ) : (
                                <>
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>Optimal</span>
                                </>
                              )}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => {
                                setInventory((prev) =>
                                  prev.map((i) =>
                                    i.id === item.id
                                      ? { ...i, currentStock: +(i.currentStock + 20).toFixed(1) }
                                      : i
                                  )
                                );
                              }}
                              className="px-3 py-1 rounded-lg bg-[#F97316]/20 text-[#F97316] hover:bg-[#F97316] hover:text-white transition-all text-xs font-semibold cursor-pointer"
                            >
                              + Receive PO
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ZATCA PHASE 2 CLEARANCE */}
        {activeTab === 'zatca' && (
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2">
                  <span>{isAr ? 'منظومة فاتورة والامتثال لزاتكا (المرحلة الثانية)' : 'ZATCA Phase 2 FATOORA Compliance Portal'}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-mono">
                    CLEARED
                  </span>
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  {isAr
                    ? 'فواتير ضريبية مبسطة وقياسية موقعة رقمياً مع توثيق الأختام ورمز الاستجابة السريعة'
                    : 'Cryptographically signed B2C simplified and B2B standard tax invoices with QR & cryptographic hash'}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-stone-400 bg-stone-900 border border-stone-800 px-3 py-1.5 rounded-xl font-mono">
                <span>CSID: VALIDATED (UUID-3901-KSA)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-stone-900 p-4 rounded-xl border border-stone-800">
                <div className="text-xs text-stone-400 uppercase font-mono">Total Cleared Today</div>
                <div className="text-2xl font-bold text-white mt-1">SAR 182,410.00</div>
                <div className="text-[11px] text-emerald-400 mt-1">100% Tax Clearance SLA</div>
              </div>
              <div className="bg-stone-900 p-4 rounded-xl border border-stone-800">
                <div className="text-xs text-stone-400 uppercase font-mono">VAT (15%) Output</div>
                <div className="text-2xl font-bold text-amber-400 mt-1">SAR 27,361.50</div>
                <div className="text-[11px] text-stone-400 mt-1">Auto-reconciled in GL</div>
              </div>
              <div className="bg-stone-900 p-4 rounded-xl border border-stone-800">
                <div className="text-xs text-stone-400 uppercase font-mono">FATOORA API Gateway</div>
                <div className="text-2xl font-bold text-emerald-400 mt-1">18ms Latency</div>
                <div className="text-[11px] text-stone-400 mt-1">Direct Government Webhook</div>
              </div>
            </div>

            <div className="bg-stone-900 rounded-2xl border border-stone-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-950 text-stone-400 uppercase tracking-wider text-[11px] font-mono border-b border-stone-800">
                    <tr>
                      <th className="p-4">Invoice #</th>
                      <th className="p-4">Buyer Entity</th>
                      <th className="p-4">Timestamp</th>
                      <th className="p-4">Subtotal</th>
                      <th className="p-4">VAT (15%)</th>
                      <th className="p-4">Grand Total</th>
                      <th className="p-4">ZATCA Clearance</th>
                      <th className="p-4 text-right">Cryptographic Token</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800/60">
                    {invoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-stone-800/40 transition-colors">
                        <td className="p-4 font-mono font-bold text-orange-400">
                          {inv.invoiceNumber}
                        </td>
                        <td className="p-4 text-white font-medium">{inv.buyerName}</td>
                        <td className="p-4 text-stone-400 font-mono">{inv.timestamp}</td>
                        <td className="p-4 text-stone-300 font-mono">
                          {inv.currency} {inv.subtotal.toFixed(2)}
                        </td>
                        <td className="p-4 text-amber-400 font-mono">
                          {inv.currency} {inv.vatAmount.toFixed(2)}
                        </td>
                        <td className="p-4 text-white font-mono font-bold">
                          {inv.currency} {inv.grandTotal.toFixed(2)}
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            <ShieldCheck className="w-3 h-3" />
                            <span>{inv.fatooraStatus}</span>
                          </span>
                        </td>
                        <td className="p-4 text-right font-mono text-[10px] text-stone-400">
                          <span className="bg-stone-950 px-2 py-1 rounded border border-stone-800">
                            {inv.cryptographicHash.substring(0, 12)}...
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: EXECUTIVE BI & ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white font-heading">
                  {isAr ? 'لوحة القيادة التنفيذية والتحليلات التشغيلية' : 'Executive Business Intelligence & PMIX'}
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  {isAr
                    ? 'رؤية شاملة عبر كافة الفروع: هوامش الربح، وهندسة القائمة، ومعدل دوران الطاولات'
                    : 'Consolidated multi-unit performance, product mix margins, and speed-of-service metrics'}
                </p>
              </div>
            </div>

            {/* Key Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-stone-900 p-5 rounded-2xl border border-stone-800">
                <div className="text-xs font-semibold text-stone-400 uppercase font-heading">
                  Today's Network Revenue
                </div>
                <div className="text-2xl font-bold text-white font-heading mt-2">
                  AED 1,248,750.00
                </div>
                <div className="text-xs text-emerald-400 font-semibold mt-1">
                  +18.4% vs last week
                </div>
              </div>

              <div className="bg-stone-900 p-5 rounded-2xl border border-stone-800">
                <div className="text-xs font-semibold text-stone-400 uppercase font-heading">
                  Average Table Turn Time
                </div>
                <div className="text-2xl font-bold text-white font-heading mt-2">
                  18m 42s
                </div>
                <div className="text-xs text-emerald-400 font-semibold mt-1">
                  +38% faster service speed
                </div>
              </div>

              <div className="bg-stone-900 p-5 rounded-2xl border border-stone-800">
                <div className="text-xs font-semibold text-stone-400 uppercase font-heading">
                  Gross Food Margin
                </div>
                <div className="text-2xl font-bold text-white font-heading mt-2">
                  71.8%
                </div>
                <div className="text-xs text-emerald-400 font-semibold mt-1">
                  -2.4% ingredient waste
                </div>
              </div>

              <div className="bg-stone-900 p-5 rounded-2xl border border-stone-800">
                <div className="text-xs font-semibold text-stone-400 uppercase font-heading">
                  Active Multi-Outlets
                </div>
                <div className="text-2xl font-bold text-[#F97316] font-heading mt-2">
                  12 In Sync
                </div>
                <div className="text-xs text-stone-400 font-semibold mt-1">
                  0 disconnected registers
                </div>
              </div>
            </div>

            {/* Product Mix Performance */}
            <div className="bg-stone-900 rounded-2xl p-6 border border-stone-800">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-heading">
                Top Selling Revenue Drivers (PMIX)
              </h4>
              <div className="space-y-4">
                {[
                  { name: 'Signature Spanish Latte', sales: '842 orders', rev: 'AED 20,208.00', pct: 88 },
                  { name: 'Wagyu Truffle Smash Burger', sales: '412 orders', rev: 'AED 19,776.00', pct: 76 },
                  { name: 'Saffron Karak Chai', sales: '1,280 orders', rev: 'AED 15,360.00', pct: 68 },
                  { name: 'Artisan Pistachio Croissant', sales: '390 orders', rev: 'AED 8,580.00', pct: 45 },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-white">{item.name}</span>
                      <span className="font-mono text-stone-300">
                        {item.sales} • <strong className="text-[#F97316]">{item.rev}</strong>
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-stone-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#F97316] to-amber-500 rounded-full"
                        style={{ width: `${item.pct}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* RECEIPT POPUP MODAL */}
      {showReceipt && lastPayment && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-stone-900 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#F97316] text-white flex items-center justify-center font-bold">
                  PB
                </div>
                <div>
                  <h4 className="font-bold text-sm text-stone-900">PosBytz Cloud ERP</h4>
                  <p className="text-[10px] text-stone-500">ZATCA Tax Invoice Receipt</p>
                </div>
              </div>
              <button
                onClick={() => setShowReceipt(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-6 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 font-heading">
                Payment Authorized
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Settled via {lastPayment.method} • Invoice #{lastPayment.invoiceNum}
              </p>

              <div className="my-5 p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="text-xs text-stone-500 block">Total Paid (VAT Incl.)</span>
                <span className="text-3xl font-extrabold text-stone-900 font-mono mt-1 block">
                  AED {lastPayment.total.toFixed(2)}
                </span>
              </div>

              {/* Simulated ZATCA Phase 2 QR Code Box */}
              <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-stone-300 bg-white mb-4">
                <QrCode className="w-24 h-24 text-stone-900" />
                <span className="text-[10px] font-mono text-stone-400 mt-2">
                  ZATCA Cryptographic Token Validated
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowReceipt(false)}
                className="flex-1 py-3 rounded-full bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition-all cursor-pointer"
              >
                New Transaction
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-3 rounded-full bg-stone-100 text-stone-700 text-xs font-bold hover:bg-stone-200 transition-all flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
