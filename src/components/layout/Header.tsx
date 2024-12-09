import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, LogIn, Menu, X } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Join Beta', to: '/beta' },
    { name: 'Login / Sign Up', to: '/login' }
  ];

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <PawPrint className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">PawFinder QR</h1>
          </Link>
          
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  item.name === 'Login / Sign Up'
                    ? 'text-white bg-blue-600 hover:bg-blue-700'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {item.name === 'Login / Sign Up' && (
                  <LogIn className="inline-block h-4 w-4 mr-2" />
                )}
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  item.name === 'Login / Sign Up'
                    ? 'text-white bg-blue-600 hover:bg-blue-700'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}