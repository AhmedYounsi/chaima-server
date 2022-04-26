const FolderType = require('../models/FolderType');

exports.createFolderType = async (req, res) => {
  try {
    const type = new FolderType(req.body);

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

exports.getFolderType = async (req, res) => {
  try {
    const type = await FolderType.findById(req.type.id);
    res.json(type);
  } catch (error) {
    console.error(error.message);
    res.status(400).send('Server error00000');
  }
};

exports.getAllFolderType = async (req, res) => {
  try {
    const type = await FolderType.find();
    res.send(type);
  } catch (error) {
    console.error(error.message);
    res.status(400).send('Server error000');
  }
};

exports.deleteFolderType = async (req, res) => {
  try {
    const deleteType = await FolderType.findByIdAndDelete(req.body.id);
    if (deleteType) return res.status(200).send('Folder Type Deleted');
  } catch (error) {
    console.error(error.message);
    res.status(400).send('Server error');
  }
};
