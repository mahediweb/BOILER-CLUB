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
        <div className="flex items-center justify-between h-16">
          {/* Logo & Org Title */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-[#d4af37] shadow-sm shrink-0">
              <Flame className="w-5 h-5 text-[#001f3f]" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold leading-none text-white tracking-tight">
                বাংলাদেশ বয়লার পরিচারক পরিষদ
              </h1>
              <p className="text-[10px] tracking-widest uppercase text-[#d4af37] font-semibold mt-1">
                Bangladesh Boiler Operators Parishad
              </p>
            </div>
          </div>

          {/* Quick Header CTA Action Buttons */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              id="header-search-btn"
              onClick={openSearchModal}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-[#002b5b] rounded transition-colors"
              title="খুঁজুন (সদস্য, নোটিশ, ডকুমেন্ট)"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              id="header-member-portal-btn"
              onClick={() => handleNavClick('member-portal')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded font-bold text-xs transition-all ${
                currentTab === 'member-portal'
                  ? 'bg-white text-[#001f3f]'
                  : 'bg-[#d4af37] text-[#001f3f] hover:brightness-110'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>লগইন / পোর্টাল</span>
            </button>

            <button
              id="header-admin-dashboard-btn"
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded font-bold text-xs transition-all border ${
                currentTab === 'admin'
                  ? 'bg-amber-500 text-slate-950 border-amber-400'
                  : 'bg-[#00152b] text-[#d4af37] hover:bg-[#002b5b] border-[#d4af37]/40'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>অ্যাডমিন প্যানেল</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="header-mobile-search-btn"
              onClick={openSearchModal}
              className="p-1.5 text-slate-200 hover:bg-[#002b5b] rounded"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              id="header-mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-200 hover:bg-[#002b5b] rounded focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Primary Navigation Bar (Desktop) */}
      <nav className="hidden lg:block bg-[#00152b] border-t border-[#002b5b] text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <ul className="flex items-center space-x-1 py-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    id={`nav-item-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-2.5 py-1.5 text-xs font-semibold rounded transition-colors ${
                      currentTab === item.id
                        ? 'bg-[#002b5b] text-white border-b-2 border-[#d4af37]'
                        : 'hover:text-[#d4af37] text-slate-200 hover:bg-[#002b5b]/50'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center space-x-2 py-1">
              <button
                onClick={() => handleNavClick('contact')}
                className="bg-[#d4af37] hover:brightness-110 text-[#001f3f] px-3 py-1 rounded font-bold text-xs transition-colors flex items-center gap-1"
              >
                <span>অনলাইন মেম্বারশিপ আবেদন</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#00152b] text-white border-t border-slate-800 px-4 pt-3 pb-6 space-y-2 shadow-2xl">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full flex items-center justify-center gap-2 bg-[#d4af37] text-[#001f3f] font-bold py-2 px-3 rounded text-xs"
            >
              <LayoutDashboard className="w-4 h-4" />
              অ্যাডমিন ড্যাশবোর্ড
            </button>
            <button
              onClick={() => handleNavClick('member-portal')}
              className="w-full flex items-center justify-center gap-2 bg-[#002b5b] text-white font-semibold py-2 px-3 rounded text-xs border border-slate-700"
            >
              <UserCheck className="w-4 h-4" />
              সদস্য পোর্টাল
            </button>
          </div>

          <ul className="space-y-1 pt-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                    currentTab === item.id
                      ? 'bg-[#002b5b] text-[#d4af37] font-bold border-l-4 border-[#d4af37]'
                      : 'text-slate-200 hover:bg-[#002b5b]'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li className="pt-2">
              <button
                onClick={() => handleNavClick('architecture')}
                className="w-full text-left px-3 py-2 rounded text-sm bg-[#002b5b] text-[#d4af37] font-semibold flex items-center gap-2 border border-slate-700"
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
