const User = require('../models/User'); 
const bcrypt = require('bcryptjs'); 


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenciais inválidas.' });
    }

    const isMatch = (password === user.password); 
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciais inválidas.' });
    }
    res.status(200).json({
      message: 'Login bem-sucedido!',
      user: {
        id: user._id,
        email: user.email,
        isProfessor: user.isProfessor,
        score: user.score,
      },
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};