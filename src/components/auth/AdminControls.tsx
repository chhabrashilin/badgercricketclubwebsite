import { useAuth } from '../../context/AuthContext';
import { useScore } from '../../context/ScoreContext';

interface AdminControlsProps {
  onEditClick: () => void;
}

export function AdminControls({ onEditClick }: AdminControlsProps) {
  const { isAdmin } = useAuth();
  const { resetScore } = useScore();

  if (!isAdmin) return null;

  const handleReset = () => {
    if (confirm('Reset score to default values?')) {
      resetScore();
      alert('Score reset to default!');
    }
  };

  return (
    <div className="bg-yellow-50 border border-yellow-400 rounded-lg p-4 mb-4">
      <h4 className="text-yellow-800 font-semibold mb-3 text-sm">
        ⚙️ Admin Controls
      </h4>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={onEditClick}
          className="bg-cricket-green text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
        >
          ✏️ Edit Live Score
        </button>
        <button
          onClick={handleReset}
          className="bg-cricket-green text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
        >
          🔄 Reset Score
        </button>
      </div>
    </div>
  );
}
