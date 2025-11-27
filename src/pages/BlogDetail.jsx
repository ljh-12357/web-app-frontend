import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogAPI, commentsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './BlogDetail.css';

const BlogDetail = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentBody, setCommentBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [commentError, setCommentError] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).toUpperCase();
  };

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await blogAPI.getById(id);
      setPost(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load blog post. It may not exist.');
      console.error('Error fetching post:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentBody.trim()) return;

    try {
      setSubmitting(true);
      setCommentError(null);
      await commentsAPI.create(id, { body: commentBody });
      setCommentBody('');
      fetchPost(); // Refresh to get new comment
    } catch (err) {
      setCommentError('Failed to post comment. Please try again.');
      console.error('Error posting comment:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="blog-detail-page page-wrapper">
        <div className="container">
          <div className="pixel-loading">LOADING POST...</div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="blog-detail-page page-wrapper">
        <div className="container">
          <div className="pixel-error">[ERROR] {error || 'Post not found'}</div>
          <Link to="/blog" className="pixel-btn mt-20">
            {'<'} BACK TO BLOG
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-detail-page page-wrapper">
      <div className="container">
        <Link to="/blog" className="back-link">
          {'<'} BACK TO BLOG
        </Link>

        <article className="blog-article pixel-card">
          <header className="article-header">
            <div className="article-meta">
              <span className="article-date">{formatDate(post.createdAt)}</span>
              <span className="article-author">BY @{post.author?.username || 'anonymous'}</span>
            </div>
            <h1 className="article-title">{post.title}</h1>
          </header>

          <div className="article-content">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>

        <section className="comments-section">
          <h2 className="pixel-subtitle">
            {'>'} COMMENTS ({post.comments?.length || 0})
          </h2>

          {isAuthenticated ? (
            <form onSubmit={handleCommentSubmit} className="comment-form pixel-card">
              <label className="pixel-label">ADD A COMMENT:</label>
              <textarea
                className="pixel-textarea"
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                placeholder="TYPE YOUR COMMENT HERE..."
                required
              />
              {commentError && (
                <div className="pixel-error">{commentError}</div>
              )}
              <button
                type="submit"
                className="pixel-btn"
                disabled={submitting}
              >
                {submitting ? 'POSTING...' : 'POST COMMENT'}
              </button>
            </form>
          ) : (
            <div className="login-prompt pixel-card">
              <p>YOU MUST BE LOGGED IN TO COMMENT.</p>
              <Link to="/login" className="pixel-btn pixel-btn-small">
                LOGIN
              </Link>
            </div>
          )}

          <div className="comments-list">
            {post.comments?.length === 0 && (
              <p className="no-comments">NO COMMENTS YET. BE THE FIRST!</p>
            )}
            {post.comments?.map((comment) => (
              <div key={comment._id} className="comment-item pixel-card">
                <div className="comment-header">
                  <span className="comment-author">@{comment.author?.username}</span>
                  <span className="comment-date">{formatDate(comment.createdAt)}</span>
                </div>
                <p className="comment-body">{comment.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogDetail;
