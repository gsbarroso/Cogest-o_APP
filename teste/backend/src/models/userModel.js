const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Sem 'uuid' e sem 'id_usuario'
const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'O nome é obrigatório'],
    trim: true,
  },
  cargo: {
    type: String,
    required: [true, 'O cargo é obrigatório'],
    enum: ['Desenvolvedor', 'Gerente', 'Admin'],
    default: 'Desenvolvedor'
  },
  email: {
    type: String,
    unique: true, // Apenas o email deve ser único
    required: [true, 'O email é obrigatório'],
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido'],
    lowercase: true,
    trim: true
  },
  senha: {
    type: String,
    required: [true, 'A senha é obrigatória'],
    minlength: [6, 'A senha deve ter pelo menos 6 caracteres'],
    select: false
  },
  nivel_acesso: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true 
});

// O resto do arquivo permanece o mesmo
userSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) return next();
  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt);
  next();
});

userSchema.methods.compararSenha = async function (senhaDigitada) {
  return await bcrypt.compare(senhaDigitada, this.senha);
};

const User = mongoose.model('User', userSchema);
module.exports = User;