import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(
          'https://webwidely.com/wp-json/jet-cct/testimonials'
        );
        setTestimonials(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTestimonials();
  }, []);

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
  };

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <button
        className="slick-prev"
        onClick={onClick}
        style={{
          display: "block",
          background: "red", // Replace with your desired background color
          width: "40px", // Adjust the arrow size as needed
          height: "40px",
          borderRadius: "50%",
        }}
      />
    );
  }

  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <button
        className="slick-next"
        onClick={onClick}
        style={{
          display: "block",
          background: "blue", // Replace with your desired background color
          width: "40px", // Adjust the arrow size as needed
          height: "40px",
          borderRadius: "50%",
        }}
      />
    );
  }

  const renderTestimonialContent = (content) => {
    return { __html: content };
  };

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center text-gray-800 mb-8">
          Testimonials
        </h2>
        <div className="testimonial-slider">
          <Slider {...settings}>
            {testimonials.map((testimonial) => (
              <div key={testimonial._ID} className="testimonial-item">
                <div className="testimonial-content" style={{ backgroundColor: "#f8f8f8" }}>
                  <div className="testimonial-avatar">
                    <img
                      src={testimonial.avatar.url}
                      alt={testimonial.name}
                      className="testimonial-avatar-img"
                    />
                  </div>
                  <h3 className="testimonial-name text-xl font-bold mb-2">{testimonial.name}</h3>
                  <p className="testimonial-company text-gray-500">{testimonial.company}</p>
                  <p
                    className="testimonial-text text-gray-800 mb-4"
                    dangerouslySetInnerHTML={renderTestimonialContent(testimonial.content)}
                  />
                  <div className="testimonial-rating flex justify-center mt-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`testimonial-star ${
                          star <= testimonial.rating ? 'filled' : ''
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        width="20" // Adjust the size of the stars as needed
                        height="20"
                      >
                        <path
                          d="M10 1l2.598 6.683 7.162.052c.65.005.92.849.406 1.274l-5.477 4.642 1.743 7.1c.127.513-.45.938-.92.633L10 17.427l-6.62 3.055c-.47.274-1.046-.12-.92-.633l1.743-7.1-5.477-4.642c-.514-.425-.244-1.27.406-1.274l7.162-.052L10 1z"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
