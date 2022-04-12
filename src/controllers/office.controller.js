const Office = require('../models/Office');

exports.createOffice = async (req, res) => {
  try {
    const office = new Office(req.body);

    await office.save();

    const paylod = {
      office: {
        id: office.id,
      },
    };
    res.status(200).send(office);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
};

exports.getOffice = async (req, res) => {
  try {
    const office = await Office.findById(req.office.id).populate(employees);
    res.json(office);
  } catch (error) {
    console.error(error.message);
    res.status(400).send('Server error');
  }
};

exports.getAllOffice = async (req, res) => {
  try {
    const office = await Office.find();
    res.send(office);
  } catch (error) {
    console.error(error.message);
    res.status(400).send('Server error');
  }
};
exports.deleteOffice = async (req, res) => {
  try {
    const deletedOffice = await Office.findByIdAndDelete(req.body.id);
    if (deletedOffice) return res.status(200).send('Office Deleted');
  } catch (error) {
    console.error(error.message);
    res.status(400).send('Server error');
  }
};
