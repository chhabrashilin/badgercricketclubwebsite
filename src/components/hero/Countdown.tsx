import { memo, useCallback } from 'react';
import { useCountdown } from '../../hooks/useCountdown';

interface CountdownProps {
  targetDate: Date;
}

interface CountdownItemProps {
  value: string;
  label: string;
}

const CountdownItem = memo(function CountdownItem({ value, label }: CountdownItemProps) {
  return (
    <div className="bg-white/10 px-6 py-4 rounded-lg min-w-[80px]">
      <div className="font-headline text-4xl font-bold text-gold">{value}</div>
      <div className="text-xs uppercase tracking-wider opacity-70">{label}</div>
    </div>
  );
});

export const Countdown = memo(function Countdown({ targetDate }: CountdownProps) {
  const { days, hours, mins, secs } = useCountdown(targetDate);

  const formatNumber = useCallback((num: number) => String(num).padStart(2, '0'), []);

  return (
    <div className="flex justify-center gap-4 mb-8">
      <CountdownItem value={formatNumber(days)} label="Days" />
      <CountdownItem value={formatNumber(hours)} label="Hours" />
      <CountdownItem value={formatNumber(mins)} label="Mins" />
      <CountdownItem value={formatNumber(secs)} label="Secs" />
    </div>
  );
});
