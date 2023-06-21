import React from 'react';

const FrontPage = () => {
  return (
    <div
      className="hero-banner bg-green-500 flex items-center justify-center"
      style={{ height: '70vh' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl text-white font-bold leading-tight mb-8">
            Unlock Your Online Potential
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl text-green-200 mb-10">
            Elevate Your Business with Modern and Dynamic Website Solutions
          </p>
          <button className="bg-white text-green-700 hover:bg-green-600 hover:text-white py-3 px-8 rounded-lg text-xl font-medium">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
