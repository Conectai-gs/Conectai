import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileCard from '../components/ProfileCard'; 

const API_URL = "http://localhost:5001/api/profissionais";

function Inicio() {
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProfissionais = async () => {
      try {
        const response = await axios.get(API_URL);
        setProfiles(response.data.slice(0, 5)); 
      } catch (err) {
        console.error("Erro ao buscar perfis para o carrossel:", err);
      }
    };
    fetchProfissionais();
  }, []);

  useEffect(() => {
    if (profiles.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [currentIndex, profiles.length]);

  if (profiles.length === 0) {
    return (
      <section id="inicio" className="min-h-screen flex flex-col justify-center items-center p-4 pt-20">
        <h1 className="text-5xl font-bold text-brand-primary dark:text-brand-accent">Conectai</h1>
        <p className="text-xl mt-4">Carregando vitrine de talentos...</p>
      </section>
    );
  }

  return (
    <section 
      id="inicio" 
      className="min-h-screen flex flex-col justify-center items-center p-4 pt-20 text-center" 
    >
      <h1 className="text-5xl md:text-6xl font-bold text-brand-primary dark:text-brand-accent">
        Conectai
      </h1>
      <p className="text-xl md:text-2xl mt-4 mb-8 max-w-lg">
        A sua vitrine digital para encontrar e contratar os melhores talentos locais.
      </p>

      <div className="w-full max-w-md h-[34rem] relative">
        {profiles.map((perfil, index) => (
          <div
            key={perfil.id}
            className={`
              absolute top-0 left-0 w-full h-full transition-opacity duration-1000
              ${index === currentIndex ? 'opacity-100' : 'opacity-0'}
            `}
          >
            <ProfileCard
              perfil={perfil}
              onCardClick={() => document.getElementById('login').scrollIntoView()}
            />
          </div>
        ))}
      </div>
      
      <a 
        href="#login" 
        className="mt-10 px-8 py-3 bg-brand-accent text-brand-neutral-darkest font-bold text-lg rounded-lg shadow-md hover:bg-brand-accent-dark transition-transform hover:scale-105"
      >
        Crie a sua Conta
      </a>
      
    </section>
  );
}

export default Inicio;