import React, { useState, useEffect } from 'react';
import { ExternalLink, Code, Loader } from 'lucide-react';
// Make sure the path is correct for your project structure
import projectData from '/data/projet.json';

const ProjectGrid = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Use local JSON data
      console.log('Project data loaded:', projectData);
      setProjects(projectData);
    } catch (err) {
      console.error('Error loading project data:', err);
      setError('Failed to load project data: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Helper function to get the best available image size and transform the URL
  const getBestImageUrl = (imageObj) => {
    if (!imageObj) return null;
    
    let imageUrl = null;
    
    // Try to get medium_large or large image first for better quality
    if (imageObj.sizes && imageObj.sizes.medium_large) imageUrl = imageObj.sizes.medium_large;
    else if (imageObj.sizes && imageObj.sizes.thumbnail) imageUrl = imageObj.sizes.thumbnail;
    else if (imageObj.sizes && imageObj.sizes.large) imageUrl = imageObj.sizes.large;
    else if (imageObj.sizes && imageObj.sizes.medium) imageUrl = imageObj.sizes.medium;
    else if (imageObj.url) imageUrl = imageObj.url;
    else return null;
    
    // Transform the URL for both development and production
    if (imageUrl) {
      // Replace WordPress URL with local path
      const localPath = imageUrl.replace('https://wordpress-data.free.nf/wp-content/', '');
      
      // Handle both development and production paths
      return localPath;
    }
    
    return null;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader className="animate-spin w-12 h-12 text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error shadow-lg">
        <span>Failed to load projects: {error}</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div key={project.id} className="card glass hover:shadow-xl transition-all hover:-translate-y-1">
          {project.fields?.projet_image && (
            <div className="h-48 overflow-hidden">
              <img 
                src={getBestImageUrl(project.fields.projet_image)}
                alt={project.title} 
                className="w-full h-full object-cover" 
                onError={(e) => {
                  console.error(`Failed to load image for project ${project.id}`);
                  // Utiliser une image de fallback
                  e.target.src = '/placeholder.jpg';
                }}
              />
            </div>
          )}
          <div className="card-body">
            <h2 className="card-title" dangerouslySetInnerHTML={{ __html: project.title }} />
            
            {project.fields?.projet_made_with && (
              <div className="flex flex-wrap gap-1 my-2">
                {project.fields.projet_made_with.map((tech, index) => (
                  <span key={index} className="badge badge-accent badge-sm gap-1">
                    <Code size={12} />
                    {tech}
                  </span>
                ))}
              </div>
            )}
            
            {project.fields?.projet_description && (
              <p className="text-sm opacity-80 line-clamp-3">{project.fields.projet_description}</p>
            )}
            
            {project.fields?.projet_url && project.fields.projet_url !== "" && (
              <div className="card-actions justify-end mt-4">
                <a 
                  href={project.fields.projet_url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm gap-2"
                >
                  Voir le projet
                  <ExternalLink size={16} />
                </a>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectGrid;
