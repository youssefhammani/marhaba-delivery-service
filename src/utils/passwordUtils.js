const bcrypt = require('bcryptjs');

class PasswordUtils {
    static async hashPassword(plainPassword) {
        try {
            const saltRounds = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
            return hashedPassword;
        } catch (error) {
            console.error('Error while hashing the password:', error);
            throw new Error('Password hashing failed');
        }
    }

    static async comparePassword(plainPassword, hashedPassword) {
        try {
            const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
            return isMatch;
        } catch (error) {
            console.error('Error while comparing passwords:', error);
            throw new Error('Password comparison failed');
        }
    }
}

module.exports = PasswordUtils;
