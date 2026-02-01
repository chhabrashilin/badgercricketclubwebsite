import { memo } from 'react';
import { useData } from '../../context/DataContext';

interface StatItemProps {
  label: string;
  value: string;
  isLast: boolean;
}

const StatItem = memo(function StatItem({ label, value, isLast }: StatItemProps) {
  return (
    <div className={`flex justify-between py-3 ${!isLast ? 'border-b border-white/10' : ''}`}>
      <span className="opacity-80">{label}</span>
      <span className="text-xl font-bold">{value}</span>
    </div>
  );
});

export const QuickStats = memo(function QuickStats() {
  const { seasonOverview } = useData();

  return (
    <div className="bg-cricket-green rounded-xl p-6 text-cream">
      <h3 className="font-headline text-gold text-xl mb-4">Season Overview</h3>

      {seasonOverview.map((stat, index) => (
        <StatItem
          key={`${stat.label}-${index}`}
          label={stat.label}
          value={stat.value}
          isLast={index === seasonOverview.length - 1}
        />
      ))}
    </div>
  );
});
