import {
  HardwareTabContent,
  ERPModule,
  Integration,
  Testimonial,
  FAQItem,
  MenuItem,
  InventoryItem,
  KDSTicket,
  ZATCAInvoice,
} from '../types';

export const HERO_IMAGE_URL =
  'https://lh3.googleusercontent.com/aida/AEtjO1XWDwAXfnFoxWLAiZJMb9tOOOzjr9dgYZHy3KrmvR3ohPF07WEI4Hoq3mrP87dnduwDf3H4ERjjHArlaVmNPgDz1zHWBjHmaZ0D4VTjdyPB9lAC3Phsc1Ce32MxYZvt0Ft-wr1Jjr8sNPAZrv5c3dohpqPKMf_msrBbCujy5H0t-AM9nEMt-pLKB_Qs-zUwaEbEWB_fV0tNRSMB9r7wBeaEOEogwi-zNnqiLcEHsRW1Z8nZIlQ2ThqKPMPY';

export const HARDWARE_IMAGE_URL =
  'https://lh3.googleusercontent.com/aida/AEtjO1VtKbIZ_Y3N8P99_OdzI8ei-7Xi5t1rkLBpCn6VeLPsHNxDRggyrQ32W_GTbST0j7xk83IHkgiPp_Cac7uhUdHe41TOiYB-aS9TEUZsJB-kwgZ_SyNaaBLrZIKTyP2jxRcYrVzxaMmJHJ0TFCCsVVlr77fOiXEQSfVFzhz5V0Qq9Dw3xOGV-oBTdiAZ-my3u_vEYgcwT6631K4T16vLdGE-N2T3sDuZBv_Y8oremMCokc0LUHeyqI2kH6yV';

