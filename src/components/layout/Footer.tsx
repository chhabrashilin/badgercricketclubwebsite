import { memo } from 'react';
import { MapPinIcon, MailIcon, PhoneIcon } from '../common';

export const Footer = memo(function Footer() {
  return (
    <footer className="bg-cricket-green-dark text-cream py-12 px-4">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center">
              <span className="text-cricket-green font-bold text-xl">BC</span>
            </div>
            <div>
              <h3 className="font-headline text-xl font-bold">Badger Cricket Club</h3>
            </div>
          </div>
          <p className="text-sm opacity-70 max-w-md">
            Proudly representing Madison for over 130 years. Join us at Reindahl Park for
            exciting cricket action and become part of our storied history.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-gold font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-cream/70 hover:text-gold transition-colors text-sm">
                Membership
              </a>
            </li>
            <li>
              <a href="#" className="text-cream/70 hover:text-gold transition-colors text-sm">
                Club History
              </a>
            </li>
            <li>
              <a href="#" className="text-cream/70 hover:text-gold transition-colors text-sm">
                Youth Academy
              </a>
            </li>
            <li>
              <a href="#" className="text-cream/70 hover:text-gold transition-colors text-sm">
                Sponsors
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-gold font-semibold mb-4">Contact</h4>
          <div className="space-y-2 text-sm opacity-70">
            <p className="flex items-center gap-2"><MapPinIcon size={14} /> Reindahl Park, Madison</p>
            <p className="flex items-center gap-2"><MailIcon size={14} /> info@badgercc.co.uk</p>
            <p className="flex items-center gap-2"><PhoneIcon size={14} /> 01234 567 890</p>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto mt-8 pt-8 border-t border-white/10 text-center text-sm opacity-50">
        <p>© 2024 Badger Cricket Club. All rights reserved.</p>
      </div>
    </footer>
  );
});
