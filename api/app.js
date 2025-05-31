//Adiciona após a conexão com o MongoDB
const express = require('express');
const postRoutes = require('./routes/postRoutes.js');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/posts', postRoutes);

module.exports = app;
