const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Question = require('../models/Question');


router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await User.find();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar usuários' });
  }
});


router.get('/perguntas', async (req, res) => {
  try {
    const perguntas = await Question.find();
    res.json(perguntas);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar perguntas' });
  }
});

module.exports = router;
