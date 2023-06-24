import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './custom.css';
import Header from './components/Header';
import Footer from './components/Footer';
import FiverrWidget from './components/FrontPage/FiverrWidget';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <a href="https://www.fiverr.com/webpet" target="_blank" rel="noopener noreferrer"><FiverrWidget/></a>
    <Footer/>
  </React.StrictMode>,
  document.getElementById('root')
);
