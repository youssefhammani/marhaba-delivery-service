const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

class AuthUtils {
    static async verifyToken(req, res, next) {
        try {
            const token = req.params.token || req.cookies._cks_ui;
            if (!token) {
                return res.status(400).json({ status: 'error', message: 'Invalid token' });
            }

            const decoded = await AuthUtils.decodeToken(token);

            if (!decoded || !decoded.userId) {
                return res.status(400).json({ status: 'error', message: 'Invalid token' });
            }

            req.userData = decoded;
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
            const decoded = await jwt.verify(userToken, process.env.PRIVATEKEY);
            return decoded;
        } catch (error) {
            console.error('JWT verification failed:', error);
            throw new Error('JWT verification failed');
        }
    }
}

module.exports = AuthUtils;
