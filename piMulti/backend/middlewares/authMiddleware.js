// Middleware para verificar se o usuário tem a permissão de professor
const User = require('../models/User');

const checkProfessorRole = async (req, res, next) => {
  try {
    const userId = req.user.id;  // Supondo que você esteja usando um sistema de autenticação baseado em JWT
    const user = await User.findById(userId);

    if (user.role !== 'professor') {
      return res.status(403).json({ message: 'Acesso negado. Apenas professores podem adicionar ou remover questões.' });
    }

    next();  // Se o usuário for professor, continuar para a próxima rota
  } catch (err) {
    res.status(500).json({ message: 'Erro ao verificar autorização', error: err });
  }
};

module.exports = checkProfessorRole;