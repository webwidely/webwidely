import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-700 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="text-white mb-4 md:mb-0">© {currentYear} webwidely | All rights reserved.</div>
          <div className="flex space-x-4">
            <a href="googl.com" className="text-white hover:text-green-300">Terms of Service</a>
            <a href="go.com" className="text-white hover:text-green-300">Privacy Policy</a>
            <a href="goo.com" className="text-white hover:text-green-300">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
