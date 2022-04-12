const User = require('../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(400).send('Server error');
  }
};

exports.getUserByDepartement = async (req, res) => {
  try {
    const user = await User.findById(req.user.departement).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(400).send('Server error');
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const user = await User.find();
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(400).send('Server error');
  }
};

exports.createUser = async (req, res) => {
  const {
    name,
    email,
    password,
    lastName,
    tel,
    address,
    DateOfBirth,
    office,
    departement,
    post,
    reportsTo,
    typeContrat,
    from,
  } = req.body;
  const jwtToken = 'mySecretToken';
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send('{User already exists}');
    }

    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    });

    user = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const paylod = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(paylod, jwtToken, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const jwtToken = 'mySecretToken';
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ msg: 'Ivalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send({ msg: 'Ivalid credentials' });
    }

    const paylod = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(paylod, jwtToken, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
};
