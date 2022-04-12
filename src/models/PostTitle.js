const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostTitleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  departement: {
    type: Schema.Types.ObjectId,
    ref: 'Departement',
    required: [true, 'Departement id is required'],
  },
});

module.exports = mongoose.model('PostTitle', PostTitleSchema);
