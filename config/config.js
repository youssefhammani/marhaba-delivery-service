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
    accessTokenSecret: process.env.JWT_SECRET1 || '37f862322a3c9b16656b80292492b99292604879f846a1c8ce4d58cbe48c6c81',
    accessTokenExpiresIn: '15m', // Token expiration time
    refreshTokenSecret: process.env.JWT_SECRET2 || '17842c2821b617a4c5f404ff7c6b1b869a57bfdb910c74af5378516ba4b8830c',
    refreshTokenExpiresIn: '30d',
  },

  // Nodemailer configuration
  nodemailer: {
    host: 'smtp.ethereal.email',
    port: 587,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};
// console.log("EMAIL_USER:", process.env.EMAIL_USER);

module.exports = config;
