const express = require('express');
const cors = require('cors');

// Importando as rotas
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');

const app = express();

// Middlewares essenciais
app.use(cors()); // Permite requisições de outras origens (seu frontend)
app.use(express.json()); // Permite que o Express entenda requisições com corpo em JSON

// Configuração das Rotas
app.use('/api/auth', authRoutes); // Rotas de autenticação
app.use('/api/users', userRoutes); // Rotas de usuários

module.exports = app;