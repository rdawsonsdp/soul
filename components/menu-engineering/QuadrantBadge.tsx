'use client';

import { type Quadrant, getQuadrantLabel, getQuadrantEmoji, getQuadrantColor } from '@/lib/menu-engineering';

interface QuadrantBadgeProps {
  quadrant: Quadrant | 'cross';
  size?: 'sm' | 'md';
  className?: string;
}

export default function QuadrantBadge({ quadrant, size = 'sm', className = '' }: QuadrantBadgeProps) {
  if (quadrant === 'cross') {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full font-semibold border ${
          size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
        } bg-purple-100 text-purple-800 border-purple-200 ${className}`}
      >
        Cross-Category
      </span>
    );
  }

  const color = getQuadrantColor(quadrant);
  const label = getQuadrantLabel(quadrant);
  const emoji = getQuadrantEmoji(quadrant);

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold border ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      } ${className}`}
      style={{
        backgroundColor: `${color}20`,
        color: quadrant === 'star' ? '#92750d' : quadrant === 'dog' ? '#6b7280' : color,
        borderColor: `${color}60`,
      }}
    >
      <span>{emoji}</span>
      {label}
    </span>
  );
}
