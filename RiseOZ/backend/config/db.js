const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// MongoDB Cloud connection string with properly encoded password
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://rizeos-user-01:rizeos-user-01%40user@rizeos-cluster.lqoxzvd.mongodb.net/?retryWrites=true&w=majority&appName=RizeOS-Cluster';

// Set up Mongoose connection
mongoose.connect(MONGODB_URI, {
    dbName: 'linkedx',
});

const db = mongoose.connection;

// Event listeners for Mongoose connection
db.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
});

db.once('open', () => {
    console.log('Connected to MongoDB Cloud');
});

process.on('SIGINT', () => {
    db.close(() => {
        console.log('MongoDB connection closed due to process termination');
        process.exit(0);
    });
});

module.exports = db;
