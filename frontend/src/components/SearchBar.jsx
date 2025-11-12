import React from 'react';
import { Search } from 'lucide-react';

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="w-full max-w-lg mb-6 relative">
      <Search 
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
        size={20} 
        aria-hidden="true"
      />
      
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Buscar por nome, cargo, habilidade..."
        className="w-full px-4 py-3 pl-10 rounded-lg shadow-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-primary"
      />
    </div>
  );
}

export default SearchBar;