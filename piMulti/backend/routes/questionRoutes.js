const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Rota para criar uma nova questão
router.post('/questions', async (req, res) => {
    try {
        const { titulo, descricao, nivel, categoriaId } = req.body;
        const novaQuestao = await prisma.questao.create({
            data: {
                titulo,
                descricao,
                nivel,
                categoriaId,
            },
        });
        res.status(201).json(novaQuestao);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar questão.' });
    }
});

module.exports = router;