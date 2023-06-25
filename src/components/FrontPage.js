import React from 'react';
import HeroBanner from './FrontPage/HeroBanner';
import Services from './wordpress/Services';
import Testimonials from './FrontPage/Testimonials';
import FeatureSection from './wordpress/Feature';
import PostList from './wordpress/posts/Posts';
import Portfolio from './wordpress/Portfolio';


const FrontPage = () => {
  return (
   <div>
    
    <HeroBanner/>
    <Services/>
    <Testimonials/>
    <Portfolio/>
    <FeatureSection/>
    <PostList/>
   </div>
  );
};

export default FrontPage;
