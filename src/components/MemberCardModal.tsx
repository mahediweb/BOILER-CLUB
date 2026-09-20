import React, { useState } from 'react';
import { Member } from '../types';
import { 
  X, 
  Printer, 
  Download, 
  Flame, 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink,
  Calendar,
  Award,
  RefreshCw,
  Clock
} from 'lucide-react';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import { Logo } from './Logo';

interface MemberCardModalProps {
  member: Member | null;
  onClose: () => void;
}

export const MemberCardModal: React.FC<MemberCardModalProps> = ({ member, onClose }) => {
  const [side, setSide] = useState<'both' | 'front' | 'back'>('both');
  const [copied, setCopied] = useState(false);

  if (!member) return null;

  const origin = typeof window !== 'undefined' && window.location.origin 
    ? window.location.origin 
    : 'https://boiler-bd.org';
  const profileUrl = `${origin}/?member=${encodeURIComponent(member.memberId)}`;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadQR = () => {
    const canvas = document.getElementById(`member-qr-${member.memberId}`) as HTMLCanvasElement;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `BBOP_QR_${member.memberId}.png`;
    link.href = url;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden my-6">
        {/* Modal Top Bar */}
        <div className="bg-[#001f3f] text-white px-6 py-3.5 flex items-center justify-between border-b-2 border-[#d4af37]">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-[#d4af37] rounded-lg text-[#001f3f]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">অফিসিয়াল মেম্বার স্মার্ট আইডি কার্ড</h3>
              <p className="text-xs text-slate-300">সদস্য আইডি: <span className="text-[#d4af37] font-mono font-bold">{member.memberId}</span></p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-[#d4af37] hover:brightness-110 text-[#001f3f] font-bold px-3 py-1.5 rounded text-xs flex items-center gap-1.5 transition-all shadow"
              title="প্রিন্ট করুন"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>প্রিন্ট / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-300 hover:text-white p-1 rounded hover:bg-[#002b5b] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Card Side Toggle Controls */}
        <div className="bg-slate-100 px-6 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-600 font-medium">কার্ড প্রিভিউ মোড:</span>
          <div className="inline-flex rounded-lg border border-slate-300 bg-white p-0.5">
            <button
              onClick={() => setSide('both')}
              className={`px-3 py-1 rounded transition-colors ${side === 'both' ? 'bg-[#001f3f] text-white font-semibold' : 'text-slate-600'}`}
            >
              উভয় পাশ (Dual)
            </button>
            <button
              onClick={() => setSide('front')}
              className={`px-3 py-1 rounded transition-colors ${side === 'front' ? 'bg-[#001f3f] text-white font-semibold' : 'text-slate-600'}`}
            >
              সম্মুখ পাশ
            </button>
            <button
              onClick={() => setSide('back')}
              className={`px-3 py-1 rounded transition-colors ${side === 'back' ? 'bg-[#001f3f] text-white font-semibold' : 'text-slate-600'}`}
            >
              পেছনের পাশ
            </button>
          </div>
        </div>

        {/* Printable Card Canvas Area */}
        <div className="p-6 bg-slate-200/70 flex flex-col sm:flex-row items-center justify-center gap-6 print:p-0 print:bg-white">
          {/* FRONT SIDE */}
          {(side === 'both' || side === 'front') && (
            <div className="w-[310px] h-[480px] bg-gradient-to-b from-[#001f3f] via-slate-900 to-[#00152b] text-white rounded-2xl shadow-xl border-2 border-[#d4af37]/80 p-4 flex flex-col justify-between relative overflow-hidden shrink-0 select-none">
              {/* Card Watermark */}
              <div className="absolute -right-12 -bottom-12 opacity-5 pointer-events-none">
                <Flame className="w-64 h-64 text-amber-400" />
              </div>

              {/* Header */}
              <div className="text-center pb-2 border-b border-[#d4af37]/40 relative z-10">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Logo size="sm" className="w-8 h-8" />
                  <span className="text-[10px] font-bold text-[#d4af37] tracking-wider">পেশাজীবী সংগঠন</span>
                </div>
                <h4 className="text-xs font-bold text-white leading-tight">বাংলাদেশ বয়লার পরিচারক পরিষদ</h4>
                <p className="text-[9px] text-slate-300 tracking-tight">Bangladesh Boiler Operators Parishad</p>
                <div className="mt-1 inline-block bg-[#d4af37] text-[#001f3f] text-[9px] font-bold px-2 py-0.5 rounded-full">
                  সদস্য পরিচয়পত্র (MEMBER ID CARD)
                </div>
              </div>

              {/* Photo & Member ID */}
              <div className="flex flex-col items-center my-auto py-2 relative z-10">
                <div className="w-24 h-28 rounded-lg overflow-hidden border-2 border-[#d4af37] shadow-lg bg-slate-800 mb-2">
                  <img
                    src={member.photoUrl}
                    alt={member.nameBangla}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-center">
                  <span className="bg-[#00152b] text-[#d4af37] border border-[#d4af37]/40 font-mono font-bold text-xs px-2.5 py-0.5 rounded">
                    {member.memberId}
                  </span>
                  <h3 className="text-sm font-bold text-white mt-1.5 leading-snug">{member.nameBangla}</h3>
                  <p className="text-[10px] text-slate-300 font-medium">{member.nameEnglish}</p>
                </div>

                {/* Badges / Designation */}
                <div className="w-full mt-3 bg-slate-900/90 border border-slate-700/80 rounded-lg p-2 text-left space-y-1 text-[10px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">বয়লার ক্লাস:</span>
                    <span className="font-semibold text-amber-300 text-right">{member.boilerClass}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">লাইসেন্স নং:</span>
                    <span className="font-mono text-slate-200">{member.boilerLicenseNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">জেলা / শাখা:</span>
                    <span className="text-slate-200">{member.district}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">মেয়াদ উত্তীর্ণ:</span>
                    <span className="text-emerald-400 font-semibold">৩১ ডিসেম্বর ২০২৮</span>
                  </div>
                </div>
              </div>

              {/* Card Footer with Live Generated QR */}
              <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-11 h-11 bg-white p-0.5 rounded flex items-center justify-center shadow-xs border border-[#d4af37]/60 shrink-0">
                    <QRCodeSVG 
                      value={profileUrl}
                      size={40}
                      level="M"
                      bgColor="#FFFFFF"
                      fgColor="#001f3f"
                    />
                  </div>
                  <div className="text-[8px] text-slate-300 leading-tight">
                    <span className="text-[#d4af37] font-bold block">ডিজিটাল কিউআর কোড</span>
                    <span className="text-slate-400 font-mono">{member.memberId}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="w-16 border-b border-[#d4af37] pb-0.5 text-center">
                    <span className="text-[8px] italic text-[#d4af37] font-serif">Morshed</span>
                  </div>
                  <span className="text-[8px] text-slate-400 block mt-0.5">সাধারণ সম্পাদক</span>
                </div>
              </div>
            </div>
          )}

          {/* BACK SIDE */}
          {(side === 'both' || side === 'back') && (
            <div className="w-[310px] h-[480px] bg-slate-900 text-slate-200 rounded-2xl shadow-xl border-2 border-slate-700 p-4 flex flex-col justify-between relative overflow-hidden shrink-0 select-none">
              {/* Back Header */}
              <div className="text-center pb-2 border-b border-slate-700">
                <h5 className="text-[11px] font-bold text-[#d4af37] uppercase tracking-wide">
                  জরুরি যোগাযোগ ও নীতিমালা
                </h5>
                <p className="text-[9px] text-slate-400">Cardholder Terms & Emergency Contacts</p>
              </div>

              {/* Detailed Member Info */}
              <div className="space-y-1.5 text-[10px] my-auto py-1">
                {/* Visual Vertical Timeline of Membership Lifecycle */}
                <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800">
                  <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800">
                    <span className="text-[9px] font-bold text-[#d4af37] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#d4af37]" />
                      মেম্বারশিপ মাইলস্টোন টাইমলাইন
                    </span>
                    <span className="text-[8px] text-emerald-400 font-medium">সক্রিয় সদস্য</span>
                  </div>

                  {/* Vertical Timeline Steps */}
                  <div className="relative pl-3 space-y-1.5 before:absolute before:left-[5px] before:top-1.5 before:bottom-1.5 before:w-0.5 before:bg-slate-700">
                    {/* Step 1: Application Date */}
                    <div className="relative flex items-center justify-between text-[8.5px]">
                      <div className="flex items-center gap-1.5">
                        <span className="absolute -left-3 w-2 h-2 rounded-full bg-blue-500 border border-slate-900 ring-2 ring-slate-800" />
                        <span className="text-slate-300 flex items-center gap-1">
                          <Calendar className="w-2.5 h-2.5 text-blue-400" />
                          আবেদনের তারিখ:
                        </span>
                      </div>
                      <span className="font-mono text-blue-300 font-semibold">
                        {member.applicationDate || '২০১৫-১২-০৫'}
                      </span>
                    </div>

                    {/* Step 2: Approval Date */}
                    <div className="relative flex items-center justify-between text-[8.5px]">
                      <div className="flex items-center gap-1.5">
                        <span className="absolute -left-3 w-2 h-2 rounded-full bg-emerald-500 border border-slate-900 ring-2 ring-slate-800" />
                        <span className="text-slate-300 flex items-center gap-1">
                          <Award className="w-2.5 h-2.5 text-emerald-400" />
                          অনুমোদনের তারিখ:
                        </span>
                      </div>
                      <span className="font-mono text-emerald-300 font-semibold">
                        {member.approvalDate || member.joiningDate || '২০১৬-০১-১০'}
                      </span>
                    </div>

                    {/* Step 3: Last Renewal Date */}
                    <div className="relative flex items-center justify-between text-[8.5px]">
                      <div className="flex items-center gap-1.5">
                        <span className="absolute -left-3 w-2 h-2 rounded-full bg-amber-400 border border-slate-900 ring-2 ring-slate-800" />
                        <span className="text-slate-300 flex items-center gap-1">
                          <RefreshCw className="w-2.5 h-2.5 text-amber-400" />
                          সর্বশেষ নবায়ন:
                        </span>
                      </div>
                      <span className="font-mono text-amber-300 font-semibold">
                        {member.lastRenewalDate || '২০২৪-০১-১৫'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">পিতার নাম:</span>
                    <span className="text-slate-200 truncate max-w-[180px]">{member.fatherName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">রক্তের গ্রুপ:</span>
                    <span className="text-red-400 font-bold">{member.bloodGroup || 'O+'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">মোবাইল:</span>
                    <span className="font-mono text-slate-200">{member.mobile}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">এনআইডি:</span>
                    <span className="font-mono text-slate-300">{member.nidNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">কর্মস্থল:</span>
                    <span className="text-slate-300 text-right truncate max-w-[170px]">{member.workplace}</span>
                  </div>
                </div>

                <div className="bg-amber-950/30 border border-amber-800/50 p-1.5 rounded-lg space-y-0.5">
                  <span className="text-[8.5px] font-bold text-amber-300 block">জরুরি প্রয়োজনে (Emergency):</span>
                  <div className="flex justify-between text-slate-300 text-[8.5px]">
                    <span>{member.emergencyContact?.name || 'অভিভাবক'} ({member.emergencyContact?.relation || 'জরুরি'}):</span>
                    <span className="font-mono text-amber-200">{member.emergencyContact?.phone || member.mobile}</span>
                  </div>
                </div>

                <div className="bg-slate-950/70 p-1.5 rounded border border-slate-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-white p-0.5 rounded shrink-0">
                      <QRCodeSVG 
                        value={profileUrl}
                        size={28}
                        level="L"
                        bgColor="#FFFFFF"
                        fgColor="#000000"
                      />
                    </div>
                    <div className="text-[7.5px] text-slate-300 leading-tight">
                      <span className="text-[#d4af37] font-bold block">ই-ভেরিফিকেশন কোড</span>
                      <span className="font-mono text-slate-400 text-[7px]">{member.memberId}</span>
                    </div>
                  </div>
                  <div className="text-right text-[7.5px] text-emerald-400 font-semibold">
                    <span>লাইসেন্স: {member.boilerClass?.split(' ')[0] || '১ম শ্রেণি'}</span>
                  </div>
                </div>

                <div className="text-[7.5px] text-slate-400 leading-tight space-y-0.5 bg-slate-950/60 p-1.5 rounded border border-slate-800">
                  <p>১. এই কার্ডটি বাংলাদেশ বয়লার পরিচারক পরিষদের সম্পত্তি ও হস্তান্তরযোগ্য নয়।</p>
                  <p>২. কার্ড হারিয়ে গেলে অবিলম্বে কেন্দ্রীয় দপ্তরে অবহিত করুন।</p>
                </div>
              </div>

              {/* Address and Authorized Signature */}
              <div className="pt-2 border-t border-slate-700 text-center space-y-1 text-[9px]">
                <p className="text-slate-300 font-medium">কেন্দ্রীয় কার্যালয়: প্লট-২৪, ব্লক-বি, তেজগাঁও শিল্প এলাকা, ঢাকা-১২০৮</p>
                <p className="text-slate-400 text-[8px]">ফোন: ০১৭১১-২৩৪৫৬৭ | ওয়েবসাইট: www.boiler-bd.org</p>
                <div className="pt-1 flex items-center justify-between px-2 text-[8px] text-[#d4af37]">
                  <span>নিবন্ধন নং: বিওপি/২০১৬</span>
                  <span>স্বাক্ষর: সভাপতি</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* QR Code & Profile Verification Panel */}
        <div className="bg-[#00152b] text-slate-200 px-6 py-3.5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="bg-white p-1 rounded shrink-0 shadow border border-[#d4af37]/40">
              <QRCodeSVG 
                value={profileUrl}
                size={48}
                level="M"
                bgColor="#FFFFFF"
                fgColor="#001f3f"
              />
            </div>
            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#d4af37]">
                  সদস্য প্রোফাইল ও কিউআর লিংক
                </span>
                <span className="bg-[#002b5b] text-[#d4af37] text-[10px] font-mono px-1.5 py-0.2 rounded font-semibold border border-[#d4af37]/30">
                  {member.memberId}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 font-mono truncate max-w-xs sm:max-w-sm bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                {profileUrl}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleCopyLink}
              className="bg-[#002b5b] hover:bg-[#003875] text-white text-xs px-2.5 py-1.5 rounded font-semibold flex items-center gap-1 border border-slate-700 transition-colors"
              title="প্রোফাইল লিংক কপি করুন"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#d4af37]" />}
              <span>{copied ? 'কপি হয়েছে!' : 'লিঙ্ক কপি'}</span>
            </button>

            <button
              onClick={handleDownloadQR}
              className="bg-[#d4af37] hover:brightness-110 text-[#001f3f] text-xs px-2.5 py-1.5 rounded font-bold flex items-center gap-1 transition-all shadow-xs"
              title="কিউআর কোড ডাউনলোড করুন"
            >
              <Download className="w-3.5 h-3.5" />
              <span>QR ডাউনলোড</span>
            </button>

            <a
              href={profileUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-[#002b5b] hover:bg-[#003875] text-slate-200 text-xs p-1.5 rounded border border-slate-700 transition-colors"
              title="নতুন ট্যাবে প্রোফাইল লিঙ্ক দেখুন"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Hidden Canvas for High-Resolution PNG download */}
          <div className="hidden">
            <QRCodeCanvas
              id={`member-qr-${member.memberId}`}
              value={profileUrl}
              size={300}
              level="H"
              includeMargin={true}
              bgColor="#FFFFFF"
              fgColor="#001f3f"
            />
          </div>
        </div>

        {/* Modal Footer Tips */}
        <div className="bg-slate-50 px-6 py-2.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
          <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
            <CheckCircle2 className="w-4 h-4" />
            লাইসেন্স ও মেম্বারশিপ স্ট্যাটাস: {member.status} ({member.membershipType})
          </span>
          <span className="text-[11px] text-slate-500">
            * স্মার্টফোন দিয়ে কিউআর কোড স্ক্যান করলে সরাসরি ডিজিটাল প্রোফাইল ভেরিফাই হবে।
          </span>
        </div>
      </div>
    </div>
  );
};
