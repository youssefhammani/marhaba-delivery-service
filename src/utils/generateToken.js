const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, config.jwt.accessTokenSecret, {
        expiresIn: config.jwt.accessTokenExpiresIn,
    });
};

const generateRefreshToken = (userId) => {
    const refreshToken = jwt.sign({ userId }, config.jwt.refreshTokenSecret, {
        expiresIn: config.jwt.refreshTokenExpiresIn,
    });
    return refreshToken;
};

module.exports = { generateAccessToken, generateRefreshToken };