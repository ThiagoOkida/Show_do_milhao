const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization header:", authHeader);
  console.log('JWT_SECRET usado:', process.env.JWT_SECRET);

  if (!authHeader || !authHeader.startsWith('Bearer ')){
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secrettoken');
    console.log("Middleware: decoded =", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log('Erro ao decodificar token:', err);
    res.status(401).json({ message: 'Token inválido' });
  }
};
