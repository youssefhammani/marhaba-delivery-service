const app = require('./app');
const config = require('./config');
// const http = require('http');

const PORT = config.server.port;
// const server = http.createServer(app);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


server.on('error', (error) => {
  console.error('Server error:', error);
  process.exit(1);
});

process.on('unhandledRejection', (err, promise) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => promise.exit(1));
});

process.on('uncaughtException', (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
  server.close(() => process.exit(1));
});
