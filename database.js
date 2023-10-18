const mongoose = require('mongoose');
const config = require('./config');

const uri = config.database.url;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define your models here if needed

const db = mongoose.connection;

db.on('error', (err) => console.error('MongoDB connection error:', err));
db.once('open', () => console.log('Connected to MongoDB'));

module.exports = { db };
