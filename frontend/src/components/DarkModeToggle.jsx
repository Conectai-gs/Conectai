import React from "react";
import { Moon, Sun } from "lucide-react";

function DarkModeToggle({ darkMode, toggleDarkMode }) {
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-brand-neutral-dark"
      aria-label="Alternar modo claro/escuro"
    >
      {darkMode ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}

export default DarkModeToggle;
