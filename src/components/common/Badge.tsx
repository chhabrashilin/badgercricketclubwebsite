import { memo, ReactNode } from 'react';

interface BadgeProps {
  variant?: 'home' | 'away' | 'won' | 'lost' | 'admin' | 'viewer' | 'live' | 'date';
  children: ReactNode;
  className?: string;
}

const variantClasses = {
  home: 'bg-cricket-green text-cream',
  away: 'bg-blue-100 text-blue-800',
  date: 'bg-gray-200 text-badger-black',
  won: 'bg-green-100 text-green-800',
  lost: 'bg-red-100 text-red-800',
  admin: 'bg-gold text-cricket-green-dark',
  viewer: 'bg-white/20 text-white',
  live: 'bg-red-500 text-white'
} as const;

export const Badge = memo(function Badge({
  variant = 'away',
  children,
  className = ''
}: BadgeProps) {
  return (
    <span
      className={`text-xs px-2 py-1 rounded font-semibold uppercase tracking-wide ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
});
