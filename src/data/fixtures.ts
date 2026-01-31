import { FixtureResult, FixtureUpcoming } from '../types';

export const fixtureResults: FixtureResult[] = [
  {
    opponent: "Oakwood XI",
    date: "2024-03-15",
    venue: "Home - Reindahl Park, Madison",
    result: "Won by 45 runs",
    isHome: true,
    scores: "267/6 vs 222 all out",
    matchCategory: "league",
    matchStage: "",
    homeRuns: 267,
    homeWickets: 6,
    homeOvers: 50,
    awayRuns: 222,
    awayWickets: 10,
    awayOvers: 47.3
  },
  {
    opponent: "Riverside CC",
    date: "2024-03-22",
    venue: "Away - Riverside Park",
    result: "Lost by 3 wickets",
    isHome: false,
    scores: "198 all out vs 201/7",
    matchCategory: "league",
    matchStage: "",
    homeRuns: 198,
    homeWickets: 10,
    homeOvers: 45.2,
    awayRuns: 201,
    awayWickets: 7,
    awayOvers: 48.1
  },
  {
    opponent: "Hillside Wanderers",
    date: "2024-03-29",
    venue: "Home - Reindahl Park, Madison",
    result: "Won by 8 wickets",
    isHome: true,
    scores: "156/2 vs 152 all out",
    matchCategory: "cup",
    matchStage: "quarter-final",
    tournamentName: "Madison Cup",
    homeRuns: 156,
    homeWickets: 2,
    homeOvers: 32.4,
    awayRuns: 152,
    awayWickets: 10,
    awayOvers: 41.5
  },
  {
    opponent: "Borough United",
    date: "2024-04-05",
    venue: "Away - Borough Oval",
    result: "Won by 112 runs",
    isHome: false,
    scores: "312/4 vs 200 all out",
    matchCategory: "tournament",
    matchStage: "semi-final",
    tournamentName: "Midwest Championship",
    homeRuns: 312,
    homeWickets: 4,
    homeOvers: 50,
    awayRuns: 200,
    awayWickets: 10,
    awayOvers: 38.2
  }
];

export const fixtureUpcoming: FixtureUpcoming[] = [
  {
    opponent: "Meadowbrook CC",
    date: "2024-04-12",
    venue: "Home - Reindahl Park, Madison",
    isHome: true,
    time: "13:00",
    matchCategory: "league",
    matchStage: ""
  },
  {
    opponent: "Thornbury Tigers",
    date: "2024-04-19",
    venue: "Away - Tiger's Den",
    isHome: false,
    time: "14:00",
    matchCategory: "tournament",
    matchStage: "final",
    tournamentName: "Midwest Championship"
  },
  {
    opponent: "Westfield CC",
    date: "2024-04-26",
    venue: "Home - Reindahl Park, Madison",
    isHome: true,
    time: "13:00",
    matchCategory: "friendly",
    matchStage: ""
  }
];

export const chartData = [
  { opponent: "Oak", runs: 267 },
  { opponent: "Riv", runs: 198 },
  { opponent: "Hill", runs: 156 },
  { opponent: "Bor", runs: 312 },
  { opponent: "Mea", runs: 245 },
  { opponent: "Tho", runs: 289 }
];
