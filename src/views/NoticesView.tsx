import React, { useState } from 'react';
import { Notice } from '../types';
import { FileText, Download, Calendar, Search, AlertCircle, Eye, X, CheckCircle } from 'lucide-react';

interface NoticesViewProps {
  notices: Notice[];
  selectedNotice: Notice | null;
  onSelectNotice: (notice: Notice | null) => void;
}

export const NoticesView: React.FC<NoticesViewProps> = ({
  notices,
  selectedNotice,
  onSelectNotice
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('সকল');
  const [search, setSearch] = useState('');
  const [downloadMessage, setDownloadMessage] = useState<string | null>(null);

  const categories = ['সকল', 'জরুরি', 'সভা', 'প্রশিক্ষণ', 'আর্থিক', 'নির্বাচন', 'সার্কুলার', 'সাধারণ'];

  const triggerDownload = (fileName: string) => {
    setDownloadMessage(`"${fileName}" অফিশিয়াল PDF কপি ডাউনলোড শুরু হচ্ছে...`);
    setTimeout(() => {
      setDownloadMessage(null);
    }, 4000);
  };

  const filteredNotices = notices.filter((n) => {
    const matchesCat = selectedCategory === 'সকল' || selectedCategory === 'all' || n.category === selectedCategory;
    const matchesSearch =
      !search ||
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-6">
        <span className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full uppercase tracking-wider">
          প্রাতিষ্ঠানিক ঘোষণা
        </span>
        <h1 className="text-3xl font-bold text-slate-900 mt-2">
          নোটিশ বোর্ড ও সার্কুলার
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          বাংলাদেশ বয়লার পরিচারক পরিষদের কেন্দ্রীয় দপ্তর হতে জারিকৃত সকল দাপ্তরিক আদেশ, সভা ও জরুরি নোটিশ।
        </p>
      </div>

      {/* Download Notification Toast */}
      {downloadMessage && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-xl text-xs flex items-center justify-between shadow-xs transition-all animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-medium">{downloadMessage}</span>
          </div>
          <button 
            onClick={() => setDownloadMessage(null)}
            className="text-emerald-700 hover:text-emerald-950 font-bold ml-2 text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-950 text-amber-400 font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
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
            placeholder="নোটিশের শিরোনাম বা বিষয় দিয়ে খুঁজুন..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-900"
          />
        </div>
      </div>

      {/* Notice List */}
      <div className="space-y-4">
        {filteredNotices.map((notice) => (
          <div
            key={notice.id}
            className={`bg-white rounded-2xl border p-5 sm:p-6 transition-all hover:shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              notice.isUrgent
                ? 'border-red-200 bg-red-50/20 shadow-xs'
                : 'border-slate-200 shadow-xs'
            }`}
          >
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                  notice.category === 'জরুরি'
                    ? 'bg-red-100 text-red-700 border border-red-200'
                    : notice.category === 'সভা'
                    ? 'bg-blue-100 text-blue-800'
                    : notice.category === 'প্রশিক্ষণ'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-slate-100 text-slate-700'
                }`}>
                  {notice.category}
                </span>

                {notice.isUrgent && (
                  <span className="text-[10px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    জরুরি বিজ্ঞপ্তি
                  </span>
                )}

                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {notice.publishDate}
                </span>

                <span className="text-xs text-slate-400">
                  জারিকারক: <strong className="text-slate-600">{notice.publishedBy}</strong>
                </span>
              </div>

              <h3 
                onClick={() => onSelectNotice(notice)}
                className="text-base font-bold text-slate-900 hover:text-blue-900 cursor-pointer leading-snug"
              >
                {notice.title}
              </h3>

              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {notice.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
              <button
                onClick={() => onSelectNotice(notice)}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-blue-900" />
                <span>বিস্তারিত</span>
              </button>

              {notice.attachmentName && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    triggerDownload(notice.attachmentName!);
                  }}
                  className="px-3.5 py-2 bg-blue-950 hover:bg-slate-900 text-amber-400 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF ডাউনলোড</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden">
            <div className="bg-blue-950 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wide">
                  {selectedNotice.category} বিজ্ঞপ্তি
                </span>
                <h3 className="text-base font-bold mt-0.5">{selectedNotice.title}</h3>
              </div>
              <button
                onClick={() => onSelectNotice(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="flex items-center justify-between text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span>তারিখ: <strong>{selectedNotice.publishDate}</strong></span>
                <span>প্রকাশক: <strong>{selectedNotice.publishedBy}</strong></span>
              </div>

              <div className="text-sm text-slate-800 leading-relaxed space-y-3 bg-white p-4 border rounded-xl font-serif">
                <p>{selectedNotice.description}</p>
                <p className="text-xs text-slate-500 italic">
                  অতএব, সংশ্লিষ্ট সকল শাখা কমিটির সভাপতি/সম্পাদক এবং সম্মানিত সদস্যদের এই নোটিশ মোতাবেক প্রয়োজনীয় ব্যবস্থা গ্রহণের জন্য অনুরোধ করা হলো।
                </p>
              </div>

              {selectedNotice.attachmentName && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-700" />
                    <div>
                      <div className="font-bold text-slate-900">{selectedNotice.attachmentName}</div>
                      <div className="text-[10px] text-slate-500">সাইজ: 1.2 MB • ফরম্যাট: PDF</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      triggerDownload(selectedNotice.attachmentName!);
                    }}
                    className="bg-blue-950 hover:bg-slate-900 text-amber-400 px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    ডাউনলোড
                  </button>
                </div>
              )}
            </div>

            <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => onSelectNotice(null)}
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
