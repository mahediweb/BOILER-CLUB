import React, { useState } from 'react';
import { Member } from '../types';
import { 
  UserCheck, 
  Lock, 
  IdCard, 
  DollarSign, 
  ShieldCheck, 
  Clock, 
  FileText, 
  LogOut, 
  CheckCircle, 
  CheckCircle2,
  AlertCircle,
  Phone,
  Printer,
  TrendingUp,
  Award,
  ChevronRight
} from 'lucide-react';
import { MemberProgressDashboard } from '../components/MemberProgressDashboard';

interface MemberPortalViewProps {
  members: Member[];
  onOpenCardModal: (member: Member) => void;
}

export const MemberPortalView: React.FC<MemberPortalViewProps> = ({
  members,
  onOpenCardModal
}) => {
  const [memberIdInput, setMemberIdInput] = useState('BBOP-2024-001');
  const [passwordInput, setPasswordInput] = useState('123456');
  const [loggedInMember, setLoggedInMember] = useState<Member | null>(members[0] || null);
  const [activeTab, setActiveTab] = useState<'profile' | 'progress' | 'fees' | 'card' | 'service'>('progress');

  // Subscription payment simulation state
  const [payFeeMonth, setPayFeeMonth] = useState('অক্টোবর ২০২৬');
  const [payAmount, setPayAmount] = useState('500');
  const [payMethod, setPayMethod] = useState('bKash');
  const [payTrx, setPayTrx] = useState('');
  const [paySuccess, setPaySuccess] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [serviceRequested, setServiceRequested] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const found = members.find(
      (m) =>
        m.memberId.toLowerCase() === memberIdInput.trim().toLowerCase() ||
        m.mobile === memberIdInput.trim()
    );
    if (found) {
      setLoggedInMember(found);
    } else {
      setLoginError('সদস্য আইডি বা মোবাইল নম্বরটি সঠিক নয়। ডেমো লগইনের জন্য BBOP-2024-001 ব্যবহার করুন।');
    }
  };

  const handleLogout = () => {
    setLoggedInMember(null);
    setLoginError(null);
  };

  const handlePaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPayError(null);
    if (!payTrx) {
      setPayError('ট্রানজেকশন আইডি (TrxID) প্রদান করুন।');
      return;
    }
    setPaySuccess(true);
    setTimeout(() => {
      setPayTrx('');
    }, 2500);
  };

  if (!loggedInMember) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-blue-950 text-amber-400 rounded-2xl flex items-center justify-center mx-auto shadow-md">
              <UserCheck className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">সদস্য পোর্টাল লগইন</h2>
            <p className="text-xs text-slate-500">
              আপনার সদস্য আইডি বা মোবাইল নম্বর এবং পাসওয়ার্ড প্রদান করুন
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                মেম্বার আইডি অথবা মোবাইল নম্বর
              </label>
              <input
                type="text"
                required
                value={memberIdInput}
                onChange={(e) => setMemberIdInput(e.target.value)}
                placeholder="যেমন: BBOP-2024-001 অথবা ০১৭১১..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">পাসওয়ার্ড</label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>

            <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900">
              💡 <strong>ডেমো অ্যাক্সেস:</strong> আইডি <code className="font-mono font-bold">BBOP-2024-001</code> দিয়ে সরাসরি প্রবেশ করতে পারবেন।
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-950 hover:bg-slate-900 text-amber-400 font-bold py-3 rounded-xl transition-colors shadow"
            >
              লগইন করুন
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner with Member Info */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-900">
        <div className="flex items-center gap-5">
          <img
            src={loggedInMember.photoUrl}
            alt={loggedInMember.nameBangla}
            className="w-20 h-24 rounded-2xl object-cover border-2 border-amber-400 shadow-lg bg-slate-800 shrink-0"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs bg-amber-500 text-slate-950 font-bold px-2.5 py-0.5 rounded-full">
                {loggedInMember.memberId}
              </span>
              <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full font-medium">
                সক্রিয় সদস্য
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white mt-1.5">{loggedInMember.nameBangla}</h1>
            <p className="text-xs text-slate-300 font-mono">{loggedInMember.nameEnglish}</p>
            <p className="text-xs text-amber-300 font-semibold mt-1">
              {loggedInMember.boilerClass} • {loggedInMember.district} শাখা
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setActiveTab('progress')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
              activeTab === 'progress'
                ? 'bg-[#d4af37] text-slate-950 ring-2 ring-amber-300'
                : 'bg-[#001f3f] text-[#d4af37] hover:bg-blue-900 border border-[#d4af37]/40'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-[#d4af37]" />
            <span>অগ্রগতি ও প্রশিক্ষণ ড্যাশবোর্ড</span>
          </button>
          <button
            onClick={() => onOpenCardModal(loggedInMember)}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow transition-colors"
          >
            <IdCard className="w-4 h-4" />
            <span>স্মার্ট আইডি কার্ড</span>
          </button>
          <button
            onClick={handleLogout}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>লগআউট</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 sm:gap-2 border-b border-slate-200 text-xs font-semibold overflow-x-auto">
        <button
          onClick={() => setActiveTab('progress')}
          className={`pb-3 px-3 sm:px-4 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'progress' ? 'border-[#001f3f] text-[#001f3f] font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>ক্যারিয়ার ও প্রশিক্ষণ অগ্রগতি (Member Progress)</span>
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 px-3 sm:px-4 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'profile' ? 'border-blue-950 text-blue-950 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          আমার প্রোফাইল
        </button>
        <button
          onClick={() => setActiveTab('fees')}
          className={`pb-3 px-3 sm:px-4 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'fees' ? 'border-blue-950 text-blue-950 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          মাসিক চাঁদা ও পেমেন্ট হিস্ট্রি
        </button>
        <button
          onClick={() => setActiveTab('card')}
          className={`pb-3 px-3 sm:px-4 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'card' ? 'border-blue-950 text-blue-950 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          আইডি কার্ড ডাউনলোড
        </button>
        <button
          onClick={() => setActiveTab('service')}
          className={`pb-3 px-3 sm:px-4 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'service' ? 'border-blue-950 text-blue-950 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          লাইসেন্স নবায়ন ট্র্যাকিং
        </button>
      </div>

      {/* Tab: Member Progress Dashboard (Recharts Visualizations) */}
      {activeTab === 'progress' && (
        <MemberProgressDashboard member={loggedInMember} />
      )}

      {/* Tab 1: Profile */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="text-base font-bold text-slate-900">ব্যক্তিগত ও কর্মক্ষেত্র বিবরণী</h3>
            <span className="text-xs text-slate-500">তথ্য হালনাগাদে কেন্দ্রীয় দপ্তরে আবেদন করুন</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">পিতার নাম:</span>
              <span className="font-semibold text-slate-800 text-sm">{loggedInMember.fatherName}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">মাতার নাম:</span>
              <span className="font-semibold text-slate-800 text-sm">{loggedInMember.motherName || 'মোছাঃ ফাতেমা বেগম'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">জাতীয় পরিচয়পত্র (NID):</span>
              <span className="font-mono font-bold text-slate-800 text-sm">{loggedInMember.nidNo}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">মোবাইল নম্বর:</span>
              <span className="font-mono font-bold text-blue-950 text-sm">{loggedInMember.mobile}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">ইমেইল:</span>
              <span className="font-mono text-slate-700 text-sm">{loggedInMember.email}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">রক্তের গ্রুপ:</span>
              <span className="font-bold text-red-600 text-sm">{loggedInMember.bloodGroup || 'O+'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">কর্মস্থল ও কারখানা:</span>
              <span className="font-semibold text-slate-800 text-sm">{loggedInMember.workplace}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">পদবী:</span>
              <span className="font-semibold text-slate-800 text-sm">{loggedInMember.designation}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">অভিজ্ঞতা:</span>
              <span className="font-semibold text-slate-800 text-sm">{loggedInMember.experienceYears} বছর</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">বয়লার লাইসেন্স নম্বর:</span>
              <span className="font-mono font-bold text-amber-700 text-sm">{loggedInMember.boilerLicenseNo}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">বয়লার শ্রেণি:</span>
              <span className="font-semibold text-blue-900 text-sm">{loggedInMember.boilerClass}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">জরুরি যোগাযোগ:</span>
              <span className="font-semibold text-slate-800 text-sm">{loggedInMember.emergencyContact.name} ({loggedInMember.emergencyContact.phone})</span>
            </div>
          </div>

          {/* Quick Progress Banner within Profile */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-blue-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-blue-900 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-[#d4af37] flex items-center justify-center shrink-0 border border-[#d4af37]/30">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">পেশাগত ক্যারিয়ার অগ্রগতি ও প্রশিক্ষণ মেট্রিক্স</h4>
                <p className="text-[11px] text-slate-300">দক্ষতা রেডার চার্ট, লাইসেন্স নবায়ন ইতিহাস এবং কমিটি উপস্থিতির পূর্ণাঙ্গ চার্ট দেখুন</p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('progress')}
              className="px-3.5 py-1.5 bg-[#d4af37] hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shrink-0 shadow"
            >
              <span>অগ্রগতি ড্যাশবোর্ডে যান</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Fees Payment */}
      {activeTab === 'fees' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-base font-bold text-slate-900">পরিশোধিত চাঁদার তালিকা ও রসিদ</h3>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-900 text-white uppercase text-[10px]">
                  <tr>
                    <th className="p-3">মাস / খাত</th>
                    <th className="p-3">তারিখ</th>
                    <th className="p-3">মাধ্যম ও TrxID</th>
                    <th className="p-3 text-right">পরিমাণ</th>
                    <th className="p-3 text-center">স্ট্যাটাস</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">সেপ্টেম্বর ২০২৬ (মাসিক চাঁদা)</td>
                    <td className="p-3 text-slate-500">০২ সেপ্টেম্বর ২০২৬</td>
                    <td className="p-3 font-mono text-slate-600">bKash (TRX987123)</td>
                    <td className="p-3 text-right font-mono font-bold text-emerald-600">৳ ৫০০.০০</td>
                    <td className="p-3 text-center">
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">পরিশোধিত</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">আগস্ট ২০২৬ (মাসিক চাঁদা)</td>
                    <td className="p-3 text-slate-500">০৫ আগস্ট ২০২৬</td>
                    <td className="p-3 font-mono text-slate-600">Nagad (TRX654321)</td>
                    <td className="p-3 text-right font-mono font-bold text-emerald-600">৳ ৫০০.০০</td>
                    <td className="p-3 text-center">
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">পরিশোধিত</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">জুলাই ২০২৬ (মাসিক চাঁদা)</td>
                    <td className="p-3 text-slate-500">০৩ জুলাই ২০২৬</td>
                    <td className="p-3 font-mono text-slate-600">bKash (TRX112233)</td>
                    <td className="p-3 text-right font-mono font-bold text-emerald-600">৳ ৫০০.০০</td>
                    <td className="p-3 text-center">
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">পরিশোধিত</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Pay Monthly Dues Form */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">অনলাইন চাঁদা জমা দিন</h3>
            <p className="text-xs text-slate-500">বিকাশ/নগদ মার্চেন্ট নম্বর: <strong>০১৭১১-২৩৪৫৬৭</strong></p>

            <form onSubmit={handlePaySubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">কোন মাসের চাঁদা?</label>
                <select
                  value={payFeeMonth}
                  onChange={(e) => setPayFeeMonth(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                >
                  <option value="অক্টোবর ২০২৬">অক্টোবর ২০২৬ (বকেয়া)</option>
                  <option value="নভেম্বর ২০২৬">নভেম্বর ২০২৬ (অগ্রিম)</option>
                  <option value="ডিসেম্বর ২০২৬">ডিসেম্বর ২০২৬ (অগ্রিম)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">টাকার পরিমাণ</label>
                <input
                  type="number"
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold text-blue-950"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">পেমেন্ট মেথড</label>
                <select
                  value={payMethod}
                  onChange={(e) => setPayMethod(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                >
                  <option value="bKash">বিকাশ (bKash)</option>
                  <option value="Nagad">নগদ (Nagad)</option>
                  <option value="Bank">ব্যাংক অ্যাকাউন্ট</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">TrxID / ট্রানজেকশন রেফারেন্স *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: TRXBBP8877"
                  value={payTrx}
                  onChange={(e) => {
                    setPayTrx(e.target.value);
                    if (payError) setPayError(null);
                  }}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                />
              </div>

              {payError && (
                <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs">
                  {payError}
                </div>
              )}

              {paySuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-lg text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>আপনার চাঁদা পরিশোধ রসিদ আবেদন সফল হয়েছে! অর্থ সম্পাদক কর্তৃক অনুমোদিত হলে রসিদ প্রস্তুত হবে।</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl transition-colors shadow"
              >
                {paySuccess ? 'পেমেন্ট অনুমোদনের জন্য অপেক্ষারত' : 'পেমেন্ট সাবমিট করুন'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab 3: Card */}
      {activeTab === 'card' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-4 max-w-xl mx-auto shadow-xs">
          <div className="w-16 h-16 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mx-auto">
            <IdCard className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">ডিজিটাল স্মার্ট মেম্বার কার্ড</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            আপনার স্মার্ট পরিচয়পত্রটি প্রস্তুত রয়েছে। কার্ডটিতে আপনার ছবি, কিউআর কোড এবং সাধারণ সম্পাদকের ডিজিটাল স্বাক্ষর সন্নিবেশিত রয়েছে।
          </p>
          <button
            onClick={() => onOpenCardModal(loggedInMember)}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-2 mx-auto shadow-md"
          >
            <Printer className="w-4 h-4" />
            <span>আইডি কার্ড প্রিভিউ ও প্রিন্ট করুন</span>
          </button>
        </div>
      )}

      {/* Tab 4: Renewal Tracking */}
      {activeTab === 'service' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6 shadow-xs max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 text-blue-900 rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">বয়লার সনদ নবায়ন ট্র্যাকিং</h3>
              <p className="text-xs text-slate-500">প্রধান বয়লার পরিদর্শকের দপ্তর সংক্রান্ত সেবা সহায়তা</p>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">সনদ নম্বর:</span>
              <span className="font-mono font-bold text-slate-800">{loggedInMember.boilerLicenseNo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">বর্তমান মেয়াদ শেষ:</span>
              <span className="font-bold text-emerald-700">৩১ ডিসেম্বর ২০২৮ (সক্রিয়)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">নবায়ন আবেদন স্ট্যাটাস:</span>
              <span className="text-blue-900 font-semibold">কোনো নবায়ন আবেদন অমীমাংসিত নেই</span>
            </div>
          </div>

          {serviceRequested ? (
            <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>লাইসেন্স নবায়ন সহায়তার জন্য কেন্দ্রীয় প্রশিক্ষণ সেলে আপনার রিকোয়েস্ট সফলভাবে পাঠানো হয়েছে। দায়িত্বপ্রাপ্ত প্রতিনিধি শীঘ্রই যোগাযোগ করবেন।</span>
            </div>
          ) : (
            <button
              onClick={() => setServiceRequested(true)}
              className="w-full bg-blue-950 hover:bg-slate-900 text-amber-400 font-bold py-2.5 rounded-xl text-xs transition-colors"
            >
              সনদ নবায়নে পরিষদের সহায়তা রিকোয়েস্ট করুন
            </button>
          )}
        </div>
      )}
    </div>
  );
};
