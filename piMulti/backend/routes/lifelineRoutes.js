const express = require('express');
const router = express.Router();


router.get('/pular', (req, res) => {
  res.json({
    lifeline: 'pular',
    message: 'Você usou a ajuda de pular a pergunta.',
    success: true
  });
});

router.get('/cartas', (req, res) => {
  res.json({
    lifeline: 'cartas',
    message: 'Foram eliminadas duas alternativas incorretas.',
    eliminadas: ['B', 'C'], // exemplo fixo
    success: true
  });
});


router.get('/universitarios', (req, res) => {
  res.json({
    lifeline: 'universitarios',
    message: 'Os universitários sugerem a alternativa A como correta.',
    sugestao: 'A',
    sucesso: true
  });
});

module.exports = router;
