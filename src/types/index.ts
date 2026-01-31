export interface User {
  username: string;
  role: 'admin' | 'viewer';
}

export interface Player {
  name: string;
  role: string;
  battingAvg?: number;
  bowlingAvg?: number;
  bio: string;
  matches: number;
  runs: number;
  wickets?: number;
  dismissals?: number;
}

export type MatchCategory = 'league' | 'tournament' | 'friendly' | 'cup';
export type MatchStage = 'group' | 'quarter-final' | 'semi-final' | 'final' | 'round-robin' | '';

export interface FixtureResult {
  opponent: string;
  date: string;
  venue: string;
  result: string;
  isHome: boolean;
  scores: string;
  matchCategory?: MatchCategory;
  matchStage?: MatchStage;
  tournamentName?: string;
  // Detailed scores for calculations
  homeRuns?: number;
  homeWickets?: number;
  homeOvers?: number;
  awayRuns?: number;
  awayWickets?: number;
  awayOvers?: number;
}

export interface FixtureUpcoming {
  opponent: string;
  date: string;
  venue: string;
  isHome: boolean;
  time: string;
  matchCategory?: MatchCategory;
  matchStage?: MatchStage;
  tournamentName?: string;
}

export interface MatchScore {
  homeTeam: string;
  awayTeam: string;
  homeRuns: number;
  homeWickets: number;
  homeOvers: string;
  awayRuns: number;
  awayWickets: number;
  awayOvers: string;
  runRate: string;
  partnership: string;
  batsman1: {
    name: string;
    runs: number;
    balls: number;
    isStriker: boolean;
  };
  batsman2: {
    name: string;
    runs: number;
    balls: number;
    isStriker: boolean;
  };
  bowler: {
    name: string;
    wickets: number;
    runs: number;
    overs: string;
  };
  lastWicket: string;
  isLive: boolean;
  matchType: string;
}

export interface LiveMatchFromAPI {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  score?: {
    r: number;
    w: number;
    o: number;
    inning: string;
  }[];
}

export interface ChartDataPoint {
  opponent: string;
  runs: number;
}
