const Team = require('../models/Team');

exports.createTeam = async (req, res) => {
  const {
    name,
    members: [],
    teamleader,
  } = req.body;
  try {
    const team = new Team(req.body);

    await team.save();

    const paylod = {
      team: {
        id: team.id,
      },
    };
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
};

exports.getTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.team.id);
    res.json(team);
  } catch (error) {
    console.error(error.message);
    res.status(400).send('Server error');
  }
};

exports.getAllTeam = async (req, res) => {
  try {
    const team = await Team.find();
    res.send(team);
  } catch (error) {
    console.error(error.message);
    res.status(400).send('Server error');
  }
};
