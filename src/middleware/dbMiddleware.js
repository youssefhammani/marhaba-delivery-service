const { db } = require('../../database');

function injectDatabase(req, res, next) {
  req.db = db;
  next();
}

module.exports = injectDatabase;
