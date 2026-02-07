import { memo, useMemo } from 'react';
import { Countdown } from './Countdown';
import { Button, ClawScratch, TrophyIcon, MapPinIcon, CalendarIcon, TicketIcon, BellIcon } from '../common';

export const Hero = memo(function Hero() {
  const tournamentDate = useMemo(() => new Date('2026-03-11T08:00:00-05:00'), []);

  return (
    <section
      id="home"
      className="bg-gradient-to-br from-cricket-green via-cricket-green-light to-cricket-green text-cream py-16 px-4 text-center relative overflow-hidden"
    >
      {/* Decorative claw scratches */}
      <ClawScratch
        className="absolute left-4 top-1/2 -translate-y-1/2 opacity-20"
        size="xl"
        direction="right"
        color="#000000"
      />
      <ClawScratch
        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20"
        size="xl"
        direction="left"
        color="#000000"
      />

      <div className="relative z-10">
        <p className="text-gold text-sm font-semibold uppercase tracking-[3px] mb-2 flex items-center justify-center gap-2">
          <TrophyIcon size={16} /> Upcoming Tournament
        </p>

        <h2 className="font-headline text-4xl md:text-5xl mb-4">
          Badger CC @ Nationals
        </h2>

        <p className="opacity-80 mb-8 flex items-center justify-center gap-2 flex-wrap">
          <span className="flex items-center gap-1"><MapPinIcon size={14} /> Broward County International Cricket Stadium, Florida</span>
          <span className="mx-2">|</span>
          <span className="flex items-center gap-1"><CalendarIcon size={14} /> March 11-15, 2026</span>
        </p>

        <Countdown targetDate={tournamentDate} />

        <div className="flex justify-center gap-4 flex-wrap">
          <Button variant="primary"><TicketIcon size={16} /> Get Tickets</Button>
          <Button variant="secondary"><BellIcon size={16} /> Set Reminder</Button>
        </div>
      </div>
    </section>
  );
});
