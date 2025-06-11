const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// GET /api/questions – Lista todas as perguntas
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar perguntas' });
  }
});

module.exports = router;
