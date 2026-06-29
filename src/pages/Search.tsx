import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, SlidersHorizontal, Tag, User, Folder, FileText, Calendar } from 'lucide-react';
import articlesData from '../data/articles.json';
import { Article } from '../types';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import ArticleCard from '../components/ArticleCard';
import MetaTags from '../components/MetaTags';

export default function Search() {
  useDocumentTitle('Archive Search Ingestion Matrix — Abyot');
  
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  
  const [inputValue, setInputValue] = useState(queryParam);
  const [activeFilter, setActiveFilter] = useState<'all' | 'title' | 'author' | 'tag' | 'topic'>('all');

  // Synchronize input value if URL params change externally
  useEffect(() => {
    setInputValue(queryParam);
  }, [queryParam]);

  const articles = articlesData.articles as Article[];

  // Execution engine covering keywords, full phrases, authors, tags, and topics
  const searchResults = useMemo(() => {
    const cleanQuery = queryParam.trim().toLowerCase();
    if (!cleanQuery) return [];

    return articles.filter((article) => {
      const matchTitle = article.title.toLowerCase().includes(cleanQuery) || article.subtitle.toLowerCase().includes(cleanQuery);
      const matchAuthor = article.author.name.toLowerCase().includes(cleanQuery);
      const matchTopic = article.category.toLowerCase().includes(cleanQuery);
      const matchTags = article.tags.some(tag => tag.toLowerCase().includes(cleanQuery));
      
      // Deep content block keyword inspection
      const matchContent = article.content.some(block => 
        (block.text && block.text.toLowerCase().includes(cleanQuery)) || 
        (block.html && block.html.toLowerCase().includes(cleanQuery))
      );

      if (activeFilter === 'title') return matchTitle;
      if (activeFilter === 'author') return matchAuthor;
      if (activeFilter === 'topic') return matchTopic;
      if (activeFilter === 'tag') return matchTags;
      
      // Default 'all' logic matches keywords or full words anywhere
      return matchTitle || matchAuthor || matchTopic || matchTags || matchContent;
    });
  }, [queryParam, activeFilter, articles]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: inputValue });
  };

  return (
    <>
      <MetaTags
        title="Archive Search System — Abyot"
        description="Query the operational matrix database for verified independent articles, authors, historical dispatches, and geopolitical analysis logs."
      />

      <div className="bg-white text-neutral-950 min-h-screen antialiased">
        
        {/* STRUCTURAL TELEMETRY SEARCH INPUT HEAD */}
        <div className="border-b border-neutral-200 py-12 bg-neutral-50 select-none">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-5 bg-neutral-950 flex-shrink-0" />
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.25em] text-neutral-500">
                DATABASE DISPATCH RETRIEVAL ENGINE
              </span>
            </div>

            <h1 className="font-serif text-neutral-950 font-black text-3xl sm:text-4xl tracking-tight mb-6">
              Search Chronicles
            </h1>

            <form onSubmit={handleSearchSubmit} className="max-w-3xl">
              <div className="flex items-center gap-3 border border-neutral-300 bg-white px-4 py-3 rounded-sm shadow-inner focus-within:border-neutral-950 transition-colors">
                <SearchIcon size={18} className="text-neutral-400" />
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter keywords, author identities, matrix tags, or complete phrases..."
                  className="bg-transparent flex-1 text-neutral-950 placeholder-neutral-400 font-sans text-base outline-none"
                />
                <button 
                  type="submit"
                  className="font-mono text-[10px] bg-neutral-950 hover:bg-neutral-800 text-white border border-neutral-950 px-3 py-1.5 rounded-sm font-bold tracking-widest transition-colors"
                >
                  QUERY_LOG
                </button>
              </div>
            </form>

            {/* SECTOR CRITERIA FILTER BAR */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mt-6 pt-2">
              <SlidersHorizontal size={13} className="text-neutral-400 mr-2 flex-shrink-0" />
              {[
                { id: 'all', label: 'All Fields Matrix', icon: FileText },
                { id: 'title', label: 'Titles / Content', icon: FileText },
                { id: 'author', label: 'Author Register', icon: User },
                { id: 'topic', label: 'Topics / Categories', icon: Folder },
                { id: 'tag', label: 'Indexed Tags', icon: Tag },
              ].map((filter) => {
                const IconComponent = filter.icon;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id as any)}
                    className={`font-sans text-xs uppercase tracking-wider px-3.5 py-1.5 font-bold rounded-sm border whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                      activeFilter === filter.id
                        ? 'bg-neutral-950 border-neutral-950 text-white'
                        : 'bg-white border-neutral-200 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50'
                    }`}
                  >
                    <IconComponent size={11} />
                    <span>{filter.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* MAIN RESULTS DISPLAY FRAMEWORK */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
          {!queryParam.trim() ? (
            /* DORMANT MATRIX STATE */
            <div className="text-center py-20 max-w-xl mx-auto border border-dashed border-neutral-200 bg-neutral-50/50 p-6 rounded-sm">
              <p className="font-serif font-bold text-base text-neutral-700">
                System Awaiting Parameters
              </p>
              <p className="font-sans text-xs text-neutral-400 mt-1">
                Input your targeted parameters inside the terminal module above to cross-reference our decentralized records ledger.
              </p>
            </div>
          ) : searchResults.length === 0 ? (
            /* HOLLOW MATCH STATE */
            <div className="text-center py-20 max-w-xl mx-auto border border-dashed border-neutral-200 bg-neutral-50/50 p-6 rounded-sm">
              <p className="font-serif font-black text-lg text-neutral-950">
                Zero Matrix Matches Found
              </p>
              <p className="font-sans text-sm text-neutral-500 mt-2 leading-relaxed">
                No articles matches matched the query parameters: <code className="bg-neutral-100 px-1.5 py-0.5 font-mono text-xs rounded text-neutral-800">"{queryParam}"</code> under the current operational filter selection.
              </p>
            </div>
          ) : (
            /* ACTIVE RETRIEVED DISPATCH MATRIX DISPLAY */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* RETRIEVED REGISTER LIST TRAIL */}
              <main className="lg:col-span-8 space-y-6">
                <div className="border-b border-neutral-900 pb-2 select-none mb-6">
                  <p className="font-mono text-[11px] text-neutral-500 uppercase tracking-widest font-bold">
                    Telemetry Match Register // {searchResults.length} Document{searchResults.length !== 1 ? 's' : ''} Retrieved
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {searchResults.map((article) => (
                    <div key={article.id} className="border border-neutral-100 p-2 rounded-sm hover:border-neutral-300 transition-colors bg-white">
                      <ArticleCard article={article} variant="grid" />
                    </div>
                  ))}
                </div>
              </main>

              {/* RIGID TELEMETRY CONTEXTUAL SIDEBAR */}
              <aside className="lg:col-span-4 space-y-6 border-t lg:border-t-0 lg:border-l lg:border-neutral-200 pt-8 lg:pt-0 lg:pl-8 select-none">
                <div className="bg-neutral-50 border border-neutral-200 p-5 rounded-sm">
                  <h3 className="font-sans font-black text-xs uppercase tracking-widest text-neutral-950 mb-2">
                    Query Framework Metrics
                  </h3>
                  <div className="space-y-2 text-xs font-mono text-neutral-600">
                    <div><span className="text-neutral-400">TERM_PARAM:</span> {queryParam.toUpperCase()}</div>
                    <div><span className="text-neutral-400">TARGET_FILTER:</span> {activeFilter.toUpperCase()}</div>
                    <div><span className="text-neutral-400">INDEX_INTEGRITY:</span> SECURE / SEC_VERIFIED</div>
                  </div>
                </div>

                <div className="border border-neutral-200 p-5 bg-neutral-50/50 rounded-sm">
                  <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-neutral-950 mb-3">
                    Looking For Something Specific?
                  </h4>
                  <p className="font-serif text-xs text-neutral-600 leading-relaxed">
                    You can switch criteria to <strong>Author Register</strong> or <strong>Indexed Tags</strong> targets directly to drill down into historical documentation without parsing full bodies.
                  </p>
                </div>
              </aside>

            </div>
          )}
        </div>
      </div>
    </>
  );
}