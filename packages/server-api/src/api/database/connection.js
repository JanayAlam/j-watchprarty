const mongoose = require('mongoose');

/**
 * Connect the application with MongoDB.
 * @returns void
 */
const connectDB = async () => {
  try {
    const URI = process.env.DB_URI || 'mongodb://localhost:27017/j-watchparty';
    await mongoose.connect(URI);
  } catch (e) {
    throw new Error('Unable to connect the database');
  }
};

module.exports = connectDB;
