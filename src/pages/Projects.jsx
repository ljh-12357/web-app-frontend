import { useState, useEffect } from 'react';
import { projectsAPI } from '../services/api';
import ProjectCard from '../components/ProjectCard';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await projectsAPI.getAll();
        setProjects(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load projects. Please try again later.');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="projects-page page-wrapper">
      <div className="container">
        <div className="page-header">
          <h1 className="pixel-title">~ MY PROJECTS ~</h1>
          <p className="page-description">
            HERE ARE SOME CUTE PROJECTS I'VE CREATED WITH LOVE!
            <br />
            EACH ONE WAS BUILT WITH PASSION AND PIXEL PERFECTION ♥
          </p>
        </div>

        {loading && (
          <div className="pixel-loading">
            LOADING PROJECTS...
          </div>
        )}

        {error && (
          <div className="pixel-error">
            [ERROR] {error}
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="empty-state pixel-card">
            <p>[NO PROJECTS FOUND]</p>
            <p className="empty-hint">CHECK BACK LATER FOR NEW PROJECTS!</p>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="pixel-grid">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
