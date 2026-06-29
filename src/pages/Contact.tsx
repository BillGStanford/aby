import { ArrowRight, Mail } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import MetaTags from '../components/MetaTags';
import SocialPromo, { SocialPromoStrip } from '../components/SocialPromo';
import socialsData from '../data/socials.json';

export default function Contact() {
  useDocumentTitle('Contact Protocol & Submission Guidelines');

  const { publication } = socialsData;

  return (
    <>
      <MetaTags
        title="Contact Protocol — Abyot"
        description="Official communication routing and explicit criteria for submission processing at Abyot Press."
      />
      
      {/* Premium crisp newspaper white canvas background */}
      <div className="bg-white text-neutral-950 min-h-screen antialiased">

        {/* STRUCTURAL SEGMENT HEADER */}
        <div className="border-b border-neutral-900 py-12 bg-neutral-50 select-none">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1.5 h-6 flex-shrink-0 bg-neutral-950" />
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.25em] text-neutral-500">
                COMMUNICATION INGESTION ROUTER
              </span>
            </div>
            
            <h1 className="font-serif text-neutral-900 font-black tracking-tighter" style={{ fontSize: 'clamp(2.25rem, 6vw, 3.75rem)' }}>
              Contact Registry
            </h1>
            
            <p className="font-mono text-[11px] text-neutral-500 uppercase tracking-widest mt-2 font-bold border-t border-neutral-200 pt-3 inline-block">
              Direct Communication Channel Terminal
            </p>
          </div>
        </div>

        {/* PRIMARY SPLIT PRESS LAYOUT */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* INGESTION MANDATE AND PROTOCOLS */}
            <main className="lg:col-span-8 space-y-10 lg:border-r lg:border-neutral-200 lg:pr-8">
              
              {/* DIRECT SECURE CHANNEL BOX */}
              <div className="border border-neutral-200 bg-neutral-50 p-8 rounded-sm flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 bg-neutral-950 text-white rounded-full flex items-center justify-center select-none shadow-sm">
                  <Mail size={20} />
                </div>
                <span className="font-mono text-[9px] font-bold text-neutral-400 uppercase tracking-widest block">// REGISTRY EMAIL ARCHIVE</span>
                <a
                  href={`mailto:${publication.email}`}
                  className="font-mono text-lg sm:text-2xl font-black text-neutral-950 hover:text-neutral-700 transition-colors underline break-all tracking-tight"
                >
                  {publication.email}
                </a>
              </div>

              {/* RIGID SUBMISSION RULES */}
              <section className="space-y-4">
                <div className="border-b-2 border-neutral-900 pb-2 select-none">
                  <h2 className="font-serif font-black text-xl tracking-tight text-neutral-900">
                    Rules for Submissions
                  </h2>
                </div>
                
                <div className="space-y-5">
                  <div className="flex gap-4 items-start">
                    <div className="font-mono text-xs bg-neutral-950 text-white w-5 h-5 flex items-center justify-center rounded-sm font-bold flex-shrink-0 select-none">1</div>
                    <p className="font-serif text-neutral-800 text-base leading-relaxed text-justify">
                      All analytical dispatches, theoretical logs, or letters addressed to the editors must be transmitted natively as an attached <strong>Word Document (.docx)</strong> or <strong>PDF file</strong>. Plain text message body configurations or shared hyperlinks will be dropped immediately at the perimeter framework.
                    </p>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="font-mono text-xs bg-neutral-950 text-white w-5 h-5 flex items-center justify-center rounded-sm font-bold flex-shrink-0 select-none">2</div>
                    <p className="font-serif text-neutral-800 text-base leading-relaxed text-justify">
                      The Editorial Cooperative operates under a strict operational deadline matrix. You are requested to expect a reply within <strong>24 hours and no more</strong> from initial transmission. If your dossier fails to generate an acknowledgment or determination ticket within this precise 24-hour buffer window, you may assume the manuscript does not meet current structural parameters.
                    </p>
                  </div>
                </div>
              </section>

            </main>

            {/* RIGID INSTITUTIONAL TERMINAL SIDEBAR */}
            <aside className="lg:col-span-4 space-y-10 lg:sticky lg:top-24">
              
              {/* REFINED TELEMETRY CONNECTIONS HUB */}
              <div className="space-y-4">
                <div className="border-b border-neutral-200 pb-2 select-none">
                  <h3 className="font-sans font-black text-xs uppercase tracking-widest text-neutral-900">
                    Syndicate Feeds
                  </h3>
                </div>
                <SocialPromoStrip ids={['ad_telegram_channel', 'ad_substack', 'ad_youtube']} />
              </div>

              {/* OBJECTIVE STANDARDS STICKER */}
              <div className="bg-neutral-50 border border-neutral-200 p-6 rounded-sm space-y-4 select-none">
                <span className="font-mono text-[9px] font-bold text-neutral-500 uppercase tracking-widest block">// STANDARDS MANIFESTO</span>
                <p className="font-serif text-sm text-neutral-700 leading-relaxed">
                  Abyot serves as an authoritative venue for meticulous regional records, geopolitical materialist cross-examination, and independent discourse uncorrupted by sensational networks.
                </p>
              </div>

              {/* AUXILIARY PROMO INTERACTION SLOTS */}
              <div className="border border-neutral-200 rounded-sm">
                <SocialPromo adId="ad_telegram_channel" />
              </div>

            </aside>

          </div>
        </div>
      </div>
    </>
  );
}