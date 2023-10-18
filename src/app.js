const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const dbMiddleware = require('/database');

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(cors());

app.use(dbMiddleware);

// Routes and other app configuration
const authRoutes = require('/src/routes/authRoutes');
const userRoutes = require('/src/routes/userRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);



module.exports = setupApp;
