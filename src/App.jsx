import React from 'react';
import Header from './components/Header';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';
import DownloadButton from './components/DownloadButton';
import Typewriter from 'typewriter-effect';

function App() {
  return (
    <div className="min-h-screen bg-base-100" id="top">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="hero min-h-screen bg-base-200 bg-gradient-to-br from-base-100 to-base-300">
          <div className="hero-content text-center">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3">
                <div className="text-primary mb-2">
                  <Typewriter
                    options={{
                      strings: ['MICHEL ANGE TAMGHO FOGUE'],
                      autoStart: true,
                      loop: true,
                      delay: 75,
                      pauseFor: 2500,
                    }}
                  />
                </div>
                <div className="mb-2">Développeur</div>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Web Full-Stack
                </div>
              </h1>
              <p className="py-6 text-lg opacity-80">
                Bienvenue sur mon portfolio. Je conçois et développe des applications web modernes, 
                robustes et évolutives pour répondre aux besoins spécifiques de chaque projet.
              </p>
              <button 
                onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                className="btn btn-primary btn-lg mt-4"
              >
                Voir mes projets
              </button>
            </div>
          </div>
        </section>
        
        <AboutSection />
        <ProjectsSection />
      </main>
      
      <Footer />
      <DownloadButton cvUrl="/votre-cv.pdf" />
    </div>
  );
}

export default App;


