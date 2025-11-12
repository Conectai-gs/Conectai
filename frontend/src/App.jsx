import { useState, useEffect } from 'react';
import axios from 'axios'; 

const API_URL = 'http://localhost:5001/api/profissionais';

function App() {
  const [profissionais, setProfissionais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect para buscar os dados da API assim que o App carregar
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


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold">Carregando...</h1>
      </div>
    );
  }


  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-100">
        <h1 className="text-2xl font-bold text-red-700">Falha ao carregar dados: {error}</h1>
      </div>
    );
  }


  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-blue-700">Conectai - Perfis</h1>
      
      {/* Lista simples apenas para testar */}
      <ul className="list-disc pl-5">
        {profissionais.map(perfil => (
          <li key={perfil.id} className="text-lg mb-2">
            {perfil.nome} - ({perfil.cargo})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;