const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const questionController = require('../controllers/questionController');
const checkProfessorRole = require('../middlewares/authMiddleware');  // Ajuste o caminho se necessário

// GET /api/questions – Lista todas as perguntas
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar perguntas' });
  }
});

router.post('/add', checkProfessorRole, questionController.addQuestion);

// Rota para remover uma questão (somente para professores)
router.delete('/remove/:id', checkProfessorRole, questionController.removeQuestion);

// Rota para buscar questões por área de conhecimento
router.get('/knowledge/:knowledgeArea', questionController.getQuestionsByKnowledgeArea);

// Rota existente para pegar todas as questões
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar perguntas' });
  }
});

module.exports = router;