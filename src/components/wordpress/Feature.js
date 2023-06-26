import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeatureSection = () => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    axios
      .get('https://pay.webwidely.com/wp-json/jet-cct/features')
      .then(response => setFeatures(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <section
      className="feature-section py-12"
      style={{
        backgroundImage: "url('https://wallpapers.com/images/hd/green-nature-growing-bud-tznv5b438x1coib5.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-center mb-8">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div className="bg-white p-6 rounded-lg shadow-md relative overflow-hidden group" key={index} style={{
              background: "rgba(255, 255, 255, 0.5)",
              webkitBackdropFilter: "blur(10px)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              padding: "1rem",
            }}>
              <div className="w-24 h-24 bg-white rounded-full shadow-lg border-2 border-green-500 mb-4 overflow-hidden">
                <img
                  src={feature.icon.url}
                  alt={feature.title}
                  className="w-32 h-32 object-cover object-center"
                />
              </div>
              <h4 className="text-heading text-lg font-heading mb-2">{feature.title}</h4>
              <p className="text-default" dangerouslySetInnerHTML={{ __html: feature.content }}></p>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
