import React from 'react';
import { Link } from 'react-router-dom';
import { TriangleAlert } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function NotFoundPage() {
  return (
    <div className="bg-brand-neutral-light dark:bg-brand-neutral-lightest text-brand-neutral-darker dark:text-brand-neutral-darkest">
      <Header />
      <div className="min-h-screen flex flex-col justify-center items-center text-center p-4 pt-20">
        <TriangleAlert size={80} className="text-brand-accent" />
        <h1 className="text-6xl font-bold text-brand-primary mt-6">404</h1>
        <p className="text-2xl font-semibold mt-4">Página Não Encontrada</p>
        <p className="text-brand-neutral-dark dark:text-brand-neutral-dark mt-2">
          A página que você está a procurar não existe ou foi movida.
        </p>
        <Link 
          to="/" 
          className="mt-8 px-6 py-3 bg-brand-primary text-brand-neutral-lightest font-semibold rounded-lg shadow-md hover:bg-brand-primary-dark transition-colors"
        >
          Voltar à Página Inicial
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default NotFoundPage;