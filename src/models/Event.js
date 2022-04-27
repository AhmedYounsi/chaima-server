const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  office: {
    type: String,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  adress: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
 
  end: {
    type: String,
    required: true,
  },
  time: {
    type: [],
    required: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: String,
    default: new Date().getTime(),
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
    },
  ],
});

module.exports = mongoose.model('Event', EventSchema);
