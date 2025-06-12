const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/ranking', userController.getRanking);

router.get('/', userController.getAllUsers);

router.put('/score', authMiddleware, userController.updateUserScore);

router.get('/:id', userController.getUserById);

router.post('/', userController.createUser);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;
