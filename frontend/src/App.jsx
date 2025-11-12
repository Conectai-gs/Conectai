import { useState, useEffect } from "react";
import axios from "axios";
import ProfileCard from "./components/ProfileCard";
import DarkModeToggle from "./components/DarkModeToggle";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProfileModal from "./components/ProfileModal.jsx";
import SearchBar from "./components/SearchBar";

const API_URL = "http://localhost:5001/api/profissionais";

function App() {
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
        setFilteredProfiles(response.data); // Inicia a lista filtrada
      } catch (err) {
        setError(err.message);
        console.error("Erro ao buscar dados:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfissionais();
  }, []);

  useEffect(() => {
    const lowerCaseSearch = searchTerm.toLowerCase();

    const filtered = profissionais.filter(perfil => {
      // Checa nome
      if (perfil.nome?.toLowerCase().includes(lowerCaseSearch)) return true;
      // Checa cargo
      if (perfil.cargo?.toLowerCase().includes(lowerCaseSearch)) return true;
      // Checa localização
      if (perfil.localizacao?.toLowerCase().includes(lowerCaseSearch)) return true;
      // Checa área
      if (perfil.area?.toLowerCase().includes(lowerCaseSearch)) return true;
      // Checa habilidades 
      if (perfil.habilidadesTecnicas?.some(skill => skill.toLowerCase().includes(lowerCaseSearch))) return true;

      return false; // Se nada bater, não inclui
    });

    setFilteredProfiles(filtered); // Atualiza a lista filtrada
    setCurrentIndex(0); // Reseta o carousel para o primeiro item da busca
  }, [searchTerm, profissionais]);

  const nextProfile = () => {
    if (filteredProfiles.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredProfiles.length);
  };

  const prevProfile = () => {
    if (filteredProfiles.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + filteredProfiles.length) % filteredProfiles.length);
  };

  // Função para abrir o perfil Detalhado
  const handleCardClick = (perfil) => {
    setSelectedProfile(perfil);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedProfile(null);
    }, 300); // 300ms
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

      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <div className="flex w-full max-w-lg items-center justify-center gap-1 md:gap-2">

        {/* Botão de voltar perfil */}
        <button
          onClick={prevProfile}
          className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-30"
          aria-label="Perfil Anterior"
          disabled={filteredProfiles.length === 0} //Desabilita botões se não houver resultados
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
            
            // Container dos Slides
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

        {/* Botão de avançar perfis */}
        <button
          onClick={nextProfile}
          className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-30"
          aria-label="Próximo Perfil"
          disabled={filteredProfiles.length === 0} // Desabilita botões se não houver resultados
        >
          <ChevronRight size={36} />
        </button>
      </div>
      
      {isModalOpen && (
        <ProfileModal
          perfil={selectedProfile} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
}

export default App;