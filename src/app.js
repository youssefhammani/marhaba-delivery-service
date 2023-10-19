const bcryptjs = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const jwt = require('jsonwebtoken');
const dbMiddleware = require('../database');

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(cors());

app.use(dbMiddleware);

// Routes and other app configuration
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);



module.exports = setupApp;
