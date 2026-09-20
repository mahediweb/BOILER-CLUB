import React from 'react';
import { 
  Flame, 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink, 
  ShieldCheck, 
  Award, 
  Heart,
  FileText
} from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab }) => {
  const handleNav = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#00152b] text-slate-300 border-t-4 border-[#d4af37]">
      {/* Upper Footer: Notice / Helpline strip */}
      <div className="bg-[#001f3f] border-b border-[#002b5b] py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center shrink-0 border border-[#d4af37]/40">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">বয়লার নিরাপত্তা ও কারিগরি জরুরি সহায়তা হটলাইন</h4>
              <p className="text-xs text-slate-300">যেকোনো বয়লার ত্রুটি, উচ্চচাপ ঝুঁকি বা আইনি পরামর্শে সার্বক্ষণিক যোগাযোগ করুন</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a 
              href="tel:01711234567" 
              className="bg-[#d4af37] hover:brightness-110 text-[#001f3f] font-bold px-4 py-2 rounded text-xs transition-colors shadow flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>০১৭১১-২৩৪৫৬৭</span>
            </a>
            <button
              onClick={() => handleNav('contact')}
              className="bg-[#002b5b] hover:bg-[#003875] text-white font-medium px-4 py-2 rounded text-xs transition-colors border border-slate-700"
            >
              জরুরি বার্তা পাঠান
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Organization Profile */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Logo size="md" />
              <div>
                <h3 className="text-base font-bold text-white">বাংলাদেশ বয়লার পরিচারক পরিষদ</h3>
                <p className="text-xs text-[#d4af37]">Bangladesh Boiler Operators Parishad</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              শিল্পে নিয়োজিত সকল ১ম, ২য় ও ৩য় শ্রেণির দক্ষ বয়লার পরিচারক এবং প্রকৌশলীদের ঐক্য, পেশাগত দক্ষতা বৃদ্ধি, কর্মক্ষেত্রে নিরাপত্তা নিশ্চিতকরণ ও অধিকার রক্ষায় অঙ্গীকারবদ্ধ পেশাজীবী সংগঠন।
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <Award className="w-4 h-4 text-amber-400" />
              <span>নিবন্ধন নং: বিওপি/২০১৬/৮৮</span>
            </div>
          </div>

          {/* Col 2: Quick Navigation */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">
              গুরুত্বপূর্ণ লিঙ্ক
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-amber-400 transition-colors">
                  • আমাদের সম্পর্কে ও লক্ষ্য-উদ্দেশ্য
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('committee')} className="hover:text-amber-400 transition-colors">
                  • কেন্দ্রীয় কার্যনির্বাহী কমিটি (২০২৪-২০২৬)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('members')} className="hover:text-amber-400 transition-colors">
                  • সদস্য তালিকা ও ডিরেক্টরি
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('branches')} className="hover:text-amber-400 transition-colors">
                  • আঞ্চলিক ও জেলা শাখা কমিটি
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('notices')} className="hover:text-amber-400 transition-colors">
                  • প্রাতিষ্ঠানিক নোটিশ বোর্ড
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('finance')} className="hover:text-amber-400 transition-colors">
                  • আর্থিক স্বচ্ছতা ও অডিট হিসাব
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('documents')} className="hover:text-amber-400 transition-colors">
                  • মূল গঠনতন্ত্র ও সরকারি গেজেট
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Regulatory & Technical Portals */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">
              প্রাসঙ্গিক ও প্রযুক্তিগত পোর্টাল
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a href="https://moind.gov.bd" target="_blank" rel="noreferrer" className="flex items-center justify-between hover:text-amber-400 transition-colors py-1 border-b border-slate-800">
                  <span>শিল্প মন্ত্রণালয় (Ministry of Industries)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="http://boiler.gov.bd" target="_blank" rel="noreferrer" className="flex items-center justify-between hover:text-amber-400 transition-colors py-1 border-b border-slate-800">
                  <span>প্রধান বয়লার পরিদর্শকের কার্যালয়</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://bitac.gov.bd" target="_blank" rel="noreferrer" className="flex items-center justify-between hover:text-amber-400 transition-colors py-1 border-b border-slate-800">
                  <span>বিটাক (BITAC) প্রশিক্ষণ একাডেমি</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://www.iebbd.org" target="_blank" rel="noreferrer" className="flex items-center justify-between hover:text-amber-400 transition-colors py-1 border-b border-slate-800">
                  <span>ইঞ্জিনিয়ার্স ইনস্টিটিউশন, বাংলাদেশ (IEB)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <button onClick={() => handleNav('architecture')} className="flex items-center gap-1.5 text-amber-400 hover:underline pt-2 font-medium">
                  <FileText className="w-3.5 h-3.5" />
                  <span>সিস্টেম আর্কিটেকচার ব্লুপ্রিন্ট (১৯টি রিকোয়ারমেন্ট)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Central Headquarters Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">
              কেন্দ্রীয় কার্যালয়
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>প্লট-২৪, ব্লক-বি (৩য় তলা), তেজগাঁও শিল্প এলাকা, ঢাকা-১২০৮, বাংলাদেশ</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+৮৮০ ২ ৯৯৭৭৮৮৯৯, ০১৮১৯-৩৪৫৬৭৮</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>central@boiler-bd.org / info@boiler-bd.org</span>
              </div>
              <div className="pt-2">
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5">
                  <span className="text-[11px] text-slate-400 block mb-1">অফিস সময়সূচী:</span>
                  <p className="text-xs text-amber-300 font-medium">শনিবার - বৃহস্পতিবার: সকাল ৯:০০ - সন্ধ্যা ৬:০০</p>
                  <p className="text-[10px] text-slate-400">শুক্রবার ও সরকারি ছুটির দিনে জরুরি সেল চালু থাকে</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & High Density Status */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span>© ২০২৬ বাংলাদেশ বয়লার পরিচারক পরিষদ (BBOP). সর্বস্বত্ব সংরক্ষিত।</span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-400">ভার্সন: <span className="text-[#d4af37] font-mono font-bold">২.০.৪ (High Density)</span></span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>সার্ভার স্ট্যাটাস: <strong className="text-emerald-400">সচল</strong></span>
            </div>
            <span>•</span>
            <button onClick={() => handleNav('about')} className="hover:text-[#d4af37] transition-colors">গোপনীয়তা নীতি</button>
            <span>•</span>
            <button onClick={() => handleNav('documents')} className="hover:text-[#d4af37] transition-colors">গঠনতন্ত্র</button>
            <span>•</span>
            <button onClick={() => handleNav('architecture')} className="text-[#d4af37] font-semibold hover:underline">
              সিস্টেম ব্লুপ্রিন্ট
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
