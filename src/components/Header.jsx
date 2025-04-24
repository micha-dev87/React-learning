import React, { useState, useEffect } from 'react';
import { Code, Menu, X, ChevronRight } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Handle scroll effect for transparent to solid header transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Disable scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Handle scroll effect for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100; // Adjust offset as needed

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          // obtenir la position de l'élément par rapport au haut de la page
          const offsetTop = element.offsetTop;
          // obtenir la hauteur de l'élément
          const offsetHeight = element.offsetHeight;
          // si la position de l'élément est supérieure ou égale à la position de l'utilisateur et inférieure à la position de l'élément plus sa hauteur, alors l'élément est actif
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Header height
      // Get the offset of the element from the top of the page
      const bodyRect = document.body.getBoundingClientRect().top;
      // Get the offset of the element from the top of the page
      const elementRect = element.getBoundingClientRect().top;
      // Get the position of the element relative to the top of the page
      const elementPosition = elementRect - bodyRect;
      // Get the offset position of the element relative to the top of the page
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-base-100/95 shadow-lg backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="navbar min-h-16">
          <div className="navbar-start">
            <a className="flex items-center gap-2 text-xl font-bold" href="#" onClick={(e) => { e.preventDefault(); scrollToSection('top'); }}>
              <Code size={24} className="text-primary" />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Mon Portfolio</span>
            </a>
          </div>
          
          {/* Desktop menu */}
          <div className="navbar-end hidden md:flex">
            <ul className="menu menu-horizontal px-1 gap-2">
              <li>
                <a 
                  onClick={() => scrollToSection('about')}
                  className={`btn btn-ghost hover:bg-primary/10 font-medium ${activeSection === 'about' ? 'bg-primary text-white' : ''}`}
                >
                  À propos
                </a>
              </li>
              <li>
                <a 
                  onClick={() => scrollToSection('projects')}
                  className={`btn btn-ghost hover:bg-primary/10 font-medium ${activeSection === 'projects' ? 'bg-primary text-white' : ''}`}
                >
                  Mes Projets
                </a>
              </li>
              <li>
                <a 
                  onClick={() => scrollToSection('contact')}
                  className={`btn btn-ghost hover:bg-primary/10 font-medium ${activeSection === 'contact' ? 'bg-primary text-white' : ''}`}
                >
                  Contact
                  <ChevronRight size={16} />
                </a>
              </li>
            </ul>
          </div>
          
          {/* Mobile menu button */}
          <div className="navbar-end md:hidden">
            <button 
              className="btn btn-ghost btn-circle" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu - Adapté pour le scroll */}
      {isOpen && (
        <div className="md:hidden fixed h-screen inset-0 bg-base-100 z-50 pt-16 pb-6 px-4 overflow-y-auto">
          <div className="flex justify-between items-center pb-4 border-b border-base-300">
            <h2 className="text-lg font-bold">Menu</h2>
            <button 
              className="btn btn-ghost btn-circle" 
              onClick={() => setIsOpen(false)}
              aria-label="Fermer le menu"
            >
              <X size={24} />
            </button>
          </div>
          
          <ul className="menu menu-lg w-full p-4 gap-2">
            <li>
              <a 
                onClick={() => { scrollToSection('about'); setIsOpen(false); }}
                className="text-lg py-4"
                style={{ color: activeSection === 'about' ? 'var(--primary)' : 'inherit' }}
              >
                À propos
              </a>
            </li>
            <li>
              <a 
                onClick={() => { scrollToSection('projects'); setIsOpen(false); }}
                className="text-lg py-4"
                style={{ color: activeSection === 'projects' ? 'var(--primary)' : 'inherit' }}
              >
                Mes Projets
              </a>
            </li>
            <li>
              <a 
                onClick={() => { scrollToSection('contact'); setIsOpen(false); }}
                className="text-lg py-4"
                style={{ color: activeSection === 'contact' ? 'var(--primary)' : 'inherit' }}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;