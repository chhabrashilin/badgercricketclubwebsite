import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { MatchScore } from '../types';
import { defaultMatchScore } from '../data/defaultMatch';
import { cricketApi } from '../api/cricketApi';

interface ScoreContextType {
  matchScore: MatchScore;
  isLive: boolean;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  updateScore: (updates: Partial<MatchScore>) => void;
  resetScore: () => void;
  refreshScore: () => Promise<void>;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

const STORAGE_KEY = 'badgercc_match';
const POLL_INTERVAL = 30000; // 30 seconds

export function ScoreProvider({ children }: { children: ReactNode }) {
  const [matchScore, setMatchScore] = useState<MatchScore>(defaultMatchScore);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [useApiData, setUseApiData] = useState(false);

  // Load saved match data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        setMatchScore(prev => ({ ...prev, ...parsedData }));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Fetch live scores from API
  const refreshScore = useCallback(async () => {
    const apiKey = import.meta.env.VITE_CRICKET_API_KEY;

    if (!apiKey) {
      // No API key, use local data simulation
      setMatchScore(prev => {
        const addRuns = Math.floor(Math.random() * 6);
        return {
          ...prev,
          homeRuns: prev.homeRuns + addRuns,
          batsman1: {
            ...prev.batsman1,
            runs: prev.batsman1.runs + addRuns
          }
        };
      });
      setLastUpdated(new Date());
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const liveMatches = await cricketApi.getLiveMatches();

      if (liveMatches && liveMatches.length > 0) {
        // For demo, take the first live match
        const match = liveMatches[0];

        if (match.score && match.score.length > 0) {
          const homeScore = match.score[0];
          const awayScore = match.score[1];

          setMatchScore(prev => ({
            ...prev,
            homeTeam: match.teams[0] || prev.homeTeam,
            awayTeam: match.teams[1] || prev.awayTeam,
            homeRuns: homeScore?.r || prev.homeRuns,
            homeWickets: homeScore?.w || prev.homeWickets,
            homeOvers: String(homeScore?.o || prev.homeOvers),
            awayRuns: awayScore?.r || prev.awayRuns,
            awayWickets: awayScore?.w || prev.awayWickets,
            awayOvers: String(awayScore?.o || prev.awayOvers),
            isLive: match.status === 'Live',
            matchType: match.matchType || prev.matchType
          }));
          setUseApiData(true);
        }
      }

      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to fetch live scores. Using local data.');
      console.error('API Error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Polling for live updates
  useEffect(() => {
    if (!matchScore.isLive) return;

    const interval = setInterval(refreshScore, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [matchScore.isLive, refreshScore]);

  const updateScore = (updates: Partial<MatchScore>) => {
    setMatchScore(prev => {
      const newScore = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newScore));
      return newScore;
    });
    setUseApiData(false);
  };

  const resetScore = () => {
    setMatchScore(defaultMatchScore);
    localStorage.removeItem(STORAGE_KEY);
    setUseApiData(false);
  };

  return (
    <ScoreContext.Provider
      value={{
        matchScore,
        isLive: matchScore.isLive,
        isLoading,
        error,
        lastUpdated,
        updateScore,
        resetScore,
        refreshScore
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
}

export function useScore() {
  const context = useContext(ScoreContext);
  if (context === undefined) {
    throw new Error('useScore must be used within a ScoreProvider');
  }
  return context;
}
