const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const UserModel = require('../models/userModel');

class AuthUtils {
    static async verifyToken(req, res, next) {
        try {
            const token = req.params.token || req.cookies.access_token;
            if (!token) {
                return res.status(400).json({ status: 'error', message: 'Invalid token' });
            }

            const decoded = await AuthUtils.decodeToken(token);

            if (!decoded || !decoded.userId) {
                return res.status(400).json({ status: 'error', message: 'Invalid token' });
            }

            req.decoded = decoded;
            next();
        } catch (error) {
            return res.status(401).json({
                status: "error",
                message: error.message,
            });
        }
    }

    static async decodeToken(userToken) {
        try {
            const decoded = await jwt.verify(userToken, config.jwt.accessTokenSecret);
            return decoded;
        } catch (error) {
            console.error('JWT verification failed:', error);
            throw new Error('JWT verification failed');
        }
    }
}

module.exports = AuthUtils;
