const TimeOffType = require('../models/TimeOffType');

exports.createTimeOffType = async (req, res) => {
  try {
    const type = new TimeOffType(req.body);

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

exports.getTimeOffType = async (req, res) => {
  try {
    const type = await TimeOffType.findById(req.type.id);
    res.json(type);
  } catch (error) {
    console.error(error.message);
    res.status(400).send('Server error00000');
  }
};

exports.getAllTimeOffType = async (req, res) => {
  try {
    const type = await TimeOffType.find();
    res.send(type);
  } catch (error) {
    console.error(error.message);
    res.status(400).send('Server error000');
  }
};

exports.deleteTimeOffType = async (req, res) => {
  try {
    const deleteType = await TimeOffType.findByIdAndDelete(req.body.id);
    if (deleteType) return res.status(200).send('Time Off Type Deleted');
  } catch (error) {
    console.error(error.message);
    res.status(400).send('Server error');
  }
};
