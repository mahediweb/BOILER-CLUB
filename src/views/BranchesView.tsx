import React, { useState } from 'react';
import { Branch } from '../types';
import { MapPin, Phone, Mail, Users, Building, ChevronRight, Award, Search } from 'lucide-react';

interface BranchesViewProps {
  branches: Branch[];
}

export const BranchesView: React.FC<BranchesViewProps> = ({ branches }) => {
  const [selectedDivision, setSelectedDivision] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [activeBranchModal, setActiveBranchModal] = useState<Branch | null>(null);

  const divisions = ['ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'সিলেট', 'বরিশাল', 'রংপুর', 'ময়মনসিংহ'];

  const filteredBranches = branches.filter((b) => {
    const matchesDiv = selectedDivision === 'all' || b.division === selectedDivision;
    const matchesSearch =
      !search ||
      b.nameBangla.toLowerCase().includes(search.toLowerCase()) ||
      b.district.toLowerCase().includes(search.toLowerCase()) ||
      b.upazila.toLowerCase().includes(search.toLowerCase());
    return matchesDiv && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-6">
        <span className="text-xs font-bold text-purple-800 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full uppercase tracking-wider">
          আঞ্চলিক নেটওয়ার্ক
        </span>
        <h1 className="text-3xl font-bold text-slate-900 mt-2">
          শাখা ও জেলা কমিটি ডিরেক্টরি
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          সারাদেশের বিভাগ ও শিল্প জেলা ভিত্তিক আঞ্চলিক শাখা কার্যালয় এবং কার্যকরী নেতৃত্ব।
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Divisions Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
          <button
            onClick={() => setSelectedDivision('all')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-semibold transition-colors ${
              selectedDivision === 'all'
                ? 'bg-blue-950 text-amber-400'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            সকল বিভাগ ({branches.length})
          </button>
          {divisions.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDivision(d)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
                selectedDivision === d
                  ? 'bg-blue-950 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="শাখা বা জেলার নাম দিয়ে খুঁজুন..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-900"
          />
        </div>
      </div>

      {/* Branches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBranches.map((branch) => (
          <div
            key={branch.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-bold text-blue-900 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                  বিভাগ: {branch.division}
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {branch.totalMembers} জন সদস্য
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug">
                {branch.nameBangla}
              </h3>
              <p className="text-xs text-slate-400">{branch.nameEnglish}</p>

              {/* Branch Committee Leadership preview */}
              <div className="mt-4 bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-2 text-xs">
                <div className="font-semibold text-slate-700 flex items-center gap-1 text-[11px]">
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  <span>শাখা নেতৃত্ব (কমিটি):</span>
                </div>
                <div className="space-y-1 text-slate-600 text-[11px]">
                  <p><strong>সভাপতি:</strong> {branch.committee[0]?.name || 'নির্বাচনাধীন'} ({branch.committee[0]?.phone || 'অফিস'})</p>
                  <p><strong>সাধারণ সম্পাদক:</strong> {branch.committee[1]?.name || 'নির্বাচনাধীন'} ({branch.committee[1]?.phone || 'অফিস'})</p>
                </div>
              </div>

              {/* Address and Contact */}
              <div className="mt-4 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="truncate">{branch.officeAddress}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-mono">{branch.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-mono text-slate-500 truncate">{branch.email}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">মেয়াদ: {branch.term}</span>
              <button
                onClick={() => setActiveBranchModal(branch)}
                className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1"
              >
                <span>পূর্ণাঙ্গ কমিটি দেখুন</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Branch Detail Modal */}
      {activeBranchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden">
            <div className="bg-blue-950 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">{activeBranchModal.nameBangla}</h3>
                <p className="text-xs text-slate-300">জেলা: {activeBranchModal.district} • বিভাগ: {activeBranchModal.division}</p>
              </div>
              <button
                onClick={() => setActiveBranchModal(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-700 space-y-1">
                <p><strong>কার্যালয়:</strong> {activeBranchModal.officeAddress}</p>
                <p><strong>যোগাযোগ:</strong> {activeBranchModal.phone} | {activeBranchModal.email}</p>
                <p><strong>মোট নিবন্ধিত সদস্য:</strong> {activeBranchModal.totalMembers} জন</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">শাখা কার্যনির্বাহী পরিষদ ({activeBranchModal.term}):</h4>
                <div className="space-y-2">
                  {activeBranchModal.committee.map((c, idx) => (
                    <div key={idx} className="p-2.5 bg-white border border-slate-200 rounded-lg flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-900">{c.name}</div>
                        <div className="text-[11px] text-slate-500">ফোন: {c.phone}</div>
                      </div>
                      <span className="text-[11px] font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded">
                        {c.designation}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setActiveBranchModal(null)}
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
