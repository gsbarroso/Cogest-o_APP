const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// ROTA PÚBLICA: Criar um novo usuário
// Esta rota não usa o middleware de proteção
router.post('/', userController.createUser);

// --- APLICA O MIDDLEWARE DE PROTEÇÃO EM TODAS AS ROTAS ABAIXO DESTA LINHA ---
router.use(authMiddleware.protect);

// ROTA PROTEGIDA: Pegar todos os usuários
router.get('/', userController.getAllUsers);

// ROTAS PROTEGIDAS: Buscar, atualizar e deletar um usuário específico pelo ID
router
  .route('/:id')
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;