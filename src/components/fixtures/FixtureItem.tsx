import { Badge } from '../common';
import { FixtureResult, FixtureUpcoming } from '../../types';

interface FixtureResultItemProps {
  fixture: FixtureResult;
  onClick?: () => void;
}

interface FixtureUpcomingItemProps {
  fixture: FixtureUpcoming;
}

export function FixtureResultItem({ fixture, onClick }: FixtureResultItemProps) {
  const date = new Date(fixture.date).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });

  const isWon = fixture.result.startsWith('Won');

  // Category color mapping
  const categoryColors: Record<string, string> = {
    league: 'bg-blue-100 text-blue-700',
    tournament: 'bg-purple-100 text-purple-700',
    cup: 'bg-amber-100 text-amber-700',
    friendly: 'bg-green-100 text-green-700'
  };

  const categoryLabels: Record<string, string> = {
    league: 'League',
    tournament: 'Tournament',
    cup: 'Cup',
    friendly: 'Friendly'
  };

  return (
    <div
      onClick={onClick}
      className="bg-cream rounded-xl p-5 mb-4 border border-gray-200 flex justify-between items-center flex-wrap gap-4 hover:shadow-lg hover:border-cricket-green/30 transition-all cursor-pointer group"
    >
      <div className="flex-1">
        <div className="flex gap-2 mb-2 flex-wrap">
          <Badge variant={fixture.isHome ? 'home' : 'away'}>
            {fixture.isHome ? 'HOME' : 'AWAY'}
          </Badge>
          <Badge variant="away">{date}</Badge>
          {fixture.matchCategory && (
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${categoryColors[fixture.matchCategory] || 'bg-gray-100 text-gray-600'}`}>
              {categoryLabels[fixture.matchCategory] || fixture.matchCategory}
            </span>
          )}
          {fixture.matchStage && (
            <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-purple-100 text-purple-700 capitalize">
              {fixture.matchStage.replace('-', ' ')}
            </span>
          )}
        </div>
        <div className="font-headline text-lg font-semibold mb-1">
          Badger CC vs {fixture.opponent}
        </div>
        <div className="text-sm text-gray-600">📍 {fixture.venue}</div>
        {fixture.tournamentName && (
          <div className="text-xs text-purple-600 mt-1">🏆 {fixture.tournamentName}</div>
        )}
      </div>

      <div className="text-right">
        <Badge variant={isWon ? 'won' : 'lost'} className="rounded-full px-3">
          {isWon ? 'WON' : 'LOST'}
        </Badge>
        <div className="text-xs text-gray-500 mt-1">{fixture.result}</div>
        <div className="text-xs text-gray-500">{fixture.scores}</div>
        <div className="text-xs text-cricket-green mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          Click to view scorecard →
        </div>
      </div>
    </div>
  );
}

export function FixtureUpcomingItem({ fixture }: FixtureUpcomingItemProps) {
  const date = new Date(fixture.date).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });

  // Category color mapping
  const categoryColors: Record<string, string> = {
    league: 'bg-blue-100 text-blue-700',
    tournament: 'bg-purple-100 text-purple-700',
    cup: 'bg-amber-100 text-amber-700',
    friendly: 'bg-green-100 text-green-700'
  };

  const categoryLabels: Record<string, string> = {
    league: 'League',
    tournament: 'Tournament',
    cup: 'Cup',
    friendly: 'Friendly'
  };

  return (
    <div className="bg-cream rounded-xl p-5 mb-4 border border-gray-200 flex justify-between items-center flex-wrap gap-4 hover:shadow-md transition-shadow">
      <div className="flex-1">
        <div className="flex gap-2 mb-2 flex-wrap">
          <Badge variant={fixture.isHome ? 'home' : 'away'}>
            {fixture.isHome ? 'HOME' : 'AWAY'}
          </Badge>
          <Badge variant="away">{date}</Badge>
          {fixture.matchCategory && (
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${categoryColors[fixture.matchCategory] || 'bg-gray-100 text-gray-600'}`}>
              {categoryLabels[fixture.matchCategory] || fixture.matchCategory}
            </span>
          )}
          {fixture.matchStage && (
            <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-purple-100 text-purple-700 capitalize">
              {fixture.matchStage.replace('-', ' ')}
            </span>
          )}
        </div>
        <div className="font-headline text-lg font-semibold mb-1">
          Badger CC vs {fixture.opponent}
        </div>
        <div className="text-sm text-gray-600">📍 {fixture.venue}</div>
        {fixture.tournamentName && (
          <div className="text-xs text-purple-600 mt-1">🏆 {fixture.tournamentName}</div>
        )}
      </div>

      <div className="text-right">
        <div className="text-2xl font-bold text-cricket-green">{fixture.time}</div>
        <div className="text-xs text-gray-500">Start Time</div>
      </div>
    </div>
  );
}
