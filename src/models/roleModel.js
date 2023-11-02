const mongoose = require('mongoose');

class roleModel {
    static roleSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true,
        },
    });

    static Role = mongoose.model('Role', roleModel.roleSchema);

    static getRole = async (req, res) => {
        try {
            const role = await roleModel.Role.findOne({ name: req.body.role });

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

    static createRole = async (req, res) => {
        try {
            const role = new roleModel.Role({
                name: req.body.name,
            });

            await role.save();

            return res.status(201).json({
                status: 'success',
                message: 'Role created successfully',
                data: role,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: 'An error occurred while creating the role.',
            });
        }
    };
}

module.exports = roleModel;
