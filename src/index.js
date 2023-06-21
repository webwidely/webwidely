import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './custom.css';
import Header from './components/Header';
import Footer from './components/Footer';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    
    <Footer/>
  </React.StrictMode>,
  document.getElementById('root')
);
