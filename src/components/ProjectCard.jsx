import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card pixel-card">
      <div className="project-image">
        {project.imageUrl ? (
          <img src={project.imageUrl} alt={project.title} />
        ) : (
          <div className="project-placeholder">
            <span>[NO IMG]</span>
          </div>
        )}
      </div>
      <div className="project-info">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="project-links">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-btn pixel-btn-small"
            >
              [CODE]
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-btn pixel-btn-small pixel-btn-secondary"
            >
              [LIVE]
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
