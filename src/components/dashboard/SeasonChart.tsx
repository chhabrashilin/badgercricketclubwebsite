import { memo, useMemo } from 'react';
import { chartData } from '../../data/fixtures';

interface ChartBarProps {
  runs: number;
  opponent: string;
  maxRuns: number;
}

const ChartBar = memo(function ChartBar({ runs, opponent, maxRuns }: ChartBarProps) {
  const height = (runs / maxRuns) * 100;

  return (
    <div className="flex-1 flex flex-col items-center">
      <span className="text-xs font-semibold text-cricket-green mb-1">{runs}</span>
      <div
        className="w-full bg-gradient-to-t from-cricket-green to-cricket-green-light rounded-t"
        style={{ height: `${height}%` }}
      />
      <span className="text-xs text-gray-500 mt-1">vs {opponent}</span>
    </div>
  );
});

export const SeasonChart = memo(function SeasonChart() {
  const stats = useMemo(() => {
    const maxRuns = Math.max(...chartData.map((d) => d.runs));
    const totalRuns = chartData.reduce((sum, d) => sum + d.runs, 0);
    const avgPerMatch = (totalRuns / chartData.length).toFixed(1);
    return { maxRuns, totalRuns, avgPerMatch };
  }, []);

  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 mt-6">
      <div className="mb-4">
        <div className="text-cricket-green text-xs uppercase tracking-wider">Season Stats</div>
        <div className="font-headline text-xl">Runs Scored Per Match</div>
      </div>

      {/* Chart */}
      <div className="h-[200px] flex items-end gap-2 py-4">
        {chartData.map((data) => (
          <ChartBar
            key={data.opponent}
            runs={data.runs}
            opponent={data.opponent}
            maxRuns={stats.maxRuns}
          />
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-8 pt-4 border-t border-gray-100 text-center">
        <div>
          <div className="text-2xl font-bold text-cricket-green">{stats.totalRuns.toLocaleString()}</div>
          <div className="text-xs uppercase text-gray-500">Total Runs</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-cricket-green">{stats.avgPerMatch}</div>
          <div className="text-xs uppercase text-gray-500">Avg / Match</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-cricket-green">5.12</div>
          <div className="text-xs uppercase text-gray-500">Avg Run Rate</div>
        </div>
      </div>
    </div>
  );
});
