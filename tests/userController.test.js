// backend/app.js
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const questionRoutes = require('./routes/questionRoutes');

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);

module.exports = app; // ✅ necessário para o Jest
