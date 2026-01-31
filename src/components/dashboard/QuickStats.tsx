export function QuickStats() {
  const stats = [
    { label: 'Matches Played', value: '6' },
    { label: 'Wins', value: '4' },
    { label: 'Win Rate', value: '66%' },
    { label: 'League Position', value: '2nd' }
  ];

  return (
    <div className="bg-cricket-green rounded-xl p-6 text-cream">
      <h3 className="font-headline text-gold text-xl mb-4">Season Overview</h3>

      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`flex justify-between py-3 ${
            index < stats.length - 1 ? 'border-b border-white/10' : ''
          }`}
        >
          <span className="opacity-80">{stat.label}</span>
          <span className="text-xl font-bold">{stat.value}</span>
        </div>
      ))}
    </div>
  );
}
