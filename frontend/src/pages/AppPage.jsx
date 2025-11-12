import { useState, useEffect } from "react";
import axios from "axios";
import ProfileCard from "../components/ProfileCard.jsx"; 
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProfileModal from "../components/ProfileModal.jsx";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom"; 
import DarkModeToggle from '../components/DarkModeToggle';

const API_URL = "http://localhost:5001/api/profissionais";

function AppPage() {

  const [profissionais, setProfissionais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


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
        setFilteredProfiles(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfissionais();
  }, []);

  useEffect(() => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    const filtered = profissionais.filter(perfil => {
      if (perfil.nome?.toLowerCase().includes(lowerCaseSearch)) return true;
      if (perfil.cargo?.toLowerCase().includes(lowerCaseSearch)) return true;
      if (perfil.localizacao?.toLowerCase().includes(lowerCaseSearch)) return true;
      if (perfil.area?.toLowerCase().includes(lowerCaseSearch)) return true;
      if (perfil.habilidadesTecnicas?.some(skill => skill.toLowerCase().includes(lowerCaseSearch))) return true;
      return false;
    });
    setFilteredProfiles(filtered);
    setCurrentIndex(0);
  }, [searchTerm, profissionais]);

  const nextProfile = () => {
    if (filteredProfiles.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredProfiles.length);
  };

  const prevProfile = () => {
    if (filteredProfiles.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + filteredProfiles.length) % filteredProfiles.length);
  };

  const handleCardClick = (perfil) => {
    setSelectedProfile(perfil);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedProfile(null);
    }, 300);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center pt-24 dark:text-white">
        <h1 className="text-2xl font-bold">Carregando...</h1>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center fixed top-0 left-0 w-full z-40">
        <h1 className="text-xl font-bold text-brand-primary dark:text-brand-accent">Conectai</h1>
        
        <div className="flex items-center gap-4">
          <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <Link to="/" className="text-sm font-medium text-brand-primary hover:underline">
            Sair
          </Link>
        </div>
      </header>

      <section 
        className="flex flex-col justify-center items-center p-4 pt-24" 
      >
        <h1 className="text-4xl font-bold mb-6 text-center text-brand-primary dark:text-brand-accent">
          Encontre o Profissional Certo
        </h1>

        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        
        {/* Mensagem de Erro */}
        {error && (
           <div className="flex justify-center items-center h-64 bg-red-100 dark:bg-red-900 rounded-lg p-4">
            <p className="text-2xl font-bold text-red-700 dark:text-red-200">
              Falha ao carregar dados: {error}
            </p>
          </div>
        )}

        {!error && (
          <div className="flex w-full max-w-lg items-center justify-center gap-1 md:gap-2">
            <button
              onClick={prevProfile}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700 transition-colors disabled:opacity-30"
              aria-label="Perfil Anterior"
              disabled={filteredProfiles.length === 0}
            >
              <ChevronLeft size={36} />
            </button>

            <div className="w-full max-w-md h-[34rem] overflow-hidden"> 
              {filteredProfiles.length === 0 ? (
                <div className="w-full h-full flex justify-center items-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                  <p className="text-xl font-semibold text-gray-500 dark:text-gray-400">
                    Nenhum perfil encontrado.
                  </p>
                </div>
              ) : (
                <div
                  className="flex transition-transform duration-500 ease-in-out h-full"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {filteredProfiles.map((perfil) => (
                    <div key={perfil.id} className="w-full h-full flex-shrink-0 p-2">
                      <ProfileCard
                        perfil={perfil}
                        onCardClick={handleCardClick}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={nextProfile}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700 transition-colors disabled:opacity-30"
              aria-label="Próximo Perfil"
              disabled={filteredProfiles.length === 0}
            >
              <ChevronRight size={36} />
            </button>
          </div>
        )}
        
        {isModalOpen && (
          <ProfileModal
            perfil={selectedProfile} 
            onClose={closeModal} 
          />
        )}
      </section>
    </div>
  );
}

export default AppPage;