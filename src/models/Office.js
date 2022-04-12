const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OfficeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  adress: {
    type: String,
    required: true,
  },
  employees: [],
});

module.exports = mongoose.model('Office', OfficeSchema);
