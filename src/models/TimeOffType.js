const mongoose = require('mongoose');

const TimeOffTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  solde: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('TimeOffType', TimeOffTypeSchema);
