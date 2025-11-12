import React from 'react';
import Header from './components/Header';
import Inicio from './sections/Inicio';
import Sobre from './sections/Sobre';
import LoginCadastro from './sections/LoginCadastro';

function App() {

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      <Header />
      <main>
        <Inicio />
        <Sobre />
        <LoginCadastro />
      </main>

      <footer className="py-8 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Conectai. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;