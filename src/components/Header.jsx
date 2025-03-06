import React, { useState, useEffect } from 'react';
import { Code, Menu, X, ChevronRight } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for transparent to solid header transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
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
                  className="btn btn-ghost hover:bg-primary/10 font-medium"
                >
                  À propos
                </a>
              </li>
              <li>
                <a 
                  onClick={() => scrollToSection('projects')}
                  className="btn btn-ghost hover:bg-primary/10 font-medium"
                >
                  Mes Projets
                </a>
              </li>
              <li>
                <a 
                  onClick={() => scrollToSection('contact')}
                  className="btn btn-primary text-white"
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
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-base-100 z-50 pt-16 px-4 pb-6">
          <ul className="menu menu-lg w-full p-4 gap-2">
            <li>
              <a 
                onClick={() => scrollToSection('about')}
                className="text-lg py-4"
              >
                À propos
              </a>
            </li>
            <li>
              <a 
                onClick={() => scrollToSection('projects')}
                className="text-lg py-4"
              >
                Mes Projets
              </a>
            </li>
            <li>
              <a 
                onClick={() => scrollToSection('contact')}
                className="text-lg py-4 text-primary"
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
