const dotenv = require('dotenv');
dotenv.config();


const config = {
  // Port configuration
  server: {
    port: process.env.PORT || 3000,
  },

  // Database configuration
  database: {
    url: process.env.MONGO_URI || 'mongodb+srv://yhammani:LvZTGCnQQKkIQzCE@cluster0.eeav41k.mongodb.net/?retryWrites=true&w=majority',
  },

  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET || '37f862322a3c9b16656b80292492b99292604879f846a1c8ce4d58cbe48c6c81',
    expiresIn: '10m', // Token expiration time
  },

  // Nodemailer configuration
  nodemailer: {
    host: 'smtp.ethereal.email',
    port: 587,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};

module.exports = config;
