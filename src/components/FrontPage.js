import React from 'react';
import HeroBanner from './FrontPage/HeroBanner';
import Services from './wordpress/Services';
import Testimonials from './FrontPage/Testimonials';
import FeatureSection from './FrontPage/Feature';
import PostList from './wordpress/posts/Posts';


const FrontPage = () => {
  return (
   <div>
    <HeroBanner/>
    <Services/>
    <Testimonials/>
    <FeatureSection/>
    <PostList/>
   </div>
  );
};

export default FrontPage;
