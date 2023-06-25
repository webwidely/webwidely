import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get('https://pay.webwidely.com/wp-json/jet-cct/portfolio')
      .then((response) => setProjects(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <section className="portfolio-section py-12">
      <div className="container mx-auto">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-8 text-green-500">My Portfolio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project._ID} className="portfolio-item bg-green-100 rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
              <a
                href={project.liveurl}
                target="_blank"
                rel="noopener noreferrer"
                
              >
                <img
                  src={project.imageurl.url}
                  alt={project.title}
                  className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                />
                </a>
              </div>
              <div className='p-4'>
              <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: project.description }}></p>
              <a
                href={project.liveurl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-200"
              >
                View Live
              </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
