import React, { useState } from 'react';
import { 
  Member, 
  Notice, 
  NewsItem, 
  IncomeRecord, 
  ExpenseRecord, 
  Branch, 
  AuditLog 
} from '../types';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  DollarSign, 
  Building2, 
  ShieldCheck, 
  History, 
  Plus, 
  Trash2, 
  Check, 
  X, 
  IdCard, 
  Receipt, 
  Search, 
  Filter, 
  Download, 
  Printer, 
  AlertCircle, 
  CheckCircle2,
  Lock,
  Calendar,
  LogOut,
  ExternalLink
} from 'lucide-react';
import { ReportExportModal } from '../components/ReportExportModal';

interface AdminDashboardViewProps {
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  notices: Notice[];
  setNotices: React.Dispatch<React.SetStateAction<Notice[]>>;
  incomeRecords: IncomeRecord[];
  setIncomeRecords: React.Dispatch<React.SetStateAction<IncomeRecord[]>>;
  expenseRecords: ExpenseRecord[];
  setExpenseRecords: React.Dispatch<React.SetStateAction<ExpenseRecord[]>>;
  auditLogs: AuditLog[];
  setAuditLogs: React.Dispatch<React.SetStateAction<AuditLog[]>>;
  branches: Branch[];
  onOpenCardModal: (member: Member) => void;
  onOpenReceiptModal: (record: IncomeRecord) => void;
  onExitAdmin: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  members,
  setMembers,
  notices,
  setNotices,
  incomeRecords,
  setIncomeRecords,
  expenseRecords,
  setExpenseRecords,
  auditLogs,
  setAuditLogs,
  branches,
  onOpenCardModal,
  onOpenReceiptModal,
  onExitAdmin
}) => {
  const [activeMenu, setActiveMenu] = useState<
    'overview' | 'members' | 'notices' | 'income' | 'expense' | 'cashbook' | 'roles' | 'audit'
  >('overview');

  const [currentRole, setCurrentRole] = useState('Super Admin');

  // Stats
  const totalMembers = members.length;
  const pendingMembers = members.filter((m) => m.status === 'pending');
  const activeMembers = members.filter((m) => m.status === 'active');
  const totalIncome = incomeRecords.reduce((sum, r) => sum + r.amount, 0);
  const totalExpense = expenseRecords.reduce((sum, r) => sum + r.amount, 0);
  const currentCashBalance = totalIncome - totalExpense;

  // New Notice Form State
  const [showAddNoticeModal, setShowAddNoticeModal] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: '',
    description: '',
    category: 'জরুরি',
    isUrgent: false,
    attachmentName: 'notice-official.pdf'
  });

  // New Income Form State
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [newIncome, setNewIncome] = useState({
    head: 'সদস্য মাসিক চাঁদা',
    amount: 1000,
    receivedFrom: '',
    paymentMethod: 'bKash',
    reference: 'TRX-',
    notes: 'অফিসিয়াল প্রাপ্তি'
  });

  // New Expense Form State
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [newExpense, setNewExpense] = useState({
    head: 'অফিস ভাড়া ও ইউটিলিটি',
    amount: 25000,
    paidTo: '',
    paymentMethod: 'Bank Transfer',
    approvedBy: 'সভাপতি ও অর্থ সম্পাদক',
    notes: 'মাসিক বিল পরিশোধ'
  });

  // Search in member table
  const [memberSearch, setMemberSearch] = useState('');
  const [memberFilterStatus, setMemberFilterStatus] = useState('all');
  const [adminToast, setAdminToast] = useState<string | null>(null);

  // PDF and Audit Report Export Modal State
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportModalType, setReportModalType] = useState<'members' | 'finance'>('members');

  const openReportModal = (type: 'members' | 'finance') => {
    setReportModalType(type);
    setShowReportModal(true);
  };

  const showToast = (msg: string) => {
    setAdminToast(msg);
    setTimeout(() => setAdminToast(null), 3500);
  };

  // Member Approval Action
  const handleApproveMember = (id: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: 'active' } : m))
    );

    const log: AuditLog = {
      id: `log-${Date.now()}`,
      userId: 'usr-admin-1',
      userName: 'মোঃ রফিকুল ইসলাম (Super Admin)',
      userRole: currentRole,
      action: 'APPROVE',
      module: 'MEMBER_MANAGEMENT',
      details: `সদস্য আইডি ${id} সক্রিয় অনুমোদন করা হয়েছে।`,
      ipAddress: '103.145.112.54',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19)
    };
    setAuditLogs((prev) => [log, ...prev]);
    showToast('সদস্যপদ সফলভাবে অনুমোদিত হয়েছে ও স্ট্যাটাস Active করা হয়েছে!');
  };

  const handleRejectMember = (id: string) => {
    if (!confirm('আপনি কি নিশ্চিত যে এই আবেদনটি বাতিল করতে চান?')) return;
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: 'inactive' } : m))
    );
  };

  const handleDeleteMember = (id: string) => {
    if (!confirm('সদস্য রেকর্ডটি ডিলিট করতে চান?')) return;
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  // Notice Actions
  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    const noticeObj: Notice = {
      id: `notice-${Date.now()}`,
      title: newNotice.title,
      description: newNotice.description,
      category: newNotice.category,
      publishDate: new Date().toISOString().slice(0, 10),
      publishedBy: 'কেন্দ্রীয় দপ্তর সম্পাদক',
      isUrgent: newNotice.isUrgent,
      attachmentUrl: '#',
      attachmentName: newNotice.attachmentName
    };

    setNotices((prev) => [noticeObj, ...prev]);
    setShowAddNoticeModal(false);
    setNewNotice({
      title: '',
      description: '',
      category: 'জরুরি',
      isUrgent: false,
      attachmentName: 'notice-official.pdf'
    });

    const log: AuditLog = {
      id: `log-${Date.now()}`,
      userId: 'usr-admin-1',
      userName: 'মোঃ রফিকুল ইসলাম (Super Admin)',
      userRole: currentRole,
      action: 'CREATE',
      module: 'NOTICES',
      details: `নতুন নোটিশ প্রকাশিত: "${noticeObj.title}"`,
      ipAddress: '103.145.112.54',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19)
    };
    setAuditLogs((prev) => [log, ...prev]);
  };

  const handleDeleteNotice = (id: string) => {
    if (!confirm('নোটিশটি অপসারণ করতে চান?')) return;
    setNotices((prev) => prev.filter((n) => n.id !== id));
  };

  // Income Actions
  const handleCreateIncome = (e: React.FormEvent) => {
    e.preventDefault();
    const receiptNo = `MR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const voucherNo = `V-INC-${Math.floor(100 + Math.random() * 900)}`;

    const incObj: IncomeRecord = {
      id: `inc-${Date.now()}`,
      head: newIncome.head,
      amount: Number(newIncome.amount),
      date: new Date().toISOString().slice(0, 10),
      receivedFrom: newIncome.receivedFrom,
      paymentMethod: newIncome.paymentMethod,
      reference: newIncome.reference,
      voucherNo: voucherNo,
      receiptNumber: receiptNo,
      notes: newIncome.notes,
      createdBy: 'অর্থ সম্পাদক'
    };

    setIncomeRecords((prev) => [incObj, ...prev]);
    setShowAddIncomeModal(false);
    setNewIncome({
      head: 'সদস্য মাসিক চাঁদা',
      amount: 1000,
      receivedFrom: '',
      paymentMethod: 'bKash',
      reference: 'TRX-',
      notes: 'অফিসিয়াল প্রাপ্তি'
    });

    const log: AuditLog = {
      id: `log-${Date.now()}`,
      userId: 'usr-admin-1',
      userName: 'মোঃ রফিকুল ইসলাম (Super Admin)',
      userRole: currentRole,
      action: 'CREATE',
      module: 'FINANCE_INCOME',
      details: `নতুন আয় এন্ট্রি: ৳ ${incObj.amount} (${incObj.head}) - রসিদ: ${receiptNo}`,
      ipAddress: '103.145.112.54',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19)
    };
    setAuditLogs((prev) => [log, ...prev]);
  };

  // Expense Actions
  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const voucherNo = `V-EXP-${Math.floor(100 + Math.random() * 900)}`;

    const expObj: ExpenseRecord = {
      id: `exp-${Date.now()}`,
      head: newExpense.head,
      amount: Number(newExpense.amount),
      date: new Date().toISOString().slice(0, 10),
      paidTo: newExpense.paidTo,
      paymentMethod: newExpense.paymentMethod,
      voucherNo: voucherNo,
      approvedBy: newExpense.approvedBy,
      notes: newExpense.notes,
      createdBy: 'হিসাব কর্মকর্তা'
    };

    setExpenseRecords((prev) => [expObj, ...prev]);
    setShowAddExpenseModal(false);
    setNewExpense({
      head: 'অফিস ভাড়া ও ইউটিলিটি',
      amount: 25000,
      paidTo: '',
      paymentMethod: 'Bank Transfer',
      approvedBy: 'সভাপতি ও অর্থ সম্পাদক',
      notes: 'মাসিক বিল পরিশোধ'
    });

    const log: AuditLog = {
      id: `log-${Date.now()}`,
      userId: 'usr-admin-1',
      userName: 'মোঃ রফিকুল ইসলাম (Super Admin)',
      userRole: currentRole,
      action: 'CREATE',
      module: 'FINANCE_EXPENSE',
      details: `নতুন ব্যয় এন্ট্রি: ৳ ${expObj.amount} (${expObj.head}) - ভাউচার: ${voucherNo}`,
      ipAddress: '103.145.112.54',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19)
    };
    setAuditLogs((prev) => [log, ...prev]);
  };

  // Filtered members in table
  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      !memberSearch ||
      m.nameBangla.toLowerCase().includes(memberSearch.toLowerCase()) ||
      m.memberId.toLowerCase().includes(memberSearch.toLowerCase()) ||
      m.district.toLowerCase().includes(memberSearch.toLowerCase()) ||
      m.mobile.includes(memberSearch);

    const matchesStatus = memberFilterStatus === 'all' || m.status === memberFilterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Admin Navigation - High Density Theme */}
      <div className="bg-[#001f3f] text-white px-6 py-2.5 border-b-2 border-[#d4af37] flex items-center justify-between flex-wrap gap-4 sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#d4af37] text-[#001f3f] flex items-center justify-center font-bold shadow-sm">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-white leading-tight">
              বাংলাদেশ বয়লার পরিচারক পরিষদ — সেন্ট্রাল অ্যাডমিন
            </h2>
            <div className="flex items-center gap-2 text-[11px] text-slate-300">
              <span>ব্যবহারকারী: <strong className="text-[#d4af37] font-mono">admin_central</strong></span>
              <span>•</span>
              <span className="bg-[#002b5b] text-[#d4af37] border border-[#d4af37]/30 px-1.5 py-0.2 rounded text-[10px] font-bold">
                {currentRole}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Role Switcher (Simulated) */}
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <span>রোল নির্বাচন:</span>
            <select
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value)}
              className="bg-[#00152b] border border-slate-700 rounded p-1 text-xs text-[#d4af37] font-semibold focus:outline-none"
            >
              <option value="Super Admin">Super Admin (সর্বোচ্চ)</option>
              <option value="Administrator">Administrator</option>
              <option value="Accounts Officer">Accounts Officer (হিসাব)</option>
              <option value="Member Manager">Member Manager (সদস্য)</option>
              <option value="Editor">Editor (কনটেন্ট)</option>
              <option value="Branch Admin">Branch Admin (শাখা)</option>
              <option value="Viewer">Viewer (শুধুমাত্র দর্শন)</option>
            </select>
          </div>

          <button
            onClick={() => openReportModal('members')}
            className="bg-[#002b5b] hover:bg-[#003875] text-[#d4af37] border border-[#d4af37]/40 px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            title="সদস্য ও আর্থিক অডিট পিডিএফ রিপোর্ট জেনারেট করুন"
          >
            <Download className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="hidden sm:inline">PDF রিপোর্ট এক্সপোর্ট</span>
            <span className="sm:hidden">PDF</span>
          </button>

          <button
            onClick={onExitAdmin}
            className="bg-[#00152b] hover:bg-[#002b5b] text-slate-200 px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-400" />
            <span>পাবলিক ওয়েবসাইটে ফিরুন</span>
          </button>
        </div>
      </div>

      {/* Admin Toast Alert */}
      {adminToast && (
        <div className="bg-emerald-600 text-white px-6 py-2.5 text-xs font-semibold flex items-center justify-between shadow-md transition-all">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />
            <span>{adminToast}</span>
          </div>
          <button onClick={() => setAdminToast(null)} className="text-white hover:text-emerald-200 font-bold ml-4">
            ✕
          </button>
        </div>
      )}

      {/* Main Admin Workspace Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col md:flex-row gap-6">
        {/* Left Sidebar Menu - High Density Theme */}
        <div className="w-full md:w-64 shrink-0 bg-[#00152b] text-slate-300 rounded-lg border border-slate-800 p-2.5 space-y-1 shadow-sm h-fit sticky top-16">
          <div className="px-2.5 py-1.5 text-[10px] font-bold text-[#d4af37] uppercase tracking-wider">
            ড্যাশবোর্ড মডিউল
          </div>

          <button
            onClick={() => setActiveMenu('overview')}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded text-xs font-semibold transition-colors ${
              activeMenu === 'overview'
                ? 'bg-[#002b5b] text-white'
                : 'text-slate-300 hover:bg-[#002b5b]/60 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4 text-[#d4af37]" />
              <span>ওভারভিউ সামারি</span>
            </div>
            {activeMenu === 'overview' && <span className="w-2 h-2 rounded-full bg-[#d4af37]" />}
          </button>

          <button
            onClick={() => setActiveMenu('members')}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded text-xs font-semibold transition-colors ${
              activeMenu === 'members'
                ? 'bg-[#002b5b] text-white'
                : 'text-slate-300 hover:bg-[#002b5b]/60 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#d4af37]" />
              <span>সদস্য ব্যবস্থাপনা</span>
            </div>
            <div className="flex items-center gap-1.5">
              {pendingMembers.length > 0 && (
                <span className="bg-[#d4af37] text-[#001f3f] text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {pendingMembers.length}
                </span>
              )}
              {activeMenu === 'members' && <span className="w-2 h-2 rounded-full bg-[#d4af37]" />}
            </div>
          </button>

          <button
            onClick={() => setActiveMenu('notices')}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded text-xs font-semibold transition-colors ${
              activeMenu === 'notices'
                ? 'bg-[#002b5b] text-white'
                : 'text-slate-300 hover:bg-[#002b5b]/60 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#d4af37]" />
              <span>নোটিশ ও পরিপত্র</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 text-[11px]">{notices.length}</span>
              {activeMenu === 'notices' && <span className="w-2 h-2 rounded-full bg-[#d4af37]" />}
            </div>
          </button>

          <div className="px-2.5 pt-3 pb-1 text-[10px] font-bold text-[#d4af37] uppercase tracking-wider border-t border-slate-800/80 mt-2">
            অর্থ ও হিসাব ব্যবস্থাপনা
          </div>

          <button
            onClick={() => setActiveMenu('income')}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded text-xs font-semibold transition-colors ${
              activeMenu === 'income'
                ? 'bg-[#002b5b] text-white'
                : 'text-slate-300 hover:bg-[#002b5b]/60 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>আয় ও মানি রসিদ</span>
            </div>
            {activeMenu === 'income' && <span className="w-2 h-2 rounded-full bg-[#d4af37]" />}
          </button>

          <button
            onClick={() => setActiveMenu('expense')}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded text-xs font-semibold transition-colors ${
              activeMenu === 'expense'
                ? 'bg-[#002b5b] text-white'
                : 'text-slate-300 hover:bg-[#002b5b]/60 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-rose-400" />
              <span>ব্যয় ও ভাউচার এন্ট্রি</span>
            </div>
            {activeMenu === 'expense' && <span className="w-2 h-2 rounded-full bg-[#d4af37]" />}
          </button>

          <button
            onClick={() => setActiveMenu('cashbook')}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded text-xs font-semibold transition-colors ${
              activeMenu === 'cashbook'
                ? 'bg-[#002b5b] text-white'
                : 'text-slate-300 hover:bg-[#002b5b]/60 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <Receipt className="w-4 h-4 text-amber-400" />
              <span>ক্যাশ বুক ও লেজার</span>
            </div>
            {activeMenu === 'cashbook' && <span className="w-2 h-2 rounded-full bg-[#d4af37]" />}
          </button>

          <div className="px-2.5 pt-3 pb-1 text-[10px] font-bold text-[#d4af37] uppercase tracking-wider border-t border-slate-800/80 mt-2">
            নিরাপত্তা ও প্রশাসন
          </div>

          <button
            onClick={() => setActiveMenu('roles')}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded text-xs font-semibold transition-colors ${
              activeMenu === 'roles'
                ? 'bg-[#002b5b] text-white'
                : 'text-slate-300 hover:bg-[#002b5b]/60 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>ইউজার রোল ও পারমিশন</span>
            </div>
            {activeMenu === 'roles' && <span className="w-2 h-2 rounded-full bg-[#d4af37]" />}
          </button>

          <button
            onClick={() => setActiveMenu('audit')}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded text-xs font-semibold transition-colors ${
              activeMenu === 'audit'
                ? 'bg-[#002b5b] text-white'
                : 'text-slate-300 hover:bg-[#002b5b]/60 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-purple-400" />
              <span>অডিট ট্রেইল লগ</span>
            </div>
            {activeMenu === 'audit' && <span className="w-2 h-2 rounded-full bg-[#d4af37]" />}
          </button>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 space-y-6">
          {/* 1. OVERVIEW MENU */}
          {activeMenu === 'overview' && (
            <div className="space-y-6">
              {/* Stat Cards - High Density border-l-4 design */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border border-slate-200 border-l-4 border-[#001f3f] shadow-xs">
                  <span className="text-xs text-slate-500 font-semibold">মোট নিবন্ধিত সদস্য</span>
                  <div className="text-2xl font-bold text-[#001f3f] font-mono mt-1">{totalMembers} জন</div>
                  <span className="text-[10px] text-emerald-600 font-semibold">{activeMembers.length} জন সক্রিয়</span>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200 border-l-4 border-amber-500 shadow-xs">
                  <span className="text-xs text-slate-500 font-semibold">অনুমোদন অপেক্ষমাণ আবেদন</span>
                  <div className="text-2xl font-bold text-amber-600 font-mono mt-1">{pendingMembers.length} টি</div>
                  <span className="text-[10px] text-amber-700">অনলাইন পোর্টাল হতে জমা</span>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200 border-l-4 border-emerald-500 shadow-xs">
                  <span className="text-xs text-slate-500 font-semibold">মোট সংগৃহীত আয়</span>
                  <div className="text-2xl font-bold text-emerald-700 font-mono mt-1">
                    ৳ {totalIncome.toLocaleString('en-US')}
                  </div>
                  <span className="text-[10px] text-slate-400">{incomeRecords.length} টি ভাউচার রসিদ</span>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200 border-l-4 border-[#d4af37] shadow-xs">
                  <span className="text-xs text-slate-500 font-semibold">বর্তমান নগদ ও ব্যাংক তহবিল</span>
                  <div className="text-2xl font-bold text-[#001f3f] font-mono mt-1">
                    ৳ {currentCashBalance.toLocaleString('en-US')}
                  </div>
                  <span className="text-[10px] text-emerald-600 font-semibold">সম্পূর্ণ ব্যালেন্স মিলকৃত</span>
                </div>
              </div>

              {/* Pending Approvals quick table */}
              {pendingMembers.length > 0 && (
                <div className="bg-white rounded-2xl border border-amber-300 p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span>অনুমোদনের অপেক্ষায় থাকা নতুন আবেদন ({pendingMembers.length})</span>
                    </div>
                    <button
                      onClick={() => {
                        setActiveMenu('members');
                        setMemberFilterStatus('pending');
                      }}
                      className="text-xs text-blue-900 font-bold hover:underline"
                    >
                      সবগুলো দেখুন
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100 text-xs">
                    {pendingMembers.slice(0, 3).map((m) => (
                      <div key={m.id} className="py-2.5 flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-3">
                          <img
                            src={m.photoUrl}
                            alt={m.nameBangla}
                            className="w-8 h-10 rounded-md object-cover border border-slate-200"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <div className="font-bold text-slate-900">{m.nameBangla}</div>
                            <div className="text-[10px] text-slate-500">
                              ক্লাস: {m.boilerClass} • জেলা: {m.district} • মোবাইল: {m.mobile}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleApproveMember(m.id)}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>অনুমোদন দিন</span>
                          </button>
                          <button
                            onClick={() => handleRejectMember(m.id)}
                            className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-2.5 py-1 rounded-lg text-xs"
                          >
                            বাতিল
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => setShowAddNoticeModal(true)}
                  className="p-4 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-2xl text-left transition-all group flex items-center justify-between shadow-xs"
                >
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-950">নতুন নোটিশ তৈরি</h4>
                    <p className="text-xs text-slate-500 mt-0.5">জরুরি বা সাধারণ পরিপত্র</p>
                  </div>
                  <Plus className="w-5 h-5 text-blue-900" />
                </button>

                <button
                  onClick={() => setShowAddIncomeModal(true)}
                  className="p-4 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-2xl text-left transition-all group flex items-center justify-between shadow-xs"
                >
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 group-hover:text-emerald-950">আয় বা চাঁদা এন্ট্রি</h4>
                    <p className="text-xs text-slate-500 mt-0.5">রসিদ জেনারেট ও ফি গ্রহণ</p>
                  </div>
                  <Plus className="w-5 h-5 text-emerald-600" />
                </button>

                <button
                  onClick={() => setShowAddExpenseModal(true)}
                  className="p-4 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-300 rounded-2xl text-left transition-all group flex items-center justify-between shadow-xs"
                >
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 group-hover:text-rose-950">ব্যয় ভাউচার এন্ট্রি</h4>
                    <p className="text-xs text-slate-500 mt-0.5">বিল ও সেমিনার খরচ ভাউচার</p>
                  </div>
                  <Plus className="w-5 h-5 text-rose-600" />
                </button>

                <button
                  onClick={() => openReportModal('members')}
                  className="p-4 bg-gradient-to-br from-[#00152b] to-[#002b5b] hover:from-[#001f3f] hover:to-[#003875] border border-[#d4af37]/40 text-white rounded-2xl text-left transition-all group flex items-center justify-between shadow-md hover:shadow-lg"
                >
                  <div>
                    <span className="text-[10px] font-bold text-[#d4af37] uppercase tracking-wider block">অফিসিয়াল রিপোর্টিং</span>
                    <h4 className="font-bold text-sm text-white group-hover:text-[#d4af37] transition-colors">পিডিএফ রিপোর্ট এক্সপোর্ট</h4>
                    <p className="text-xs text-slate-300 mt-0.5">সদস্য ডিরেক্টরি ও অডিট হিসাব</p>
                  </div>
                  <Download className="w-5 h-5 text-[#d4af37] group-hover:scale-110 transition-transform" />
                </button>
              </div>

              {/* Recent Audit Activity */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">সাম্প্রতিক প্রশাসনিক কর্মকাণ্ড (Audit Logs)</h4>
                  <button onClick={() => setActiveMenu('audit')} className="text-xs text-blue-900 font-bold hover:underline">
                    সম্পূর্ণ লগ
                  </button>
                </div>
                <div className="space-y-2 text-xs text-slate-600">
                  {auditLogs.slice(0, 4).map((log) => (
                    <div key={log.id} className="p-2.5 bg-slate-50 rounded-xl flex items-center justify-between gap-4">
                      <div>
                        <span className="font-semibold text-slate-800">{log.userName}: </span>
                        <span className="text-slate-600">{log.details}</span>
                      </div>
                      <span className="font-mono text-[10px] text-slate-400 shrink-0">{log.createdAt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. MEMBERS MANAGEMENT MENU */}
          {activeMenu === 'members' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">সদস্য ডাটাবেজ ব্যবস্থাপনা</h3>
                  <p className="text-xs text-slate-500">অনুমোদন, আইডি কার্ড জেনারেট ও তথ্য সম্পাদনা</p>
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => openReportModal('members')}
                    className="bg-[#001f3f] hover:bg-[#002b5b] text-[#d4af37] border border-[#d4af37]/50 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                    title="সদস্য তালিকা ও অডিট রিপোর্ট PDF ফরম্যাটে এক্সপোর্ট করুন"
                  >
                    <Download className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>এক্সপোর্ট PDF</span>
                  </button>

                  <select
                    value={memberFilterStatus}
                    onChange={(e) => setMemberFilterStatus(e.target.value)}
                    className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none"
                  >
                    <option value="all">সকল স্ট্যাটাস</option>
                    <option value="active">Active (সক্রিয়)</option>
                    <option value="pending">Pending (অপেক্ষমাণ)</option>
                    <option value="inactive">Inactive</option>
                  </select>

                  <div className="relative flex-1 sm:w-60">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={memberSearch}
                      onChange={(e) => setMemberSearch(e.target.value)}
                      placeholder="সদস্য বা মোবাইল খুঁজুন..."
                      className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Members Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-900 text-white uppercase text-[10px]">
                    <tr>
                      <th className="p-3">আইডি ও ছবি</th>
                      <th className="p-3">নাম ও মোবাইল</th>
                      <th className="p-3">বয়লার ক্লাস ও লাইসেন্স</th>
                      <th className="p-3">জেলা</th>
                      <th className="p-3">স্ট্যাটাস</th>
                      <th className="p-3 text-right">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredMembers.map((m) => (
                      <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 flex items-center gap-2">
                          <img
                            src={m.photoUrl}
                            alt={m.nameBangla}
                            className="w-8 h-10 rounded object-cover border border-slate-200 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <span className="font-mono font-bold text-blue-900">{m.memberId}</span>
                        </td>
                        <td className="p-3">
                          <div className="font-bold text-slate-900">{m.nameBangla}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{m.mobile}</div>
                        </td>
                        <td className="p-3">
                          <div className="font-medium text-slate-800">{m.boilerClass}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{m.boilerLicenseNo}</div>
                        </td>
                        <td className="p-3">{m.district}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            m.status === 'active'
                              ? 'bg-emerald-100 text-emerald-800'
                              : m.status === 'pending'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {m.status}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-1">
                          {m.status === 'pending' && (
                            <button
                              onClick={() => handleApproveMember(m.id)}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white px-2 py-1 rounded text-[11px] font-bold inline-flex items-center gap-1"
                              title="অনুমোদন করুন"
                            >
                              <Check className="w-3 h-3" />
                              অনুমোদন
                            </button>
                          )}
                          <button
                            onClick={() => onOpenCardModal(m)}
                            className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-2 py-1 rounded text-[11px] font-bold inline-flex items-center gap-1"
                            title="আইডি কার্ড"
                          >
                            <IdCard className="w-3 h-3" />
                            কার্ড
                          </button>
                          <button
                            onClick={() => handleDeleteMember(m.id)}
                            className="bg-slate-100 hover:bg-red-50 text-red-600 p-1 rounded"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 3. NOTICES MANAGEMENT MENU */}
          {activeMenu === 'notices' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">নোটিশ ও পরিপত্র ব্যবস্থাপনা</h3>
                  <p className="text-xs text-slate-500">বিজ্ঞপ্তি প্রকাশ, সংশোধন ও অপসারণ</p>
                </div>
                <button
                  onClick={() => setShowAddNoticeModal(true)}
                  className="bg-blue-950 hover:bg-slate-900 text-amber-400 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>নতুন নোটিশ তৈরি</span>
                </button>
              </div>

              <div className="space-y-3 text-xs">
                {notices.map((n) => (
                  <div key={n.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                          {n.category}
                        </span>
                        {n.isUrgent && (
                          <span className="font-bold text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded">
                            জরুরি
                          </span>
                        )}
                        <span className="text-slate-400 text-[11px]">{n.publishDate}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">{n.title}</h4>
                      <p className="text-slate-600 mt-1 line-clamp-2">{n.description}</p>
                    </div>

                    <button
                      onClick={() => handleDeleteNotice(n.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                      title="মুছুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. INCOME MANAGEMENT MENU */}
          {activeMenu === 'income' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">আয় ব্যবস্থাপনা ও ডিজিটাল মানি রসিদ</h3>
                  <p className="text-xs text-slate-500">চাঁদা, ভর্তি ফি ও অনুদান গ্রহণ</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openReportModal('finance')}
                    className="bg-[#001f3f] hover:bg-[#002b5b] text-[#d4af37] border border-[#d4af37]/40 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                    title="আর্থিক হিসাব ও অডিট রিপোর্ট PDF ফরম্যাটে ডাউনলোড করুন"
                  >
                    <Download className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>আর্থিক PDF রিপোর্ট</span>
                  </button>
                  <button
                    onClick={() => setShowAddIncomeModal(true)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow"
                  >
                    <Plus className="w-4 h-4" />
                    <span>নতুন আয় এন্ট্রি দিন</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-900 text-white uppercase text-[10px]">
                    <tr>
                      <th className="p-3">তারিখ ও রসিদ নং</th>
                      <th className="p-3">উৎস / কার নিকট হতে</th>
                      <th className="p-3">খাত</th>
                      <th className="p-3">পদ্ধতি</th>
                      <th className="p-3 text-right">পরিমাণ (টাকা)</th>
                      <th className="p-3 text-center">মানি রসিদ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {incomeRecords.map((r) => (
                      <tr key={r.id} className="hover:bg-slate-50">
                        <td className="p-3">
                          <div className="font-mono font-bold text-blue-900">{r.receiptNumber}</div>
                          <div className="text-[10px] text-slate-400">{r.date}</div>
                        </td>
                        <td className="p-3 font-semibold text-slate-800">{r.receivedFrom}</td>
                        <td className="p-3">{r.head}</td>
                        <td className="p-3 text-slate-500">{r.paymentMethod}</td>
                        <td className="p-3 text-right font-mono font-bold text-emerald-700">
                          ৳ {r.amount.toLocaleString('en-US')}.০০
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => onOpenReceiptModal(r)}
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
            </div>
          )}

          {/* 5. EXPENSE MANAGEMENT MENU */}
          {activeMenu === 'expense' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">ব্যয় ব্যবস্থাপনা ও অনুমোদন ভাউচার</h3>
                  <p className="text-xs text-slate-500">অফিস পরিচালনা, ট্রেনিং ও সম্মেলন ব্যয়</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openReportModal('finance')}
                    className="bg-[#001f3f] hover:bg-[#002b5b] text-[#d4af37] border border-[#d4af37]/40 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                    title="ব্যয় ও ভাউচার হিসাব PDF ফরম্যাটে ডাউনলোড করুন"
                  >
                    <Download className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>ব্যয় ও অডিট PDF</span>
                  </button>
                  <button
                    onClick={() => setShowAddExpenseModal(true)}
                    className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow"
                  >
                    <Plus className="w-4 h-4" />
                    <span>নতুন ব্যয় এন্ট্রি দিন</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-900 text-white uppercase text-[10px]">
                    <tr>
                      <th className="p-3">তারিখ ও ভাউচার নং</th>
                      <th className="p-3">প্রাপক</th>
                      <th className="p-3">খাত</th>
                      <th className="p-3">অনুমোদনকারী</th>
                      <th className="p-3 text-right">পরিমাণ (টাকা)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {expenseRecords.map((r) => (
                      <tr key={r.id} className="hover:bg-slate-50">
                        <td className="p-3">
                          <div className="font-mono font-bold text-slate-900">{r.voucherNo}</div>
                          <div className="text-[10px] text-slate-400">{r.date}</div>
                        </td>
                        <td className="p-3 font-semibold text-slate-800">{r.paidTo}</td>
                        <td className="p-3">{r.head}</td>
                        <td className="p-3 text-slate-600">{r.approvedBy}</td>
                        <td className="p-3 text-right font-mono font-bold text-rose-700">
                          ৳ {r.amount.toLocaleString('en-US')}.০০
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 6. CASHBOOK & LEDGER */}
          {activeMenu === 'cashbook' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">ক্যাশ বুক ও জেনারেল লেজার (Cashbook)</h3>
                  <p className="text-xs text-slate-500">তারিখভিত্তিক ডেবিট-ক্রেডিট হিসাব ও ব্যালেন্স স্থিতি</p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => openReportModal('finance')}
                    className="bg-[#001f3f] hover:bg-[#002b5b] text-[#d4af37] border border-[#d4af37]/40 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                    title="পূর্ণাঙ্গ ক্যাশ বুক ও অডিট বিবরণী PDF এ ডাউনলোড করুন"
                  >
                    <Download className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>পূর্ণাঙ্গ ক্যাশ বুক PDF</span>
                  </button>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block">বর্তমান ক্লোজিং ব্যালেন্স:</span>
                    <span className="font-mono font-bold text-emerald-700 text-base">
                      ৳ {currentCashBalance.toLocaleString('en-US')}.০০
                    </span>
                  </div>
                </div>
              </div>

              {/* Bank Balances Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="font-bold text-slate-800">সোনালী ব্যাংক পিএলসি</span>
                  <p className="text-[10px] text-slate-500">চলতি হিসাব নং: ৪৪১২-০২০০০১৫</p>
                  <p className="font-mono font-bold text-blue-900 text-sm pt-1">৳ ৭,৫০,০০০.০০</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="font-bold text-slate-800">ইসলামী ব্যাংক বাংলাদেশ</span>
                  <p className="text-[10px] text-slate-500">মুদারাবা হিসাব নং: ২০৫০-১৯৯৮৮</p>
                  <p className="font-mono font-bold text-blue-900 text-sm pt-1">৳ ৪,২০,২০০.০০</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="font-bold text-slate-800">অফিস ক্যাশ ইন হ্যান্ড</span>
                  <p className="text-[10px] text-slate-500">পেটি ক্যাশ ও দৈনন্দিন ভাউচার</p>
                  <p className="font-mono font-bold text-emerald-700 text-sm pt-1">৳ ১,০০,০০০.০০</p>
                </div>
              </div>
            </div>
          )}

          {/* 7. ROLES & PERMISSIONS */}
          {activeMenu === 'roles' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900">ইউজার রোল ও পারমিশন ম্যাট্রিক্স (RBAC)</h3>
              <p className="text-xs text-slate-500">সিস্টেমের ৭টি প্রশাসনিক স্তরের নিয়ন্ত্রণ ও নিরাপত্তা বিধি</p>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-900 text-white uppercase text-[10px]">
                    <tr>
                      <th className="p-3">রোল (Role)</th>
                      <th className="p-3">বর্ণনা</th>
                      <th className="p-3">সদস্য ব্যবস্থাপনা</th>
                      <th className="p-3">আর্থিক হিসাব</th>
                      <th className="p-3">নোটিশ ও কনটেন্ট</th>
                      <th className="p-3">অডিট লগ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-3 font-bold text-purple-900">Super Admin</td>
                      <td className="p-3 text-slate-500">পূর্ণ নিয়ন্ত্রণ ও কনফিগারেশন</td>
                      <td className="p-3 text-emerald-600 font-bold">✓ পূর্ণাঙ্গ</td>
                      <td className="p-3 text-emerald-600 font-bold">✓ পূর্ণাঙ্গ</td>
                      <td className="p-3 text-emerald-600 font-bold">✓ পূর্ণাঙ্গ</td>
                      <td className="p-3 text-emerald-600 font-bold">✓ দর্শন ও এক্সপোর্ট</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-blue-900">Administrator</td>
                      <td className="p-3 text-slate-500">সাধারণ কেন্দ্রীয় ব্যবস্থাপনা</td>
                      <td className="p-3 text-emerald-600 font-bold">✓ অনুমোদন ও সম্পাদনা</td>
                      <td className="p-3 text-slate-400 font-medium">দর্শন মাত্র</td>
                      <td className="p-3 text-emerald-600 font-bold">✓ প্রকাশনা</td>
                      <td className="p-3 text-emerald-600 font-bold">✓ দর্শন</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-emerald-900">Accounts Officer</td>
                      <td className="p-3 text-slate-500">অর্থ সম্পাদক ও হিসাবরক্ষক</td>
                      <td className="p-3 text-slate-400">চাঁদা ট্র্যাকিং</td>
                      <td className="p-3 text-emerald-600 font-bold">✓ ভাউচার ও রসিদ তৈরি</td>
                      <td className="p-3 text-slate-400">✗ নিষেধ</td>
                      <td className="p-3 text-slate-400">✗ নিষেধ</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-amber-900">Member Manager</td>
                      <td className="p-3 text-slate-500">সদস্য ভর্তি ও কার্ড ইস্যু</td>
                      <td className="p-3 text-emerald-600 font-bold">✓ যাচাই ও কার্ড প্রিন্ট</td>
                      <td className="p-3 text-slate-400">ভর্তি ফি ভেরিফাই</td>
                      <td className="p-3 text-slate-400">✗ নিষেধ</td>
                      <td className="p-3 text-slate-400">✗ নিষেধ</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-800">Branch Admin</td>
                      <td className="p-3 text-slate-500">আঞ্চলিক শাখা সম্পাদক</td>
                      <td className="p-3 text-blue-700">শাখার সদস্য প্রস্তাব</td>
                      <td className="p-3 text-blue-700">শাখার চাঁদা জমা</td>
                      <td className="p-3 text-slate-400">✗ নিষেধ</td>
                      <td className="p-3 text-slate-400">✗ নিষেধ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 8. AUDIT LOGS */}
          {activeMenu === 'audit' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">অডিট ট্রেইল লগ (Security Audit Log)</h3>
                  <p className="text-xs text-slate-500">প্রতিটি ইউজার অ্যাকশন, অনুমোদন ও আর্থিক লেনদেনের অপরিবর্তনীয় রেকর্ড</p>
                </div>
                <span className="text-xs text-slate-400 font-mono">টেবিল: wp_bbp_audit_logs</span>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-900 text-white uppercase text-[10px]">
                    <tr>
                      <th className="p-3">সময়</th>
                      <th className="p-3">ব্যবহারকারী ও রোল</th>
                      <th className="p-3">মডিউল</th>
                      <th className="p-3">অ্যাকশন</th>
                      <th className="p-3">বিবরণ</th>
                      <th className="p-3">আইপি অ্যাড্রেস</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50 font-mono text-[11px]">
                        <td className="p-3 text-slate-500 whitespace-nowrap">{log.createdAt}</td>
                        <td className="p-3 font-semibold text-slate-800 font-sans">
                          {log.userName}
                          <span className="block text-[10px] text-slate-400 font-sans">{log.userRole}</span>
                        </td>
                        <td className="p-3 text-blue-900 font-bold">{log.module}</td>
                        <td className="p-3">
                          <span className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-[10px] font-bold">
                            {log.action}
                          </span>
                        </td>
                        <td className="p-3 font-sans text-slate-800">{log.details}</td>
                        <td className="p-3 text-slate-400">{log.ipAddress}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL: ADD NOTICE */}
      {showAddNoticeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-slate-900">নতুন নোটিশ তৈরি</h3>
              <button onClick={() => setShowAddNoticeModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNotice} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">নোটিশের শিরোনাম *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: জরুরি পরিষদ সভা সংক্রান্ত বিজ্ঞপ্তি"
                  value={newNotice.title}
                  onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">ক্যাটাগরি</label>
                <select
                  value={newNotice.category}
                  onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                >
                  <option value="সাধারণ">সাধারণ</option>
                  <option value="জরুরি">জরুরি</option>
                  <option value="সভা">সভা</option>
                  <option value="প্রশিক্ষণ">প্রশিক্ষণ</option>
                  <option value="আর্থিক">আর্থিক</option>
                  <option value="সার্কুলার">সার্কুলার</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">বিস্তারিত বিবরণ *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="নোটিশের বিস্তারিত বক্তব্য..."
                  value={newNotice.description}
                  onChange={(e) => setNewNotice({ ...newNotice, description: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newNotice.isUrgent}
                  onChange={(e) => setNewNotice({ ...newNotice, isUrgent: e.target.checked })}
                  className="rounded text-red-600"
                />
                <span className="font-semibold text-red-600">জরুরি নোটিশ হিসেবে পিন করুন</span>
              </label>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddNoticeModal(false)}
                  className="px-4 py-2 bg-slate-200 rounded-lg font-semibold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-950 text-amber-300 font-bold rounded-lg shadow"
                >
                  প্রকাশ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD INCOME */}
      {showAddIncomeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-slate-900">নতুন আয় এন্ট্রি ও রসিদ</h3>
              <button onClick={() => setShowAddIncomeModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateIncome} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">আয়ের খাত *</label>
                <select
                  value={newIncome.head}
                  onChange={(e) => setNewIncome({ ...newIncome, head: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                >
                  <option value="সদস্য মাসিক চাঁদা">সদস্য মাসিক চাঁদা</option>
                  <option value="নতুন সদস্য ভর্তি ফি">নতুন সদস্য ভর্তি ফি</option>
                  <option value="আজীবন সদস্য ফি">আজীবন সদস্য ফি</option>
                  <option value="প্রশিক্ষণ ফি">প্রশিক্ষণ ফি</option>
                  <option value="কল্যাণ তহবিল অনুদান">কল্যাণ তহবিল অনুদান</option>
                  <option value="ব্যাংক মুনাফা">ব্যাংক মুনাফা</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">কার নিকট হতে গ্রহণ করা হলো *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: মোঃ জাহিদুল ইসলাম অথবা নারায়ণগঞ্জ শাখা"
                  value={newIncome.receivedFrom}
                  onChange={(e) => setNewIncome({ ...newIncome, receivedFrom: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">টাকার পরিমাণ (৳) *</label>
                  <input
                    type="number"
                    required
                    value={newIncome.amount}
                    onChange={(e) => setNewIncome({ ...newIncome, amount: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">পেমেন্ট মেথড</label>
                  <select
                    value={newIncome.paymentMethod}
                    onChange={(e) => setNewIncome({ ...newIncome, paymentMethod: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value="bKash">বিকাশ (bKash)</option>
                    <option value="Nagad">নগদ (Nagad)</option>
                    <option value="Bank">ব্যাংক ডিপোজিট</option>
                    <option value="Cash">নগদ ক্যাশ</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">রেফারেন্স বা ট্রানজেকশন আইডি</label>
                <input
                  type="text"
                  placeholder="TRX-XXXX"
                  value={newIncome.reference}
                  onChange={(e) => setNewIncome({ ...newIncome, reference: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddIncomeModal(false)}
                  className="px-4 py-2 bg-slate-200 rounded-lg font-semibold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow"
                >
                  আয় সংরক্ষণ ও রসিদ তৈরি
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD EXPENSE */}
      {showAddExpenseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-slate-900">নতুন ব্যয় ও ভাউচার এন্ট্রি</h3>
              <button onClick={() => setShowAddExpenseModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateExpense} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">ব্যয়ের খাত *</label>
                <select
                  value={newExpense.head}
                  onChange={(e) => setNewExpense({ ...newExpense, head: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                >
                  <option value="অফিস ভাড়া ও ইউটিলিটি">অফিস ভাড়া ও ইউটিলিটি</option>
                  <option value="স্টাফ ও কর্মচারী বেতন">স্টাফ ও কর্মচারী বেতন</option>
                  <option value="সম্মেলন ও কাউন্সিল খরচ">সম্মেলন ও কাউন্সিল খরচ</option>
                  <option value="প্রশিক্ষণ ও ওয়ার্কশপ ব্যয়">প্রশিক্ষণ ও ওয়ার্কশপ ব্যয়</option>
                  <option value="আপ্যায়ন ও স্টেশনারি">আপ্যায়ন ও স্টেশনারি</option>
                  <option value="সদস্য চিকিৎসা ও দুর্ঘটনা কল্যাণ">সদস্য চিকিৎসা ও দুর্ঘটনা কল্যাণ</option>
                  <option value="আইনি ও নিরীক্ষা ফি">আইনি ও নিরীক্ষা ফি</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">প্রাপক / সুবিধাভোগী *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: ভবন মালিক / কম্পিউটার প্রেস"
                  value={newExpense.paidTo}
                  onChange={(e) => setNewExpense({ ...newExpense, paidTo: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ব্যয়ের পরিমাণ (৳) *</label>
                  <input
                    type="number"
                    required
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">পেমেন্ট মেথড</label>
                  <select
                    value={newExpense.paymentMethod}
                    onChange={(e) => setNewExpense({ ...newExpense, paymentMethod: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value="Bank Transfer">ব্যাংক ট্রান্সফার / চেক</option>
                    <option value="Cash">ক্যাশ ক্যাশিয়ার</option>
                    <option value="bKash">বিকাশ</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">অনুমোদনকারী কর্মকর্তা</label>
                <input
                  type="text"
                  value={newExpense.approvedBy}
                  onChange={(e) => setNewExpense({ ...newExpense, approvedBy: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddExpenseModal(false)}
                  className="px-4 py-2 bg-slate-200 rounded-lg font-semibold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg shadow"
                >
                  ব্যয় ভাউচার সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Official PDF & Audit Report Generator Modal */}
      <ReportExportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        defaultType={reportModalType}
        members={members}
        incomeRecords={incomeRecords}
        expenseRecords={expenseRecords}
        currentRole={currentRole}
        branches={branches}
      />
    </div>
  );
};
