import React from 'react';

function ProfileCard({ perfil, onCardClick }) {
  
  // Mostra x habilidades para o card
  const topSkills = perfil.habilidadesTecnicas.slice(0, 5);

  return (
    <div
      onClick={() => onCardClick(perfil)} 
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-brand-accent/30 cursor-pointer h-full"
    >
      {/* placeholder de imagem */}
      <img
        className="w-full h-80 object-cover"
        src={`https://via.placeholder.com/300x200/EBF8FF/3182CE?text=${perfil.area}`}
        alt={`Foto de ${perfil.nome}`}
      />
      
      <div className="p-4">
        {/* Informações Principais */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{perfil.nome}</h3>
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">{perfil.cargo}</p>
        
        {/* Resumo */}
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
          {perfil.resumo.substring(0, 80)}... 
        </p>

        {/* Localização */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          {perfil.localizacao}
        </p>
        
        {/* Skills */}
        <div className="flex flex-wrap gap-1">
          {topSkills.map((skill, index) => (
            <span
              key={index}
              className="text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;