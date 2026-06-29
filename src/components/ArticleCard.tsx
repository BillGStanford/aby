import { Link } from 'react-router-dom';
import { Article } from '../types';
import { formatDateShort, getCategoryColor } from '../utils';
import { ArrowUpRight, ShieldAlert, Award } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  variant?: 'hero' | 'sidebar' | 'grid' | 'horizontal' | 'compact';
}

export default function ArticleCard({ article, variant = 'grid' }: ArticleCardProps) {
  const categoryColor = getCategoryColor(article.category);

  // METADATA COMPONENT CONFIGURED FOR PREMIUM HIGH-CONTRAST NEWSPAPER CANVAS
  const TechnicalMetadata = ({ showAvatar = false }) => (
    <div className="flex items-center gap-3 font-mono text-[10px] tracking-wider text-neutral-500 uppercase select-none mt-auto pt-3 border-t border-neutral-200">
      {showAvatar && article.author.avatar && (
        <img
          src={article.author.avatar}
          alt=""
          className="w-4 h-4 rounded-full object-cover filter grayscale border border-neutral-300"
        />
      )}
      <span className="text-neutral-800 font-bold">{article.author.name}</span>
      <span className="text-neutral-300" aria-hidden="true">//</span>
      <span>{formatDateShort(article.publishDate)}</span>
      <span className="text-neutral-300" aria-hidden="true">//</span>
      <span className="text-neutral-500">{article.readTime}</span>
    </div>
  );

  /* ─────────────────────────────────────────────────────────────────
     VARIANT: HERO (Featured Monolith Premium Display)
     ───────────────────────────────────────────────────────────────── */
  if (variant === 'hero') {
    return (
      <Link to={`/article/${article.slug}`} className="group block relative w-full border border-neutral-900 bg-white overflow-hidden rounded-sm shadow-sm hover:shadow-md transition-shadow">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
          {/* Content Block */}
          <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between z-10 bg-white">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                {article.breaking && (
                  <span className="inline-flex items-center gap-1.5 font-mono text-[9px] font-black uppercase tracking-[0.2em] text-white bg-red-600 px-2.5 py-1 rounded-sm animate-pulse">
                    <ShieldAlert size={10} />
                    <span>CRITICAL_DISPATCH</span>
                  </span>
                )}
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] font-black" style={{ color: categoryColor }}>
                  // {article.category}
                </span>
              </div>

              <h2 className="font-serif text-neutral-950 font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-[1.1] group-hover:text-neutral-700 transition-colors duration-200">
                {article.title}
              </h2>
              
              <p className="font-serif text-neutral-600 text-sm sm:text-base leading-relaxed tracking-normal line-clamp-3">
                {article.subtitle}
              </p>
            </div>

            <TechnicalMetadata showAvatar={true} />
          </div>

          {/* Immersive Visual Node */}
          <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-neutral-200 bg-neutral-100">
            <img
              src={article.coverImage.url}
              alt=""
              className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-[1.05] brightness-95 group-hover:scale-[1.01] group-hover:filter-none transition-all duration-500 ease-out"
              loading="eager"
            />
          </div>
        </div>
      </Link>
    );
  }

  /* ─────────────────────────────────────────────────────────────────
     VARIANT: SIDEBAR (Document Index Feed Row)
     ───────────────────────────────────────────────────────────────── */
  if (variant === 'sidebar') {
    return (
      <Link to={`/article/${article.slug}`} className="group flex gap-4 py-4 border-b border-neutral-200 last:border-0 items-center bg-transparent">
        <div className="flex-1 min-w-0 space-y-1">
          <span className="font-mono text-[9px] uppercase tracking-widest block font-black" style={{ color: categoryColor }}>
            {article.category}
          </span>
          <h4 className="font-serif font-bold text-neutral-950 text-sm tracking-tight leading-snug group-hover:text-neutral-700 transition-colors duration-150 line-clamp-2">
            {article.title}
          </h4>
          <span className="font-mono text-[9px] text-neutral-400 tracking-wider block uppercase">
            {formatDateShort(article.publishDate)}
          </span>
        </div>
        <div className="flex-shrink-0 w-20 h-14 overflow-hidden border border-neutral-200 bg-neutral-50 rounded-sm">
          <img
            src={article.coverImage.url}
            alt=""
            className="w-full h-full object-cover filter grayscale brightness-95 group-hover:filter-none transition-all duration-300"
            loading="lazy"
          />
        </div>
      </Link>
    );
  }

  /* ─────────────────────────────────────────────────────────────────
     VARIANT: HORIZONTAL (Split Newspaper Matrix Row)
     ───────────────────────────────────────────────────────────────── */
  if (variant === 'horizontal') {
    return (
      <Link to={`/article/${article.slug}`} className="group grid grid-cols-1 sm:grid-cols-12 gap-6 py-6 border-b border-neutral-200 last:border-0 bg-transparent items-start">
        <div className="sm:col-span-8 space-y-3 flex flex-col h-full justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] font-black" style={{ color: categoryColor }}>
                // {article.category}
              </span>
              {article.editors_pick && (
                <span className="inline-flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-widest text-neutral-950 bg-neutral-100 border border-neutral-200 px-2 py-0.5 rounded-sm">
                  <Award size={10} />
                  <span>ANALYSIS_CORE</span>
                </span>
              )}
            </div>
            <h3 className="font-serif text-neutral-950 font-black text-lg sm:text-xl tracking-tight leading-snug group-hover:text-neutral-700 transition-colors duration-150">
              {article.title}
            </h3>
            <p className="font-serif text-neutral-600 text-xs sm:text-sm leading-relaxed tracking-normal line-clamp-2">
              {article.subtitle}
            </p>
          </div>
          <TechnicalMetadata />
        </div>
        <div className="sm:col-span-4 w-full aspect-[16/10] overflow-hidden border border-neutral-200 bg-neutral-50 rounded-sm">
          <img
            src={article.coverImage.url}
            alt=""
            className="w-full h-full object-cover filter grayscale contrast-105 brightness-95 group-hover:scale-102 group-hover:filter-none transition-all duration-300 ease-in-out"
            loading="lazy"
          />
        </div>
      </Link>
    );
  }

  /* ─────────────────────────────────────────────────────────────────
     VARIANT: COMPACT (Technical Feed Row With Thumbnail Attached)
     ───────────────────────────────────────────────────────────────── */
  if (variant === 'compact') {
    return (
      <Link to={`/article/${article.slug}`} className="group flex gap-4 py-4 border-b border-neutral-200 last:border-0 items-center bg-transparent">
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-black" style={{ color: categoryColor }}>
              // {article.category}
            </span>
            <ArrowUpRight size={13} className="text-neutral-400 group-hover:text-neutral-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150" />
          </div>
          <h3 className="font-serif font-bold text-neutral-950 text-sm tracking-tight leading-snug group-hover:text-neutral-700 transition-colors duration-150 line-clamp-2">
            {article.title}
          </h3>
          <div className="flex items-center gap-2 font-mono text-[9px] tracking-wider text-neutral-500 uppercase pt-1">
            <span className="font-bold text-neutral-700">{article.author.name}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
        </div>
        {/* Added thumbnail image here to satisfy absolute visibility rules */}
        <div className="flex-shrink-0 w-16 h-12 overflow-hidden border border-neutral-200 bg-neutral-50 rounded-sm">
          <img
            src={article.coverImage.url}
            alt=""
            className="w-full h-full object-cover filter grayscale brightness-95 group-hover:filter-none transition-all duration-300"
            loading="lazy"
          />
        </div>
      </Link>
    );
  }

  /* ─────────────────────────────────────────────────────────────────
     VARIANT: GRID (Default System Grid Component Matrix Module)
     ───────────────────────────────────────────────────────────────── */
  return (
    <div className="group flex flex-col bg-white border border-neutral-200 p-4 rounded-sm hover:border-neutral-300 transition-all duration-200 h-full">
      <Link to={`/article/${article.slug}`} className="flex flex-col h-full justify-between">
        <div>
          <div className="relative aspect-[16/10] w-full overflow-hidden border border-neutral-200 bg-neutral-50 mb-3.5 rounded-sm">
            <img
              src={article.coverImage.url}
              alt=""
              className="w-full h-full object-cover filter grayscale contrast-105 brightness-95 group-hover:filter-none transition-all duration-400"
              loading="lazy"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] font-black" style={{ color: categoryColor }}>
                // {article.category}
              </span>
              {article.editors_pick && (
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-neutral-600 bg-neutral-100 border border-neutral-200 px-1.5 py-px rounded-sm">
                  SELECTION
                </span>
              )}
            </div>

            <h3 className="font-serif text-neutral-950 font-black text-base sm:text-lg tracking-tight leading-snug group-hover:text-neutral-700 transition-colors duration-150">
              {article.title}
            </h3>
            
            <p className="font-serif text-neutral-600 text-xs sm:text-sm leading-relaxed tracking-normal line-clamp-2 pb-2">
              {article.subtitle}
            </p>
          </div>
        </div>

        <TechnicalMetadata />
      </Link>
    </div>
  );
}