const Departement = require('../models/Departement');

exports.createDepartement = async (req, res) => {
  try {
    const departement = new Departement(req.body);

    await departement.save();

    const paylod = {
      departement: {
        id: departement.id,
      },
    };
    res.status(200).send(departement);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
};

exports.getDepartement = async (req, res) => {
  try {
    const departement = await Departement.findById(req.departement.id).populate(
      titlePost
    );
    res.json(departement);
  } catch (error) {
    console.error(error.message);
    res.status(400).send('Server error00000');
  }
};

exports.getAllDepartement = async (req, res) => {
  try {
    const departement = await Departement.find();
    console.log(res);
    res.send(departement);
  } catch (error) {
    console.error(error.message);
    res.status(400).send('Server error000');
  }
};

exports.deleteDepartement = async (req, res) => {
  try {
    const deletedDepartement = await Departement.findByIdAndDelete(req.body.id);
    if (deletedDepartement) return res.status(200).send('Departement Deleted');
  } catch (error) {
    console.error(error.message);
    res.status(400).send('Server error');
  }
};
