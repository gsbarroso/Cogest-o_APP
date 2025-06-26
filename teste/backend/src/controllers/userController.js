const User = require('../models/userModel');

// POST: Criar um novo usuário
exports.createUser = async (req, res) => {
  try {
    const { nome, email, cargo, senha, nivel_acesso } = req.body;
    const newUser = await User.create({ nome, email, cargo, senha, nivel_acesso });
    newUser.senha = undefined;
    res.status(201).json({ status: 'success', data: { user: newUser } });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      const value = error.keyValue[field];
      return res.status(409).json({
        status: 'fail',
        message: `este email ('${value}') já está em uso. Por favor, tente outro.`
      });
    }
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

// GET: Obter todos os usuários
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: { users }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Erro ao buscar usuários' });
  }
};

// GET: Obter um usuário pelo seu ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); 
    if (!user) {
      return res.status(404).json({ status: 'fail', message: `O usuário de ID '${req.params.id}' não foi encontrado.` });
    }
    res.status(200).json({ status: 'success', data: { user } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'ID mal formatado ou erro no servidor' });
  }
};

// PUT: Atualizar (editar) um usuário
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ status: 'fail', message: `O usuário de ID ('${req.params.id}') não existe.` });
    }
    res.status(200).json({
      status: 'success',
      message: `Usuário '${user.nome}' (ID: ${req.params.id}) modificado com sucesso.`,
      data: { user }
    });
  } catch (error) {
    // CORREÇÃO APLICADA AQUI
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      const value = error.keyValue[field];
      return res.status(409).json({
        status: 'fail',
        message: `este email ('${value}') já está em uso. Por favor, tente outro.`
      });
    }
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

// DELETE: Deletar um usuário
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ status: 'fail', message: `O usuário de ID '${req.params.id}' não existe.` });
    }
    res.status(200).json({
      status: 'success',
      message: `Usuário com ID ('${req.params.id}') foi deletado com sucesso.`
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Erro ao deletar usuário.' });
  }
};