import React from 'react';
import { IncomeRecord } from '../types';
import { X, Printer, Flame, Award, CheckCircle } from 'lucide-react';

interface ReceiptModalProps {
  record: IncomeRecord | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ record, onClose }) => {
  if (!record) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden my-6">
        {/* Top Header */}
        <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold">অফিসিয়াল মানি রিসিপ্ট (Money Receipt)</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors shadow"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>প্রিন্ট রশীদ</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Paper */}
        <div className="p-8 bg-amber-50/30 print:p-0 print:bg-white text-slate-900 select-none">
          <div className="border-4 border-double border-blue-900 p-6 rounded-xl bg-white shadow-md relative">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <Flame className="w-72 h-72 text-blue-950" />
            </div>

            {/* Header */}
            <div className="text-center pb-4 border-b-2 border-slate-200 relative z-10">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-blue-950 text-amber-400 flex items-center justify-center font-bold">
                  <Flame className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-blue-950 tracking-tight">বাংলাদেশ বয়লার পরিচারক পরিষদ</h2>
              </div>
              <p className="text-xs text-slate-600 font-semibold tracking-wide">
                Bangladesh Boiler Operators Parishad • গভঃ রেজিঃ নং-বিওপি/২০১৬
              </p>
              <p className="text-[11px] text-slate-500">
                কেন্দ্রীয় দপ্তর: প্লট-২৪, ব্লক-বি, তেজগাঁও শিল্প এলাকা, ঢাকা-১২০৮ | ফোন: ০১৭১১-২৩৪৫৬৭
              </p>
              <div className="mt-2 inline-block bg-blue-950 text-amber-300 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                অর্থ প্রাপ্তি রশীদ / MONEY RECEIPT
              </div>
            </div>

            {/* Meta Row: Receipt No & Date */}
            <div className="flex justify-between items-center py-3 border-b border-slate-200 text-xs font-medium relative z-10">
              <div>
                <span className="text-slate-500">রসিদ নম্বর (Receipt No): </span>
                <span className="font-mono font-bold text-blue-950 text-sm">{record.receiptNumber}</span>
              </div>
              <div>
                <span className="text-slate-500">ভাউচার নম্বর: </span>
                <span className="font-mono font-bold text-slate-800">{record.voucherNo}</span>
              </div>
              <div>
                <span className="text-slate-500">তারিখ: </span>
                <span className="font-semibold text-slate-800">{record.date}</span>
              </div>
            </div>

            {/* Receipt Body */}
            <div className="py-5 space-y-3.5 text-xs relative z-10">
              <div className="flex items-baseline gap-2">
                <span className="text-slate-600 min-w-28 shrink-0">গ্রহণ করা হলো (Received From):</span>
                <span className="font-bold text-slate-900 border-b border-dotted border-slate-400 flex-1 pb-0.5">
                  {record.receivedFrom}
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-slate-600 min-w-28 shrink-0">ব্যাবদ / খাত (Purpose/Head):</span>
                <span className="font-semibold text-blue-900 border-b border-dotted border-slate-400 flex-1 pb-0.5">
                  {record.head} {record.notes ? `(${record.notes})` : ''}
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-slate-600 min-w-28 shrink-0">পরিশোধের মাধ্যম (Payment Method):</span>
                <span className="font-medium text-slate-800 border-b border-dotted border-slate-400 flex-1 pb-0.5">
                  {record.paymentMethod} • রেফারেন্স: {record.reference}
                </span>
              </div>

              {/* Amount Box */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 border border-slate-300 rounded-lg p-3 mt-2">
                <div className="text-xs">
                  <span className="text-slate-500 block">টাকার পরিমাণ (কথায়):</span>
                  <span className="font-bold text-slate-800 italic">
                    টাকা {record.amount.toLocaleString('bn-BD')} টাকা মাত্র (Official Receipt Validated)
                  </span>
                </div>
                <div className="bg-blue-950 text-amber-300 px-4 py-2 rounded-lg text-right font-mono font-bold text-base tracking-wider shrink-0 border border-amber-400/50">
                  ৳ {record.amount.toLocaleString('en-US')}.০০
                </div>
              </div>
            </div>

            {/* Signature Blocks */}
            <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-2 gap-8 text-center text-xs relative z-10">
              <div className="flex flex-col items-center">
                <div className="w-36 border-b border-slate-400 pb-1">
                  <span className="font-serif italic text-slate-600 text-xs">{record.createdBy}</span>
                </div>
                <span className="text-slate-500 mt-1">আদায়কারী / প্রস্তুতকারক</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-36 border-b border-slate-400 pb-1 flex flex-col items-center">
                  <span className="font-serif italic text-blue-900 font-bold text-xs">M. Rahman</span>
                </div>
                <span className="text-slate-500 mt-1 font-semibold text-blue-950">অর্থ সম্পাদক / অনুমোদিত কর্মকর্তা</span>
              </div>
            </div>

            {/* Seal / Note */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span>* এটি কম্পিউটারাইজড মানি রসিদ, এতে পরিষদের অফিশিয়াল সিল সম্বলিত।</span>
              <span className="flex items-center gap-1 text-emerald-600 font-medium">
                <CheckCircle className="w-3 h-3" />
                যাচাইকৃত ও পরিশোধিত
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-semibold"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
