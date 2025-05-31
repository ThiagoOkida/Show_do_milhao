const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const lifelineRoutes = require('./routes/lifelineRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para aceitar JSON
app.use(express.json());

// Conexão com o MongoDB
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

// Rota raiz
app.get('/', (req, res) => {
    res.send('API do Show do Milhão está no ar!');
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
