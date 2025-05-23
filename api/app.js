//Adiciona após a conexão com o MongoDB
const express = require('express');
const postRoutes = require('./routes/postRoutes.js');

const app = express();
app.use(express.json());
app.use('/api/posts', postRoutes);

module.exports = app;
