import React from 'react';

interface BadgeProps {
  variant?: 'default' | 'breakfast' | 'lunch' | 'snack' | 'success' | 'warning';
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  const variantStyles = {
    default: 'bg-[#dabb64]/30 text-[#363333] border border-[#dabb64]',
    breakfast: 'bg-[#dabb64]/20 text-[#363333] border border-[#dabb64]',
    lunch: 'bg-[#dabb64]/20 text-[#363333] border border-[#dabb64]',
    snack: 'bg-[#dabb64]/20 text-[#363333] border border-[#dabb64]',
    success: 'bg-green-100 text-green-800 border border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
