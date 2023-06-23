import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [featuredImage, setFeaturedImage] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://pay.webwidely.com/wp-json/wp/v2/posts?slug=${id}&_embed`);
        if (response.data && response.data.length > 0) {
          setPost(response.data[0]);
          if (response.data[0]._embedded && response.data[0]._embedded['wp:featuredmedia']) {
            const featuredMediaUrl = response.data[0]._embedded['wp:featuredmedia'][0].source_url;
            setFeaturedImage(featuredMediaUrl);
          }
        } else {
          // Handle case where the post is not found
          console.error('Post not found');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div
        className="relative flex items-center justify-center"
        style={{
          backgroundImage: `url(${featuredImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '400px', // Adjust the height as desired (400px - 450px)
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Added box shadow
        }}
      >
        <div className="absolute inset-0 bg-green-500 opacity-75" /> {/* Updated color to green-500 */}
        <h2 className="text-white text-4xl font-bold p-4 relative z-10 text-center">
          
          <div dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        </h2> {/* Added relative and z-10 classes */}
      </div>
      <div className="container mx-auto px-4 py-8 max-w-3xl"> {/* Added container and max width styles */}
        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      </div>
    </div>
  );
};

export default PostDetail;
