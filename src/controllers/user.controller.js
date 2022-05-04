const User = require('../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
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
  const { email, password } = req.body;
  const username = req.body.name + ' ' + req.body.lastName;
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

    const send = await sendmail(email, username);
    console.log(send);
    res.json({ user });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
};

exports.updateUser = async (req, res) => {
  try {
    const uploaded = await User.findByIdAndUpdate(
      req.body.id,
      {
        name: req.body.Name,
        lastName: req.body.LastName,
        tel: req.body.Tel,
      },

      { new: true }
    );

    res.send(uploaded);
  } catch (error) {
    console.log(error);
    res.status(404).send('Error updating');
  }
};

exports.updatePassword = async (req, res) => {
  const { id, OldPassword, NewPassword } = req.body;
  const user = await User.findById(id);
  const passwords_compare = await bcrypt.compare(OldPassword, user.password);

  if (!passwords_compare) return res.status(404).send('Mot de passe incorrect');
  else {
    const hashPassowrd = await bcrypt.hash(NewPassword, 10);
    const updatedPassword = await User.findByIdAndUpdate(
      id,
      { password: hashPassowrd },
      { new: true }
    );
    res.status(200).send('Password changed successfully !');
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const jwtToken = 'mySecretToken';
  try {
    let user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).send({ msg: 'Ivalid credentials not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .send({ msg: 'Ivalid credentials password incorrect' });
    }

    const paylod = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(paylod, jwtToken, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token, user });
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
};

const sendmail = async (mail, username) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Outlook365',
      host: 'smtp.office365.com',
      port: '587',
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false,
      },
      auth: {
        user: 'rhaddinn@outlook.fr',
        pass: 'azertyuiop123',
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"RHADDINN" rhaddinn@outlook.fr`, // sender address
      to: `${mail}`, // list of receivers
      subject: 'Verification Adresse mail', // Subject line
      text: 'RHADDINN', // plain text body
      html: `
     
      <div style="max-width: 500px;
      margin: auto;
      background-color: #9e9e9e1a;
      padding: 30px;font-family: system-ui;border: 1px solid #cbcbcb;">
     <div style="display: flex;justify-content: center;align-items: center;">
      <img style="width: 200px;margin: auto;" src="https://res.cloudinary.com/dg3ftjfp0/image/upload/v1643880068/download_vfvl5h.png" alt="">
  
     </div>
        <h2>Confirmation compte Doctoplanet</h2>  
          
          <b>Bonjour ${username}</b> <br>
           Merci d'avoir rejoint Doctoplanet.     
           Nous aimerions vous confirmer que votre compte a été créé avec succès. Pour accéder au compte, cliquez sur le lien ci-dessous
         
           <br />  
           
        <p style="margin:0">Si vous rencontrez des difficultés pour vous connecter à votre compte, contactez-nous.</p>
           Cordialement<br />  
           L'équipe du RHaddinn.
      </div>
      `,
    });
    return info;
  } catch (error) {
    return error;
  }
};
