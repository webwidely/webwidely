import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FrontPage from './FrontPage';
import PostList from './wordpress/posts/Posts';
import PostDetail from './wordpress/posts/PostDetail';
import DownloadSvg from './DownloadSvg';
import TextTransformer from './Converter';
import Portfolio from './wordpress/Portfolio';
import Terms from './wordpress/Terms';
import NotFound from './NotFound';


const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<FrontPage />} />
      <Route path="/DownloadSvg" element={<DownloadSvg />} />
      <Route path="/TextTransformer" element={<TextTransformer />} />
      <Route path="/posts" element={<PostList numberOfPosts={9} />} />
      <Route path="/posts/:id" element={<PostDetail />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesComponent;
