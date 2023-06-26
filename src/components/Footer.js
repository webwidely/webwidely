import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-700 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="text-white mb-4 md:mb-0">© {currentYear} webwidely | All rights reserved.</div>
          <div className="flex space-x-4">
            <Link to="/terms" className="text-white hover:text-green-300">Terms of Service</Link>
            <Link to="/privacy" className="text-white hover:text-green-300">Privacy Policy</Link>
            <Link to="/contact" className="text-white hover:text-green-300">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
