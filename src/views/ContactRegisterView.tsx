import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  UploadCloud, 
  UserPlus,
  Flame,
  Award
} from 'lucide-react';
import { Member } from '../types';

interface ContactRegisterViewProps {
  onRegisterSubmit: (newMember: Partial<Member>) => void;
}

export const ContactRegisterView: React.FC<ContactRegisterViewProps> = ({ onRegisterSubmit }) => {
  const [activeSubTab, setActiveSubTab] = useState<'register' | 'contact'>('register');
  const [submitted, setSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [termsError, setTermsError] = useState<string | null>(null);
  const [contactSuccess, setContactSuccess] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    nameBangla: '',
    nameEnglish: '',
    fatherName: '',
    motherName: '',
    dob: '',
    bloodGroup: 'B+',
    nidNo: '',
    mobile: '',
    email: '',
    division: 'ঢাকা',
    district: 'ঢাকা',
    upazila: 'তেজগাঁও',
    presentAddress: '',
    permanentAddress: '',
    workplace: '',
    designation: 'বয়লার অপারেটর',
    experienceYears: 5,
    boilerClass: '১ম শ্রেণি (1st Class)',
    boilerLicenseNo: '',
    licenseIssueDate: '',
    licenseExpiryDate: '',
    emergencyName: '',
    emergencyRelation: 'ভাই',
    emergencyPhone: '',
    paymentMethod: 'bKash',
    trxId: '',
    termsAccepted: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      setTermsError('দয়া করে পরিষদের শর্তাবলী ও গঠনতন্ত্র মেনে নেওয়ার বক্সে টিক চিহ্ন দিন।');
      return;
    }
    setTermsError(null);

    const generatedId = `APP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setTrackingId(generatedId);

    const newMemberObj: Partial<Member> = {
      nameBangla: formData.nameBangla,
      nameEnglish: formData.nameEnglish,
      fatherName: formData.fatherName,
      motherName: formData.motherName,
      dob: formData.dob,
      bloodGroup: formData.bloodGroup,
      nidNo: formData.nidNo,
      mobile: formData.mobile,
      email: formData.email,
      division: formData.division,
      district: formData.district,
      upazila: formData.upazila,
      presentAddress: formData.presentAddress,
      permanentAddress: formData.permanentAddress,
      workplace: formData.workplace,
      designation: formData.designation,
      experienceYears: Number(formData.experienceYears),
      boilerClass: formData.boilerClass,
      boilerLicenseNo: formData.boilerLicenseNo || `BL-2026-${Math.floor(100 + Math.random() * 900)}`,
      emergencyContact: {
        name: formData.emergencyName || 'জরুরি অভিভাবক',
        relation: formData.emergencyRelation,
        phone: formData.emergencyPhone || formData.mobile
      },
      membershipType: 'সাধারণ',
      status: 'pending',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    };

    onRegisterSubmit(newMemberObj);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Toggle */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-6 flex-wrap gap-4">
        <div>
          <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider">
            সরাসরি যোগাযোগ ও অন্তর্ভুক্তি
          </span>
          <h1 className="text-3xl font-bold text-slate-900 mt-2">
            {activeSubTab === 'register' ? 'অনলাইন সদস্যপদ নিবন্ধন ফরম' : 'যোগাযোগ ও কেন্দ্রীয় কার্যালয়'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {activeSubTab === 'register' 
              ? 'বাংলাদেশ বয়লার পরিচারক পরিষদের আজীবন বা সাধারণ সদস্য হতে প্রয়োজনীয় তথ্য পূরণ করে আবেদন করুন।' 
              : 'কেন্দ্রীয় দপ্তর, জরুরি হেল্পলাইন ও পরামর্শ কেন্দ্র সংক্রান্ত তথ্য।'
            }
          </p>
        </div>

        <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs">
          <button
            onClick={() => setActiveSubTab('register')}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${
              activeSubTab === 'register'
                ? 'bg-blue-950 text-amber-400 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            সদস্য হওয়ার আবেদন
          </button>
          <button
            onClick={() => setActiveSubTab('contact')}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${
              activeSubTab === 'contact'
                ? 'bg-blue-950 text-amber-400 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            অফিস ও যোগাযোগ
          </button>
        </div>
      </div>

      {/* 1. REGISTRATION FORM TAB */}
      {activeSubTab === 'register' && (
        <div>
          {submitted ? (
            <div className="bg-emerald-50 border-2 border-emerald-500 rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-4">
              <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-emerald-900">
                আপনার মেম্বারশিপ আবেদন সফলভাবে গৃহীত হয়েছে!
              </h2>
              <div className="bg-white p-4 rounded-xl border border-emerald-200 inline-block font-mono text-sm">
                আবেদন ট্র্যাকিং নম্বর: <strong className="text-blue-950 text-base">{trackingId}</strong>
              </div>
              <p className="text-xs text-emerald-800 max-w-lg mx-auto leading-relaxed">
                আপনার আবেদনটি কেন্দ্রীয় যাচাই কমিটির পর্যালোচনার জন্য জমা হয়েছে (স্ট্যাটাস: <strong className="text-amber-700">Pending</strong>)। ভেরিফিকেশন ও লাইসেন্স যাচাই সম্পন্ন হলে আপনাকে এসএমএস ও ইমেইলের মাধ্যমে জানানো হবে এবং অফিসিয়াল ডিজিটাল আইডি কার্ড ইস্যু করা হবে।
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      ...formData,
                      nameBangla: '',
                      nameEnglish: '',
                      mobile: '',
                      nidNo: '',
                      boilerLicenseNo: '',
                      trxId: ''
                    });
                  }}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow"
                >
                  নতুন আরেকটি আবেদন করুন
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitRegistration} className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-10 space-y-8">
              {/* Section 1: Personal Info */}
              <div>
                <h3 className="text-base font-bold text-blue-950 border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-900 text-white text-xs flex items-center justify-center font-mono">১</span>
                  <span>ব্যক্তিগত তথ্যাবলী (Personal Information)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">পূর্ণ নাম (বাংলায়) *</label>
                    <input
                      type="text"
                      name="nameBangla"
                      required
                      placeholder="যেমন: মোঃ জাহিদুল ইসলাম"
                      value={formData.nameBangla}
                      onChange={handleChange}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-blue-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">পূর্ণ নাম (ইংরেজিতে বড় অক্ষরে) *</label>
                    <input
                      type="text"
                      name="nameEnglish"
                      required
                      placeholder="MD. JAHIDUL ISLAM"
                      value={formData.nameEnglish}
                      onChange={handleChange}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-blue-900 uppercase"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">পিতার নাম *</label>
                    <input
                      type="text"
                      name="fatherName"
                      required
                      placeholder="পিতার নাম"
                      value={formData.fatherName}
                      onChange={handleChange}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-blue-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">মাতার নাম</label>
                    <input
                      type="text"
                      name="motherName"
                      placeholder="মাতার নাম"
                      value={formData.motherName}
                      onChange={handleChange}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-blue-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">জন্ম তারিখ *</label>
                    <input
                      type="date"
                      name="dob"
                      required
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-blue-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">রক্তের গ্রুপ *</label>
                    <select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-blue-900"
                    >
                      <option value="A+">A+ (পজিটিভ)</option>
                      <option value="A-">A- (নেগেটিভ)</option>
                      <option value="B+">B+ (পজিটিভ)</option>
                      <option value="B-">B- (নেগেটিভ)</option>
                      <option value="O+">O+ (পজিটিভ)</option>
                      <option value="O-">O- (নেগেটিভ)</option>
                      <option value="AB+">AB+ (পজিটিভ)</option>
                      <option value="AB-">AB- (নেগেটিভ)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">জাতীয় পরিচয়পত্র (NID) নম্বর *</label>
                    <input
                      type="text"
                      name="nidNo"
                      required
                      placeholder="১০ বা ১৭ ডিজিটের এনআইডি"
                      value={formData.nidNo}
                      onChange={handleChange}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-blue-900 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">সক্রিয় মোবাইল নম্বর *</label>
                    <input
                      type="tel"
                      name="mobile"
                      required
                      placeholder="০১৭১২-৩৪৫৬৭৮"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-blue-900 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">ইমেইল ঠিকানা</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="operator@domain.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-blue-900 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Address */}
              <div>
                <h3 className="text-base font-bold text-blue-950 border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-900 text-white text-xs flex items-center justify-center font-mono">২</span>
                  <span>ঠিকানা সংক্রান্ত তথ্য (Address Details)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs mb-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">বিভাগ *</label>
                    <select
                      name="division"
                      value={formData.division}
                      onChange={handleChange}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                    >
                      <option value="ঢাকা">ঢাকা</option>
                      <option value="চট্টগ্রাম">চট্টগ্রাম</option>
                      <option value="রাজশাহী">রাজশাহী</option>
                      <option value="খুলনা">খুলনা</option>
                      <option value="সিলেট">সিলেট</option>
                      <option value="বরিশাল">বরিশাল</option>
                      <option value="রংপুর">রংপুর</option>
                      <option value="ময়মনসিংহ">ময়মনসিংহ</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">জেলা *</label>
                    <input
                      type="text"
                      name="district"
                      required
                      placeholder="যেমন: ঢাকা, গাজীপুর, চট্টগ্রাম"
                      value={formData.district}
                      onChange={handleChange}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">উপজেলা / থানা *</label>
                    <input
                      type="text"
                      name="upazila"
                      required
                      placeholder="যেমন: তেজগাঁও, শ্রীপুর, সীতাকুণ্ড"
                      value={formData.upazila}
                      onChange={handleChange}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">বর্তমান ঠিকানা *</label>
                    <textarea
                      name="presentAddress"
                      required
                      rows={2}
                      placeholder="বাসা/হোল্ডিং, রাস্তা, এলাকা..."
                      value={formData.presentAddress}
                      onChange={handleChange}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">স্থায়ী ঠিকানা *</label>
                    <textarea
                      name="permanentAddress"
                      required
                      rows={2}
                      placeholder="গ্রাম/মহল্লা, ডাকঘর, উপজেলা, জেলা..."
                      value={formData.permanentAddress}
                      onChange={handleChange}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Professional & Boiler Certification Info */}
              <div>
                <h3 className="text-base font-bold text-blue-950 border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-900 text-white text-xs flex items-center justify-center font-mono">৩</span>
                  <span>পেশাগত ও বয়লার লাইসেন্স তথ্য (Boiler Competency Certification)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">বয়লার সনদ ক্লাস (Class) *</label>
                    <select
                      name="boilerClass"
                      value={formData.boilerClass}
                      onChange={handleChange}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-semibold text-blue-950"
                    >
                      <option value="১ম শ্রেণি (1st Class)">১ম শ্রেণি (1st Class)</option>
                      <option value="২য় শ্রেণি (2nd Class)">২য় শ্রেণি (2nd Class)</option>
                      <option value="৩য় শ্রেণি (3rd Class)">৩য় শ্রেণি (3rd Class)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">বয়লার লাইসেন্স / সনদ নম্বর *</label>
                    <input
                      type="text"
                      name="boilerLicenseNo"
                      required
                      placeholder="যেমন: BL-2021-9988"
                      value={formData.boilerLicenseNo}
                      onChange={handleChange}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">সনদ ইস্যুকারী কর্তৃপক্ষ</label>
                    <input
                      type="text"
                      disabled
                      value="প্রধান বয়লার পরিদর্শকের কার্যালয়, ঢাকা"
                      className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">বর্তমান প্রতিষ্ঠান / কারখানার নাম *</label>
                    <input
                      type="text"
                      name="workplace"
                      required
                      placeholder="যেমন: মেঘনা গ্রুপ অব ইন্ডাস্ট্রিজ"
                      value={formData.workplace}
                      onChange={handleChange}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">বর্তমান পদবী *</label>
                    <input
                      type="text"
                      name="designation"
                      required
                      placeholder="যেমন: সিনিয়র বয়লার অপারেটর"
                      value={formData.designation}
                      onChange={handleChange}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">মোট কাজের অভিজ্ঞতা (বছর) *</label>
                    <input
                      type="number"
                      name="experienceYears"
                      min={1}
                      max={45}
                      required
                      value={formData.experienceYears}
                      onChange={handleChange}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Emergency Contact & Fee Payment */}
              <div>
                <h3 className="text-base font-bold text-blue-950 border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-900 text-white text-xs flex items-center justify-center font-mono">৪</span>
                  <span>জরুরি যোগাযোগ ও ভর্তি ফি পেমেন্ট</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs mb-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">জরুরি যোগাযোগের ব্যক্তির নাম *</label>
                    <input
                      type="text"
                      name="emergencyName"
                      required
                      placeholder="অভিভাবক বা স্ত্রীর নাম"
                      value={formData.emergencyName}
                      onChange={handleChange}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">সম্পর্ক *</label>
                    <input
                      type="text"
                      name="emergencyRelation"
                      required
                      placeholder="ভাই / পিতা / স্ত্রী"
                      value={formData.emergencyRelation}
                      onChange={handleChange}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">জরুরি মোবাইল নম্বর *</label>
                    <input
                      type="tel"
                      name="emergencyPhone"
                      required
                      placeholder="০১৭১১-XXXXXX"
                      value={formData.emergencyPhone}
                      onChange={handleChange}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-mono"
                    />
                  </div>
                </div>

                <div className="bg-amber-50/70 border border-amber-300/80 rounded-2xl p-4 text-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-900">ভর্তি ও সদস্য ফি: ৳ ১,০০০ (এক হাজার টাকা মাত্র)</span>
                    <span className="text-[11px] text-slate-600">bKash/Nagad Merchant: <strong>01711234567</strong></span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">পরিশোধের মাধ্যম</label>
                      <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                      >
                        <option value="bKash">বিকাশ (bKash)</option>
                        <option value="Nagad">নগদ (Nagad)</option>
                        <option value="Rocket">রকেট (Rocket)</option>
                        <option value="Bank">সরাসরি ব্যাংক ডিপোজিট</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">ট্রানজেকশন আইডি (TrxID) / স্লিপ নং *</label>
                      <input
                        type="text"
                        name="trxId"
                        required
                        placeholder="যেমন: TRXBBP99882"
                        value={formData.trxId}
                        onChange={handleChange}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms and Submit */}
              <div className="pt-2 space-y-4">
                <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={(e) => {
                      handleChange(e);
                      if (e.target.checked) setTermsError(null);
                    }}
                    className="mt-0.5 w-4 h-4 rounded text-blue-900 focus:ring-blue-900"
                  />
                  <span>
                    আমি এই মর্মে অঙ্গীকার করছি যে, উপরে প্রদত্ত সকল তথ্য সত্য ও নির্ভুল। আমি বাংলাদেশ বয়লার পরিচারক পরিষদের গঠনতন্ত্র, নিয়ম-শৃঙ্খলা ও কেন্দ্রীয় সিদ্ধান্ত মেনে চলতে সর্বদা বাধ্য থাকিব।
                  </span>
                </label>

                {termsError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                    <span>{termsError}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-400">
                    * সাবমিট করার পর আবেদনের কপি স্বয়ংক্রিয়ভাবে কেন্দ্রীয় ডাটাবেজে সংরক্ষিত হবে।
                  </span>
                  <button
                    type="submit"
                    className="bg-blue-950 hover:bg-slate-900 text-amber-300 font-bold px-8 py-3 rounded-xl text-sm transition-all shadow-md flex items-center gap-2"
                  >
                    <Send className="w-4 h-4 text-amber-400" />
                    <span>আবেদন সম্পন্ন করুন</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      )}

      {/* 2. CONTACT US TAB */}
      {activeSubTab === 'contact' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Office Contact Info */}
          <div className="lg:col-span-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <h3 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-3">
              কেন্দ্রীয় সচিবালয় ও কার্যালয়
            </h3>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-blue-50 text-blue-900 rounded-xl shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">অফিসের অবস্থান:</h4>
                  <p className="mt-0.5 leading-relaxed">
                    প্লট-২৪, ব্লক-বি (৩য় তলা), তেজগাঁও বাণিজ্যিক ও শিল্প এলাকা, ঢাকা-১২০৮, বাংলাদেশ।
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-amber-50 text-amber-700 rounded-xl shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">টেলিফোন ও হটলাইন:</h4>
                  <p className="mt-0.5 font-mono">কেন্দ্রীয় দপ্তর: +৮৮০ ২ ৯৯৭৭৮৮৯৯</p>
                  <p className="font-mono text-emerald-700 font-bold">জরুরি কারিগরি সহায়তা: ০১৭১১-২৩৪৫৬৭</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-purple-50 text-purple-700 rounded-xl shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">ই-মেইল যোগাযোগ:</h4>
                  <p className="mt-0.5 font-mono">info@boiler-bd.org</p>
                  <p className="font-mono">central@boiler-bd.org</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-teal-50 text-teal-700 rounded-xl shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">অফিস সময়সূচী:</h4>
                  <p className="mt-0.5">শনিবার হতে বৃহস্পতিবার: সকাল ৯:০০ - সন্ধ্যা ৬:০০</p>
                  <p className="text-slate-400">শুক্রবার ও সরকারি ছুটির দিনে জরুরি হেল্পডেস্ক উন্মুক্ত</p>
                </div>
              </div>
            </div>

            {/* Map Simulation Badge */}
            <div className="bg-slate-100 rounded-2xl p-4 border border-slate-200 text-center space-y-2">
              <span className="text-xs font-bold text-slate-700 block">গুগল ম্যাপ লোকেশন ব্যাজ:</span>
              <div className="bg-white p-6 rounded-xl border border-slate-300 flex flex-col items-center justify-center">
                <MapPin className="w-10 h-10 text-red-600 animate-bounce" />
                <span className="text-sm font-bold text-slate-900 mt-2">BBOP Central Headquarters</span>
                <span className="text-xs text-slate-500">Tejgaon Industrial Area, Dhaka</span>
                <span className="text-[11px] font-mono text-blue-900 mt-1">23.7644° N, 90.3957° E</span>
              </div>
            </div>
          </div>

          {/* Quick Message Box */}
          <div className="lg:col-span-6 bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 shadow-xl space-y-5">
            <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
              আমাদের সরাসরি বার্তা পাঠান
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              বয়লার সংক্রান্ত যে কোনো আইনগত পরামর্শ, ট্রেনিং বিষয়ে অনুসন্ধান বা অভিযোগ থাকলে নিচের বক্সে লিখে পাঠান।
            </p>

            {contactSuccess ? (
              <div className="bg-emerald-950/60 border border-emerald-500/50 p-6 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">আপনার বার্তাটি সফলভাবে গৃহীত হয়েছে</h4>
                <p className="text-xs text-slate-300">
                  শীঘ্রই কেন্দ্রীয় দপ্তরের দায়িত্বপ্রাপ্ত কর্মকর্তা আপনার মোবাইল বা ইমেইলে যোগাযোগ করবেন।
                </p>
                <button
                  onClick={() => setContactSuccess(false)}
                  className="mt-3 text-xs text-amber-400 hover:underline inline-block font-semibold"
                >
                  আরেকটি বার্তা পাঠান
                </button>
              </div>
            ) : (
              <form 
                onSubmit={(e) => { 
                  e.preventDefault(); 
                  setContactSuccess(true); 
                }} 
                className="space-y-4 text-xs"
              >
                <div>
                  <label className="block text-slate-300 mb-1">আপনার নাম *</label>
                  <input
                    type="text"
                    required
                    placeholder="নাম লিখুন"
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1">মোবাইল নম্বর *</label>
                    <input
                      type="tel"
                      required
                      placeholder="০১৭১২-XXXXXX"
                      className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">জেলা</label>
                    <input
                      type="text"
                      placeholder="যেমন: চট্টগ্রাম"
                      className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">বার্তার বিষয়</label>
                  <input
                    type="text"
                    placeholder="যেমন: বয়লার সনদ নবায়ন বিষয়ে পরামর্শ"
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">বিস্তারিত বার্তা *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="আপনার বার্তা বিস্তারিত লিখুন..."
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl transition-colors shadow flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>বার্তা প্রেরণ করুন</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
