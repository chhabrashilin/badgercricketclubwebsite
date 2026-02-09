import { memo, useCallback, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { MenuIcon, XIcon, UserIcon, LogOutIcon, ChevronRightIcon } from '../common';

interface HeaderProps {
  onLoginClick: () => void;
}

interface MenuItem {
  label: string;
  href?: string;
  submenu?: { label: string; href: string }[];
}

const menuItems: MenuItem[] = [
  {
    label: 'Cricket',
    submenu: [
      { label: 'First Team', href: '#squad' },
      { label: 'Academy', href: '#academy' },
      { label: 'Training', href: '#training' },
    ],
  },
  {
    label: 'Schedule',
    href: '#fixtures',
  },
  {
    label: 'Live Scores',
    href: '#matches',
  },
  {
    label: 'The Club',
    submenu: [
      { label: 'About Us', href: '#about' },
      { label: 'History', href: '#history' },
      { label: 'Committee', href: '#committee' },
    ],
  },
  {
    label: 'Stadium',
    href: '#stadium',
  },
  {
    label: 'News',
    href: '#news',
  },
  {
    label: 'Community',
    submenu: [
      { label: 'Youth Program', href: '#youth' },
      { label: 'Events', href: '#events' },
      { label: 'Volunteer', href: '#volunteer' },
    ],
  },
  {
    label: 'Online Shop',
    href: '#shop',
  },
];

export const Header = memo(function Header({ onLoginClick }: HeaderProps) {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>('Cricket');

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const navLinks = [
    { label: 'Members', href: '#members' },
    { label: 'Tickets', href: '#tickets' },
    { label: 'Hospitality', href: '#hospitality' },
    { label: 'Tour', href: '#tour' },
    { label: 'Shop', href: '#shop' },
    { label: 'BC Play', href: '#play' },
  ];

  return (
    <>
      <header className="bg-white sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 flex items-center justify-between h-[60px]">
          {/* Left: Menu + Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <XIcon size={20} className="text-gray-700" />
              ) : (
                <MenuIcon size={20} className="text-gray-700" />
              )}
            </button>

            {/* Logo */}
            <a href="#home" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-cricket-green rounded-full flex items-center justify-center border-2 border-cricket-green">
                <span className="text-white font-bold text-sm">BC</span>
              </div>
            </a>

            {/* Divider */}
            <div className="h-6 w-px bg-gray-200 mx-1" />

            {/* Badge */}
            <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
              <span className="text-[10px] font-bold text-gray-700">25</span>
            </div>
          </div>

          {/* Center: Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-800 hover:text-cricket-green text-[13px] font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Sponsors + Auth */}
          <div className="flex items-center gap-4">
            {/* Sponsor text */}
            <span className="hidden md:block text-[11px] text-gray-500 font-medium">
              Sponsor
            </span>

            {/* Sponsor logo placeholder */}
            <div className="hidden md:flex w-8 h-8 items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-gray-800" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>

            {/* Three dots menu */}
            <button className="hidden md:flex w-8 h-8 items-center justify-center hover:bg-gray-100 rounded-lg">
              <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="5" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="12" cy="19" r="2" />
              </svg>
            </button>

            {/* Auth Button */}
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <LogOutIcon size={14} />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            ) : (
              <button
                onClick={onLoginClick}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <UserIcon size={14} />
                <span>Sign in</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Full-width Dropdown Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white" style={{ top: '60px' }}>
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-0 min-h-[calc(100vh-60px)]">
              {/* Left: Main Menu */}
              <nav className="py-6 border-r border-gray-100">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      if (item.submenu) {
                        setActiveSubmenu(activeSubmenu === item.label ? null : item.label);
                      } else {
                        setIsMenuOpen(false);
                      }
                    }}
                    className={`w-full flex items-center justify-between py-4 px-2 text-left transition-colors ${
                      activeSubmenu === item.label
                        ? 'text-blue-600 bg-blue-50 rounded-lg'
                        : 'text-gray-900 hover:bg-gray-50 rounded-lg'
                    }`}
                  >
                    <span className="text-[15px] font-semibold">{item.label}</span>
                    {item.submenu && (
                      <ChevronRightIcon
                        size={18}
                        className={activeSubmenu === item.label ? 'text-blue-600' : 'text-gray-400'}
                      />
                    )}
                  </button>
                ))}
              </nav>

              {/* Right: Submenu */}
              <div className="py-6 px-8 bg-white">
                {menuItems.map((item) =>
                  item.submenu && activeSubmenu === item.label ? (
                    <div key={item.label}>
                      {item.submenu.map((subitem) => (
                        <a
                          key={subitem.label}
                          href={subitem.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block py-3 text-[15px] text-gray-700 hover:text-cricket-green transition-colors"
                        >
                          {subitem.label}
                        </a>
                      ))}
                    </div>
                  ) : null
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});
