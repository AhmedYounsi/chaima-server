const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
  users: [],
  messages:[],
  usernames:[],
  lastsender :{
    type: String,
  },
  seen: {
    type: Boolean,
    default: false,
  },
  time :{
    type: String,
  },
});

module.exports = mongoose.model('Conversation', ConversationSchema);
