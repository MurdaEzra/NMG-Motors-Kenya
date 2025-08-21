import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneIcon, MailIcon, MapPinIcon, FacebookIcon, InstagramIcon, TwitterIcon } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-[#001514] text-[#FBFFFE]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#E6AF2E]">
              NMG MOTORS KENYA
            </h3>
            <p className="mb-4">
              Your trusted partner for quality vehicles in Kenya. We provide a
              wide range of cars with excellent service and support.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="hover:text-[#E6AF2E]" aria-label="Facebook">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" className="hover:text-[#E6AF2E]" aria-label="Instagram">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="hover:text-[#E6AF2E]" aria-label="Twitter">
                <TwitterIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#E6AF2E]">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-[#E6AF2E] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/vehicles" className="hover:text-[#E6AF2E] transition-colors">
                  Vehicles
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#E6AF2E] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#E6AF2E] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#E6AF2E]">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <MapPinIcon className="h-5 w-5 mr-2 text-[#E6AF2E]" />
                <span>47529, Kiambu Rd, Kenya</span>
              </li>
              <li className="flex items-center">
                <PhoneIcon className="h-5 w-5 mr-2 text-[#E6AF2E]" />
                <span>+254 711675704</span>
              </li>
              <li className="flex items-center">
                <MailIcon className="h-5 w-5 mr-2 text-[#E6AF2E]" />
                <span>nmgmotorskenya@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#A3320B]/20 mt-8 pt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} NMG Motors Kenya. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;