const express = require('express');
const router = express.Router();

// 📌 Rota para "Pular a pergunta"
router.get('/pular', (req, res) => {
  res.json({
    lifeline: 'pular',
    message: 'Você usou a ajuda de pular a pergunta.',
    success: true
  });
});

// 📌 Rota para "Cartas" (ex: eliminar 2 alternativas erradas)
router.get('/cartas', (req, res) => {
  res.json({
    lifeline: 'cartas',
    message: 'Foram eliminadas duas alternativas incorretas.',
    eliminadas: ['B', 'C'], // exemplo fixo
    success: true
  });
});

// 📌 Rota para "Universitários"
router.get('/universitarios', (req, res) => {
  res.json({
    lifeline: 'universitarios',
    message: 'Os universitários sugerem a alternativa A como correta.',
    sugestao: 'A',
    sucesso: true
  });
});

module.exports = router;
