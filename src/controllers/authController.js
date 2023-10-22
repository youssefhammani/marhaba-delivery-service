const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const authUtils = require('../utils/authUtils');
const { sendConfirmationEmail, emailTemplates, passwordResetTemplate } = require('../utils/emailUtils');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken');

const app = express();
app.use(express.json());

const register = async (req, res) => {
    try {
        const { username, email, password, fullName, dateOfBirth, role } = req.body;
        console.log(req.body);

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
        console.log('hhh');

        await newUser.save();

        console.log('pls');
        const token = generateAccessToken(newUser._id);
        // const token = jwt.sign({ userId: newUser._id }, config.jwt.secret, {
        //     expiresIn: config.jwt.expiresIn,
        // });
        console.log("token", token);

        sendConfirmationEmail(newUser.username, newUser.email, token, emailTemplates);

        res.status(201).json({ message: 'User registered successfully please verify your email' });
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

        const accessToken = generateAccessToken(user._id);

        if (!isActivated) {
            try {
                sendConfirmationEmail(user.username, user.email, accessToken, emailTemplates);

                return res.status(400).json({
                    status: "error",
                    message: "Please check your email for an activation link.",
                });
            } catch (error) {
                console.error(error);
                return res.status(500).json({
                    status: "error",
                    message: "Failed to send the activation email. Please try again later.",
                });
            }
        }

        const refreshToken = generateRefreshToken(user._id);

        user.refreshToken = refreshToken;
        await user.save();

        return res.status(200).json({
            status: "success",
            message: "Login successful",
            data: accessToken,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: 'Login failed'
        });
    }
};

const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await user.findOne(email);

        if (!user) {
            return res.status(400).json({
                status: "error",
                message: "user not found",
            });
        }

        const resetToken = generateAccessToken(user._id);
        sendConfirmationEmail(user.username, user.email, resetToken, passwordResetTemplate);

        return res.status(201).json({
            status: "success",
            message: "Please check your email for further instructions."
        });

    } catch (err) {
        console.error('Password reset error:', err);
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
}

const resetPassword = async (req, res) => {
    try {
        const token = req.params.token;
        const decoded = await authUtils.decodeToken(token);

        if (!decoded) {
            return res.status(400).json({ status: 'error', message: 'Invalid or expired token' });
        }

        const user = await User.findOne(decoded._id);
        if (!user) {
            return res.status(400).json({ status: 'error', message: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(req.body.new_pwr, 10);

        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            status: 'success',
            message: 'Password reset successful',
        });
    } catch (err) {
        console.error('Password reset error:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }

}

module.exports = {
    register,
    login,
    forgetPassword,
    resetPassword,
};
