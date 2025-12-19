require('dotenv').config();
const mongoose = require('mongoose');


const postDBConnection = mongoose.createConnection(process.env.POSTURI);

postDBConnection.on('connected', () => {
  console.log('✅ MongoDB post DB connected successfully');
});

postDBConnection.on('error', (err) => {
  console.error('❌ MongoDB post DB connection error:', err);
});

postDBConnection.on('disconnected', () => {
  console.log('⚠️ MongoDB post DB disconnected');
});

module.exports = postDBConnection;