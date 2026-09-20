import React, { useState, useRef } from 'react';
import { 
  Member, 
  IncomeRecord, 
  ExpenseRecord, 
  Branch 
} from '../types';
import { 
  FileText, 
  Download, 
  Printer, 
  X, 
  Filter, 
  CheckCircle2, 
  DollarSign, 
  Users, 
  Calendar, 
  Award, 
  Building2, 
  FileSpreadsheet,
  Loader2,
  Sparkles
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Logo } from './Logo';

interface ReportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: 'members' | 'finance';
  members: Member[];
  incomeRecords: IncomeRecord[];
  expenseRecords: ExpenseRecord[];
  currentRole: string;
  branches?: Branch[];
}

export const ReportExportModal: React.FC<ReportExportModalProps> = ({
  isOpen,
  onClose,
  defaultType = 'members',
  members,
  incomeRecords,
  expenseRecords,
  currentRole
}) => {
  const [reportType, setReportType] = useState<'members' | 'finance'>(defaultType);
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Filters for Members Report
  const [memberStatusFilter, setMemberStatusFilter] = useState('all');
  const [boilerClassFilter, setBoilerClassFilter] = useState('all');
  const [divisionFilter, setDivisionFilter] = useState('all');

  // Filters for Finance Report
  const [financeTypeFilter, setFinanceTypeFilter] = useState<'combined' | 'income' | 'expense'>('combined');
  const [monthFilter, setMonthFilter] = useState('all');

  // Ref to the printable letterhead container
  const reportRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  // Filtered members
  const filteredMembers = members.filter((m) => {
    const matchesStatus = memberStatusFilter === 'all' || m.status === memberStatusFilter;
    const matchesClass = boilerClassFilter === 'all' || m.boilerClass === boilerClassFilter;
    const matchesDivision = divisionFilter === 'all' || m.division === divisionFilter;
    return matchesStatus && matchesClass && matchesDivision;
  });

  // Filtered financial transactions
  const combinedTransactions = [
    ...incomeRecords.map((inc) => ({
      id: inc.id,
      date: inc.date,
      refNo: inc.receiptNumber || inc.voucherNo,
      type: 'INCOME' as const,
      head: inc.head,
      party: inc.receivedFrom,
      amount: inc.amount,
      note: inc.paymentMethod
    })),
    ...expenseRecords.map((exp) => ({
      id: exp.id,
      date: exp.date,
      refNo: exp.voucherNo,
      type: 'EXPENSE' as const,
      head: exp.head,
      party: exp.paidTo,
      amount: exp.amount,
      note: exp.approvedBy
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const filteredTransactions = combinedTransactions.filter((item) => {
    if (financeTypeFilter === 'income' && item.type !== 'INCOME') return false;
    if (financeTypeFilter === 'expense' && item.type !== 'EXPENSE') return false;
    if (monthFilter !== 'all') {
      // simple month prefix check: e.g. '2026-08' or '2026-09'
      if (!item.date.includes(monthFilter)) return false;
    }
    return true;
  });

  const totalIncomeSum = incomeRecords.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenseSum = expenseRecords.reduce((acc, curr) => acc + curr.amount, 0);
  const netBalance = totalIncomeSum - totalExpenseSum;

  const currentReportIncome = filteredTransactions
    .filter((t) => t.type === 'INCOME')
    .reduce((acc, curr) => acc + curr.amount, 0);
  const currentReportExpense = filteredTransactions
    .filter((t) => t.type === 'EXPENSE')
    .reduce((acc, curr) => acc + curr.amount, 0);

  // Generate Reference Number
  const currentDateStr = new Date().toISOString().split('T')[0];
  const refNumber = `BBOP/${reportType === 'members' ? 'MEM-DIR' : 'FIN-REP'}/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`;

  // PDF Download Action using html2canvas and jsPDF
  const handleDownloadPdf = async () => {
    if (!reportRef.current) return;
    setIsGenerating(true);
    setStatusMessage('পিডিএফ তৈরি হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...');

    try {
      // High resolution capture
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add subsequent pages if the report spans multiple pages
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const fileName = reportType === 'members'
        ? `BBOP_Member_Directory_Report_${currentDateStr}.pdf`
        : `BBOP_Financial_Audit_Report_${currentDateStr}.pdf`;

      pdf.save(fileName);
      setStatusMessage('সফলভাবে PDF ডাউনলোড সম্পন্ন হয়েছে!');
      setTimeout(() => setStatusMessage(null), 3500);
    } catch (err) {
      console.error('PDF Generation Error:', err);
      setStatusMessage('পিডিএফ তৈরিতে সমস্যা হয়েছে। অনুগ্রহ করে "প্রিন্ট" অপশন ব্যবহার করুন।');
      setTimeout(() => setStatusMessage(null), 4000);
    } finally {
      setIsGenerating(false);
    }
  };

  // Direct Print / Save as PDF handler
  const handlePrint = () => {
    window.print();
  };

  // CSV Export Handler
  const handleExportCsv = () => {
    let csvContent = '\uFEFF'; // UTF-8 BOM for Excel Bengali text support

    if (reportType === 'members') {
      csvContent += 'SL,Member ID,Name Bangla,Name English,Boiler Class,License No,Division,District,Mobile,Status\n';
      filteredMembers.forEach((m, idx) => {
        csvContent += `"${idx + 1}","${m.memberId}","${m.nameBangla}","${m.nameEnglish}","${m.boilerClass}","${m.boilerLicenseNo}","${m.division}","${m.district}","${m.mobile}","${m.status}"\n`;
      });
      downloadFile(csvContent, `BBOP_Members_${currentDateStr}.csv`, 'text/csv;charset=utf-8;');
    } else {
      csvContent += 'SL,Date,Ref / Voucher No,Type,Head,Party,Amount (BDT),Note\n';
      filteredTransactions.forEach((t, idx) => {
        csvContent += `"${idx + 1}","${t.date}","${t.refNo}","${t.type}","${t.head}","${t.party}","${t.amount}","${t.note}"\n`;
      });
      downloadFile(csvContent, `BBOP_Finance_${currentDateStr}.csv`, 'text/csv;charset=utf-8;');
    }

    setStatusMessage('CSV ফাইল ডাউনলোড সম্পন্ন হয়েছে!');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-[#00152b] text-white px-5 py-3.5 flex items-center justify-between border-b border-[#d4af37]/40 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#002b5b] border border-[#d4af37]/50 flex items-center justify-center text-[#d4af37]">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>অফিশিয়াল পিডিএফ ও এক্সেল রিপোর্ট এক্সপোর্ট</span>
                <span className="bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40 text-[10px] px-2 py-0.5 rounded font-mono font-semibold">
                  PROD READY
                </span>
              </h3>
              <p className="text-[11px] text-slate-300">
                বাংলাদেশ বয়লার পরিচারক পরিষদ • প্রশাসনিক ও অডিট রিপোর্টিং মডিউল
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Control Toolbar */}
        <div className="bg-slate-50 p-4 border-b border-slate-200 shrink-0 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Report Type Tabs */}
            <div className="flex items-center bg-slate-200 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setReportType('members')}
                className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  reportType === 'members'
                    ? 'bg-[#001f3f] text-[#d4af37] shadow-xs font-bold'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>সদস্য ডিরেক্টরি রিপোর্ট ({filteredMembers.length})</span>
              </button>

              <button
                onClick={() => setReportType('finance')}
                className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  reportType === 'finance'
                    ? 'bg-[#001f3f] text-[#d4af37] shadow-xs font-bold'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5" />
                <span>আর্থিক হিসাব ও অডিট রিপোর্ট ({filteredTransactions.length})</span>
              </button>
            </div>

            {/* Export Actions Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadPdf}
                disabled={isGenerating}
                className="bg-[#001f3f] hover:bg-[#002b5b] text-[#d4af37] border border-[#d4af37]/60 font-bold px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow transition-all disabled:opacity-50"
              >
                {isGenerating ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#d4af37]" />
                ) : (
                  <Download className="w-3.5 h-3.5 text-[#d4af37]" />
                )}
                <span>{isGenerating ? 'জেনারেট হচ্ছে...' : 'PDF ডাউনলোড'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors border border-slate-700 shadow-xs"
                title="ব্রাউজার প্রিন্টার বা সরাসরি Save as PDF এ পাঠান"
              >
                <Printer className="w-3.5 h-3.5 text-amber-400" />
                <span>প্রিন্ট / সেভ</span>
              </button>

              <button
                onClick={handleExportCsv}
                className="bg-emerald-700 hover:bg-emerald-600 text-white font-semibold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                title="Excel এবং Spreadsheet ব্যবহারের জন্য CSV ফাইল"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Excel/CSV</span>
              </button>
            </div>
          </div>

          {/* Context Filters */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-700">
            <span className="font-semibold flex items-center gap-1 text-slate-500">
              <Filter className="w-3.5 h-3.5" />
              <span>ফিল্টার:</span>
            </span>

            {reportType === 'members' ? (
              <>
                <select
                  value={memberStatusFilter}
                  onChange={(e) => setMemberStatusFilter(e.target.value)}
                  className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-900"
                >
                  <option value="all">সকল স্ট্যাটাস ({members.length})</option>
                  <option value="active">Active (সক্রিয় সদস্য)</option>
                  <option value="pending">Pending (অপেক্ষমাণ)</option>
                  <option value="inactive">Inactive</option>
                </select>

                <select
                  value={boilerClassFilter}
                  onChange={(e) => setBoilerClassFilter(e.target.value)}
                  className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-900"
                >
                  <option value="all">সকল বয়লার ক্লাস</option>
                  <option value="১ম শ্রেণি (First Class)">১ম শ্রেণি (First Class)</option>
                  <option value="২য় শ্রেণি (Second Class)">২য় শ্রেণি (Second Class)</option>
                  <option value="৩য় শ্রেণি (Third Class)">৩য় শ্রেণি (Third Class)</option>
                </select>

                <select
                  value={divisionFilter}
                  onChange={(e) => setDivisionFilter(e.target.value)}
                  className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-900"
                >
                  <option value="all">সকল বিভাগ</option>
                  <option value="ঢাকা">ঢাকা</option>
                  <option value="চট্টগ্রাম">চট্টগ্রাম</option>
                  <option value="রাজশাহী">রাজশাহী</option>
                  <option value="খুলনা">খুলনা</option>
                  <option value="সিলেট">সিলেট</option>
                  <option value="বরিশাল">বরিশাল</option>
                  <option value="রংপুর">রংপুর</option>
                  <option value="ময়মনসিংহ">ময়মনসিংহ</option>
                </select>
              </>
            ) : (
              <>
                <select
                  value={financeTypeFilter}
                  onChange={(e) => setFinanceTypeFilter(e.target.value as any)}
                  className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-900"
                >
                  <option value="combined">আয় ও ব্যয় যৌথ লেজার (Combined)</option>
                  <option value="income">শুধুমাত্র আয় ও চাঁদা (Income)</option>
                  <option value="expense">শুধুমাত্র ব্যয় ও ভাউচার (Expense)</option>
                </select>

                <select
                  value={monthFilter}
                  onChange={(e) => setMonthFilter(e.target.value)}
                  className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-900"
                >
                  <option value="all">সমগ্র অর্থবছর (All Periods)</option>
                  <option value="2026-09">সেপ্টেম্বর ২০২৬</option>
                  <option value="2026-08">আগস্ট ২০২৬</option>
                  <option value="2026-07">জুলাই ২০২৬</option>
                  <option value="2026-06">জুন ২০২৬</option>
                </select>
              </>
            )}

            {statusMessage && (
              <span className="ml-auto text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{statusMessage}</span>
              </span>
            )}
          </div>
        </div>

        {/* Report Preview Body (Scrollable in modal, clean A4 styling) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-200/70">
          {/* Printable Sheet Container */}
          <div
            ref={reportRef}
            id="official-pdf-report-sheet"
            className="bg-white mx-auto max-w-[800px] w-full p-8 rounded-lg shadow-md border border-slate-300 text-slate-900 space-y-6"
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            {/* 1. Official Letterhead */}
            <div className="border-b-2 border-[#001f3f] pb-4">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
                <div className="shrink-0">
                  <Logo size="lg" className="w-16 h-16 sm:w-20 sm:h-20" />
                </div>
                <div className="space-y-1 text-center sm:text-left">
                  <div className="inline-block bg-slate-100 text-slate-700 text-[10px] font-bold px-3 py-0.5 rounded-full border border-slate-300 uppercase tracking-wider mb-1">
                    অরাজনৈতিক পেশাজীবী সংগঠন • নিবন্ধন নং: বিওপি/২০১৬/৮৮
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#001f3f] tracking-tight">
                    বাংলাদেশ বয়লার পরিচারক পরিষদ
                  </h1>
                  <p className="text-xs uppercase tracking-widest text-[#d4af37] font-bold">
                    Bangladesh Boiler Operators Parishad
                  </p>
                  <p className="text-[11px] text-slate-500 pt-0.5">
                    কেন্দ্রীয় কার্যালয়: প্লট-২৪, ব্লক-বি (৩য় তলা), তেজগাঁও শিল্প এলাকা, ঢাকা-১২০৮ | ফোন: ০২-৯৯৭৭৮৮, ০১৭১১-২৩৪৫৬৭
                  </p>
                </div>
              </div>

              {/* Reference & Generation Info Banner */}
              <div className="mt-4 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-600 bg-slate-50 p-2.5 rounded-md">
                <div>
                  <span className="font-bold text-slate-800">স্মারক নং: </span>
                  <span className="font-mono text-blue-900 font-semibold">{refNumber}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-800">প্রতিবেদনের বিষয়: </span>
                  <span className="font-semibold text-slate-900">
                    {reportType === 'members' ? 'সদস্য পরিচিতি ও ডাটাবেজ প্রতিবেদন' : 'আর্থিক হিসাব ও নিরীক্ষা প্রতিবেদন'}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-slate-800">তারিখ: </span>
                  <span className="font-mono text-slate-700">{currentDateStr}</span>
                </div>
              </div>
            </div>

            {/* 2. Report Overview Summary Cards */}
            {reportType === 'members' ? (
              <div className="grid grid-cols-4 gap-3 text-xs">
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-center">
                  <span className="text-[10px] text-slate-500 block">মোট অন্তর্ভুক্ত সদস্য</span>
                  <span className="font-mono font-bold text-base text-slate-900">{filteredMembers.length} জন</span>
                </div>
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded text-center">
                  <span className="text-[10px] text-emerald-700 block">সক্রিয় সদস্য (Active)</span>
                  <span className="font-mono font-bold text-base text-emerald-800">
                    {filteredMembers.filter((m) => m.status === 'active').length} জন
                  </span>
                </div>
                <div className="p-2.5 bg-amber-50 border border-amber-200 rounded text-center">
                  <span className="text-[10px] text-amber-700 block">অপেক্ষমাণ আবেদন (Pending)</span>
                  <span className="font-mono font-bold text-base text-amber-800">
                    {filteredMembers.filter((m) => m.status === 'pending').length} জন
                  </span>
                </div>
                <div className="p-2.5 bg-blue-50 border border-blue-200 rounded text-center">
                  <span className="text-[10px] text-blue-700 block">১ম শ্রেণির অপারেটর</span>
                  <span className="font-mono font-bold text-base text-blue-900">
                    {filteredMembers.filter((m) => m.boilerClass.includes('১ম')).length} জন
                  </span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded">
                  <span className="text-[11px] text-emerald-700 block">মোট জমা / আয় (Inflow)</span>
                  <span className="font-mono font-bold text-base text-emerald-800">
                    ৳ {currentReportIncome.toLocaleString('en-US')}.০০
                  </span>
                </div>
                <div className="p-3 bg-rose-50 border border-rose-200 rounded">
                  <span className="text-[11px] text-rose-700 block">মোট ব্যয় ও খরচ (Outflow)</span>
                  <span className="font-mono font-bold text-base text-rose-800">
                    ৳ {currentReportExpense.toLocaleString('en-US')}.০০
                  </span>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                  <span className="text-[11px] text-blue-700 block">নেট ব্যালেন্স স্থিতি (Balance)</span>
                  <span className="font-mono font-bold text-base text-blue-900">
                    ৳ {(currentReportIncome - currentReportExpense).toLocaleString('en-US')}.০০
                  </span>
                </div>
              </div>
            )}

            {/* 3. Data Tables */}
            {reportType === 'members' ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-300">
                  <thead className="bg-[#00152b] text-white text-[10px] uppercase">
                    <tr>
                      <th className="p-2 border border-slate-400 w-10 text-center">ক্রমিক</th>
                      <th className="p-2 border border-slate-400">সদস্য আইডি</th>
                      <th className="p-2 border border-slate-400">নাম ও কর্মস্থল</th>
                      <th className="p-2 border border-slate-400">শ্রেণি ও লাইসেন্স নং</th>
                      <th className="p-2 border border-slate-400">জেলা</th>
                      <th className="p-2 border border-slate-400">মোবাইল</th>
                      <th className="p-2 border border-slate-400 text-center">স্ট্যাটাস</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-[11px]">
                    {filteredMembers.map((m, idx) => (
                      <tr key={m.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="p-2 border border-slate-300 text-center font-mono">{idx + 1}</td>
                        <td className="p-2 border border-slate-300 font-mono font-bold text-blue-900">{m.memberId}</td>
                        <td className="p-2 border border-slate-300">
                          <div className="font-bold text-slate-900">{m.nameBangla}</div>
                          <div className="text-[10px] text-slate-500 truncate max-w-[150px]">{m.workplace}</div>
                        </td>
                        <td className="p-2 border border-slate-300">
                          <div>{m.boilerClass}</div>
                          <div className="text-[10px] text-slate-500 font-mono">লাইসেন্স: {m.boilerLicenseNo}</div>
                        </td>
                        <td className="p-2 border border-slate-300">{m.district}</td>
                        <td className="p-2 border border-slate-300 font-mono">{m.mobile}</td>
                        <td className="p-2 border border-slate-300 text-center">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            m.status === 'active' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : m.status === 'pending'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-200 text-slate-700'
                          }`}>
                            {m.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-300">
                  <thead className="bg-[#00152b] text-white text-[10px] uppercase">
                    <tr>
                      <th className="p-2 border border-slate-400 w-10 text-center">ক্রমিক</th>
                      <th className="p-2 border border-slate-400">তারিখ</th>
                      <th className="p-2 border border-slate-400">ভাউচার / রসিদ নং</th>
                      <th className="p-2 border border-slate-400">খাত ও বিবরণ</th>
                      <th className="p-2 border border-slate-400">প্রাপক / প্রদানকারী</th>
                      <th className="p-2 border border-slate-400 text-center">ধরণ</th>
                      <th className="p-2 border border-slate-400 text-right">পরিমাণ (টাকা)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-[11px]">
                    {filteredTransactions.map((t, idx) => (
                      <tr key={t.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="p-2 border border-slate-300 text-center font-mono">{idx + 1}</td>
                        <td className="p-2 border border-slate-300 font-mono">{t.date}</td>
                        <td className="p-2 border border-slate-300 font-mono font-bold text-slate-800">{t.refNo}</td>
                        <td className="p-2 border border-slate-300">
                          <div className="font-bold text-slate-900">{t.head}</div>
                          <div className="text-[10px] text-slate-500">{t.note}</div>
                        </td>
                        <td className="p-2 border border-slate-300 font-medium">{t.party}</td>
                        <td className="p-2 border border-slate-300 text-center">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            t.type === 'INCOME' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {t.type === 'INCOME' ? 'আয় (CREDIT)' : 'ব্যয় (DEBIT)'}
                          </span>
                        </td>
                        <td className={`p-2 border border-slate-300 text-right font-mono font-bold ${
                          t.type === 'INCOME' ? 'text-emerald-700' : 'text-rose-700'
                        }`}>
                          ৳ {t.amount.toLocaleString('en-US')}.০০
                        </td>
                      </tr>
                    ))}
                    {/* Totals Row */}
                    <tr className="bg-slate-100 font-bold border-t-2 border-slate-400 text-xs">
                      <td colSpan={6} className="p-2.5 text-right text-slate-800">
                        নির্বাচিত রেকর্ডের মোট ব্যালেন্স:
                      </td>
                      <td className="p-2.5 text-right font-mono text-[#001f3f]">
                        ৳ {(currentReportIncome - currentReportExpense).toLocaleString('en-US')}.০০
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* 4. Official Certification Statement */}
            <div className="bg-slate-50 p-3 rounded border border-slate-200 text-xs text-slate-700 space-y-1">
              <p className="font-bold text-slate-900">সনদ ও প্রত্যয়ন (Official Certification):</p>
              <p className="text-[11px] leading-relaxed text-slate-600">
                এই মর্মে প্রত্যয়ন করা যাচ্ছে যে, উপরোল্লিখিত সকল তথ্য বাংলাদেশ বয়লার পরিচারক পরিষদের সেন্ট্রাল ম্যানেজমেন্ট ডাটাবেজ এবং নিরীক্ষিত অভ্যন্তরীণ হিসাব বই হতে সংগৃহীত। এটি পরিষদের সাধারণ সভা ও প্রশাসনিক নথিপত্রে উপস্থাপনের জন্য একটি স্বীকৃত অনুলিপি।
              </p>
            </div>

            {/* 5. Signatories & Official Seal Footer */}
            <div className="pt-10 grid grid-cols-3 gap-6 text-center text-xs">
              <div className="space-y-1">
                <div className="border-t border-slate-400 pt-1 font-bold text-slate-900">
                  মোঃ রফিকুল ইসলাম
                </div>
                <div className="text-[11px] text-slate-500">সভাপতি</div>
                <div className="text-[10px] text-slate-400">বাংলাদেশ বয়লার পরিচারক পরিষদ</div>
              </div>

              <div className="space-y-1">
                <div className="border-t border-slate-400 pt-1 font-bold text-slate-900">
                  ইঞ্জি. দেলোয়ার হোসেন
                </div>
                <div className="text-[11px] text-slate-500">সাধারণ সম্পাদক</div>
                <div className="text-[10px] text-slate-400">বাংলাদেশ বয়লার পরিচারক পরিষদ</div>
              </div>

              <div className="space-y-1">
                <div className="border-t border-slate-400 pt-1 font-bold text-slate-900">
                  মোস্তফা কামাল
                </div>
                <div className="text-[11px] text-slate-500">অর্থ সম্পাদক / কোষাধ্যক্ষ</div>
                <div className="text-[10px] text-slate-400">অর্থ ও নিরীক্ষা কমিটি</div>
              </div>
            </div>

            {/* Verification Security Footer */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400">
              <span>জেনারেটকারী রোল: {currentRole}</span>
              <span>বাংলাদেশ বয়লার পরিচারক পরিষদ • তেজগাঁও, ঢাকা</span>
              <span>পাতা ১ / ১</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 px-5 py-3 border-t border-slate-200 flex items-center justify-between text-xs shrink-0">
          <span className="text-slate-500">
            * পিডিএফ ফরম্যাটে প্রিন্ট বা ডাউনলোড করার পর কোনো সফটওয়্যার ছাড়াই যেকোনো ডিভাইসে দেখা যাবে।
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-300 hover:bg-slate-400 text-slate-800 rounded-lg font-semibold transition-colors"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
