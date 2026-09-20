import React, { useState } from 'react';
import { DocumentItem } from '../types';
import { FileText, Download, Eye, Calendar, BookOpen, ShieldCheck, CheckCircle2, X } from 'lucide-react';

interface DocumentsViewProps {
  documents: DocumentItem[];
}

export const DocumentsView: React.FC<DocumentsViewProps> = ({ documents }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);
  const [downloadMsg, setDownloadMsg] = useState<string | null>(null);

  const categories = ['all', 'গঠনতন্ত্র', 'আইন ও গেজেট', 'ফরম', 'ম্যানুয়াল', 'প্রতিবেদন'];

  const triggerDocDownload = (docName: string) => {
    setDownloadMsg(`"${docName}" ডাউনলোড প্রস্তুত করা হচ্ছে...`);
    setTimeout(() => {
      setDownloadMsg(null);
    }, 4000);
  };

  const filtered = documents.filter((d) => selectedCategory === 'all' || d.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <span className="text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full uppercase tracking-wider">
          রিসোর্স ও তথ্যভাণ্ডার
        </span>
        <h1 className="text-3xl font-bold text-slate-900 mt-2">
          ডকুমেন্ট ও ফরম সেন্টার
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          পরিষদের মূল গঠনতন্ত্র, জাতীয় বয়লার আইন ও সরকারি গেজেট, সদস্য ভর্তি ও সনদ নবায়নের অফিসিয়াল ফরম এবং প্রশিক্ষণ নির্দেশিকা।
        </p>
      </div>

      {/* Download Alert Toast */}
      {downloadMsg && (
        <div className="bg-teal-50 border border-teal-300 text-teal-900 px-4 py-3 rounded-xl text-xs flex items-center justify-between shadow-xs transition-all animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
            <span className="font-medium">{downloadMsg}</span>
          </div>
          <button 
            onClick={() => setDownloadMsg(null)}
            className="text-teal-700 hover:text-teal-950 font-bold ml-2 text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCategory(c)}
            className={`px-4 py-2 rounded-xl whitespace-nowrap font-medium transition-colors ${
              selectedCategory === c
                ? 'bg-blue-950 text-amber-400 font-bold shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {c === 'all' ? 'সকল ডকুমেন্ট' : c}
          </button>
        ))}
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex items-start gap-4">
              <div className="p-3.5 bg-blue-50 text-blue-900 rounded-2xl border border-blue-100 shrink-0">
                <FileText className="w-7 h-7" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                    {doc.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {doc.fileSize} • {doc.fileType}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {doc.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  {doc.description}
                </p>

                <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    প্রকাশ: {doc.uploadDate}
                  </span>
                  <span>•</span>
                  <span>ডাউনলোড: {doc.downloads} বার</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setPreviewDoc(doc)}
                className="text-xs font-semibold text-blue-900 hover:underline flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>প্রিভিউ দেখুন</span>
              </button>

              <button
                onClick={() => triggerDocDownload(`${doc.title} (${doc.fileType})`)}
                className="bg-blue-950 hover:bg-slate-900 text-amber-400 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>ডাউনলোড করুন</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Document Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden">
            <div className="bg-blue-950 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-amber-400 font-bold uppercase">{previewDoc.category}</span>
                <h3 className="text-base font-bold">{previewDoc.title}</h3>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <p><strong>বর্ণনা:</strong> {previewDoc.description}</p>
                <p><strong>ফাইল ফরম্যাট:</strong> {previewDoc.fileType} • সাইজ: {previewDoc.fileSize}</p>
                <p><strong>আপলোড তারিখ:</strong> {previewDoc.uploadDate}</p>
              </div>

              <div className="border border-slate-300 rounded-xl p-6 bg-slate-100 text-center space-y-3">
                <FileText className="w-16 h-16 text-blue-900 mx-auto" />
                <p className="text-sm font-bold text-slate-800">অফিশিয়াল মুদ্রিত ডিজিটাল সংস্করণ</p>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  এই নথিতে পরিষদের অফিসিয়াল সিলমোহর ও অনুমোদন বিদ্যমান।
                </p>
                <button
                  onClick={() => {
                    const title = previewDoc.title;
                    setPreviewDoc(null);
                    triggerDocDownload(title);
                  }}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs inline-flex items-center gap-2 shadow"
                >
                  <Download className="w-4 h-4" />
                  <span>সম্পূর্ণ কপি ডাউনলোড করুন ({previewDoc.fileSize})</span>
                </button>
              </div>
            </div>

            <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-semibold"
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
