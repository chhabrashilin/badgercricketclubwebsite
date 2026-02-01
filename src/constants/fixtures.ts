import { MatchCategory } from '../types';

export const CATEGORY_COLORS: Record<MatchCategory | string, string> = {
  league: 'bg-blue-100 text-blue-700',
  tournament: 'bg-purple-100 text-purple-700',
  cup: 'bg-amber-100 text-amber-700',
  friendly: 'bg-green-100 text-green-700'
};

export const CATEGORY_LABELS: Record<MatchCategory | string, string> = {
  league: 'League',
  tournament: 'Tournament',
  cup: 'Cup',
  friendly: 'Friendly'
};

export const formatFixtureDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });
};
