const dotenv = require('dotenv');
dotenv.config(); // Carrega as variáveis do .env para process.env

const app = require('./app');
const connectDB = require('./src/config/database');

// Conecta ao Banco de Dados
connectDB();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});