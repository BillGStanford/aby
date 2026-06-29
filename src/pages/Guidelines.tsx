import { useDocumentTitle } from '../hooks/useDocumentTitle';
import MetaTags from '../components/MetaTags';
import SocialPromo from '../components/SocialPromo';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface GuidelineSection {
  id: string;
  title: string;
  content: string[];
}

const SECTIONS: GuidelineSection[] = [
  {
    id: 'mission',
    title: 'I. Editorial Mission',
    content: [
      'Abyot publishes analysis, theory, history, and commentary from a Marxist-Leninist and anti-imperialist perspective. We are not a neutral publication. We take positions, and we expect our contributors to take positions.',
      'We are not interested in "balance" as a journalistic value. We are interested in rigor, honesty, and political clarity. A piece that presents the interests of imperialism and the interests of the oppressed as equally legitimate perspectives is not balanced — it is distorted.',
      'Our primary obligation is to our readers, who come to Abyot because they are serious about understanding and changing the world. We will not dilute our analysis to satisfy donors, advertisers, or the sensibilities of those in power.',
    ],
  },
  {
    id: 'standards',
    title: 'II. Standards of Analysis',
    content: [
      'Every factual claim must be verifiable. We do not require hyperlinks to Western mainstream sources — we require that claims can be checked, whether through primary documents, official records, or credible reporting in any language.',
      'We distinguish between analysis (the interpretation of facts), opinion (a stated position), and reporting (the presentation of facts). Authors should be clear about which mode they are operating in. We publish all three, but readers deserve to know the difference.',
      'When quoting officials, organizations, or historical figures, we require accurate attribution. Paraphrasing must not distort the meaning of the original. Translations must be faithful.',
      'We apply higher scrutiny to claims that conveniently support the dominant narrative — claims that align with Western government positions, NGO talking points, or the Ethiopian state\'s official account. This is not bias; it is a correction for the structural bias that already exists in the information environment.',
    ],
  },
  {
    id: 'political',
    title: 'III. Political Line',
    content: [
      'Abyot operates from a Marxist-Leninist framework. We believe that class analysis is indispensable to understanding politics, economics, history, and society. This does not mean we reduce everything to economics — it means we take material conditions seriously.',
      'We support the right of nations and peoples to self-determination, including the right to armed resistance against occupation and colonial domination. We do not demand that oppressed peoples choose only those forms of resistance that are acceptable to their oppressors.',
      'We are anti-imperialist. We recognize imperialism as a stage of capitalism, not a foreign policy choice that individual states make and could unmake. We analyze U.S., European, Chinese, Gulf, and other forms of imperialism on their structural merits, not on the basis of who is labeled "friend" or "enemy" in Washington.',
      'We do not publish content that promotes ethnic chauvinism, religious sectarianism, or any ideology whose primary function is to divide the working class and peasantry against itself. The national question in Ethiopia is a legitimate and important question — but its analysis must be grounded in class and not weaponized for ethnic mobilization.',
    ],
  },
  {
    id: 'submission',
    title: 'IV. Submission Requirements',
    content: [
      'All submitted pieces must be original work, not published elsewhere or under consideration at another publication without our explicit knowledge.',
      'Submitted articles should typically be between 800 and 4,000 words. Exceptions are made for long-form historical essays and theory pieces. Op-eds and letters run shorter.',
      'Authors must disclose any financial, organizational, or political relationships that are relevant to the subject of their piece. We do not prohibit political affiliation — we require transparency about it.',
      'We accept submissions in English and Amharic. We have the capacity to translate from Amharic to English. If you are writing in another Ethiopian language, contact us first.',
      'Pitches should include a 2–3 paragraph description of the argument, the evidence base, and why it belongs in Abyot. Full submissions should include a brief cover note.',
    ],
  },
  {
    id: 'process',
    title: 'V. Editorial Process',
    content: [
      'All submissions are reviewed by at least one editor before publication. We may request revisions, including significant structural changes, additions of evidence, or modification of framing.',
      'We do not change an author\'s political line without their consent. We will flag passages we believe are factually incorrect, overstated, or analytically weak. The final decision on revisions belongs to the author — but we reserve the right not to publish pieces that we cannot stand behind.',
      'We aim to respond to pitches within 10 business days and full submissions within 21 days. If you have not heard from us after that period, you may follow up once before assuming we are passing.',
      'We do not pay contributors at this time. We are a non-commercial publication. If and when we develop revenue, contributors will be the first to benefit.',
    ],
  },
  {
    id: 'corrections',
    title: 'VI. Corrections Policy',
    content: [
      'We correct factual errors promptly and transparently. Corrections are noted at the top of the affected article with the date and nature of the correction.',
      'We do not retroactively change the political framing or analysis of published pieces except in cases of factual error. If our editorial line evolves, we say so openly.',
      'Readers who believe an article contains errors should contact us with specific, documented objections. We will review and respond. We will not engage with complaints that consist solely of disagreement with our political line.',
    ],
  },
];

