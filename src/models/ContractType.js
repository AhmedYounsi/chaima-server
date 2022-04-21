const mongoose = require('mongoose');

const ContractTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('ContractType', ContractTypeSchema);
