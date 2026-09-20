import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  UserCheck,
  ChevronRight,
  Sparkles,
  HelpCircle,
  CheckCircle,
  Share2,
  X,
  MapPin,
  ArrowRight,
  Search,
  Bookmark,
  ThumbsUp,
  MessageSquare,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MAGAZINE_ARTICLES, BRAND_DETAILS } from '../data/mockData';
import { MagazineArticle, ServiceableCity } from '../types';

interface MagazineHubProps {
  selectedCity: ServiceableCity;
  onOpenConsultation: () => void;
  onSelectMatrixItem?: (room: string, city: ServiceableCity) => void;
}

export const MagazineHub: React.FC<MagazineHubProps> = ({
  selectedCity,
  onOpenConsultation,
  onSelectMatrixItem,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<MagazineArticle | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [likedArticles, setLikedArticles] = useState<Record<string, number>>({});
  const [copiedLink, setCopiedLink] = useState(false);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  const categories = [
    'All',
    'Budget & Cost Guides',
    'Kitchen Design Ideas',
    'Wardrobe & Storage Solutions',
    'Full Home Interior Guides',
    'False Ceiling & Lighting',
    'City Guides',
    'Vastu & Space Planning',
    'Before/After Transformations',
  ];

  const filteredArticles = MAGAZINE_ARTICLES.filter((art) => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tldr.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (art.targetCity && art.targetCity.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleLike = (id: string) => {
    setLikedArticles((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleShareWhatsApp = (article: MagazineArticle) => {
    const text = `Read this insightful guide on Pentagram: "${article.title}" - ${window.location.origin}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = (article: MagazineArticle) => {
    navigator.clipboard.writeText(`${window.location.origin}#magazine-${article.id}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <section className="py-12 sm:py-20 bg-white border-b border-[#EAE0D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Live Search */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6F0] border border-[#EAE0D5] text-xs font-bold text-[#C7244E] mb-3">
              <BookOpen className="w-3.5 h-3.5 text-[#C69255]" />
              <span>Pentagram Magazine • Live Architectural & Cost Guides</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#201B1C] tracking-tight">
              Interior Design Knowledge & Pricing Guides
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-2xl">
              Citable data points, real local costs, and architectural insights authored by licensed Delhi NCR interior
              experts.
            </p>
          </div>

          {/* Live Search Input */}
          <div className="w-full lg:w-80">
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search guides, costs, materials..."
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#FAF6F0] border border-[#EAE0D5] rounded-xl focus:outline-none focus:border-[#C7244E] focus:ring-1 focus:ring-[#C7244E] text-[#201B1C]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 text-xs scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all border cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#C7244E] text-white border-[#C7244E] shadow-sm'
                  : 'bg-[#FAF6F0] text-neutral-700 border-[#EAE0D5] hover:bg-neutral-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Live Articles Count */}
        <div className="flex items-center justify-between text-xs text-neutral-500 mb-6">
          <span>
            Showing <strong className="text-[#201B1C]">{filteredArticles.length}</strong> live articles
            {selectedCategory !== 'All' ? ` in "${selectedCategory}"` : ''}
          </span>
          {bookmarkedIds.size > 0 && (
            <span className="text-[#C7244E] font-semibold flex items-center gap-1">
              <Bookmark className="w-3.5 h-3.5 fill-[#C7244E]" /> {bookmarkedIds.size} saved
            </span>
          )}
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-[#FAF6F0] rounded-3xl border border-[#EAE0D5] p-8">
            <BookOpen className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
            <h3 className="font-bold text-base text-[#201B1C]">No articles found</h3>
            <p className="text-xs text-neutral-500 mt-1">Try searching for "kitchen", "budget", "BWP", or "Gurgaon".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 px-4 py-2 bg-[#C7244E] text-white text-xs font-bold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => {
              const isBookmarked = bookmarkedIds.has(article.id);
              const likes = (likedArticles[article.id] || 0) + (article.likes || 18);

              return (
                <motion.article
                  key={article.id}
                  whileHover={{ y: -4 }}
                  onClick={() => setActiveArticle(article)}
                  className="group bg-[#FAF6F0] rounded-3xl border border-[#EAE0D5] hover:border-[#C7244E]/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden text-left cursor-pointer"
                >
                  {/* Hero Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                    <img
                      src={article.heroImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[10px] font-bold text-[#C7244E] shadow-xs">
                      {article.category}
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      {article.targetCity && (
                        <span className="bg-[#201B1C]/90 text-white backdrop-blur-xs px-2 py-0.5 rounded-lg text-[10px] font-medium flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#C69255]" /> {article.targetCity}
                        </span>
                      )}
                      <button
                        onClick={(e) => toggleBookmark(article.id, e)}
                        className={`p-1.5 rounded-lg backdrop-blur-sm transition-colors ${
                          isBookmarked ? 'bg-[#C7244E] text-white' : 'bg-white/90 text-neutral-600 hover:text-[#C7244E]'
                        }`}
                        title={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-white' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-xs text-neutral-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" /> {article.publishDate}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {article.readTime}
                        </span>
                      </div>

                      <h3 className="font-serif text-lg font-bold text-[#201B1C] group-hover:text-[#C7244E] transition-colors leading-snug line-clamp-2">
                        {article.title}
                      </h3>

                      {/* TL;DR GEO Summary Preview */}
                      <div className="bg-white p-3.5 rounded-2xl border border-[#EAE0D5] space-y-1 text-xs text-neutral-700">
                        <div className="text-[10px] font-bold text-[#C7244E] uppercase tracking-wider flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-500" />
                          <span>Key Takeaway (TL;DR)</span>
                        </div>
                        <p className="line-clamp-2 text-neutral-600 text-[11px] leading-relaxed">{article.tldr[0]}</p>
                      </div>
                    </div>

                    {/* Author Card & CTA */}
                    <div className="pt-3 border-t border-[#EAE0D5] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#C7244E]/10 text-[#C7244E] flex items-center justify-center font-bold text-xs">
                          {article.author.name[0]}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[#201B1C] flex items-center gap-1">
                            {article.author.name}
                            <UserCheck className="w-3 h-3 text-emerald-600" />
                          </div>
                          <div className="text-[10px] text-neutral-500">{article.author.role}</div>
                        </div>
                      </div>

                      <span className="text-xs font-bold text-[#C7244E] group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                        Read <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>

      {/* Live Full Article Reader Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-3xl w-full my-6 overflow-hidden shadow-2xl border border-white/20 relative"
            >
              {/* Modal Header Bar */}
              <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-[#EAE0D5] px-6 py-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#C7244E] uppercase tracking-wider">
                    {activeArticle.category}
                  </span>
                  {activeArticle.targetCity && (
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FAF6F0] text-[#201B1C] font-semibold border border-[#EAE0D5]">
                      {activeArticle.targetCity}
                    </span>
                  )}
                </div>

                {/* Reader Action Icons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleLike(activeArticle.id)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-xs text-neutral-700 transition-colors cursor-pointer"
                    title="Helpful article"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-[#C7244E]" />
                    <span className="text-[11px] font-bold">
                      {(likedArticles[activeArticle.id] || 0) + (activeArticle.likes || 18)}
                    </span>
                  </button>

                  <button
                    onClick={() => handleShareWhatsApp(activeArticle)}
                    className="p-1.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white transition-colors cursor-pointer"
                    title="Share on WhatsApp"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleCopyLink(activeArticle)}
                    className="p-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors cursor-pointer"
                    title="Copy article link"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => setActiveArticle(null)}
                    className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 cursor-pointer ml-1"
                    aria-label="Close article"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Copied Link Toast */}
              {copiedLink && (
                <div className="bg-emerald-600 text-white text-xs font-semibold py-1.5 text-center flex items-center justify-center gap-1.5">
                  <Check className="w-3.5 h-3.5" /> Link copied to clipboard!
                </div>
              )}

              {/* Article Content Container */}
              <div className="p-6 sm:p-10 space-y-8 max-h-[80vh] overflow-y-auto">
                {/* Title & Author Meta */}
                <div className="space-y-4">
                  <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#201B1C] leading-tight">
                    {activeArticle.title}
                  </h1>

                  {/* Author Credentials (E-E-A-T) */}
                  <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#EAE0D5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-[#C7244E] text-white flex items-center justify-center font-serif font-bold text-base">
                        {activeArticle.author.name[0]}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#201B1C] flex items-center gap-1.5">
                          {activeArticle.author.name}
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            {activeArticle.author.verifiedBadge}
                          </span>
                        </div>
                        <div className="text-xs text-neutral-600">{activeArticle.author.role}</div>
                        <div className="text-[11px] text-neutral-500">{activeArticle.author.experience}</div>
                      </div>
                    </div>

                    <div className="text-xs text-neutral-500">
                      Published: {activeArticle.publishDate} • {activeArticle.readTime}
                    </div>
                  </div>
                </div>

                {/* Hero Image */}
                <div className="rounded-3xl overflow-hidden aspect-[16/9] bg-neutral-100 shadow-md">
                  <img src={activeArticle.heroImage} alt={activeArticle.title} className="w-full h-full object-cover" />
                </div>

                {/* TL;DR GEO Answer Engine Box */}
                <div className="p-5 sm:p-6 bg-[#FAF6F0] rounded-3xl border-2 border-[#C7244E]/20 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#C7244E] uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Key Takeaways & Direct Facts (TL;DR)</span>
                  </div>
                  <ul className="space-y-2">
                    {activeArticle.tldr.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-800">
                        <CheckCircle className="w-4 h-4 text-[#C7244E] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Citable Data Points Strip */}
                {activeArticle.citableDataPoints.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {activeArticle.citableDataPoints.map((dp, idx) => (
                      <div key={idx} className="p-3 bg-[#FAF6F0] rounded-2xl border border-[#EAE0D5] text-center">
                        <div className="text-[10px] text-neutral-500 uppercase">{dp.label}</div>
                        <div className="font-serif text-sm font-bold text-[#201B1C] mt-0.5">{dp.value}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* In-depth Article Body Sections */}
                <div className="space-y-6 text-sm sm:text-base text-neutral-700 leading-relaxed">
                  {activeArticle.contentSections.map((sec, idx) => (
                    <div key={idx} className="space-y-3">
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#201B1C]">{sec.heading}</h2>
                      {sec.paragraphs.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                      {sec.bulletPoints && (
                        <ul className="space-y-1.5 pl-5 list-disc text-neutral-700">
                          {sec.bulletPoints.map((bp, bpIdx) => (
                            <li key={bpIdx}>{bp}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>

                {/* FAQ Block (Interactive Accordion) */}
                {activeArticle.faqList.length > 0 && (
                  <div className="pt-6 border-t border-[#EAE0D5] space-y-4">
                    <h3 className="font-serif text-xl font-bold text-[#201B1C] flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-[#C7244E]" />
                      <span>Frequently Asked Questions</span>
                    </h3>
                    <div className="space-y-3">
                      {activeArticle.faqList.map((faq, fIdx) => {
                        const isExpanded = expandedFaqIndex === fIdx;
                        return (
                          <div
                            key={fIdx}
                            className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#EAE0D5] transition-all cursor-pointer"
                            onClick={() => setExpandedFaqIndex(isExpanded ? null : fIdx)}
                          >
                            <div className="font-bold text-xs sm:text-sm text-[#201B1C] flex items-center justify-between">
                              <span>{faq.question}</span>
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4 text-[#C7244E] shrink-0 ml-2" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0 ml-2" />
                              )}
                            </div>
                            {isExpanded && (
                              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mt-2 pt-2 border-t border-[#EAE0D5]/70">
                                {faq.answer}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Talk with Architect on WhatsApp */}
                <div className="p-6 bg-gradient-to-r from-[#201B1C] to-[#362629] text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="font-serif text-lg font-bold">Have questions about {activeArticle.title}?</div>
                    <div className="text-xs text-neutral-300">
                      Chat directly with our senior interior architects for {selectedCity}.
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <a
                      href={`https://wa.me/919217983737?text=Hi%20Pentagram,%20I%20just%20read%20"${encodeURIComponent(
                        activeArticle.title
                      )}"%20and%20had%20a%20few%20questions%20for%20my%20home%20in%20${selectedCity}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shrink-0"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" />
                      <span>Ask on WhatsApp</span>
                    </a>
                    <button
                      onClick={() => {
                        setActiveArticle(null);
                        onOpenConsultation();
                      }}
                      className="px-4 py-2.5 bg-[#C7244E] hover:bg-[#a81c40] text-white text-xs font-bold rounded-xl transition-colors shrink-0 cursor-pointer"
                    >
                      Book Free Visit
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
