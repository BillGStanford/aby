export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '…';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export const CATEGORY_COLORS: Record<string, string> = {
  Analysis:   '#B91C1C',
  History:    '#7C3AED',
  Politics:   '#1D4ED8',
  Geopolitics:'#065F46',
  Economy:    '#B45309',
  Theory:     '#831843',
  Society:    '#0F766E',
  Opinion:    '#374151',
};

export function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] ?? '#374151';
}
