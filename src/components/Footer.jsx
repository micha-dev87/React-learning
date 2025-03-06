import React from 'react';
import { 
  Phone, 
  Mail, 
  Github, 
  Linkedin, 
  MapPin, 
  Code,
  ArrowUp
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-neutral text-neutral-content" id="contact">
      <div className="container mx-auto">
        <div className="footer p-10">
          <div>
            <span className="footer-title opacity-100 text-primary">Mon Portfolio</span>
            <div className="flex items-center gap-2 mt-2">
              <Code size={20} className="text-primary" />
              <span className="text-lg font-bold">Développeur Web Full-Stack</span>
            </div>
            <p className="max-w-xs mt-2 opacity-80">
              Création d'applications web modernes, performantes et accessibles pour transformer vos idées en réalité.
            </p>
          </div>
          <div>
            <span className="footer-title opacity-100 text-primary">Contact</span>
            <a className="link link-hover flex items-center gap-2">
              <Phone size={16} />
              <span>+1 (123) 456-7890</span>
            </a>
            <a href="mailto:contact@example.com" className="link link-hover flex items-center gap-2">
              <Mail size={16} />
              <span>contact@example.com</span>
            </a>
            <a className="link link-hover flex items-center gap-2">
              <MapPin size={16} />
              <span>Montréal, QC</span>
            </a>
          </div>
          <div>
            <span className="footer-title opacity-100 text-primary">Social</span>
            <div className="grid grid-flow-col gap-4">
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-square">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-square">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center p-4 bg-neutral-focus text-neutral-content">
          <div className="text-sm">
            © {new Date().getFullYear()} - Tous droits réservés
          </div>
          <button 
            onClick={scrollToTop} 
            className="btn btn-circle btn-primary btn-sm"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
