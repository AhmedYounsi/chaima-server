const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  const { user, title, adress, desc, start, end, start_time } = req.body;
  try {
    const event = new Event(req.body);

    await event.save();

    const paylod = {
      event: {
        id: event.id,
      },
    };
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    res.json(event);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
};
