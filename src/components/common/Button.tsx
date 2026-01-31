import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'ghost';
  children: ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseClasses = 'px-6 py-3 rounded-md font-semibold cursor-pointer text-base transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-gold text-cricket-green-dark',
    secondary: 'bg-transparent text-cream border-2 border-white/50',
    gold: 'bg-gold text-cricket-green-dark',
    ghost: 'bg-transparent text-cream hover:text-gold'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
