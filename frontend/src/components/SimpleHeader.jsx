import React, { useState, useEffect } from 'react';
import DarkModeToggle from './DarkModeToggle';
import { Link } from 'react-router-dom';

function SimpleHeader() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-gray-800 shadow-md">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        <Link to="/" className="text-2xl font-bold text-brand-primary dark:text-brand-accent">
          Conectai
        </Link>

        <div className="flex items-center space-x-4">
          <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          
          <Link 
            to="/#login" 
            className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-brand-primary dark:hover:text-brand-accent transition-colors"
          >
            Voltar
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default SimpleHeader;