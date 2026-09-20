import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  Shield, 
  UserCheck, 
  LayoutDashboard, 
  Menu, 
  X, 
  Search, 
  FileCode, 
  Flame, 
  Bell, 
  ExternalLink 
} from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  unreadNoticeCount?: number;
  openLoginModal: () => void;
  openSearchModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  unreadNoticeCount = 3,
  openLoginModal,
  openSearchModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<'bn' | 'en'>('bn');

  const navItems = [
    { id: 'home', label: 'হোম' },
    { id: 'about', label: 'আমাদের সম্পর্কে' },
    { id: 'committee', label: 'কেন্দ্রীয় কমিটি' },
    { id: 'members', label: 'সদস্যবৃন্দ' },
    { id: 'branches', label: 'শাখা কমিটি' },
    { id: 'notices', label: 'নোটিশ' },
    { id: 'news', label: 'সংবাদ ও কার্যক্রম' },
    { id: 'finance', label: 'আয়-ব্যয়' },
    { id: 'gallery', label: 'গ্যালারি' },
    { id: 'documents', label: 'ডকুমেন্ট' },
    { id: 'contact', label: 'যোগাযোগ ও নিবন্ধন' },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#001f3f] text-white shadow-md border-b-4 border-[#d4af37]">
      {/* Top Bar */}
      <div className="bg-[#00152b] text-slate-300 text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Organization Identity & Contact */}
          <div className="flex items-center space-x-4 flex-wrap">
            <span className="font-bold text-[#d4af37] flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#d4af37]" />
              বাংলাদেশ বয়লার পরিচারক পরিষদ
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden sm:flex items-center gap-1 text-slate-300">
              <Phone className="w-3 h-3 text-slate-400" />
              ০১৭১১-২৩৪৫৬৭, ০২-৯৯৭৭৮৮
            </span>
            <span className="hidden lg:flex items-center gap-1 text-slate-300">
              <Mail className="w-3 h-3 text-slate-400" />
              info@boiler-bd.org
            </span>
          </div>

          {/* Right: Quick actions & Language */}
          <div className="flex items-center space-x-3">
            <button 
              id="topbar-notice-ticker"
              onClick={() => handleNavClick('notices')}
              className="flex items-center gap-1 text-[#d4af37] hover:brightness-125 transition-all bg-[#001f3f] px-2 py-0.5 rounded border border-[#d4af37]/40 text-[11px]"
            >
              <Bell className="w-3 h-3 text-[#d4af37]" />
              <span className="truncate max-w-[170px] sm:max-w-xs">জাতীয় সম্মেলন ও পরিষদ সভা ২৫ অক্টোবর</span>
            </button>

            <button
              id="header-arch-btn"
              onClick={() => handleNavClick('architecture')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                currentTab === 'architecture' 
                  ? 'bg-[#d4af37] text-[#001f3f] font-bold' 
                  : 'bg-[#002b5b] hover:bg-[#003875] text-slate-200 border border-slate-700'
              }`}
            >
              <FileCode className="w-3 h-3" />
              <span>আর্কিটেকচার ও স্কিমা (১৯ রিকোয়ারমেন্ট)</span>
            </button>

            <div className="hidden sm:flex items-center bg-[#00152b] rounded px-1.5 py-0.5 border border-slate-700 text-[11px]">
              <button 
                onClick={() => setLang('bn')} 
                className={`px-1.5 py-0.2 rounded font-bold ${lang === 'bn' ? 'bg-[#d4af37] text-[#001f3f]' : 'text-slate-400 hover:text-white'}`}
              >
                বাংলা
              </button>
              <span className="text-slate-600 mx-0.5">/</span>
              <button 
                onClick={() => setLang('en')} 
                className={`px-1.5 py-0.2 rounded font-bold ${lang === 'en' ? 'bg-[#d4af37] text-[#001f3f]' : 'text-slate-400 hover:text-white'}`}
              >
                ENG
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Org Title */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            <Logo size="lg" className="w-12 h-12 sm:w-14 sm:h-14 transition-transform group-hover:scale-105" />
            <div>
              <h1 className="text-lg sm:text-2xl font-extrabold leading-tight text-white tracking-tight">
                বাংলাদেশ বয়লার পরিচারক পরিষদ
              </h1>
              <p className="text-xs sm:text-xs tracking-wider uppercase text-[#d4af37] font-semibold mt-0.5">
                Bangladesh Boiler Operators Parishad
              </p>
            </div>
          </div>

          {/* Quick Header CTA Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              id="header-search-btn"
              onClick={openSearchModal}
              className="p-2.5 text-slate-300 hover:text-white hover:bg-[#002b5b] rounded-xl transition-colors border border-slate-700/60"
              title="খুঁজুন (সদস্য, নোটিশ, ডকুমেন্ট)"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              id="header-member-portal-btn"
              onClick={() => handleNavClick('member-portal')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all shadow-sm ${
                currentTab === 'member-portal'
                  ? 'bg-white text-[#001f3f]'
                  : 'bg-[#d4af37] text-[#001f3f] hover:brightness-110'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>লগইন / পোর্টাল</span>
            </button>

            <button
              id="header-admin-dashboard-btn"
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all border shadow-sm ${
                currentTab === 'admin'
                  ? 'bg-amber-500 text-slate-950 border-amber-400'
                  : 'bg-[#00152b] text-[#d4af37] hover:bg-[#002b5b] border-[#d4af37]/40'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-[#d4af37]" />
              <span>অ্যাডমিন প্যানেল</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="header-mobile-search-btn"
              onClick={openSearchModal}
              className="p-2 text-slate-200 hover:bg-[#002b5b] rounded-lg border border-slate-700/60"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              id="header-mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-200 hover:bg-[#002b5b] rounded-lg border border-slate-700/60 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-amber-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Primary Navigation Bar (Desktop) - Enhanced Size & Typography */}
      <nav className="hidden lg:block bg-[#00152b] border-t border-[#002b5b] text-slate-200 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2">
            <ul className="flex items-center flex-wrap gap-1.5 xl:gap-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    id={`nav-item-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3.5 py-2 text-sm xl:text-[15px] font-bold rounded-lg transition-all ${
                      currentTab === item.id
                        ? 'bg-[#002b5b] text-[#d4af37] shadow-sm ring-1 ring-[#d4af37]/50 border-b-2 border-[#d4af37]'
                        : 'text-slate-200 hover:text-[#d4af37] hover:bg-[#002b5b]/60'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center space-x-2 shrink-0 pl-2">
              <button
                onClick={() => handleNavClick('contact')}
                className="bg-gradient-to-r from-[#d4af37] to-amber-500 hover:brightness-110 text-[#001f3f] px-4 py-2 rounded-xl font-extrabold text-sm transition-all shadow flex items-center gap-1.5"
              >
                <span>অনলাইন আবেদন</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation - Full Touch-Friendly & Larger Text */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#00152b] text-white border-t-2 border-[#d4af37]/40 px-4 pt-4 pb-8 space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-800">
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full flex items-center justify-center gap-2 bg-[#d4af37] hover:bg-amber-400 text-[#001f3f] font-bold py-3 px-3 rounded-xl text-sm shadow"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>অ্যাডমিন ড্যাশবোর্ড</span>
            </button>
            <button
              onClick={() => handleNavClick('member-portal')}
              className="w-full flex items-center justify-center gap-2 bg-[#002b5b] hover:bg-[#003875] text-white font-bold py-3 px-3 rounded-xl text-sm border border-slate-700 shadow"
            >
              <UserCheck className="w-4 h-4 text-[#d4af37]" />
              <span>সদস্য পোর্টাল</span>
            </button>
          </div>

          <ul className="space-y-1.5 pt-1 max-h-[60vh] overflow-y-auto pr-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-bold transition-all flex items-center justify-between ${
                    currentTab === item.id
                      ? 'bg-[#002b5b] text-[#d4af37] border-l-4 border-[#d4af37] shadow-inner'
                      : 'text-slate-200 hover:bg-[#002b5b]/60 active:bg-[#002b5b]'
                  }`}
                >
                  <span>{item.label}</span>
                  {currentTab === item.id && (
                    <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
                  )}
                </button>
              </li>
            ))}
            <li className="pt-2">
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full text-center px-4 py-3 rounded-xl text-sm font-extrabold bg-[#d4af37] text-[#001f3f] shadow"
              >
                অনলাইন মেম্বারশিপ আবেদন
              </button>
            </li>
            <li className="pt-1">
              <button
                onClick={() => handleNavClick('architecture')}
                className="w-full text-left px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#002b5b]/70 text-[#d4af37] font-semibold flex items-center gap-2 border border-slate-800"
              >
                <FileCode className="w-4 h-4 text-[#d4af37]" />
                আর্কিটেকচার ও ১৯ রিকোয়ারমেন্টস
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
