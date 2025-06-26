const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB conectado com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar com o MongoDB:', error.message);
    process.exit(1); // Encerra o processo com falha
  }
};

module.exports = connectDB;