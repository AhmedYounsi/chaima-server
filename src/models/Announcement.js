const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnnouncementSchema = mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  title: {
    type: String,
    required: true,
  },

  desc: {
    type: String,
    required: true,
  },

  etat: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Announcement', AnnouncementSchema);
