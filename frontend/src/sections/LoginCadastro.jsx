import React from 'react';

function LoginCadastro() {
  return (
    <section 
      id="login" 
      className="py-20 bg-brand-primary-light dark:bg-gray-900"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Faça parte do Conectai
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Card de Login/Cadastro de Usuário */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-semibold mb-4 text-brand-primary dark:text-brand-accent">
              Procura um Profissional?
            </h3>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Crie a sua conta gratuita para contactar e avaliar os melhores talentos.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-6 py-2 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-primary-dark transition-colors">
                Entrar (Login)
              </button>
              <button className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                Registar
              </button>
            </div>
          </div>

          {/* Card de Cadastro de Profissional */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-semibold mb-4 text-brand-accent dark:text-brand-accent-light">
              É um Profissional?
            </h3>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Crie a sua vitrine digital, mostre o seu portfólio e conquiste mais clientes.
            </p>
            <button className="px-6 py-2 bg-brand-accent text-white font-semibold rounded-lg shadow-md hover:bg-brand-accent-dark transition-colors">
              Registe o seu Talento
            </button>
            {/* Aqui entrará o formulário de registo de profissional */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginCadastro;