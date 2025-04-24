import React, { useState, useEffect } from 'react';
import { FileDown, X } from 'lucide-react';

const DownloadButton = ({ cvUrl = "uploads/2025/03/cv.pdf" }) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // Show the button after scrolling a bit
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`fixed bottom-6 right-6 transition-all duration-300 ${
        visible ? 'scale-100 opacity-100' : 'scale-75 opacity-0 pointer-events-none'
      }`}
    >
      <a 
        href={cvUrl}
        download="CV.pdf"
        className="btn btn-primary btn-lg shadow-lg gap-2 rounded-full px-6 animate-pulse hover:animate-none"
      >
        <FileDown size={20} />
        Télécharger CV
      </a>
    </div>
  );
};

export default DownloadButton;
