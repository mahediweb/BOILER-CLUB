export type MemberType = 'সাধারণ সদস্য' | 'আজীবন সদস্য' | 'সহযোগী সদস্য' | 'সাধারণ';
export type MemberStatus = 'সক্রিয়' | 'স্থগিত' | 'পেন্ডিং' | 'বাতিল' | 'active' | 'pending' | 'inactive';
export type BoilerClass = 
  | '১ম শ্রেণি (First Class)' 
  | '২য় শ্রেণি (Second Class)' 
  | '৩য় শ্রেণি (Third Class)' 
  | 'সার্টিফাইড বয়লার প্রকৌশলী'
  | '১ম শ্রেণি (1st Class)'
  | '২য় শ্রেণি (2nd Class)'
  | '৩য় শ্রেণি (3rd Class)';

export interface Member {
  id: string;
  memberId: string;
  nameBangla: string;
  nameEnglish: string;
  fatherName: string;
  motherName?: string;
  dateOfBirth?: string;
  dob?: string;
  mobile: string;
  email: string;
  division?: string;
  district: string;
  upazila: string;
  presentAddress?: string;
  permanentAddress?: string;
  workplace: string;
  designation: string;
  experienceYears?: number;
  boilerLicenseNo: string;
  boilerClass: BoilerClass;
  licenseIssueDate?: string;
  joiningDate?: string;
  membershipType: MemberType;
  status: MemberStatus;
  committeePosition?: string;
  photoUrl: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  feeStatus?: 'পরিশোধিত' | 'বকেয়া' | string;
  lastPaidMonth?: string;
  nidNo: string;
  bloodGroup?: string;
}

export interface CommitteeMember {
  id: string;
  name: string;
  englishName: string;
  position: string;
  positionOrder: number;
  district: string;
  workplace: string;
  mobile: string;
  email: string;
  photoUrl: string;
  shortBio: string;
  term: string; // e.g. "২০২৪-২০২৬"
  isCentral: boolean;
}

export interface Committee {
  term: string;
  title: string;
  status: 'বর্তমান' | 'সাবেক';
  members: CommitteeMember[];
}

export interface Branch {
  id: string;
  nameBangla: string;
  division: string;
  district: string;
  upazila: string;
  officeAddress: string;
  presidentName: string;
  presidentPhone: string;
  secretaryName: string;
  secretaryPhone: string;
  totalMembers: number;
  establishedDate: string;
  status: 'সক্রিয়' | 'প্রস্তাবিত';
}

export type NoticeCategory = 'সাধারণ' | 'জরুরি' | 'সভা' | 'নির্বাচন' | 'আর্থিক' | 'প্রশিক্ষণ' | 'পরিপত্র' | string;

export interface Notice {
  id: string;
  title: string;
  category: NoticeCategory;
  publishDate: string;
  description: string;
  pdfUrl?: string;
  attachmentUrl?: string;
  attachmentName?: string;
  isImportant?: boolean;
  isPinned?: boolean;
  isUrgent?: boolean;
  views?: number;
  publishedBy?: string;
  status?: 'প্রকাশিত' | 'খসড়া' | 'আর্কাইভ';
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  tags: string[];
}

export type IncomeHead = 
  | 'সদস্য ভর্তি ফি' 
  | 'মাসিক চাঁদা' 
  | 'কল্যাণ তহবিল অনুদান' 
  | 'প্রশিক্ষণ নিবন্ধন ফি' 
  | 'বার্ষিক সম্মেলন আয়' 
  | 'বিবিধ আয়'
  | string;

export type ExpenseHead = 
  | 'অফিস ভাড়া ও ইউটিলিটি' 
  | 'প্রশিক্ষণ ও কর্মশালা ব্যয়' 
  | 'সম্মেলন ও সভা খরচ' 
  | 'মুদ্রণ ও স্টেশনারি' 
  | 'সদস্য কল্যাণ সহায়তা' 
  | 'যাতায়াত ও ভ্রমণ' 
  | 'প্রচার ও প্রকাশনা' 
  | 'আইনি ও পরামর্শ ফি' 
  | 'ব্যাংক চার্জ' 
  | 'বিবিধ খরচ'
  | string;

export type PaymentMethod = 'নগদ (Cash)' | 'ব্যাংক ট্রান্সফার' | 'বিকাশ / নগদ (MFS)' | 'চেক (Cheque)' | string;

export interface IncomeRecord {
  id: string;
  voucherNo: string;
  date: string;
  head: IncomeHead;
  amount: number;
  paymentMethod: PaymentMethod;
  receivedFrom: string;
  memberId?: string;
  receiptNumber: string;
  reference: string;
  notes: string;
  createdBy: string;
}

export interface ExpenseRecord {
  id: string;
  voucherNo: string;
  date: string;
  head: ExpenseHead;
  amount: number;
  paymentMethod: PaymentMethod;
  paidTo: string;
  approvedBy: string;
  reference?: string;
  notes: string;
  createdBy: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  branch: string;
  balance: number;
  type: 'চলতি' | 'সঞ্চয়ী';
}

export interface CashBookEntry {
  id: string;
  date: string;
  description: string;
  voucherNo: string;
  income: number;
  expense: number;
  balance: number;
  type: 'INCOME' | 'EXPENSE';
}

export interface AuditLog {
  id: string;
  user?: string;
  userId?: string;
  userName?: string;
  role?: string;
  userRole?: string;
  action: string;
  date?: string;
  time?: string;
  ip?: string;
  ipAddress?: string;
  module: string;
  details: string;
  createdAt?: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  category: 'গঠনতন্ত্র' | 'আইন ও বিধি' | 'আইন ও গেজেট' | 'ফরম' | 'ম্যানুয়াল' | 'প্রতিবেদন' | 'পরিপত্র' | 'বার্ষিক প্রতিবেদন' | string;
  fileSize: string;
  publishDate?: string;
  uploadDate?: string;
  downloadUrl?: string;
  fileType?: string;
  downloads?: number;
  description: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  date: string;
  location: string;
  coverImage: string;
  photoCount: number;
  category: string;
}
