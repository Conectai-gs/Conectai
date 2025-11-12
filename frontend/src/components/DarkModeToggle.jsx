import React from "react";
import { Moon, Sun } from "lucide-react";

function DarkModeToggle({ darkMode, toggleDarkMode }) {
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 
                 fixed top-4 right-4 z-10 shadow-md hover:scale-105 transition-transform"
      aria-label="Alternar modo claro/escuro"
    >
      {darkMode ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}

export default DarkModeToggle;
