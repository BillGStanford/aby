import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Share2, Bookmark, Clock, Calendar, Tag, AlertCircle } from 'lucide-react';
import articlesData from '../data/articles.json';
import { Article, ContentBlock } from '../types';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { formatDate, getCategoryColor } from '../utils';
import MetaTags from '../components/MetaTags';
import ArticleCard from '../components/ArticleCard';
import AnnotationSystem from '../components/AnnotationSystem';
import SocialPromo, { SocialPromoStrip } from '../components/SocialPromo';
import CategoryBadge from '../components/CategoryBadge';

function renderBlock(block: ContentBlock, idx: number) {
  switch (block.type) {
    case 'lede':
      return (
        <p key={idx} className="font-serif text-xl md:text-2xl text-neutral-900 font-normal leading-relaxed mb-8 border-l-4 border-neutral-900 pl-6 tracking-wide text-justify">
          {block.text}
        </p>
      );
    case 'paragraph':
      return (
        <p key={idx} className="font-serif text-neutral-800 text-base md:text-lg leading-[1.85] mb-6 tracking-normal text-justify">
          {block.text}
        </p>
      );
    case 'subheading':
      return (
        <h3 key={idx} className="font-serif text-neutral-900 font-bold text-2xl md:text-3xl mt-12 mb-5 tracking-tight border-b border-neutral-100 pb-2">
          {block.text}
        </h3>
      );
    case 'blockquote':
      return (
        <blockquote key={idx} className="my-10 border-t-2 border-b-2 border-neutral-900 py-6 px-2 text-center max-w-2xl mx-auto">
          <p className="font-serif text-xl md:text-2xl text-neutral-900 italic leading-snug">
            “{block.text}”
          </p>
          {block.attribution && (
            <cite className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 not-italic block mt-3">
              — {block.attribution}
            </cite>
          )}
        </blockquote>
      );
    case 'html':
      return (
        <div
          key={idx}
          className="font-serif text-neutral-800 text-base md:text-lg leading-[1.85] mb-6 tracking-normal text-justify prose-custom-nyt"
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      );
    case 'image':
      return (
        <figure key={idx} className="my-10 border border-neutral-200 bg-neutral-50 p-2.5 rounded-sm">
          <img src={block.url} alt={block.caption ?? ''} className="w-full object-cover rounded-sm brightness-95" loading="lazy" />
          {block.caption && (
            <figcaption className="font-sans text-xs text-neutral-500 mt-3 leading-relaxed px-1 border-l-2 border-neutral-300 pl-3">
              {block.caption}{block.credit ? ` / Photo: ${block.credit}` : ''}
            </figcaption>
          )}
        </figure>
      );
    case 'divider':
      return (
        <div key={idx} className="my-12 flex items-center gap-4 select-none">
          <div className="flex-1 h-px bg-neutral-200" />
          <div className="font-serif text-neutral-400 text-xs tracking-widest">***</div>
          <div className="flex-1 h-px bg-neutral-200" />
        </div>
      );
    default:
      return null;
  }
}

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const articles = articlesData.articles as Article[];
  const article = articles.find((a) => a.slug === slug);

  useDocumentTitle(article?.title ?? 'Record Deficient');

  if (!article) {
    return <Navigate to="/" replace />;
  }

  const relatedArticles = articles
    .filter((a) => a.id !== article.id && (a.category === article.category || a.tags.some((t) => article.tags.includes(t))))
    .slice(0, 3);

  const fallbackRelated = articles.filter((a) => a.id !== article.id).slice(0, 3);
  const displayRelated = relatedArticles.length > 0 ? relatedArticles : fallbackRelated;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: article.title, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Article linkage link saved to registry clipboard.');
      }
    } catch {
      // ignore
    }
  };

  return (
    <>
      <MetaTags article={article} />
      {/* Traditional high-contrast digital newspaper canvas */}
      <div className="bg-white text-neutral-950 min-h-screen antialiased">

        {/* METRIC BREADCRUMB INDICATOR */}
        <div className="border-b border-neutral-200 bg-neutral-50 select-none">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            <Link to="/" className="hover:text-neutral-900 transition-colors flex items-center gap-1">
              <ArrowLeft size={12} />
              <span>FRONT PAGE</span>
            </Link>
            <span className="text-neutral-300">/</span>
            <CategoryBadge category={article.category} linkable />
            <span className="text-neutral-300 truncate hidden sm:inline">/</span>
            <span className="text-neutral-400 font-sans tracking-normal font-medium max-w-xs truncate hidden sm:inline">{article.title}</span>
          </div>
        </div>

        {/* DIGNIFIED FULL-WIDTH GRAPHIC FRAMEWORK */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="border-b border-neutral-200 pb-12">
            
            {/* COMPOSITE HEADLINE BLOCK */}
            <header className="max-w-3xl mx-auto text-center space-y-6 mb-8">
              <div className="flex items-center justify-center gap-3 select-none">
                {article.breaking && (
                  <span className="inline-flex items-center gap-1 font-sans text-[10px] font-black uppercase tracking-widest text-white bg-red-600 px-2 py-0.5 rounded-sm">
                    <AlertCircle size={10} />
                    <span>CRITICAL UPDATE</span>
                  </span>
                )}
                <CategoryBadge category={article.category} linkable />
                {article.editors_pick && (
                  <span className="font-mono text-[9px] uppercase tracking-widest border border-amber-600 text-amber-800 bg-amber-50 px-2 py-0.5 rounded-sm">
                    EDITORIAL RECOMMENDATION
                  </span>
                )}
              </div>

              <h1 className="font-serif text-neutral-900 font-black tracking-tight leading-[1.1] text-center"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                {article.title}
              </h1>
              
              <p className="font-serif text-neutral-600 text-lg md:text-xl leading-normal max-w-2xl mx-auto text-center font-normal">
                {article.subtitle}
              </p>
            </header>

            {/* ART CANVAS WRAPPER */}
            <div className="w-full h-[50vh] sm:h-[65vh] overflow-hidden border border-neutral-200 p-1.5 bg-neutral-50 rounded-sm">
              <img
                src={article.coverImage.url}
                alt=""
                className="w-full h-full object-cover brightness-95 filter contrast-[1.02]"
                loading="eager"
              />
            </div>
            {article.coverImage.caption && (
              <div className="max-w-3xl mx-auto mt-3 select-none text-left">
                <p className="font-sans text-xs text-neutral-500 leading-normal">
                  {article.coverImage.caption} {article.coverImage.credit ? `— Photograph by ${article.coverImage.credit}` : ''}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* TRADITIONAL SPLIT EDITORIAL CANVAS LAYOUT */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* MAIN TEXT COMPONENT NODE */}
            <div className="lg:col-span-8 lg:border-r lg:border-neutral-200 lg:pr-8">
              
              {/* BYLINE REGISTRY ROW */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-neutral-200 font-mono text-[10px] tracking-wider text-neutral-500 uppercase select-none">
                <div className="flex items-center gap-3">
                  <img
                    src={article.author.avatar}
                    alt=""
                    className="w-9 h-9 rounded-full object-cover border border-neutral-200"
                  />
                  <div>
                    <span className="font-sans font-bold text-neutral-900 text-sm tracking-normal normal-case block">{article.author.name}</span>
                    <span className="text-neutral-400 text-[9px] block mt-0.5">{article.author.role}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-sans tracking-normal normal-case text-neutral-500 text-xs">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-neutral-400" />
                    <span>{formatDate(article.publishDate)}</span>
                  </div>
                  <span className="text-neutral-300 hidden sm:inline">|</span>
                  <div className="flex items-center gap-1.5">
                    <Clock size={13} className="text-neutral-400" />
                    <span>{article.readTime} Reading Time</span>
                  </div>
                </div>
              </div>

              {/* CORE TRANSLATION DISPATCH BODY */}
              <main id="article-body">
                {article.content.map((block, idx) => renderBlock(block, idx))}
              </main>

              {/* INTEGRATED ANNOTATION APPARATUS */}
              <div className="pt-8 border-t border-neutral-200 mt-12">
                <AnnotationSystem slug={article.slug} />
              </div>

              {/* CLASSIFIED SUBJECT METADATA TAGS */}
              <div className="mt-10 pt-6 border-t border-neutral-100 select-none">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag size={12} className="text-neutral-400" />
                  <span className="font-sans font-bold text-xs text-neutral-500 mr-2 uppercase tracking-wider">Filed Under:</span>
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-sans text-xs text-neutral-700 bg-neutral-100 border border-neutral-200 px-2.5 py-0.5 rounded-sm hover:bg-neutral-200 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* AUTHOR ARCHIVE CREDENTIAL PROFILE */}
              <div className="mt-10 p-6 bg-neutral-50 border border-neutral-200 rounded-sm">
                <div className="flex items-start gap-4">
                  <img
                    src={article.author.avatar}
                    alt=""
                    className="w-14 h-14 rounded-full object-cover border border-neutral-200 flex-shrink-0"
                  />
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block">CONTRIBUTOR REGISTER</span>
                    <h4 className="font-serif text-neutral-900 font-bold text-base">{article.author.name}</h4>
                    <p className="font-serif text-sm text-neutral-600 leading-relaxed">{article.author.bio}</p>
                  </div>
                </div>
              </div>

              {/* USER INTERACTION CONTROL CLUSTER */}
              <div className="mt-8 flex items-center gap-3 flex-wrap font-sans text-xs font-bold uppercase tracking-wider select-none">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white px-5 py-3 transition-colors rounded-sm shadow-sm"
                >
                  <Share2 size={13} />
                  <span>Share This Story</span>
                </button>
                <button className="flex items-center gap-2 border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-700 transition-colors px-5 py-3 rounded-sm">
                  <Bookmark size={13} />
                  <span>Archive Entry</span>
                </button>
              </div>
            </div>

            {/* RIGID METRIC DISPATCH SIDEBAR */}
            <aside className="lg:col-span-4 space-y-10 select-none">

              <div className="space-y-4">
                <div className="border-b border-neutral-200 pb-2">
                  <h3 className="font-sans font-black text-xs uppercase tracking-widest text-neutral-900">Affiliated Streams</h3>
                </div>
                <SocialPromoStrip ids={['ad_telegram_channel', 'ad_substack']} />
              </div>

              <div className="border border-neutral-200 rounded-sm">
                <SocialPromo adId="ad_telegram_channel" />
              </div>

              {/* CONTEXTUAL ALTERNATIVE CLASSIFIED RECORDS */}
              {displayRelated.length > 0 && (
                <div className="border border-neutral-200 p-5 bg-neutral-50 rounded-sm">
                  <div className="border-b border-neutral-900 pb-2 mb-4">
                    <h3 className="font-sans font-black text-xs uppercase tracking-widest text-neutral-900">Related Dispatches</h3>
                  </div>
                  <div className="divide-y divide-neutral-200/60">
                    {displayRelated.map((a) => (
                      <ArticleCard key={a.id} article={a} variant="sidebar" />
                    ))}
                  </div>
                </div>
              )}

              <div className="border border-neutral-200 rounded-sm">
                <SocialPromo adId="ad_youtube" />
              </div>
              <div className="border border-neutral-200 rounded-sm">
                <SocialPromo adId="ad_submissions" />
              </div>
              <div className="border border-neutral-200 rounded-sm">
                <SocialPromo adId="ad_addis_standard" />
              </div>
            </aside>
          </div>

          {/* SECONDARY DOWNSTREAM REPOSITORY GRID */}
          <div className="mt-20 pt-10 border-t border-neutral-200">
            <div className="border-b border-neutral-900 pb-2 mb-8 select-none">
              <h2 className="font-serif font-black text-xl tracking-tight text-neutral-900">
                Extended Operational Dispatches Index
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayRelated.map((a) => (
                <ArticleCard key={a.id} article={a} variant="grid" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}