import { memo, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Badge, LogOutIcon, LockIcon } from '../common';

interface HeaderProps {
  onLoginClick: () => void;
}

export const Header = memo(function Header({ onLoginClick }: HeaderProps) {
  const { user, isAdmin, logout } = useAuth();

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <header className="bg-cricket-green text-cream sticky top-0 z-50 shadow-md">
      <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between h-[70px]">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center">
            <span className="text-cricket-green font-bold text-xl">BC</span>
          </div>
          <div>
            <h1 className="font-headline text-2xl font-bold">Badger CC</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-8">
          <a href="#home" className="text-cream/90 hover:text-gold transition-colors font-medium">
            Home
          </a>
          <a href="#matches" className="text-cream/90 hover:text-gold transition-colors font-medium">
            Matches
          </a>
          <a href="#squad" className="text-cream/90 hover:text-gold transition-colors font-medium">
            Squad
          </a>
          <a href="#fixtures" className="text-cream/90 hover:text-gold transition-colors font-medium">
            Fixtures
          </a>
        </nav>

        {/* Auth Section */}
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <Badge variant={isAdmin ? 'admin' : 'viewer'}>
                {user.role}
              </Badge>
              <button
                onClick={handleLogout}
                className="bg-white/20 text-cream px-4 py-2 rounded-md font-semibold flex items-center gap-2 hover:bg-white/30 transition-colors"
              >
                <LogOutIcon size={16} />
                <span className="hidden sm:inline">Logout ({user.username})</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="bg-gold text-cricket-green-dark px-4 py-2 rounded-md font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <LockIcon size={16} />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
});
