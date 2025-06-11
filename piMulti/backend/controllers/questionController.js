const Question = require('../models/Question'); 
const User = require('../models/User'); 

// Valores dos checkpoints e progressão financeira
const PROGRESSAO = [0, 1000, 5000, 10000, 50000, 100000, 300000, 500000, 1000000];
const CHECKPOINTS = [0, 3, 6, 9]; 

exports.getNextQuestion = async (req, res) => {
    try {
        // Busca uma pergunta aleatória que o usuário ainda não respondeu
        const userId = req.user.id;
        const user = await User.findById(userId);
        const answeredIds = user.answeredQuestions || [];

        const question = await Question.findOne({ _id: { $nin: answeredIds } });
        if (!question) return res.status(404).json({ message: 'No more questions.' });

        res.json({ question });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.submitAnswer = async (req, res) => {
    try {
        const userId = req.user.id;
        const { questionId, answer } = req.body;

        const question = await Question.findById(questionId);
        if (!question) return res.status(404).json({ message: 'Question not found.' });

        const user = await User.findById(userId);

        // Verifica se já respondeu
        if (user.answeredQuestions.includes(questionId)) {
            return res.status(400).json({ message: 'Question already answered.' });
        }

        let isCorrect = question.correctAnswer === answer;
        let correctCount = user.correctCount || 0;
        let checkpointIndex = user.checkpointIndex || 0;
        let score = user.score || 0; // Adiciona score

        if (isCorrect) {
            correctCount += 1;
            score += 10; // Incrementa score a cada resposta correta (ajuste o valor se quiser)
            // Atualiza checkpoint se necessário
            if (CHECKPOINTS.includes(correctCount)) {
                checkpointIndex = CHECKPOINTS.indexOf(correctCount);
            }
            // Se chegou ao final
            if (correctCount >= PROGRESSAO.length - 1) {
                user.prize = PROGRESSAO[PROGRESSAO.length - 1];
                user.score = score;
                await user.save();
                return res.json({ message: 'Parabéns! Você ganhou 1 milhão!', prize: user.prize, finished: true, score: user.score });
            }
        } else {
            // Errou, recebe valor do último checkpoint
            user.prize = PROGRESSAO[CHECKPOINTS[checkpointIndex]];
            user.correctCount = 0;
            user.checkpointIndex = 0;
            user.answeredQuestions = [];
            user.score = score; // Salva score atual
            await user.save();
            return res.json({ message: 'Resposta errada!', prize: user.prize, finished: true, score: user.score });
        }

        // Atualiza usuário
        user.answeredQuestions.push(questionId);
        user.correctCount = correctCount;
        user.checkpointIndex = checkpointIndex;
        user.prize = PROGRESSAO[correctCount];
        user.score = score; // Salva score atualizado
        await user.save();

        res.json({
            correct: isCorrect,
            prize: user.prize,
            checkpoint: CHECKPOINTS[checkpointIndex],
            finished: false,
            score: user.score // Retorna score
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getByKnowledgeArea = async (req, res) => {
  try {
    const { knowledgeArea, knowledgeAreas } = req.body;
    let filter = {};
    if (knowledgeAreas && Array.isArray(knowledgeAreas)) {
      filter.knowledgeArea = { $in: knowledgeAreas };
    } else if (knowledgeArea) {
      filter.knowledgeArea = knowledgeArea;
    }
    const questions = await Question.find(filter);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar perguntas.' });
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar perguntas.' });
  }
};

exports.createQuestion = async (req, res) => {
  try {
    const { questionText, correctAnswer, wrongAnswers, knowledgeArea, difficulty } = req.body;

    if (!questionText || !correctAnswer || !wrongAnswers || !knowledgeArea) {
      return res.status(400).json({ message: 'Campos obrigatórios ausentes.' });
    }

    const newQuestion = new Question({
      questionText,
      correctAnswer,
      wrongAnswers,
      knowledgeArea,
      difficulty: difficulty || 1
    });

    await newQuestion.save();
    res.status(201).json({ message: 'Pergunta criada com sucesso!', question: newQuestion });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar pergunta.', error: err.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    await Question.findByIdAndDelete(id);
    res.json({ message: 'Pergunta deletada com sucesso!' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar pergunta.', error: err.message });
  }
};
