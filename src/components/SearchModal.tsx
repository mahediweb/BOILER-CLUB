import React, { useState } from 'react';
import { Search, X, User, FileText, Newspaper, MapPin, ArrowRight } from 'lucide-react';
import { Member, Notice, NewsItem, DocumentItem, Branch } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  members?: Member[];
  notices?: Notice[];
  news?: NewsItem[];
  documents?: DocumentItem[];
  branches?: Branch[];
  onSelectMember?: (member: Member) => void;
  onSelectNotice?: (notice: Notice) => void;
  onSelectDocument?: (document: DocumentItem) => void;
  onSelectBranch?: (branch: Branch) => void;
  onSelectNews?: (news: NewsItem) => void;
  onSelectResult?: (type: string, id: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  members = [],
  notices = [],
  news = [],
  documents = [],
  branches = [],
  onSelectMember,
  onSelectNotice,
  onSelectDocument,
  onSelectBranch,
  onSelectNews,
  onSelectResult
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const filteredMembers = q
    ? (members || []).filter(
        (m) =>
          m.nameBangla?.toLowerCase().includes(q) ||
          m.nameEnglish?.toLowerCase().includes(q) ||
          m.memberId?.toLowerCase().includes(q) ||
          m.district?.toLowerCase().includes(q) ||
          m.boilerLicenseNo?.toLowerCase().includes(q)
      ).slice(0, 4)
    : [];

  const filteredNotices = q
    ? (notices || []).filter(
        (n) =>
          n.title?.toLowerCase().includes(q) ||
          n.description?.toLowerCase().includes(q) ||
          n.category?.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const filteredNews = q
    ? (news || []).filter(
        (nw) =>
          nw.title?.toLowerCase().includes(q) ||
          nw.excerpt?.toLowerCase().includes(q) ||
          nw.category?.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const filteredDocs = q
    ? (documents || []).filter(
        (d) =>
          d.title?.toLowerCase().includes(q) ||
          d.category?.toLowerCase().includes(q) ||
          d.description?.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const filteredBranches = q
    ? (branches || []).filter(
        (b) =>
          b.nameBangla?.toLowerCase().includes(q) ||
          b.district?.toLowerCase().includes(q) ||
          b.division?.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const totalResults =
    filteredMembers.length +
    filteredNotices.length +
    filteredNews.length +
    filteredDocs.length +
    filteredBranches.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-blue-900 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="সদস্যের নাম, আইডি, জেলা, নোটিশ বা ডকুমেন্ট খুঁজুন..."
            className="w-full bg-transparent text-sm focus:outline-none text-slate-800 placeholder-slate-400 font-medium"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 bg-slate-200 rounded"
            >
              ক্লিয়ার
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[65vh] overflow-y-auto p-4 space-y-4 text-xs">
          {!query && (
            <div className="text-center py-8 text-slate-400">
              <Search className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p>যেকোনো কীওয়ার্ড লিখে সার্চ শুরু করুন</p>
              <p className="text-[11px] text-slate-400 mt-1">যেমন: "রফিকুল", "BBOP-2024", "চট্টগ্রাম", "সম্মেলন", "গঠনতন্ত্র"</p>
            </div>
          )}

          {query && totalResults === 0 && (
            <div className="text-center py-8 text-slate-500">
              <p>“{query}” দিয়ে কোনো তথ্য খুঁজে পাওয়া যায়নি।</p>
              <p className="text-[11px] text-slate-400 mt-1">দয়া করে সঠিক বানান দিয়ে পুনরায় চেষ্টা করুন।</p>
            </div>
          )}

          {/* Members */}
          {filteredMembers.length > 0 && (
            <div>
              <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block mb-2">
                সদস্যবৃন্দ ({filteredMembers.length})
              </span>
              <div className="space-y-1.5">
                {filteredMembers.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => {
                      if (onSelectMember) onSelectMember(m);
                      if (onSelectResult) onSelectResult('member', m.id);
                      onClose();
                    }}
                    className="p-2.5 rounded-lg hover:bg-blue-50 border border-slate-100 hover:border-blue-200 cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-xs">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{m.nameBangla}</div>
                        <div className="text-[11px] text-slate-500">
                          আইডি: {m.memberId} • জেলা: {m.district} • {m.boilerClass}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notices */}
          {filteredNotices.length > 0 && (
            <div>
              <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block mb-2">
                নোটিশ ({filteredNotices.length})
              </span>
              <div className="space-y-1.5">
                {filteredNotices.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      if (onSelectNotice) onSelectNotice(n);
                      if (onSelectResult) onSelectResult('notice', n.id);
                      onClose();
                    }}
                    className="p-2.5 rounded-lg hover:bg-amber-50 border border-slate-100 hover:border-amber-200 cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 line-clamp-1">{n.title}</div>
                        <div className="text-[11px] text-slate-500">
                          {n.category} • তারিখ: {n.publishDate}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* News & Activities */}
          {filteredNews.length > 0 && (
            <div>
              <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block mb-2">
                সংবাদ ও কার্যক্রম ({filteredNews.length})
              </span>
              <div className="space-y-1.5">
                {filteredNews.map((nw) => (
                  <div
                    key={nw.id}
                    onClick={() => {
                      if (onSelectNews) onSelectNews(nw);
                      if (onSelectResult) onSelectResult('news', nw.id);
                      onClose();
                    }}
                    className="p-2.5 rounded-lg hover:bg-sky-50 border border-slate-100 hover:border-sky-200 cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
                        <Newspaper className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 line-clamp-1">{nw.title}</div>
                        <div className="text-[11px] text-slate-500">
                          ক্যাটাগরি: {nw.category} • তারিখ: {nw.date}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documents */}
          {filteredDocs.length > 0 && (
            <div>
              <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block mb-2">
                ডকুমেন্ট ({filteredDocs.length})
              </span>
              <div className="space-y-1.5">
                {filteredDocs.map((d) => (
                  <div
                    key={d.id}
                    onClick={() => {
                      if (onSelectDocument) onSelectDocument(d);
                      if (onSelectResult) onSelectResult('document', d.id);
                      onClose();
                    }}
                    className="p-2.5 rounded-lg hover:bg-emerald-50 border border-slate-100 hover:border-emerald-200 cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 line-clamp-1">{d.title}</div>
                        <div className="text-[11px] text-slate-500">
                          ক্যাটাগরি: {d.category} • সাইজ: {d.fileSize}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Branches */}
          {filteredBranches.length > 0 && (
            <div>
              <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block mb-2">
                শাখা কমিটি ({filteredBranches.length})
              </span>
              <div className="space-y-1.5">
                {filteredBranches.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => {
                      if (onSelectBranch) onSelectBranch(b);
                      if (onSelectResult) onSelectResult('branch', b.id);
                      onClose();
                    }}
                    className="p-2.5 rounded-lg hover:bg-purple-50 border border-slate-100 hover:border-purple-200 cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{b.nameBangla}</div>
                        <div className="text-[11px] text-slate-500">
                          বিভাগ: {b.division} • জেলা: {b.district} • সদস্য: {b.totalMembers} জন
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