export const HARDWARE_TABS: HardwareTabContent[] = [
  {
    id: 'tab-1',
    badge: 'Front of House POS Terminal',
    badgeAr: 'نظام نقاط البيع في الواجهة',
    title: 'Ultra-responsive point of sale tailored for peak-hour rush.',
    titleAr: 'نقطة بيع فائقة الاستجابة مصممة لساعات الذروة المزدحمة.',
    desc: 'Device-agnostic POS that functions flawlessly even during internet outages. Transactions cache locally and seamlessly broadcast to cloud registers the moment connectivity resumes.',
    descAr: 'نظام نقاط بيع يعمل عبر جميع الأجهزة وبسلاسة حتى أثناء انقطاع الإنترنت. يتم حفظ المعاملات محلياً ومزامنتها فور عودة الاتصال.',
    points: [
      'Dine-in floor maps, takeaway counter, and delivery dispatch on a unified screen',
      'Smart bill splitting by guest, seat, or custom percentage with zero calculation delay',
      'Native plug-and-play driver compatibility with Sunmi, Pax, Epson, and Star Micronics',
    ],
    pointsAr: [
      'خرائط طاولات الصالة وطلبات السفري وخدمات التوصيل في شاشة موحدة',
      'تقسيم الفاتورة الذكي حسب الضيف أو المقعد أو بنسبة مئوية مخصصة دون أي تأخير',
      'توافق مباشر فوري مع طابعات وأجهزة Sunmi و Pax و Epson و Star Micronics',
    ],
  },
  {
    id: 'tab-2',
    badge: 'Kitchen Display System (KDS)',
    badgeAr: 'نظام شاشات المطبخ (KDS)',
    title: 'Direct digital ticket routing directly into the kitchen line.',
    titleAr: 'توجيه رقمي فوري للتذاكر مباشرة إلى خط المطبخ والطهي.',
    desc: 'Eliminate lost paper tickets and misheard orders. Dynamic cooking prep timers, order item grouping, and color-coded bump bars keep your chefs in lockstep sync.',
    descAr: 'تخلص من تذاكر الورق المفقودة والأخطاء في الطلبات. مؤقتات تحضير ديناميكية وتصنيف ذكي للمأكولات تحافظ على دقة طهاتك.',
    points: [
      'Instant item color states: preparing, ready for pickup, and delayed alerts',
      'Centralized multi-station routing: appetizers to grill, desserts to pastry line',
      'Live order status display integration for waiting delivery riders',
    ],
    pointsAr: [
      'تحديثات فورية بالألوان: قيد التحضير، جاهز للاستلام، وتنبيهات التأخير',
      'توجيه مركزي للمحطات المتعددة: المقبلات للمشواة والحلويات لخط المعجنات',
      'شاشة عرض مباشرة لحالة الطلبات لمناديب التوصيل والعملاء المنتظرين',
    ],
  },
  {
    id: 'tab-3',
    badge: 'Real-Time Inventory Engine',
    badgeAr: 'محرك المخزون في الوقت الفعلي',
    title: 'Stock that automatically counts and depletes itself.',
    titleAr: 'مخزون يحسب نفسه ويخصم المكونات تلقائياً بدقة الجرام.',
    desc: 'Connect your menu items with raw ingredient recipes down to the gram. The moment a flat white or gourmet burger is rung up, milk and beef inventory decrements immediately.',
    descAr: 'اربط أصناف القائمة بمكونات الوصفات الخام حتى الجرام. فور تسجيل طلب القهوة أو البرجر، يتم خصم الحليب واللحم فورياً.',
    points: [
      'Automated purchase order creation when stock reaches critical thresholds',
      'Inter-branch warehouse stock transfers with transit tracking',
      'Recipe batch costing updates that track supplier price inflation dynamically',
    ],
    pointsAr: [
      'إنشاء أوامر شراء تلقائية عند وصول المخزون للحد الأدنى الحرج',
      'تحويل المخزون بين الفروع والمستودعات مع تتبع حالة الشحن المباشر',
      'تحديث تكاليف الوصفات تلقائياً لمواكبة تغير أسعار الموردين',
    ],
  },
  {
    id: 'tab-4',
    badge: 'Executive Analytics & BI',
    badgeAr: 'لوحات التحليلات والذكاء التشغيلي',
    title: 'Operational decisions powered by predictive telemetry.',
    titleAr: 'قرارات تشغيلية مدعومة ببيانات وتحليلات تنبؤية دقيقة.',
    desc: 'Real-time profit margins, product mix (PMIX) engineering, labor vs sales metrics, and comprehensive tax compliance summaries accessible on any mobile phone.',
    descAr: 'هوامش ربح لحظية وهندسة قائمة الطعام ونسب تكلفة العمالة مقابل المبيعات مع ملخصات الامتثال الضريبي مباشرة على هاتفك.',
    points: [
      'Consolidated P&L across 1 or 100+ branches from one executive view',
      'Dead-stock alerts and highest-margin combo item recommendations',
      'Export-ready VAT and ZATCA compliance reports in one click',
    ],
    pointsAr: [
      'قائمة أرباح وخسائر موحدة عبر فرع واحد أو أكثر من 100 فرع في نظرة واحدة',
      'تنبيهات المخزون الراكد وتوصيات بأعلى الأصناف ربحية والمجموعات الترويجية',
      'تقارير ضريبة القيمة المضافة وهيئة الزكاة والضريبة جاهزة للتصدير بنقرة واحدة',
    ],
  },
];

