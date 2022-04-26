const mongoose = require('mongoose');

const PostTitleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  departement: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('PostTitle', PostTitleSchema);
