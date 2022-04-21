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
    console.log(res);
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
