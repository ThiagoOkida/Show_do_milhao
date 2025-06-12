const Question = require('../models/Question');
const { removeWrongAnswers, askFriend } = require('../services/lifelineService');

exports.useRemoveHelp = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) return res.status(404).json({ error: 'Pergunta não encontrada' });

        const filteredOptions = removeWrongAnswers(question.correctAnswer, question.options);
        res.json({ options: filteredOptions });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao aplicar ajuda de remover alternativas' });
    }
};

exports.useAskHelp = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) return res.status(404).json({ error: 'Pergunta não encontrada' });

        const suggestion = askFriend(question.correctAnswer, question.options);
        res.json({ suggestion });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao aplicar ajuda do amigo' });
    }
};

exports.useSkip = (req, res) => {
    res.json({ message: 'Questão pulada. Próxima pergunta deve ser carregada.' });
};