export const ERP_MODULES: ERPModule[] = [
  {
    id: 'pos',
    title: 'Point of Sale (POS)',
    titleAr: 'نقطة البيع السحابية (POS)',
    description:
      'Lightning-fast checkout with multi-outlet catalog sync, offline-resilient cashier caching, handheld table ordering, and customizable modifiers.',
    descriptionAr:
      'دفع فائق السرعة مع مزامنة الكتالوج متعدد الفروع والعمل دون اتصال وتطبيقات الطلب عند الطاولة وتعديلات الوجبات.',
    icon: 'point_of_sale',
    iconBg: 'bg-[#FFF7ED]',
    iconColor: 'text-[#F97316]',
    badge: 'High Velocity',
    badgeBg: 'bg-[#FFF7ED]',
    badgeColor: 'text-[#9d4300]',
    linkText: 'Explore POS Suite',
    linkTextAr: 'استكشف نظام نقاط البيع',
    targetTab: 'pos',
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce & Online Ordering',
    titleAr: 'التجارة الإلكترونية والطلب عبر الإنترنت',
    description:
      'Deploy white-label web stores and mobile apps. Connect delivery aggregators like Talabat, Jahez, and Uber Eats directly into one central dispatch screen.',
    descriptionAr:
      'أطلق متجرك الإلكتروني وتطبيقات الجوال واربط تطبيقات التوصيل مثل طلبات وجاهز وهنقرستيشن بشاشة مركزية موحدة.',
    icon: 'shopping_cart_checkout',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    badge: 'Aggregator Synced',
    badgeBg: 'bg-emerald-100',
    badgeColor: 'text-emerald-900',
    linkText: 'Configure Storefront',
    linkTextAr: 'إعداد المتجر الرقمي',
    targetTab: 'kds',
  },
  {
    id: 'inventory',
    title: 'Inventory & Recipe Matrix',
    titleAr: 'إدارة المخزون وهندسة الوصفات',
    description:
      'Live ingredient depletion per dish sold. Automated minimum re-order trigger rules, batch tracking, warehouse stock transfers, and waste reduction analytics.',
    descriptionAr:
      'خصم مباشر للمكونات لكل وجبة مباعة. أوامر شراء ذكية وتتبع تواريخ الصلاحية ونقل المخزون بين المستودعات وتقليل الهدر.',
    icon: 'inventory_2',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    badge: 'Zero Stockouts',
    badgeBg: 'bg-amber-100',
    badgeColor: 'text-amber-900',
    linkText: 'View Stock Automation',
    linkTextAr: 'أتمتة المخزون والتوريد',
    targetTab: 'inventory',
  },
  {
    id: 'accounting',
    title: 'Accounting & Tax Compliance',
    titleAr: 'المحاسبة والامتثال الضريبي (زاتكا)',
    description:
      'Real-time General Ledger, AP/AR, cash flow reconciliations, and certified ZATCA Phase 2 FATOORA integration for automated, cryptographically signed tax reporting.',
    descriptionAr:
      'دفتر الأستاذ العام وتسويات التدفق النقدي والتكامل المعتمد مع المرحلة الثانية لمنظومة فاتورة (زاتكا) بتوقيع رقمي فوري.',
    icon: 'account_balance',
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    badge: 'ZATCA Approved',
    badgeBg: 'bg-rose-100',
    badgeColor: 'text-rose-800',
    linkText: 'See Tax Integrations',
    linkTextAr: 'تكاملات الفوترة الضريبية',
    targetTab: 'zatca',
  },
  {
    id: 'crm',
    title: 'CRM & Omnichannel Loyalty',
    titleAr: 'إدارة العملاء والولاء متعدد القنوات',
    description:
      'Automated WhatsApp receipts, customer VIP loyalty tiers, RFM segmentation, and high-conversion broadcast campaigns built straight into customer checkout habits.',
    descriptionAr:
      'فواتير عبر واتساب، مستويات ولاء للعملاء المتميزين، تقسيم شرائح العملاء وحملات ترويجية مدمجة في تجربة الدفع.',
    icon: 'groups',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    badge: 'WhatsApp API',
    badgeBg: 'bg-indigo-100',
    badgeColor: 'text-indigo-900',
    linkText: 'View Marketing Engine',
    linkTextAr: 'محرك التسويق والولاء',
    targetTab: 'analytics',
  },
  {
    id: 'hr',
    title: 'Workforce HR & Payroll',
    titleAr: 'الموارد البشرية والورديات والرواتب',
    description:
      'Biometric terminal clock-in, dynamic employee scheduling, cashier tip/commission tracking, and localized compliance payroll exports in one portal.',
    descriptionAr:
      'تسجيل حضور ببصمة الإصبع والوجه وجدولة الورديات وتتبع عمولات وإكراميات الصرافين ومسيرات رواتب متوافقة محلياً.',
    icon: 'badge',
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-600',
    badge: 'Biometric Sync',
    badgeBg: 'bg-sky-100',
    badgeColor: 'text-sky-900',
    linkText: 'Manage Shifts & Staff',
    linkTextAr: 'إدارة الفريق والورديات',
    targetTab: 'analytics',
  },
];

