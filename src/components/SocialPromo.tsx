import { Send, Youtube, Twitter, Mail, Newspaper, PlayCircle, PenLine, ArrowRight } from 'lucide-react';
import { Ad } from '../types';
import adsData from '../data/ads.json';

const ICON_MAP: Record<string, React.ElementType> = {
  send: Send,
  youtube: Youtube,
  twitter: Twitter,
  mail: Mail,
  newspaper: Newspaper,
  'play-circle': PlayCircle,
  'pen-line': PenLine,
};

interface SocialPromoProps {
  adId: string;
  compact?: boolean;
}

export default function SocialPromo({ adId, compact = false }: SocialPromoProps) {
  const ad = (adsData.ads as Ad[]).find((a) => a.id === adId);
  if (!ad) return null;

  const Icon = ICON_MAP[ad.icon] ?? Send;
  const isInternal = ad.url.startsWith('/');

  const linkProps = isInternal
    ? { href: undefined }
    : { href: ad.url, target: '_blank', rel: 'noopener noreferrer' };

  if (compact) {
    return (
      <a
        {...linkProps}
        href={isInternal ? undefined : ad.url}
        className="flex items-center gap-3 p-3 border border-abyot-rule hover:border-abyot-red/40 group transition-colors cursor-pointer"
        onClick={isInternal ? (e) => { e.preventDefault(); window.location.href = ad.url; } : undefined}
      >
        <div
          className="w-7 h-7 flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: ad.accentColor + '18', color: ad.accentColor }}
        >
          <Icon size={14} />
        </div>
        <div className="flex-1 min-w-0">
          <span className="font-mono text-label uppercase tracking-widest text-abyot-slate-light block">
            {ad.label}
          </span>
          <span className="font-display text-abyot-black text-body-sm font-semibold group-hover:text-abyot-red transition-colors">
            {ad.headline}
          </span>
        </div>
        <ArrowRight size={14} className="text-abyot-slate-light group-hover:text-abyot-red transition-colors flex-shrink-0" />
      </a>
    );
  }

  return (
    <div className="border-l-2 pl-4 py-3" style={{ borderColor: ad.accentColor }}>
      <span className="font-mono text-label uppercase tracking-widest block mb-1.5" style={{ color: ad.accentColor }}>
        {ad.label}
      </span>
      <div className="flex items-start gap-3">
        <div
          className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ backgroundColor: ad.accentColor + '18', color: ad.accentColor }}
        >
          <Icon size={16} />
        </div>
        <div>
          <h4 className="font-display text-abyot-black font-bold text-body-md leading-snug mb-1">
            {ad.headline}
          </h4>
          <p className="font-body text-abyot-slate text-body-sm mb-2 leading-relaxed">
            {ad.body}
          </p>
          <a
            href={isInternal ? undefined : ad.url}
            onClick={isInternal ? (e) => { e.preventDefault(); window.location.href = ad.url; } : undefined}
            target={isInternal ? undefined : '_blank'}
            rel={isInternal ? undefined : 'noopener noreferrer'}
            className="inline-flex items-center gap-1.5 font-mono text-label uppercase tracking-widest transition-colors hover:opacity-70"
            style={{ color: ad.accentColor }}
          >
            {ad.cta}
            <ArrowRight size={11} />
          </a>
        </div>
      </div>
    </div>
  );
}

// A strip of compact promos
export function SocialPromoStrip({ ids }: { ids: string[] }) {
  return (
    <div className="grid grid-cols-1 gap-2">
      {ids.map((id) => (
        <SocialPromo key={id} adId={id} compact />
      ))}
    </div>
  );
}
