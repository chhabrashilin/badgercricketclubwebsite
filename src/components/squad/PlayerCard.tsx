import { memo } from 'react';
import { Player } from '../../types';

interface PlayerCardProps {
  player: Player;
}

export const PlayerCard = memo(function PlayerCard({ player }: PlayerCardProps) {
  return (
    <div className="player-card h-[280px]">
      <div className="player-card-inner">
        {/* Front */}
        <div className="player-front">
          <div className="w-16 h-16 bg-cricket-green rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
            🦡
          </div>
          <h3 className="font-headline text-xl text-center mb-1">{player.name}</h3>
          <p className="text-cricket-green text-sm text-center font-medium mb-auto">
            {player.role}
          </p>
          <div className="flex justify-between pt-4 border-t border-gray-100">
            {player.battingAvg && (
              <>
                <span className="text-gray-500 text-sm">Batting Avg</span>
                <span className="font-bold text-cricket-green">{player.battingAvg}</span>
              </>
            )}
            {player.bowlingAvg && !player.battingAvg && (
              <>
                <span className="text-gray-500 text-sm">Bowling Avg</span>
                <span className="font-bold text-cricket-green">{player.bowlingAvg}</span>
              </>
            )}
            {player.bowlingAvg && player.battingAvg && (
              <>
                <span className="text-gray-500 text-sm">Bowling Avg</span>
                <span className="font-bold text-cricket-green">{player.bowlingAvg}</span>
              </>
            )}
          </div>
        </div>

        {/* Back */}
        <div className="player-back">
          <h3 className="font-headline text-gold text-xl mb-2">{player.name}</h3>
          <p className="text-sm opacity-90 flex-1">{player.bio}</p>
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/20 mt-auto text-center">
            <div>
              <div className="text-lg font-bold text-gold">{player.matches}</div>
              <div className="text-xs opacity-70">Matches</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gold">{player.runs}</div>
              <div className="text-xs opacity-70">Runs</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gold">
                {player.wickets ?? player.dismissals ?? '-'}
              </div>
              <div className="text-xs opacity-70">
                {player.dismissals ? 'Dismissals' : 'Wickets'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
