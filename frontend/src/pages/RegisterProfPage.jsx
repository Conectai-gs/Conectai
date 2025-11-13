import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 
import SimpleHeader from '../components/SimpleHeader';

// placeholder
function RegisterProfPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-500">
      <SimpleHeader />
      <main className="flex flex-col justify-center items-center p-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold text-brand-secondary dark:text-brand-accent mb-6">
          Registar como Profissional
        </h1>
        <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700">
          <p className="text-center text-gray-700 dark:text-gray-300">
            O formulário para registar o seu talento estará aqui.
          </p>
          <div className="mt-6 space-y-4 opacity-70">
            <input 
              type="text" 
              placeholder="Nome Completo" 
              className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200" 
              disabled 
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200" 
              disabled 
            />
            <input 
              type="password" 
              placeholder="Senha" 
              className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200" 
              disabled 
            />
            <input 
              type="text" 
              placeholder="Cargo (ex: Pintor)" 
              className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200" 
              disabled 
            />
            <textarea 
              placeholder="Resumo" 
              className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200" 
              disabled
            ></textarea>
            <button 
              className="w-full px-6 py-3 bg-brand-secondary text-white font-semibold rounded-lg shadow-md disabled:opacity-50 transition-colors" 
              disabled
            >
              Criar Vitrine (Em Breve)
            </button>
          </div>
          <p className="text-sm text-center mt-4 text-gray-700 dark:text-gray-300">
            Já tem conta? <Link to="/#login" className="text-brand-secondary dark:text-brand-accent hover:underline font-semibold">
              Faça login
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default RegisterProfPage;