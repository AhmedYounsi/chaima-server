const Departement = require('../models/Departement');
const PostTitle = require('../models/PostTitle');

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
    let arr = [];
    await Promise.all(
      departement.map(async (el, index) => {
        const post = await PostTitle.find({ departement: el._id });

        arr.push({
          _id: el._id,
          name: el.name,
          titlePost: post,
        });
      })
    );
    res.send(arr);
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

exports.updateDepartement = async (req, res) => {
  try {
    const departement = await Departement.findByIdAndUpdate(
      req.body.id,
      {
        name: req.body.Name,
      },

      { new: true }
    );

    res.send(departement);
  } catch (error) {
    console.log(error);
    res.status(404).send('Error updating');
  }
};
