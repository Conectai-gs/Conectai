import React from 'react';

function Sobre() {
  return (
    <section 
      id="sobre" 
      className="py-24 bg-white dark:bg-gray-800"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          Sobre o <span className="text-brand-primary dark:text-brand-accent">Conectai</span>
        </h2>
        <p className="text-lg text-center text-gray-700 dark:text-gray-300 mb-8">
          A sua plataforma para encontrar e contratar talentos locais.
        </p>

        <div className="space-y-4 text-base text-gray-700 dark:text-gray-300">
          <p>
            O Conectai nasceu da ideia de que o talento está em toda parte, mas nem sempre é fácil de encontrar. Vivemos numa era digital, mas muitos profissionais incríveis ainda dependem exclusivamente do "boca a boc" para conseguir trabalho.
          </p>
          <p>
            A nossa missão é simples: criar uma ponte moderna e acessível entre si e os profissionais autônomos que fazem a diferença na sua comunidade. De pintores e eletricistas a artesãos e designers, o Conectai é a vitrine digital para quem oferece e quem procura serviços de qualidade.
          </p>
          <p>
            Queremos valorizar o trabalho humano, dar visibilidade a quem tem talento e modernizar a forma como as pessoas se conectam profissionalmente.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Sobre;