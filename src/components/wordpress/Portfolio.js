import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('https://pay.webwidely.com/wp-json/jet-cct/portfolio')
      .then(response => setProjects(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <section className="portfolio-section py-12">
      <div className="container mx-auto">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-8">My Portfolio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <div key={project._ID} className="portfolio-item">
              <img src={project.imageurl.url} alt={project.title} className="w-full mb-4" />
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="text-default mb-4" dangerouslySetInnerHTML={{ __html: project.description }}></p>
              <a href={project.liveurl} target="_blank" rel="noopener noreferrer" className="text-blue-500">View Live</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
