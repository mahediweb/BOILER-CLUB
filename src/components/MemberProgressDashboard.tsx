import React, { useState, useMemo } from 'react';
import { Member } from '../types';
import { 
  Award, 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Download, 
  FileBadge, 
  FileCheck, 
  GraduationCap, 
  Layers, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface MemberProgressDashboardProps {
  member: Member;
}

export const MemberProgressDashboard: React.FC<MemberProgressDashboardProps> = ({ member }) => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'training' | 'license' | 'committee'>('overview');

  // Dynamic seed data based on member class and experience
  const progressData = useMemo(() => {
    const isFirstClass = member.boilerClass.includes('১ম');
    const isSecondClass = member.boilerClass.includes('২য়');
    const baseScore = isFirstClass ? 88 : isSecondClass ? 80 : 72;

    // 1. Competency Radar Data
    const competencyData = [
      { subject: 'বয়লার পরিচালনা ও নিয়ন্ত্রণ', score: Math.min(98, baseScore + 6), benchmark: 85, fullMark: 100 },
      { subject: 'জরুরি শাটডাউন ও সুরক্ষা', score: Math.min(96, baseScore + 8), benchmark: 80, fullMark: 100 },
      { subject: 'ফুয়েল ও স্টিম এফিশিয়েন্সি', score: Math.min(94, baseScore + 2), benchmark: 75, fullMark: 100 },
      { subject: 'ইন্সপেকশন ও NDT টেস্ট', score: Math.min(92, baseScore - 2), benchmark: 70, fullMark: 100 },
      { subject: 'ইলেকট্রিক্যাল ও PLC লজিক', score: Math.min(90, baseScore - 4), benchmark: 65, fullMark: 100 },
      { subject: 'পরিবেশ ও নির্গমন বিধিমালা', score: Math.min(95, baseScore + 5), benchmark: 75, fullMark: 100 }
    ];

    // 2. Training Modules & Hours Data
    const trainingCategories = [
      { category: 'নিরাপত্তা ও ফায়ার ড্রিল', completedHours: 24, requiredHours: 20, completionRate: 100 },
      { category: 'স্টিম অপ্টিমাইজেশন', completedHours: 18, requiredHours: 15, completionRate: 100 },
      { category: 'স্বয়ংক্রিয় কন্ট্রোল ও PLC', completedHours: 14, requiredHours: 15, completionRate: 93 },
      { category: 'পরিবেশগত সম্মতি ও ETP', completedHours: 12, requiredHours: 10, completionRate: 100 },
      { category: 'লিডারশিপ ও ম্যানেজমেন্ট', completedHours: 8, requiredHours: 10, completionRate: 80 }
    ];

    const trainingList = [
      {
        id: 'TR-2025-08',
        title: 'উচ্চ চাপ বয়লার সেফটি ও স্বয়ংক্রিয় সেফটি ভালভ অডিট',
        institution: 'জাতীয় পেশাগত প্রশিক্ষণ একাডেমি (BBOP)',
        date: '১৫ সেপ্টেম্বর ২০২৫',
        hours: 16,
        score: '৯৫%',
        status: 'উত্তীর্ণ ও সনদপ্রাপ্ত',
        certNo: `BBOP-CRT-${member.memberId.replace('BBOP-', '')}-01`,
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
      },
      {
        id: 'TR-2024-11',
        title: 'শিল্প কারখানায় স্টিম বয়লার ফুয়েল এফিশিয়েন্সি ও ব্লু-ডাউন রিকভারি',
        institution: 'বুয়েট মেকানিক্যাল ইঞ্জিনিয়ারিং সহযোগী কর্মশালা',
        date: '১০ নভেম্বর ২০২৪',
        hours: 20,
        score: '৯২%',
        status: 'উত্তীর্ণ ও সনদপ্রাপ্ত',
        certNo: `BBOP-CRT-${member.memberId.replace('BBOP-', '')}-02`,
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
      },
      {
        id: 'TR-2023-05',
        title: 'শিল্প দুর্ঘটনা প্রতিরোধ, ইমার্জেন্সি প্রেসার রিলিফ ও ফার্স্ট এইড',
        institution: 'ফায়ার সার্ভিস ও সিভিল ডিফেন্স অধিদপ্তর',
        date: '২২ মে ২০২৩',
        hours: 14,
        score: '৮৯%',
        status: 'উত্তীর্ণ ও সনদপ্রাপ্ত',
        certNo: `BBOP-CRT-${member.memberId.replace('BBOP-', '')}-03`,
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
      },
      {
        id: 'TR-2022-02',
        title: 'ডিজিটাল বয়লার কন্ট্রোল, SCADA ইন্টারফেস ও বার্নার অটোমেশন',
        institution: 'পরিষদ প্রযুক্তি ও প্রশিক্ষণ সেল',
        date: '২৮ ফেব্রুয়ারি ২০২২',
        hours: 18,
        score: '৯১%',
        status: 'উত্তীর্ণ ও সনদপ্রাপ্ত',
        certNo: `BBOP-CRT-${member.memberId.replace('BBOP-', '')}-04`,
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
      },
      {
        id: 'TR-2026-UP',
        title: 'অ্যাডভান্সড বয়লার ওয়াটার ট্রিটমেন্ট ও ক্ষয়রোধ প্রযুক্তি',
        institution: 'কেন্দ্রীয় প্রশিক্ষণ সেল, ঢাকা',
        date: 'আসন্ন (নভেম্বর ২০২৬)',
        hours: 12,
        score: 'অপেক্ষমাণ',
        status: 'নিবন্ধিত (চলমান)',
        certNo: 'প্রক্রিয়াধীন',
        badgeColor: 'bg-blue-50 text-blue-700 border-blue-200'
      }
    ];

    // 3. License Renewal History
    const renewalHistory = [
      {
        cycle: '১ম নবায়ন (২০১৮)',
        year: '২০১৮',
        safetyScore: 82,
        cpdCredits: 25,
        issueDate: '০৪ মার্চ ২০১৮',
        expiryDate: '০৩ মার্চ ২০২০',
        inspector: 'ইঞ্জি. মো. রফিকুল ইসলাম (উপ-প্রধান পরিদর্শক)',
        remarks: 'হাইড্রোলিক টেস্ট সন্তোষজনক ও ক্লিয়ারেন্স অনুমোদিত',
        receiptNo: 'CHB-RN-10921',
        status: 'সম্পন্ন'
      },
      {
        cycle: '২য় নবায়ন (২০২০)',
        year: '২০২০',
        safetyScore: 86,
        cpdCredits: 30,
        issueDate: '০২ মার্চ ২০২০',
        expiryDate: '০১ মার্চ ২০২২',
        inspector: 'মো. শাহজাহান কবির (বয়লার পরিদর্শক)',
        remarks: 'নিরাপত্তা ভালভ ও মাউন্টিং ফিটিংস নির্ভুল অবস্থায় রক্ষিত',
        receiptNo: 'CHB-RN-22450',
        status: 'সম্পন্ন'
      },
      {
        cycle: '৩য় নবায়ন (২০২২)',
        year: '২০২২',
        safetyScore: 90,
        cpdCredits: 38,
        issueDate: '২৭ ফেব্রুয়ারি ২০২২',
        expiryDate: '২৬ ফেব্রুয়ারি ২০২৪',
        inspector: 'এ. বি. এম. তারিকুল ইসলাম (পরিদর্শক)',
        remarks: 'স্মার্ট ডিজিটাল ভেরিফিকেশন ও NDT টেস্ট ছাড়পত্র প্রাপ্ত',
        receiptNo: 'CHB-RN-38914',
        status: 'সম্পন্ন'
      },
      {
        cycle: '৪র্থ নবায়ন (২০২৪)',
        year: '২০২৪',
        safetyScore: 94,
        cpdCredits: 45,
        issueDate: '১৫ জানুয়ারি ২০২৪',
        expiryDate: '৩১ ডিসেম্বর ২০২৬',
        inspector: 'ইঞ্জি. খন্দকার আশরাফ আলী (প্রধান বয়লার দপ্তর)',
        remarks: 'বিশেষ প্রশংসা সনদ ও সর্বোচ্চ নিরাপত্তা গ্রেড (A+)',
        receiptNo: 'CHB-RN-51008',
        status: 'বর্তমান মেয়াদে সক্রিয়'
      }
    ];

    // 4. Active Committee Roles & Attendance Data
    const committeeRoles = [
      {
        id: 'COM-01',
        name: member.committeePosition ? `${member.committeePosition}` : 'কল্যাণ ও জরুরি সহায়তা উপকমিটি',
        type: 'কেন্দ্রীয় পরিষদ ও উপকমিটি',
        role: member.committeePosition ? 'নির্বাহী পদাধিকারী' : 'যুগ্ম সমন্বয়ক',
        term: '২০২৪-২০২৬ (বর্তমান)',
        meetingsHeld: 12,
        meetingsAttended: 11,
        attendanceRate: 92,
        keyResponsibility: 'সদস্যদের চিকিৎসা কল্যাণ ও পেশাগত আইনি সহায়তা নিশ্চিতকরণ'
      },
      {
        id: 'COM-02',
        name: `${member.district} জেলা শাখা কার্যনির্বাহী কমিটি`,
        type: 'আঞ্চলিক শাখা',
        role: 'সক্রিয় প্রতিনিধি / সদস্য',
        term: '২০২২-২০২৪',
        meetingsHeld: 16,
        meetingsAttended: 15,
        attendanceRate: 94,
        keyResponsibility: 'জেলা পর্যায়ের বয়লার পরিচারক ভাইদের নিয়মিত সম্মেলন আয়োজন'
      },
      {
        id: 'COM-03',
        name: 'কারিগরি প্রশিক্ষণ ও কর্মশালা বাস্তবায়ন সেল',
        type: 'প্রশিক্ষণ সেল',
        role: 'মাস্টার ট্রেইনার / পর্যবেক্ষক',
        term: '২০২৪-২০২৫',
        meetingsHeld: 8,
        meetingsAttended: 7,
        attendanceRate: 88,
        keyResponsibility: 'নবীন বয়লার অপারেটরদের প্র্যাকটিক্যাল হ্যান্ডস-অন সেশন পরিচালনা'
      }
    ];

    const committeePieData = [
      { name: 'উপস্থিত সভা', value: 33, color: '#001f3f' },
      { name: 'ছুটি সাপেক্ষে অনুপস্থিত', value: 3, color: '#d4af37' }
    ];

    // Aggregates
    const totalTrainingHours = trainingCategories.reduce((acc, c) => acc + c.completedHours, 0);
    const requiredTrainingHours = trainingCategories.reduce((acc, c) => acc + c.requiredHours, 0);
    const averageScore = Math.round(competencyData.reduce((acc, c) => acc + c.score, 0) / competencyData.length);
    const totalAttendanceAvg = Math.round(
      committeeRoles.reduce((acc, c) => acc + c.attendanceRate, 0) / committeeRoles.length
    );

    return {
      competencyData,
      trainingCategories,
      trainingList,
      renewalHistory,
      committeeRoles,
      committeePieData,
      totalTrainingHours,
      requiredTrainingHours,
      averageScore,
      totalAttendanceAvg
    };
  }, [member]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-[#001f3f] text-[#d4af37] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              পেশাগত ক্যারিয়ার পোর্টফোলিও
            </span>
            <span className="text-xs text-slate-500 font-medium">
              লাইসেন্স নং: <strong className="text-slate-800 font-mono">{member.boilerLicenseNo}</strong>
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            সদস্য অগ্রগতি ও দক্ষতা ট্র্যাকিং ড্যাশবোর্ড
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            প্রশিক্ষণ সমাপ্তি, বয়লার লাইসেন্স নবায়ন ইতিহাস এবং সাংগঠনিক কমিটির কর্মকাণ্ডের স্বয়ংক্রিয় পরিসংখ্যান
          </p>
        </div>

        {/* Sub-nav pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold self-stretch md:self-auto overflow-x-auto">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              activeSubTab === 'overview'
                ? 'bg-white text-[#001f3f] shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            সার্বিক পরিসংখ্যান
          </button>
          <button
            onClick={() => setActiveSubTab('training')}
            className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              activeSubTab === 'training'
                ? 'bg-white text-[#001f3f] shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            প্রশিক্ষণ ও দক্ষতা
          </button>
          <button
            onClick={() => setActiveSubTab('license')}
            className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              activeSubTab === 'license'
                ? 'bg-white text-[#001f3f] shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            লাইসেন্স নবায়ন ইতিহাস
          </button>
          <button
            onClick={() => setActiveSubTab('committee')}
            className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              activeSubTab === 'committee'
                ? 'bg-white text-[#001f3f] shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            সাংগঠনিক দায়িত্ব
          </button>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Training Hours */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-medium block">অর্জিত প্রশিক্ষণ সময়</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl font-black text-slate-900">{progressData.totalTrainingHours} ঘণ্টা</span>
              <span className="text-[10px] text-emerald-600 font-bold">
                (লক্ষ্যমাত্রার ১১৪%)
              </span>
            </div>
            <div className="w-28 bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-[#001f3f] h-full rounded-full" style={{ width: '100%' }} />
            </div>
          </div>
        </div>

        {/* Card 2: Competency Index */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#d4af37] flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-medium block">কারিগরি দক্ষতা সূচক</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl font-black text-slate-900">{progressData.averageScore}%</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
                গ্রেড A+
              </span>
            </div>
            <div className="w-28 bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-emerald-600 h-full rounded-full" 
                style={{ width: `${progressData.averageScore}%` }} 
              />
            </div>
          </div>
        </div>

        {/* Card 3: License Status */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-medium block">বর্তমান লাইসেন্স স্ট্যাটাস</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-sm font-bold text-emerald-700">বৈধ ও সক্রিয়</span>
            </div>
            <span className="text-[10px] text-slate-500 block mt-1">
              মেয়াদ উত্তীর্ণ: ৩১ ডিসে ২০২৬
            </span>
          </div>
        </div>

        {/* Card 4: Committee Engagement */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-900 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-medium block">কমিটি সভা উপস্থিতি</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl font-black text-slate-900">{progressData.totalAttendanceAvg}%</span>
              <span className="text-[10px] text-purple-700 font-bold">
                ({progressData.committeeRoles.length}টি দায়িত্ব)
              </span>
            </div>
            <div className="w-28 bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-purple-600 h-full rounded-full" 
                style={{ width: `${progressData.totalAttendanceAvg}%` }} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* TAB 1: OVERVIEW TAB */}
      {(activeSubTab === 'overview' || activeSubTab === 'training') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Radar Chart: Core Competency Analysis */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#001f3f]" />
                  <span>কারিগরি দক্ষতা ও নিরাপত্তা মূল্যায়ন (Competency Radar)</span>
                </h3>
                <p className="text-[11px] text-slate-500">
                  জাতীয় মানদণ্ডের তুলনায় সদস্যের বিভিন্ন শাখার দক্ষতার রেডার গ্রাফ
                </p>
              </div>
              <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-1 rounded-md">
                অডিট সাল ২০২৫-২৬
              </span>
            </div>

            <div className="h-[300px] w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={progressData.competencyData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#475569', fontSize: 10, fontWeight: 600 }} 
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94a3b8" />
                  <Radar
                    name="সদস্যের অর্জিত স্কোর"
                    dataKey="score"
                    stroke="#001f3f"
                    fill="#0284c7"
                    fillOpacity={0.45}
                  />
                  <Radar
                    name="জাতীয় ন্যূনতম মানদণ্ড"
                    dataKey="benchmark"
                    stroke="#d4af37"
                    fill="#d4af37"
                    fillOpacity={0.2}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '11px' }} 
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-xs">
              {progressData.competencyData.slice(0, 3).map((item, idx) => (
                <div key={idx} className="bg-slate-50 p-2 rounded-xl text-center">
                  <span className="text-[10px] text-slate-500 block truncate">{item.subject}</span>
                  <span className="font-bold text-slate-800 text-sm">{item.score}%</span>
                </div>
              ))}
              {progressData.competencyData.slice(3, 6).map((item, idx) => (
                <div key={idx} className="bg-slate-50 p-2 rounded-xl text-center">
                  <span className="text-[10px] text-slate-500 block truncate">{item.subject}</span>
                  <span className="font-bold text-slate-800 text-sm">{item.score}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bar Chart: Training Hours per Domain */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-emerald-600" />
                  <span>প্রশিক্ষণ ঘণ্টা ও লক্ষ্যমাত্রা অর্জন</span>
                </h3>
                <p className="text-[11px] text-slate-500">
                  বার্ষিক CPD (Continuous Professional Development) অগ্রগতি
                </p>
              </div>
            </div>

            <div className="h-[300px] w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={progressData.trainingCategories} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="category" 
                    tick={{ fill: '#64748b', fontSize: 9 }} 
                    angle={-15}
                    textAnchor="end"
                    height={40}
                  />
                  <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '11px' }} 
                  />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="completedHours" name="সম্পন্ন ঘণ্টা" fill="#001f3f" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="requiredHours" name="লক্ষ্যমাত্রা" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-emerald-900">বার্ষিক CPD রিকোয়ারমেন্ট সম্পন্ন</span>
              </div>
              <span className="font-bold text-emerald-800">{progressData.totalTrainingHours} / {progressData.requiredTrainingHours} ঘণ্টা</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2 & OVERVIEW: Detailed Training Course Table */}
      {(activeSubTab === 'overview' || activeSubTab === 'training') && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileBadge className="w-4 h-4 text-[#001f3f]" />
                <span>সম্পন্নকৃত প্রশিক্ষণ কোর্স ও প্রাতিষ্ঠানিক সনদসমূহ</span>
              </h3>
              <p className="text-xs text-slate-500">পরিষদ ও স্বীকৃত প্রতিষ্ঠান কর্তৃক প্রত্যয়িত সার্টিফিকেশন বিবরণী</p>
            </div>
            <span className="text-xs font-semibold text-[#001f3f] bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
              মোট ৫টি কোর্স সম্পন্ন
            </span>
          </div>

          <div className="overflow-x-auto border border-slate-100 rounded-xl">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-900 text-white uppercase text-[10px]">
                <tr>
                  <th className="p-3">কোর্সের শিরোনাম</th>
                  <th className="p-3">প্রশিক্ষণ প্রদানকারী প্রতিষ্ঠান</th>
                  <th className="p-3">তারিখ ও মেয়াদ</th>
                  <th className="p-3 text-center">সময়কাল (ঘণ্টা)</th>
                  <th className="p-3 text-center">অর্জিত স্কোর</th>
                  <th className="p-3">সনদ নম্বর</th>
                  <th className="p-3 text-right">স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {progressData.trainingList.map((tr) => (
                  <tr key={tr.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-semibold text-slate-900 max-w-xs">
                      {tr.title}
                    </td>
                    <td className="p-3 text-slate-600">{tr.institution}</td>
                    <td className="p-3 text-slate-500 font-mono text-[11px]">{tr.date}</td>
                    <td className="p-3 text-center font-mono font-bold text-slate-800">{tr.hours} ঘণ্টা</td>
                    <td className="p-3 text-center">
                      <span className="font-bold font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {tr.score}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-[11px] text-slate-600">{tr.certNo}</td>
                    <td className="p-3 text-right">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${tr.badgeColor}`}>
                        {tr.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3 & OVERVIEW: License Renewal History Visualization */}
      {(activeSubTab === 'overview' || activeSubTab === 'license') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Renewal Trend Area Chart */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>লাইসেন্স নবায়ন চক্রে নিরাপত্তা অডিট ও CPD অগ্রগতি</span>
                </h3>
                <p className="text-[11px] text-slate-500">
                  প্রতি ২ বছর অন্তর নবায়নের সময় অর্জিত নিরাপত্তা রেটিং ও পয়েন্ট
                </p>
              </div>
            </div>

            <div className="h-[280px] w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={progressData.renewalHistory} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorCpd" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#001f3f" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#001f3f" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 10 }} />
                  <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '11px' }} 
                  />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Area 
                    type="monotone" 
                    dataKey="safetyScore" 
                    name="নিরাপত্তা অডিট রেটিং (%)" 
                    stroke="#16a34a" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorScore)" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="cpdCredits" 
                    name="অর্জিত CPD ক্রেডিট পয়েন্ট" 
                    stroke="#d4af37" 
                    strokeWidth={2.5}
                    dot={{ r: 4 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <span>সর্বশেষ নবায়ন তারিখ: <strong>১৫ জানুয়ারি ২০২৪</strong></span>
              <span className="text-emerald-700 font-bold">পরবর্তী নবায়ন: ৩১ ডিসেম্বর ২০২৬</span>
            </div>
          </div>

          {/* Renewal Logs List */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-[#001f3f]" />
                  <span>লাইসেন্স ও সদস্যপদ নবায়ন ইতিহাস</span>
                </h3>
                <p className="text-[11px] text-slate-500">অনুমোদিত রেকর্ড ও প্রাপ্তি রসিদ নম্বর</p>
              </div>
            </div>

            <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
              {progressData.renewalHistory.map((rn, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5 hover:border-slate-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      {rn.cycle}
                    </span>
                    <span className="font-mono text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-semibold">
                      {rn.receiptNo}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>মেয়াদ: <strong className="text-slate-700">{rn.issueDate} হতে {rn.expiryDate}</strong></span>
                    <span className="font-bold text-emerald-700">স্কোর: {rn.safetyScore}%</span>
                  </div>
                  <p className="text-[11px] text-slate-600 italic bg-white p-2 rounded-lg border border-slate-100">
                    "{rn.remarks}"
                  </p>
                  <p className="text-[10px] text-slate-400">
                    স্বাক্ষরকারী: {rn.inspector}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4 & OVERVIEW: Active Committee Roles & Attendance */}
      {(activeSubTab === 'overview' || activeSubTab === 'committee') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Committee Attendance Chart */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-900" />
                  <span>কমিটি ও ফোরাম মিটিং উপস্থিতি</span>
                </h3>
                <p className="text-[11px] text-slate-500">পরিষদের বিভিন্ন উপকমিটিতে অংশ গ্রহণের অনুপাত</p>
              </div>
            </div>

            <div className="h-[240px] w-full pt-1 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={progressData.committeePieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {progressData.committeePieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '11px' }} 
                  />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 text-xs text-purple-900 flex items-center justify-between">
              <span>গড় উপস্থিতি হার:</span>
              <strong className="text-sm font-bold">{progressData.totalAttendanceAvg}% (চমৎকার রেকর্ড)</strong>
            </div>
          </div>

          {/* Active Committee Roles Cards */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#001f3f]" />
                  <span>সক্রিয় সাংগঠনিক পদবী ও অর্পিত দায়িত্ব</span>
                </h3>
                <p className="text-[11px] text-slate-500">পরিষদের কেন্দ্রীয় ও আঞ্চলিক শাখা সমূহে দায়িত্বের বিবরণ</p>
              </div>
              <span className="text-[10px] bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded-full">
                {progressData.committeeRoles.length}টি সক্রিয় ভূমিকা
              </span>
            </div>

            <div className="space-y-3">
              {progressData.committeeRoles.map((role) => (
                <div 
                  key={role.id} 
                  className="p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:border-[#d4af37]/60 transition-all space-y-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                        {role.type}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900">{role.name}</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#001f3f] bg-amber-400/20 text-amber-900 border border-amber-400/30 px-2.5 py-0.5 rounded-full">
                        {role.role}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{role.term}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-100">
                    <strong className="text-slate-800">দায়িত্ব ও ভূমিকা:</strong> {role.keyResponsibility}
                  </p>

                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-slate-500">
                      মিটিংয়ে অংশগ্রহণ: <strong>{role.meetingsAttended} / {role.meetingsHeld} সভা</strong>
                    </span>
                    <span className="font-mono font-bold text-emerald-700">
                      উপস্থিতি: {role.attendanceRate}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
