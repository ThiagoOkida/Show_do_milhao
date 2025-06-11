const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const lifelineRoutes = require('./routes/lifelineRoutes');
const dbRoutes = require('./routes/dbRoutes');
const questionRoutes = require('./routes/questionRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

// Middlewares globais
app.use(express.json());
app.use(cors());

// Conexão com o MongoDB (apenas conecta, não faz listen)
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado ao MongoDB com sucesso!'))
.catch((err) => {
    console.error('❌ Erro ao conectar no MongoDB:', err);
    process.exit(1);
});

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/lifeline', lifelineRoutes);
app.use('/api/db', dbRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/auth', authRoutes);

// Rota raiz (opcional)
app.get('/', (req, res) => {
    res.send('API do Show do Milhão está no ar!');
});

module.exports = app;
