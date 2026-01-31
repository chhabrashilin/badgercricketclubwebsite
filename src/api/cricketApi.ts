import { LiveMatchFromAPI } from '../types';

const API_BASE_URL = import.meta.env.VITE_CRICKET_API_BASE_URL || 'https://api.cricapi.com/v1';
const API_KEY = import.meta.env.VITE_CRICKET_API_KEY || '';

interface ApiResponse<T> {
  apikey: string;
  data: T;
  status: string;
  info: {
    hitsToday: number;
    hitsUsed: number;
    hitsLimit: number;
  };
}

async function fetchFromApi<T>(endpoint: string, params: Record<string, string> = {}): Promise<T | null> {
  if (!API_KEY) {
    console.warn('No API key configured. Using fallback data.');
    return null;
  }

  const queryParams = new URLSearchParams({
    apikey: API_KEY,
    ...params
  });

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}?${queryParams}`);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data: ApiResponse<T> = await response.json();

    if (data.status !== 'success') {
      throw new Error('API returned unsuccessful status');
    }

    return data.data;
  } catch (error) {
    console.error('Cricket API Error:', error);
    throw error;
  }
}

export const cricketApi = {
  /**
   * Get current live matches
   */
  getLiveMatches: async (): Promise<LiveMatchFromAPI[]> => {
    const data = await fetchFromApi<LiveMatchFromAPI[]>('/currentMatches');
    return data || [];
  },

  /**
   * Get match scorecard by ID
   */
  getMatchScorecard: async (matchId: string) => {
    const data = await fetchFromApi(`/match_scorecard`, { id: matchId });
    return data;
  },

  /**
   * Get upcoming matches
   */
  getUpcomingMatches: async (offset: number = 0) => {
    const data = await fetchFromApi<LiveMatchFromAPI[]>('/matches', { offset: String(offset) });
    return data || [];
  },

  /**
   * Get player info
   */
  getPlayerInfo: async (playerId: string) => {
    const data = await fetchFromApi(`/players_info`, { id: playerId });
    return data;
  },

  /**
   * Search for players
   */
  searchPlayers: async (search: string) => {
    const data = await fetchFromApi(`/players`, { search });
    return data;
  }
};
