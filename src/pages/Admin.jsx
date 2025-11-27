import { useState, useEffect } from 'react';
import { projectsAPI, blogAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './Admin.css';

const Admin = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('projects');

  // Projects state
  const [projects, setProjects] = useState([]);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
    repoUrl: '',
    liveUrl: ''
  });
  const [editingProject, setEditingProject] = useState(null);

  // Blog state
  const [posts, setPosts] = useState([]);
  const [postForm, setPostForm] = useState({
    title: '',
    content: ''
  });
  const [editingPost, setEditingPost] = useState(null);

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch data
  useEffect(() => {
    fetchProjects();
    fetchPosts();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await blogAPI.getAll();
      setPosts(response.data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  const showMessage = (type, message) => {
    if (type === 'error') {
      setError(message);
      setSuccess(null);
    } else {
      setSuccess(message);
      setError(null);
    }
    setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 3000);
  };

  // Project handlers
  const handleProjectChange = (e) => {
    setProjectForm({
      ...projectForm,
      [e.target.name]: e.target.value
    });
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingProject) {
        await projectsAPI.update(editingProject._id, projectForm);
        showMessage('success', 'PROJECT UPDATED SUCCESSFULLY!');
      } else {
        await projectsAPI.create(projectForm);
        showMessage('success', 'PROJECT CREATED SUCCESSFULLY!');
      }
      setProjectForm({ title: '', description: '', imageUrl: '', repoUrl: '', liveUrl: '' });
      setEditingProject(null);
      fetchProjects();
    } catch (err) {
      showMessage('error', err.response?.data?.message || 'Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl || '',
      repoUrl: project.repoUrl || '',
      liveUrl: project.liveUrl || ''
    });
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('ARE YOU SURE YOU WANT TO DELETE THIS PROJECT?')) return;

    try {
      await projectsAPI.delete(id);
      showMessage('success', 'PROJECT DELETED!');
      fetchProjects();
    } catch (err) {
      showMessage('error', err.response?.data?.message || 'Failed to delete project');
    }
  };

  const cancelProjectEdit = () => {
    setEditingProject(null);
    setProjectForm({ title: '', description: '', imageUrl: '', repoUrl: '', liveUrl: '' });
  };

  // Blog handlers
  const handlePostChange = (e) => {
    setPostForm({
      ...postForm,
      [e.target.name]: e.target.value
    });
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingPost) {
        await blogAPI.update(editingPost._id, postForm);
        showMessage('success', 'POST UPDATED SUCCESSFULLY!');
      } else {
        await blogAPI.create(postForm);
        showMessage('success', 'POST CREATED SUCCESSFULLY!');
      }
      setPostForm({ title: '', content: '' });
      setEditingPost(null);
      fetchPosts();
    } catch (err) {
      showMessage('error', err.response?.data?.message || 'Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setPostForm({
      title: post.title,
      content: post.content
    });
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm('ARE YOU SURE YOU WANT TO DELETE THIS POST?')) return;

    try {
      await blogAPI.delete(id);
      showMessage('success', 'POST DELETED!');
      fetchPosts();
    } catch (err) {
      showMessage('error', err.response?.data?.message || 'Failed to delete post');
    }
  };

  const cancelPostEdit = () => {
    setEditingPost(null);
    setPostForm({ title: '', content: '' });
  };

  return (
    <div className="admin-page page-wrapper">
      <div className="container">
        <div className="admin-header">
          <h1 className="pixel-title">{'<'} ADMIN DASHBOARD {'>'}</h1>
          <p className="admin-welcome">WELCOME, @{user?.username}!</p>
        </div>

        {error && <div className="pixel-error">[ERROR] {error}</div>}
        {success && <div className="pixel-success">[SUCCESS] {success}</div>}

        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            [PROJECTS]
          </button>
          <button
            className={`tab-btn ${activeTab === 'blog' ? 'active' : ''}`}
            onClick={() => setActiveTab('blog')}
          >
            [BLOG]
          </button>
        </div>

        {activeTab === 'projects' && (
          <div className="admin-section">
            <div className="admin-grid">
              <div className="admin-form-section pixel-card">
                <h2 className="pixel-subtitle">
                  {editingProject ? '> EDIT PROJECT' : '> NEW PROJECT'}
                </h2>
                <form onSubmit={handleProjectSubmit}>
                  <div className="form-group">
                    <label className="pixel-label">TITLE:</label>
                    <input
                      type="text"
                      name="title"
                      value={projectForm.title}
                      onChange={handleProjectChange}
                      className="pixel-input"
                      placeholder="PROJECT TITLE"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="pixel-label">DESCRIPTION:</label>
                    <textarea
                      name="description"
                      value={projectForm.description}
                      onChange={handleProjectChange}
                      className="pixel-textarea"
                      placeholder="PROJECT DESCRIPTION"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="pixel-label">IMAGE URL:</label>
                    <input
                      type="text"
                      name="imageUrl"
                      value={projectForm.imageUrl}
                      onChange={handleProjectChange}
                      className="pixel-input"
                      placeholder="HTTPS://..."
                    />
                  </div>
                  <div className="form-group">
                    <label className="pixel-label">REPO URL:</label>
                    <input
                      type="text"
                      name="repoUrl"
                      value={projectForm.repoUrl}
                      onChange={handleProjectChange}
                      className="pixel-input"
                      placeholder="HTTPS://GITHUB.COM/..."
                    />
                  </div>
                  <div className="form-group">
                    <label className="pixel-label">LIVE URL:</label>
                    <input
                      type="text"
                      name="liveUrl"
                      value={projectForm.liveUrl}
                      onChange={handleProjectChange}
                      className="pixel-input"
                      placeholder="HTTPS://..."
                    />
                  </div>
                  <div className="form-buttons">
                    <button type="submit" className="pixel-btn" disabled={loading}>
                      {loading ? 'SAVING...' : editingProject ? 'UPDATE' : 'CREATE'}
                    </button>
                    {editingProject && (
                      <button type="button" className="pixel-btn pixel-btn-secondary" onClick={cancelProjectEdit}>
                        CANCEL
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="admin-list-section">
                <h2 className="pixel-subtitle">{'>'} PROJECTS LIST ({projects.length})</h2>
                <div className="admin-list">
                  {projects.map((project) => (
                    <div key={project._id} className="admin-item pixel-card">
                      <h3 className="item-title">{project.title}</h3>
                      <p className="item-preview">{project.description.substring(0, 100)}...</p>
                      <div className="item-actions">
                        <button
                          className="pixel-btn pixel-btn-small"
                          onClick={() => handleEditProject(project)}
                        >
                          EDIT
                        </button>
                        <button
                          className="pixel-btn pixel-btn-small pixel-btn-danger"
                          onClick={() => handleDeleteProject(project._id)}
                        >
                          DELETE
                        </button>
                      </div>
                    </div>
                  ))}
                  {projects.length === 0 && (
                    <p className="empty-list">NO PROJECTS YET. CREATE ONE!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'blog' && (
          <div className="admin-section">
            <div className="admin-grid">
              <div className="admin-form-section pixel-card">
                <h2 className="pixel-subtitle">
                  {editingPost ? '> EDIT POST' : '> NEW POST'}
                </h2>
                <form onSubmit={handlePostSubmit}>
                  <div className="form-group">
                    <label className="pixel-label">TITLE:</label>
                    <input
                      type="text"
                      name="title"
                      value={postForm.title}
                      onChange={handlePostChange}
                      className="pixel-input"
                      placeholder="POST TITLE"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="pixel-label">CONTENT:</label>
                    <textarea
                      name="content"
                      value={postForm.content}
                      onChange={handlePostChange}
                      className="pixel-textarea"
                      placeholder="WRITE YOUR BLOG POST HERE..."
                      style={{ minHeight: '250px' }}
                      required
                    />
                  </div>
                  <div className="form-buttons">
                    <button type="submit" className="pixel-btn" disabled={loading}>
                      {loading ? 'SAVING...' : editingPost ? 'UPDATE' : 'CREATE'}
                    </button>
                    {editingPost && (
                      <button type="button" className="pixel-btn pixel-btn-secondary" onClick={cancelPostEdit}>
                        CANCEL
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="admin-list-section">
                <h2 className="pixel-subtitle">{'>'} BLOG POSTS ({posts.length})</h2>
                <div className="admin-list">
                  {posts.map((post) => (
                    <div key={post._id} className="admin-item pixel-card">
                      <h3 className="item-title">{post.title}</h3>
                      <p className="item-meta">BY @{post.author?.username}</p>
                      <p className="item-preview">{post.content.substring(0, 100)}...</p>
                      <div className="item-actions">
                        <button
                          className="pixel-btn pixel-btn-small"
                          onClick={() => handleEditPost(post)}
                        >
                          EDIT
                        </button>
                        <button
                          className="pixel-btn pixel-btn-small pixel-btn-danger"
                          onClick={() => handleDeletePost(post._id)}
                        >
                          DELETE
                        </button>
                      </div>
                    </div>
                  ))}
                  {posts.length === 0 && (
                    <p className="empty-list">NO POSTS YET. CREATE ONE!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
