import React from 'react';

const FeatureSection = () => {
  const features = [
    {
      title: 'Responsive Design',
      description: 'Create visually stunning websites that adapt seamlessly to different screen sizes and devices. Deliver a consistent user experience across desktop, tablet, and mobile.',
      icon: 'fa fa-laptop' // Use appropriate icon class from Font Awesome or any other icon library
    },
    {
      title: 'Customizable Themes',
      description: 'Design unique and captivating websites using customizable themes. Tailor the look and feel of each project to match the brand identity and client requirements.',
      icon: 'fa fa-paint-brush' // Use appropriate icon class from Font Awesome or any other icon library
    },
    {
      title: 'Optimized Performance',
      description: 'Ensure fast loading times and smooth browsing experiences. Optimize images, minimize code, and implement caching techniques to maximize website performance.',
      icon: 'fa fa-tachometer' // Use appropriate icon class from Font Awesome or any other icon library
    }
  ];

  return (
    <section className="feature-section bg-gray-100 py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div className="bg-white p-6 rounded-lg shadow-md" key={index}>
              <i className={feature.icon + " text-blue-500 text-4xl mb-4"}></i>
              <h3 className="text-heading text-2xl font-heading mb-2">{feature.title}</h3>
              <p className="text-default">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
