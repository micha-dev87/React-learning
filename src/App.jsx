import React, { useState, useEffect } from 'react'

const THEMES = ['light', 'dark', 'cupcake', 'cyberpunk', 'retro']

function App() {
  const [count, setCount] = useState(0)
  const [theme, setTheme] = useState('light')

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
    <div className="container mx-auto p-4">
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-4">React Counter</h1>
        <p className="text-center text-xl mb-4">Count: {count}</p>
          <div className="flex justify-center gap-4">
            
          
            <button className="btn btn-primary" onClick={() => setCount(count - 1)}>
              Decrement 
            </button>
            <button className="btn btn-primary" onClick={() => setCount(count + 1)}>
              Increment
            </button>

        </div>
      </div>
      
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-xl font-bold text-center mb-2">Current Theme: {theme}</h2>
        <div className="flex justify-center">
          <button className="btn btn-secondary" onClick={toggleTheme}>
            Change Theme
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}



export default App
