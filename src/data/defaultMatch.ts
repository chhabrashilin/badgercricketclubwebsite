import { MatchScore } from '../types';

export const defaultMatchScore: MatchScore = {
  homeTeam: "Badger CC",
  awayTeam: "Meadowbrook CC",
  homeRuns: 245,
  homeWickets: 4,
  homeOvers: "42.4",
  awayRuns: 112,
  awayWickets: 2,
  awayOvers: "28.0",
  runRate: "5.74",
  partnership: "78 (89)",
  batsman1: {
    name: "B. Brock",
    runs: 87,
    balls: 96,
    isStriker: true
  },
  batsman2: {
    name: "R. Digger",
    runs: 34,
    balls: 41,
    isStriker: false
  },
  bowler: {
    name: "A. Smith",
    wickets: 1,
    runs: 42,
    overs: "8.4"
  },
  lastWicket: "H. Sett c. Jones b. Smith 52 (67)",
  isLive: true,
  matchType: "League Match - Day 1"
};
