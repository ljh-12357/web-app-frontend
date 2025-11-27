import { useState, useEffect } from 'react';
import { blogAPI } from '../services/api';
import BlogCard from '../components/BlogCard';
import './Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await blogAPI.getAll();
        setPosts(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load blog posts. Please try again later.');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="blog-page page-wrapper">
      <div className="container">
        <div className="page-header">
          <h1 className="pixel-title">~ KAWAII BLOG ~</h1>
          <p className="page-description">
            CUTE THOUGHTS, TUTORIALS, AND CODING ADVENTURES
            <br />
            SHARING MY JOURNEY WITH LOVE ♥
          </p>
        </div>

        {loading && (
          <div className="pixel-loading">
            LOADING POSTS...
          </div>
        )}

        {error && (
          <div className="pixel-error">
            [ERROR] {error}
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="empty-state pixel-card">
            <p>[NO POSTS FOUND]</p>
            <p className="empty-hint">CHECK BACK LATER FOR NEW CONTENT!</p>
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="blog-list">
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
