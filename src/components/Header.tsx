import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Calendar, Send } from 'lucide-react';
import socialsData from '../data/socials.json';

interface NavLinkItem {
  label: string;
  path: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { label: 'Politics', path: '/category/politics' },
  { label: 'Analysis', path: '/category/analysis' },
  { label: 'History', path: '/category/history' },
  { label: 'Theory', path: '/category/theory' },
  { label: 'Geopolitics', path: '/category/geopolitics' },
  { label: 'Economy', path: '/category/economy' },
  { label: 'Society', path: '/category/society' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Safely route to the new advanced search engine matrix page
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  const telegram = socialsData.socials.find((s) => s.id === 'telegram');

  return (
    <>
      {/* CRISP METRIC TICKER UPPER RUNWAY */}
      <div className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 select-none">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider">
          <div className="flex items-center gap-5">
            {socialsData.socials.slice(0, 4).map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neutral-950 transition-colors font-medium"
              >
                {social.platform === 'X (Twitter)' ? '// X.COM' : `// ${social.platform.split(' ')[0]}`}
              </a>
            ))}
          </div>
          
          <div className="hidden md:flex items-center gap-1.5 text-neutral-400 font-medium">
            <Calendar size={11} />
            <span>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>

          {telegram && (
            <a
              href={telegram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-neutral-900 hover:underline font-bold transition-colors"
            >
              <Send size={10} className="fill-neutral-900 text-white" />
              <span>{telegram.cta}</span>
            </a>
          )}
        </div>
      </div>

      {/* MAJESTIC ASYMMETRIC PRESS MASTHEAD */}
      <header className={`bg-white text-neutral-950 sticky top-0 z-50 transition-all duration-200 border-b ${scrolled ? 'border-neutral-300 shadow-sm py-2' : 'border-neutral-200 py-4'}`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between pb-3">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-neutral-800 hover:text-neutral-950 transition-colors p-1"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Structured Wordmark Branding */}
            <Link to="/" className="flex items-center gap-3.5 group">
              <div className="w-1.5 h-10 bg-neutral-950 flex-shrink-0" />
              <div>
                <div className="font-serif text-neutral-950 font-black tracking-tighter leading-none" style={{ fontSize: '2.1rem' }}>
                  Abyot
                </div>
                <div className="font-mono text-neutral-400 text-[9px] font-bold uppercase tracking-[0.28em] leading-none mt-1">
                  INDEPENDENT CHRONICLE · REGISTERED PRESS
                </div>
              </div>
            </Link>

            {/* Interactive Control Terminal */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`text-neutral-500 hover:text-neutral-950 transition-colors p-2 rounded-sm ${searchOpen ? 'bg-neutral-100 text-neutral-950' : 'hover:bg-neutral-50'}`}
                aria-label="Search Matrix"
              >
                <Search size={16} />
              </button>
              <Link
                to="/contact"
                className="hidden sm:inline-flex items-center bg-neutral-950 hover:bg-neutral-800 text-white font-sans text-xs font-bold uppercase tracking-wider px-4 py-2.5 transition-colors rounded-sm shadow-sm"
              >
                Submit Dispatch
              </Link>
            </div>
          </div>

          {/* RIGID STRATIFIED DEEP NAVIGATION BOARD */}
          <nav className="hidden lg:flex items-center gap-1 pt-2 border-t border-neutral-100 select-none">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `font-sans text-xs uppercase tracking-widest font-bold px-3 py-2 transition-all rounded-sm ${
                    isActive
                      ? 'bg-neutral-950 text-white'
                      : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            
            <div className="h-4 w-px bg-neutral-200 ml-auto mr-2" />

            {['About', 'Guidelines'].map((label) => (
              <NavLink
                key={label}
                to={`/${label.toLowerCase()}`}
                className={({ isActive }) =>
                  `font-sans text-[11px] uppercase tracking-widest font-bold px-3 py-2 transition-all rounded-sm ${
                    isActive ? 'text-neutral-950 underline underline-offset-4' : 'text-neutral-400 hover:text-neutral-950'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* MOBILE GRID DIRECTORY MODULE */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-neutral-200 shadow-xl max-h-[85vh] overflow-y-auto">
            <nav className="max-w-[1400px] mx-auto px-4 py-4 grid grid-cols-2 gap-2 select-none">
              {[...NAV_LINKS, { label: 'About', path: '/about' }, { label: 'Guidelines', path: '/guidelines' }, { label: 'Contact', path: '/contact' }].map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `font-sans text-xs uppercase tracking-widest font-bold px-4 py-3 rounded-sm border transition-colors ${
                      isActive 
                        ? 'bg-neutral-950 border-neutral-950 text-white' 
                        : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}

        {/* SECURE ISOLATED SEARCH DOCK */}
        {searchOpen && (
          <div className="bg-neutral-50 border-t border-neutral-200 px-4 sm:px-6 lg:px-8 py-3.5 select-none animate-none">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-3 border border-neutral-300 bg-white px-4 py-2.5 rounded-sm shadow-inner focus-within:border-neutral-950 transition-colors">
                <Search size={15} className="text-neutral-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type parameters and press enter to query database archives…"
                  className="bg-transparent flex-1 text-neutral-950 placeholder-neutral-400 font-sans text-sm outline-none"
                />
                <button 
                  type="submit" 
                  className="font-mono text-[9px] bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 px-1.5 py-0.5 rounded-sm text-neutral-500 font-bold tracking-widest"
                >
                  EXECUTE
                </button>
              </form>
            </div>
          </div>
        )}
      </header>
    </>
  );
}