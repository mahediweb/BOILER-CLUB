import React, { useState, useMemo, useRef } from 'react';
import { Member } from '../types';
import { 
  Search, 
  Filter, 
  UserCheck, 
  MapPin, 
  Phone, 
  IdCard, 
  LayoutGrid, 
  Table as TableIcon, 
  Download, 
  Printer, 
  CheckCircle2, 
  X,
  Shield,
  Briefcase,
  FileText,
  Loader2,
  Calendar,
  Award
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Logo } from '../components/Logo';

interface MembersDirectoryViewProps {
  members: Member[];
  onOpenCardModal: (member: Member) => void;
}

export const MembersDirectoryView: React.FC<MembersDirectoryViewProps> = ({
  members,
  onOpenCardModal
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedBlood, setSelectedBlood] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedMemberModal, setSelectedMemberModal] = useState<Member | null>(null);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfSuccessMessage, setPdfSuccessMessage] = useState<string | null>(null);
  const pdfReportRef = useRef<HTMLDivElement>(null);

  // Extract unique filter lists
  const districts = useMemo(() => {
    return Array.from(new Set(members.map((m) => m.district))).sort();
  }, [members]);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      // Search matches
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        m.nameBangla.toLowerCase().includes(q) ||
        m.nameEnglish.toLowerCase().includes(q) ||
        m.memberId.toLowerCase().includes(q) ||
        m.mobile.includes(q) ||
        m.boilerLicenseNo.toLowerCase().includes(q) ||
        m.workplace.toLowerCase().includes(q);

      const matchesDistrict = selectedDistrict === 'all' || m.district === selectedDistrict;
      const matchesClass = selectedClass === 'all' || m.boilerClass === selectedClass;
      const matchesBlood = selectedBlood === 'all' || m.bloodGroup === selectedBlood;
      const matchesType = selectedType === 'all' || m.membershipType === selectedType;

      return matchesSearch && matchesDistrict && matchesClass && matchesBlood && matchesType;
    });
  }, [members, searchQuery, selectedDistrict, selectedClass, selectedBlood, selectedType]);

  const handleExportCSV = () => {
    const headers = 'MemberID,NameBangla,NameEnglish,District,BoilerClass,LicenseNo,Mobile,BloodGroup,MembershipType,Status\n';
    const rows = filteredMembers
      .map(
        (m) =>
          `"${m.memberId}","${m.nameBangla}","${m.nameEnglish}","${m.district}","${m.boilerClass}","${m.boilerLicenseNo}","${m.mobile}","${m.bloodGroup}","${m.membershipType}","${m.status}"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bbop-members-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadOfficialPdf = async () => {
    if (!pdfReportRef.current) return;
    setIsGeneratingPdf(true);
    setPdfSuccessMessage('অফিসিয়াল পিডিএফ রিপোর্ট প্রস্তুত হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...');

    try {
      const canvas = await html2canvas(pdfReportRef.current, {
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

      const pageWidth = 210;
      const pageHeight = 297;
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // First page
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Extra pages if long report
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const dateStr = new Date().toISOString().slice(0, 10);
      pdf.save(`BBOP_Official_Member_Report_${dateStr}.pdf`);
      setPdfSuccessMessage('অফিসিয়াল মেম্বার রিপোর্ট সফলভাবে PDF আকারে সংরক্ষিত হয়েছে!');
      setTimeout(() => setPdfSuccessMessage(null), 3500);
    } catch (err) {
      console.error('Error exporting PDF:', err);
      setPdfSuccessMessage('পিডিএফ তৈরিতে ত্রুটি হয়েছে। আপনি বিকল্প হিসেবে "প্রিন্ট" অপশন ব্যবহার করতে পারেন।');
      setTimeout(() => setPdfSuccessMessage(null), 4000);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-800 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
            সদস্য ডাটাবেজ
          </span>
          <h1 className="text-3xl font-bold text-slate-900 mt-2">
            নিবন্ধিত সদস্য ডিরেক্টরি
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            সারাদেশের অনুমোদিত বয়লার পরিচারক ও প্রকৌশলীদের তালিকা ও মেম্বার প্রোফাইল।
          </p>
        </div>

        {/* View Switcher & Export */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="কার্ড ভিউ"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'table' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="টেবিল ভিউ"
            >
              <TableIcon className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setIsPdfModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
            title="অফিসিয়াল রেকর্ড ও আর্কাইভের জন্য মেম্বার লিস্ট রিপোর্ট PDF এক্সপোর্ট"
          >
            <FileText className="w-3.5 h-3.5 text-amber-300" />
            <span>Export to PDF</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>এক্সপোর্ট CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Box */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        {/* Search row */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="নাম, মেম্বার আইডি (যেমন BBOP-2024-001), মোবাইল নম্বর, লাইসেন্স নম্বর অথবা কর্মস্থল লিখে সার্চ করুন..."
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              ক্লিয়ার
            </button>
          )}
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {/* District */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">জেলা (District):</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-xs focus:outline-none"
            >
              <option value="all">সকল জেলা ({districts.length})</option>
              {districts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Boiler Class */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">বয়লার ক্লাস:</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-xs focus:outline-none"
            >
              <option value="all">সকল ক্লাস</option>
              <option value="১ম শ্রেণি (1st Class)">১ম শ্রেণি (1st Class)</option>
              <option value="২য় শ্রেণি (2nd Class)">২য় শ্রেণি (2nd Class)</option>
              <option value="৩য় শ্রেণি (3rd Class)">৩য় শ্রেণি (3rd Class)</option>
            </select>
          </div>

          {/* Blood Group */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">রক্তের গ্রুপ:</label>
            <select
              value={selectedBlood}
              onChange={(e) => setSelectedBlood(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-xs focus:outline-none"
            >
              <option value="all">সকল গ্রুপ</option>
              {bloodGroups.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Membership Type */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">সদস্যতার ধরণ:</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-xs focus:outline-none"
            >
              <option value="all">সকল ধরণ</option>
              <option value="সাধারণ">সাধারণ</option>
              <option value="আজীবন">আজীবন</option>
              <option value="নির্বাহী">নির্বাহী</option>
              <option value="সম্মানসূচক">সম্মানসূচক</option>
            </select>
          </div>
        </div>

        {/* Count & Reset */}
        <div className="flex items-center justify-between pt-2 text-xs text-slate-500 border-t border-slate-100">
          <span>
            প্রদর্শিত হচ্ছে: <strong>{filteredMembers.length}</strong> জন সদস্য (মোট: {members.length} জন)
          </span>
          {(selectedDistrict !== 'all' || selectedClass !== 'all' || selectedBlood !== 'all' || selectedType !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedDistrict('all');
                setSelectedClass('all');
                setSelectedBlood('all');
                setSelectedType('all');
                setSearchQuery('');
              }}
              className="text-amber-600 hover:underline font-medium"
            >
              সব ফিল্টার রিসেট করুন
            </button>
          )}
        </div>
      </div>

      {/* Grid Mode */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="p-5">
                <div className="flex items-start gap-3.5 mb-3">
                  <img
                    src={member.photoUrl}
                    alt={member.nameBangla}
                    className="w-16 h-20 rounded-xl object-cover border-2 border-amber-400 shadow-xs bg-slate-100 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="font-mono text-[11px] font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded inline-block">
                      {member.memberId}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 mt-1 truncate">
                      {member.nameBangla}
                    </h3>
                    <p className="text-[11px] text-slate-400 truncate">{member.nameEnglish}</p>
                    <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded mt-1 inline-block">
                      {member.boilerClass}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-[11px]">জেলা:</span>
                    <span className="font-medium text-slate-800">{member.district}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-[11px]">রক্তের গ্রুপ:</span>
                    <span className="font-bold text-red-600">{member.bloodGroup || 'O+'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-[11px]">কর্মস্থল:</span>
                    <span className="text-slate-700 truncate max-w-[130px]">{member.workplace}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-[11px]">লাইসেন্স:</span>
                    <span className="font-mono text-slate-700">{member.boilerLicenseNo}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedMemberModal(member)}
                  className="text-xs text-blue-900 font-semibold hover:underline"
                >
                  প্রোফাইল
                </button>
                <button
                  onClick={() => onOpenCardModal(member)}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <IdCard className="w-3.5 h-3.5" />
                  <span>আইডি কার্ড</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table Mode */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-xs">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-900 text-white uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">ছবি ও নাম</th>
                <th className="py-3 px-4">মেম্বার আইডি</th>
                <th className="py-3 px-4">বয়লার ক্লাস ও লাইসেন্স</th>
                <th className="py-3 px-4">জেলা ও কর্মস্থল</th>
                <th className="py-3 px-4">মোবাইল</th>
                <th className="py-3 px-4">রক্তের গ্রুপ</th>
                <th className="py-3 px-4">ধরণ ও স্ট্যাটাস</th>
                <th className="py-3 px-4 text-right">আইডি কার্ড</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-blue-50/50 transition-colors">
                  <td className="py-2.5 px-4 flex items-center gap-2.5">
                    <img
                      src={member.photoUrl}
                      alt={member.nameBangla}
                      className="w-9 h-11 rounded-lg object-cover border border-amber-400 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="font-bold text-slate-900">{member.nameBangla}</div>
                      <div className="text-[10px] text-slate-400">{member.nameEnglish}</div>
                    </div>
                  </td>
                  <td className="py-2.5 px-4 font-mono font-bold text-blue-900">
                    {member.memberId}
                  </td>
                  <td className="py-2.5 px-4">
                    <div className="font-semibold text-slate-800">{member.boilerClass}</div>
                    <div className="font-mono text-[10px] text-slate-400">{member.boilerLicenseNo}</div>
                  </td>
                  <td className="py-2.5 px-4">
                    <div className="text-slate-900 font-medium">{member.district}</div>
                    <div className="text-[10px] text-slate-500 truncate max-w-[150px]">{member.workplace}</div>
                  </td>
                  <td className="py-2.5 px-4 font-mono text-slate-700">
                    {member.mobile}
                  </td>
                  <td className="py-2.5 px-4">
                    <span className="font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                      {member.bloodGroup || 'O+'}
                    </span>
                  </td>
                  <td className="py-2.5 px-4">
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {member.membershipType} ({member.status})
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-right">
                    <button
                      onClick={() => onOpenCardModal(member)}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-2.5 py-1 rounded text-xs inline-flex items-center gap-1 shadow-xs"
                    >
                      <IdCard className="w-3 h-3" />
                      <span>কার্ড</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Member Details Modal */}
      {selectedMemberModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden">
            <div className="bg-blue-950 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold">সদস্য পূর্ণাঙ্গ প্রোফাইল</h3>
              </div>
              <button
                onClick={() => setSelectedMemberModal(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="flex items-center gap-4">
                <img
                  src={selectedMemberModal.photoUrl}
                  alt={selectedMemberModal.nameBangla}
                  className="w-20 h-24 rounded-xl object-cover border-2 border-amber-400 shadow"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="bg-blue-100 text-blue-900 font-mono font-bold px-2.5 py-0.5 rounded text-xs">
                    {selectedMemberModal.memberId}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">{selectedMemberModal.nameBangla}</h3>
                  <p className="text-xs text-slate-500">{selectedMemberModal.nameEnglish}</p>
                  <p className="text-xs text-amber-700 font-semibold mt-1">{selectedMemberModal.boilerClass}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[10px]">পিতার নাম:</span>
                  <span className="font-semibold text-slate-800">{selectedMemberModal.fatherName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">রক্তের গ্রুপ:</span>
                  <span className="font-bold text-red-600">{selectedMemberModal.bloodGroup}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">মোবাইল:</span>
                  <span className="font-mono text-slate-800">{selectedMemberModal.mobile}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">ইমেইল:</span>
                  <span className="font-mono text-slate-800 truncate">{selectedMemberModal.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">জেলা ও উপজেলা:</span>
                  <span className="text-slate-800">{selectedMemberModal.district}, {selectedMemberModal.upazila}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">বয়লার লাইসেন্স নং:</span>
                  <span className="font-mono text-slate-800">{selectedMemberModal.boilerLicenseNo}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 block text-[10px]">কর্মস্থল ও পদবী:</span>
                  <span className="text-slate-800">{selectedMemberModal.designation}, {selectedMemberModal.workplace}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 block text-[10px]">জরুরি যোগাযোগ:</span>
                  <span className="text-slate-800">
                    {selectedMemberModal.emergencyContact?.name || 'অভিভাবক'} 
                    {selectedMemberModal.emergencyContact?.relation ? ` (${selectedMemberModal.emergencyContact.relation})` : ''} 
                    {selectedMemberModal.emergencyContact?.phone ? ` - ${selectedMemberModal.emergencyContact.phone}` : ''}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-between items-center">
              <button
                onClick={() => {
                  const m = selectedMemberModal;
                  setSelectedMemberModal(null);
                  onOpenCardModal(m);
                }}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow"
              >
                <IdCard className="w-4 h-4" />
                <span>আইডি কার্ড জেনারেট করুন</span>
              </button>
              <button
                onClick={() => setSelectedMemberModal(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-semibold"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official Member List Report PDF Modal */}
      {isPdfModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh]">
            {/* Modal Top Bar */}
            <div className="bg-[#001f3f] text-white px-6 py-4 flex items-center justify-between border-b-2 border-[#d4af37]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#d4af37] rounded-xl text-[#001f3f]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg flex items-center gap-2">
                    <span>সদস্য তালিকা অফিসিয়াল রিপোর্ট (Official Member List Report)</span>
                    <span className="text-[11px] bg-red-600 text-white font-mono px-2 py-0.5 rounded-full uppercase">
                      PDF Export
                    </span>
                  </h3>
                  <p className="text-xs text-slate-300">
                    প্রশাসনিক নথিপত্র, অডিট ও অফিশিয়াল রেকর্ড-কিপিংয়ের জন্য প্রমিত সদস্য তালিকা
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsPdfModalOpen(false)}
                className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Action Bar & Notification */}
            <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span className="font-semibold text-slate-800">রেকর্ড সংখ্যা:</span>
                <span className="bg-blue-100 text-blue-900 font-bold px-2 py-0.5 rounded-md">
                  {filteredMembers.length} জন সদস্য
                </span>
                <span className="text-slate-400">|</span>
                <span className="text-slate-500">
                  {searchQuery || selectedDistrict !== 'all' || selectedClass !== 'all' ? 'ফিল্টারকৃত তালিকা' : 'পূর্ণাঙ্গ সদস্য তালিকা'}
                </span>
              </div>

              {pdfSuccessMessage && (
                <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-lg animate-pulse">
                  {pdfSuccessMessage}
                </div>
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-4 h-4 text-slate-700" />
                  <span>প্রিন্ট করুন</span>
                </button>

                <button
                  onClick={handleDownloadOfficialPdf}
                  disabled={isGeneratingPdf}
                  className="bg-red-700 hover:bg-red-800 text-white font-bold px-4 py-1.5 rounded-xl text-xs flex items-center gap-2 transition-colors shadow-sm disabled:opacity-50"
                >
                  {isGeneratingPdf ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                      <span>PDF তৈরি হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-amber-300" />
                      <span>PDF ডাউনলোড (Download PDF)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Scrollable Printable Report Canvas */}
            <div className="p-4 sm:p-6 overflow-y-auto bg-slate-100 flex-1">
              <div
                ref={pdfReportRef}
                id="official-member-pdf-report"
                className="bg-white mx-auto max-w-[840px] w-full p-8 rounded-lg shadow-sm border border-slate-300 text-slate-900 space-y-6"
                style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
              >
                {/* 1. Official Letterhead Header */}
                <div className="border-b-2 border-[#001f3f] pb-4">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
                    <div className="shrink-0">
                      <Logo size="lg" className="w-16 h-16 sm:w-20 sm:h-20" />
                    </div>
                    <div className="space-y-1 text-center sm:text-left">
                      <div className="inline-block bg-slate-100 text-slate-700 text-[10px] font-bold px-3 py-0.5 rounded-full border border-slate-300 uppercase tracking-wider mb-0.5">
                        অরাজনৈতিক ও পেশাজীবী সংগঠন • নিবন্ধন নং: বিওপি/২০১৬/৮৮
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
                      <span className="font-mono text-blue-900 font-semibold">
                        BBOP/ADM-REC/{new Date().getFullYear()}/{Math.floor(1000 + Math.random() * 9000)}
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-800">বিষয়: </span>
                      <span className="font-semibold text-slate-900">
                        নিবন্ধিত সদস্য তালিকা ও প্রশাসনিক রেকর্ড প্রতিবেদন
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-800">প্রস্তুতের তারিখ: </span>
                      <span className="font-mono text-slate-700">
                        {new Date().toISOString().slice(0, 10)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Statistical Summary Cards */}
                <div className="grid grid-cols-4 gap-3 text-xs">
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-center">
                    <span className="text-[10px] text-slate-500 block">মোট তালিকাভুক্ত সদস্য</span>
                    <span className="font-mono font-bold text-base text-slate-900">{filteredMembers.length} জন</span>
                  </div>
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded text-center">
                    <span className="text-[10px] text-emerald-700 block">সক্রিয় সদস্য (Active)</span>
                    <span className="font-mono font-bold text-base text-emerald-800">
                      {filteredMembers.filter((m) => m.status === 'active').length} জন
                    </span>
                  </div>
                  <div className="p-2.5 bg-amber-50 border border-amber-200 rounded text-center">
                    <span className="text-[10px] text-amber-700 block">১ম শ্রেণির অপারেটর</span>
                    <span className="font-mono font-bold text-base text-amber-800">
                      {filteredMembers.filter((m) => m.boilerClass.includes('১ম')).length} জন
                    </span>
                  </div>
                  <div className="p-2.5 bg-blue-50 border border-blue-200 rounded text-center">
                    <span className="text-[10px] text-blue-700 block">অনলাইন ভেরিফাইড</span>
                    <span className="font-mono font-bold text-base text-blue-900">১০০% সম্পন্ন</span>
                  </div>
                </div>

                {/* 3. Official Members Data Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-slate-300">
                    <thead className="bg-[#00152b] text-white text-[10px] uppercase">
                      <tr>
                        <th className="p-2 border border-slate-400 w-10 text-center">ক্রমিক</th>
                        <th className="p-2 border border-slate-400">সদস্য আইডি</th>
                        <th className="p-2 border border-slate-400">সদস্যের নাম ও কর্মস্থল</th>
                        <th className="p-2 border border-slate-400">বয়লার লাইসেন্স ও শ্রেণি</th>
                        <th className="p-2 border border-slate-400">জেলা</th>
                        <th className="p-2 border border-slate-400">মোবাইল</th>
                        <th className="p-2 border border-slate-400 text-center">স্ট্যাটাস</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-[10.5px]">
                      {filteredMembers.map((m, idx) => (
                        <tr key={m.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                          <td className="p-2 border border-slate-300 text-center font-mono">{idx + 1}</td>
                          <td className="p-2 border border-slate-300 font-mono font-bold text-blue-900">{m.memberId}</td>
                          <td className="p-2 border border-slate-300">
                            <div className="font-bold text-slate-900">{m.nameBangla}</div>
                            <div className="text-[9.5px] text-slate-500 font-mono">{m.nameEnglish}</div>
                            <div className="text-[9.5px] text-slate-600 truncate max-w-[170px]">{m.workplace}</div>
                          </td>
                          <td className="p-2 border border-slate-300">
                            <div className="font-semibold text-slate-800">{m.boilerClass}</div>
                            <div className="text-[9.5px] text-slate-500 font-mono">লাইসেন্স নং: {m.boilerLicenseNo}</div>
                          </td>
                          <td className="p-2 border border-slate-300">
                            <div>{m.district}</div>
                            <div className="text-[9.5px] text-slate-400">{m.division}</div>
                          </td>
                          <td className="p-2 border border-slate-300 font-mono text-slate-800">
                            <div>{m.mobile}</div>
                            {m.bloodGroup && (
                              <span className="text-[9px] text-red-600 font-bold">রক্ত: {m.bloodGroup}</span>
                            )}
                          </td>
                          <td className="p-2 border border-slate-300 text-center">
                            <span className={`px-2 py-0.5 rounded text-[9.5px] font-bold ${
                              m.status === 'active' 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : m.status === 'pending'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-200 text-slate-700'
                            }`}>
                              {m.status === 'active' ? 'সক্রিয়' : m.status === 'pending' ? 'পেন্ডিং' : m.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 4. Official Certification Statement */}
                <div className="bg-slate-50 p-3 rounded border border-slate-200 text-xs text-slate-700 space-y-1">
                  <p className="font-bold text-slate-900">সনদ ও প্রত্যয়ন (Official Administrative Certification):</p>
                  <p className="text-[11px] leading-relaxed text-slate-600">
                    এই মর্মে প্রত্যয়ন করা যাচ্ছে যে, উপরোল্লিখিত সকল সদস্য বাংলাদেশ বয়লার পরিচারক পরিষদের সেন্ট্রাল রেজিস্ট্রেশন ডাটাবেজের রেকর্ড অনুসারে নিবন্ধিত। এটি শিল্পপ্রতিষ্ঠান এবং পরিষদের দাপ্তরিক সংরক্ষণাগারের প্রশাসনিক নথিপত্র হিসেবে একটি সত্যায়িত সদস্য তালিকা।
                  </p>
                </div>

                {/* 5. Official Signatories Footer */}
                <div className="pt-8 grid grid-cols-3 gap-6 text-center text-xs">
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
                      সদস্য নিবন্ধন ও আর্কাইভ বিভাগ
                    </div>
                    <div className="text-[11px] text-slate-500">যাচাইকৃত কর্মকর্তা</div>
                    <div className="text-[10px] text-slate-400">কেন্দ্রীয় সচিবালয়, ঢাকা</div>
                  </div>
                </div>

                {/* Bottom Verification Line */}
                <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>নিবন্ধন কোড: BBOP/REG-2016-88</span>
                  <span>www.boiler-bd.org • সেন্ট্রাল মেম্বারশিপ ডাটাবেজ</span>
                  <span>পৃষ্ঠা: ১ / ১</span>
                </div>
              </div>
            </div>

            {/* Modal Bottom Footer */}
            <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs shrink-0">
              <span className="text-slate-500">
                * পিডিএফটি আন্তর্জাতিক স্ট্যান্ডার্ড A4 সাইজে সংরক্ষিত হবে, যা প্রিন্ট বা ডিজিটাল সংরক্ষণের জন্য প্রযোজ্য।
              </span>
              <button
                onClick={() => setIsPdfModalOpen(false)}
                className="px-4 py-1.5 bg-slate-300 hover:bg-slate-400 text-slate-800 rounded-lg font-semibold transition-colors"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
