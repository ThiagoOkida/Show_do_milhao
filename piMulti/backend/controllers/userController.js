const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'secrettoken';

// Função para criar (registrar) um novo usuário
exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Verifica se já existe um usuário com esse e-mail
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'E-mail já cadastrado' });
        }

        // Criptografa a senha antes de salvar
        const hashedPassword = await bcrypt.hash(password, 10);

        // Cria e salva o novo usuário
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

// Login do usuário e geração do token JWT
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Credenciais inválidas' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Credenciais inválidas' });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

// Retorna os dados do usuário logado (requere middleware de autenticação)
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

// Atualiza a pontuação do usuário após o quiz (requere middleware de autenticação)
exports.updateUserScore = async (req, res) => {
    const { score } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        user.score = score;
        await user.save();

        res.json({ message: 'Pontuação atualizada', score: user.score });
    } catch (err) {
        res.status(500).json({ message: 'Erro no servidor' });
    }
};
