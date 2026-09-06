import React, { useState } from 'react';
import { Image as ImageIcon, Calendar, X, Eye } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  date: string;
  photoUrl: string;
  caption: string;
}

export const GalleryView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'g-1',
      title: 'জাতীয় সম্মেলন ২০২৪: প্রধান বয়লার পরিদর্শকের সাথে কেন্দ্রীয় নেতৃবৃন্দ',
      category: 'সম্মেলন',
      date: '২৪ অক্টোবর ২০২৪',
      photoUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1000',
      caption: 'বাংলাদেশ ইঞ্জিনিয়ার্স ইনস্টিটিউশন অডিটোরিয়ামে অনুষ্ঠিত ৬ষ্ঠ জাতীয় পরিষদ সম্মেলন ও আলোচনা সভা।'
    },
    {
      id: 'g-2',
      title: 'উচ্চচাপ ওয়াটার টিউব বয়লার সেফটি ও ট্রাবলশুটিং প্রশিক্ষণ কর্মশালা',
      category: 'প্রশিক্ষণ',
      date: '১২ আগস্ট ২০২৫',
      photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1000',
      caption: 'বিটাক ঢাকা ল্যাবরেটরিতে আয়োজিত দুই দিনব্যাপী বয়লার সিমুলেশন ও বাবল টেস্ট ট্রেনিং।'
    },
    {
      id: 'g-3',
      title: 'শিল্প উপদেষ্টার সাথে মতবিনিময় ও স্মারকলিপি পেশ',
      category: 'স্মারকলিপি',
      date: '১৫ সেপ্টেম্বর ২০২৫',
      photoUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=1000',
      caption: 'বয়লার আইন ২০২৩ অনুযায়ী পরিচারকদের পেশাগত ঝুঁকিভাতা ও গ্রেড উন্নয়নের স্মারকলিপি পেশ।'
    },
    {
      id: 'g-4',
      title: 'চট্টগ্রাম শিল্পাঞ্চল শাখা কমিটির দ্বি-বার্ষিক সম্মেলন ও কাউন্সিল',
      category: 'শাখা সভা',
      date: '০৫ জানুয়ারি ২০২৬',
      photoUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1000',
      caption: 'চট্টগ্রাম প্রেস ক্লাব মিলনায়তনে অনুষ্ঠিত চট্টগ্রাম আঞ্চলিক কমিটির নতুন নেতৃত্ব নির্বাচন ও সংবর্ধনা।'
    },
    {
      id: 'g-5',
      title: 'আন্তর্জাতিক বয়লার ও হিটিং পাওয়ার টেকনোলজি এক্সপো পরিদর্শন',
      category: 'আন্তর্জাতিক',
      date: '১৮ ফেব্রুয়ারি ২০২৬',
      photoUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1000',
      caption: 'বঙ্গবন্ধু আন্তর্জাতিক সম্মেলন কেন্দ্রে আধুনিক অটোমেটেড বায়োমাস বয়লার প্রযুক্তি পর্যবেক্ষণ।'
    },
    {
      id: 'g-6',
      title: 'পরিষদের কেন্দ্রীয় কার্যালয়ে নির্বাহী কমিটির জরুরি বাজেট ও পরিকল্পনা সভা',
      category: 'নির্বাহী সভা',
      date: '০২ আগস্ট ২০২৬',
      photoUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000',
      caption: 'তেজগাঁও কেন্দ্রীয় কার্যালয়ে ২০২৫-২০২৬ অর্থবছরের বাজেট ও প্রশিক্ষণ কর্মসূচি অনুমোদন।'
    }
  ];

  const categories = ['all', 'সম্মেলন', 'প্রশিক্ষণ', 'স্মারকলিপি', 'শাখা সভা', 'নির্বাহী সভা'];

  const filtered = galleryItems.filter((item) => selectedCategory === 'all' || item.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <span className="text-xs font-bold text-purple-800 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full uppercase tracking-wider">
          ফটোগ্রাফি ও ইভেন্ট
        </span>
        <h1 className="text-3xl font-bold text-slate-900 mt-2">
          অফিশিয়াল ফটো গ্যালারি
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          পরিষদের জাতীয় সম্মেলন, কারিগরি কর্মশালা, শাখা কাউন্সিল ও ঐতিহাসিক মুহূর্তের আলোকচিত্রসমূহ।
        </p>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCategory(c)}
            className={`px-4 py-2 rounded-xl whitespace-nowrap font-medium transition-colors ${
              selectedCategory === c
                ? 'bg-blue-950 text-amber-400 font-bold'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {c === 'all' ? 'সকল ছবি' : c}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setActivePhoto(item)}
            className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="h-56 overflow-hidden relative">
              <img
                src={item.photoUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="p-2.5 bg-white/90 text-blue-950 rounded-full shadow">
                  <Eye className="w-5 h-5" />
                </span>
              </div>
              <span className="absolute top-3 left-3 bg-blue-950/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs">
                {item.category}
              </span>
            </div>

            <div className="p-4 space-y-1.5">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {item.date}
              </span>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors line-clamp-2">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xs">
          <div className="bg-slate-900 text-white rounded-2xl overflow-hidden max-w-4xl w-full border border-slate-700 shadow-2xl relative">
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[65vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activePhoto.photoUrl}
                alt={activePhoto.title}
                className="max-h-[65vh] w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6 bg-slate-900">
              <div className="flex items-center gap-2 text-xs text-amber-400 mb-1">
                <span>{activePhoto.category}</span>
                <span>•</span>
                <span>{activePhoto.date}</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{activePhoto.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{activePhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
