import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, AtSign } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SimpleHeader from '../components/SimpleHeader';

function RegisterClientPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();
  const API_URL = 'http://localhost:5001';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const response = await axios.post(`${API_URL}/register`, {
        email,
        senha,
      });

      setLoading(false);
      setIsError(false);
      setMessage(response.data.message + " Você será redirecionado para o login.");

      setTimeout(() => {
        navigate('/#login');
      }, 2000);

    } catch (err) {
      setLoading(false);
      setIsError(true);
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage('Ocorreu um erro. Tente novamente.');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-500">
      <SimpleHeader />
      <main className="flex-grow flex flex-col justify-center items-center p-4 pt-24 pb-12">
        <div className="w-full max-w-md p-8 rounded-lg shadow-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          
          <h1 className="text-3xl font-bold text-center mb-6 text-brand-primary dark:text-brand-accent">
            Registo de Cliente
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <AtSign size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>

            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Senha (mín. 6 caracteres)"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                minLength={6}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>

            {message && (
              <p className={`text-sm text-center ${isError ? 'text-red-500 font-bold' : 'text-green-600 dark:text-green-400'}`}>
                {message}
              </p>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-primary-dark transition-colors disabled:opacity-50"
            >
              {loading ? 'A registar...' : 'Criar Conta'}
            </button>
          </form>

          <p className="text-sm text-center mt-4 text-gray-700 dark:text-gray-300">
            Já tem conta? <Link to="/#login" className="text-brand-primary dark:text-brand-accent hover:underline font-semibold">
              Faça login
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default RegisterClientPage;