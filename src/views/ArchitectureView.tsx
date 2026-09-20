import React, { useState } from 'react';
import { 
  Database, 
  Server, 
  ShieldCheck, 
  Layers, 
  Code, 
  Table, 
  FileText, 
  Key, 
  CheckCircle,
  Copy,
  Terminal
} from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  const [activeSec, setActiveSec] = useState<'ddl' | 'modules' | 'security' | 'wordpress'>('ddl');
  const [copied, setCopied] = useState(false);

  const tablesList = [
    { name: 'wp_bbp_members', purpose: 'কেন্দ্রীয় ও সাধারণ সদস্যদের মূল তথ্য (NID, মোবাইল, রক্তের গ্রুপ, স্ট্যাটাস)' },
    { name: 'wp_bbp_member_meta', purpose: 'সদস্যদের এক্সটেন্ডেড মেটাডাটা ও কাস্টম ফিল্ড' },
    { name: 'wp_bbp_boiler_licenses', purpose: 'প্রধান বয়লার পরিদর্শক দপ্তর হতে প্রদত্ত লাইসেন্স ক্লাস ও নবায়ন হিস্ট্রি' },
    { name: 'wp_bbp_committees', purpose: 'কেন্দ্রীয় নির্বাহী পরিষদ ও ঐতিহাসিক বিগত কমিটি টার্ম' },
    { name: 'wp_bbp_committee_members', purpose: 'কমিটির পদবী, মেম্বার ম্যাপিং, পোর্টফোলিও ও ক্রম' },
    { name: 'wp_bbp_branches', purpose: 'জেলা, বিভাগ ও আঞ্চলিক শিল্পাঞ্চল শাখা সমূহের বিবরণ' },
    { name: 'wp_bbp_branch_committees', purpose: 'শাখা সভাপতি, সাধারণ সম্পাদক ও আঞ্চলিক পরিষদ' },
    { name: 'wp_bbp_notices', purpose: 'অফিসিয়াল বিজ্ঞপ্তি, পরিপত্র, জরুরি অ্যালার্ট ও পিডিএফ ফাইল' },
    { name: 'wp_bbp_documents', purpose: 'গঠনতন্ত্র, গেজেট, আবেদন ফরম ও প্রশিক্ষণ ম্যানুয়াল রিপোজিটরি' },
    { name: 'wp_bbp_accounts', purpose: 'পরিষদের ব্যাংক হিসাব ও নগদ পেটি ক্যাশ অ্যাকাউন্টস' },
    { name: 'wp_bbp_transactions', purpose: 'আয় ও ব্যয়ের মূল ডাবল-এন্ট্রি লেজার ট্রানজেকশন (Decimal 12,2)' },
    { name: 'wp_bbp_transaction_categories', purpose: 'আর্থিক হিসাবের চার্ট অব অ্যাকাউন্টস ও খাত' },
    { name: 'wp_bbp_vouchers', purpose: 'ব্যয় ভাউচার, অনুমোদনকারী ও সংযুক্ত বিলের ডিজিটাল কপি' },
    { name: 'wp_bbp_money_receipts', purpose: 'ইউনিক ক্রমিক ও কিউআর কোডসহ মুদ্রিত মানি রসিদ' },
    { name: 'wp_bbp_id_cards', purpose: 'ডিজিটাল স্মার্ট মেম্বার কার্ড জেনারেশন ও কিউআর ভেরিফিকেশন লগ' },
    { name: 'wp_bbp_sms_logs', purpose: 'সদস্যদের বাল্ক নোটিফিকেশন ও লেনদেন নিশ্চিতকরণ এসএমএস' },
    { name: 'wp_bbp_audit_logs', purpose: 'সিস্টেমের যেকোনো পরিবর্তন, রোল অ্যাকশন ও আইপি অ্যাড্রেস লগ' }
  ];

  const sampleSqlDdl = `-- ========================================================
-- বাংলাদেশ বয়লার পরিচারক পরিষদ (BBOP)
-- Database Architecture & Production Schema (MySQL 8.0 / InnoDB)
-- Character Set: utf8mb4 / Collation: utf8mb4_unicode_520_ci
-- ========================================================

CREATE TABLE IF NOT EXISTS \`wp_bbp_members\` (
  \`id\` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`member_id\` VARCHAR(32) NOT NULL UNIQUE COMMENT 'BBOP-YYYY-XXXX',
  \`user_id\` BIGINT UNSIGNED NULL COMMENT 'WordPress Users FK',
  \`name_bn\` VARCHAR(191) NOT NULL,
  \`name_en\` VARCHAR(191) NOT NULL,
  \`father_name\` VARCHAR(191) NOT NULL,
  \`mother_name\` VARCHAR(191) DEFAULT NULL,
  \`dob\` DATE NOT NULL,
  \`blood_group\` ENUM('A+','A-','B+','B-','O+','O-','AB+','AB-') NOT NULL,
  \`nid_no\` VARCHAR(64) NOT NULL UNIQUE,
  \`mobile\` VARCHAR(20) NOT NULL UNIQUE,
  \`email\` VARCHAR(100) DEFAULT NULL,
  \`membership_type\` ENUM('general','lifetime','associate','honorary') NOT NULL DEFAULT 'general',
  \`status\` ENUM('pending','active','suspended','inactive') NOT NULL DEFAULT 'pending',
  \`division\` VARCHAR(64) NOT NULL,
  \`district\` VARCHAR(64) NOT NULL,
  \`upazila\` VARCHAR(64) NOT NULL,
  \`workplace\` VARCHAR(191) NOT NULL,
  \`designation\` VARCHAR(100) NOT NULL,
  \`experience_years\` TINYINT UNSIGNED DEFAULT 0,
  \`photo_url\` TEXT DEFAULT NULL,
  \`signature_url\` TEXT DEFAULT NULL,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX \`idx_member_id\` (\`member_id\`),
  INDEX \`idx_status\` (\`status\`),
  INDEX \`idx_district\` (\`district\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

CREATE TABLE IF NOT EXISTS \`wp_bbp_boiler_licenses\` (
  \`id\` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`member_id\` BIGINT UNSIGNED NOT NULL,
  \`license_no\` VARCHAR(64) NOT NULL UNIQUE,
  \`boiler_class\` ENUM('1st_class','2nd_class','3rd_class') NOT NULL,
  \`issuing_authority\` VARCHAR(191) DEFAULT 'Office of the Chief Inspector of Boilers',
  \`issue_date\` DATE NOT NULL,
  \`expiry_date\` DATE NOT NULL,
  \`verification_status\` ENUM('verified','pending','expired') DEFAULT 'verified',
  FOREIGN KEY (\`member_id\`) REFERENCES \`wp_bbp_members\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

CREATE TABLE IF NOT EXISTS \`wp_bbp_transactions\` (
  \`id\` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`transaction_type\` ENUM('income','expense') NOT NULL,
  \`account_id\` BIGINT UNSIGNED NOT NULL,
  \`category_id\` BIGINT UNSIGNED NOT NULL,
  \`voucher_no\` VARCHAR(64) NOT NULL UNIQUE,
  \`receipt_no\` VARCHAR(64) NULL,
  \`amount\` DECIMAL(12,2) NOT NULL DEFAULT 0.00 COMMENT 'Strict decimal representation',
  \`payment_method\` ENUM('cash','bank_transfer','bkash','nagad','cheque') NOT NULL,
  \`reference\` VARCHAR(100) DEFAULT NULL,
  \`transacted_at\` DATE NOT NULL,
  \`created_by\` BIGINT UNSIGNED NOT NULL,
  \`approved_by\` BIGINT UNSIGNED NULL,
  \`notes\` TEXT DEFAULT NULL,
  INDEX \`idx_transacted_at\` (\`transacted_at\`),
  INDEX \`idx_type\` (\`transaction_type\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

CREATE TABLE IF NOT EXISTS \`wp_bbp_audit_logs\` (
  \`id\` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`user_id\` BIGINT UNSIGNED NULL,
  \`action\` VARCHAR(50) NOT NULL,
  \`module\` VARCHAR(50) NOT NULL,
  \`record_id\` VARCHAR(50) NULL,
  \`details\` TEXT NOT NULL,
  \`ip_address\` VARCHAR(45) NOT NULL,
  \`user_agent\` VARCHAR(255) NULL,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX \`idx_module\` (\`module\`),
  INDEX \`idx_created_at\` (\`created_at\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;`;

  const copyCode = () => {
    navigator.clipboard.writeText(sampleSqlDdl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <span className="text-xs font-bold text-blue-900 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
          কারিগরি আর্কিটেকচার ও ডেটাবেজ স্পেসিফিকেশন
        </span>
        <h1 className="text-3xl font-bold text-slate-900 mt-2">
          সিস্টেম আর্কিটেকচার ও ডেটাবেজ স্কিমা (১৭ টেবিল)
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          বাংলাদেশ বয়লার পরিচারক পরিষদের জাতীয় পর্যায়ের ম্যানেজমেন্ট সিস্টেমের কারিগরি ভিত্তি, রিলেশনাল স্কিমা ও সিকিউরিটি স্ট্যান্ডার্ড।
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveSec('ddl')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeSec === 'ddl' ? 'bg-blue-950 text-amber-400' : 'bg-white border text-slate-600'
          }`}
        >
          ১৭টি ডেটাবেজ টেবিল ও DDL
        </button>
        <button
          onClick={() => setActiveSec('modules')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeSec === 'modules' ? 'bg-blue-950 text-amber-400' : 'bg-white border text-slate-600'
          }`}
        >
          ১৯টি মূল মডিউল কাঠামো
        </button>
        <button
          onClick={() => setActiveSec('wordpress')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeSec === 'wordpress' ? 'bg-blue-950 text-amber-400' : 'bg-white border text-slate-600'
          }`}
        >
          ওয়ার্ডপ্রেস ও সিপ্যানেল ডিপ্লয়মেন্ট নির্দেশিকা
        </button>
        <button
          onClick={() => setActiveSec('security')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeSec === 'security' ? 'bg-blue-950 text-amber-400' : 'bg-white border text-slate-600'
          }`}
        >
          নিরাপত্তা ও ফিনান্সিয়াল প্রিসিশন
        </button>
      </div>

      {/* 1. DDL & TABLES */}
      {activeSec === 'ddl' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {tablesList.map((t, idx) => (
              <div key={t.name} className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono bg-blue-100 text-blue-900 font-bold px-1.5 py-0.5 rounded">
                    #{idx + 1}
                  </span>
                  <span className="font-mono font-bold text-xs text-slate-900">{t.name}</span>
                </div>
                <p className="text-[11px] text-slate-500">{t.purpose}</p>
              </div>
            ))}
          </div>

          {/* DDL Code Viewer */}
          <div className="bg-slate-950 text-slate-200 rounded-2xl p-6 border border-slate-800 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                <Terminal className="w-4 h-4" />
                <span>schema_bbop_production.sql (InnoDB, UTF-8MB4)</span>
              </div>
              <button
                onClick={copyCode}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors border border-slate-700"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'কপি হয়েছে!' : 'SQL কোড কপি'}</span>
              </button>
            </div>

            <pre className="text-[11px] font-mono text-emerald-400 overflow-x-auto leading-relaxed max-h-[500px]">
              {sampleSqlDdl}
            </pre>
          </div>
        </div>
      )}

      {/* 2. MODULES */}
      {activeSec === 'modules' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <h3 className="text-base font-bold text-slate-900">সিস্টেমের ১৯টি মূল কার্যকর মডিউল</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <strong className="text-slate-900 block font-bold text-sm">১. পাবলিক পোর্টাল ও ব্র্যান্ডিং</strong>
              <p className="text-slate-600">জাতীয় সম্মেলন, ইতিহাস, মিশন, ভিশন, ডাইনামিক নোটিশ স্ক্রলার ও হেল্পলাইন।</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <strong className="text-slate-900 block font-bold text-sm">২. সেন্ট্রাল কমিটি ডিরেক্টরি</strong>
              <p className="text-slate-600">বর্তমান কেন্দ্রীয় নির্বাহী কমিটি ও বিগত পরিষদসমূহের ঐতিহাসিক আর্কাইভ।</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <strong className="text-slate-900 block font-bold text-sm">৩. অনলাইন সদস্য রেজিস্ট্রেশন</strong>
              <p className="text-slate-600">ব্যক্তিগত, বয়লার সনদ ও জরুরি অভিভাবক তথ্যসহ সরাসরি আবেদন ও ট্র্যাকিং।</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <strong className="text-slate-900 block font-bold text-sm">৪. স্মার্ট আইডি কার্ড জেনারেটর</strong>
              <p className="text-slate-600">অফিশিয়াল সিল, নিরাপত্তা কিউআর কোড ও উভমুখী প্রিন্টযোগ্য ডিজিটাল মেম্বার কার্ড।</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <strong className="text-slate-900 block font-bold text-sm">৫. আয়-ব্যয় ও আর্থিক স্বচ্ছতা</strong>
              <p className="text-slate-600">চাঁদা রসিদ, ব্যয় ভাউচার, ক্যাশ বুক লেজার ও ব্যাংক ব্যালেন্সের নিখুঁত হিসেব।</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <strong className="text-slate-900 block font-bold text-sm">৬. রোল-বেসড সিকিউরিটি ও অডিট</strong>
              <p className="text-slate-600">Super Admin সহ ৭টি স্তরের পারমিশন ও আইপি-সহ বিস্তারিত কার্যক্রমের ট্র্যাকিং।</p>
            </div>
          </div>
        </div>
      )}

      {/* 3. SECURITY & PRECISION */}
      {activeSec === 'security' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <h3 className="text-base font-bold text-slate-900">নিরাপত্তা ও আর্থিক ডেটার নির্ভুলতা</h3>
          <div className="space-y-3 text-xs text-slate-700">
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl">
              <strong className="text-emerald-900 block font-bold mb-1">১. ফ্লোটিং পয়েন্ট নয় — DECIMAL(12,2) স্ট্যান্ডার্ড</strong>
              <p className="text-emerald-800">
                আর্থিক হিসাবের প্রতিটি কলাম যেমন মাসিক চাঁদা, ভর্তি ফি, ব্যয়ের পরিমাণ строго `DECIMAL(12,2)` টাইপে সংরক্ষিত হয় যাতে কোনো প্রকার রাউন্ডিং লস বা ভুল ব্যালেন্স সৃষ্টি না হয়।
              </p>
            </div>

            <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl">
              <strong className="text-blue-900 block font-bold mb-1">২. অপরিবর্তনীয় অডিট ট্রেইল (Immutable Audit Logs)</strong>
              <p className="text-blue-800">
                যেকোনো সদস্য অনুমোদন, টাকা গ্রহণ, ভাউচার অনুমোদন বা নোটিশ সংশোধনের সাথে ব্যবহারকারীর রোল, সময় ও রিয়েল আইপি অ্যাড্রেস স্থায়ীভাবে সংরক্ষিত হয়।
              </p>
            </div>

            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl">
              <strong className="text-amber-900 block font-bold mb-1">৩. কিউআর কোড নিরাপত্তা ও ভ্যালিডেশন</strong>
              <p className="text-amber-800">
                প্রতিটি সদস্য কার্ড এবং মানি রসিদে ডিজিটাল ভেরিফিকেশন হ্যাশ এনকোড করা কিউআর কোড সংযুক্ত থাকে, যা স্ক্যান করে কেন্দ্রীয় ডাটাবেজের সাথে সত্যতা নিশ্চিত করা যায়।
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 4. WORDPRESS & CPANEL DEPLOYMENT GUIDE */}
      {activeSec === 'wordpress' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div>
            <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-md">
              সমস্যা সমাধান গাইড
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-2">
              ওয়ার্ডপ্রেস "Broken Themes" (public, src) সমাধান ও সঠিক ডিপ্লয়মেন্ট
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              ওয়ার্ডপ্রেসের Appearance &gt; Themes-এ "public" এবং "src" ফোল্ডার দুটি ব্রোকেন থিম হিসেবে দেখালে কীভাবে এক ক্লিকে সমাধান করবেন এবং এই ওয়েবসাইটটি লাইভ সার্ভারে সঠিকভাবে চালাবেন।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-red-900 font-bold text-sm">
                <span>❌ সমস্যা কেন হয়েছে?</span>
              </div>
              <p className="text-xs text-red-800 leading-relaxed">
                ওয়ার্ডপ্রেসের <code>wp-content/themes/</code> ডিরেক্টরির ভেতরে ভুলেও <code>public</code> এবং <code>src</code> ফোল্ডার আপলোড হয়ে গেছে। ওয়ার্ডপ্রেস প্রতিটি সাবফোল্ডারকে থিম মনে করে, আর সেগুলোর ভেতর <code>style.css</code> না পেয়ে 'Broken Theme' দেখায়।
              </p>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                <span>✅ তাৎক্ষণিক সমাধান (২টি ক্লিক)</span>
              </div>
              <ol className="text-xs text-emerald-900 list-decimal list-inside space-y-1">
                <li>ওয়ার্ডপ্রেস ড্যাশবোর্ডে <strong>Appearance &gt; Themes</strong> এ যান।</li>
                <li>নিচে <code>public</code> এর পাশে লাল <strong>Delete</strong> বাটনে ক্লিক করুন।</li>
                <li>নিচে <code>src</code> এর পাশে লাল <strong>Delete</strong> বাটনে ক্লিক করুন।</li>
                <li>ক্লিক করলেই ব্রোকেন থিম দুটি স্থায়ীভাবে মুছে যাবে!</li>
              </ol>
            </div>
          </div>

          <div className="p-4 bg-slate-900 text-slate-200 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Terminal className="w-4 h-4" />
              <span>cPanel বা হোস্টিংয়ে ওয়েবসাইটটি লাইভ করার সঠিক নিয়ম</span>
            </div>
            <p className="text-xs text-slate-300">
              এটি একটি আধুনিক আল্ট্রা-ফাস্ট React/Vite ওয়েব অ্যাপ্লিকেশন। এটি cPanel-এ আপলোড করতে:
            </p>
            <div className="bg-slate-950 p-3 rounded-lg font-mono text-[11px] text-emerald-400 space-y-1">
              <p>১. আপনার cPanel File Manager &gt; <strong>public_html</strong> ফোল্ডারে যান।</p>
              <p>২. এই অ্যাপের বিল্ড করা <strong>dist</strong> ফোল্ডারের ভেতরের সমস্ত ফাইল (assets ফোল্ডার, index.html এবং .htaccess) সরাসরি public_html-এ আপলোড করুন।</p>
              <p>৩. সাথে সাথে আপনার ডোমেইনে সম্পূর্ণ ওয়েবসাইটটি হাই-স্পিডে লাইভ কাজ করবে!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
