import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { X, Play, Pause, ArrowRight, Store, ChefHat, Layers, ShieldCheck } from 'lucide-react';

interface DemoModalProps {
  lang?: Language;
  onClose: () => void;
  onLaunchLiveHub: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({
  onClose,
  onLaunchLiveHub,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const steps = [
    {
      title: '1. Fast POS Ring-Up',
      desc: 'Cashier rings up 2 Cold Brews and 1 Paneer Tikka Gourmet Wrap on the touch terminal in 1.4 seconds.',
      icon: Store,
      badge: 'Front of House',
      accent: 'text-orange-500',
    },
    {
      title: '2. Kitchen Line Bump (KDS)',
      desc: 'Ticket automatically routes to kitchen & beverage station with target prep timer set to 3 minutes.',
      icon: ChefHat,
      badge: 'Kitchen Routing',
      accent: 'text-emerald-500',
    },
    {
      title: '3. Recipe Ingredient Depletion',
      desc: 'Central inventory matrix decrements coffee beans, dairy milk, and fresh paneer stock instantly.',
      icon: Layers,
      badge: 'Warehouse Sync',
      accent: 'text-amber-500',
    },
    {
      title: '4. Indian GST & UPI QR Invoicing',
      desc: 'Digital signature, HSN-compliant 5% GST breakdown, and dynamic UPI QR code generated instantly on receipt.',
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
              PosBytz 2-Minute Architectural Tour
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
                  {activeStep.title}
                </h4>
                <p className="text-sm text-stone-400 mt-2 leading-relaxed">
                  {activeStep.desc}
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
            Want to ring up real orders yourself?
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-stone-900 text-stone-300 hover:text-white text-xs font-semibold"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onLaunchLiveHub();
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#F97316] text-white text-xs font-bold hover:bg-[#EA580C] shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Launch Interactive Terminal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