export const INTEGRATIONS: Integration[] = [
  {
    id: 'paytabs',
    name: 'PayTabs',
    tag: '@paytabs • Payments',
    category: 'payments',
    categoryLabel: 'Payments & BNPL',
    description:
      'Accept credit cards, Mada, and regional checkout flows with immediate automatic ledger settlement.',
    descriptionAr:
      'قبول بطاقات الائتمان ومدى وقنوات الدفع الإقليمية مع تسوية تلقائية فورية بدفاتر الحسابات.',
    badge: 'Official Gateway Partner',
    iconText: 'PT',
    iconBg: 'bg-slate-800 text-orange-400',
    iconColor: 'text-orange-400',
    verified: true,
  },
  {
    id: 'tabby',
    name: 'Tabby & Tamara',
    tag: '@bnpl-gcc • Buy Now Pay Later',
    category: 'payments',
    categoryLabel: 'Payments & BNPL',
    description:
      'Offer flexible installment plans at checkout counters while your merchant account receives funds settled upfront.',
    descriptionAr:
      'توفير خطط تقسيط ميسرة عند الكاشير مع استلام أموالك كاملة ومقدماً في حساب التاجر.',
    badge: 'BNPL Enabled',
    iconText: 'TB',
    iconBg: 'bg-slate-800 text-emerald-400',
    iconColor: 'text-emerald-400',
    verified: true,
  },
  {
    id: 'zatca',
    name: 'ZATCA Phase 2',
    tag: '@zatca • Tax Clearance',
    category: 'compliance',
    categoryLabel: 'ZATCA & Tax',
    description:
      'Cryptographic Phase 2 e-invoicing compliance. Every tax invoice generates automated QR tokens and transmits to FATOORA portal.',
    descriptionAr:
      'امتثال كامل للمرحلة الثانية للفوترة الإلكترونية وتوليد أكواد الاستجابة السريعة وتوثيق الفواتير بمنصة فاتورة.',
    badge: 'Certified Compliance',
    iconText: 'ZT',
    iconBg: 'bg-emerald-950 text-emerald-300',
    iconColor: 'text-emerald-300',
    verified: true,
  },
  {
    id: 'delivery',
    name: 'Talabat & Deliveroo',
    tag: '@aggregators • Delivery API',
    category: 'delivery',
    categoryLabel: 'Delivery & Kitchen',
    description:
      'Eliminate order re-punching. Incoming food orders flow directly onto kitchen display units with centralized menu management.',
    descriptionAr:
      'وداعاً لإعادة إدخال الطلبات يدوياً، تدفق مباشر للطلبات إلى شاشات المطبخ مع إدارة مركزية للقوائم والأسعار.',
    badge: 'Direct KDS Dispatch',
    iconText: 'TL',
    iconBg: 'bg-orange-950 text-orange-400',
    iconColor: 'text-orange-400',
    verified: true,
  },
  {
    id: 'shopify',
    name: 'Shopify & WooCommerce',
    tag: '@shopify • 2-Way Sync',
    category: 'ecommerce',
    categoryLabel: 'Commerce Platforms',
    description:
      'Bi-directional product, catalog, and inventory sync so online store items automatically update physical store availability.',
    descriptionAr:
      'مزامنة ثنائية الاتجاه للمنتجات والكتالوج والمخزون لتحديث المخازن ومبيعات المتاجر الإلكترونية وفروع المتاجر.',
    badge: 'Live Stock Locking',
    iconText: 'SH',
    iconBg: 'bg-emerald-950 text-emerald-400',
    iconColor: 'text-emerald-400',
    verified: true,
  },
  {
    id: 'quickbooks',
    name: 'QuickBooks & Zoho',
    tag: '@quickbooks • General Ledger',
    category: 'compliance',
    categoryLabel: 'ZATCA & Tax',
    description:
      'Automated night-audit journal entries. Synchronize end-of-day sales receipts, refunds, and payroll liability journals.',
    descriptionAr:
      'قيود محاسبية يومية تلقائية ومزامنة مبيعات نهاية اليوم والمردودات والتزامات الرواتب.',
    badge: 'Automated Reconciliation',
    iconText: 'QB',
    iconBg: 'bg-sky-950 text-sky-400',
    iconColor: 'text-sky-400',
    verified: true,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      '“PosBytz has transformed how we manage our cafe chain across Dubai. The integrated POS and inventory system saves us hours every day, and the real-time reporting gives us visibility we never had before.”',
    quoteAr:
      '“أحدث نظام بوس بايتز نقلة نوعية في إدارة سلسلة مقاهينا في دبي. نظام نقاط البيع والمخزون المتكامل يوفر ساعات يومياً والتقارير الفورية منحتنا رؤية لم تكن متاحة من قبل.”',
    author: 'Mr. Aadil Siddique',
    role: 'Owner • Karakccino UAE (14 Outlets)',
    initials: 'AS',
    initialsBg: 'bg-orange-100',
    initialsColor: 'text-orange-700',
  },
  {
    quote:
      '“Since switching to PosBytz, our order accuracy improved by 40% and kitchen wait times dropped by 25%. The multi-outlet franchise management and centralized menu push is remarkably seamless.”',
    quoteAr:
      '“منذ انتقالنا إلى بوس بايتز، ارتفعت دقة الطلبات بنسبة 40% وانخفضت أوقات الانتظار بنسبة 25%. إدارة الفروع المتعددة وتحديث القوائم مركزياً يتم بسلاسة فائقة.”',
    author: 'Ahmed Al-Rashidi',
    role: 'Operations Manager • Sultan Fine Dining',
    initials: 'AR',
    initialsBg: 'bg-emerald-100',
    initialsColor: 'text-emerald-800',
  },
  {
    quote:
      '“The inventory management alone paid for itself within the first month. We eliminated ingredient stockouts during peak dinner services and reduced high-value food waste by over 20%.”',
    quoteAr:
      '“إدارة المخزون وحدها غطت تكاليف النظام في أول شهر. تخلصنا تماماً من نفاد المكونات في أوقات العشاء المزدحمة وخفضنا هدر الأطعمة بنسبة تجاوزت 20%.”',
    author: 'Priya Nair',
    role: 'Managing Partner • Malabar Kitchen Group',
    initials: 'PN',
    initialsBg: 'bg-sky-100',
    initialsColor: 'text-sky-800',
  },
];

