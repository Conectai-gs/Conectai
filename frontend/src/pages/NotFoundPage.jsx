import React from 'react';
import { Link } from 'react-router-dom';
import { TriangleAlert } from 'lucide-react';
import SimpleHeader from '../components/SimpleHeader';
import Footer from '../components/Footer'; 

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      <SimpleHeader />
      <main className="flex-grow flex flex-col justify-center items-center text-center p-4 pt-20">
        <TriangleAlert size={80} className="text-brand-secondary" />
        <h1 className="text-6xl font-bold text-brand-primary mt-6">404</h1>
        
        <p className="text-2xl font-semibold mt-4 text-gray-900 dark:text-gray-200">
          Página Não Encontrada
        </p>
        
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          A página que você está a procurar não existe ou foi movida.
        </p>
        <Link 
          to="/" 
          className="mt-8 px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-primary-dark transition-colors"
        >
          Voltar à Página Inicial
        </Link>
      </main>
      <Footer />
    </div>
  );
}

export default NotFoundPage;