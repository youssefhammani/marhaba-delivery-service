const mongoose = require('mongoose');

class roleModel {
    static roleSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true,
        },
    });

    static Role = mongoose.model('Role', roleSchema);

    static getRole = async (req, res) => {
        try {
            const role = await this.Role.findOne({ name: req.body.role });

            if (role) {
                return role;
            } else {
                return res.status(404).json({
                    status: "error",
                    message: "Role not found",
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "An error occurred while searching for the role.",
            });
        }
    }

    static async createRole(req, res) {
        try {
            const { name } = req.body;

            const role = await Role.create({ name });

            return res.status(201).json({
                message: 'Role was created successfully',
                data: role,
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                status: 'error',
                message: 'Role creation failed',
            });
        }
    }
}

module.exports = roleModel;
