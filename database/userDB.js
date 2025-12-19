require('dotenv').config();
const mongoose = require('mongoose');


const userConnection = mongoose.createConnection(process.env.USERURI);

userConnection.on('connected', () => {
  console.log('✅ MongoDB user DB connected successfully');
});

userConnection.on('error', (err) => {
  console.error('❌ MongoDB user DB connection error:', err);
});

userConnection.on('disconnected', () => {
  console.log('⚠️ MongoDB user DB disconnected');
});

module.exports = userConnection;