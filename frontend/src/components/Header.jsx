import React, { useState, useEffect } from 'react';
import DarkModeToggle from './DarkModeToggle';
import { Menu, X } from 'lucide-react'; 

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Links de navegação
  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Entrar', href: '#login' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-gray-800 shadow-md">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <a href="#inicio" className="text-2xl font-bold text-brand-primary dark:text-brand-accent">
          Conect<strong className='text-brand-accent dark:text-brand-primary'>aí</strong>
        </a>

        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-medium text-gray-700 dark:text-gray-200 hover:text-brand-primary dark:hover:text-brand-accent transition-colors"
            >
              {link.name}
            </a>
          ))}
          <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>

        {/* Menu hamburguer*/}
        <div className="md:hidden flex items-center">
          <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="ml-4 text-gray-700 dark:text-gray-200"
            aria-label="Abrir menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute z-30 w-full bg-white dark:bg-gray-800 shadow-lg py-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)} // Fecha o menu ao clicar
              className="block px-6 py-3 text-lg font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

export default Header;