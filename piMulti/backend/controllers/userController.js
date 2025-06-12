const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'secrettoken';

exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'E-mail já cadastrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: 'Usuário criado com sucesso', userId: newUser._id });
    } catch (err) {
        console.error('Erro ao criar usuário:', err);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Credenciais inválidas' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Credenciais inválidas' });

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
        res.status(500).json({ message: 'Erro no servidor' });
    }
};


exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

exports.updateUserScore = async (req, res) => {
    const { score } = req.body;
    console.log("Controller: req.user =", req.user);

    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        console.log('Pontuação recebida antes:', score);
        user.score = score;
        await user.save();
        console.log('Pontuação recebida depois:', score);

        res.json({ message: 'Pontuação atualizada', score: user.score });
    } catch (err) {
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); 
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar usuários' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar usuário' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json({ message: 'Usuário atualizado com sucesso', user });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar usuário' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json({ message: 'Usuário deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao deletar usuário' });
    }
};

exports.getRanking = async (req, res) => {
  try {
    const ranking = await User.find({}, 'email score') 
      .sort({ score: -1 }) 
      .limit(10); 
    res.json(ranking);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar ranking.' });
  }
};


