const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DepartementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  titlePost: [],
});

module.exports = mongoose.model('Departement', DepartementSchema);
