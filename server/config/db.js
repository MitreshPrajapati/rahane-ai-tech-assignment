const mongoose = require('mongoose');

const db_url = process.env.MONGODB_URL || 'mongodb://localhost:27017/rahane_tech'
const connectDB = async () => {
    try {
        await mongoose.connect(db_url);
        console.log('MongoDB connected.')
    } catch (error) {
        console.log('MongoDB connection failed.')
    }
}

module.exports = { connectDB };