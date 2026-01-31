import { useState, FormEvent, useEffect } from 'react';
import { Modal } from '../common';
import { useScore } from '../../context/ScoreContext';

interface EditMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EditMatchModal({ isOpen, onClose }: EditMatchModalProps) {
  const { matchScore, updateScore } = useScore();

  const [homeRuns, setHomeRuns] = useState(matchScore.homeRuns);
  const [homeWickets, setHomeWickets] = useState(matchScore.homeWickets);
  const [overs, setOvers] = useState(matchScore.homeOvers);
  const [runRate, setRunRate] = useState(matchScore.runRate);
  const [batsman1, setBatsman1] = useState(
    `${matchScore.batsman1.name}${matchScore.batsman1.isStriker ? '*' : ''} - ${matchScore.batsman1.runs} (${matchScore.batsman1.balls})`
  );
  const [batsman2, setBatsman2] = useState(
    `${matchScore.batsman2.name}${matchScore.batsman2.isStriker ? '*' : ''} - ${matchScore.batsman2.runs} (${matchScore.batsman2.balls})`
  );
  const [lastWicket, setLastWicket] = useState(matchScore.lastWicket);

  useEffect(() => {
    if (isOpen) {
      setHomeRuns(matchScore.homeRuns);
      setHomeWickets(matchScore.homeWickets);
      setOvers(matchScore.homeOvers);
      setRunRate(matchScore.runRate);
      setBatsman1(
        `${matchScore.batsman1.name}${matchScore.batsman1.isStriker ? '*' : ''} - ${matchScore.batsman1.runs} (${matchScore.batsman1.balls})`
      );
      setBatsman2(
        `${matchScore.batsman2.name}${matchScore.batsman2.isStriker ? '*' : ''} - ${matchScore.batsman2.runs} (${matchScore.batsman2.balls})`
      );
      setLastWicket(matchScore.lastWicket);
    }
  }, [isOpen, matchScore]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Parse batsman strings
    const parseBatsman = (str: string) => {
      const isStriker = str.includes('*');
      const cleanStr = str.replace('*', '');
      const match = cleanStr.match(/(.+)\s*-\s*(\d+)\s*\((\d+)\)/);
      if (match) {
        return {
          name: match[1].trim(),
          runs: parseInt(match[2]),
          balls: parseInt(match[3]),
          isStriker
        };
      }
      return null;
    };

    const bat1 = parseBatsman(batsman1);
    const bat2 = parseBatsman(batsman2);

    updateScore({
      homeRuns,
      homeWickets,
      homeOvers: overs,
      runRate,
      batsman1: bat1 || matchScore.batsman1,
      batsman2: bat2 || matchScore.batsman2,
      lastWicket
    });

    alert('Match details updated successfully!');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Live Score">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 font-medium text-gray-600 text-sm">Home Team Runs</label>
            <input
              type="number"
              value={homeRuns}
              onChange={(e) => setHomeRuns(parseInt(e.target.value) || 0)}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-cricket-green"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-600 text-sm">Home Team Wickets</label>
            <input
              type="number"
              value={homeWickets}
              onChange={(e) => setHomeWickets(parseInt(e.target.value) || 0)}
              min="0"
              max="10"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-cricket-green"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 font-medium text-gray-600 text-sm">Overs</label>
            <input
              type="text"
              value={overs}
              onChange={(e) => setOvers(e.target.value)}
              placeholder="e.g. 42.4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-cricket-green"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-600 text-sm">Run Rate</label>
            <input
              type="text"
              value={runRate}
              onChange={(e) => setRunRate(e.target.value)}
              placeholder="e.g. 5.74"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-cricket-green"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-600 text-sm">Batsman 1 (Name - Runs)</label>
          <input
            type="text"
            value={batsman1}
            onChange={(e) => setBatsman1(e.target.value)}
            placeholder="e.g. B. Brock* - 87 (96)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-cricket-green"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-600 text-sm">Batsman 2 (Name - Runs)</label>
          <input
            type="text"
            value={batsman2}
            onChange={(e) => setBatsman2(e.target.value)}
            placeholder="e.g. R. Digger - 34 (41)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-cricket-green"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-600 text-sm">Last Wicket</label>
          <input
            type="text"
            value={lastWicket}
            onChange={(e) => setLastWicket(e.target.value)}
            placeholder="e.g. H. Sett c. Jones b. Smith 52 (67)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-cricket-green"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-cricket-green text-white rounded-md font-semibold hover:opacity-90 transition-opacity"
        >
          Save Changes
        </button>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 bg-gray-100 text-gray-600 rounded-md font-semibold mt-2 hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
      </form>
    </Modal>
  );
}
