import React from 'react';
import { X, Send, ThumbsUp } from 'lucide-react'; // Ícones para os botões

function ProfileModal ({ perfil, onClose }) {
  if (!perfil) return null; // Não carrega nada se nenhum perfil estiver selecionado

  // Funções de clique dos botões de ação 
  const handleSendMessage = () => {
    alert(`Iniciando chat com ${perfil.nome}!`);
  };

  const handleRecommend = () => {
    alert(`Você recomendou ${perfil.nome}!`);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-75 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden flex flex-col"
      >
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400">
            {perfil.nome}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Fechar modal"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Resumo e Localização */}
          <section>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{perfil.cargo}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{perfil.localizacao}</p>
            <p className="text-gray-700 dark:text-gray-300">{perfil.resumo}</p>
          </section>

          {/* Habilidades Técnicas */}
          <section>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Habilidades Técnicas</h3>
            <div className="flex flex-wrap gap-2">
              {perfil.habilidadesTecnicas.map((skill, index) => (
                <span key={index} className="text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Soft Skills */}
          <section>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Soft Skills</h3>
            <div className="flex flex-wrap gap-2">
              {perfil.softSkills.map((skill, index) => (
                <span key={index} className="text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Experiências */}
          <section>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Experiências</h3>
            <div className="space-y-4">
              {perfil.experiencias.map((exp, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-bold text-gray-800 dark:text-gray-100">{exp.cargo}</h4>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{exp.empresa} ({exp.inicio} - {exp.fim})</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{exp.descricao}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Projetos / Portfólio */}
          <section>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Portfólio / Projetos</h3>
            <div className="space-y-4">
              {perfil.projetos.map((proj, index) => (
                <div key={index}>
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {proj.titulo}
                  </a>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{proj.descricao}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
        
        <div className="flex justify-end gap-3 p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <button
            onClick={handleSendMessage}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            <Send size={18} />
            Enviar Mensagem
          </button>
          <button
            onClick={handleRecommend}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 text-blue-700 dark:text-blue-300 font-semibold rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <ThumbsUp size={18} />
            Recomendar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;