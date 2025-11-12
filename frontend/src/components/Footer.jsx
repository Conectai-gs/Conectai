import React from 'react';

function Footer() {
  return (
    <footer className="py-8 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Conectai. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;