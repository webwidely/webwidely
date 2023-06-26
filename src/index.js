import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './custom.css';
import Header from './components/Header';
import Footer from './components/Footer';
import FiverrWidget from './components/FrontPage/FiverrWidget';
import RoutesComponent from './components/routes';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
  <React.StrictMode>
    <Header />
    <a href="https://www.fiverr.com/webpet" target="_blank" rel="noopener noreferrer"><FiverrWidget/></a>
    <RoutesComponent />
    <Footer/>
  </React.StrictMode>
  </Router>,
  document.getElementById('root')
);
