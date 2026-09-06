import React, { useState } from 'react';
import { IncomeRecord, ExpenseRecord } from '../types';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  Download, 
  FileText, 
  Calendar, 
  PieChart as PieIcon, 
  BarChart3, 
  CheckCircle,
  Receipt
} from 'lucide-react';

interface FinanceViewProps {
  incomeRecords: IncomeRecord[];
  expenseRecords: ExpenseRecord[];
  onOpenReceiptModal: (record: IncomeRecord) => void;
}

export const FinanceView: React.FC<FinanceViewProps> = ({
  incomeRecords,
  expenseRecords,
  onOpenReceiptModal
}) => {
  const [selectedFiscalYear, setSelectedFiscalYear] = useState('2025-26');
  const [activeTab, setActiveTab] = useState<'summary' | 'income' | 'expense' | 'audit'>('summary');
  const [downloadMsg, setDownloadMsg] = useState<string | null>(null);

  const triggerAuditDownload = (title: string) => {
    setDownloadMsg(`"${title}" ডাউনলোড শুরু হচ্ছে...`);
    setTimeout(() => {
      setDownloadMsg(null);
    }, 4000);
  };

  const totalIncome = incomeRecords.reduce((sum, r) => sum + r.amount, 0);
  const totalExpense = expenseRecords.reduce((sum, r) => sum + r.amount, 0);
  const netBalance = totalIncome - totalExpense;

  // Group by heads
  const incomeByHead: { [key: string]: number } = {};
  incomeRecords.forEach((r) => {
    incomeByHead[r.head] = (incomeByHead[r.head] || 0) + r.amount;
  });

  const expenseByHead: { [key: string]: number } = {};
  expenseRecords.forEach((r) => {
    expenseByHead[r.head] = (expenseByHead[r.head] || 0) + r.amount;
  });

  const auditReports = [
    { title: 'বার্ষিক আর্থিক নিরীক্ষা প্রতিবেদন ২০২৪-২০২৫', auditor: 'এম. কে. রহমান অ্যান্ড কোং, চার্টার্ড অ্যাকাউন্ট্যান্টস', date: '১৫ জুলাই ২০২৫', status: 'সম্পূর্ণ অনুমোদিত', size: '2.4 MB' },
    { title: 'অর্ধবার্ষিক অভ্যন্তরীণ অডিট রিপোর্ট (জানুয়ারি - জুন ২০২৫)', auditor: 'কেন্দ্রীয় অভ্যন্তরীণ অডিট কমিটি, বিবিওপি', date: '১০ জুলাই ২০২৫', status: 'সম্পূর্ণ অনুমোদিত', size: '1.8 MB' },
    { title: 'জাতীয় সম্মেলন ২০২৪ বিশেষ হিসাব বিবরণী', auditor: 'অর্থ ও বাজেট সেল, কেন্দ্রীয় পরিষদ', date: '২৫ নভেম্বর ২০২৪', status: 'সম্পূর্ণ অনুমোদিত', size: '3.1 MB' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
            আর্থিক স্বচ্ছতা ও অডিট
          </span>
          <h1 className="text-3xl font-bold text-slate-900 mt-2">
            আয়-ব্যয় ও তহবিল স্থিতি বিবরণী
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            পরিষদের প্রতিটি অর্থপ্রাপ্তি ও ব্যয়ের পূর্ণাঙ্গ ডিজিটাল ভাউচার ও নিরীক্ষিত হিসাব জনসাধারণের অবগতির জন্য উন্মুক্ত।
          </p>
        </div>

        {/* Year Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-600 font-semibold">অর্থবছর:</span>
          <select
            value={selectedFiscalYear}
            onChange={(e) => setSelectedFiscalYear(e.target.value)}
            className="p-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-blue-950 focus:outline-none"
          >
            <option value="2025-26">অর্থবছর ২০২৫-২০২৬ (চলতি)</option>
            <option value="2024-25">অর্থবছর ২০২৪-২০২৫ (নিরীক্ষিত)</option>
            <option value="2023-24">অর্থবছর ২০২৩-২০২৪ (নিরীক্ষিত)</option>
          </select>
        </div>
      </div>

      {/* Download Alert Toast */}
      {downloadMsg && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl text-xs flex items-center justify-between shadow-xs transition-all animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-medium">{downloadMsg}</span>
          </div>
          <button 
            onClick={() => setDownloadMsg(null)}
            className="text-emerald-700 hover:text-emerald-950 font-bold ml-2 text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">মোট সংগৃহীত আয়</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-700 font-mono mt-3">
            ৳ {totalIncome.toLocaleString('en-US')}.০০
          </div>
          <p className="text-[11px] text-slate-400 mt-1">সদস্য চাঁদা, অনুদান ও ফরম বিক্রয়</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">মোট অনুমোদিত ব্যয়</span>
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
              <TrendingDown className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-rose-700 font-mono mt-3">
            ৳ {totalExpense.toLocaleString('en-US')}.০০
          </div>
          <p className="text-[11px] text-slate-400 mt-1">কার্যালয় ভাড়া, বেতন, সেমিনার ও প্রকাশনা</p>
        </div>

        <div className="bg-gradient-to-br from-blue-950 to-slate-900 text-white p-6 rounded-2xl border border-blue-900 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-300">বর্তমান নীট স্থিতি (Balance)</span>
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-amber-400 font-mono mt-3">
            ৳ {netBalance.toLocaleString('en-US')}.০০
          </div>
          <p className="text-[11px] text-slate-300 mt-1">ব্যাংক একাউন্ট ও ক্যাশ ইন হ্যান্ডে রক্ষিত</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs">
        <button
          onClick={() => setActiveTab('summary')}
          className={`pb-3 px-4 font-bold border-b-2 transition-colors ${
            activeTab === 'summary'
              ? 'border-blue-950 text-blue-950'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          খাতওয়ারী সারসংক্ষেপ
        </button>
        <button
          onClick={() => setActiveTab('income')}
          className={`pb-3 px-4 font-bold border-b-2 transition-colors ${
            activeTab === 'income'
              ? 'border-blue-950 text-blue-950'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          আয়ের তালিকা ও মানি রিসিট ({incomeRecords.length})
        </button>
        <button
          onClick={() => setActiveTab('expense')}
          className={`pb-3 px-4 font-bold border-b-2 transition-colors ${
            activeTab === 'expense'
              ? 'border-blue-950 text-blue-950'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          ব্যয়ের ভাউচার তালিকা ({expenseRecords.length})
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`pb-3 px-4 font-bold border-b-2 transition-colors ${
            activeTab === 'audit'
              ? 'border-blue-950 text-blue-950'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          অডিট রিপোর্ট ও নিরীক্ষা
        </button>
      </div>

      {/* Tab Content: Summary */}
      {activeTab === 'summary' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Income Heads Breakdown */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
              <span>আয়ের শীর্ষ খাতসমূহ (Income Heads)</span>
              <span className="text-xs text-emerald-600 font-semibold font-mono">মোট: ৳ {totalIncome.toLocaleString('en-US')}</span>
            </h3>
            <div className="space-y-3">
              {Object.entries(incomeByHead).map(([head, amount], idx) => {
                const percentage = ((amount / totalIncome) * 100).toFixed(1);
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-slate-700">{head}</span>
                      <span className="font-mono font-bold text-slate-900">৳ {amount.toLocaleString('en-US')} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Expense Heads Breakdown */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
              <span>ব্যয়ের শীর্ষ খাতসমূহ (Expense Heads)</span>
              <span className="text-xs text-rose-600 font-semibold font-mono">মোট: ৳ {totalExpense.toLocaleString('en-US')}</span>
            </h3>
            <div className="space-y-3">
              {Object.entries(expenseByHead).map(([head, amount], idx) => {
                const percentage = ((amount / totalExpense) * 100).toFixed(1);
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-slate-700">{head}</span>
                      <span className="font-mono font-bold text-slate-900">৳ {amount.toLocaleString('en-US')} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div className="bg-rose-500 h-full rounded-full" style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Income List */}
      {activeTab === 'income' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-xs">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-900 text-white uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">তারিখ</th>
                <th className="py-3 px-4">ভাউচার / রসিদ নং</th>
                <th className="py-3 px-4">উৎস / প্রাপ্তি</th>
                <th className="py-3 px-4">খাত (Head)</th>
                <th className="py-3 px-4">পদ্ধতি ও রেফারেন্স</th>
                <th className="py-3 px-4 text-right">পরিমাণ (টাকা)</th>
                <th className="py-3 px-4 text-center">রসিদ প্রিন্ট</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {incomeRecords.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-4 font-medium text-slate-600">{record.date}</td>
                  <td className="py-2.5 px-4 font-mono font-bold text-blue-900">{record.receiptNumber}</td>
                  <td className="py-2.5 px-4 font-semibold text-slate-800">{record.receivedFrom}</td>
                  <td className="py-2.5 px-4">
                    <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-medium text-[11px]">
                      {record.head}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-slate-500">{record.paymentMethod} ({record.reference})</td>
                  <td className="py-2.5 px-4 text-right font-mono font-bold text-emerald-700">
                    ৳ {record.amount.toLocaleString('en-US')}.০০
                  </td>
                  <td className="py-2.5 px-4 text-center">
                    <button
                      onClick={() => onOpenReceiptModal(record)}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-2.5 py-1 rounded text-[11px] inline-flex items-center gap-1 shadow-xs"
                    >
                      <Receipt className="w-3 h-3" />
                      <span>রসিদ</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab Content: Expense List */}
      {activeTab === 'expense' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-xs">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-900 text-white uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">তারিখ</th>
                <th className="py-3 px-4">ভাউচার নম্বর</th>
                <th className="py-3 px-4">প্রাপক / সুবিধাভোগী</th>
                <th className="py-3 px-4">খাত (Head)</th>
                <th className="py-3 px-4">পেমেন্ট মাধ্যম</th>
                <th className="py-3 px-4">অনুমোদনকারী</th>
                <th className="py-3 px-4 text-right">ব্যয় পরিমাণ (টাকা)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {expenseRecords.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-4 font-medium text-slate-600">{record.date}</td>
                  <td className="py-2.5 px-4 font-mono font-bold text-slate-800">{record.voucherNo}</td>
                  <td className="py-2.5 px-4 font-semibold text-slate-800">{record.paidTo}</td>
                  <td className="py-2.5 px-4">
                    <span className="bg-rose-50 text-rose-800 px-2 py-0.5 rounded font-medium text-[11px]">
                      {record.head}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-slate-500">{record.paymentMethod}</td>
                  <td className="py-2.5 px-4 text-slate-600 font-medium">{record.approvedBy}</td>
                  <td className="py-2.5 px-4 text-right font-mono font-bold text-rose-700">
                    ৳ {record.amount.toLocaleString('en-US')}.০০
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab Content: Audit Reports */}
      {activeTab === 'audit' && (
        <div className="space-y-4">
          {auditReports.map((audit, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-blue-50 text-blue-900 rounded-xl">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{audit.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">নিরীক্ষক: {audit.auditor}</p>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                    <span>তারিখ: {audit.date}</span>
                    <span>•</span>
                    <span className="text-emerald-600 font-semibold">{audit.status}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => triggerAuditDownload(audit.title)}
                className="bg-blue-950 hover:bg-slate-900 text-amber-400 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow transition-colors shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>অডিট রিপোর্ট PDF ({audit.size})</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
