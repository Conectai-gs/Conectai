import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, AtSign, User, Briefcase, MapPin, Layers } from 'lucide-react';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 

const API_URL = 'http://localhost:5001';

function RegisterProfPage() {
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
    nome: '',
    cargo: '',
    resumo: '',
    localizacao: '',
    area: '',
    habilidadesTecnicas: '', 
    softSkills: '',        
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const dataToSend = {
        ...formData,
        habilidadesTecnicas: formData.habilidadesTecnicas.split(',').map(s => s.trim()).filter(s => s.length > 0),
        softSkills: formData.softSkills.split(',').map(s => s.trim()).filter(s => s.length > 0),
      };

      const response = await axios.post(`${API_URL}/api/profissionais/register`, dataToSend);

      setLoading(false);
      setIsError(false);
      setMessage(response.data.message + " Você será redirecionado para a App.");

      setTimeout(() => {
        navigate('/app');
      }, 2000);

    } catch (err) {
      setLoading(false);
      setIsError(true);
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage('Ocorreu um erro inesperado. Tente novamente.');
      }
    }
  };

  const inputClass = "w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary";

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-500">
      <Header />
      <main className="flex-grow flex flex-col justify-center items-center p-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold text-brand-secondary dark:text-brand-accent mb-6">
          Registe a Sua Vitrine Profissional
        </h1>
        <div className="w-full max-w-xl bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700">
          
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <h2 className="text-xl font-semibold text-brand-primary mb-4 border-b pb-2">Dados de Acesso</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <AtSign size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" name="email" placeholder="Email (Login)" value={formData.email} onChange={handleChange} required className={inputClass} />
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="password" name="senha" placeholder="Senha (mín. 6 caracteres)" value={formData.senha} onChange={handleChange} required minLength={6} className={inputClass} />
              </div>
            </div>

            <h2 className="text-xl font-semibold text-brand-primary pt-4 mb-4 border-b pb-2">Detalhes da Vitrine</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" name="nome" placeholder="Nome Completo" value={formData.nome} onChange={handleChange} required className={inputClass} />
              </div>
              <div className="relative">
                <Briefcase size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" name="cargo" placeholder="Seu Cargo (Ex: Pintor)" value={formData.cargo} onChange={handleChange} required className={inputClass} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" name="localizacao" placeholder="Cidade/Estado (Ex: Lisboa/PT)" value={formData.localizacao} onChange={handleChange} required className={inputClass} />
              </div>
              <div className="relative">
                <Layers size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" name="area" placeholder="Área (Ex: Construção Civil)" value={formData.area} onChange={handleChange} required className={inputClass} />
              </div>
            </div>

            <textarea
              name="resumo"
              placeholder="Resumo/Bio (O seu headline profissional)"
              value={formData.resumo}
              onChange={handleChange}
              required
              rows="3"
              className={inputClass.replace("pl-10", "pl-4")}
            ></textarea>

            <h2 className="text-xl font-semibold text-brand-primary pt-4 mb-4 border-b pb-2">Habilidades (Separar por vírgulas)</h2>

            <textarea
              name="habilidadesTecnicas"
              placeholder="Habilidades Técnicas (Ex: Eletricidade, HTML, Terapia Ocupacional)"
              value={formData.habilidadesTecnicas}
              onChange={handleChange}
              rows="2"
              className={inputClass.replace("pl-10", "pl-4")}
            ></textarea>
            <textarea
              name="softSkills"
              placeholder="Soft Skills (Ex: Comunicação, Liderança, Empatia)"
              value={formData.softSkills}
              onChange={handleChange}
              rows="2"
              className={inputClass.replace("pl-10", "pl-4")}
            ></textarea>

            {message && (
              <p className={`text-sm text-center ${isError ? 'text-red-700 font-bold' : 'text-green-600 dark:text-green-400'}`}>
                {message}
              </p>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full px-6 py-3 mt-4 bg-brand-secondary text-white font-semibold rounded-lg shadow-md hover:bg-brand-secondary-dark transition-colors disabled:opacity-50"
            >
              {loading ? 'A registar...' : 'Criar Vitrine Profissional'}
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

export default RegisterProfPage;