import React, { useState, useEffect } from 'react'
import { Rabbit } from 'lucide-react'; // Importer le composant Rabbit de lucide-react

import ImageGallery from './components/ImageGallery'
import ProjectGrid from './components/ProjectGrid'

const THEMES = ['light', 'dark', 'cupcake', 'cyberpunk',
  'retro', 'synthwave', 'halloween', 'forest',
  'aqua', 'lofi', 'pastel', 'fantasy', 'wireframe',
  'black', 'luxury', 'dracula', 'cmyk', 'autumn',
  'business', 'acid', 'lemonade', 'night', 'coffee', 'winter']

function App() {
  const [count, setCount] = useState(0)
  const [theme, setTheme] = useState('night')

  // Ajouter un useEffect pour le thème initial
  useEffect(() => {
    // S'assurer que le thème est appliqué au chargement
    document.querySelector('html').setAttribute('data-theme', theme)
  }, [])

  const toggleTheme = () => {
    const currentIndex = THEMES.indexOf(theme)
    const nextIndex = (currentIndex + 1) % THEMES.length
    const nextTheme = THEMES[nextIndex]
    setTheme(nextTheme)
    
    // Cibler spécifiquement l'élément html pour le changement de thème
    document.querySelector('html').setAttribute('data-theme', nextTheme)
  }

  return (
    <div data-theme={theme} className="min-h-screen bg-base-200">
      <div className="container mx-auto p-4">
        <header className="py-6 flex justify-between items-center">
          <h1 className="text-4xl font-bold">My React Gallery</h1>
          <button onClick={toggleTheme} className="btn btn-secondary">
            Change Theme
          </button>
        </header>
        
        <section className="py-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Rabbit className="text-primary" /> 
            Mes Projets WordPress
          </h2>
          <ProjectGrid />
        </section>
        
        <footer className="mt-12 text-center">
          <p>Built with React, Vite, Tailwind CSS & DaisyUI</p>
        </footer>
      </div>
    </div>
  )
}

export default App


