export interface Author {
  name: string;
  bio: string;
  avatar: string;
  role: string;
}

export interface CoverImage {
  url: string;
  caption: string;
  credit: string;
}

export type ContentBlock =
  | { type: 'lede'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'blockquote'; text: string; attribution?: string }
  | { type: 'html'; html: string }
  | { type: 'image'; url: string; caption?: string; credit?: string }
  | { type: 'divider' };

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  author: Author;
  publishDate: string;
  updatedDate: string | null;
  readTime: string;
  coverImage: CoverImage;
  category: string;
  genre: string;
  tags: string[];
  featured: boolean;
  breaking: boolean;
  editors_pick: boolean;
  content: ContentBlock[];
}

export interface Social {
  id: string;
  platform: string;
  handle: string;
  url: string;
  icon: string;
  color: string;
  description: string;
  cta: string;
}

export interface Ad {
  id: string;
  type: string;
  platform: string;
  headline: string;
  body: string;
  cta: string;
  url: string;
  icon: string;
  accentColor: string;
  label: string;
}

export interface Annotation {
  id: string;
  slug: string;
  selectedText: string;
  note: string;
  createdAt: string;
  color: string;
}
