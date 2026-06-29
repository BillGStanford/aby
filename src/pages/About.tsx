import { Link } from 'react-router-dom';
import { ArrowRight, Landmark, ShieldCheck, HelpCircle } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import MetaTags from '../components/MetaTags';
import SocialPromo, { SocialPromoStrip } from '../components/SocialPromo';
import socialsData from '../data/socials.json';

export default function About() {
  useDocumentTitle('About Abyot — Institutional Purpose & Mandate');

  const { publication } = socialsData;

  return (
    <>
      <MetaTags
        title="About Abyot — Institutional Purpose & Mandate"
        description="Abyot serves as an authoritative institutional venue for strict historical inquiry, materialist cross-examination, and independent geopolitical analysis regarding the Horn of Africa."
      />
      
      {/* Premium crisp newspaper white canvas background */}
      <div className="bg-white text-neutral-950 min-h-screen antialiased">

        {/* STRUCTURAL SEGMENT MANIFESTO HEADER */}
        <div className="border-b border-neutral-900 py-12 bg-neutral-50 select-none">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1.5 h-6 flex-shrink-0 bg-neutral-950" />
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.25em] text-neutral-500">
                ORGANIZATIONAL DISPATCH REGISTER
              </span>
            </div>
            
            <h1 className="font-serif text-neutral-900 font-black tracking-tighter" style={{ fontSize: 'clamp(2.25rem, 6vw, 3.75rem)' }}>
              About the Collective
            </h1>
            
            <p className="font-serif text-neutral-600 text-lg md:text-xl leading-normal max-w-3xl mt-4 font-normal border-t border-neutral-200 pt-4">
              {publication.tagline} — <span className="italic">{publication.taglineAmharic}</span>
            </p>
          </div>
        </div>

        {/* PRIMARY SPLIT MATRIC PRESS LAYOUT */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* CORE MANIFESTO DOSSIER BODY */}
            <main className="lg:col-span-8 space-y-10 lg:border-r lg:border-neutral-200 lg:pr-8">
              
              <section className="space-y-4">
                <div className="border-b-2 border-neutral-900 pb-2 flex items-center gap-2 select-none">
                  <Landmark size={16} className="text-neutral-900" />
                  <h2 className="font-serif font-black text-xl tracking-tight text-neutral-900">
                    1. Editorial Mandate & Purpose
                  </h2>
                </div>
                <p className="font-serif text-neutral-800 text-base md:text-lg leading-[1.85] tracking-normal text-justify">
                  Abyot functions as an independent, institutional news agency and critical journal dedicated to meticulous geopolitical analysis, dialectical reporting, and structural critique regarding Ethiopia and the broader Horn of Africa region. 
                </p>
                <p className="font-serif text-neutral-800 text-base md:text-lg leading-[1.85] tracking-normal text-justify">
                  We distance ourselves from sensational commercial media models, prioritizing deep historical contexts, economic material factors, and cross-examined field records. Our goal is to synthesize structured, high-fidelity dispatches uncorrupted by corporate frameworks or polarized bias.
                </p>
              </section>

              <section className="space-y-4">
                <div className="border-b-2 border-neutral-900 pb-2 flex items-center gap-2 select-none">
                  <ShieldCheck size={16} className="text-neutral-900" />
                  <h2 className="font-serif font-black text-xl tracking-tight text-neutral-900">
                    2. Rigorous Verification Protocols
                  </h2>
                </div>
                <p className="font-serif text-neutral-800 text-base md:text-lg leading-[1.85] tracking-normal text-justify">
                  Every dossier, repository analysis, and record filed under our matrix undergoes rigorous verification processes overseen by independent regional scholars, field analysts, and members of the Abyot Editorial Cooperative. 
                </p>
                <p className="font-serif text-neutral-800 text-base md:text-lg leading-[1.85] tracking-normal text-justify">
                  We are firmly committed to open-source corroboration, ensuring that citations, translated state decrees, and socio-economic telemetry statistics align strictly with historical reality before public transmission.
                </p>
                <div className="pt-4 select-none">
                  <Link
                    to="/guidelines"
                    className="font-sans text-xs font-bold uppercase tracking-wider text-neutral-950 hover:underline inline-flex items-center gap-1.5"
                  >
                    <span>Review Our Complete Standards Protocol</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </section>

              <section className="space-y-4">
                <div className="border-b-2 border-neutral-900 pb-2 flex items-center gap-2 select-none">
                  <HelpCircle size={16} className="text-neutral-900" />
                  <h2 className="font-serif font-black text-xl tracking-tight text-neutral-900">
                    3. Secure Open Source Submissions
                  </h2>
                </div>
                <p className="font-serif text-neutral-800 text-base md:text-lg leading-[1.85] tracking-normal text-justify">
                  The progress of intellectual discourse relies directly on collective inquiry. Abyot accepts original analytical drafts, unredacted historical documents, and translated field dispatches from corresponding writers, investigators, and political theorists.
                </p>
                <p className="font-serif text-neutral-800 text-base md:text-lg leading-[1.85] tracking-normal text-justify">
                  All submitted documentation remains highly classified; we offer verified cryptographic anonymity channels to contributors navigating high-risk operational regions.
                </p>
                <div className="pt-4 select-none">
                  <Link
                    to="/contact"
                    className="font-sans text-xs font-bold uppercase tracking-wider text-white bg-neutral-950 hover:bg-neutral-800 px-5 py-3 transition-colors inline-block rounded-sm shadow-sm"
                  >
                    Initiate Secure Submission
                  </Link>
                </div>
              </section>

            </main>

            {/* RIGID INSTITUTIONAL SPECIFICATION SIDEBAR */}
            <aside className="lg:col-span-4 space-y-10 lg:sticky lg:top-24">
              
              {/* METRIC SPECIFICATION REGISTER TRACK */}
              <div className="bg-neutral-50 border border-neutral-200 p-6 rounded-sm space-y-4">
                <div className="border-b border-neutral-200 pb-2 select-none">
                  <h3 className="font-sans font-black text-xs uppercase tracking-widest text-neutral-950">
                    Registry Specifications
                  </h3>
                </div>
                <dl className="divide-y divide-neutral-200/60 font-sans text-xs">
                  {[
                    { label: 'Agency Name', value: 'Abyot Press (አብዮት)' },
                    { label: 'Founded Status', value: publication.founded },
                    { label: 'Legal Structure', value: 'Independent Press Cooperative' },
                    { label: 'Primary Purview', value: 'Horn of Africa / Political Economy' },
                    { label: 'Editorial Model', value: 'Peer-Corroborated Materialism' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between gap-4 py-2.5 first:pt-0 last:pb-0">
                      <dt className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 font-bold">{label}</dt>
                      <dd className="font-serif text-neutral-900 font-bold text-right">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* TRADITIONAL HISTORICAL MAXIM PLUG */}
              <div className="border-t-4 border-b border-neutral-900 py-6 px-1 select-none">
                <p className="font-serif text-lg text-neutral-800 leading-relaxed italic font-medium tracking-wide">
                  "The philosophers have only interpreted the world, in various ways. The point, however, is to change it."
                </p>
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-400 mt-3 block">
                  — HISTORICAL THESES REGISTRY
                </span>
              </div>

              {/* REFINED WIRE CHANNEL TERMINAL */}
              <div className="space-y-4">
                <div className="border-b border-neutral-200 pb-2 select-none">
                  <h3 className="font-sans font-black text-xs uppercase tracking-widest text-neutral-950">
                    Follow Digital Streams
                  </h3>
                </div>
                <SocialPromoStrip ids={['ad_telegram_channel', 'ad_substack', 'ad_youtube', 'ad_addis_standard']} />
              </div>

              {/* INTEGRATED ADVERTISING MODULE PLACEHOLDER */}
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