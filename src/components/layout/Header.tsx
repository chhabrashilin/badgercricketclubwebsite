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
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-[90px]">
          {/* Left: Menu + Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-11 h-11 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <XIcon size={22} className="text-gray-800" />
              ) : (
                <MenuIcon size={22} className="text-gray-800" />
              )}
            </button>

            {/* Logo */}
            <a href="#home" className="flex items-center">
              <img
                src="/logo.jpg"
                alt="Wisconsin Cricket"
                className="h-[80px] w-[80px] object-contain"
              />
            </a>

            {/* Divider */}
            <div className="h-10 w-px bg-gray-300 mx-1" />

            {/* Championship Stars */}
            <div className="flex items-center gap-0.5">
              {[1, 2, 3].map((star) => (
                <svg
                  key={star}
                  className={`w-7 h-7 ${star === 1 ? 'text-[#d4af37]' : 'text-[#1e3a5f]'}`}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
          </div>

          {/* Center: Navigation */}
          <nav className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 text-[16px] font-normal transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Sponsors + Auth */}
          <div className="flex items-center gap-5">
            {/* Sponsor text */}
            <span className="hidden md:block text-xs text-gray-500 font-normal">
              Sponsor
            </span>

            {/* Sponsor logo placeholder */}
            <div className="hidden md:flex w-9 h-9 items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-7 h-7 text-gray-900" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>

            {/* Three dots menu */}
            <button className="hidden md:flex w-9 h-9 items-center justify-center hover:bg-gray-100 rounded-lg">
              <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="5" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="12" cy="19" r="2" />
              </svg>
            </button>

            {/* Auth Button */}
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-full text-[15px] font-normal text-gray-800 hover:bg-gray-50 transition-colors"
              >
                <LogOutIcon size={16} />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            ) : (
              <button
                onClick={onLoginClick}
                className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-full text-[15px] font-normal text-gray-800 hover:bg-gray-50 transition-colors"
              >
                <UserIcon size={16} />
                <span>Sign in</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Full-width Dropdown Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white" style={{ top: '90px' }}>
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-0 min-h-[calc(100vh-90px)]">
              {/* Left: Main Menu */}
              <nav className="py-8 md:border-r border-gray-100">
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
                    className={`w-full flex items-center justify-between py-4 px-3 text-left transition-colors rounded-lg ${
                      activeSubmenu === item.label
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-[17px] font-semibold">{item.label}</span>
                    {item.submenu && (
                      <ChevronRightIcon
                        size={20}
                        className={activeSubmenu === item.label ? 'text-blue-600' : 'text-gray-400'}
                      />
                    )}
                  </button>
                ))}
              </nav>

              {/* Right: Submenu */}
              <div className="py-8 px-10 bg-white">
                {menuItems.map((item) =>
                  item.submenu && activeSubmenu === item.label ? (
                    <div key={item.label}>
                      {item.submenu.map((subitem) => (
                        <a
                          key={subitem.label}
                          href={subitem.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block py-4 text-[17px] font-normal text-gray-800 hover:text-blue-600 transition-colors"
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
