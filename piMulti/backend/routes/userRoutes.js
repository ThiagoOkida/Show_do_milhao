const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// 1. ROTA DE RANKING PRIMEIRO!!
router.get('/ranking', userController.getRanking);

// Rota para listar todos os usuários
router.get('/', userController.getAllUsers);

router.put('/score', authMiddleware, userController.updateUserScore);

// Rota para obter um usuário pelo ID
router.get('/:id', userController.getUserById);

// Rota para criar um novo usuário
router.post('/', userController.createUser);

// Rota para atualizar um usuário existente
router.put('/:id', userController.updateUser);

// Rota para deletar um usuário
router.delete('/:id', userController.deleteUser);

module.exports = router;
