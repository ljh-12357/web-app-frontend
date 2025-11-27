import { Link } from 'react-router-dom';
import './BlogCard.css';

const BlogCard = ({ post }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).toUpperCase();
  };

  return (
    <Link to={`/blog/${post._id}`} className="blog-card pixel-card">
      <div className="blog-meta">
        <span className="blog-date">{formatDate(post.createdAt)}</span>
        <span className="blog-author">@{post.author?.username || 'anonymous'}</span>
      </div>
      <h3 className="blog-title">{post.title}</h3>
      <p className="blog-excerpt">
        {post.content.length > 150
          ? post.content.substring(0, 150) + '...'
          : post.content}
      </p>
      <div className="blog-read-more">
        {'>'} READ MORE {'<'}
      </div>
    </Link>
  );
};

export default BlogCard;