export const FAQS: FAQItem[] = [
  {
    question:
      'Why do modern retail and restaurant businesses need an ERP over standalone POS?',
    questionAr:
      'لماذا تحتاج المطاعم ومتاجر التجزئة الحديثة إلى نظام تخطيط موارد (ERP) بدلاً من نقاط بيع تقليدية فقط؟',
    answer:
      'A standalone POS only captures the register transaction. Retail ERP unifies that cash register with central warehouse purchase orders, raw ingredient recipe depletion, localized tax accounting (like ZATCA Phase 2), staff attendance, and multi-channel e-commerce. It eliminates manual spreadsheet imports and prevents costly discrepancies between front-of-house sales and back-office bank reconciliation.',
    answerAr:
      'نظام الكاشير التقليدي يسجل المعاملة فقط، بينما نظام تخطيط الموارد يوحد نقاط البيع مع أوامر شراء المستودعات وخصم مكونات الوصفات والامتثال الضريبي المعتمد (مثل زاتكا المرحلة الثانية) وجدولة الموظفين والربط مع المتاجر الإلكترونية، مما يمنع الأخطاء والفروقات المالية.',
  },
  {
    question:
      'What happens if the internet goes down in our store or restaurant?',
    questionAr: 'ماذا يحدث إذا انقطع اتصال الإنترنت في المتجر أو المطعم؟',
    answer:
      'PosBytz POS features an autonomous offline-first engine. Cashiers can continue to ring up orders, modify line items, apply discounts, and print physical kitchen tokens without disruption. The moment Wi-Fi or cellular data re-establishes, all transactions synchronize securely with central cloud ledgers in sequence.',
    answerAr:
      'يتميز نظام نقاط البيع من بوس بايتز بمحرك يعمل دون اتصال بالكامل. يمكن للكاشير تسجيل الطلبات والطباعة دون أي توقف، وفور عودة الإنترنت تتم مزامنة كافة الفواتير والمعاملات تلقائياً مع السحابة المركزية.',
  },
  {
    question: 'Is PosBytz compliant with Saudi ZATCA Phase 2 e-invoicing?',
    questionAr:
      'هل بوس بايتز معتمد لمتطلبات الفوترة الإلكترونية للمرحلة الثانية من هيئة الزكاة والضريبة (زاتكا)؟',
    answer:
      'Yes, PosBytz is officially certified for ZATCA Phase 2 Integration. It automatically handles cryptographic stamp generation, UUID sequencing, Phase 2 QR-code compilation, and real-time electronic clearance with the official FATOORA platform for both B2B standard and B2C simplified tax invoices.',
    answerAr:
      'نعم، بوس بايتز معتمد رسمياً للربط والتكامل مع المرحلة الثانية لمنظومة زاتكا. يقوم النظام آلياً بإنشاء الأختام الرقمية وأكواد الاستجابة السريعة والرمز التعريفي الفريد ومزامنة الفواتير الضريبية المبسطة والقياسية مع منصة فاتورة لحظياً.',
  },
  {
    question:
      'Can small cafes or single boutique outlets use PosBytz affordably?',
    questionAr:
      'هل يمكن للمقاهي الصغيرة أو المتاجر ذات الفرع الواحد استخدام بوس بايتز بتكلفة مناسبة؟',
    answer:
      'Absolutely. While PosBytz easily powers multi-branch restaurant empires, our modular subscription tier allows single-outlet coffee shops and boutiques to activate only the features they need — starting with basic POS and inventory — then toggling on delivery integrations, loyalty, or advanced accounting as they scale.',
    answerAr:
      'بالتأكيد. باقاتنا المرنة مصممة لتناسب الفرع الفردي والمقاهي المستقلة عبر تفعيل الميزات الأساسية بنقاط البيع والمخزون، مع إمكانية ترقية الخطة لتفعيل تطبيقات التوصيل والمحاسبة المتقدمة والولاء كلما نما عملك.',
  },
  {
    question:
      'Can we retain our existing receipt printers, tablets, and barcode scanners?',
    questionAr:
      'هل يمكننا الاحتفاظ بطابعات الفواتير والأجهزة اللوحية وقارئات الباركود المتوفرة لدينا حالياً؟',
    answer:
      'In 95% of deployments, yes! PosBytz is hardware-agnostic and runs across iPads, Android tablets, dedicated Windows touch POS terminals, and mobile Android smart POS devices (Sunmi, Pax, Elo). Thermal printers connecting via Bluetooth, LAN, or USB are plug-and-play ready.',
    answerAr:
      'في 95% من الحالات نعم! نظام بوس بايتز متوافق مع كافة الأجهزة سواء أجهزة أيباد، أندرويد، ويندوز، وأجهزة الصراف الذكية المحمولة (Sunmi و Pax). كما يدعم طابعات الإيصالات الحرارية عبر البلوتوث والشبكة والـ USB مباشرة.',
  },
];

