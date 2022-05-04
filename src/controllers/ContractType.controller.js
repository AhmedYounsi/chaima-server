const ContractType = require('../models/ContractType');

exports.createContractType = async (req, res) => {
  try {
    const type = new ContractType(req.body);

    await type.save();

    const paylod = {
      type: {
        id: type.id,
      },
    };
    res.status(200).send(type);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
};

exports.getContractType = async (req, res) => {
  try {
    const type = await ContractType.findById(req.type.id);
    res.json(type);
  } catch (error) {
    console.error(error.message);
    res.status(400).send('Server error00000');
  }
};

exports.getAllContractType = async (req, res) => {
  try {
    const type = await ContractType.find();
    res.send(type);
  } catch (error) {
    console.error(error.message);
    res.status(400).send('Server error000');
  }
};

exports.deleteContractType = async (req, res) => {
  try {
    const deleteType = await ContractType.findByIdAndDelete(req.body.id);
    if (deleteType) return res.status(200).send('Contract Type Deleted');
  } catch (error) {
    console.error(error.message);
    res.status(400).send('Server error');
  }
};

exports.updateContractType = async (req, res) => {
  try {
    const contract = await ContractType.findByIdAndUpdate(
      req.body.id,
      {
        name: req.body.Name,
      },

      { new: true }
    );

    res.send(contract);
  } catch (error) {
    console.log(error);
    res.status(404).send('Error updating');
  }
};
