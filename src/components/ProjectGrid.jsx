import React, { useState, useEffect } from 'react';
import { ExternalLink, Code, Loader, GitBranchPlus } from 'lucide-react';
// Assurez-vous que le chemin est correct pour la structure de votre projet
import projectData from '/data/projet.json';

const ProjectGrid = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Utiliser les données JSON locales
      console.log('Données du projet chargées :', projectData);
      setProjects(projectData);
    } catch (err) {
      console.error('Erreur lors du chargement des données du projet :', err);
      setError('Échec du chargement des données du projet : ' + err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fonction d'aide pour obtenir la meilleure taille d'image disponible et transformer l'URL
  const getBestImageUrl = (imageObj) => {
    if (!imageObj) return null;
    
    let imageUrl = null;
    
    // Essayer d'obtenir d'abord une image medium_large ou large pour une meilleure qualité
    if (imageObj) {
      imageUrl = imageObj;
    }
    
    // Transformer l'URL pour le développement et la production
    if (imageUrl) {
      // Remplacer l'URL WordPress par le chemin local si elle contient le lien spécifique
      const localPath = imageUrl.includes('https://wordpress-data.free.nf/wp-content/') 
        ? imageUrl.replace('https://wordpress-data.free.nf/wp-content/', '') 
        : imageUrl;
      
      // Gérer les chemins de développement et de production
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
        <span>Échec du chargement des projets : {error}</span>
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
                  console.error(`Échec du chargement de l'image pour le projet ${project.id}`);
                  // Utiliser une image de secours
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
                  {project.fields.projet_url.includes('github') ? <GitBranchPlus size={16} /> : <ExternalLink size={16} />}
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
