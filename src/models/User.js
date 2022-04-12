const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    match: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
    minlength: 5,
  },
  role: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now(),
  },
  lastName: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  DateOfBirth: {
    type: Date,
  },

  office: {
    type: Schema.Types.ObjectId,
    ref: 'Office',
  },

  post: {
    type: Schema.Types.ObjectId,
    ref: 'PostTitle',
    required: true,
  },
  reportsTo: {
    type: String,
  },

  typeContrat: {
    type: String,
    required: true,
  },

  from: {
    type: Date,
  },
});

module.exports = mongoose.model('User', UserSchema);
