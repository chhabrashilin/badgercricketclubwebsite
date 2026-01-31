interface ClawScratchProps {
  className?: string;
  color?: string;
  accentColor?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  direction?: 'left' | 'right';
}

export function ClawScratch({
  className = '',
  color = '#1a1a1a',
  accentColor = '#C5050C',
  size = 'md',
  direction = 'right'
}: ClawScratchProps) {
  const sizeClasses = {
    sm: 'w-6 h-10',
    md: 'w-10 h-16',
    lg: 'w-16 h-24',
    xl: 'w-24 h-36'
  };

  const transform = direction === 'left' ? 'scale(-1, 1)' : '';

  return (
    <svg
      viewBox="0 0 50 80"
      className={`${sizeClasses[size]} ${className}`}
      style={{ transform }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Three bold claw slash marks */}

      {/* Slash 1 - Left */}
      <path
        d="M5 0
           C 3 5, 1 12, 0 20
           C -1 32, 1 44, 0 56
           C -1 66, 1 74, 0 80
           L 6 79
           C 7 72, 5 64, 6 54
           C 7 42, 5 30, 6 18
           C 7 10, 6 4, 10 0
           Z"
        fill={color}
      />
      {/* Inner slash highlight */}
      <path
        d="M3 4 C 2 20, 1 40, 1 60 C 1 70, 2 75, 1 78"
        stroke={accentColor}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Slash 2 - Center (widest) */}
      <path
        d="M22 0
           C 18 8, 15 18, 14 30
           C 13 44, 16 58, 14 70
           L 13 80
           L 28 78
           C 30 66, 27 52, 28 38
           C 29 24, 27 12, 32 0
           Z"
        fill={color}
      />
      {/* Inner slash highlight */}
      <path
        d="M19 5 C 17 25, 15 45, 15 65 C 15 72, 16 76, 15 78"
        stroke={accentColor}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Secondary highlight */}
      <path
        d="M26 6 C 25 30, 24 55, 25 75"
        stroke={accentColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />

      {/* Slash 3 - Right */}
      <path
        d="M42 0
           C 40 6, 38 14, 37 24
           C 36 38, 38 52, 37 66
           C 36 72, 38 76, 37 80
           L 45 79
           C 46 72, 44 62, 45 50
           C 46 36, 44 22, 46 10
           C 47 4, 46 2, 50 0
           Z"
        fill={color}
      />
      {/* Inner slash highlight */}
      <path
        d="M40 5 C 38 22, 37 42, 38 62 C 38 70, 38 75, 38 78"
        stroke={accentColor}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
