const express = require("express");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const port = 5001;
const SECRET_KEY = '12345678910'; // CRIAR UMA STRING LONGA PARA RENOVAR A CHAVE DE SEGURANÇA

app.use(cors());
app.use(express.json());

// CAMINHOS DOS ARQUIVOS JSON 
// Caminho para usuários
const localDadosUsuarios = path.join(__dirname, './data/usuarios.json');
// Caminho para profissionais
const localDadosProfissionais = path.join(__dirname, './data/profissionais.json');


// FUNÇÕES DE LEITURA/ESCRITA DE USUÁRIOS 
const consultarUsuarios = () => {
    const data = fs.readFileSync(localDadosUsuarios, 'utf8');
    return JSON.parse(data);
}

const salvarUsuarios = (users) => {
    fs.writeFileSync(localDadosUsuarios, JSON.stringify(users, null, 2));
}

// FUNÇÃO DE LEITURA/ESCRITA DE PROFISSIONAIS
const consultarProfissionais = () => {
    const data = fs.readFileSync(localDadosProfissionais, 'utf8');
    return JSON.parse(data);
};

const salvarProfissionais = (profissionais) => {
    fs.writeFileSync(localDadosProfissionais, JSON.stringify(profissionais, null, 2));
};

const getNextProfissionalId = (profissionais) => {
    // Se o array estiver vazio, o ID começa em 1.
    if (profissionais.length === 0) {
        return 1;
    }
    
    // Encontra o máximo ID atual entre todos os objetos
    const maxId = profissionais.reduce((max, p) => (p.id > max ? p.id : max), 0);
    
    // Retorna o próximo ID sequencial
    return maxId + 1;
};

// ROTA PARA REGISTRAR USUARIO 
app.post('/register', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: "Campos obrigatórios" })
    }
    const users = consultarUsuarios();
    if (users.find(user => user.email == email)) {
        return res.status(400).json({ message: "Email já cadastrado no banco de dados" })
    }
    // criptogrando a senha
    const hashSenha = await bcrypt.hash(senha, 10)
    const novoUsuario = { id: Date.now(), email, senha: hashSenha };
    users.push(novoUsuario);
    salvarUsuarios(users);

    res.status(200).json({ message: "Usuario registrado com sucesso" })

})

// ROTA PARA REGISTRAR DPROFISSIONAIS
app.post('/api/profissionais/register', async (req, res) => {
    
    const { 
        email, senha, nome, cargo, resumo, 
        localizacao, area, habilidadesTecnicas, softSkills, 
        experiencias, projetos, areaInteresses
    } = req.body;

    if (!email || !senha || !nome || !cargo || !resumo || !localizacao || !area) {
        return res.status(400).json({ message: "Dados básicos (email, nome, cargo, resumo) são obrigatórios." });
    }

    const profissionais = consultarProfissionais();

    if (profissionais.find(p => p.email === email)) {
        return res.status(400).json({ message: "Este email já está registado como profissional." });
    }

    const hashSenha = await bcrypt.hash(senha, 10);
    
    const novoId = getNextProfissionalId(profissionais);
    
    const novoProfissional = {
        id: novoId, 
        email,
        senha: hashSenha,
        nome,
        cargo,
        resumo,
        localizacao,
        area,
        habilidadesTecnicas: habilidadesTecnicas || [],
        softSkills: softSkills || [],
        experiencias: experiencias || [],
        projetos: projetos || [],
        areaInteresses: areaInteresses || [],
        
        foto: req.body.foto || `./images/default-${area.toLowerCase().replace(/\s/g, '')}.jpg` 
    };

    profissionais.push(novoProfissional);
    salvarProfissionais(profissionais);

    res.status(200).json({ message: "Profissional registado com sucesso! A sua vitrine está online." });
});

// ROTA DO LOGIN
app.post("/login", async (req, res) => {
    const { email, senha } = req.body;
    const users = consultarUsuarios();
    const user = users.find(user => user.email === email);

    if (!user) {
        return res.status(400).json({ message: "Usuario/senha inválidos" })
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
        return res.status(400).json({ message: "senha inválida" })
    }
    // AUTENTICAÇÃO USANDO JWT
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '10m' });
    res.json({ message: "Login realizado com sucesso", token });
})


// MIDDLEWARE PARA PROTEGER AS ROTAS

const autenticaToken = (req, res, next) => {
    const auth = req.headers['authorization'];
    const token = auth && auth.split(' ')[1];
    
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (erro, user) => {
        if (erro) return res.sendStatus(403)
        req.user = user;
        next();
    })
}

// ROTA DO DASHBOARD COM PROTEÇÃO 
app.get("/dashboard", autenticaToken, (req, res) => {
    res.json({
        message: "Acesso autorizado- Bem-vindo",
        user: req.user
    })
})

//ROTA PARA OS PROFISSIONAIS
app.get("/api/profissionais", (req, res) => {
    try {
        const profissionais = consultarProfissionais();
        res.status(200).json(profissionais);
    } catch (err) {
        console.error("Erro ao ler o arquivo de profissionais:", err);
        res.status(500).json({ message: "Erro ao buscar dados." });
    }
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`)
})