import React, { useState } from 'react';
import { Language } from '../types';
import { X, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FreeTrialModalProps {
  lang: Language;
  onClose: () => void;
  onLaunchLiveHub: () => void;
}

export const FreeTrialModal: React.FC<FreeTrialModalProps> = ({
  lang,
  onClose,
  onLaunchLiveHub,
}) => {
  const [brandSubdomain, setBrandSubdomain] = useState('sultan-roastery');
  const [created, setCreated] = useState(false);
  const isAr = lang === 'ar';

  const handleCreateTrial = (e: React.FormEvent) => {
    e.preventDefault();
    setCreated(true);
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F97316', '#10B981', '#F59E0B'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0A0A0A] text-white border border-stone-800 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#F97316]" />
            <h3 className="text-base font-bold text-white font-heading">
              {isAr ? 'تجربة سحابية مجانية (14 يوماً)' : '14-Day Full Cloud Trial'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-900 hover:bg-stone-800 flex items-center justify-center text-stone-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {created ? (
          <div className="py-6 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white font-heading">
              {isAr ? 'تم تجهيز نطاقك السحابي بنجاح!' : 'Cloud Workspace Provisioned!'}
            </h4>
            <div className="my-4 p-3.5 rounded-xl bg-stone-900 border border-stone-800 font-mono text-xs text-orange-400">
              https://{brandSubdomain}.posbytz.cloud
            </div>
            <p className="text-xs text-stone-400 max-w-xs mx-auto mb-5">
              {isAr
                ? 'تم تجهيز قاعدة البيانات، والامتثال لزاتكا، ونظام الكاشير. يمكنك الآن الدخول مباشرة.'
                : 'ZATCA Phase 2 sandbox, inventory matrix, and POS counter are activated for your trial.'}
            </p>
            <button
              onClick={() => {
                onClose();
                onLaunchLiveHub();
              }}
              className="w-full py-3 rounded-full bg-[#F97316] text-white text-xs font-bold hover:bg-[#EA580C] shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isAr ? 'دخول لوحة التحكم المباشرة الآن' : 'Launch Workspace Terminal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleCreateTrial} className="mt-5 space-y-4 text-xs">
            <div>
              <label className="block font-bold text-stone-300 mb-1">
                {isAr ? 'اسم النطاق السحابي لعلامتك' : 'Brand Cloud Subdomain'}
              </label>
              <div className="flex items-center rounded-xl bg-stone-900 border border-stone-800 px-3 py-2.5">
                <input
                  type="text"
                  required
                  value={brandSubdomain}
                  onChange={(e) => setBrandSubdomain(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                  className="bg-transparent text-white font-mono flex-1 focus:outline-none"
                  placeholder="your-brand"
                />
                <span className="text-stone-500 font-mono">.posbytz.cloud</span>
              </div>
            </div>

            <div>
              <label className="block font-bold text-stone-300 mb-1">
                {isAr ? 'البريد الإلكتروني للإدارة' : 'Admin Email'}
              </label>
              <input
                type="email"
                required
                placeholder="founder@yourbrand.com"
                className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-white placeholder-stone-600 focus:outline-none focus:border-[#F97316]"
              />
            </div>

            <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800 text-[11px] text-stone-400">
              ✓ Includes 1 POS Terminal + KDS Kitchen Screen + ZATCA Phase 2 Sandbox
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#F97316] text-white font-bold text-xs shadow-lg hover:bg-[#EA580C] transition-all cursor-pointer"
            >
              {isAr ? 'إنشاء المساحة السحابية وتفعيل التجربة' : 'Create Free 14-Day Workspace'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
