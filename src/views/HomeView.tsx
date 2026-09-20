import React, { useState } from 'react';
import { 
  Flame, 
  Users, 
  Building2, 
  FileText, 
  DollarSign, 
  Newspaper, 
  Image as ImageIcon, 
  BookOpen, 
  PhoneCall, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  ChevronRight, 
  Download, 
  Calendar, 
  MapPin, 
  TrendingUp, 
  AlertCircle,
  ExternalLink,
  ChevronLeft
} from 'lucide-react';
import { Member, Notice, NewsItem, CommitteeMember } from '../types';
import { Logo } from '../components/Logo';

interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
  notices: Notice[];
  news: NewsItem[];
  committee: CommitteeMember[];
  onSelectNotice: (notice: Notice) => void;
  onSelectMember: (memberId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setCurrentTab,
  notices,
  news,
  committee,
  onSelectNotice,
  onSelectMember
}) => {
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  const heroSlides = [
    {
      title: 'ঐক্য, দক্ষতা, নিরাপত্তা ও অধিকার রক্ষায় আমাদের অঙ্গীকার',
      subtitle: 'বাংলাদেশের সকল শ্রেণির বয়লার পরিচারক ও পেশাদার প্রকৌশলীদের একমাত্র জাতীয় প্ল্যাটফর্ম',
      badge: 'জাতীয় শিল্পে নিরাপত্তা ও অগ্রগতি',
      bgGradient: 'from-blue-950 via-slate-900 to-blue-900',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200'
    },
    {
      title: 'উচ্চচাপ স্টীম বয়লার আধুনিকায়ন ও কারিগরি প্রশিক্ষণ কর্মসূচি',
      subtitle: 'দক্ষ জনবল গড়ে তুলতে দেশব্যাপী নিয়মিত হ্যান্ডস-অন ওয়ার্কশপ ও সেফটি অডিট',
      badge: 'দক্ষতা বৃদ্ধি ও সার্টিফিকেশন',
      bgGradient: 'from-slate-950 via-blue-950 to-slate-900',
      image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200'
    }
  ];

  const quickAccessCards = [
    { id: 'members', title: 'সদস্য তালিকা', desc: 'সকল নিবন্ধিত অপারেটর ডিরেক্টরি', icon: Users, color: 'from-blue-700 to-blue-900', badge: '১,২৫০+ সদস্য' },
    { id: 'committee', title: 'কেন্দ্রীয় কমিটি', desc: 'কার্যনির্বাহী পরিষদ ২০২৪-২০২৬', icon: Award, color: 'from-amber-600 to-amber-800', badge: '২৫ জন নেতা' },
    { id: 'notices', title: 'নোটিশ বোর্ড', desc: 'জরুরি বিজ্ঞপ্তি ও পরিপত্র', icon: FileText, color: 'from-rose-700 to-rose-900', badge: 'সর্বশেষ' },
    { id: 'finance', title: 'আয়-ব্যয় হিসাব', desc: 'স্বচ্ছ আর্থিক হিসাব ও ব্যালেন্স', icon: DollarSign, color: 'from-emerald-700 to-emerald-900', badge: 'নিরীক্ষিত' },
    { id: 'news', title: 'সংবাদ ও কার্যক্রম', desc: 'সেমিনার, সম্মেলন ও ট্রেনিং', icon: Newspaper, color: 'from-indigo-700 to-indigo-900', badge: 'হালনাগাদ' },
    { id: 'gallery', title: 'ফটো গ্যালারি', desc: 'বিভিন্ন অনুষ্ঠানের আলোকচিত্র', icon: ImageIcon, color: 'from-purple-700 to-purple-900', badge: 'অ্যালবাম' },
    { id: 'documents', title: 'ডকুমেন্ট সেন্টার', desc: 'গঠনতন্ত্র, গেজেট ও আবেদন ফরম', icon: BookOpen, color: 'from-teal-700 to-teal-900', badge: 'ডাউনলোড' },
    { id: 'contact', title: 'যোগাযোগ ও আবেদন', desc: 'নতুন সদস্য ভর্তি ও অফিস ঠিকানা', icon: PhoneCall, color: 'from-slate-700 to-slate-900', badge: 'অনলাইন' }
  ];

  const president = committee.find((c) => c.position === 'সভাপতি') || committee[0];
  const generalSecretary = committee.find((c) => c.position === 'সাধারণ সম্পাদক') || committee[2];

  return (
    <div className="space-y-14 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="relative min-h-[480px] lg:min-h-[540px] flex items-center">
          {/* Background image overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src={heroSlides[activeHeroSlide].image} 
              alt="Boiler Industry" 
              className="w-full h-full object-cover opacity-25 filter brightness-75 scale-105 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-blue-950/70" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
            <div className="max-w-3xl space-y-6">
              {/* Official Organization Brand Strip */}
              <div className="flex items-center gap-3.5 bg-slate-900/80 border border-[#d4af37]/40 p-2.5 rounded-2xl max-w-fit backdrop-blur-md shadow-lg">
                <Logo size="lg" className="w-12 h-12 sm:w-14 sm:h-14" />
                <div>
                  <div className="inline-flex items-center gap-2 text-[#d4af37] text-xs font-bold">
                    <span>বাংলাদেশ বয়লার পরিচারক পরিষদ</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-slate-300 font-normal">স্থাপিত: ০১ জানুয়ারি ২০২২</span>
                  </div>
                  <p className="text-[11px] text-slate-300">দক্ষতা ও নিরাপত্তায় নিবেদিত • পেশাজীবী সংগঠন</p>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight font-['Hind_Siliguri',sans-serif]">
                {heroSlides[activeHeroSlide].title}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
                {heroSlides[activeHeroSlide].subtitle}
              </p>

              {/* Call to Actions */}
              <div className="flex flex-wrap items-center gap-3.5 pt-3">
                <button
                  id="hero-members-btn"
                  onClick={() => setCurrentTab('members')}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-lg hover:shadow-amber-500/20 flex items-center gap-2 group"
                >
                  <span>সদস্য তালিকা দেখুন</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  id="hero-notices-btn"
                  onClick={() => setCurrentTab('notices')}
                  className="bg-slate-800/90 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors border border-slate-700 flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>সর্বশেষ নোটিশ</span>
                </button>

                <button
                  id="hero-register-btn"
                  onClick={() => setCurrentTab('contact')}
                  className="bg-blue-900 hover:bg-blue-800 text-white font-semibold px-5 py-3 rounded-xl text-sm transition-colors border border-blue-700 flex items-center gap-2"
                >
                  <span>অনলাইন মেম্বারশিপ আবেদন</span>
                </button>
              </div>
            </div>
          </div>

          {/* Slider control dots */}
          <div className="absolute bottom-5 right-8 z-20 flex items-center space-x-2">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveHeroSlide(idx)}
                className={`h-2.5 rounded-full transition-all ${
                  activeHeroSlide === idx ? 'w-8 bg-amber-400' : 'w-2.5 bg-slate-600'
                }`}
                title={`স্লাইড ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Emergency Ticker Strip */}
        <div className="bg-red-950/90 border-t border-b border-red-900/60 py-2.5 px-4 text-xs text-red-100 flex items-center justify-between">
          <div className="max-w-7xl mx-auto flex items-center gap-3 w-full overflow-hidden">
            <span className="bg-red-600 text-white font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider shrink-0 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              জরুরি নোটিশ
            </span>
            <div className="truncate text-red-100">
              {notices[0]?.title || '২৫ অক্টোবর ২০২৬: জাতীয় সম্মেলন ও সাধারণ পরিষদ সভার চূড়ান্ত তারিখ ঘোষণা করা হয়েছে।'}
            </div>
            <button 
              onClick={() => setCurrentTab('notices')}
              className="text-amber-300 hover:underline shrink-0 text-xs font-semibold ml-auto"
            >
              বিস্তারিত পড়ুন
            </button>
          </div>
        </div>
      </section>

      {/* 2. QUICK ACCESS SECTION (8 Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-blue-900 font-bold text-xs uppercase tracking-widest bg-blue-100/80 px-3 py-1 rounded-full">
            দ্রুত সেবা ও পোর্টাল লিঙ্ক
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            এক নজরে গুরুত্বপূর্ণ সেবাসমূহ
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {quickAccessCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => setCurrentTab(card.id)}
                className="group relative bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-200 cursor-pointer hover:-translate-y-1 overflow-hidden"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center shadow-md shadow-slate-900/10 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                    {card.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                  {card.desc}
                </p>
                <div className="mt-4 flex items-center text-xs font-semibold text-blue-900 gap-1 group-hover:gap-2 transition-all">
                  <span>প্রবেশ করুন</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. PRESIDENT & GENERAL SECRETARY MESSAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* President Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full pointer-events-none" />
            <div>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={president.photoUrl}
                  alt={president.name}
                  className="w-20 h-24 rounded-xl object-cover border-2 border-amber-500/80 shadow-md bg-slate-100"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                    {president.position} এর বাণী
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">{president.name}</h3>
                  <p className="text-xs text-slate-500">{president.workplace} • {president.district}</p>
                </div>
              </div>

              <div className="text-sm text-slate-600 leading-relaxed space-y-2 italic bg-slate-50 p-4 rounded-xl border border-slate-200/60 font-serif">
                “শিল্প সমৃদ্ধ বাংলাদেশ বিনির্মাণে বয়লার পরিচারকদের পেশাগত অবদান অনস্বীকার্য। কারখানায় সর্বোচ্চ সতর্কতা, নিরাপদ বয়লার পরিচালনা ও নিয়মতান্ত্রিক রক্ষণাবেক্ষণই আমাদের অগ্রাধিকার। সকল সদস্যকে ঐক্যবদ্ধ থেকে পরিষদের সাংগঠনিক শক্তি বৃদ্ধির উদাত্ত আহ্বান জানাই।”
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">কার্যকাল: ২০২৪-২০২৬</span>
              <button
                onClick={() => setCurrentTab('committee')}
                className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1"
              >
                <span>কমিটি প্রোফাইল</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* General Secretary Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full pointer-events-none" />
            <div>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={generalSecretary.photoUrl}
                  alt={generalSecretary.name}
                  className="w-20 h-24 rounded-xl object-cover border-2 border-blue-900/80 shadow-md bg-slate-100"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="text-xs font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                    {generalSecretary.position} এর বাণী
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">{generalSecretary.name}</h3>
                  <p className="text-xs text-slate-500">{generalSecretary.workplace} • {generalSecretary.district}</p>
                </div>
              </div>

              <div className="text-sm text-slate-600 leading-relaxed space-y-2 italic bg-slate-50 p-4 rounded-xl border border-slate-200/60 font-serif">
                “ডিজিটাল এই পোর্টালের মাধ্যমে কেন্দ্রীয় পরিষদ ও তৃণমূল সদস্যদের মধ্যকার সেতুবন্ধন রচিত হলো। আমাদের মূল লক্ষ্য—বয়লার আইন ২০২৩ এর আলোকে কর্মীদের ঝুঁকিভাতা নিশ্চিতকরণ, নিয়মিত নবায়ন প্রশিক্ষণ এবং পেশাগত মর্যাদার সুরক্ষা।”
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">কার্যকাল: ২০২৪-২০২৬</span>
              <button
                onClick={() => setCurrentTab('committee')}
                className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1"
              >
                <span>কমিটি প্রোফাইল</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ABOUT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-blue-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden border border-blue-900">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-5">
              <span className="bg-amber-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                আমাদের সম্পর্কে (About Us)
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug">
                বাংলাদেশ বয়লার পরিচারক পরিষদ: শিল্পের প্রাণশক্তি ও সুরক্ষার বিশ্বস্ত অভিভাবক
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                ২০১৬ সালে প্রতিষ্ঠিত ‘বাংলাদেশ বয়লার পরিচারক পরিষদ’ দেশের বয়লার পরিচালকদের একটি অরাজনৈতিক, স্বাধীন ও নিবন্ধিত পেশাজীবী সংগঠন। দেশের টেক্সটাইল, বিদ্যুৎ উৎপাদন, ফার্টিলাইজার, কেমিক্যাল, ফার্মাসিউটিক্যালস, সিমেন্ট, পেপার এবং ভারী শিল্প কারখানার উচ্চচাপ বয়লারের নিরাপদ পরিচালনা ও শিল্প উৎপাদন নির্বিঘ্ন রাখতে আমাদের সদস্যরা দিনরাত কাজ করছেন।
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10">
                  <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">পেশাগত নিরাপত্তা ও আইন</h4>
                    <p className="text-[11px] text-slate-400">বয়লার আইন ২০২৩ অনুযায়ী শতভাগ নিরাপত্তা মান নিশ্চিতকরণ।</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10">
                  <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">দক্ষতা বৃদ্ধি ও প্রশিক্ষণ</h4>
                    <p className="text-[11px] text-slate-400">হ্যান্ডস-অন ট্রেনিং, সিমুলেশন ও লাইসেন্স নবায়ন গাইডলাইন।</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setCurrentTab('about')}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-colors shadow"
                >
                  <span>আরও বিস্তারিত জানুন</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 space-y-4">
                <h3 className="text-base font-bold text-amber-300 border-b border-slate-700 pb-3">
                  সংগঠনের ৪টি মূল স্তম্ভ
                </h3>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0 text-[10px]">১</span>
                    <span><strong>ঐক্য:</strong> সারাদেশের ১ম, ২য় ও ৩য় শ্রেণির সকল বয়লার পরিচারকদের সুদৃঢ় জাতীয় ভ্রাতৃত্ব।</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0 text-[10px]">২</span>
                    <span><strong>দক্ষতা:</strong> আধুনিক স্বয়ংক্রিয় স্ক্যাডা/পিএলসি প্রযুক্তির সাথে খাপ খাইয়ে নেওয়ার নিয়মিত প্রশিক্ষণ।</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0 text-[10px]">৩</span>
                    <span><strong>নিরাপত্তা:</strong> বয়লার বিস্ফোরণ প্রতিরোধে জিরো অ্যাকসিডেন্ট নীতি বাস্তবায়ন।</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0 text-[10px]">৪</span>
                    <span><strong>অধিকার ও কল্যাণ:</strong> ঝুঁকিভাতা, চিকিৎসা সহায়তা ও অবসরকালীন সামাজিক সুরক্ষা।</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ORGANIZATION STATISTICS - High Density Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          <div className="bg-white p-3.5 rounded-lg border border-slate-200 border-l-4 border-[#001f3f] shadow-xs">
            <div className="text-2xl font-extrabold text-[#001f3f] font-mono">১,২৫০+</div>
            <p className="text-xs font-semibold text-slate-700 mt-0.5">মোট সদস্য</p>
            <span className="text-[10px] text-emerald-600 font-medium">দেশব্যাপী সক্রিয়</span>
          </div>

          <div className="bg-white p-3.5 rounded-lg border border-slate-200 border-l-4 border-blue-600 shadow-xs">
            <div className="text-2xl font-extrabold text-[#001f3f] font-mono">৩২+</div>
            <p className="text-xs font-semibold text-slate-700 mt-0.5">শিল্প জেলা</p>
            <span className="text-[10px] text-slate-500 font-medium">বিস্তৃত নেটওয়ার্ক</span>
          </div>

          <div className="bg-white p-3.5 rounded-lg border border-slate-200 border-l-4 border-sky-600 shadow-xs">
            <div className="text-2xl font-extrabold text-[#001f3f] font-mono">৬৫+</div>
            <p className="text-xs font-semibold text-slate-700 mt-0.5">শাখা কমিটি</p>
            <span className="text-[10px] text-slate-500 font-medium">আঞ্চলিক কেন্দ্র</span>
          </div>

          <div className="bg-white p-3.5 rounded-lg border border-slate-200 border-l-4 border-amber-500 shadow-xs">
            <div className="text-2xl font-extrabold text-amber-600 font-mono">২৫</div>
            <p className="text-xs font-semibold text-slate-700 mt-0.5">কেন্দ্রীয় কমিটি</p>
            <span className="text-[10px] text-slate-500 font-medium">২০২৪-২০২৬ সেশন</span>
          </div>

          <div className="bg-white p-3.5 rounded-lg border border-slate-200 border-l-4 border-emerald-600 shadow-xs">
            <div className="text-2xl font-extrabold text-emerald-700 font-mono">১৪০+</div>
            <p className="text-xs font-semibold text-slate-700 mt-0.5">মোট কার্যক্রম</p>
            <span className="text-[10px] text-slate-500 font-medium">ট্রেনিং ও সম্মেলন</span>
          </div>

          <div className="bg-white p-3.5 rounded-lg border border-slate-200 border-l-4 border-[#d4af37] shadow-xs">
            <div className="text-2xl font-extrabold text-[#001f3f] font-mono">৮৫+</div>
            <p className="text-xs font-semibold text-slate-700 mt-0.5">অফিসিয়াল নোটিশ</p>
            <span className="text-[10px] text-slate-500 font-medium">ডিজিটাল আর্কাইভ</span>
          </div>
        </div>
      </section>

      {/* 6. LATEST NOTICES & ANNOUNCEMENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-rose-700 font-bold text-xs uppercase tracking-wider bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
              অফিশিয়াল নোটিশ বোর্ড
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-2">
              সর্বশেষ নোটিশ ও বিজ্ঞপ্তি
            </h2>
          </div>
          <button
            onClick={() => setCurrentTab('notices')}
            className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1.5 bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg transition-colors"
          >
            <span>সকল নোটিশ দেখুন</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notices.slice(0, 3).map((notice) => (
            <div
              key={notice.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    notice.category === 'জরুরি' 
                      ? 'bg-red-100 text-red-700 border border-red-200' 
                      : notice.category === 'সভা'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {notice.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {notice.publishDate}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug">
                  {notice.title}
                </h3>

                <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                  {notice.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => onSelectNotice(notice)}
                  className="font-semibold text-blue-900 hover:underline flex items-center gap-1"
                >
                  <span>সম্পূর্ণ পড়ুন</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                {notice.attachmentName && (
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Download className="w-3 h-3 text-slate-500" />
                    PDF সংযুক্ত
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FINANCIAL TRANSPARENCY SECTION (Req 14) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                আর্থিক স্বচ্ছতা ও হিসাব জবাবদিহিতা
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
                সংগঠনের আর্থিক স্থিতি ও তহবিল চিত্র
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                সর্বশেষ অভ্যন্তরীণ নিরীক্ষা প্রতিবেদন: <span className="text-amber-400 font-semibold">সেপ্টেম্বর ২০২৬ (অডিট কমিটি দ্বারা পরীক্ষিত)</span>
              </p>
            </div>

            <button
              onClick={() => setCurrentTab('finance')}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-colors shadow"
            >
              <span>পূর্ণাঙ্গ আয়-ব্যয় বিবরণী দেখুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
            {/* Total Income */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>মোট আয় (চলতি অর্থবছর)</span>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono mt-2">
                ৳ ৫৪,৮৫,২০০
              </div>
              <p className="text-[11px] text-slate-400 mt-1">সদস্য চাঁদা, ভর্তি ফি ও কল্যাণ অনুদান</p>
            </div>

            {/* Total Expense */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>মোট ব্যয় (চলতি অর্থবছর)</span>
                <DollarSign className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-rose-400 font-mono mt-2">
                ৳ ৪২,১৫,০০০
              </div>
              <p className="text-[11px] text-slate-400 mt-1">অফিস পরিচালনা, ট্রেনিং ও সম্মেলন খরচ</p>
            </div>

            {/* Current Balance */}
            <div className="bg-blue-900/60 border border-amber-500/40 rounded-2xl p-5 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-amber-300">
                <span className="font-semibold">বর্তমান ব্যালেন্স (Cash & Bank)</span>
                <ShieldCheck className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-amber-300 font-mono mt-2">
                ৳ ১২,৭০,২০০
              </div>
              <p className="text-[11px] text-slate-300 mt-1">সোনালী, ইসলামী ও ডাচ্-বাংলা ব্যাংকে রক্ষিত</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. LATEST NEWS & ACTIVITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-blue-900 font-bold text-xs uppercase tracking-wider bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              সংবাদ ও কার্যক্রম
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-2">
              সাম্প্রতিক তৎপরতা ও সাংগঠনিক অনুষ্ঠান
            </h2>
          </div>
          <button
            onClick={() => setCurrentTab('news')}
            className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1"
          >
            <span>সকল সংবাদ</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={item.featuredImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 bg-blue-950/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs">
                    {item.category}
                  </span>
                </div>
                <div className="p-5">
                  <span className="text-xs text-slate-400 block mb-1">{item.date}</span>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-blue-900 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => setCurrentTab('news')}
                  className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1"
                >
                  <span>সম্পূর্ণ প্রতিবেদন</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. CALL TO ACTION BANNER - High Density Design */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#001f3f] rounded-lg p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4 border-t-2 border-[#d4af37] shadow-md">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg font-bold tracking-tight text-white">
              বাংলাদেশ বয়লার পরিচারক পরিষদ — সদস্য অন্তর্ভুক্তি
            </h3>
            <p className="text-xs text-[#d4af37] italic font-semibold">
              “ঐক্য, দক্ষতা, নিরাপত্তা ও অধিকার সুরক্ষায় অঙ্গীকারবদ্ধ জাতীয় প্ল্যাটফর্ম”
            </p>
            <p className="text-xs text-slate-300">
              আজই ডিজিটাল সদস্যপদ গ্রহণ করে পেশাগত নিরাপত্তা ও কল্যাণ সুরক্ষা নিশ্চিত করুন।
            </p>
          </div>
          <button
            onClick={() => setCurrentTab('contact')}
            className="bg-[#d4af37] hover:brightness-110 text-[#001f3f] px-5 py-2.5 rounded font-bold text-xs uppercase transition-colors shrink-0 shadow flex items-center gap-1.5"
          >
            <span>সদস্য হওয়ার আবেদন ফরম</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
