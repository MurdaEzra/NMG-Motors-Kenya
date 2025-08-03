import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, XIcon } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 bg-[#001514]/80 backdrop-blur-md text-[#FBFFFE] shadow-md w-full z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold tracking-wider">
            NMG MOTORS <span className="text-[#E6AF2E]">KENYA</span>
          </span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-[#FBFFFE] focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="hover:text-[#E6AF2E] transition-colors">
            Home
          </Link>
          <Link to="/vehicles" className="hover:text-[#E6AF2E] transition-colors">
            Vehicles
          </Link>
          <Link to="/about" className="hover:text-[#E6AF2E] transition-colors">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-[#E6AF2E] transition-colors">
            Contact
          </Link>
        </nav>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#001514]/90 backdrop-blur-md border-t border-[#A3320B]/20">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-4 py-4">
              <Link
                to="/"
                className="hover:text-[#E6AF2E] transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/vehicles"
                className="hover:text-[#E6AF2E] transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Vehicles
              </Link>
              <Link
                to="/about"
                className="hover:text-[#E6AF2E] transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="hover:text-[#E6AF2E] transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;