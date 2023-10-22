const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        // required: false,
    },
    dateOfBirth: {
        type: Date,
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',// Reference to the Role model
        required: true,
        // enum: ['Manager', 'Client', 'manager', 'client', 'livreur'],
        // default: 'Client',
    },
    isActivated: {
        type: Boolean,
        default: false,
    },
    // refreshToken: {
    //     type: String,
    //     default: "",
    // },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


const User = mongoose.model('User', userSchema);

module.exports = User;
