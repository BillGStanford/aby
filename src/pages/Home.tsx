import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';
import articlesData from '../data/articles.json';
import { Article } from '../types';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import ArticleCard from '../components/ArticleCard';
import SocialPromo, { SocialPromoStrip } from '../components/SocialPromo';
import MetaTags from '../components/MetaTags';
import { getCategoryColor } from '../utils';

export default function Home() {
  useDocumentTitle('Abyot — Independent Analysis & Ethiopian Political Discourse');

  const articles = articlesData.articles as Article[];

  const featured = useMemo(() => articles.find((a) => a.featured) ?? articles[0], [articles]);
  const breaking = useMemo(() => articles.filter((a) => a.breaking).slice(0, 3), [articles]);
  const editorsPicks = useMemo(() => articles.filter((a) => a.editors_pick && !a.featured).slice(0, 3), [articles]);
  const sidebarArticles = useMemo(() => articles.filter((a) => a.id !== featured.id).slice(0, 5), [articles, featured]);
  const gridArticles = useMemo(() => articles.filter((a) => a.id !== featured.id && !editorsPicks.find(e => e.id === a.id)).slice(0, 6), [articles, featured, editorsPicks]);
  const categories = useMemo(() => [...new Set(articles.map((a) => a.category))].slice(0, 6), [articles]);

  return (
    <>
      <MetaTags />
      {/* Premium crisp newspaper white canvas background */}
      <div className="bg-white text-neutral-950 min-h-screen antialiased">

        {/* REFINED TIMELY DISPATCH FLASH (NYT EDITORIAL BANNER STYLE) */}
        {breaking.length > 0 && (
          <div className="bg-neutral-50 border-b border-neutral-200 py-2.5 select-none">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4 overflow-hidden">
              <div className="flex items-center gap-1.5 flex-shrink-0 bg-neutral-900 px-2 py-0.5 rounded-sm">
                <Flame size={12} className="text-white fill-white" />
                <span className="font-mono text-[10px] text-white uppercase tracking-wider font-bold">LIVE WIRE</span>
              </div>
              <div className="overflow-hidden w-full">
                <div className="flex gap-8 overflow-x-auto no-scrollbar py-0.5">
                  {breaking.map((a) => (
                    <Link
                      key={a.id}
                      to={`/article/${a.slug}`}
                      className="font-serif text-sm font-medium text-neutral-800 hover:text-neutral-600 transition-colors whitespace-nowrap"
                    >
                      • {a.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MAJESTIC THREE-COLUMN ASYMMETRIC PRESS LAYOUT */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-neutral-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* FRONT PAGE HERO FEATURE COLUMN */}
            <div className="lg:col-span-8 lg:border-r lg:border-neutral-200 lg:pr-8 flex flex-col justify-stretch">
              <ArticleCard article={featured} variant="hero" />
            </div>

            {/* UP-TO-THE-MINUTE CHRONOLOGICAL REGISTER SIDEBAR */}
            <div className="lg:col-span-4 flex flex-col">
              <div className="pb-3 mb-4 border-b border-neutral-900 flex items-baseline justify-between">
                <h3 className="font-sans font-black text-xs uppercase tracking-widest text-neutral-900">
                  The Latest Records
                </h3>
                <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">REALTIME INDEX</span>
              </div>
              <div className="flex-1 divide-y divide-neutral-100 overflow-y-auto max-h-[560px] pr-1 no-scrollbar">
                {sidebarArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} variant="sidebar" />
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* STRUCTURAL SEGMENTATION RAIL */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-neutral-200 select-none bg-neutral-50/50">
          <div className="flex items-center gap-8 overflow-x-auto no-scrollbar py-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-bold flex-shrink-0">
              DEPARTMENTS //
            </span>
            <div className="flex items-center gap-6">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  to={`/category/${cat.toLowerCase()}`}
                  className="font-sans text-xs uppercase tracking-widest font-bold transition-colors text-neutral-600 hover:text-neutral-900 hover:underline underline-offset-4 flex-shrink-0"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* PRIMARY DOWNSTREAM DOSSIER REPOSITORY */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* DUAL EDITORIAL AGGREGATOR TRACK */}
            <main className="lg:col-span-8 space-y-12 lg:border-r lg:border-neutral-200 lg:pr-8">

              {/* HIGH-HIERARCHY EDITOR COMPILATIONS */}
              {editorsPicks.length > 0 && (
                <section>
                  <div className="border-b-2 border-neutral-900 pb-2 mb-6">
                    <h2 className="font-serif font-black text-xl tracking-tight text-neutral-900">
                      Strategic Analysis & Core Picks
                    </h2>
                  </div>
                  <div className="divide-y divide-neutral-200">
                    {editorsPicks.map((article) => (
                      <ArticleCard key={article.id} article={article} variant="horizontal" />
                    ))}
                  </div>
                </section>
              )}

              {/* INTEGRATED BROADCAST BUFFER MODULE */}
              <div className="border border-neutral-200 bg-neutral-50 p-1 rounded-sm">
                <SocialPromo adId="ad_telegram_channel" />
              </div>

              {/* COMPREHENSIVE REPOSITORY GRID ARCHIVE */}
              <section>
                <div className="border-b border-neutral-900 pb-2 mb-6 flex items-baseline justify-between">
                  <h2 className="font-serif font-black text-xl tracking-tight text-neutral-900">
                    Comprehensive Dispatch Files
                  </h2>
                  <Link
                    to="/category/analysis"
                    className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 hover:text-neutral-900 transition-colors flex items-center gap-1"
                  >
                    <span>Browse All Archive</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {gridArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} variant="grid" />
                  ))}
                </div>
              </section>
            </main>

            {/* RIGID INSTITUTIONAL TERMINALS SIDEBAR */}
            <aside className="lg:col-span-4 space-y-10 lg:sticky lg:top-24">

              {/* MANIFESTO ATTESTATION CALLOUT */}
              <div className="border-t-4 border-b border-neutral-900 py-6 px-1">
                <p className="font-serif text-lg text-neutral-800 leading-relaxed italic font-medium tracking-wide">
                  "Revolution is not an event — it is a process."
                </p>
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-400 mt-3 block">
                  THE ABYOT EDITORIAL COOPERATIVE
                </span>
              </div>

              {/* REFINED TELEMETRY CONNECTIONS HUB */}
              <div className="space-y-4">
                <div className="border-b border-neutral-200 pb-2">
                  <h3 className="font-sans font-black text-xs uppercase tracking-widest text-neutral-900">Wire Affiliations</h3>
                </div>
                <SocialPromoStrip ids={['ad_telegram_channel', 'ad_substack', 'ad_youtube']} />
              </div>

              {/* OBJECTIVE DECONSTRUCTION MATRIX CARD */}
              <div className="bg-neutral-50 border border-neutral-200 p-6 rounded-sm space-y-4">
                <span className="font-mono text-[9px] font-bold text-neutral-500 uppercase tracking-widest block">// STANDARDS MANIFESTO</span>
                <p className="font-serif text-sm text-neutral-700 leading-relaxed">
                  Abyot serves as an authoritative institutional venue for strict historical inquiry, materialist cross-examination, and independent geopolitical analysis regarding the Horn of Africa.
                </p>
                <Link
                  to="/about"
                  className="font-sans text-xs font-bold uppercase tracking-wider text-neutral-900 hover:underline block pt-2 border-t border-neutral-200"
                >
                  Review Collective Mandate →
                </Link>
              </div>

              {/* SECONDARY ADVOCACY BUFFER PLUG */}
              <div className="border border-neutral-200 rounded-sm">
                <SocialPromo adId="ad_submissions" />
              </div>

              {/* TRADITIONAL TOPICAL INDEX TAG CLOUD */}
              <div className="space-y-4">
                <div className="border-b border-neutral-200 pb-2">
                  <h3 className="font-sans font-black text-xs uppercase tracking-widest text-neutral-900">Indexed Matrix Subjects</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[...new Set(articles.flatMap((a) => a.tags))].slice(0, 18).map((tag) => (
                    <span
                      key={tag}
                      className="font-sans text-[11px] font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 px-2.5 py-1 rounded-sm transition-colors select-none cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}