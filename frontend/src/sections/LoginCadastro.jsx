import React, { useState } from 'react';
import axios from 'axios';
import { Lock, AtSign } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; 

function LoginCadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate(); 
  const API_URL = 'http://localhost:5001';

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        senha,
      });

      setLoading(false);
      setIsError(false);
      setMessage(response.data.message);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setTimeout(() => {
          navigate('/app');
        }, 1000); 
      }

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
    <section 
      id="login" 
      className="py-24" 
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Faça parte do Conectaí
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-semibold mb-4 text-brand-primary dark:text-brand-primary text-center">
              Já tem conta? Entrar
            </h3>
            
            <form onSubmit={handleLoginSubmit} className="flex-grow flex flex-col gap-4">
              <div className="relative">
                <AtSign size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2 rounded-lg border bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>

              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="Senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2 rounded-lg border bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>

              {message && (
                <p className={`text-sm ${isError ? 'text-red-700' : 'text-green-500'}`}>
                  {message}
                </p>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full px-6 py-2 mt-auto bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-colors disabled:opacity-50"
              >
                {loading ? 'Aguarde...' : 'Entrar'}
              </button>
            </form>
            
            <p className="text-center text-sm mt-4 text-gray-700 dark:text-gray-300">
              Novo por aqui? 
              <Link to="/registar-cliente" className="font-semibold text-brand-primary hover:underline ml-1">
                Registre-se
              </Link>
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center flex flex-col justify-between border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-semibold mb-4 text-brand-accent dark:text-brand-accent">
              É um Profissional?
            </h3>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Crie a sua vitrine digital, mostre o seu portfólio e conquiste mais clientes.
            </p>
            <Link 
              to="/registar-profissional" 
              className="w-full block px-6 py-2 bg-brand-accent text-gray-900 font-semibold rounded-lg shadow-md hover:opacity-90 transition-colors"
            >
              Registe o seu Talento
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

export default LoginCadastro;