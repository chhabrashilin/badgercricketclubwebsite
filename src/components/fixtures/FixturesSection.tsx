import { memo, useState, useCallback } from 'react';
import { FixtureResultItem, FixtureUpcomingItem } from './FixtureItem';
import { ScorecardModal } from './ScorecardModal';
import { useData } from '../../context/DataContext';
import { FixtureResult } from '../../types';

type Tab = 'upcoming' | 'results';

export const FixturesSection = memo(function FixturesSection() {
  const { fixtureResults, fixtureUpcoming } = useData();
  const [activeTab, setActiveTab] = useState<Tab>('upcoming');
  const [selectedFixture, setSelectedFixture] = useState<FixtureResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFixtureClick = useCallback((fixture: FixtureResult) => {
    setSelectedFixture(fixture);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleTabUpcoming = useCallback(() => setActiveTab('upcoming'), []);
  const handleTabResults = useCallback(() => setActiveTab('results'), []);

  return (
    <section id="fixtures" className="py-16 px-4 bg-white">
      <div className="text-center mb-12">
        <p className="text-cricket-green text-sm font-semibold uppercase tracking-[3px]">
          Schedule
        </p>
        <h2 className="font-headline text-3xl my-2">Fixtures & Results</h2>
      </div>

      {/* Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-cream-dark rounded-lg p-1 inline-flex">
          <button
            onClick={handleTabUpcoming}
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              activeTab === 'upcoming'
                ? 'bg-cricket-green text-cream shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Upcoming ({fixtureUpcoming.length})
          </button>
          <button
            onClick={handleTabResults}
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              activeTab === 'results'
                ? 'bg-cricket-green text-cream shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Results ({fixtureResults.length})
          </button>
        </div>
      </div>

      {/* Fixtures List */}
      <div className="max-w-3xl mx-auto">
        {activeTab === 'upcoming' &&
          fixtureUpcoming.map((fixture) => (
            <FixtureUpcomingItem key={fixture.date} fixture={fixture} />
          ))}

        {activeTab === 'results' &&
          fixtureResults.map((fixture) => (
            <FixtureResultItem
              key={fixture.date}
              fixture={fixture}
              onClick={() => handleFixtureClick(fixture)}
            />
          ))}
      </div>

      {/* Scorecard Modal */}
      <ScorecardModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        fixture={selectedFixture}
      />
    </section>
  );
});
