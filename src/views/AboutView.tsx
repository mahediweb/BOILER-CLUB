import React from 'react';
import { ShieldCheck, Award, Users, BookOpen, CheckCircle, Scale, Target, Compass } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Breadcrumb / Page Title */}
      <div className="border-b border-slate-200 pb-6">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
          সংগঠনের পরিচিতি
        </span>
        <h1 className="text-3xl font-bold text-slate-900 mt-3">
          আমাদের সম্পর্কে (About Us)
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          বাংলাদেশ বয়লার পরিচারক পরিষদ (Bangladesh Boiler Operators Parishad) দেশের শিল্প খাতে কর্মরত দক্ষ ও লাইসেন্সধারী বয়লার পরিচারকদের জাতীয় ঐক্য ও পেশাগত অধিকারের প্রতীক।
        </p>
      </div>

      {/* History & Inception */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4 text-sm text-slate-700 leading-relaxed">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Compass className="w-6 h-6 text-blue-900" />
            <span>সংগঠনের ইতিহাস ও প্রেক্ষাপট</span>
          </h2>
          <p>
            বাংলাদেশের শিল্প বিপ্লবের সূচনা থেকে বয়লার ছিল প্রতিটি কারখানার হৃদপিণ্ড। কিন্তু উচ্চচাপ ও উচ্চ তাপমাত্রায় পরিচালিত এই সংবেদনশীল যন্ত্রটি পরিচালনায় নিয়োজিত পরিচারকদের কোনো সুনির্দিষ্ট সামাজিক স্বীকৃতি, পেশাগত নিরাপত্তা ও নিয়মতান্ত্রিক ফোরাম ছিল না।
          </p>
          <p>
            এই প্রেক্ষাপটে ২০১৬ সালের শুরুতে রাজধানী ঢাকাসহ চট্টগ্রাম, নারায়ণগঞ্জ ও গাজীপুরের অগ্রণী বয়লার অপারেটর ও প্রকৌশলীদের উদ্যোগে ‘বাংলাদেশ বয়লার পরিচারক পরিষদ’ আত্মপ্রকাশ করে। পরবর্তীতে সরকারি নিয়মকানুন মেনে নিবন্ধন নং-বিওপি/২০১৬ এর অধীনে পরিষদ একটি প্রাতিষ্ঠানিক রূপ লাভ করে।
          </p>
          <p>
            বর্তমানে দেশের ৬৪টি জেলার মধ্যে ৩২টিরও বেশি শিল্প জেলায় পরিষদের সক্রিয় শাখা ও ৬৫টির অধিক আঞ্চলিক ইউনিট রয়েছে। সংগঠনের অধীনে প্রায় ১,২৫০ জনেরও বেশি নিবন্ধিত পেশাদার বয়লার পরিচারক ও প্রকৌশলী ঐক্যবদ্ধ আছেন।
          </p>
        </div>

        <div className="lg:col-span-5 bg-gradient-to-br from-blue-950 to-slate-900 text-white p-6 rounded-2xl border border-blue-900 shadow-lg space-y-4">
          <h3 className="text-base font-bold text-amber-400 border-b border-slate-700 pb-2">
            এক নজরে সংগঠনের মূল পরিচয়
          </h3>
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">সংগঠনের নাম (বাংলা):</span>
              <span className="font-semibold text-white">বাংলাদেশ বয়লার পরিচারক পরিষদ</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">ইংরেজি নাম:</span>
              <span className="text-slate-200">Bangladesh Boiler Operators Parishad</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">সংক্ষিপ্ত রূপ:</span>
              <span className="font-mono text-amber-400 font-bold">BBOP</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">প্রতিষ্ঠা সন:</span>
              <span className="text-white">২০১৬ খ্রিস্টাব্দ</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">ধরণ:</span>
              <span className="text-emerald-400 font-medium">অরাজনৈতিক পেশাজীবী সংস্থা</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">কেন্দ্রীয় কার্যালয়:</span>
              <span className="text-slate-300">তেজগাঁও শিল্প এলাকা, ঢাকা-১২০৮</span>
            </div>
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">আমাদের লক্ষ্য (Vision)</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            বাংলাদেশের সকল উৎপাদনমুখী শিল্পে আধুনিক ও জিরো-অ্যাকসিডেন্ট বয়লার অপারেশন নিশ্চিতকরণ এবং পরিচারকদের আন্তর্জাতিক মানের কারিগরি দক্ষতায় উন্নীত করে তাদের জন্য সম্মানজনক কর্মপরিবেশ ও সামাজিক নিরাপত্তা প্রতিষ্ঠা করা।
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Scale className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">আমাদের উদ্দেশ্য (Mission)</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            ১ম, ২য় ও ৩য় শ্রেণির কম্পিটেন্সি সনদধারী অপারেটরদের আইনগত অধিকার সুরক্ষা, সনদ নবায়নে সহায়ক ভূমিকা পালন, নিয়মিত নিরাপত্তা প্রশিক্ষণ পরিচালনা এবং দুর্ঘটনাকবলিত ও অসুস্থ সদস্যদের পাশে দাঁড়ানো।
          </p>
        </div>
      </div>

      {/* Boiler Legislation & Standards */}
      <div className="bg-slate-100 rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-4">
        <h3 className="text-xl font-bold text-slate-900">
          বয়লার আইন ২০২৩ ও পরিষদের ভূমিকা
        </h3>
        <p className="text-xs text-slate-700 leading-relaxed">
          জাতীয় সংসদে পাসকৃত <strong>‘বয়লার আইন ২০২৩’</strong> বাংলাদেশের শিল্প ইতিহাসে একটি যুগান্তকারী মাইলফলক। পরিষদ এই আইন প্রণয়ন প্রক্রিয়ায় প্রধান বয়লার পরিদর্শকের কার্যালয়ের সাথে ঘনিষ্ঠ মতবিনিময়ের মাধ্যমে পরিচারকদের দীর্ঘদিনের দাবি—লাইসেন্সধারী ব্যতীত বয়লার পরিচালনা নিষিদ্ধকরণ, ঝুঁকিভাতা ও নিয়মিত স্বাস্থ্য পরীক্ষা অন্তর্ভুক্তিতে কার্যকর সুপারিশমালা পেশ করেছিল।
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold text-blue-900 mb-1">১ম শ্রেণি লাইসেন্স</h4>
            <p className="text-[11px] text-slate-600">উচ্চ ক্ষমতা সম্পন্ন বৃহৎ স্টীম টারবাইন ও ওয়াটার টিউব বয়লার পরিচালনার যোগ্যতা।</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold text-blue-900 mb-1">২য় শ্রেণি লাইসেন্স</h4>
            <p className="text-[11px] text-slate-600">মাঝারি শিল্প ইউনিট ও প্যাকেজড ফায়ার টিউব বয়লার অপারেশন ও প্রেসার নিয়ন্ত্রণ।</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold text-blue-900 mb-1">৩য় শ্রেণি লাইসেন্স</h4>
            <p className="text-[11px] text-slate-600">সহকারী বয়লার পরিচারক, ওয়াটার ট্রিটমেন্ট ও সেফটি গেজ মনিটরিং বিশেষজ্ঞ।</p>
          </div>
        </div>
      </div>
    </div>
  );
};
