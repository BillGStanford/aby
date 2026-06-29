import { useParams, Link } from 'react-router-dom';
import articlesData from '../data/articles.json';
import { Article } from '../types';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import ArticleCard from '../components/ArticleCard';
import SocialPromo from '../components/SocialPromo';
import MetaTags from '../components/MetaTags';
import { getCategoryColor } from '../utils';

export default function CategoryPage() {
  const { category = '' } = useParams<{ category: string }>();
  const articles = articlesData.articles as Article[];

  const displayCategory = category.charAt(0).toUpperCase() + category.slice(1);
  const filtered = articles.filter((a) => a.category.toLowerCase() === category.toLowerCase());

  useDocumentTitle(`${displayCategory} — Registry Index`);

  const color = getCategoryColor(displayCategory);

  return (
    <>
      <MetaTags
        title={`${displayCategory} Articles — Abyot`}
        description={`Browse all curated historical and analytical files published within the ${displayCategory} category.`}
      />
      
      {/* Premium crisp white newspaper canvas */}
      <div className="bg-white text-neutral-950 min-h-screen antialiased">
        
        {/* SIMPLIFIED CATEGORY HEADER */}
        <div className="border-b border-neutral-200 py-10 bg-neutral-50">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color }}>
                Category Record
              </span>
            </div>
            <h1 className="font-serif text-neutral-950 font-black text-3xl sm:text-4xl tracking-tight">
              {displayCategory}
            </h1>
            <p className="font-sans text-xs text-neutral-500 mt-2">
              {filtered.length} curated {filtered.length === 1 ? 'dispatch' : 'dispatches'} found
            </p>
          </div>
        </div>

        {/* CLEAN TWO-COLUMN MAIN WORKSPACE */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {filtered.length === 0 ? (
            
            /* EMPTY STATE DETECTOR */
            <div className="text-center py-16 border border-dashed border-neutral-200 rounded-sm bg-neutral-50 max-w-xl mx-auto px-4">
              <p className="font-serif font-bold text-lg text-neutral-900 mb-1">
                No entries filed under {displayCategory}
              </p>
              <p className="font-sans text-sm text-neutral-500 mb-6">
                There are currently no active publications logged inside this archive branch.
              </p>
              <Link
                to="/"
                className="inline-block bg-neutral-950 hover:bg-neutral-800 text-white font-sans text-xs font-bold uppercase tracking-wider px-5 py-2.5 transition-colors rounded-sm"
              >
                Return to Master Feed
              </Link>
            </div>
          ) : (
            
            /* CLEAN SIMPLIFIED MATRIX GRID */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* STABLE INTERACTIVE ARTICLES LOG FEED */}
              <main className="lg:col-span-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {filtered.map((article) => (
                    <ArticleCard key={article.id} article={article} variant="grid" />
                  ))}
                </div>
              </main>

              {/* ISOLATED COMPLEMENTARY SIDEBAR PANEL */}
              <aside className="lg:col-span-4 space-y-6 border-t lg:border-t-0 lg:border-l lg:border-neutral-200 pt-8 lg:pt-0 lg:pl-8">
                <div className="border border-neutral-200 bg-neutral-50 p-5 rounded-sm">
                  <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-neutral-950 mb-2">
                    Archive Purview
                  </h3>
                  <p className="font-serif text-xs text-neutral-600 leading-relaxed">
                    You are viewing documents filed under the <strong>{displayCategory}</strong> sector index. All records here conform to independent publishing validation constraints.
                  </p>
                </div>

                <div className="border border-neutral-200 rounded-sm overflow-hidden">
                  <SocialPromo adId="ad_telegram_channel" />
                </div>
                
                <div className="border border-neutral-200 rounded-sm overflow-hidden">
                  <SocialPromo adId="ad_substack" />
                </div>
              </aside>

            </div>
          )}
        </div>
      </div>
    </>
  );
}