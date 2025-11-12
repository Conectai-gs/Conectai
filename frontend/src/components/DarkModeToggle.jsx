import React from 'react';
import { Sun, Moon } from 'lucide-react';

function DarkModeToggle({ darkMode, toggleDarkMode }) {
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full text-brand-neutral-darkest dark:text-brand-neutral-darkest hover:bg-brand-neutral dark:hover:bg-brand-neutral-light"
      aria-label="Alternar modo claro/escuro"
    >
      {darkMode ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}

export default DarkModeToggle;