export const SAMPLE_MENU_ITEMS: MenuItem[] = [
  {
    id: 'm-1',
    name: 'Signature Spanish Latte',
    nameAr: 'سبانيش لاتيه مميز',
    category: 'beverages',
    price: 24.0,
    calories: '185 kcal',
    quantityAvailable: 35,
    image:
      'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=400&q=80',
    ingredients: [
      { name: 'Specialty Espresso Beans', amount: '18g' },
      { name: 'Fresh Whole Milk', amount: '180ml' },
      { name: 'Condensed Milk Blend', amount: '25ml' },
    ],
  },
  {
    id: 'm-2',
    name: 'Saffron Karak Chai',
    nameAr: 'كرك أصلي بالزعفران',
    category: 'beverages',
    price: 12.0,
    calories: '110 kcal',
    quantityAvailable: 50,
    image:
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80',
    ingredients: [
      { name: 'Assam Tea Leaves', amount: '10g' },
      { name: 'Evaporated Milk', amount: '120ml' },
      { name: 'Pure Iranian Saffron', amount: '0.2g' },
      { name: 'Cardamom & Spices', amount: '3g' },
    ],
  },
  {
    id: 'm-3',
    name: 'Wagyu Truffle Smash Burger',
    nameAr: 'برجر واغيو ترافل سماش',
    category: 'food',
    price: 48.0,
    calories: '640 kcal',
    quantityAvailable: 18,
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
    ingredients: [
      { name: 'Wagyu Beef Patty (A5 blend)', amount: '160g' },
      { name: 'Brioche Bun', amount: '1 pc' },
      { name: 'Black Truffle Mayo', amount: '20g' },
      { name: 'Aged Cheddar Slice', amount: '25g' },
    ],
  },
  {
    id: 'm-4',
    name: 'Crispy Parmesan Truffle Fries',
    nameAr: 'بطاطس ترافل مع البارميزان المقرمش',
    category: 'food',
    price: 26.0,
    calories: '380 kcal',
    quantityAvailable: 25,
    image:
      'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=400&q=80',
    ingredients: [
      { name: 'Skin-on Potato Fries', amount: '220g' },
      { name: 'White Truffle Oil', amount: '10ml' },
      { name: 'Aged Parmigiano Reggiano', amount: '15g' },
    ],
  },
  {
    id: 'm-5',
    name: 'Artisan Pistachio Croissant',
    nameAr: 'كرواسون الفستق الحرفي',
    category: 'desserts',
    price: 22.0,
    calories: '320 kcal',
    quantityAvailable: 20,
    image:
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80',
    ingredients: [
      { name: 'Butter Croissant Dough', amount: '110g' },
      { name: 'Sicilian Pistachio Praline', amount: '35g' },
      { name: 'Crushed Green Pistachios', amount: '10g' },
    ],
  },
  {
    id: 'm-6',
    name: 'Organic Super Berry Acai Bowl',
    nameAr: 'وعاء أساي التوت العضوي',
    category: 'desserts',
    price: 36.0,
    calories: '280 kcal',
    quantityAvailable: 15,
    image:
      'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=400&q=80',
    ingredients: [
      { name: 'Pure Amazonian Acai Puree', amount: '180g' },
      { name: 'Gluten-Free Granola', amount: '40g' },
      { name: 'Fresh Blueberries & Strawberries', amount: '50g' },
    ],
  },
];

