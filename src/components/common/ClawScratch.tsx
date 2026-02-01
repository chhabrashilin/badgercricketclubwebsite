import { memo } from 'react';

interface ClawScratchProps {
  className?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  direction?: 'left' | 'right';
}

export const ClawScratch = memo(function ClawScratch({
  className = '',
  color = '#C5050C',
  size = 'md',
  direction = 'right'
}: ClawScratchProps) {
  const sizeClasses = {
    sm: 'w-8 h-12',
    md: 'w-12 h-20',
    lg: 'w-20 h-32',
    xl: 'w-28 h-44'
  };

  const transform = direction === 'left' ? 'scaleX(-1)' : '';

  return (
    <svg
      viewBox="0 0 60 100"
      className={`${sizeClasses[size]} ${className}`}
      style={{ transform }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Gradient for depth effect */}
        <linearGradient id={`clawGradient-${direction}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.7" />
          <stop offset="50%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* Claw mark 1 - leftmost */}
      <path
        d="M8 2
           Q 4 15, 3 30
           Q 2 50, 4 70
           Q 5 85, 8 98
           L 12 97
           Q 10 82, 9 65
           Q 8 45, 10 28
           Q 12 12, 14 3
           Z"
        fill={`url(#clawGradient-${direction})`}
      />
      {/* Claw 1 inner shadow */}
      <path
        d="M9 8 Q 6 30, 6 55 Q 6 75, 9 92"
        stroke="rgba(0,0,0,0.3)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Claw mark 2 - center left */}
      <path
        d="M24 0
           Q 18 18, 17 40
           Q 16 62, 19 82
           Q 20 92, 24 100
           L 30 99
           Q 27 88, 25 75
           Q 23 55, 25 35
           Q 27 15, 32 2
           Z"
        fill={color}
      />
      {/* Claw 2 inner highlight */}
      <path
        d="M26 6 Q 21 35, 22 60 Q 23 80, 26 95"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Claw mark 3 - center right */}
      <path
        d="M40 0
           Q 34 20, 33 42
           Q 32 65, 35 85
           Q 36 94, 40 100
           L 46 99
           Q 43 90, 42 78
           Q 40 58, 42 38
           Q 44 18, 48 2
           Z"
        fill={color}
      />
      {/* Claw 3 inner shadow */}
      <path
        d="M42 5 Q 37 32, 37 58 Q 38 78, 42 94"
        stroke="rgba(0,0,0,0.25)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Claw mark 4 - rightmost */}
      <path
        d="M54 3
           Q 50 18, 49 35
           Q 48 55, 50 75
           Q 51 88, 54 98
           L 58 97
           Q 56 85, 55 70
           Q 54 50, 56 32
           Q 58 15, 60 4
           Z"
        fill={`url(#clawGradient-${direction})`}
      />
      {/* Claw 4 inner highlight */}
      <path
        d="M55 10 Q 52 35, 52 58 Q 53 78, 55 92"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
});
