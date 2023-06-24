import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          'https://webwidely.com/wp-json/jet-cct/services'
        );
        setServices(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchServices();
  }, []);

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center text-gray-800 mb-8">
          Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service._ID}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between items-start transition duration-300 hover:bg-green-500 hover:bg-opacity-10"
            >
              <div>
                <div className="w-24 h-24 bg-white rounded-full shadow-lg border-2 border-green-500 mb-4 overflow-hidden">
                  <img
                    src={service.svg_media.url}
                    alt={service.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                <div
                  className="text-gray-700 description"
                  dangerouslySetInnerHTML={{ __html: service.description }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
