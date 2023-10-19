const express = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const { sendConfirmationEmail } = require('../utils/emailUtils');

const app = express();
app.use(express.json());

const register = async (req, res) => {
    try {
        const { username, email, password, fullName, dateOfBirth, role } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            fullName,
            dateOfBirth,
            role: role || 'Client',
        });

        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, config.jwt.secret, {
            expiresIn: config.jwt.expiresIn,
        });

        sendConfirmationEmail(newUser.email, token);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Registration failed' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, config.jwt.secret, {
            expiresIn: config.jwt.expiresIn,
        });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Login failed' });
    }
};

module.exports = {
    register,
    login,
};
