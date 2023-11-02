const User = require('../models/userModel');
const UserModel = require('../models/userModel');

class UserController {
    static async activateEmail(req, res) {
        try {
            const userId = req.decoded.userId

            const user = await UserModel.findOne({ _id: userId });

            if (!user) {
                return res.status(404).json({
                    status: "error",
                    message: "User not found",
                });
            }

            user.isActivated = true;
            await user.save();

            return res.status(200).json({
                status: "success",
                message: "Email verification successful",
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: "error",
                message: "An error occurred while processing the email activation",
            });
        }
    }

    static async getUserProfile(req, res) {
        try {
            const user = await UserModel.findById(req.user.id).select('-password');

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    };

    static async updateUserProfile(req, res) {
        try {
            const user = await UserModel.findById(req.user.id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            user.fullName = req.body.fullName || user.fullName;
            user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth;

            const updatedUser = await user.save();
            res.json(updatedUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    };
}

module.exports = UserController;
