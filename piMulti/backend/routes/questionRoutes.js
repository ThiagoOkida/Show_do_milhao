const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Para buscar perguntas por área
router.post('/by-knowledge-area', questionController.getByKnowledgeArea);

// (Aqui pode adicionar outras rotas, como getNextQuestion, submitAnswer...)
router.get('/next', questionController.getNextQuestion);
router.post('/submit', questionController.submitAnswer);

router.get('/', questionController.getAllQuestions);
router.post('/', questionController.createQuestion);
router.delete('/:id', questionController.deleteQuestion);



module.exports = router;
