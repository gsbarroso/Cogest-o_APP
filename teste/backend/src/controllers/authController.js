const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Função para criar o Token JWT
const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '90d' // Token expira em 90 dias
  });
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // 1. Checa se o email e a senha foram fornecidos
    if (!email || !senha) {
      return res.status(400).json({
        status: 'fail',
        message: 'Por favor, forneça e-mail e senha.'
      });
    }

    // 2. Encontra o usuário e inclui a senha na busca
    const user = await User.findOne({ email }).select('+senha');

    // 3. Compara a senha e verifica se o usuário existe
    if (!user || !(await bcrypt.compare(senha, user.senha))) {
      return res.status(401).json({
        status: 'fail',
        message: 'E-mail ou senha incorretos.'
      });
    }

    // 4. Se tudo estiver correto, envia o token
    const token = signToken(user._id);
    
    user.senha = undefined;

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Ocorreu um erro no servidor.' });
  }
};
