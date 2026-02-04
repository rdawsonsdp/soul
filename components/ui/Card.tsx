import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className = '', hover = true, onClick }: CardProps) {
  const hoverStyles = hover ? 'hover:shadow-xl transition-all duration-300' : '';
  const clickStyles = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={`bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 border border-gray-200 ${hoverStyles} ${clickStyles} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {children}
    </div>
  );
}
