const express = require('express');
const User = require('../models/userModel');
const authUtils = require('../utils/authUtils');
const roleModel = require('../models/roleModel');
const PasswordUtils = require('../utils/passwordUtils');
const { sendConfirmationEmail, emailTemplates, passwordResetTemplate } = require('../utils/emailUtils');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken');
const { decode } = require('jsonwebtoken');

const app = express();
app.use(express.json());


const register = async (req, res) => {
    try {
        const { username, email, password, fullName, dateOfBirth } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await PasswordUtils.hashPassword(password);
        const role = await roleModel.getRole(req, res);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            fullName,
            dateOfBirth,
            role: role._id,
        });

        await newUser.save();

        let token = generateAccessToken(newUser._id).replace(/\./g, '~');
        const subject = "Welcome to Marhaba Delivery Service - Confirm Your Registration ✔";
        sendConfirmationEmail(newUser.username, newUser.email, subject, token, emailTemplates);

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

        const passwordMatch = await PasswordUtils.comparePassword(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const accessToken = generateAccessToken(user._id);

        if (!user.isActivated) {
            try {
                const subject = "Welcome to Marhaba Delivery Service - Confirm Your Registration ✔";
                sendConfirmationEmail(user.username, user.email, subject, accessToken, emailTemplates);

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

        res.cookie('access_token', accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
            sameSite: 'strict'
        });
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
        });

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

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                status: "error",
                message: "user not found",
            });
        }

        const resetToken = generateAccessToken(user._id).replace(/\./g, '~');
        const subject = "Password Reset Request for Marhaba Delivery Service ✔";
        sendConfirmationEmail(user.username, user.email, subject, resetToken, passwordResetTemplate);

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
        const { newPassword, confirmPassword } = req.body;
        const userId = req.decoded.userId

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ status: 'error', message: 'Password is not match' });
        }

        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(400).json({ status: 'error', message: 'User not found' });
        }

        const hashedPassword = await PasswordUtils.hashPassword(newPassword);

        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            status: 'success',
            message: 'Password reset successful',
        });
    } catch (err) {
        console.error('Password reset error:', err);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
}

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword,
};
