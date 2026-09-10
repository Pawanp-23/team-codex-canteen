import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { X, Play, Pause, CheckCircle, ArrowRight, Store, ChefHat, Layers, ShieldCheck } from 'lucide-react';

interface DemoModalProps {
  lang: Language;
  onClose: () => void;
  onLaunchLiveHub: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({
  lang,
  onClose,
  onLaunchLiveHub,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const isAr = lang === 'ar';

  const steps = [
    {
      title: '1. Fast POS Ring-Up',
      titleAr: '1. تسجيل سريع عند الكاشير',
      desc: 'Cashier rings up 2 Spanish Lattes and 1 Artisan Pistachio Croissant on the touch terminal in 1.4 seconds.',
      descAr: 'يقوم الكاشير بتسجيل 2 سبانيش لاتيه و1 كرواسون فستق على شاشة اللمس في 1.4 ثانية فقط.',
      icon: Store,
      badge: 'Front of House',
      accent: 'text-orange-500',
    },
    {
      title: '2. Kitchen Line Bump (KDS)',
      titleAr: '2. توجيه الطلب لشاشة المطبخ (KDS)',
      desc: 'Ticket automatically routes to the barista display station with target prep timer set to 3 minutes.',
      descAr: 'يتم توجيه التذكرة فورياً إلى شاشة الباريستا مع مؤقت تحضير مستهدف 3 دقائق.',
      icon: ChefHat,
      badge: 'Kitchen Routing',
      accent: 'text-emerald-500',
    },
    {
      title: '3. Recipe Ingredient Depletion',
      titleAr: '3. خصم مباشر لمكونات الوصفة',
      desc: 'Central inventory matrix decrements 36g espresso beans, 360ml whole milk, and 1 croissant dough instantly.',
      descAr: 'مصفوفة المخزون تخصم تلقائياً 36 جرام بن إسبريسو و360 مل حليب وعجينة كرواسون واحدة.',
      icon: Layers,
      badge: 'Warehouse Sync',
      accent: 'text-amber-500',
    },
    {
      title: '4. ZATCA Phase 2 Clearance',
      titleAr: '4. التوثيق الضريبي اللحظي (زاتكا)',
      desc: 'Cryptographic stamp and Phase 2 compliant QR code are printed on receipt and transmitted to FATOORA.',
      descAr: 'يتم طباعة الختم الرقمي وكود الاستجابة السريعة على الفاتورة ومزامنتها لحظياً مع منصة فاتورة.',
      icon: ShieldCheck,
      badge: 'Tax Clearance',
      accent: 'text-rose-500',
    },
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  const activeStep = steps[currentStep];
  const StepIcon = activeStep.icon;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0A0A0A] border border-stone-800 text-white rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] animate-pulse"></span>
            <h3 className="font-bold text-base md:text-lg font-heading">
              {isAr ? 'عرض توضيحي للمنظومة (دقيقتان)' : 'PosBytz 2-Minute Architectural Tour'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-900 hover:bg-stone-800 flex items-center justify-center text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="grid grid-cols-4 gap-2 my-6">
          {steps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentStep(idx);
                setIsPlaying(false);
              }}
              className="flex flex-col gap-1 text-left cursor-pointer"
            >
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentStep === idx
                    ? 'bg-[#F97316]'
                    : currentStep > idx
                    ? 'bg-stone-600'
                    : 'bg-stone-800'
                }`}
              ></div>
              <span className="text-[10px] font-mono text-stone-400 hidden sm:inline">
                Step 0{idx + 1}
              </span>
            </button>
          ))}
        </div>

        {/* Video / Interactive Simulation Screen */}
        <div className="relative rounded-2xl bg-stone-950 border border-stone-800 p-8 min-h-[260px] flex flex-col justify-between overflow-hidden">
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#F97316]/15 rounded-full blur-3xl pointer-events-none"></div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-stone-900 border border-stone-800 text-stone-300 font-mono">
                {activeStep.badge}
              </span>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 rounded-lg bg-stone-900 text-stone-300 hover:text-white"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-start gap-4">
              <div
                className={`w-14 h-14 rounded-2xl bg-stone-900 flex items-center justify-center ${activeStep.accent} shrink-0 border border-stone-800`}
              >
                <StepIcon className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-xl font-bold font-heading text-white">
                  {isAr ? activeStep.titleAr : activeStep.title}
                </h4>
                <p className="text-sm text-stone-400 mt-2 leading-relaxed">
                  {isAr ? activeStep.descAr : activeStep.desc}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-4 border-t border-stone-900 flex items-center justify-between text-xs text-stone-500 font-mono">
            <span>Latency: &lt; 0.2s</span>
            <span>Cloud State: Fully Synchronized</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-stone-400">
            {isAr
              ? 'تريد تجربة إدخال طلب حقيقي؟'
              : 'Want to ring up real orders yourself?'}
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-stone-900 text-stone-300 hover:text-white text-xs font-semibold"
            >
              {isAr ? 'إغلاق' : 'Close'}
            </button>
            <button
              onClick={() => {
                onClose();
                onLaunchLiveHub();
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#F97316] text-white text-xs font-bold hover:bg-[#EA580C] shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isAr ? 'فتح المحطة المباشرة' : 'Launch Interactive Terminal'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
