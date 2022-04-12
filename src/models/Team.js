const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'employee id is required'],
    },
  ],
  teamleader: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'employee id is required'],
  },
});

module.exports = mongoose.model('Team', TeamSchema);
