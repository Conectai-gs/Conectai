import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Inicio from '../sections/Inicio'; 
import Sobre from '../sections/Sobre';
import LoginCadastro from '../sections/LoginCadastro'; 

function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-500">
      <Header />
      <main>
        <Inicio /> 
        <Sobre />
        <LoginCadastro />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;