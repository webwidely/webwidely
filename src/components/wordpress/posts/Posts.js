import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PostList = ({ numberOfPosts }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `https://pay.webwidely.com/wp-json/wp/v2/posts?_embed&per_page=${numberOfPosts}`
        );
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [numberOfPosts]);

  return (
    <div className="container mx-auto px-4 my-8">
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-8 text-green-500">Latest Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div key={post.id} className="bg-green-100 shadow-lg rounded-lg flex flex-col justify-start overflow-hidden">
            {post._embedded && post._embedded['wp:featuredmedia'] && (
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={post._embedded['wp:featuredmedia'][0].source_url}
                  alt={post.title.rendered}
                  className="object-cover w-full h-48 sm:h-56 lg:h-64"
                />
              </div>
            )}
            <div className="px-6 pt-4">
                <h3
                  className="text-xl font-bold mb-2"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <p
                  className="text-gray-600 mb-4"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
              </div>
            <div className="px-6 py-4 mt-auto">
              
              <div className="border-t border-gray-300 mt-4 pt-4">
                <Link
                  to={`/posts/${post.slug}`}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg inline-block transition-colors duration-300 ease-in-out hover:bg-green-600"
                >
                  Read more
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
