import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useScore } from '../../context/ScoreContext';
import { useData } from '../../context/DataContext';
import { Modal } from '../common';
import { Player, FixtureResult, FixtureUpcoming } from '../../types';

interface AdminPanelProps {
  onEditScoreClick: () => void;
}

export function AdminPanel({ onEditScoreClick }: AdminPanelProps) {
  const { isAdmin } = useAuth();
  const { resetScore } = useScore();
  const { resetAllData, fixtureResults, fixtureUpcoming, players, deleteFixtureResult, deleteFixtureUpcoming, deletePlayer } = useData();

  const [activeModal, setActiveModal] = useState<'player' | 'result' | 'upcoming' | 'manage-results' | 'manage-fixtures' | 'manage-players' | null>(null);
  const [editingResult, setEditingResult] = useState<FixtureResult | null>(null);
  const [editingUpcoming, setEditingUpcoming] = useState<FixtureUpcoming | null>(null);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);

  if (!isAdmin) return null;

  const handleEditResult = (fixture: FixtureResult) => {
    setEditingResult(fixture);
    setActiveModal('result');
  };

  const handleEditUpcoming = (fixture: FixtureUpcoming) => {
    setEditingUpcoming(fixture);
    setActiveModal('upcoming');
  };

  const handleEditPlayer = (player: Player) => {
    setEditingPlayer(player);
    setActiveModal('player');
  };

  const handleDeleteResult = (date: string) => {
    if (confirm('Are you sure you want to delete this result?')) {
      deleteFixtureResult(date);
    }
  };

  const handleDeleteUpcoming = (date: string) => {
    if (confirm('Are you sure you want to delete this fixture?')) {
      deleteFixtureUpcoming(date);
    }
  };

  const handleDeletePlayer = (name: string) => {
    if (confirm('Are you sure you want to delete this player?')) {
      deletePlayer(name);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setEditingResult(null);
    setEditingUpcoming(null);
    setEditingPlayer(null);
  };

  const handleResetScore = () => {
    if (confirm('Reset score to default values?')) {
      resetScore();
      alert('Score reset to default!');
    }
  };

  const handleResetAllData = () => {
    if (confirm('Reset ALL data (players, fixtures) to defaults? This cannot be undone.')) {
      resetAllData();
      alert('All data reset to defaults!');
    }
  };

  return (
    <>
      <div className="bg-yellow-50 border border-yellow-400 rounded-lg p-4 mb-4">
        <h4 className="text-yellow-800 font-semibold mb-3 text-sm flex items-center gap-2">
          <span>⚙️</span> Admin Controls
        </h4>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
          <button
            onClick={onEditScoreClick}
            className="bg-cricket-green text-white px-3 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
          >
            ✏️ Edit Live Score
          </button>
          <button
            onClick={handleResetScore}
            className="bg-gray-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
          >
            🔄 Reset Score
          </button>
          <button
            onClick={() => { setEditingPlayer(null); setActiveModal('player'); }}
            className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
          >
            👤 Add Player
          </button>
          <button
            onClick={() => { setEditingResult(null); setActiveModal('result'); }}
            className="bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
          >
            📊 Add Result
          </button>
          <button
            onClick={() => { setEditingUpcoming(null); setActiveModal('upcoming'); }}
            className="bg-purple-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
          >
            📅 Add Fixture
          </button>
          <button
            onClick={handleResetAllData}
            className="bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
          >
            ⚠️ Reset All
          </button>
        </div>

        {/* Management Buttons */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-yellow-300">
          <button
            onClick={() => setActiveModal('manage-players')}
            className="bg-white text-blue-700 border border-blue-300 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors"
          >
            📋 Manage Players ({players.length})
          </button>
          <button
            onClick={() => setActiveModal('manage-results')}
            className="bg-white text-green-700 border border-green-300 px-3 py-2 rounded-md text-sm font-medium hover:bg-green-50 transition-colors"
          >
            📋 Manage Results ({fixtureResults.length})
          </button>
          <button
            onClick={() => setActiveModal('manage-fixtures')}
            className="bg-white text-purple-700 border border-purple-300 px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-50 transition-colors"
          >
            📋 Manage Fixtures ({fixtureUpcoming.length})
          </button>
        </div>
      </div>

      {/* Add/Edit Player Modal */}
      <AddPlayerModal
        isOpen={activeModal === 'player'}
        onClose={closeModal}
        editingPlayer={editingPlayer}
      />

      {/* Add/Edit Result Modal */}
      <AddResultModal
        isOpen={activeModal === 'result'}
        onClose={closeModal}
        editingFixture={editingResult}
      />

      {/* Add/Edit Upcoming Fixture Modal */}
      <AddUpcomingModal
        isOpen={activeModal === 'upcoming'}
        onClose={closeModal}
        editingFixture={editingUpcoming}
      />

      {/* Manage Players Modal */}
      <ManageListModal
        isOpen={activeModal === 'manage-players'}
        onClose={closeModal}
        title="Manage Players"
        items={players}
        renderItem={(player: Player) => (
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">{player.name}</p>
              <p className="text-sm text-gray-500">{player.role}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEditPlayer(player)}
                className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeletePlayer(player.name)}
                className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      />

      {/* Manage Results Modal */}
      <ManageListModal
        isOpen={activeModal === 'manage-results'}
        onClose={closeModal}
        title="Manage Match Results"
        items={fixtureResults}
        renderItem={(fixture: FixtureResult) => (
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">vs {fixture.opponent}</p>
              <p className="text-sm text-gray-500">{fixture.date} • {fixture.result}</p>
              {fixture.matchCategory && (
                <p className="text-xs text-gray-400 capitalize">
                  {fixture.matchCategory}{fixture.matchStage ? ` - ${fixture.matchStage}` : ''}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEditResult(fixture)}
                className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteResult(fixture.date)}
                className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      />

      {/* Manage Upcoming Fixtures Modal */}
      <ManageListModal
        isOpen={activeModal === 'manage-fixtures'}
        onClose={closeModal}
        title="Manage Upcoming Fixtures"
        items={fixtureUpcoming}
        renderItem={(fixture: FixtureUpcoming) => (
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">vs {fixture.opponent}</p>
              <p className="text-sm text-gray-500">{fixture.date} at {fixture.time}</p>
              <p className="text-xs text-gray-400">{fixture.venue}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEditUpcoming(fixture)}
                className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteUpcoming(fixture.date)}
                className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      />
    </>
  );
}

// Add/Edit Player Modal
function AddPlayerModal({ isOpen, onClose, editingPlayer }: { isOpen: boolean; onClose: () => void; editingPlayer?: Player | null }) {
  const { addPlayer, updatePlayer } = useData();
  const isEditing = !!editingPlayer;

  const getDefaultForm = (): Partial<Player> => ({
    name: '',
    role: '',
    bio: '',
    matches: 0,
    runs: 0,
    wickets: 0,
    battingAvg: undefined,
    bowlingAvg: undefined,
    dismissals: undefined
  });

  const [form, setForm] = useState<Partial<Player>>(getDefaultForm());
  // Track the original player name for updates (so name can be changed)
  const [originalName, setOriginalName] = useState<string | null>(null);

  // Update form when editing player changes
  if (isEditing && editingPlayer && originalName !== editingPlayer.name) {
    setForm(editingPlayer);
    setOriginalName(editingPlayer.name);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.role || !form.bio) {
      alert('Please fill in all required fields');
      return;
    }

    const playerData: Player = {
      name: form.name,
      role: form.role,
      bio: form.bio,
      matches: form.matches || 0,
      runs: form.runs || 0,
      wickets: form.wickets,
      battingAvg: form.battingAvg,
      bowlingAvg: form.bowlingAvg,
      dismissals: form.dismissals
    };

    if (isEditing && originalName) {
      updatePlayer(originalName, playerData);
      alert('Player updated successfully!');
    } else {
      addPlayer(playerData);
      alert('Player added successfully!');
    }
    setForm(getDefaultForm());
    setOriginalName(null);
    onClose();
  };

  const handleClose = () => {
    setForm(getDefaultForm());
    setOriginalName(null);
    onClose();
  };

  // Auto-calculate batting average if matches and runs are provided
  const calculatedBattingAvg = form.matches && form.matches > 0 && form.runs
    ? (form.runs / form.matches).toFixed(2)
    : null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={isEditing ? "Edit Player" : "Add New Player"}>
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="e.g. J. Smith"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">Role *</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="">Select role...</option>
              <option value="Batsman">Batsman</option>
              <option value="Bowler">Bowler</option>
              <option value="All-rounder">All-rounder</option>
              <option value="Wicket-keeper">Wicket-keeper</option>
              <option value="Captain">Captain</option>
              <option value="Vice-Captain">Vice-Captain</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Bio *</label>
          <textarea
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
            rows={2}
            placeholder="Short bio about the player..."
            required
          />
        </div>

        {/* Stats Section */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Career Statistics</h4>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Matches</label>
              <input
                type="number"
                value={form.matches || 0}
                onChange={(e) => setForm({ ...form, matches: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border rounded-md"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Runs</label>
              <input
                type="number"
                value={form.runs || 0}
                onChange={(e) => setForm({ ...form, runs: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border rounded-md"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Wickets</label>
              <input
                type="number"
                value={form.wickets || ''}
                onChange={(e) => setForm({ ...form, wickets: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border rounded-md"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Averages Section */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Averages</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Batting Avg</label>
              <input
                type="number"
                step="0.01"
                value={form.battingAvg || ''}
                onChange={(e) => setForm({ ...form, battingAvg: parseFloat(e.target.value) || undefined })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder={calculatedBattingAvg ? `Calculated: ${calculatedBattingAvg}` : ''}
              />
              {calculatedBattingAvg && !form.battingAvg && (
                <p className="text-xs text-gray-500 mt-1">Auto-calculated: {calculatedBattingAvg}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Bowling Avg</label>
              <input
                type="number"
                step="0.01"
                value={form.bowlingAvg || ''}
                onChange={(e) => setForm({ ...form, bowlingAvg: parseFloat(e.target.value) || undefined })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Wicket-keeper stats */}
        {form.role === 'Wicket-keeper' && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Wicket-keeper Stats</h4>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Dismissals</label>
              <input
                type="number"
                value={form.dismissals || ''}
                onChange={(e) => setForm({ ...form, dismissals: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border rounded-md"
                min="0"
              />
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-4 border-t">
          <button
            type="submit"
            className="flex-1 py-2 bg-cricket-green text-white rounded-md font-semibold hover:opacity-90"
          >
            {isEditing ? 'Update Player' : 'Add Player'}
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-md font-semibold hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

// Add/Edit Result Modal
function AddResultModal({ isOpen, onClose, editingFixture }: { isOpen: boolean; onClose: () => void; editingFixture?: FixtureResult | null }) {
  const { addFixtureResult, updateFixtureResult } = useData();
  const isEditing = !!editingFixture;

  const getDefaultForm = (): Partial<FixtureResult> => ({
    opponent: '',
    date: '',
    venue: '',
    result: '',
    isHome: true,
    scores: '',
    matchCategory: 'league',
    matchStage: '',
    tournamentName: '',
    homeRuns: 0,
    homeWickets: 0,
    homeOvers: 0,
    awayRuns: 0,
    awayWickets: 0,
    awayOvers: 0
  });

  const [form, setForm] = useState<Partial<FixtureResult>>(getDefaultForm());
  // Track original date for updates (so date can be changed)
  const [originalDate, setOriginalDate] = useState<string | null>(null);

  // Update form when editing fixture changes
  if (isEditing && editingFixture && originalDate !== editingFixture.date) {
    setForm(editingFixture);
    setOriginalDate(editingFixture.date);
  }

  // Calculate run rate
  const calculateRunRate = (runs: number, overs: number): string => {
    if (!overs || overs === 0) return '0.00';
    return (runs / overs).toFixed(2);
  };

  // Auto-generate scores string from detailed inputs
  const updateScoresString = (updatedForm: Partial<FixtureResult>) => {
    const homeScore = `${updatedForm.homeRuns || 0}/${updatedForm.homeWickets || 0}`;
    const awayScore = `${updatedForm.awayRuns || 0}/${updatedForm.awayWickets || 0}`;
    return `${homeScore} vs ${awayScore}`;
  };

  const handleScoreChange = (field: keyof FixtureResult, value: number) => {
    const updatedForm = { ...form, [field]: value };
    updatedForm.scores = updateScoresString(updatedForm);
    setForm(updatedForm);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.opponent || !form.date || !form.venue || !form.result) {
      alert('Please fill in all required fields');
      return;
    }

    const fixtureData = {
      ...form,
      scores: form.scores || updateScoresString(form)
    } as FixtureResult;

    if (isEditing && originalDate) {
      updateFixtureResult(originalDate, fixtureData);
      alert('Result updated successfully!');
    } else {
      addFixtureResult(fixtureData);
      alert('Result added successfully!');
    }
    setForm(getDefaultForm());
    setOriginalDate(null);
    onClose();
  };

  // Reset form when modal opens/closes
  const handleClose = () => {
    setForm(getDefaultForm());
    setOriginalDate(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={isEditing ? "Edit Match Result" : "Add Match Result"}>
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">Opponent *</label>
            <input
              type="text"
              value={form.opponent}
              onChange={(e) => setForm({ ...form, opponent: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="e.g. Riverside CC"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Date *</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Home/Away</label>
            <select
              value={form.isHome ? 'home' : 'away'}
              onChange={(e) => setForm({ ...form, isHome: e.target.value === 'home' })}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="home">Home</option>
              <option value="away">Away</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Venue *</label>
          <input
            type="text"
            value={form.venue}
            onChange={(e) => setForm({ ...form, venue: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="e.g. Reindahl Park, Madison"
            required
          />
        </div>

        {/* Match Category & Stage */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Match Type</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
              <select
                value={form.matchCategory || 'league'}
                onChange={(e) => setForm({ ...form, matchCategory: e.target.value as FixtureResult['matchCategory'] })}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="league">League</option>
                <option value="tournament">Tournament</option>
                <option value="cup">Cup</option>
                <option value="friendly">Friendly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Stage (optional)</label>
              <select
                value={form.matchStage || ''}
                onChange={(e) => setForm({ ...form, matchStage: e.target.value as FixtureResult['matchStage'] })}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">None</option>
                <option value="group">Group Stage</option>
                <option value="round-robin">Round Robin</option>
                <option value="quarter-final">Quarter Final</option>
                <option value="semi-final">Semi Final</option>
                <option value="final">Final</option>
              </select>
            </div>
          </div>
          {(form.matchCategory === 'tournament' || form.matchCategory === 'cup') && (
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-600 mb-1">Tournament/Cup Name</label>
              <input
                type="text"
                value={form.tournamentName || ''}
                onChange={(e) => setForm({ ...form, tournamentName: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="e.g. Midwest Cricket Championship"
              />
            </div>
          )}
        </div>

        {/* Detailed Scores */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Detailed Scores</h4>

          {/* Badger CC (Home Team) */}
          <div className="bg-gray-50 rounded-lg p-3 mb-3">
            <p className="text-sm font-medium text-gray-700 mb-2">Badger CC</p>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Runs</label>
                <input
                  type="number"
                  value={form.homeRuns || 0}
                  onChange={(e) => handleScoreChange('homeRuns', parseInt(e.target.value) || 0)}
                  className="w-full px-2 py-1 border rounded text-sm"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Wickets</label>
                <input
                  type="number"
                  value={form.homeWickets || 0}
                  onChange={(e) => handleScoreChange('homeWickets', Math.min(10, parseInt(e.target.value) || 0))}
                  className="w-full px-2 py-1 border rounded text-sm"
                  min="0"
                  max="10"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Overs</label>
                <input
                  type="number"
                  step="0.1"
                  value={form.homeOvers || 0}
                  onChange={(e) => handleScoreChange('homeOvers', parseFloat(e.target.value) || 0)}
                  className="w-full px-2 py-1 border rounded text-sm"
                  min="0"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Run Rate: {calculateRunRate(form.homeRuns || 0, form.homeOvers || 0)}
            </p>
          </div>

          {/* Opponent */}
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm font-medium text-gray-700 mb-2">{form.opponent || 'Opponent'}</p>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Runs</label>
                <input
                  type="number"
                  value={form.awayRuns || 0}
                  onChange={(e) => handleScoreChange('awayRuns', parseInt(e.target.value) || 0)}
                  className="w-full px-2 py-1 border rounded text-sm"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Wickets</label>
                <input
                  type="number"
                  value={form.awayWickets || 0}
                  onChange={(e) => handleScoreChange('awayWickets', Math.min(10, parseInt(e.target.value) || 0))}
                  className="w-full px-2 py-1 border rounded text-sm"
                  min="0"
                  max="10"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Overs</label>
                <input
                  type="number"
                  step="0.1"
                  value={form.awayOvers || 0}
                  onChange={(e) => handleScoreChange('awayOvers', parseFloat(e.target.value) || 0)}
                  className="w-full px-2 py-1 border rounded text-sm"
                  min="0"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Run Rate: {calculateRunRate(form.awayRuns || 0, form.awayOvers || 0)}
            </p>
          </div>
        </div>

        {/* Result */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Result Summary *</label>
          <input
            type="text"
            value={form.result}
            onChange={(e) => setForm({ ...form, result: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="e.g. Won by 45 runs"
            required
          />
        </div>

        {/* Auto-generated scores display */}
        <div className="bg-blue-50 rounded-lg p-3">
          <p className="text-sm text-blue-700">
            <strong>Scores:</strong> {form.scores || updateScoresString(form)}
          </p>
        </div>

        <div className="flex gap-2 pt-4 border-t">
          <button
            type="submit"
            className="flex-1 py-2 bg-cricket-green text-white rounded-md font-semibold hover:opacity-90"
          >
            {isEditing ? 'Update Result' : 'Add Result'}
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-md font-semibold hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

// Add/Edit Upcoming Fixture Modal
function AddUpcomingModal({ isOpen, onClose, editingFixture }: { isOpen: boolean; onClose: () => void; editingFixture?: FixtureUpcoming | null }) {
  const { addFixtureUpcoming, updateFixtureUpcoming } = useData();
  const isEditing = !!editingFixture;

  const getDefaultForm = (): Partial<FixtureUpcoming> => ({
    opponent: '',
    date: '',
    venue: '',
    isHome: true,
    time: '',
    matchCategory: 'league',
    matchStage: '',
    tournamentName: ''
  });

  const [form, setForm] = useState<Partial<FixtureUpcoming>>(getDefaultForm());
  // Track original date for updates (so date can be changed)
  const [originalDate, setOriginalDate] = useState<string | null>(null);

  // Update form when editing fixture changes
  if (isEditing && editingFixture && originalDate !== editingFixture.date) {
    setForm(editingFixture);
    setOriginalDate(editingFixture.date);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.opponent || !form.date || !form.venue || !form.time) {
      alert('Please fill in all fields');
      return;
    }

    const fixtureData = form as FixtureUpcoming;

    if (isEditing && originalDate) {
      updateFixtureUpcoming(originalDate, fixtureData);
      alert('Fixture updated successfully!');
    } else {
      addFixtureUpcoming(fixtureData);
      alert('Fixture added successfully!');
    }
    setForm(getDefaultForm());
    setOriginalDate(null);
    onClose();
  };

  const handleClose = () => {
    setForm(getDefaultForm());
    setOriginalDate(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={isEditing ? "Edit Upcoming Fixture" : "Add Upcoming Fixture"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Opponent *</label>
          <input
            type="text"
            value={form.opponent}
            onChange={(e) => setForm({ ...form, opponent: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="e.g. Riverside CC"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Date *</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Time *</label>
            <input
              type="time"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Venue *</label>
          <input
            type="text"
            value={form.venue}
            onChange={(e) => setForm({ ...form, venue: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="e.g. Reindahl Park, Madison"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Home/Away</label>
          <select
            value={form.isHome ? 'home' : 'away'}
            onChange={(e) => setForm({ ...form, isHome: e.target.value === 'home' })}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="home">Home</option>
            <option value="away">Away</option>
          </select>
        </div>

        {/* Match Category & Stage */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Match Type</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
              <select
                value={form.matchCategory || 'league'}
                onChange={(e) => setForm({ ...form, matchCategory: e.target.value as FixtureUpcoming['matchCategory'] })}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="league">League</option>
                <option value="tournament">Tournament</option>
                <option value="cup">Cup</option>
                <option value="friendly">Friendly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Stage (optional)</label>
              <select
                value={form.matchStage || ''}
                onChange={(e) => setForm({ ...form, matchStage: e.target.value as FixtureUpcoming['matchStage'] })}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">None</option>
                <option value="group">Group Stage</option>
                <option value="round-robin">Round Robin</option>
                <option value="quarter-final">Quarter Final</option>
                <option value="semi-final">Semi Final</option>
                <option value="final">Final</option>
              </select>
            </div>
          </div>
          {(form.matchCategory === 'tournament' || form.matchCategory === 'cup') && (
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-600 mb-1">Tournament/Cup Name</label>
              <input
                type="text"
                value={form.tournamentName || ''}
                onChange={(e) => setForm({ ...form, tournamentName: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="e.g. Midwest Cricket Championship"
              />
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-4 border-t">
          <button
            type="submit"
            className="flex-1 py-2 bg-cricket-green text-white rounded-md font-semibold hover:opacity-90"
          >
            {isEditing ? 'Update Fixture' : 'Add Fixture'}
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-md font-semibold hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

// Generic Manage List Modal
function ManageListModal<T>({ isOpen, onClose, title, items, renderItem }: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="max-h-[60vh] overflow-y-auto space-y-2">
        {items.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No items to display</p>
        ) : (
          items.map((item, index) => (
            <div key={index}>{renderItem(item)}</div>
          ))
        )}
      </div>
      <div className="flex justify-end pt-4 border-t mt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md font-semibold hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
