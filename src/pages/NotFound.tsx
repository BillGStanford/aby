import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function NotFound() {
  useDocumentTitle('404 — Page Not Found');

  return (
    <div className="bg-abyot-paper min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-1 h-16 bg-abyot-red" />
          <span className="font-display text-abyot-black font-bold" style={{ fontSize: '6rem', lineHeight: 1 }}>
            404
          </span>
        </div>
        <h1 className="font-display text-headline-md text-abyot-black font-bold mb-3">
          This page does not exist
        </h1>
        <p className="font-body text-body-md text-abyot-slate mb-8 leading-relaxed">
          The article or page you are looking for has either been moved, removed, or never existed. The revolution does not leave loose ends — but sometimes URLs do.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            to="/"
            className="bg-abyot-red hover:bg-abyot-red-dark text-white font-mono text-label uppercase tracking-widest px-6 py-3 transition-colors"
          >
            Return to Abyot
          </Link>
          <Link
            to="/contact"
            className="border border-abyot-rule hover:border-abyot-red text-abyot-slate hover:text-abyot-red font-mono text-label uppercase tracking-widest px-6 py-3 transition-colors"
          >
            Report a Problem
          </Link>
        </div>
      </div>
    </div>
  );
}