export const INITIAL_ORDER_RECORDS = [
  {
    id: 'ord-101',
    orderNumber: 'ORD-9481',
    customerName: 'Pawan Patil',
    rollNo: 'CX-2026-089',
    itemId: 'm-1',
    itemName: 'Signature Spanish Latte',
    itemNameAr: 'سبانيش لاتيه مميز',
    itemPrice: 24.0,
    quantity: 2,
    totalAmount: 48.0,
    status: 'confirmed' as const,
    timestamp: 'Just now',
  },
  {
    id: 'ord-102',
    orderNumber: 'ORD-9480',
    customerName: 'Aarav Sharma',
    rollNo: 'CX-2026-042',
    itemId: 'm-3',
    itemName: 'Wagyu Truffle Smash Burger',
    itemNameAr: 'برجر واغيو ترافل سماش',
    itemPrice: 48.0,
    quantity: 1,
    totalAmount: 48.0,
    status: 'preparing' as const,
    timestamp: '4 mins ago',
  },
  {
    id: 'ord-103',
    orderNumber: 'ORD-9479',
    customerName: 'Fatima Al-Zahra',
    rollNo: 'CX-2026-115',
    itemId: 'm-2',
    itemName: 'Saffron Karak Chai',
    itemNameAr: 'كرك أصلي بالزعفران',
    itemPrice: 12.0,
    quantity: 3,
    totalAmount: 36.0,
    status: 'ready' as const,
    timestamp: '12 mins ago',
  },
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-1',
    name: 'Specialty Espresso Beans (Ethiopian Yirgacheffe)',
    nameAr: 'حبوب إسبريسو مختصة (إثيوبي)',
    category: 'Coffee & Tea',
    currentStock: 48.5,
    unit: 'kg',
    minThreshold: 15.0,
    costPerUnit: 110.0,
    depletionRate: '18g / cup',
    status: 'optimal',
  },
  {
    id: 'inv-2',
    name: 'Fresh Whole Milk (Barista Grade)',
    nameAr: 'حليب طازج كامل الدسم (باريستا)',
    category: 'Dairy',
    currentStock: 24.0,
    unit: 'liters',
    minThreshold: 30.0,
    costPerUnit: 7.5,
    depletionRate: '180ml / latte',
    status: 'low',
  },
  {
    id: 'inv-3',
    name: 'Wagyu Beef Patties (A5 Blend)',
    nameAr: 'أقراص لحم واغيو (خلطة A5)',
    category: 'Meats',
    currentStock: 180,
    unit: 'pcs',
    minThreshold: 50,
    costPerUnit: 22.0,
    depletionRate: '1 pc / burger',
    status: 'optimal',
  },
  {
    id: 'inv-4',
    name: 'Pure Iranian Saffron Threads',
    nameAr: 'خيوط زعفران إيراني أصلي',
    category: 'Spices',
    currentStock: 42.0,
    unit: 'grams',
    minThreshold: 20.0,
    costPerUnit: 18.0,
    depletionRate: '0.2g / karak',
    status: 'optimal',
  },
  {
    id: 'inv-5',
    name: 'Artisan Butter Croissant Dough',
    nameAr: 'عجينة كرواسون زبدة فرنسية',
    category: 'Bakery',
    currentStock: 35,
    unit: 'pcs',
    minThreshold: 40,
    costPerUnit: 8.5,
    depletionRate: '1 pc / croissant',
    status: 'reorder',
  },
];

