import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Player, FixtureResult, FixtureUpcoming } from '../types';
import { players as defaultPlayers } from '../data/players';
import { fixtureResults as defaultResults, fixtureUpcoming as defaultUpcoming } from '../data/fixtures';

interface DataContextType {
  players: Player[];
  fixtureResults: FixtureResult[];
  fixtureUpcoming: FixtureUpcoming[];
  addPlayer: (player: Player) => void;
  updatePlayer: (nameOrIndex: string | number, player: Player) => void;
  deletePlayer: (nameOrIndex: string | number) => void;
  addFixtureResult: (fixture: FixtureResult) => void;
  updateFixtureResult: (dateOrIndex: string | number, fixture: FixtureResult) => void;
  deleteFixtureResult: (dateOrIndex: string | number) => void;
  addFixtureUpcoming: (fixture: FixtureUpcoming) => void;
  updateFixtureUpcoming: (dateOrIndex: string | number, fixture: FixtureUpcoming) => void;
  deleteFixtureUpcoming: (dateOrIndex: string | number) => void;
  resetAllData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  players: 'badgercc_players',
  results: 'badgercc_results',
  upcoming: 'badgercc_upcoming'
};

export function DataProvider({ children }: { children: ReactNode }) {
  const [players, setPlayers] = useState<Player[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.players);
    return saved ? JSON.parse(saved) : defaultPlayers;
  });

  const [fixtureResults, setFixtureResults] = useState<FixtureResult[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.results);
    return saved ? JSON.parse(saved) : defaultResults;
  });

  const [fixtureUpcoming, setFixtureUpcoming] = useState<FixtureUpcoming[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.upcoming);
    return saved ? JSON.parse(saved) : defaultUpcoming;
  });

  // Persist to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.players, JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.results, JSON.stringify(fixtureResults));
  }, [fixtureResults]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.upcoming, JSON.stringify(fixtureUpcoming));
  }, [fixtureUpcoming]);

  // Player operations
  const addPlayer = (player: Player) => {
    setPlayers(prev => [...prev, player]);
  };

  const updatePlayer = (nameOrIndex: string | number, player: Player) => {
    setPlayers(prev => prev.map((p, i) => {
      if (typeof nameOrIndex === 'number') {
        return i === nameOrIndex ? player : p;
      }
      return p.name === nameOrIndex ? player : p;
    }));
  };

  const deletePlayer = (nameOrIndex: string | number) => {
    setPlayers(prev => prev.filter((p, i) => {
      if (typeof nameOrIndex === 'number') {
        return i !== nameOrIndex;
      }
      return p.name !== nameOrIndex;
    }));
  };

  // Fixture Results operations
  const addFixtureResult = (fixture: FixtureResult) => {
    setFixtureResults(prev => [...prev, fixture]);
  };

  const updateFixtureResult = (dateOrIndex: string | number, fixture: FixtureResult) => {
    setFixtureResults(prev => prev.map((f, i) => {
      if (typeof dateOrIndex === 'number') {
        return i === dateOrIndex ? fixture : f;
      }
      return f.date === dateOrIndex ? fixture : f;
    }));
  };

  const deleteFixtureResult = (dateOrIndex: string | number) => {
    setFixtureResults(prev => prev.filter((f, i) => {
      if (typeof dateOrIndex === 'number') {
        return i !== dateOrIndex;
      }
      return f.date !== dateOrIndex;
    }));
  };

  // Fixture Upcoming operations
  const addFixtureUpcoming = (fixture: FixtureUpcoming) => {
    setFixtureUpcoming(prev => [...prev, fixture]);
  };

  const updateFixtureUpcoming = (dateOrIndex: string | number, fixture: FixtureUpcoming) => {
    setFixtureUpcoming(prev => prev.map((f, i) => {
      if (typeof dateOrIndex === 'number') {
        return i === dateOrIndex ? fixture : f;
      }
      return f.date === dateOrIndex ? fixture : f;
    }));
  };

  const deleteFixtureUpcoming = (dateOrIndex: string | number) => {
    setFixtureUpcoming(prev => prev.filter((f, i) => {
      if (typeof dateOrIndex === 'number') {
        return i !== dateOrIndex;
      }
      return f.date !== dateOrIndex;
    }));
  };

  // Reset all data to defaults
  const resetAllData = () => {
    setPlayers(defaultPlayers);
    setFixtureResults(defaultResults);
    setFixtureUpcoming(defaultUpcoming);
    localStorage.removeItem(STORAGE_KEYS.players);
    localStorage.removeItem(STORAGE_KEYS.results);
    localStorage.removeItem(STORAGE_KEYS.upcoming);
  };

  return (
    <DataContext.Provider
      value={{
        players,
        fixtureResults,
        fixtureUpcoming,
        addPlayer,
        updatePlayer,
        deletePlayer,
        addFixtureResult,
        updateFixtureResult,
        deleteFixtureResult,
        addFixtureUpcoming,
        updateFixtureUpcoming,
        deleteFixtureUpcoming,
        resetAllData
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
