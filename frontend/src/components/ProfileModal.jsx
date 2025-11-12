import React from 'react';
import { X, Send, ThumbsUp } from 'lucide-react'; 

function ProfileModal({ perfil, onClose }) {
  if (!perfil) return null; 

  const handleSendMessage = () => {
    alert(`Iniciando chat com ${perfil.nome}!`);
  };

  const handleRecommend = () => {
    alert(`Você recomendou ${perfil.nome}!`);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex justify-center items-center bg-brand-neutral-darkest/75 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] bg-brand-neutral-lightest dark:bg-brand-neutral-light rounded-lg shadow-xl overflow-hidden flex flex-col"
      >
        <div className="flex justify-between items-center p-4 border-b border-brand-neutral dark:border-brand-neutral">
          <h2 className="text-2xl font-bold text-brand-primary dark:text-brand-accent">
            {perfil.nome}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-brand-neutral-dark dark:text-brand-neutral-dark hover:bg-brand-neutral dark:hover:bg-brand-neutral-dark"
            aria-label="Fechar modal"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 text-brand-neutral-darkest dark:text-brand-neutral-darkest">
          
          <section>
            <p className="text-lg font-semibold">{perfil.cargo}</p>
            <p className="text-sm text-brand-neutral-dark dark:text-brand-neutral-dark mb-3">{perfil.localizacao}</p>
            <p>{perfil.resumo}</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Habilidades Técnicas</h3>
            <div className="flex flex-wrap gap-2">
              {perfil.habilidadesTecnicas.map((skill, index) => (
                <span key={index} className="text-sm font-medium bg-brand-accent/30 dark:bg-brand-accent/20 text-brand-accent-dark dark:text-brand-accent px-3 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Soft Skills</h3>
            <div className="flex flex-wrap gap-2">
              {perfil.softSkills.map((skill, index) => (
                <span key={index} className="text-sm font-medium bg-brand-neutral dark:bg-brand-neutral text-brand-neutral-darker dark:text-brand-neutral-darker px-3 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Experiências</h3>
            <div className="space-y-4">
              {perfil.experiencias.map((exp, index) => (
                <div key={index} className="border-l-4 border-brand-primary pl-4">
                  <h4 className="font-bold">{exp.cargo}</h4>
                  <p className="text-sm font-medium text-brand-primary dark:text-brand-primary">{exp.empresa} ({exp.inicio} - {exp.fim})</p>
                  <p className="text-sm text-brand-neutral-dark dark:text-brand-neutral-dark mt-1">{exp.descricao}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Portfólio / Projetos</h3>
            <div className="space-y-4">
              {perfil.projetos.map((proj, index) => (
                <div key={index}>
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-bold text-brand-accent dark:text-brand-accent hover:underline"
                  >
                    {proj.titulo}
                  </a>
                  <p className="text-sm text-brand-neutral-dark dark:text-brand-neutral-dark">{proj.descricao}</p>
                </div>
              ))}
            </div>
          </section>

        </div>

        <div className="flex justify-end gap-3 p-4 border-t border-brand-neutral dark:border-brand-neutral bg-brand-neutral-light/50 dark:bg-brand-neutral-light/10">
          <button
            onClick={handleSendMessage}
            className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-brand-neutral-lightest font-semibold rounded-lg shadow-md hover:bg-brand-primary-dark transition-colors"
          >
            <Send size={18} />
            Enviar Mensagem
          </button>
          <button
            onClick={handleRecommend}
            className="flex items-center gap-2 px-4 py-2 bg-brand-accent text-brand-neutral-darkest font-semibold rounded-lg shadow-md hover:bg-brand-accent-dark transition-colors"
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