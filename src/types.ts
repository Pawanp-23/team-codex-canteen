export type Language = 'en' | 'ar';

export type AppView = 'landing' | 'live-hub' | 'order-system';

export type HubTab = 'pos' | 'kds' | 'inventory' | 'zatca' | 'analytics';

export interface NavItem {
  label: string;
  labelAr: string;
  path: string;
  badge?: string;
}

export interface NavDropdown {
  title: string;
  titleAr: string;
  items: NavItem[];
}

export interface HardwareTabContent {
  id: string;
  badge: string;
  badgeAr: string;
  title: string;
  titleAr: string;
  desc: string;
  descAr: string;
  points: string[];
  pointsAr: string[];
}

export interface ERPModule {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  badge: string;
  badgeBg: string;
  badgeColor: string;
  linkText: string;
  linkTextAr: string;
  targetTab?: HubTab;
}

export interface Integration {
  id: string;
  name: string;
  tag: string;
  category: 'payments' | 'delivery' | 'compliance' | 'ecommerce';
  categoryLabel: string;
  description: string;
  descriptionAr: string;
  badge: string;
  iconText: string;
  iconBg: string;
  iconColor: string;
  verified?: boolean;
}

export interface Testimonial {
  quote: string;
  quoteAr: string;
  author: string;
  role: string;
  initials: string;
  initialsBg: string;
  initialsColor: string;
}

export interface FAQItem {
  question: string;
  questionAr: string;
  answer: string;
  answerAr: string;
}

export interface MenuItem {
  id: string;
  name: string;
  nameAr: string;
  category: 'beverages' | 'food' | 'desserts';
  price: number;
  calories?: string;
  image: string;
  ingredients: { name: string; amount: string }[];
  quantityAvailable: number;
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  customerName: string;
  rollNo: string;
  itemId: string;
  itemName: string;
  itemNameAr?: string;
  itemPrice: number;
  quantity: number;
  totalAmount: number;
  status: 'confirmed' | 'preparing' | 'ready' | 'completed';
  timestamp: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
  modifiers: string[];
  notes?: string;
}

export interface KDSTicket {
  id: string;
  orderNumber: string;
  source: 'POS Dine-in' | 'Talabat' | 'Deliveroo' | 'Takeaway';
  tableOrChannel: string;
  items: { name: string; qty: number; modifiers?: string[] }[];
  elapsedSeconds: number;
  status: 'preparing' | 'ready' | 'completed';
  createdAt: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  nameAr: string;
  category: string;
  currentStock: number;
  unit: string;
  minThreshold: number;
  costPerUnit: number;
  depletionRate: string;
  status: 'optimal' | 'low' | 'reorder';
}

export interface ZATCAInvoice {
  id: string;
  invoiceNumber: string;
  timestamp: string;
  buyerName: string;
  subtotal: number;
  vatAmount: number;
  grandTotal: number;
  currency: string;
  qrPayload: string;
  cryptographicHash: string;
  fatooraStatus: 'CLEARED' | 'REPORTED';
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'Store Manager' | 'Cashier' | 'Admin' | 'Chef' | 'Student / Customer';
  businessName?: string;
  rollNo?: string;
  avatar?: string;
  signedAt: string;
}
