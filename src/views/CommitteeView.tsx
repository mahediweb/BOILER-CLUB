import React, { useState } from 'react';
import { CommitteeMember } from '../types';
import { Phone, Mail, MapPin, Briefcase, Award, Calendar, CheckCircle2, History } from 'lucide-react';

interface CommitteeViewProps {
  committee: CommitteeMember[];
}

export const CommitteeView: React.FC<CommitteeViewProps> = ({ committee }) => {
  const [selectedTerm, setSelectedTerm] = useState<'current' | 'archive2022' | 'archive2020'>('current');

  const sortedCommittee = [...committee].sort((a, b) => a.positionOrder - b.positionOrder);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title / Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-800 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
            সাংগঠনিক নেতৃত্ব
          </span>
          <h1 className="text-3xl font-bold text-slate-900 mt-2">
            কেন্দ্রীয় কার্যনির্বাহী কমিটি
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            জাতীয় পরিষদ সম্মেলন ও সাধারণ সভার মাধ্যমে নির্বাচিত কেন্দ্রীয় নেতৃত্ববৃন্দ।
          </p>
        </div>

        {/* Term Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => setSelectedTerm('current')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedTerm === 'current'
                ? 'bg-blue-950 text-amber-400 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            বর্তমান কমিটি (২০২৪-২০২৬)
          </button>
          <button
            onClick={() => setSelectedTerm('archive2022')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedTerm === 'archive2022'
                ? 'bg-blue-950 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            সাবেক (২০২২-২০২৪)
          </button>
          <button
            onClick={() => setSelectedTerm('archive2020')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedTerm === 'archive2020'
                ? 'bg-blue-950 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            সাবেক (২০২০-২০২২)
          </button>
        </div>
      </div>

      {/* Committee Term Status Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500 text-slate-950 rounded-lg font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-white">
              {selectedTerm === 'current' ? '৭ম কেন্দ্রীয় কার্যনির্বাহী পরিষদ (২০২৪-২০২৬)' : 'সাবেক কার্যনির্বাহী পরিষদ আর্কাইভ'}
            </h4>
            <p className="text-slate-400">
              মেয়াদকাল: {selectedTerm === 'current' ? '০১ জানুয়ারি ২০২৪ হতে ৩১ ডিসেম্বর ২০২৬ পর্যন্ত (৩ বছর মেয়াদী)' : 'কার্যকাল সফলভাবে সম্পন্ন'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {selectedTerm === 'current' ? 'বর্তমান সক্রিয় কমিটি' : 'সংরক্ষিত আর্কাইভ'}
          </span>
          <span className="text-slate-400">মোট সদস্য: ২৫ জন</span>
        </div>
      </div>

      {/* Committee Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCommittee.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="p-6">
              <div className="flex items-start gap-4">
                <img
                  src={member.photoUrl}
                  alt={member.name}
                  className="w-20 h-24 rounded-xl object-cover border-2 border-slate-200 shadow bg-slate-100 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full inline-block ${
                    member.position === 'সভাপতি' 
                      ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                      : member.position === 'সাধারণ সম্পাদক'
                      ? 'bg-blue-100 text-blue-800 border border-blue-300'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {member.position}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1.5 leading-snug">
                    {member.name}
                  </h3>
                  <p className="text-xs text-slate-400">{member.englishName}</p>
                  <p className="text-xs text-slate-600 font-medium mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    জেলা: {member.district}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs text-slate-600 mt-4 leading-relaxed line-clamp-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                {member.shortBio}
              </p>

              {/* Workplace & Contact Info */}
              <div className="mt-4 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{member.workplace}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-mono">{member.mobile}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-mono text-slate-500 truncate">{member.email}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 px-6 py-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>মেয়াদ: {member.term}</span>
              <span className="text-blue-900 font-semibold">কেন্দ্রীয় পরিষদ</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
