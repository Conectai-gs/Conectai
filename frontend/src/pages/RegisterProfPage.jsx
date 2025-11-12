import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 

// placeholder
function RegisterProfPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col justify-center items-center p-4 pt-20">
        <h1 className="text-3xl font-bold text-brand-secondary mb-6">Registar como Profissional</h1>
        <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700">
          <p className="text-center text-brand-text-dark dark:text-brand-text-light">
            O formulário para registar o seu talento estará aqui.
          </p>
          <div className="mt-4 space-y-4 opacity-50">
            <input type="text" placeholder="Nome Completo" className="w-full p-3 rounded border" disabled />
            <input type="email" placeholder="Email" className="w-full p-3 rounded border" disabled />
            <input type="password" placeholder="Senha" className="w-full p-3 rounded border" disabled />
            <input type="text" placeholder="Cargo (ex: Pintor)" className="w-full p-3 rounded border" disabled />
            <textarea placeholder="Resumo" className="w-full p-3 rounded border" disabled></textarea>
            <button className="w-full px-6 py-3 bg-brand-secondary text-white font-semibold rounded-lg shadow-md" disabled>
              Criar Vitrine (Em Breve)
            </button>
          </div>
          <p className="text-sm text-center mt-4 text-brand-text-dark dark:text-brand-text-light">
            Já tem conta? <Link to="/#login" className="text-brand-primary hover:underline">Faça login</Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default RegisterProfPage;