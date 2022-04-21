const mongoose = require('mongoose');

const FolderTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('FolderType', FolderTypeSchema);
