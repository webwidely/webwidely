import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Terms = () => {
  const [pageContent, setPageContent] = useState('');

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await axios.get(
          'https://pay.webwidely.com/wp-json/wp/v2/pages/272'
        );
        setPageContent(response.data.content.rendered);
      } catch (error) {
        console.error('Error fetching WordPress page:', error);
      }
    };

    fetchPage();
  }, []);

  return (
    <section>
      <div className="h-64 mx-auto px-4 sm:px-6 lg:px-8 bg-green-500 flex justify-center items-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-center mb-8">Terms and Service</h1>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
        <div dangerouslySetInnerHTML={{ __html: pageContent }} />
      </div>
    </section>
  );
};

export default Terms;
