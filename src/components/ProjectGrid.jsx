import React, { useState, useEffect } from 'react';
import { ExternalLink, Code, Loader } from 'lucide-react';

// Mock data for development
const MOCK_DATA = [
  {
    id: 1,
    title: { rendered: "Portfolio Website" },
    imageUrl: "https://picsum.photos/800/600?random=1",
    acf: {
      projet_made_with: ["React", "Tailwind CSS", "DaisyUI"],
      projet_description: "A responsive portfolio website showcasing my development projects and skills.",
      projet_url: "https://example.com/portfolio"
    }
  },
  {
    id: 2,
    title: { rendered: "E-commerce Platform" },
    imageUrl: "https://picsum.photos/800/600?random=2",
    acf: {
      projet_made_with: ["Next.js", "MongoDB", "Stripe"],
      projet_description: "A full-featured e-commerce platform with product listing, cart functionality, and payment processing.",
      projet_url: "https://example.com/ecommerce"
    }
  },
  {
    id: 3,
    title: { rendered: "Weather Application" },
    imageUrl: "https://picsum.photos/800/600?random=3",
    acf: {
      projet_made_with: ["JavaScript", "OpenWeather API", "CSS"],
      projet_description: "Weather forecast application showing current conditions and 5-day forecast for any location.",
      projet_url: "https://example.com/weather"
    }
  },
  {
    id: 4,
    title: { rendered: "Task Management App" },
    imageUrl: "https://picsum.photos/800/600?random=4",
    acf: {
      projet_made_with: ["Vue.js", "Firebase", "Vuetify"],
      projet_description: "A kanban-style task management application with real-time updates and team collaboration features.",
      projet_url: "https://example.com/tasks"
    }
  },
  {
    id: 5,
    title: { rendered: "Movie Database" },
    imageUrl: "https://picsum.photos/800/600?random=5",
    acf: {
      projet_made_with: ["React", "TMDB API", "Styled Components"],
      projet_description: "Browse and search movies and TV shows with ratings, trailers, and cast information.",
      projet_url: "https://example.com/movies"
    }
  },
  {
    id: 6,
    title: { rendered: "Fitness Tracker" },
    imageUrl: "https://picsum.photos/800/600?random=6",
    acf: {
      projet_made_with: ["React Native", "GraphQL", "TypeScript"],
      projet_description: "Mobile app for tracking workouts, nutrition, and fitness goals with personalized recommendations.",
      projet_url: "https://example.com/fitness"
    }
  }
];

// Set to true to use mock data, false to use API
const USE_MOCK_DATA = true;

const ProjectGrid = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      if (USE_MOCK_DATA) {
        // Use mock data
        setProjects(MOCK_DATA);
        setLoading(false);
        return;
      }
      
      try {
        // Fetch projects data
        const projectsResponse = await fetch('https://wordpress-data.free.nf/proxy-api.php/wp/v2/projet');
        if (!projectsResponse.ok) {
          throw new Error('Failed to fetch projects');
        }
        const projectsData = await projectsResponse.json();

        // Fetch image data for each project
        const projectsWithImages = await Promise.all(
          projectsData.map(async (project) => {
            if (project.acf && project.acf.projet_image) {
              try {
                const imageResponse = await fetch(`https://wordpress-data.free.nf/proxy-api.php/wp/v2/media/${project.acf.projet_image}`);
                if (imageResponse.ok) {
                  const imageData = await imageResponse.json();
                  return {
                    ...project,
                    imageUrl: imageData.media_details?.sizes?.large?.source_url || imageData.source_url
                  };
                }
              } catch (err) {
                console.error(`Error fetching image for project ${project.id}:`, err);
              }
            }
            return project;
          })
        );

        setProjects(projectsWithImages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

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
          {project.imageUrl && (
            <figure className="h-48 overflow-hidden">
              <img 
                src={project.imageUrl} 
                alt={project.title.rendered} 
                className="w-full h-full object-cover" 
              />
            </figure>
          )}
          <div className="card-body">
            <h2 className="card-title" dangerouslySetInnerHTML={{ __html: project.title.rendered }} />
            
            {project.acf?.projet_made_with && (
              <div className="flex flex-wrap gap-1 my-2">
                {project.acf.projet_made_with.map((tech, index) => (
                  <span key={index} className="badge badge-accent badge-sm gap-1">
                    <Code size={12} />
                    {tech}
                  </span>
                ))}
              </div>
            )}
            
            {project.acf?.projet_description && (
              <p className="text-sm opacity-80 line-clamp-3">{project.acf.projet_description}</p>
            )}
            
            {project.acf?.projet_url && (
              <div className="card-actions justify-end mt-4">
                <a 
                  href={project.acf.projet_url} 
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
