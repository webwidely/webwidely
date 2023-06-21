import React, { useState } from 'react';
import logo from './../images/svg/logo.svg';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import TextTransformer from './Converter';
import SimplePage from './TextGenerator';
import FrontPage from './FrontPage/HeroBanner';
import PayMobPaymentComponent from './Payment';

const Header = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
    <nav className="bg-green-700 shadow-lg">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center justify-between w-full">
            <div className="flex-shrink-0">
              <Link to="/">
              <img
                className="h-6"
                src={logo}
                alt="Logo"
              />
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4 main_menu">

              <Link to="/">Home</Link>
                <Link to="/TextTransformer">Convert Case</Link>
                <Link to="/DownloadSvg" >DownloadSvg</Link>
                <Link to="/payment" >Payment</Link>
               
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
          <button onClick={toggleMenu} type="button" class="bg-green-700 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-green-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-700 focus:ring-white">
  <span class="sr-only">Open main menu</span>
  <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
  </svg>
</button>

          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 main_menu_mobile">
        <Link to="/TextTransformer">Convert Case</Link>
                <Link to="/DownloadSvg" >DownloadSvg</Link>
                <Link to="/JetEngineContent">JetEngineContent</Link>
        </div>
      </div>
    </nav>
    <Routes>
    <Route exact path="/" element={<FrontPage/>} />
    <Route path="/DownloadSvg" element={<SimplePage/>} />
    <Route path="/TextTransformer" element={<TextTransformer/>}  />
    <Route path='/payment' element={<PayMobPaymentComponent/>} />
    
    </Routes>
    
    </Router>
  );
};

export default Header;