export const INITIAL_KDS_TICKETS: KDSTicket[] = [
  {
    id: 'kds-101',
    orderNumber: 'ORD-8921',
    source: 'POS Dine-in',
    tableOrChannel: 'Table 04 • Indoor',
    items: [
      { name: 'Signature Spanish Latte', qty: 2, modifiers: ['Oat Milk'] },
      { name: 'Artisan Pistachio Croissant', qty: 1, modifiers: ['Extra Warm'] },
    ],
    elapsedSeconds: 245,
    status: 'preparing',
    createdAt: '2 mins ago',
  },
  {
    id: 'kds-102',
    orderNumber: 'ORD-8920',
    source: 'Talabat',
    tableOrChannel: 'Talabat Express #3910',
    items: [
      { name: 'Wagyu Truffle Smash Burger', qty: 2, modifiers: ['No Pickles'] },
      { name: 'Crispy Parmesan Truffle Fries', qty: 2 },
    ],
    elapsedSeconds: 512,
    status: 'preparing',
    createdAt: '6 mins ago',
  },
  {
    id: 'kds-103',
    orderNumber: 'ORD-8919',
    source: 'POS Dine-in',
    tableOrChannel: 'Table 09 • Terrace',
    items: [
      { name: 'Saffron Karak Chai', qty: 3, modifiers: ['Less Sugar'] },
      { name: 'Organic Super Berry Acai Bowl', qty: 1 },
    ],
    elapsedSeconds: 840,
    status: 'ready',
    createdAt: '12 mins ago',
  },
];

export const INITIAL_ZATCA_INVOICES: ZATCAInvoice[] = [
  {
    id: 'inv-zatca-01',
    invoiceNumber: 'INV-2025-09-001842',
    timestamp: '2025-09-10 10:14:22',
    buyerName: 'Walk-in Guest (Simplified B2C)',
    subtotal: 104.35,
    vatAmount: 15.65,
    grandTotal: 120.0,
    currency: 'SAR',
    qrPayload: 'AQVQb3NCeXR6IENSUDIWCzMxMDI5NDgxODIwMDAwMw==',
    cryptographicHash: 'a7f0c19b33e212d8847b2c9e78261ab7',
    fatooraStatus: 'CLEARED',
  },
  {
    id: 'inv-zatca-02',
    invoiceNumber: 'INV-2025-09-001841',
    timestamp: '2025-09-10 10:02:11',
    buyerName: 'Al-Noor Hospitality LLC (Standard B2B)',
    subtotal: 1350.0,
    vatAmount: 202.5,
    grandTotal: 1552.5,
    currency: 'SAR',
    qrPayload: 'AQVQb3NCeXR6IENSUDIWCzMxMDI5NDgxODIwMDAwMw==',
    cryptographicHash: 'e92bf1893c54aa620311de79bc0032ac',
    fatooraStatus: 'CLEARED',
  },
  {
    id: 'inv-zatca-03',
    invoiceNumber: 'INV-2025-09-001840',
    timestamp: '2025-09-10 09:48:59',
    buyerName: 'Walk-in Guest (Simplified B2C)',
    subtotal: 48.7,
    vatAmount: 7.3,
    grandTotal: 56.0,
    currency: 'SAR',
    qrPayload: 'AQVQb3NCeXR6IENSUDIWCzMxMDI5NDgxODIwMDAwMw==',
    cryptographicHash: 'f419c832bb58de994302af383bca9011',
    fatooraStatus: 'CLEARED',
  },
];
