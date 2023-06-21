import React from 'react';
import HeroBanner from './FrontPage/HeroBanner';
import Services from './wordpress/Services';
import Testimonials from './FrontPage/Testimonials';


const FrontPage = () => {
  return (
   <div>
    <HeroBanner/>
    <Services/>
    <Testimonials/>
   </div>
  );
};

export default FrontPage;
