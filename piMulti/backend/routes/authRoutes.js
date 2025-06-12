const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Importa o controlador de autenticação

router.post('/login', userController.loginUser); // Define a rota POST para /login

module.exports = router;