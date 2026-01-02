// db.js

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/JobPortal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Successfully connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

module.exports = mongoose;