export default function Guidelines() {
  useDocumentTitle('Editorial Rules & Guidelines');

  return (
    <>
      <MetaTags
        title="Editorial Rules & Guidelines"
        description="Abyot's editorial standards, political line, submission requirements, and corrections policy."
      />
      <div className="bg-abyot-paper min-h-screen">

        {/* Header */}
        <div className="bg-abyot-black text-white py-14 border-b-4 border-abyot-red">
          <div className="max-w-editorial mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-abyot-red" />
              <span className="font-mono text-label uppercase tracking-widest text-white/50">Publication</span>
            </div>
            <h1 className="font-display text-headline-xl text-white font-bold mb-4">
              Editorial Rules & Guidelines
            </h1>
            <p className="font-body text-body-lg text-white/60 max-w-2xl leading-relaxed">
              These guidelines govern what we publish, how we analyze, and what we expect from contributors. They are not bureaucratic rules — they are the articulation of our politics in the realm of publishing.
            </p>
          </div>
        </div>

        {/* TOC + Content */}
        <div className="max-w-editorial mx-auto px-4 sm:px-6 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">

            {/* Table of contents (sticky sidebar) */}
            <aside className="order-2 lg:order-1 space-y-8">
              <div className="border border-abyot-rule p-5 lg:sticky lg:top-24">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-4 bg-abyot-red" />
                  <h3 className="font-mono text-label uppercase tracking-widest text-abyot-black">Contents</h3>
                </div>
                <nav className="space-y-2">
                  {SECTIONS.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="flex items-center gap-2 font-body text-body-sm text-abyot-slate hover:text-abyot-red transition-colors py-1"
                    >
                      <ArrowRight size={11} className="text-abyot-slate-light flex-shrink-0" />
                      {section.title}
                    </a>
                  ))}
                </nav>
              </div>

              <SocialPromo adId="ad_submissions" />
              <SocialPromo adId="ad_telegram_channel" />
            </aside>

            {/* Main content */}
            <main className="lg:col-span-2 order-1 lg:order-2">
              <div className="space-y-12">
                {SECTIONS.map((section, sectionIdx) => (
                  <section key={section.id} id={section.id}>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-1 h-6 bg-abyot-red flex-shrink-0" />
                      <h2 className="font-display text-headline-md text-abyot-black font-bold">
                        {section.title}
                      </h2>
                    </div>
                    <div className="space-y-4">
                      {section.content.map((para, paraIdx) => (
                        <p key={paraIdx} className="font-body text-body-lg text-abyot-black leading-[1.8]">
                          {para}
                        </p>
                      ))}
                    </div>
                    {sectionIdx < SECTIONS.length - 1 && (
                      <div className="mt-10 flex items-center gap-4">
                        <div className="flex-1 h-px bg-abyot-rule" />
                        <div className="w-1.5 h-1.5 bg-abyot-red rounded-full" />
                        <div className="flex-1 h-px bg-abyot-rule" />
                      </div>
                    )}
                  </section>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-14 p-8 bg-abyot-black text-white">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-4 bg-abyot-red" />
                  <span className="font-mono text-label uppercase tracking-widest text-white/50">Ready to contribute?</span>
                </div>
                <h3 className="font-display text-headline-sm text-white font-bold mb-2">
                  Submit Your Pitch or Article
                </h3>
                <p className="font-body text-body-sm text-white/60 mb-5 max-w-lg">
                  If you've read these guidelines and believe your work belongs in Abyot, we want to hear from you.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-abyot-red hover:bg-abyot-red-dark text-white font-mono text-label uppercase tracking-widest px-5 py-3 transition-colors"
                >
                  Contact & Submissions <ArrowRight size={14} />
                </Link>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
