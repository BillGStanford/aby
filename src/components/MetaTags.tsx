import { useEffect } from 'react';
import { Article } from '../types';

interface MetaTagsProps {
  article?: Article;
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function MetaTags({ article, title, description, image, url }: MetaTagsProps) {
  useEffect(() => {
    const BASE_URL = 'https://abyot.press';
    const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80';

    const ogTitle = article?.title ?? title ?? 'Abyot | አብዮት — Revolutionary Analysis';
    const ogDesc = article?.subtitle ?? description ?? 'Vanguard publication for Marxist-Leninist analysis, anti-imperialist critique, and Ethiopian political discourse.';
    const ogImage = article?.coverImage.url ?? image ?? DEFAULT_IMAGE;
    const ogUrl = article ? `${BASE_URL}/article/${article.slug}` : (url ?? BASE_URL);

    const setMeta = (property: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const setMetaName = (name: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('og:title', ogTitle);
    setMeta('og:description', ogDesc);
    setMeta('og:image', ogImage);
    setMeta('og:url', ogUrl);
    setMeta('og:type', article ? 'article' : 'website');

    setMetaName('twitter:title', ogTitle);
    setMetaName('twitter:description', ogDesc);
    setMetaName('twitter:image', ogImage);
    setMetaName('description', ogDesc);

    if (article) {
      setMeta('article:published_time', article.publishDate);
      setMeta('article:author', article.author.name);
      setMeta('article:section', article.category);
    }

    return () => {
      // Reset to defaults on unmount
      setMeta('og:title', 'Abyot | አብዮት — Revolutionary Analysis');
      setMeta('og:description', 'Vanguard publication for Marxist-Leninist analysis, anti-imperialist critique, and Ethiopian political discourse.');
      setMeta('og:image', DEFAULT_IMAGE);
      setMeta('og:url', BASE_URL);
      setMeta('og:type', 'website');
    };
  }, [article, title, description, image, url]);

  return null;
}
