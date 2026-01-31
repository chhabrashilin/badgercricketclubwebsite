import { chartData } from '../../data/fixtures';

export function SeasonChart() {
  const maxRuns = Math.max(...chartData.map((d) => d.runs));
  const totalRuns = chartData.reduce((sum, d) => sum + d.runs, 0);
  const avgPerMatch = (totalRuns / chartData.length).toFixed(1);
  const avgRunRate = '5.12';

  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 mt-6">
      <div className="mb-4">
        <div className="text-cricket-green text-xs uppercase tracking-wider">Season Stats</div>
        <div className="font-headline text-xl">Runs Scored Per Match</div>
      </div>

      {/* Chart */}
      <div className="h-[200px] flex items-end gap-2 py-4">
        {chartData.map((data) => {
          const height = (data.runs / maxRuns) * 100;
          return (
            <div key={data.opponent} className="flex-1 flex flex-col items-center">
              <span className="text-xs font-semibold text-cricket-green mb-1">{data.runs}</span>
              <div
                className="w-full bg-gradient-to-t from-cricket-green to-cricket-green-light rounded-t"
                style={{ height: `${height}%` }}
              />
              <span className="text-xs text-gray-500 mt-1">vs {data.opponent}</span>
            </div>
          );
        })}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-8 pt-4 border-t border-gray-100 text-center">
        <div>
          <div className="text-2xl font-bold text-cricket-green">{totalRuns.toLocaleString()}</div>
          <div className="text-xs uppercase text-gray-500">Total Runs</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-cricket-green">{avgPerMatch}</div>
          <div className="text-xs uppercase text-gray-500">Avg / Match</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-cricket-green">{avgRunRate}</div>
          <div className="text-xs uppercase text-gray-500">Avg Run Rate</div>
        </div>
      </div>
    </div>
  );
}
