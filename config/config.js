const dotenv = require('dotenv');
dotenv.config();

const config = {
  // Port configuration
  server: {
    port: process.env.PORT || 3000,
  },

  // Database configuration
  database: {
    url: process.env.MONGO_URI || 'mongodb://localhost:27017/your-database', // MongoDB connection string
  },

  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: '10m', // Token expiration time
  },
};

module.exports = config;
