import { memo, useState, useCallback } from 'react';
import { useScore } from '../../context/ScoreContext';
import { ClawScratch } from '../common';

export const LiveScorecard = memo(function LiveScorecard() {
  const { matchScore, isLive, refreshScore, isLoading, lastUpdated } = useScore();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refreshScore();
    setTimeout(() => setIsRefreshing(false), 1000);
  }, [refreshScore]);

  return (
    <div id="matches" className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden relative">
      {/* Header */}
      <div className="bg-cricket-green text-cream px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {isLive && (
            <>
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse-dot" />
              <span className="font-semibold uppercase tracking-wider text-sm">Live</span>
              <span className="opacity-60 mx-2">|</span>
            </>
          )}
          <span className="opacity-80">{matchScore.matchType}</span>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="flex items-center gap-2 text-cream hover:text-gold transition-colors disabled:opacity-50"
        >
          <span className={isRefreshing ? 'animate-spin-once' : ''}>🔄</span>
          <span>Refresh</span>
        </button>
      </div>

      {/* Decorative claw scratch */}
      <ClawScratch
        className="absolute -right-4 top-16 opacity-5 rotate-6"
        size="lg"
        direction="left"
        color="#1a1a1a"
      />

      {/* Body */}
      <div className="p-6 relative z-10">
        {/* Teams Score */}
        <div className="grid grid-cols-2 gap-8 mb-6">
          {/* Home Team */}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Batting</p>
            <h3 className="font-headline text-2xl text-cricket-green mb-2">{matchScore.homeTeam}</h3>
            <div>
              <span className="text-4xl font-bold">
                {matchScore.homeRuns}/{matchScore.homeWickets}
              </span>
              <span className="text-gray-500 ml-2">({matchScore.homeOvers} ov)</span>
            </div>
          </div>

          {/* Away Team */}
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Bowling</p>
            <h3 className="font-headline text-2xl text-gray-600 mb-2">{matchScore.awayTeam}</h3>
            <div>
              <span className="text-4xl font-bold text-gray-400">
                {matchScore.awayRuns}/{matchScore.awayWickets}
              </span>
              <span className="text-gray-500 ml-2">({matchScore.awayOvers} ov)</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
          {/* At the Crease */}
          <div className="bg-cream-dark p-4 rounded-lg">
            <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">At the Crease</div>
            <div className="flex justify-between mb-1">
              <span className="font-medium">
                {matchScore.batsman1.name}{matchScore.batsman1.isStriker ? '*' : ''}
              </span>
              <span className="font-bold text-cricket-green">
                {matchScore.batsman1.runs} ({matchScore.batsman1.balls})
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">
                {matchScore.batsman2.name}{matchScore.batsman2.isStriker ? '*' : ''}
              </span>
              <span className="font-bold text-cricket-green">
                {matchScore.batsman2.runs} ({matchScore.batsman2.balls})
              </span>
            </div>
          </div>

          {/* Bowling */}
          <div className="bg-cream-dark p-4 rounded-lg">
            <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Bowling</div>
            <div className="flex justify-between">
              <span className="font-medium">{matchScore.bowler.name}</span>
              <span className="font-bold text-cricket-green">
                {matchScore.bowler.wickets}-{matchScore.bowler.runs} ({matchScore.bowler.overs})
              </span>
            </div>
          </div>

          {/* Match Info */}
          <div className="bg-cream-dark p-4 rounded-lg">
            <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Match Info</div>
            <div className="flex justify-between mb-1">
              <span>Run Rate</span>
              <span className="font-bold text-cricket-green">{matchScore.runRate}</span>
            </div>
            <div className="flex justify-between">
              <span>Partnership</span>
              <span className="font-bold text-cricket-green">{matchScore.partnership}</span>
            </div>
          </div>
        </div>

        {/* Last Wicket */}
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="text-xs uppercase text-red-600 mb-1">Last Wicket</div>
          <div className="text-sm text-red-800 font-medium">{matchScore.lastWicket}</div>
        </div>

        {/* Last Updated */}
        {lastUpdated && (
          <div className="mt-4 text-xs text-gray-400 text-right">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
});
