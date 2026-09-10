import React, { useState } from 'react';
import { Language } from '../types';
import { X, Calendar, Building, Users, CheckCircle2, Phone, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookDemoModalProps {
  lang: Language;
  onClose: () => void;
}

export const BookDemoModal: React.FC<BookDemoModalProps> = ({
  lang,
  onClose,
}) => {
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('Specialty Coffee & Cafe');
  const [outlets, setOutlets] = useState('2-5 Outlets');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isAr = lang === 'ar';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F97316', '#10B981', '#0EA5E9'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white text-stone-900 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div>
            <h3 className="text-lg font-bold text-stone-900 font-heading">
              {isAr ? 'حجز عرض تجريبي مخصص' : 'Schedule Executive Demo'}
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              {isAr
                ? 'جلسة استشارية مباشرة مع مهندس حلول متخصص في قطاعك'
                : 'Direct 1-on-1 walkthrough tailored to your brand operations'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-stone-900 font-heading">
              {isAr ? 'تم استلام طلب العرض بنجاح!' : 'Executive Demo Confirmed'}
            </h4>
            <p className="text-sm text-stone-600 mt-2 max-w-sm mx-auto">
              {isAr
                ? 'سيتواصل معك مهندس الحلول خلال أقل من 15 دقيقة لتأكيد موعد الجلسة الافتراضية.'
                : 'A dedicated PosBytz solutions architect will reach out within 15 minutes with calendar options.'}
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-7 py-2.5 rounded-full bg-[#F97316] text-white text-xs font-bold shadow-md hover:bg-[#EA580C]"
            >
              {isAr ? 'تم، شكراً لك' : 'Done'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                {isAr ? 'اسم العلامة التجارية / المطعم' : 'Brand / Company Name'}
              </label>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Karakccino Specialty Cafe"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-[#F97316]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {isAr ? 'قطاع النشاط' : 'Business Archetype'}
                </label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-[#F97316] bg-white"
                >
                  <option>Specialty Coffee & Cafe</option>
                  <option>Casual & Fine Dining</option>
                  <option>Fast Casual & QSR</option>
                  <option>Retail & Apparel</option>
                  <option>Supermarket & Grocery</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {isAr ? 'عدد الفروع الحالية' : 'Number of Outlets'}
                </label>
                <select
                  value={outlets}
                  onChange={(e) => setOutlets(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-[#F97316] bg-white"
                >
                  <option>1 Single Outlet</option>
                  <option>2-5 Outlets</option>
                  <option>6-15 Outlets</option>
                  <option>16-50+ Outlets (Enterprise)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {isAr ? 'البريد الإلكتروني المهني' : 'Work Email'}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-[#F97316]"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {isAr ? 'رقم الهاتف / الواتساب' : 'Phone / WhatsApp'}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+971 50 123 4567"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-[#F97316]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#F97316] text-white font-bold text-xs shadow-lg hover:bg-[#EA580C] transition-all cursor-pointer"
              >
                {isAr ? 'تأكيد وحجز موعد العرض' : 'Confirm & Request Demo'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
