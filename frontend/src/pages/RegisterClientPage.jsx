import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, AtSign } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

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

    <div className="bg-brand-neutral-light dark:bg-brand-neutral-lightest text-brand-neutral-darkest dark:text-brand-neutral-darkest">
      <Header />
      <div className="min-h-screen flex flex-col justify-center items-center p-4 pt-20">
        <h1 className="text-3xl font-bold text-brand-primary mb-6">Registar como Cliente</h1>

        <div className="w-full max-w-md bg-brand-neutral-lightest dark:bg-brand-neutral-light p-8 rounded-lg shadow-lg border border-brand-neutral dark:border-brand-neutral">
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <AtSign size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-neutral-dark" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 rounded-lg border bg-brand-neutral-light dark:bg-brand-neutral-lightest border-brand-neutral dark:border-brand-neutral focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>

            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-neutral-dark" />
              <input
                type="password"
                placeholder="Senha (mín. 6 caracteres)"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                minLength={6}
                className="w-full pl-10 pr-4 py-2 rounded-lg border bg-brand-neutral-light dark:bg-brand-neutral-lightest border-brand-neutral dark:border-brand-neutral focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>

            {/* Mensagem de Erro */}
            {message && (
              <p className={`text-sm ${isError ? 'font-bold' : ''}`}>
                {message}
              </p>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full px-6 py-3 bg-brand-primary text-brand-neutral-lightest font-semibold rounded-lg shadow-md hover:bg-brand-primary-dark transition-colors disabled:opacity-50"
            >
              {loading ? 'A registar...' : 'Criar Conta'}
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Já tem conta? <Link to="/#login" className="text-brand-primary hover:underline">Faça login</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RegisterClientPage;