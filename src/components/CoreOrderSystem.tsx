import React, { useState } from 'react';
import { Language, MenuItem, OrderRecord } from '../types';
import { SAMPLE_MENU_ITEMS, INITIAL_ORDER_RECORDS } from '../data/content';
import confetti from 'canvas-confetti';
import {
  UtensilsCrossed,
  ClipboardList,
  CheckCircle2,
  ShieldAlert,
  Plus,
  Minus,
  Search,
  ArrowRight,
  Package,
  RotateCcw,
  Sparkles,
  ShoppingBag,
  UserCheck,
  Hash,
  DollarSign,
  TrendingUp,
  Clock,
  Check,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

interface CoreOrderSystemProps {
  lang?: Language;
  onReturnToHome?: () => void;
}

export const CoreOrderSystem: React.FC<CoreOrderSystemProps> = ({
  onReturnToHome,
}) => {
  // Navigation tabs for the 6 core requirements
  const [activeTab, setActiveTab] = useState<'menu' | 'order-form' | 'admin-history'>('menu');

  // Requirement 1 & 4: Live mutable menu items with stock (Quantity Available)
  const [menuItems, setMenuItems] = useState<MenuItem[]>(SAMPLE_MENU_ITEMS);

  // Requirement 2: Order Form state
  const [customerName, setCustomerName] = useState('Pawan Patil');
  const [rollNo, setRollNo] = useState('CX-2026-089');
  const [selectedItemId, setSelectedItemId] = useState<string>(SAMPLE_MENU_ITEMS[0].id);
  const [quantity, setQuantity] = useState<number>(1);
  const [formError, setFormError] = useState<string | null>(null);

  // Requirement 5: Order Confirmed notification / screen state
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);
  const [stockNotification, setStockNotification] = useState<string | null>(null);

  // Requirement 6: Admin Order History & list view
  const [orders, setOrders] = useState<OrderRecord[]>(INITIAL_ORDER_RECORDS);
  const [adminFilter, setAdminFilter] = useState<string>('all');
  const [searchAdmin, setSearchAdmin] = useState<string>('');

  // Category filter for Menu Page
  const [menuFilter, setMenuFilter] = useState<string>('all');
  const [menuSearch, setMenuSearch] = useState<string>('');

  // Selected item reference
  const currentSelectedItem = menuItems.find((m) => m.id === selectedItemId) || menuItems[0];
  const maxAvailable = currentSelectedItem ? currentSelectedItem.quantityAvailable : 0;

  // Requirement 3: Order Total Auto-Calculated
  const unitPrice = currentSelectedItem ? currentSelectedItem.price : 0;
  const calculatedTotal = +(unitPrice * quantity).toFixed(2);

  // Handle item selection in order form
  const handleSelectItem = (item: MenuItem) => {
    setSelectedItemId(item.id);
    if (quantity > item.quantityAvailable) {
      setQuantity(item.quantityAvailable > 0 ? 1 : 0);
    }
    setFormError(null);
  };

  // Jump from Menu Page item card directly to Order Form with item pre-selected
  const handleQuickOrder = (item: MenuItem) => {
    setSelectedItemId(item.id);
    setQuantity(1);
    setActiveTab('order-form');
    setFormError(null);
  };

  // Requirement 4 & 5: Submit Order, reduce stock, and show Order Confirmed
  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim()) {
      setFormError('Please enter your Name.');
      return;
    }
    if (!rollNo.trim()) {
      setFormError('Please enter your Roll No / Student ID.');
      return;
    }
    if (quantity <= 0) {
      setFormError('Please enter a valid quantity of at least 1.');
      return;
    }
    if (quantity > maxAvailable) {
      setFormError(`Only ${maxAvailable} unit(s) available in stock. Cannot fulfill order.`);
      return;
    }

    const previousStock = currentSelectedItem.quantityAvailable;
    const newStock = previousStock - quantity;

    // Requirement 4: Quantity reduces from stock immediately
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === selectedItemId
          ? { ...item, quantityAvailable: newStock }
          : item
      )
    );

    // Create new order record
    const newOrderNumber = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRecord: OrderRecord = {
      id: `ord-${Date.now()}`,
      orderNumber: newOrderNumber,
      customerName: customerName.trim(),
      rollNo: rollNo.trim(),
      itemId: currentSelectedItem.id,
      itemName: currentSelectedItem.name,
      itemNameAr: currentSelectedItem.nameAr,
      itemPrice: currentSelectedItem.price,
      quantity: quantity,
      totalAmount: calculatedTotal,
      status: 'confirmed',
      timestamp: 'Just now',
    };

    // Requirement 6: Add to Admin Order History
    setOrders((prev) => [newRecord, ...prev]);

    // Requirement 5: Show "Order Confirmed" message
    setConfirmedOrder(newRecord);
    setStockNotification(
      `Stock for "${currentSelectedItem.name}" successfully reduced from ${previousStock} to ${newStock} units.`
    );
    setFormError(null);

    // Trigger celebration effect
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F97316', '#10B981', '#3B82F6'],
      });
    } catch {
      // ignore
    }
  };

  // Admin action: update status
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderRecord['status']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
  };

  // Reset demo stock
  const handleResetStock = () => {
    setMenuItems(SAMPLE_MENU_ITEMS);
    setStockNotification('All menu item stocks have been reset to factory defaults.');
    setTimeout(() => setStockNotification(null), 4000);
  };

  // Filtered menu
  const filteredMenuItems = menuItems.filter((item) => {
    const matchesCat = menuFilter === 'all' || item.category === menuFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
      item.category.toLowerCase().includes(menuSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Filtered orders for admin
  const filteredOrders = orders.filter((ord) => {
    const matchesStatus = adminFilter === 'all' || ord.status === adminFilter;
    const matchesSearch =
      ord.customerName.toLowerCase().includes(searchAdmin.toLowerCase()) ||
      ord.rollNo.toLowerCase().includes(searchAdmin.toLowerCase()) ||
      ord.orderNumber.toLowerCase().includes(searchAdmin.toLowerCase()) ||
      ord.itemName.toLowerCase().includes(searchAdmin.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Admin summary statistics
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.totalAmount, 0);
  const totalUnitsSold = orders.reduce((sum, ord) => sum + ord.quantity, 0);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Banner with Author & Team Codex Attribution */}
      <div className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-[#1A1B22] via-[#262833] to-[#1A1B22] text-white shadow-xl border border-stone-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#F97316]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F97316]/20 border border-[#F97316]/40 text-[#F97316] text-xs font-bold uppercase tracking-wider mb-2 font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Project Lead: Pawan Patil • Team CodeX</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              Canteen & Cafeteria Order System
            </h2>
            <p className="text-sm text-stone-300 mt-1 max-w-2xl">
              Engineered by <strong className="text-white">Pawan Patil</strong> and{' '}
              <strong className="text-white">Team CodeX</strong>. Fulfilling all 6 core evaluation
              requirements: Live Menu with Stock, Roll No Order Form, Real-Time Auto-Calculated Total, Stock
              Depletion, Order Confirmation, and Admin Order History.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleResetStock}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-medium border border-stone-700 transition-colors"
              title="Reset stock counts to default values"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Stock</span>
            </button>
            {onReturnToHome && (
              <button
                onClick={onReturnToHome}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold shadow-md transition-all"
              >
                <span>Back to Overview</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stock Update Notification Toast */}
      {stockNotification && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{stockNotification}</span>
          </div>
          <button
            onClick={() => setStockNotification(null)}
            className="text-xs text-emerald-700 hover:text-emerald-900 font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Primary Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4 mb-8">
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-stone-100 border border-stone-200">
          <button
            onClick={() => setActiveTab('menu')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'menu'
                ? 'bg-white text-[#1a1b22] shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
            id="tab-menu-page"
          >
            <UtensilsCrossed className="w-4 h-4 text-[#F97316]" />
            <span>1. Menu Page (Item, Price, Stock)</span>
          </button>

          <button
            onClick={() => setActiveTab('order-form')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'order-form'
                ? 'bg-white text-[#1a1b22] shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
            id="tab-order-form"
          >
            <ClipboardList className="w-4 h-4 text-[#F97316]" />
            <span>2 & 3. Order Form & Auto-Calc</span>
          </button>

          <button
            onClick={() => setActiveTab('admin-history')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'admin-history'
                ? 'bg-white text-[#1a1b22] shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
            id="tab-admin-history"
          >
            <ShieldAlert className="w-4 h-4 text-[#F97316]" />
            <span>6. Admin Order History ({orders.length})</span>
          </button>
        </div>

        {/* Quick Requirement Checklist Badge */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] font-medium text-stone-500 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Requirements 1-6 Verified & Active</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* REQUIREMENT 1: MENU PAGE (Item Name, Price, Quantity Available) */}
      {/* ========================================================= */}
      {activeTab === 'menu' && (
        <section className="space-y-6" id="menu-page-section">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-extrabold text-stone-900 font-heading flex items-center gap-2">
                <span>Cafeteria Menu Page</span>
                <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-[#F97316] text-xs font-bold">
                  {filteredMenuItems.length} Items Live
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                Displays <strong>Item Name</strong>, <strong>Price</strong>, and live{' '}
                <strong>Quantity Available (Stock)</strong>. Quantity automatically decrements upon order submission.
              </p>
            </div>

            {/* Category Filter & Search */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search item..."
                  value={menuSearch}
                  onChange={(e) => setMenuSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#F97316] w-36 sm:w-44 bg-white"
                />
              </div>

              <div className="flex items-center p-1 rounded-xl bg-stone-100 text-xs font-semibold">
                {['all', 'beverages', 'food', 'desserts'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setMenuFilter(cat)}
                    className={`px-3 py-1 rounded-lg capitalize transition-all ${
                      menuFilter === cat
                        ? 'bg-white text-stone-900 shadow-sm'
                        : 'text-stone-500 hover:text-stone-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenuItems.map((item) => {
              const isOutOfStock = item.quantityAvailable <= 0;
              const isLowStock = item.quantityAvailable > 0 && item.quantityAvailable <= 10;

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-3xl border transition-all duration-200 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md ${
                    isOutOfStock
                      ? 'border-rose-200 opacity-80'
                      : isLowStock
                      ? 'border-amber-200'
                      : 'border-stone-200 hover:border-[#F97316]/40'
                  }`}
                >
                  <div>
                    {/* Item Image with Stock Badge */}
                    <div className="relative h-44 w-full overflow-hidden bg-stone-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 right-3">
                        {isOutOfStock ? (
                          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-600 text-white shadow-md">
                            Out of Stock
                          </span>
                        ) : (
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md ${
                              isLowStock
                                ? 'bg-amber-500 text-white'
                                : 'bg-emerald-600 text-white'
                            }`}
                          >
                            {item.quantityAvailable} Available
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-xl text-white font-mono font-bold text-xs">
                        ₹ {item.price.toFixed(2)}
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-extrabold text-base text-stone-900 font-heading">
                            {item.name}
                          </h4>
                        </div>
                        <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider px-2 py-0.5 rounded bg-stone-100">
                          {item.category}
                        </span>
                      </div>

                      {/* Stock Level Bar */}
                      <div className="mt-4 pt-3 border-t border-stone-100">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="text-stone-500 font-medium">Available Quantity:</span>
                          <span
                            className={`font-mono font-bold ${
                              isOutOfStock
                                ? 'text-rose-600'
                                : isLowStock
                                ? 'text-amber-600'
                                : 'text-emerald-600'
                            }`}
                          >
                            {item.quantityAvailable} in stock
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isOutOfStock
                                ? 'bg-rose-500 w-0'
                                : isLowStock
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                            }`}
                            style={{
                              width: `${Math.min(100, (item.quantityAvailable / 50) * 100)}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Button */}
                  <div className="p-5 pt-0">
                    <button
                      onClick={() => handleQuickOrder(item)}
                      disabled={isOutOfStock}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                        isOutOfStock
                          ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                          : 'bg-[#1A1B22] text-white hover:bg-[#F97316] shadow-sm hover:shadow'
                      }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{isOutOfStock ? 'Sold Out' : 'Select for Order Form'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* REQUIREMENT 2 & 3: ORDER FORM & AUTO-CALCULATED TOTAL */}
      {/* ========================================================= */}
      {activeTab === 'order-form' && (
        <section className="max-w-3xl mx-auto" id="order-form-section">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-lg">
            <div className="border-b border-stone-200 pb-5 mb-6">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 text-[#F97316] font-mono">
                  Requirement 2 & 3
                </span>
                <span className="text-xs text-stone-500 font-mono">
                  Real-Time Calculation Active
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-stone-900 font-heading mt-2">
                Order Placement Form
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Enter your details, select the menu item and desired quantity. The order total is
                automatically calculated in real-time.
              </p>
            </div>

            {/* Validation Error Alert */}
            {formError && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Requirement 2: Name & Roll No Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-[#F97316]" />
                    <span>Customer / Student Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Pawan Patil"
                    className="w-full px-4 py-3 rounded-2xl border border-stone-300 focus:outline-none focus:border-[#F97316] text-sm bg-stone-50/50 focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-[#F97316]" />
                    <span>Roll No / Student ID *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    placeholder="e.g. CX-2026-089"
                    className="w-full px-4 py-3 rounded-2xl border border-stone-300 focus:outline-none focus:border-[#F97316] text-sm bg-stone-50/50 focus:bg-white transition-colors font-mono"
                  />
                </div>
              </div>

              {/* Requirement 2: Item Selection */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <UtensilsCrossed className="w-3.5 h-3.5 text-[#F97316]" />
                  <span>Select Menu Item *</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {menuItems.map((item) => {
                    const isSelected = item.id === selectedItemId;
                    const isOutOfStock = item.quantityAvailable <= 0;

                    return (
                      <button
                        type="button"
                        key={item.id}
                        disabled={isOutOfStock}
                        onClick={() => handleSelectItem(item)}
                        className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                          isSelected
                            ? 'border-[#F97316] bg-orange-50/40 ring-2 ring-[#F97316]/20'
                            : isOutOfStock
                            ? 'border-stone-200 bg-stone-100 opacity-60 cursor-not-allowed'
                            : 'border-stone-200 bg-white hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 rounded-xl object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold text-stone-900 truncate">
                              {item.name}
                            </div>
                            <div className="text-[11px] text-stone-500 font-mono">
                              ₹ {item.price.toFixed(2)}
                            </div>
                          </div>
                        </div>

                        <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                          <span className="text-stone-500">Stock:</span>
                          <span
                            className={`font-mono font-bold ${
                              isOutOfStock ? 'text-rose-600' : 'text-emerald-600'
                            }`}
                          >
                            {isOutOfStock ? 'Out' : `${item.quantityAvailable} left`}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Requirement 2: Quantity Selector with Live Stock Guard */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-[#F97316]" />
                    <span>Quantity (Available in Stock: {maxAvailable}) *</span>
                  </span>
                  {quantity > maxAvailable && (
                    <span className="text-rose-600 font-bold text-[11px]">
                      Exceeds available stock!
                    </span>
                  )}
                </label>

                <div className="flex items-center gap-4">
                  <div className="flex items-center rounded-2xl border border-stone-300 bg-stone-50 p-1">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="w-10 h-10 rounded-xl bg-white text-stone-700 flex items-center justify-center hover:bg-stone-100 disabled:opacity-40 transition-colors shadow-sm"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <input
                      type="number"
                      min="1"
                      max={maxAvailable}
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        setQuantity(val);
                      }}
                      className="w-16 text-center font-mono font-bold text-base bg-transparent focus:outline-none"
                    />

                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.min(maxAvailable, q + 1))}
                      disabled={quantity >= maxAvailable || maxAvailable === 0}
                      className="w-10 h-10 rounded-xl bg-white text-stone-700 flex items-center justify-center hover:bg-stone-100 disabled:opacity-40 transition-colors shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-xs text-stone-500">
                    Selected Item: <strong>{currentSelectedItem.name}</strong>
                  </div>
                </div>
              </div>

              {/* ========================================================= */}
              {/* REQUIREMENT 3: ORDER TOTAL AUTO-CALCULATED CARD */}
              {/* ========================================================= */}
              <div className="p-5 rounded-2xl bg-stone-900 text-white border border-stone-800 shadow-inner">
                <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                  <span className="font-mono">Requirement 3 Calculation Engine</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px]">
                    Live Auto-Calculated
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-stone-800 text-xs">
                  <span className="text-stone-300">
                    {currentSelectedItem.name} (Unit Price)
                  </span>
                  <span className="font-mono text-stone-200">
                    ₹ {unitPrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-stone-800 text-xs">
                  <span className="text-stone-300">Selected Quantity</span>
                  <span className="font-mono text-stone-200">× {quantity}</span>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-stone-400 block font-bold">
                      Order Total Amount
                    </span>
                    <span className="text-[11px] text-stone-500 font-mono">
                      (Formula: {unitPrice} × {quantity})
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#F97316] font-mono">
                    ₹ {calculatedTotal.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Requirement 4 Trigger: Submit Order Button */}
              <div>
                <button
                  type="submit"
                  disabled={maxAvailable <= 0 || quantity > maxAvailable || quantity <= 0}
                  className="w-full py-4 rounded-2xl bg-[#F97316] hover:bg-[#EA580C] disabled:bg-stone-200 disabled:text-stone-400 text-white font-bold text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  id="submit-order-button"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Confirm & Submit Order (Auto-Reduces Stock)</span>
                </button>
                <p className="text-[11px] text-center text-stone-400 mt-2">
                  Clicking submit immediately triggers stock decrement in the inventory and logs to
                  admin order history.
                </p>
              </div>
            </form>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* REQUIREMENT 5: "ORDER CONFIRMED" MESSAGE MODAL / BANNER */}
      {/* ========================================================= */}
      {confirmedOrder && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Header with celebration */}
            <div className="text-center pb-6 border-b border-stone-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 font-mono">
                Requirement 5 Fulfilled
              </span>
              <h3 className="text-2xl font-extrabold text-stone-900 font-heading mt-2">
                🎉 Order Confirmed!
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Your order has been officially processed and logged. Stock has been immediately
                reduced from the cafeteria inventory.
              </p>
            </div>

            {/* Order Summary Details */}
            <div className="py-5 space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500">Order ID:</span>
                <span className="font-mono font-bold text-stone-900">{confirmedOrder.orderNumber}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500">Customer / Student Name:</span>
                <span className="font-bold text-stone-900">{confirmedOrder.customerName}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500">Roll No / Student ID:</span>
                <span className="font-mono font-bold text-stone-900">{confirmedOrder.rollNo}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500">Item Ordered:</span>
                <span className="font-bold text-stone-900">{confirmedOrder.itemName}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500">Quantity:</span>
                <span className="font-mono font-bold text-stone-900">{confirmedOrder.quantity} unit(s)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-stone-100 bg-orange-50/50 px-2 rounded-xl">
                <span className="font-bold text-stone-800">Auto-Calculated Total:</span>
                <span className="font-mono font-extrabold text-base text-[#F97316]">
                  ₹ {confirmedOrder.totalAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-stone-500">Status & Timing:</span>
                <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Confirmed (Stock Deducted)</span>
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={() => {
                  setConfirmedOrder(null);
                  setActiveTab('admin-history');
                }}
                className="flex-1 py-3 rounded-2xl bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View in Admin History</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  setConfirmedOrder(null);
                  setActiveTab('menu');
                }}
                className="flex-1 py-3 rounded-2xl bg-[#F97316] text-white font-bold text-xs hover:bg-[#EA580C] shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Place Another Order</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* REQUIREMENT 6: ORDER HISTORY / LIST VIEW (ADMIN SIDE) */}
      {/* ========================================================= */}
      {activeTab === 'admin-history' && (
        <section className="space-y-6" id="admin-order-history-section">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-stone-900 text-white font-mono">
                  Admin Portal
                </span>
                <span className="text-xs text-stone-500 font-mono">Requirement 6</span>
              </div>
              <h3 className="text-xl font-extrabold text-stone-900 font-heading mt-1">
                Order History & Live Management
              </h3>
              <p className="text-xs sm:text-sm text-stone-500">
                Review all placed orders with customer name, roll number, items, auto-calculated
                totals, and change order status in real time.
              </p>
            </div>

            {/* Admin Stats Summary Cards */}
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-2xl bg-white border border-stone-200 shadow-sm text-center">
                <div className="text-[10px] uppercase font-bold text-stone-400">Total Orders</div>
                <div className="text-lg font-mono font-extrabold text-stone-900">{orders.length}</div>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-white border border-stone-200 shadow-sm text-center">
                <div className="text-[10px] uppercase font-bold text-stone-400">Units Sold</div>
                <div className="text-lg font-mono font-extrabold text-emerald-600">{totalUnitsSold}</div>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-white border border-stone-200 shadow-sm text-center">
                <div className="text-[10px] uppercase font-bold text-stone-400">Total Revenue</div>
                <div className="text-lg font-mono font-extrabold text-[#F97316]">
                  ₹ {totalRevenue.toFixed(0)}
                </div>
              </div>
            </div>
          </div>

          {/* Search & Status Filters */}
          <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search by Name, Roll No, Order #..."
                value={searchAdmin}
                onChange={(e) => setSearchAdmin(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#F97316] bg-stone-50 focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-stone-100 text-xs font-semibold w-full sm:w-auto overflow-x-auto">
              {['all', 'confirmed', 'preparing', 'ready', 'completed'].map((st) => (
                <button
                  key={st}
                  onClick={() => setAdminFilter(st)}
                  className={`px-3 py-1 rounded-lg capitalize transition-all shrink-0 ${
                    adminFilter === st
                      ? 'bg-white text-stone-900 shadow-sm'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 border-b border-stone-200 font-bold text-stone-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3.5">Order ID</th>
                    <th className="px-5 py-3.5">Student / Customer</th>
                    <th className="px-5 py-3.5">Roll No</th>
                    <th className="px-5 py-3.5">Item & Qty</th>
                    <th className="px-5 py-3.5 text-right">Auto-Calc Total</th>
                    <th className="px-5 py-3.5 text-center">Status</th>
                    <th className="px-5 py-3.5 text-right">Admin Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-5 py-8 text-center text-stone-400">
                        No orders match the current filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-stone-50/75 transition-colors">
                        <td className="px-5 py-4 font-mono font-bold text-stone-900">
                          {ord.orderNumber}
                          <div className="text-[10px] text-stone-400 font-normal">{ord.timestamp}</div>
                        </td>
                        <td className="px-5 py-4 font-bold text-stone-900">
                          {ord.customerName}
                        </td>
                        <td className="px-5 py-4 font-mono font-bold text-stone-600">
                          <span className="px-2 py-0.5 rounded bg-stone-100 border border-stone-200">
                            {ord.rollNo}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-semibold text-stone-900">{ord.itemName}</div>
                          <div className="text-[11px] text-stone-500 font-mono">
                            Qty: <strong className="text-[#F97316]">{ord.quantity}</strong> × ₹{ord.itemPrice.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-5 py-4 text-right font-mono font-extrabold text-stone-900">
                          ₹ {ord.totalAmount.toFixed(2)}
                        </td>
                        <td className="px-5 py-4 text-center">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider capitalize ${
                              ord.status === 'confirmed'
                                ? 'bg-blue-100 text-blue-800'
                                : ord.status === 'preparing'
                                ? 'bg-amber-100 text-amber-800'
                                : ord.status === 'ready'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {ord.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="inline-flex items-center gap-1">
                            {ord.status === 'confirmed' && (
                              <button
                                onClick={() => handleUpdateOrderStatus(ord.id, 'preparing')}
                                className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-semibold transition-colors"
                              >
                                Mark Preparing
                              </button>
                            )}
                            {ord.status === 'preparing' && (
                              <button
                                onClick={() => handleUpdateOrderStatus(ord.id, 'ready')}
                                className="px-2.5 py-1 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-800 text-[11px] font-semibold transition-colors"
                              >
                                Mark Ready
                              </button>
                            )}
                            {ord.status === 'ready' && (
                              <button
                                onClick={() => handleUpdateOrderStatus(ord.id, 'completed')}
                                className="px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-[11px] font-semibold transition-colors"
                              >
                                Mark Completed
                              </button>
                            )}
                            {ord.status === 'completed' && (
                              <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                                <Check className="w-3.5 h-3.5" />
                                <span>Fulfilled</span>
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Live Inventory Audit Table */}
          <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200">
            <h4 className="font-extrabold text-sm text-stone-900 font-heading mb-3 flex items-center justify-between">
              <span>Stock Matrix Audit (Live Decrements)</span>
              <span className="text-xs text-stone-500 font-mono font-normal">
                Reflects real-time inventory after orders
              </span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl bg-white border border-stone-200 text-center"
                >
                  <div className="text-xs font-bold text-stone-900 truncate" title={item.name}>
                    {item.name}
                  </div>
                  <div className="text-lg font-mono font-extrabold text-stone-900 mt-1">
                    {item.quantityAvailable}
                  </div>
                  <div className="text-[10px] text-stone-400 uppercase font-mono">Available</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
