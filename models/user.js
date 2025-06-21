const mongoose = require('mongoose');

const userschemas = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  favourites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Home'
    }
  ]
});

module.exports = mongoose.model('User', userschemas);