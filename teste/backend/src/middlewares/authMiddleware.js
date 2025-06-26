const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/userModel');

exports.protect = async (req, res, next) => {
  try {
    // 1. Pega o token e verifica se ele existe
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ status: 'fail', message: 'Você não está logado! Por favor, faça o login para obter acesso.' });
    }

    // 2. Verifica se o token é válido
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3. Verifica se o usuário do token ainda existe
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({ status: 'fail', message: 'O usuário pertencente a este token não existe mais.' });
    }
    
    // Permite o acesso à próxima rota
    req.user = currentUser; // Adiciona o usuário à requisição
    next();
  } catch (error) {
    res.status(401).json({ status: 'fail', message: 'Token inválido ou expirado. Faça o login novamente.' });
  }
};