import React from 'react';
import {
  Code,
  Database,
  Globe,
  PenTool,
  Server,
  Terminal,
  Layers,
  Smartphone
} from 'lucide-react';

const skills = [ 
  {
    category: "Frontend",
    icon: <Globe className="w-6 h-6 text-primary" />,
    technologies: ["React", "VueJS", "TypeScript", "JavaScript", "HTML/CSS", "TailwindCSS", "Bootstrap", "Ajax", "jQuery", "React Native", "Expo"]
  },
  {
    category: "Backend",
    icon: <Server className="w-6 h-6 text-primary" />,
    technologies: ["PHP", "C#", "JAVA", "ASP.NET/MVC", "ASP.NET/CORE", "JAKARTA EE", "Spring MVC", "Hibernate"]
  },
  {
    category: "Base de données",
    icon: <Database className="w-6 h-6 text-primary" />,
    technologies: ["SQL", "MySQL", "ADO/NET", "Entity Framework Core", "LINQ", "Modélisation de données"]
  },
  {
    category: "Services Web & Outils",
    icon: <Terminal className="w-6 h-6 text-primary" />,
    technologies: ["RESTful", "SOAP", "SpringBoot", "Docker", "Git", "WordPress", "UML"]
  }
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">À propos de moi</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto opacity-80">
            Diplômé AEC en Programmation Web (2025) avec plus de 3 ans d'expérience en développement PHP,
            administration de bases de données et création d'applications web full-stack.
          </p>
        </div>

        <div className="card glass bg-base-100/50 backdrop-blur-sm shadow-xl max-w-4xl mx-auto overflow-hidden">
          <div className="card-body p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Code className="text-primary" />
                  Développeur Web Full-Stack
                </h3>
                <p className="mb-6 opacity-80">
                  Développeur web full-stack diplômé du programme AEC en Programmation des technologies Web
                  au Cégep Gérald-Godin (juin 2025). Passionné par la conception d'applications modernes et
                  performantes, je maîtrise le développement frontend et backend afin de créer des solutions
                  complètes, efficaces et adaptées aux besoins des utilisateurs.
                </p>
                <div className="flex flex-wrap gap-2">
                  <div className="badge badge-primary badge-outline p-3">Responsive Design</div>
                  <div className="badge badge-primary badge-outline p-3">API Integration</div>
                  <div className="badge badge-primary badge-outline p-3">Database Architecture</div>
                  <div className="badge badge-primary badge-outline p-3">UI/UX</div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 md:p-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Terminal className="text-primary" />
                  Expertise Technique
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-primary" />
                    <span className="font-medium">Architecture Modulaire</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-primary" />
                    <span className="font-medium">Développement Mobile</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Server className="w-5 h-5 text-primary" />
                    <span className="font-medium">API RESTful</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-primary" />
                    <span className="font-medium">Optimisation de Performance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div key={index} className="card bg-base-100 shadow-lg hover:shadow-xl transition-all">
              <div className="card-body">
                <h3 className="card-title flex items-center gap-2 mb-4">
                  {skill.icon}
                  {skill.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skill.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="badge badge-ghost">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
