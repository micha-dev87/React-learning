import React from 'react';
import ProjectGrid from './ProjectGrid';
import { Terminal } from 'lucide-react';

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Mes Projets
            </span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto opacity-80">
            Découvrez une sélection de mes réalisations récentes, mettant en œuvre diverses technologies et solutions innovantes.
          </p>
        </div>
        
        <ProjectGrid />
      </div>
    </section>
  );
};

export default ProjectsSection;
