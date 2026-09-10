import React, { useState } from 'react';
import { Language } from '../types';
import { X, Code2, Copy, Check, Terminal, ExternalLink } from 'lucide-react';

interface ApiAccessModalProps {
  lang: Language;
  onClose: () => void;
}

export const ApiAccessModal: React.FC<ApiAccessModalProps> = ({
  lang,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const isAr = lang === 'ar';

  const sampleApiKey = 'pb_live_sk_9481a8b9f02e4d7a81c637b92310f';

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleApiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0A0A0A] text-white border border-stone-800 rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-[#F97316] flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                {isAr ? 'واجهة البرمجة المؤسسية (API)' : 'Enterprise API & Webhook Suite'}
              </h3>
              <p className="text-xs text-stone-400">
                REST, GraphQL & Real-time Webhooks
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-900 hover:bg-stone-800 flex items-center justify-center text-stone-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-4 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-stone-300 mb-1.5 font-mono">
              Sandbox API Secret Key
            </label>
            <div className="flex items-center bg-stone-950 border border-stone-800 rounded-xl p-3 justify-between">
              <span className="font-mono text-stone-300 truncate">{sampleApiKey}</span>
              <button
                onClick={handleCopy}
                className="ml-2 px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center gap-1 shrink-0 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="bg-stone-950 p-4 rounded-xl border border-stone-800/80 font-mono text-[11px] space-y-2 text-stone-300">
            <div className="text-stone-500">// Example: Fetch Live Inventory Across Outlets</div>
            <div className="text-[#F97316]">curl -X GET https://api.posbytz.cloud/v2/inventory/outlets \</div>
            <div className="pl-4 text-stone-400">-H "Authorization: Bearer {sampleApiKey.substring(0, 10)}..." \</div>
            <div className="pl-4 text-stone-400">-H "Content-Type: application/json"</div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
              <div className="font-bold text-white mb-1">Endpoints Available</div>
              <p className="text-[11px] text-stone-400">POS Orders, KDS Bump Webhooks, ZATCA XML, Recipe Depletion</p>
            </div>
            <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
              <div className="font-bold text-white mb-1">Rate Limits</div>
              <p className="text-[11px] text-stone-400">10,000 req/min with SLA 99.98% uptime guarantee</p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#F97316] text-white text-xs font-bold hover:bg-[#EA580C] cursor-pointer"
          >
            {isAr ? 'تم، حفظ الإعدادات' : 'Close Developer Console'}
          </button>
        </div>
      </div>
    </div>
  );
};
