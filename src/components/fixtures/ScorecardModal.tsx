import { Modal, MapPinIcon, TrophyIcon } from '../common';
import { FixtureResult } from '../../types';

interface ScorecardModalProps {
  isOpen: boolean;
  onClose: () => void;
  fixture: FixtureResult | null;
}

export function ScorecardModal({ isOpen, onClose, fixture }: ScorecardModalProps) {
  if (!fixture) return null;

  const isWon = fixture.result.startsWith('Won');
  const [homeScore, awayScore] = fixture.scores.split(' vs ');

  // Parse scores (e.g., "267/6" -> { runs: 267, wickets: 6 })
  const parseScore = (score: string) => {
    const match = score.match(/(\d+)(?:\/(\d+)|( all out))?/);
    if (match) {
      return {
        runs: parseInt(match[1]),
        wickets: match[3] ? 10 : (match[2] ? parseInt(match[2]) : 0),
        allOut: !!match[3]
      };
    }
    return { runs: 0, wickets: 0, allOut: false };
  };

  // Use detailed scores if available, otherwise parse from string
  const home = fixture.homeRuns !== undefined
    ? { runs: fixture.homeRuns, wickets: fixture.homeWickets || 0, allOut: fixture.homeWickets === 10 }
    : parseScore(homeScore);

  const away = fixture.awayRuns !== undefined
    ? { runs: fixture.awayRuns, wickets: fixture.awayWickets || 0, allOut: fixture.awayWickets === 10 }
    : parseScore(awayScore);

  // Calculate run rates
  const homeRunRate = fixture.homeOvers && fixture.homeOvers > 0
    ? ((fixture.homeRuns || home.runs) / fixture.homeOvers).toFixed(2)
    : null;
  const awayRunRate = fixture.awayOvers && fixture.awayOvers > 0
    ? ((fixture.awayRuns || away.runs) / fixture.awayOvers).toFixed(2)
    : null;

  const date = new Date(fixture.date).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Format match category label
  const getCategoryLabel = () => {
    if (!fixture.matchCategory) return null;
    const labels: Record<string, string> = {
      league: 'League Match',
      tournament: 'Tournament',
      cup: 'Cup Match',
      friendly: 'Friendly'
    };
    return labels[fixture.matchCategory] || fixture.matchCategory;
  };

  // Format stage label
  const getStageLabel = () => {
    if (!fixture.matchStage) return null;
    const labels: Record<string, string> = {
      group: 'Group Stage',
      'round-robin': 'Round Robin',
      'quarter-final': 'Quarter Final',
      'semi-final': 'Semi Final',
      final: 'Final'
    };
    return labels[fixture.matchStage] || fixture.matchStage;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center mb-6">
        {/* Match Category Badges */}
        <div className="flex justify-center gap-2 mb-3">
          {getCategoryLabel() && (
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 capitalize">
              {getCategoryLabel()}
            </span>
          )}
          {getStageLabel() && (
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
              {getStageLabel()}
            </span>
          )}
        </div>

        {/* Tournament Name */}
        {fixture.tournamentName && (
          <p className="text-sm font-medium text-purple-600 mb-2">{fixture.tournamentName}</p>
        )}

        <span className={`inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4 ${isWon ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
          {isWon ? 'VICTORY' : 'DEFEAT'}
        </span>
        <h2 className="font-headline text-2xl text-badger-black">
          Badger CC vs {fixture.opponent}
        </h2>
        <p className="text-gray-500 text-sm mt-1">{date}</p>
        <p className="text-gray-500 text-sm flex items-center justify-center gap-1"><MapPinIcon size={12} /> {fixture.venue}</p>
      </div>

      {/* Scorecard */}
      <div className="bg-cream-dark rounded-lg p-4 mb-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Badger CC */}
          <div className={`text-center p-4 rounded-lg ${fixture.isHome ? 'bg-cricket-green text-cream' : 'bg-white'}`}>
            <p className="text-xs uppercase tracking-wider opacity-70 mb-1">
              {fixture.isHome ? 'HOME' : 'AWAY'}
            </p>
            <h3 className="font-headline text-lg mb-2">Badger CC</h3>
            <p className="text-3xl font-bold">
              {home.runs}{home.allOut ? '' : `/${home.wickets}`}
            </p>
            {home.allOut && <p className="text-xs opacity-70">all out</p>}
            {fixture.homeOvers && (
              <p className="text-sm opacity-80 mt-1">({fixture.homeOvers} overs)</p>
            )}
            {homeRunRate && (
              <p className="text-xs opacity-70 mt-1">RR: {homeRunRate}</p>
            )}
          </div>

          {/* Opponent */}
          <div className={`text-center p-4 rounded-lg ${!fixture.isHome ? 'bg-gray-700 text-cream' : 'bg-white'}`}>
            <p className="text-xs uppercase tracking-wider opacity-70 mb-1">
              {!fixture.isHome ? 'HOME' : 'AWAY'}
            </p>
            <h3 className="font-headline text-lg mb-2">{fixture.opponent}</h3>
            <p className="text-3xl font-bold">
              {away.runs}{away.allOut ? '' : `/${away.wickets}`}
            </p>
            {away.allOut && <p className="text-xs opacity-70">all out</p>}
            {fixture.awayOvers && (
              <p className="text-sm opacity-80 mt-1">({fixture.awayOvers} overs)</p>
            )}
            {awayRunRate && (
              <p className="text-xs opacity-70 mt-1">RR: {awayRunRate}</p>
            )}
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="text-center py-4 border-t border-gray-200">
        <p className="text-lg font-semibold text-badger-black">{fixture.result}</p>
        <p className="text-sm text-gray-500 mt-2">
          {isWon ? <><TrophyIcon size={16} className="inline" /> Another great win for the Badgers!</> : 'Better luck next time!'}
        </p>
      </div>

      {/* Match Stats */}
      <div className="bg-gray-50 rounded-lg p-4 mt-4">
        <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-600 mb-3">
          Match Statistics
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-cricket-green">{Math.abs(home.runs - away.runs)}</p>
            <p className="text-xs text-gray-500">Run Difference</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-cricket-green">{home.wickets + away.wickets}</p>
            <p className="text-xs text-gray-500">Total Wickets</p>
          </div>
          {homeRunRate && (
            <div>
              <p className="text-2xl font-bold text-cricket-green">{homeRunRate}</p>
              <p className="text-xs text-gray-500">Badger RR</p>
            </div>
          )}
          {awayRunRate && (
            <div>
              <p className="text-2xl font-bold text-cricket-green">{awayRunRate}</p>
              <p className="text-xs text-gray-500">{fixture.opponent} RR</p>
            </div>
          )}
          {!homeRunRate && !awayRunRate && (
            <div className="col-span-2">
              <p className="text-2xl font-bold text-cricket-green">{home.runs + away.runs}</p>
              <p className="text-xs text-gray-500">Total Runs</p>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={onClose}
        className="w-full mt-6 py-3 bg-cricket-green text-cream rounded-lg font-semibold hover:opacity-90 transition-opacity"
      >
        Close
      </button>
    </Modal>
  );
}
