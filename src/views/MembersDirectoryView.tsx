import React, { useState, useMemo } from 'react';
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
  Briefcase
} from 'lucide-react';

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
    </div>
  );
};
