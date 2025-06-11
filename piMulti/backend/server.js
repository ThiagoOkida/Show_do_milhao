const app = require('./app'); // importa o app já configurado
const PORT = process.env.PORT || 3000;

// Só faz o listen
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
