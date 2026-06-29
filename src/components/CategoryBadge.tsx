import { Link } from 'react-router-dom';
import { getCategoryColor } from '../utils';

interface CategoryBadgeProps {
  category: string;
  linkable?: boolean;
  className?: string;
}

export default function CategoryBadge({ category, linkable = false, className = '' }: CategoryBadgeProps) {
  const color = getCategoryColor(category);
  const baseClass = `font-mono text-label uppercase tracking-widest transition-opacity hover:opacity-70 ${className}`;

  if (linkable) {
    return (
      <Link
        to={`/category/${category.toLowerCase()}`}
        className={baseClass}
        style={{ color }}
      >
        {category}
      </Link>
    );
  }

  return (
    <span className={baseClass} style={{ color }}>
      {category}
    </span>
  );
}
