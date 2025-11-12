import { useState, useEffect } from "react";
import axios from "axios";
import ProfileCard from "./components/ProfileCard";
import DarkModeToggle from "./components/DarkModeToggle";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const API_URL = "http://localhost:5001/api/profissionais";

function App() {
  const [profissionais, setProfissionais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
 }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    const fetchProfissionais = async () => {
      try {
        const response = await axios.get(API_URL);
        setProfissionais(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Erro ao buscar dados:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfissionais();
  }, []);

  // Função para ir ao próximo perfil
  const nextProfile = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % profissionais.length);
  };

  // Função para voltar ao perfil anterior
  const prevProfile = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + profissionais.length) % profissionais.length);
  };

  const handleCardClick = (perfil) => {
    console.log("Card clicado:", perfil.nome);
    
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen dark:text-white">
        <h1 className="text-2xl font-bold">Carregando...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-100 dark:bg-red-900">
        <h1 className="text-2xl font-bold text-red-700 dark:text-red-200">
          Falha ao carregar dados: {error}
        </h1>
      </div>
    );
  }

return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500 flex flex-col justify-center items-center p-4 overflow-hidden">
      <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-700 dark:text-blue-400">
        Conectai - Encontre Profissionais
      </h1>

      <div className="flex w-full max-w-lg items-center justify-center gap-1 md:gap-2">

        {/* Botão de voltar perfil */}
        <button
          onClick={prevProfile}
          className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Perfil Anterior"
        >
          <ChevronLeft size={36} />
        </button>

        <div className="w-full max-w-md overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {profissionais.map((perfil) => (
              <div key={perfil.id} className="w-full flex-shrink-0 p-2">
                <ProfileCard
                  perfil={perfil}
                  onCardClick={handleCardClick}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Botão de próximo perfil */}
        <button
          onClick={nextProfile}
          className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Próximo Perfil"
        >
          <ChevronRight size={36} />
        </button>
      </div>
    </div>
  );
}

export default App;