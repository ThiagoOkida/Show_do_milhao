const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Credenciais inválidas' });

    // Aqui a senha é comparada usando bcrypt (correto!)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Credenciais inválidas' });

    console.log('JWT_SECRET no AUTH CONTROLLER:', process.env.JWT_SECRET);

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
    console.log('Token gerado:', token);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isProfessor: user.isProfessor,
        score: user.score
      }
    });
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};
