import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          'https://pay.webwidely.com/wp-json/wp/v2/posts?_embed'
        );
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 my-8">
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-8">Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow-lg rounded-lg">
            {post._embedded && post._embedded['wp:featuredmedia'] && (
              <div style={{ maxHeight: '200px', overflow: 'hidden' }}>
                <img
                  src={post._embedded['wp:featuredmedia'][0].source_url}
                  alt={post.title.rendered}
                  className="object-cover w-full"
                />
              </div>
            )}
            <div className="p-6">
              <h3
                className="text-xl font-bold mb-2"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
              <p
                className="text-gray-600 mb-4"
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              />
              <Link
                to={`/posts/${post.slug}`}
                className="bg-green-500 text-white px-4 py-2 rounded-lg inline-block transition-colors duration-300 ease-in-out hover:bg-green-600"
              >
                Read more
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
