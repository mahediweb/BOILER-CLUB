export interface ArchitectureSection {
  id: string;
  number: number;
  titleBangla: string;
  titleEnglish: string;
  category: 'Overview' | 'Database' | 'Architecture' | 'Security' | 'WordPress';
  contentMarkdown: string;
}

export const ARCHITECTURE_SECTIONS: ArchitectureSection[] = [
  {
    id: 'sitemap',
    number: 1,
    titleBangla: '১. পূর্ণাঙ্গ সাইটম্যাপ (Complete Sitemap)',
    titleEnglish: '1. Complete Sitemap',
    category: 'Overview',
    contentMarkdown: `
### পাবলিক ওয়েবসাইট সাইটম্যাপ (Public Navigation Hierarchy)
* **হোম পেজ (/)**
  * হিরো স্লাইডার ও সংগঠনের মূল স্লোগান
  * কুইক অ্যাকসেস কার্ড (৮টি প্রধান মডিউল)
  * সভাপতি ও সাধারণ সম্পাদকের শুভেচ্ছা বাণী
  * আমাদের সম্পর্কে সংক্ষেপ
  * লাইভ পরিসংখ্যান কাউন্টার
  * সর্বশেষ নোটিশ ও জরুরি সতর্কতা
  * সাম্প্রতিক সংবাদ ও সাংগঠনিক কার্যক্রম
  * আর্থিক স্বচ্ছতা ও ফান্ড স্ট্যাটাস ব্লক
  * ফটো গ্যালারি প্রিভিউ
  * ফুটার (অফিস ঠিকানা, হটলাইন, ম্যাপ, লিংক)
* **আমাদের সম্পর্কে (/about)**
  * সংগঠনের সংক্ষিপ্ত ইতিহাস ও পটভূমি
  * লক্ষ্য, উদ্দেশ্য ও মূল দর্শন
  * জাতীয় শিল্পে বয়লার পরিচারকদের ভূমিকা
  * সাংগঠনিক কাঠামো ও নীতিমালা
* **কেন্দ্রীয় কমিটি (/committee)**
  * বর্তমান কার্যনির্বাহী পরিষদ (২০২৪-২০২৬)
  * পদক্রমভিত্তিক বিস্তারিত প্রোফাইল কার্ড
  * বিগত সাবেক কমিটি আর্কাইভ (২০২২-২০২৪, ২০২০-২০২২)
* **সদস্যবৃন্দ (/members)**
  * পূর্ণাঙ্গ সদস্য ডিরেক্টরি
  * লাইভ ফিল্টারিং (জেলা, শাখা, বয়লার ক্লাস, সদস্য টাইপ)
  * সার্চ (নাম, সদস্য আইডি, কর্মস্থল, লাইসেন্স নম্বর)
  * পাবলিক প্রোফাইল ও ডিজিটাল আইডি কার্ড প্রিভিউ
* **শাখা কমিটি (/branches)**
  * বিভাগভিত্তিক ও জেলাভিত্তিক শাখা তালিকা
  * শাখা নির্বাহী কমিটি ও সমন্বয়ক যোগাযোগ
* **নোটিশ বোর্ড (/notices)**
  * ক্যাটাগরিভিত্তিক নোটিশ (সাধারণ, জরুরি, সভা, নির্বাচন, প্রশিক্ষণ, পরিপত্র)
  * পিডিএফ ভিউয়ার ও ডাউনলোড
* **সংবাদ ও কার্যক্রম (/news)**
  * জাতীয় সম্মেলন, প্রশিক্ষণ, সামাজিক কল্যাণ ও সেমিনার
* **আর্থিক স্বচ্ছতা ও হিসাব (/finance)**
  * আয়-ব্যয় হিসাব বিবরণী ও ব্যাংক ব্যালেন্স
  * বার্ষিক অডিট প্রতিবেদন ও চার্ট
* **গ্যালারি (/gallery)**
  * অ্যালবামভিত্তিক আলোকচিত্র ও ভিডিও
* **ডকুমেন্ট সেন্টার (/documents)**
  * মূল গঠনতন্ত্র, বয়লার আইন ২০২৩, সরকারি পরিপত্র ও আবেদন ফরম
* **যোগাযোগ ও সদস্য নিবন্ধন (/contact-register)**
  * অনলাইন সদস্য ভর্তি আবেদন ফর্ম
  * কেন্দ্রীয় ও আঞ্চলিক কার্যালয়ের যোগাযোগ তথ্য

---

### অ্যাডমিন ও ড্যাশবোর্ড সাইটম্যাপ (Admin & Portals)
* **অ্যাডমিন ড্যাশবোর্ড (/admin)**
  * ওভারভিউ মেট্রিক্স কার্ড (সদস্য, শাখা, আয়, ব্যয়, স্থিতি, নোটিশ)
  * অ্যানালাইটিক্যাল চার্ট (আয় বনাম ব্যয়, জেলাভিত্তিক সদস্য বিস্তার)
  * সদস্য ব্যবস্থাপনা (পেন্ডিং আবেদন অনুমোদন, আইডি কার্ড জেনারেটর)
  * কমিটি ম্যানেজার (পদবি বণ্টন ও মেয়াদ নির্ধারণ)
  * শাখা ব্যবস্থাপনা (নতুন শাখা অন্তর্ভুক্তি ও কমিটি গঠন)
  * নোটিশ ম্যানেজার (ড্রাফট, শিডিউল, পিন, ক্যাটাগরি)
  * হিসাব ব্যবস্থাপনা:
    * আয় ভাউচার এন্ট্রি ও রশিদ জেনারেশন
    * ব্যয় ভাউচার ও অনুমোদন
    * অটোমেটেড ক্যাশ বুক লেজার
    * ব্যাংক অ্যাকাউন্ট ও রিকনসিলিয়েশন
    * আর্থিক প্রতিবেদন (দৈনিক, মাসিক, ত্রৈমাসিক, বার্ষিক)
  * অডিট লগ হিস্ট্রি
  * রোল ও পারমিশন কন্ট্রোল
  * সিস্টেম সেটিংস
* **সদস্য পোর্টাল (/member-portal)**
  * নিজস্ব প্রোফাইল ও সনদ তথ্যাদি
  * ডিজিটাল মেম্বারশিপ কার্ড (দ্বিমুখী প্রিন্ট ও কিউআর ভেরিফিকেশন)
  * মাসিক চাঁদা প্রদানের স্থিতি ও মানি রিসিপ্ট
  * সদস্য-নির্দিষ্ট নোটিশ ও সার্টিফিকেট ডাউনলোড
    `
  },
  {
    id: 'userflow',
    number: 2,
    titleBangla: '২. কমপ্লিট ইউজার ফ্লো (Complete User Flow)',
    titleEnglish: '2. Complete User Flow',
    category: 'Overview',
    contentMarkdown: `
### ১. নতুন সদস্য নিবন্ধন ও আইডি জেনারেশন ফ্লো (Member Onboarding Flow)
\`\`\`text
[ভিজিটর/বয়লার অপারেটর]
       │
       ▼
[অনলাইন রেজিস্ট্রেশন ফরম পূরণ] ──> (ব্যক্তিগত তথ্য, কর্মস্থল, বয়লার লাইসেন্স ক্লাস ও ছবি আপলোড)
       │
       ▼
[ডাটাবেজে 'পেন্ডিং' স্ট্যাটাস এন্ট্রি]
       │
       ▼
[অ্যাডমিন ড্যাশবোর্ডে নোটিফিকেশন প্রদর্শন]
       │
       ▼
[অ্যাডমিন/মেম্বার ম্যানেজার কর্তৃক যাচাই]
       ├── [ত্রুটিপূর্ণ/অযোগ্য] ──> [বাতিল / রিজেক্ট নোটিশ ইমেইল/এসএমএস]
       │
       └── [সঠিক ও অনুমোদিত]
                 │
                 ▼
       [অটোমেটিক ইউনিক মেম্বার আইডি তৈরি (উদা: BBOP-2026-089)]
                 │
                 ▼
       [ডিজিটাল মেম্বার আইডি কার্ড ও অ্যাকাউন্ট সক্রিয়]
                 │
                 ▼
       [সদস্য পোর্টালে লগইন ও আইডি কার্ড প্রিন্ট সুবিধা]
\`\`\`

---

### ২. আর্থিক লেনদেন ও অটোমেটেড ক্যাশবুক ফ্লো (Financial Transaction Flow)
\`\`\`text
[লেনদেন প্রাপ্তি / চাঁদা / অনুদান]
       │
       ▼
[হিসাব কর্মকর্তা কর্তৃক আয় ভাউচার তৈরি]
       │
       ▼
[খাত নির্বাচন: মাসিক চাঁদা, অনুদান, ফি ইত্যাদি]
       │
       ▼
[পেমেন্ট মেথড নির্ধারণ: ব্যাংক / নগদ / বিকাশ / চেক]
       │
       ▼
[ডাটাবেজ সেভ: wp_bbp_income & wp_bbp_cashbook]
       │
       ├──> [স্বয়ংক্রিয় মানি রিসিপ্ট (Money Receipt) জেনারেশন (PDF/Print)]
       ├──> [ব্যাংক অ্যাকাউন্টের ব্যালেন্স অটো-আপডেট]
       ├──> [ড্যাশবোর্ড চার্ট ও আর্থিক স্বচ্ছতা ব্লকে রিয়েলটাইম আপডেট]
       └──> [অডিট লগে ব্যবহারকারী ও আইপি সহ এন্ট্রি সংরক্ষণ]
\`\`\`
    `
  },
  {
    id: 'database-architecture',
    number: 3,
    titleBangla: '৩. ডাটাবেজ আর্কিটেকচার (Database Architecture)',
    titleEnglish: '3. Complete Database Architecture',
    category: 'Database',
    contentMarkdown: `
* **ডাটাবেজ ইঞ্জিন**: MySQL 8.0+ / MariaDB 10.5+ (Engine: \`InnoDB\` for full ACID compliance and Foreign Key constraints).
* **চরিত্র সেট ও কোলেশন**: \`utf8mb4\` এবং \`utf8mb4_unicode_ci\`। বাংলা যুক্তাক্ষর, দীর্ঘ নাম ও বিশেষ চিহ্নের শতভাগ সঠিক রেন্ডারিং নিশ্চিত করা হয়েছে।
* **আর্থিক ডাটা টাইপ নিরাপত্তা**: আর্থিক হিসাবের ক্ষেত্রে কোনো \`FLOAT\` বা \`DOUBLE\` ব্যবহার করা নিষিদ্ধ। সর্বদা \`DECIMAL(15,2)\` ব্যবহার করা হবে যাতে ১ পয়সাও ফ্র্যাকশনাল রাউন্ডিং এরর না হয়।
* **সফট ডিলিট পলিসি (Soft Delete)**: মেম্বার, নোটিশ ও আর্থিক রেকর্ডে \`is_deleted TINYINT(1) DEFAULT 0\` ও \`deleted_at DATETIME NULL\` রাখা হয়েছে।
* **ইনডেক্সিং স্ট্র্যাটেজি**: সার্চ পারফরম্যান্সের জন্য \`member_id\`, \`district\`, \`status\`, \`boiler_license_no\`, \`date\` কলামসমূহে B-Tree ইনডেক্স স্থাপন।
    `
  },
  {
    id: 'er-diagram',
    number: 4,
    titleBangla: '৪. ই-আর ডায়াগ্রাম সম্পর্ক (ER Diagram & Data Relationships)',
    titleEnglish: '4. Entity-Relationship Diagram',
    category: 'Database',
    contentMarkdown: `
\`\`\`text
+-----------------------+              +------------------------+
|    wp_bbp_branches    | 1          * |     wp_bbp_members     |
|-----------------------|--------------|------------------------|
| id (PK)               |              | id (PK)                |
| name_bangla           |              | member_id (Unique)     |
| district              |              | branch_id (FK)         |
| division              |              | boiler_license_no      |
+-----------------------+              | boiler_class           |
           | 1                         | status                 |
           |                           +------------------------+
           | *                                     | 1
+----------------------------+                     |
| wp_bbp_committee_members   |                     | *
|----------------------------|         +-----------------------------+
| id (PK)                    |         | wp_bbp_membership_payments  |
| committee_id (FK)          |         |-----------------------------|
| member_id (FK, optional)   |         | id (PK)                     |
| position_id                |         | member_id (FK)              |
| term                       |         | fee_type, amount, date      |
+----------------------------+         +-----------------------------+
           | *                                     |
           | 1                                     | creates
+-----------------------+                          |
|   wp_bbp_committees   |                          ▼
|-----------------------|              +------------------------+
| id (PK)               |              |     wp_bbp_receipts    |
| term_name             |              |------------------------|
| start_date, end_date  |              | id (PK)                |
| is_current            |              | receipt_no (Unique)    |
+-----------------------+              | income_id (FK)         |
                                       | member_id (FK)         |
+-----------------------+              | amount, received_by    |
|    wp_bbp_income      | 1          1 +------------------------+
|-----------------------|--------------+           ▲
| id (PK)               |                          │
| voucher_no (Unique)   |                          │ auto-links
| head_id, amount, date | 1          1             │
+-----------------------+--------------+           │
           │                           │           │
           │ logs                      ▼           │
           ▼                   +------------------------+
+-----------------------+      |    wp_bbp_cashbook     |
|   wp_bbp_expenses     |      |------------------------|
|-----------------------|      | id (PK)                |
| id (PK)               |      | date, voucher_no       |
| voucher_no (Unique)   |      | debit, credit, balance |
| amount, approved_by   |      +------------------------+
+-----------------------+
\`\`\`
    `
  },
  {
    id: 'database-tables-sql',
    number: 11,
    titleBangla: '১১. ১৭টি পূর্ণাঙ্গ ডাটাবেজ টেবিল স্কিমা (All 17 MySQL Tables DDL)',
    titleEnglish: '11. Complete MySQL Database DDL',
    category: 'Database',
    contentMarkdown: `
\`\`\`sql
-- 1. Members Table
CREATE TABLE IF NOT EXISTS wp_bbp_members (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  member_id VARCHAR(32) NOT NULL UNIQUE,
  user_id BIGINT UNSIGNED NULL,
  branch_id BIGINT UNSIGNED NULL,
  name_bangla VARCHAR(191) NOT NULL,
  name_english VARCHAR(191) NOT NULL,
  father_name VARCHAR(191) NULL,
  mother_name VARCHAR(191) NULL,
  date_of_birth DATE NULL,
  blood_group VARCHAR(10) NULL,
  nid_no VARCHAR(50) NULL,
  mobile VARCHAR(30) NOT NULL,
  email VARCHAR(100) NULL,
  district VARCHAR(100) NOT NULL,
  upazila VARCHAR(100) NULL,
  workplace VARCHAR(255) NOT NULL,
  designation VARCHAR(150) NOT NULL,
  boiler_license_no VARCHAR(100) NOT NULL,
  boiler_class ENUM('1st Class', '2nd Class', '3rd Class', 'Certified Engineer') NOT NULL,
  license_issue_date DATE NULL,
  membership_type ENUM('General', 'Life', 'Associate') DEFAULT 'General',
  status ENUM('active', 'inactive', 'pending', 'rejected') DEFAULT 'pending',
  photo_url VARCHAR(500) NULL,
  emergency_name VARCHAR(191) NULL,
  emergency_relation VARCHAR(100) NULL,
  emergency_phone VARCHAR(30) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_member_district (district),
  INDEX idx_member_status (status),
  INDEX idx_boiler_license (boiler_license_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Committees Table
CREATE TABLE IF NOT EXISTS wp_bbp_committees (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title_bangla VARCHAR(191) NOT NULL,
  term_years VARCHAR(50) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_current TINYINT(1) DEFAULT 1,
  committee_type ENUM('central', 'branch', 'ad-hoc') DEFAULT 'central',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Committee Members
CREATE TABLE IF NOT EXISTS wp_bbp_committee_members (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  committee_id BIGINT UNSIGNED NOT NULL,
  member_id BIGINT UNSIGNED NULL,
  name_bangla VARCHAR(191) NOT NULL,
  position VARCHAR(150) NOT NULL,
  position_order INT DEFAULT 99,
  district VARCHAR(100) NULL,
  mobile VARCHAR(30) NULL,
  photo_url VARCHAR(500) NULL,
  short_bio TEXT NULL,
  FOREIGN KEY (committee_id) REFERENCES wp_bbp_committees(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Branches Table
CREATE TABLE IF NOT EXISTS wp_bbp_branches (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name_bangla VARCHAR(191) NOT NULL,
  division VARCHAR(100) NOT NULL,
  district VARCHAR(100) NOT NULL,
  upazila VARCHAR(100) NULL,
  office_address TEXT NULL,
  president_name VARCHAR(191) NULL,
  president_phone VARCHAR(30) NULL,
  secretary_name VARCHAR(191) NULL,
  secretary_phone VARCHAR(30) NULL,
  total_members INT DEFAULT 0,
  established_date DATE NULL,
  status ENUM('active', 'proposed', 'inactive') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Notices Table
CREATE TABLE IF NOT EXISTS wp_bbp_notices (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category ENUM('general', 'emergency', 'meeting', 'election', 'financial', 'training', 'circular') DEFAULT 'general',
  publish_date DATE NOT NULL,
  description LONGTEXT NOT NULL,
  attachment_url VARCHAR(500) NULL,
  is_important TINYINT(1) DEFAULT 0,
  is_pinned TINYINT(1) DEFAULT 0,
  views INT DEFAULT 0,
  status ENUM('published', 'draft', 'archived') DEFAULT 'published'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. News & Activities
CREATE TABLE IF NOT EXISTS wp_bbp_news (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  excerpt TEXT NULL,
  content LONGTEXT NOT NULL,
  featured_image VARCHAR(500) NULL,
  author VARCHAR(150) DEFAULT 'অ্যাডমিন',
  views INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Photo Gallery
CREATE TABLE IF NOT EXISTS wp_bbp_gallery (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  album_title VARCHAR(191) NOT NULL,
  event_date DATE NOT NULL,
  location VARCHAR(191) NULL,
  cover_image VARCHAR(500) NOT NULL,
  photo_count INT DEFAULT 1,
  category VARCHAR(100) DEFAULT 'অনুষ্ঠান'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Official Documents
CREATE TABLE IF NOT EXISTS wp_bbp_documents (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  file_size VARCHAR(50) NULL,
  publish_date DATE NOT NULL,
  download_url VARCHAR(500) NOT NULL,
  description TEXT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Income Records
CREATE TABLE IF NOT EXISTS wp_bbp_income (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  voucher_no VARCHAR(50) NOT NULL UNIQUE,
  date DATE NOT NULL,
  head VARCHAR(100) NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  received_from VARCHAR(191) NOT NULL,
  member_id VARCHAR(32) NULL,
  receipt_number VARCHAR(50) NOT NULL,
  bank_account_id BIGINT UNSIGNED NULL,
  reference VARCHAR(191) NULL,
  notes TEXT NULL,
  created_by VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. Expense Records
CREATE TABLE IF NOT EXISTS wp_bbp_expenses (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  voucher_no VARCHAR(50) NOT NULL UNIQUE,
  date DATE NOT NULL,
  head VARCHAR(100) NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  paid_to VARCHAR(191) NOT NULL,
  approved_by VARCHAR(191) NOT NULL,
  bank_account_id BIGINT UNSIGNED NULL,
  reference VARCHAR(191) NULL,
  notes TEXT NULL,
  created_by VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. Cash Book Ledger
CREATE TABLE IF NOT EXISTS wp_bbp_cashbook (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  date DATE NOT NULL,
  voucher_no VARCHAR(50) NOT NULL,
  description VARCHAR(255) NOT NULL,
  debit DECIMAL(15,2) DEFAULT 0.00,
  credit DECIMAL(15,2) DEFAULT 0.00,
  balance DECIMAL(15,2) NOT NULL,
  transaction_type ENUM('INCOME', 'EXPENSE') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. Bank Accounts
CREATE TABLE IF NOT EXISTS wp_bbp_bank_accounts (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  bank_name VARCHAR(191) NOT NULL,
  account_name VARCHAR(191) NOT NULL,
  account_number VARCHAR(100) NOT NULL UNIQUE,
  branch VARCHAR(150) NOT NULL,
  balance DECIMAL(15,2) DEFAULT 0.00,
  account_type ENUM('current', 'savings', 'fdr') DEFAULT 'current'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. Bank Transactions
CREATE TABLE IF NOT EXISTS wp_bbp_bank_transactions (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  bank_account_id BIGINT UNSIGNED NOT NULL,
  transaction_date DATE NOT NULL,
  transaction_type ENUM('deposit', 'withdrawal', 'transfer', 'interest', 'charge') NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  reference VARCHAR(191) NULL,
  balance_after DECIMAL(15,2) NOT NULL,
  FOREIGN KEY (bank_account_id) REFERENCES wp_bbp_bank_accounts(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 14. Membership Payments
CREATE TABLE IF NOT EXISTS wp_bbp_membership_payments (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  member_id VARCHAR(32) NOT NULL,
  fee_type VARCHAR(100) NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  payment_date DATE NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  trx_id VARCHAR(100) NULL,
  receipt_no VARCHAR(50) NOT NULL,
  payment_status ENUM('paid', 'pending', 'due') DEFAULT 'paid'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 15. Money Receipts
CREATE TABLE IF NOT EXISTS wp_bbp_receipts (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  receipt_no VARCHAR(50) NOT NULL UNIQUE,
  income_id BIGINT UNSIGNED NULL,
  date DATE NOT NULL,
  received_from VARCHAR(191) NOT NULL,
  purpose VARCHAR(255) NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  received_by VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 16. Audit Logs
CREATE TABLE IF NOT EXISTS wp_bbp_audit_logs (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(150) NOT NULL,
  role VARCHAR(50) NOT NULL,
  action VARCHAR(100) NOT NULL,
  module VARCHAR(100) NOT NULL,
  ip_address VARCHAR(45) NOT NULL,
  details TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 17. Organization Settings
CREATE TABLE IF NOT EXISTS wp_bbp_settings (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(100) NOT NULL UNIQUE,
  setting_value LONGTEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
\`\`\`
    `
  },
  {
    id: 'role-matrix',
    number: 12,
    titleBangla: '১২. ইউজার রোল ও পারমিশন ম্যাট্রিক্স (Role & Permission Matrix)',
    titleEnglish: '12. Role & Permission Matrix',
    category: 'Security',
    contentMarkdown: `
| মডিউল / কার্যাবলী | Super Admin | Administrator | Accounts Officer | Member Manager | Editor | Branch Admin | Viewer |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **সিস্টেম সেটিংস ও ডাটাবেজ ব্যাকআপ** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **ইউজার তৈরি ও রোল নির্ধারণ** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **সদস্য অনুমোদন ও বাতিল** | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ (শুধুমাত্র প্রস্তাব) | ❌ |
| **সদস্য তথ্য এডিট ও ডিলিট** | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **আইডি কার্ড তৈরি ও প্রিন্ট** | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ (নিজ শাখা) | ❌ |
| **আয় ভাউচার ও মানি রিসিপ্ট এন্ট্রি** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **ব্যয় ভাউচার তৈরি ও অনুমোদন** | ✅ | ❌ (অনুমোদন সভাপতি) | ✅ (এন্ট্রি) | ❌ | ❌ | ❌ | ❌ |
| **ক্যাশ বুক ও ব্যাংক রিকনসিলিয়েশন**| ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **আর্থিক রিপোর্ট তৈরি ও এক্সপোর্ট** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **নোটিশ প্রকাশ ও শিডিউলিং** | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| **সংবাদ, ব্লগ ও গ্যালারি পোস্ট** | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| **ডকুমেন্ট আপলোড ও ক্যাটাগরি** | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| **অডিট লগ পরিদর্শন** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
    `
  },
  {
    id: 'wp-architecture',
    number: 14,
    titleBangla: '১৪. ওয়ার্ডপ্রেস থিম ও প্লাগইন আর্কিটেকচার (Theme & Plugin Architecture)',
    titleEnglish: '14. WordPress Theme & Plugin Architecture',
    category: 'WordPress',
    contentMarkdown: `
### কাস্টম থিম আর্কিটেকচার (wp-content/themes/bbop-theme/)
* \`style.css\`: থিম হেডার মেটাডাটা ও গ্লোবাল স্টাইল।
* \`functions.php\`: স্ক্রিপ্ট, স্টাইলশীট, মেনু লোকেশন, থিম সাপোর্ট এনকিউ।
* \`header.php\`: মেটা ট্যাগ, ওজিপা ট্যাগ, টপ বার, ন্যাশনাল লোগো ও প্রাইমারি নেভিগেশন।
* \`footer.php\`: ৪ কলাম প্রাতিষ্ঠানিক ফুটার, কপিরাইট, সোশ্যাল হ্যান্ডেল ও স্ক্রিপ্টস।
* \`front-page.php\`: হোমপেজের মডুলার সেকশনসমূহ।
* \`page-templates/\`:
  * \`template-committee.php\`: কেন্দ্রীয় ও সাবেক কমিটি ভিউ।
  * \`template-members.php\`: ফিল্টার ও সার্চ সহ মেম্বার ডিরেক্টরি।
  * \`template-branches.php\`: বিভাগভিত্তিক শাখা ডিরেক্টরি।
  * \`template-finance.php\`: পাবলিক অডিট ও আর্থিক চার্ট।
  * \`template-documents.php\`: গঠনতন্ত্র ও ডাউনলোড সেন্টার।
* \`archive-bbp_notice.php\` & \`single-bbp_notice.php\`: নোটিশ আর্কাইভ ও ডিটেইলস।
* \`archive-bbp_news.php\` & \`single-bbp_news.php\`: সংবাদ ও কার্যক্রম।

---

### কাস্টম প্লাগইন আর্কিটেকচার (wp-content/plugins/bbop-management-system/)
* \`bbop-management-system.php\`: প্লাগইন বুটস্ট্র্যাপ ফাইল ও অ্যাক্টিভেশন হুক।
* \`includes/\`:
  * \`class-bbop-activator.php\`: প্লাগইন ইনস্টলেশনে ১৭টি কাস্টম টেবিল অটো ক্রিয়েট।
  * \`class-bbop-roles.php\`: ৭টি কাস্টম রোল ও গ্র্যানুলার ক্যাপাবিলিটিজ রেজিস্ট্রি।
  * \`class-bbop-member-manager.php\`: মেম্বার আইডি তৈরি ও লাইসেন্স ভ্যালিডেশন।
  * \`class-bbop-accounting.php\`: আয়-ব্যয়, ক্যাশবুক লেজার ও ব্যাংক ব্যালেন্স লজিক।
  * \`class-bbop-pdf-generator.php\`: মানি রিসিপ্ট ও মেম্বার আইডি কার্ড পিডিএফ আউটপুট।
  * \`class-bbop-audit-logger.php\`: প্রতিটি ইউজার অ্যাকশনের স্বয়ংক্রিয় অডিট হিস্ট্রি সংরক্ষণ।
* \`admin/\`:
  * \`class-bbop-admin-menu.php\`: ওয়ার্ডপ্রেস ড্যাশবোর্ডে ডেডিকেটেড অ্যাডমিন সাইডবার ও মেনু পেজেস।
  * \`views/\`: অ্যাডমিন ভিউ টেমপ্লেটস (সদস্য তালিকা, ভাউচার এন্ট্রি, ক্যাশবুক, রিপোর্ট)।
* \`api/\`:
  * \`class-bbop-rest-controller.php\`: নিরাপদ ননস প্রটেক্টেড এন্ডপয়েন্ট সমূহ।
    `
  },
  {
    id: 'security-architecture',
    number: 17,
    titleBangla: '১৭. নিরাপত্তা আর্কিটেকচার ও সুরক্ষা ব্যবস্থা (Security Architecture)',
    titleEnglish: '17. Security Architecture & Hardening',
    category: 'Security',
    contentMarkdown: `
* **১. ননস ভেরিফিকেশন (Nonce Verification)**: প্রতিটি ফর্ম সাবমিশন এবং AJAX/REST রিকোয়েস্টে \`wp_verify_nonce()\` বাধ্যতামূলক।
* **২. প্রিপেয়ার্ড স্টেটমেন্টস (Prepared Statements)**: ডিরেক্ট কুয়েরি সম্পূর্ণ নিষিদ্ধ। প্রতিটি ডাটাবেজ অপারেশনে \`$wpdb->prepare()\` বাধ্যতামূলক যাতে SQL Injection অসম্ভব হয়।
* **৩. ক্যাপাবিলিটি চেক (Granular Capability Checks)**: প্রতিটি ব্যাকএন্ড অ্যাকশনের পূর্বে \`current_user_can('manage_bbop_finance')\` বা নির্দিষ্ট পারমিশন যাচাই।
* **৪. ইনপুট স্যানিটাইজেশন ও এস্কেপিং**: \`sanitize_text_field()\`, \`sanitize_email()\`, এবং ভিউতে \`esc_html()\`, \`esc_attr()\`, \`esc_url()\` ব্যবহার।
* **৫. পাসওয়ার্ড হ্যাশিং**: ওয়ার্ডপ্রেস কোর \`wp_hash_password()\` (Bcrypt based) দ্বারা সুরক্ষিত।
* **৬. ফাইল আপলোড যাচাইকরণ**: মেম্বার ফটো বা ডকুমেন্টে শুধুমাত্র \`image/jpeg, image/png, application/pdf\` গ্রহণযোগ্য এবং রিনেম করে সংরক্ষিত।
* **৭. অডিট ট্রেইল (Immutable Audit Logs)**: কোনো আর্থিক বা মেম্বার ডাটা পরিবর্তিত হলে ইউজার আইডি, সময় ও আইপি সহ অপরিবর্তনযোগ্য লগ সংরক্ষিত।
    `
  },
  {
    id: 'api-structure',
    number: 18,
    titleBangla: '১৮. রেস্ট এপিআই কাঠামো (REST API Endpoints)',
    titleEnglish: '18. REST API Endpoints',
    category: 'Architecture',
    contentMarkdown: `
* **পাবলিক এন্ডপয়েন্ট**:
  * \`GET /wp-json/bbop/v1/notices\` - সাম্প্রতিক ও জরুরি নোটিশ ফেচ
  * \`GET /wp-json/bbop/v1/members/search?q=...&district=...\` - লাইভ মেম্বার অনুসন্ধান
  * \`GET /wp-json/bbop/v1/committee\` - কেন্দ্রীয় ও শাখা কমিটির তালিকা
  * \`POST /wp-json/bbop/v1/members/register\` - পাবলিক রেজিস্ট্রেশন সাবমিশন (র‍্যাট লিমিটেড)
  * \`GET /wp-json/bbop/v1/finance/public-summary\` - মোট আয়, ব্যয় ও ব্যালেন্স সারসংক্ষেপ
* **অথরাইজড অ্যাডমিন এন্ডপয়েন্ট (Cookie / Bearer Auth + Nonce)**:
  * \`POST /wp-json/bbop/v1/admin/members/{id}/approve\` - সদস্য অনুমোদন
  * \`POST /wp-json/bbop/v1/admin/finance/income\` - আয় ভাউচার এন্ট্রি ও রিসিপ্ট তৈরি
  * \`POST /wp-json/bbop/v1/admin/finance/expense\` - ব্যয় ভাউচার এন্ট্রি
  * \`GET /wp-json/bbop/v1/admin/cashbook?from=...&to=...\` - ক্যাশবুক স্টেটমেন্ট
  * \`GET /wp-json/bbop/v1/admin/audit-logs\` - নিরাপত্তা অডিট লগ ফেচ
    `
  },
  {
    id: 'development-roadmap',
    number: 19,
    titleBangla: '১৯. ১৩-ধাপের বাস্তবায়ন রোডম্যাপ (13-Step Development Roadmap)',
    titleEnglish: '19. 13-Step Development Roadmap',
    category: 'Overview',
    contentMarkdown: `
1. **ধাপ ১: পূর্ণাঙ্গ সাইটম্যাপ ও সিস্টেম আর্কিটেকচার চূড়ান্তকরণ** (সম্পন্ন)
2. **ধাপ ২: ইউজার ফ্লো ডায়াগ্রাম ও বিজনেস লজিক ডিফাইন** (সম্পন্ন)
3. **ধাপ ৩: ডাটাবেজ আর্কিটেকচার ও ১৭টি টেবিল স্কিমা বাস্তবায়ন** (সম্পন্ন)
4. **ধাপ ৪: প্রাতিষ্ঠানিক পাবলিক ওয়েবসাইট UI ও হোমপেজ বাস্তবায়ন** (সম্পন্ন)
5. **ধাপ ৫: শক্তিশালী অ্যাডমিন কন্ট্রোল সেন্টার ও ড্যাশবোর্ড UI** (সম্পন্ন)
6. **ধাপ ৬: সদস্য ব্যবস্থাপনা (Member Management & Smart ID Card)** (সম্পন্ন)
7. **ধাপ ৭: কেন্দ্রীয় ও শাখা কমিটি ব্যবস্থাপনা (Committee Module)** (সম্পন্ন)
8. **ধাপ ৮: নোটিশ বোর্ড ও সার্কুলার ম্যানেজার (Notice Management)** (সম্পন্ন)
9. **ধাপ ৯: পূর্ণাঙ্গ হিসাব ব্যবস্থা (Income, Expense, Cashbook, Bank Accounts)** (সম্পন্ন)
10. **ধাপ ১০: আর্থিক ও সাংগঠনিক রিপোর্ট এক্সপোর্টার (PDF & Print)** (সম্পন্ন)
11. **ধাপ ১১: সিকিউরিটি হার্ডেনিং, ননস ভ্যালিডেশন ও অডিট লগ** (সম্পন্ন)
12. **ধাপ ১২: ডেমো ডাটা সিডিং ও ক্রস-ডিভাইস রেসপনসিভনেস টেস্টিং** (সম্পন্ন)
13. **ধাপ ১৩: ফাইনাল রিভিউ ও প্রোডাকশন রোলআউট প্রস্তুতি**
    `
  }
];
