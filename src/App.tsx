import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ScoreProvider } from './context/ScoreContext';
import { DataProvider } from './context/DataContext';
import { Header, Footer } from './components/layout';
import { Hero } from './components/hero';
import { NewsSection } from './components/news';
import { LiveScorecard } from './components/scorecard';
import { SquadSection } from './components/squad';
import { FixturesSection } from './components/fixtures';
import { QuickStats, SeasonChart, JoinCard } from './components/dashboard';
import { LoginModal, AdminPanel, EditMatchModal } from './components/auth';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <AuthProvider>
      <DataProvider>
        <ScoreProvider>
          <div className="min-h-screen bg-cream-dark">
            <Header onLoginClick={() => setIsLoginModalOpen(true)} />

            {/* Featured News Hero */}
            <Hero />

            {/* News Cards Section */}
            <NewsSection />

            {/* Main Content */}
            <main id="matches" className="max-w-[1400px] mx-auto py-12 px-4">
              <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
                {/* Left Column */}
                <div>
                  <AdminPanel onEditScoreClick={() => setIsEditModalOpen(true)} />
                  <LiveScorecard />
                  <SeasonChart />
                </div>

                {/* Right Column */}
                <div>
                  <QuickStats />
                  <JoinCard />
                </div>
              </div>
            </main>

            <SquadSection />
            <FixturesSection />
            <Footer />

            {/* Modals */}
            <LoginModal
              isOpen={isLoginModalOpen}
              onClose={() => setIsLoginModalOpen(false)}
            />
            <EditMatchModal
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
            />
          </div>
        </ScoreProvider>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
