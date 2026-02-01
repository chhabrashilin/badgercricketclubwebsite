import { useData } from '../../context/DataContext';

export function QuickStats() {
  const { seasonOverview } = useData();

  return (
    <div className="bg-cricket-green rounded-xl p-6 text-cream">
      <h3 className="font-headline text-gold text-xl mb-4">Season Overview</h3>

      {seasonOverview.map((stat, index) => (
        <div
          key={`${stat.label}-${index}`}
          className={`flex justify-between py-3 ${
            index < seasonOverview.length - 1 ? 'border-b border-white/10' : ''
          }`}
        >
          <span className="opacity-80">{stat.label}</span>
          <span className="text-xl font-bold">{stat.value}</span>
        </div>
      ))}
    </div>
  );
}
