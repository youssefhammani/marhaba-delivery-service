const mongoose = require('mongoose');
const config = require('./config/config');

const uri = config.database.url;

mongoose.connect(uri, {
    dbName: "marhaba-delivery-service",
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const db = mongoose.connection;

db.on('error', (err) => console.error('MongoDB connection error:', err));
db.once('open', () => console.log('Connected to MongoDB'));

module.exports = { db };
