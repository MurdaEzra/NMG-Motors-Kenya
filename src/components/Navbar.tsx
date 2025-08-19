import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, XIcon, ShieldIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0
        bg-[#001514]/90 backdrop-blur-lg text-[#FBFFFE] border border-gray-700/30
        z-50 transition-all duration-300
        ${scrolled ? 'shadow-md' : 'shadow-sm'}`}
    >
      <div className="flex justify-between items-center px-6 py-3">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold tracking-wider">
            NMG MOTORS <span className="text-[#E6AF2E]"> KENYA</span>
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
        <nav className="hidden md:flex space-x-8 ml-6">
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
          <Link to="/faqs" className="hover:text-[#E6AF2E] transition-colors">
            FAQs
          </Link>
          {isAuthenticated && (
            <Link
              to="/admin"
              className="hover:text-[#E6AF2E] transition-colors flex items-center"
            >
              <ShieldIcon className="h-4 w-4 mr-1" />
              Admin
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute top-full mt-3 left-0 right-0 bg-[#001514]/95 backdrop-blur-lg border border-gray-700/30 rounded-lg shadow-lg md:hidden">
          <div className="flex flex-col space-y-2 p-4">
            <Link
              to="/"
              className="hover:text-[#E6AF2E] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/vehicles"
              className="hover:text-[#E6AF2E] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Vehicles
            </Link>
            <Link
              to="/about"
              className="hover:text-[#E6AF2E] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="hover:text-[#E6AF2E] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/faqs"
              className="hover:text-[#E6AF2E] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQs
            </Link>
            {isAuthenticated && (
              <Link
                to="/admin"
                className="hover:text-[#E6AF2E] transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShieldIcon className="h-4 w-4 mr-1" />
                Admin
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
