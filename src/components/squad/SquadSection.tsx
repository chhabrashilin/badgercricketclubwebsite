import { PlayerCard } from './PlayerCard';
import { useData } from '../../context/DataContext';
import { ClawScratch } from '../common';

export function SquadSection() {
  const { players } = useData();

  return (
    <section id="squad" className="py-16 px-4 bg-cream-dark relative overflow-hidden">
      {/* Decorative claw scratches */}
      <ClawScratch
        className="absolute -left-8 top-20 opacity-10 rotate-12"
        size="lg"
        direction="right"
        color="#1a1a1a"
        accentColor="#C5050C"
      />
      <ClawScratch
        className="absolute -right-8 bottom-20 opacity-10 -rotate-12"
        size="lg"
        direction="left"
        color="#1a1a1a"
        accentColor="#C5050C"
      />

      <div className="text-center mb-12 relative z-10">
        <p className="text-cricket-green text-sm font-semibold uppercase tracking-[3px]">
          The Team
        </p>
        <div className="flex items-center justify-center gap-4">
          <ClawScratch size="sm" direction="right" className="opacity-60" />
          <h2 className="font-headline text-3xl my-2">The Sett</h2>
          <ClawScratch size="sm" direction="left" className="opacity-60" />
        </div>
        <p className="text-gray-600">Hover over a card to reveal player stats</p>
      </div>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {players.map((player) => (
          <PlayerCard key={player.name} player={player} />
        ))}
      </div>
    </section>
  );
}
