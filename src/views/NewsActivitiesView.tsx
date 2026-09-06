import React, { useState } from 'react';
import { NewsItem } from '../types';
import { Newspaper, Calendar, User, Tag, ChevronRight, X, ArrowRight } from 'lucide-react';

interface NewsActivitiesViewProps {
  news: NewsItem[];
}

export const NewsActivitiesView: React.FC<NewsActivitiesViewProps> = ({ news }) => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const categories = ['সকল', 'সম্মেলন', 'প্রশিক্ষণ', 'স্মারকলিপি', 'সেমিনার', 'কল্যাণ'];

  const filteredNews = news.filter((n) => {
    return selectedCat === 'সকল' || n.category === selectedCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-6">
        <span className="text-xs font-bold text-indigo-800 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full uppercase tracking-wider">
          সাংগঠনিক হালনাগাদ
        </span>
        <h1 className="text-3xl font-bold text-slate-900 mt-2">
          সংবাদ ও কার্যক্রম
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          জাতীয় পর্যায়ে পরিষদের বিভিন্ন সভা, সেমিনার, ওয়ার্কশপ ও জনকল্যাণমূলক কর্মসূচির সচিত্র বিবরণ।
        </p>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCat(c)}
            className={`px-4 py-2 rounded-xl whitespace-nowrap font-medium transition-colors ${
              selectedCat === c
                ? 'bg-blue-950 text-amber-400 font-bold shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="h-48 overflow-hidden relative">
                <img
                  src={item.featuredImage}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-blue-950/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs">
                  {item.category}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-3 text-slate-400 text-xs mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    {item.author}
                  </span>
                </div>

                <h3 
                  onClick={() => setSelectedNews(item)}
                  className="text-base font-bold text-slate-900 group-hover:text-blue-900 cursor-pointer leading-snug"
                >
                  {item.title}
                </h3>

                <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                  {item.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {item.tags.map((t, idx) => (
                    <span key={idx} className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => setSelectedNews(item)}
                className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1"
              >
                <span>বিস্তারিত পড়ুন</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* News Details Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="bg-blue-950 text-white px-6 py-4 flex items-center justify-between shrink-0">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wide">
                  {selectedNews.category}
                </span>
                <h3 className="text-base font-bold line-clamp-1">{selectedNews.title}</h3>
              </div>
              <button
                onClick={() => setSelectedNews(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="h-64 rounded-xl overflow-hidden border border-slate-200">
                <img
                  src={selectedNews.featuredImage}
                  alt={selectedNews.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex items-center justify-between text-slate-500 py-2 border-b border-slate-200">
                <span>তারিখ: <strong>{selectedNews.date}</strong></span>
                <span>প্রতিবেদক: <strong>{selectedNews.author}</strong></span>
              </div>

              <div className="text-sm text-slate-800 leading-relaxed space-y-3 font-serif">
                <p className="font-semibold text-slate-900">{selectedNews.excerpt}</p>
                <p>{selectedNews.content}</p>
                <p>
                  অনুষ্ঠানে প্রধান অতিথি হিসেবে উপস্থিত বিশিষ্ট অতিথিবৃন্দ এবং বক্তারা দেশের অর্থনৈতিক চালিকাশক্তি বজায় রাখতে বয়লার পরিচারকদের অবদান কৃতজ্ঞতার সাথে স্মরণ করেন এবং ভবিষ্যৎ কর্মপরিকল্পনায় সবধরনের নীতিগত সহায়তার আশ্বাস প্রদান করেন।
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-2">
                {selectedNews.tags.map((tag, i) => (
                  <span key={i} className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end shrink-0">
              <button
                onClick={() => setSelectedNews(null)}
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
