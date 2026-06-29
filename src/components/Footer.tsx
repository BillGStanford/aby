import { Link } from 'react-router-dom';
import { Send, Youtube, Twitter, Mail, Newspaper, ArrowUpRight } from 'lucide-react';
import socialsData from '../data/socials.json';

const ICON_MAP: Record<string, React.ElementType> = {
  send: Send,
  youtube: Youtube,
  twitter: Twitter,
  mail: Mail,
  newspaper: Newspaper,
};

export default function Footer() {
  const { publication, socials, newsletter } = socialsData;

  return (
    <footer className="bg-neutral-950 text-white border-t border-neutral-900 mt-24 font-mono select-none">
      
      {/* SECTION 1: ASYMMETRIC MANIFESTO & RADICAL INPUT HEADER */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 border-b border-neutral-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Stark Identity / Column Span 7 */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-sans font-black uppercase tracking-tighter">
                Abyot
              </span>
              <span className="w-1.5 h-1.5 bg-abyot-red rounded-full" />
              <span className="text-[10px] text-neutral-500 tracking-[0.3em] uppercase">
                // ROOT.NODE
              </span>
            </div>
            
            <p className="font-serif text-lg md:text-xl text-neutral-300 leading-relaxed max-w-2xl tracking-wide">
              {publication.description}
            </p>

            <div className="flex flex-col gap-1 text-[11px] text-neutral-500 tracking-wider uppercase">
              <div>System Status: <span className="text-abyot-gold animate-pulse">Operational</span></div>
              <div>Established Protocol: Matrix.{publication.founded}</div>
            </div>
          </div>



        </div>
      </div>

      {/* SECTION 2: DATAGRID REPOSITORY ROUTING */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-neutral-900">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-xs">
          
          {/* Index 01: Streams */}
          <div>
            <div className="text-[10px] text-neutral-600 tracking-[0.2em] uppercase mb-4">// EDITORIAL STREAMS</div>
            <ul className="space-y-2.5">
              {['Politics', 'Analysis', 'History', 'Theory', 'Geopolitics', 'Economy', 'Society'].map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/category/${cat.toLowerCase()}`}
                    className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1 group text-[13px] font-sans"
                  >
                    <span className="text-[10px] text-neutral-700 font-mono group-hover:text-abyot-red transition-colors">/</span>
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Index 02: Operations */}
          <div>
            <div className="text-[10px] text-neutral-600 tracking-[0.2em] uppercase mb-4">// SITE PROTOCOLS</div>
            <ul className="space-y-2.5">
              <li>
                <Link to="/about" className="text-neutral-400 hover:text-white transition-colors text-[13px] font-sans">
                  Manifesto Overview
                </Link>
              </li>
              <li>
                <Link to="/guidelines" className="text-neutral-400 hover:text-white transition-colors text-[13px] font-sans">
                  Submission Rules
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-400 hover:text-white transition-colors text-[13px] font-sans">
                  Secure Channels
                </Link>
              </li>
            </ul>
          </div>

          {/* Index 03: External Wires */}
          <div>
            <div className="text-[10px] text-neutral-600 tracking-[0.2em] uppercase mb-4">// EXTERNAL WIRES</div>
            <ul className="space-y-2.5">
              {socials.map((social) => {
                const Icon = ICON_MAP[social.icon] ?? Send;
                return (
                  <li key={social.id}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-neutral-400 hover:text-abyot-gold transition-colors text-[13px] font-sans"
                    >
                      <Icon size={12} className="text-neutral-600" />
                      <span>{social.platform}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Index 04: Terminal Metadata Dispatch */}
          <div className="col-span-2 md:col-span-1 bg-neutral-950 border border-neutral-900 p-5 rounded flex flex-col justify-between">
            <div className="space-y-2">
              <div className="text-[9px] text-neutral-500 tracking-wider uppercase leading-relaxed">
                {publication.tagline}
              </div>
              <div className="text-[11px] text-neutral-600 tracking-widest leading-relaxed">
                {publication.taglineAmharic}
              </div>
            </div>
            <a
              href={`mailto:${publication.email}`}
              className="text-[10px] text-abyot-gold hover:underline block mt-4 break-all tracking-wider"
            >
              {publication.email.toUpperCase()}
            </a>
          </div>

        </div>
      </div>

      {/* SECTION 3: SYSTEM PERMISSIONS MATRIX */}
      <div className="bg-neutral-950 text-neutral-600 text-[10px] tracking-[0.15em] uppercase">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} ABYOT PRESS // COPYLEFT REPRODUCTION ALLIED
          </div>
          <div className="flex items-center gap-2 text-neutral-500 font-semibold tracking-[0.2em]">
            <span>BUILT FOR THE STRUGGLE</span>
            <span className="w-1 h-1 bg-abyot-red rounded-full" />
            <span>V2.0.0</span>
          </div>
        </div>
      </div>

    </footer>
  );
}