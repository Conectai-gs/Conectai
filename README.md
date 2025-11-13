# 🤝 Conectai - A Vitrine Digital de Talentos Autônomos

## 💡 Resumo do Projeto
O Conectai é uma plataforma web moderna e dinâmica inspirada na fluidez das redes sociais. Seu objetivo é **aproximar profissionais autônomos** (como pintores, costureiras, eletricistas e artesãos) de clientes e empresas, valorizando o trabalho e digitalizando o tradicional "boca a boca".

O projeto é estruturado como uma **Aplicação de Múltiplas Páginas (MPA/SPA)** com rotas claras para separar a experiência de marketing da experiência de uso:
* **Página Inicial (`/`):** Landing page com carrossel automático de vitrines, seção "Sobre" e acesso aos formulários de Login/Registo.
* **App Privada (`/app`):** Área exclusiva para utilizadores logados, contendo o carrossel interativo, barra de busca avançada, e acesso ao modal de detalhes do profissional.

---

## 🛠️ Tecnologias Utilizadas (Stack)

| Categoria | Tecnologia | Finalidade |
| :--- | :--- | :--- |
| **Frontend** | **React (Vite)** | Construção da interface de utilizador. |
| **Estilização** | **Tailwind CSS 4.1** | Design responsivo, moderno e Dark Mode. |
| **Roteamento** | **React Router DOM** | Gestão de URLs e navegação entre páginas. |
| **Comunicação** | **Axios** | Cliente HTTP para comunicação com a API. |
| **Backend** | **Node.js (Express)** | Criação da API e gestão do servidor. |
| **Segurança** | **Bcrypt / JWT** | Hashing de senhas e Autenticação por Token. |
| **Dados** | **JSON File System** | Banco de dados simulado (`profissionais.json`, `usuarios.json`). |

---

## 🔑 Credenciais de Teste

O servidor já está configurado com um utilizador de teste para verificação imediata da rota de Login e acesso à App Privada.

* **Usuário (Email):** `teste@teste.com`
* **Senha:** `123`
* **Endpoint de Login:** `POST http://localhost:5001/login`

---

## 🚀 Instalação e Execução (Passo-a-Passo)

O projeto é dividido em dois ambientes (`backend` e `frontend`) e requer que ambos estejam a correr simultaneamente.

### 1. Pré-requisitos
Certifique-se de que o **Node.js** e o **npm** estão instalados.

### 2. Configuração
```bash
# 1. Clone o repositório
git clone https://github.com/Conectai-gs/Conectai
cd Conectai

# 2. Navegue para o backend
cd backend

# 3. Instale as dependências (Express, bcrypt, jwt, etc.)
npm install

# 4. Inicie o servidor Node.js em um terminal no backend
# O servidor estará ativo em: http://localhost:5001
node server.js

# 5. Volte para a raiz e navegue para o frontend
cd ..
cd frontend

# 6. Instale as dependências (React, Tailwind, etc.)
npm install

# 7. Inicie a aplicação React
# O frontend estará ativo em: http://localhost:5173 (ou porta similar)
npm run dev

O projeto estará acessível no seu navegador no URL fornecido pelo Vite (geralmente http://localhost:5173).

 Informações do Grupo

 Nome Completo                RM
 Kaue Soares Madarazzo        562100
 Nicolas Mendes dos Santos    566290