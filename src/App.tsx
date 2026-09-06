import React, { useState, useEffect } from 'react';
import { 
  Member, 
  Notice, 
  NewsItem, 
  IncomeRecord, 
  ExpenseRecord, 
  Branch, 
  CommitteeMember, 
  DocumentItem, 
  AuditLog 
} from './types';
import { 
  mockMembers, 
  mockNotices, 
  mockNews, 
  mockIncomeRecords, 
  mockExpenseRecords, 
  mockBranches, 
  mockCommittees, 
  mockDocuments, 
  mockAuditLogs 
} from './data/mockData';

// Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MemberCardModal } from './components/MemberCardModal';
import { ReceiptModal } from './components/ReceiptModal';
import { SearchModal } from './components/SearchModal';

// Views
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { CommitteeView } from './views/CommitteeView';
import { MembersDirectoryView } from './views/MembersDirectoryView';
import { BranchesView } from './views/BranchesView';
import { NoticesView } from './views/NoticesView';
import { NewsActivitiesView } from './views/NewsActivitiesView';
import { FinanceView } from './views/FinanceView';
import { GalleryView } from './views/GalleryView';
import { DocumentsView } from './views/DocumentsView';
import { ContactRegisterView } from './views/ContactRegisterView';
import { MemberPortalView } from './views/MemberPortalView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { ArchitectureView } from './views/ArchitectureView';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<string>('home');

  // Shared Data States (Interactive across Portal & Admin)
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const [notices, setNotices] = useState<Notice[]>(mockNotices);
  const [news] = useState<NewsItem[]>(mockNews);
  const [incomeRecords, setIncomeRecords] = useState<IncomeRecord[]>(mockIncomeRecords);
  const [expenseRecords, setExpenseRecords] = useState<ExpenseRecord[]>(mockExpenseRecords);
  const [branches] = useState<Branch[]>(mockBranches);
  const [committees] = useState<CommitteeMember[]>(mockCommittees);
  const [documents] = useState<DocumentItem[]>(mockDocuments);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(mockAuditLogs);

  // Modal States
  const [cardMember, setCardMember] = useState<Member | null>(null);
  const [receiptRecord, setReceiptRecord] = useState<IncomeRecord | null>(null);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Auto-open MemberCardModal if member query parameter is present (from scanned QR code)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const memParam = params.get('member');
      if (memParam) {
        const found = members.find(
          (m) => m.memberId.toLowerCase() === memParam.toLowerCase() || m.id === memParam
        );
        if (found) {
          setCardMember(found);
        }
      }
    }
  }, [members]);

  // Registration Submission Handler
  const handleRegisterSubmit = (newMemberData: Partial<Member>) => {
    const newMember: Member = {
      id: `mem-${Date.now()}`,
      memberId: `BBOP-2026-${String(members.length + 1).padStart(3, '0')}`,
      nameBangla: newMemberData.nameBangla || 'নতুন আবেদনকারী',
      nameEnglish: newMemberData.nameEnglish || 'NEW APPLICANT',
      fatherName: newMemberData.fatherName || '',
      motherName: newMemberData.motherName || '',
      dateOfBirth: newMemberData.dob || '1990-01-01',
      dob: newMemberData.dob || '1990-01-01',
      bloodGroup: newMemberData.bloodGroup || 'B+',
      nidNo: newMemberData.nidNo || '',
      mobile: newMemberData.mobile || '',
      email: newMemberData.email || '',
      membershipType: 'সাধারণ সদস্য',
      status: 'পেন্ডিং',
      division: newMemberData.division || 'ঢাকা',
      district: newMemberData.district || 'ঢাকা',
      upazila: newMemberData.upazila || 'তেজগাঁও',
      presentAddress: newMemberData.presentAddress || '',
      permanentAddress: newMemberData.permanentAddress || '',
      workplace: newMemberData.workplace || '',
      designation: newMemberData.designation || 'বয়লার অপারেটর',
      experienceYears: newMemberData.experienceYears || 5,
      boilerLicenseNo: newMemberData.boilerLicenseNo || `BL-2026-${Math.floor(100 + Math.random() * 900)}`,
      boilerClass: '১ম শ্রেণি (First Class)',
      photoUrl: newMemberData.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      emergencyContact: newMemberData.emergencyContact || {
        name: 'জরুরি অভিভাবক',
        relation: 'পিতা',
        phone: '০১৭১২-০০০০০০'
      }
    };

    setMembers((prev) => [newMember, ...prev]);

    // Add audit log
    const log: AuditLog = {
      id: `log-${Date.now()}`,
      user: 'অনলাইন নিবন্ধন পোর্টাল',
      userName: 'অনলাইন নিবন্ধন পোর্টাল',
      userRole: 'Public Visitor',
      action: 'REGISTER_SUBMIT',
      module: 'MEMBER_REGISTRATION',
      details: `নতুন সদস্য আবেদন দাখিল: ${newMember.nameBangla} (${newMember.memberId})`,
      ip: '103.145.112.98',
      ipAddress: '103.145.112.98',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19)
    };
    setAuditLogs((prev) => [log, ...prev]);
  };

  // Switch tab with window scroll
  const handleNavClick = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If Admin view is active, render AdminDashboardView
  if (currentTab === 'admin') {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col">
        <AdminDashboardView
          members={members}
          setMembers={setMembers}
          notices={notices}
          setNotices={setNotices}
          incomeRecords={incomeRecords}
          setIncomeRecords={setIncomeRecords}
          expenseRecords={expenseRecords}
          setExpenseRecords={setExpenseRecords}
          auditLogs={auditLogs}
          setAuditLogs={setAuditLogs}
          branches={branches}
          onOpenCardModal={(m) => setCardMember(m)}
          onOpenReceiptModal={(r) => setReceiptRecord(r)}
          onExitAdmin={() => handleNavClick('home')}
        />

        {/* Global Modals for Admin previewing */}
        {cardMember && (
          <MemberCardModal
            member={cardMember}
            onClose={() => setCardMember(null)}
          />
        )}

        {receiptRecord && (
          <ReceiptModal
            record={receiptRecord}
            onClose={() => setReceiptRecord(null)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-['Hind_Siliguri',sans-serif]">
      {/* Institutional Topbar and Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={handleNavClick}
        unreadNoticeCount={notices.length}
        openLoginModal={() => handleNavClick('member-portal')}
        openSearchModal={() => setIsSearchOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            setCurrentTab={handleNavClick}
            notices={notices}
            news={news}
            committee={committees}
            onSelectNotice={(n) => {
              setSelectedNotice(n);
              handleNavClick('notices');
            }}
            onSelectMember={(memId) => {
              const found = members.find((m) => m.memberId === memId || m.id === memId);
              if (found) {
                setCardMember(found);
              } else {
                handleNavClick('members');
              }
            }}
          />
        )}

        {currentTab === 'about' && <AboutView />}

        {currentTab === 'committee' && <CommitteeView committee={committees} />}

        {currentTab === 'members' && (
          <MembersDirectoryView
            members={members}
            onOpenCardModal={(m) => setCardMember(m)}
          />
        )}

        {currentTab === 'branches' && <BranchesView branches={branches} />}

        {currentTab === 'notices' && (
          <NoticesView
            notices={notices}
            selectedNotice={selectedNotice}
            onSelectNotice={setSelectedNotice}
          />
        )}

        {currentTab === 'news' && <NewsActivitiesView news={news} />}

        {currentTab === 'finance' && (
          <FinanceView
            incomeRecords={incomeRecords}
            expenseRecords={expenseRecords}
            onOpenReceiptModal={(r) => setReceiptRecord(r)}
          />
        )}

        {currentTab === 'gallery' && <GalleryView />}

        {currentTab === 'documents' && <DocumentsView documents={documents} />}

        {currentTab === 'contact' && (
          <ContactRegisterView onRegisterSubmit={handleRegisterSubmit} />
        )}

        {currentTab === 'member-portal' && (
          <MemberPortalView
            members={members}
            onOpenCardModal={(m) => setCardMember(m)}
          />
        )}

        {currentTab === 'architecture' && <ArchitectureView />}
      </main>

      {/* Institutional Footer */}
      <Footer setCurrentTab={handleNavClick} />

      {/* Global Interactive Modals */}
      {cardMember && (
        <MemberCardModal
          member={cardMember}
          onClose={() => setCardMember(null)}
        />
      )}

      {receiptRecord && (
        <ReceiptModal
          record={receiptRecord}
          onClose={() => setReceiptRecord(null)}
        />
      )}

      {isSearchOpen && (
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          members={members}
          notices={notices}
          news={news}
          documents={documents}
          branches={branches}
          onSelectMember={(m) => {
            setIsSearchOpen(false);
            setCardMember(m);
          }}
          onSelectNotice={(n) => {
            setIsSearchOpen(false);
            setSelectedNotice(n);
            handleNavClick('notices');
          }}
          onSelectNews={() => {
            setIsSearchOpen(false);
            handleNavClick('news');
          }}
          onSelectDocument={() => {
            setIsSearchOpen(false);
            handleNavClick('documents');
          }}
          onSelectBranch={() => {
            setIsSearchOpen(false);
            handleNavClick('branches');
          }}
        />
      )}
    </div>
  );
}
