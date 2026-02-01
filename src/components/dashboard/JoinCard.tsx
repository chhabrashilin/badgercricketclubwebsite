import { memo } from 'react';

export const JoinCard = memo(function JoinCard() {
  return (
    <div className="bg-gradient-to-br from-gold to-[#b45309] rounded-xl p-6 text-cricket-green-dark mt-6">
      <h3 className="font-headline text-2xl mb-2">Join the Club</h3>
      <p className="text-sm opacity-80 mb-4">
        Become a member of Badger CC and enjoy exclusive benefits, match day access,
        and be part of our cricket family.
      </p>
      <button className="w-full bg-cricket-green text-cream py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
        👤 Apply for Membership
      </button>
    </div>
  );
});
