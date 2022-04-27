const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const { v4: uuidv4 } = require("uuid");
const User = require('../models/User');
const checkObjectId = require('../middleware/checkObjectId');
const multer = require("multer");

// storage multer
const storage = multer.diskStorage({
  destination: function (req, res, callback) {
    callback(null, "uploads");
  },
  // extension
  filename: async (req, file, callback) => {
   
    callback(null, uuidv4() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

router.get("/delete",async (req,res)=>{
    const del = await Event.deleteMany({})
 console.log(del)
})

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post('/',upload.single("file"), async (req, res) => {
  const obj = JSON.parse(req.body.event);
  if( req.file) obj.image = req.file.filename
  try {
    const event = new Event(
      obj
    );

    await event.save();
    res.json(event);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
});

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get('/:id', auth, checkObjectId('id'), async (req, res) => {
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
});

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Check user
    if (event.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await event.remove();

    res.json({ msg: 'Event removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put('/like/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    // Check if the post has already been liked
    if (event.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Event already liked' });
    }

    event.likes.unshift({ user: req.user.id });

    await event.save();

    return res.json(event.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put('/unlike/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    // Check if the post has not yet been liked
    if (!event.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Event has not yet been liked' });
    }

    // remove the like
    event.likes = event.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    await event.save();

    return res.json(event.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post(
  '/comment/:id',
  auth,
  checkObjectId('id'),
  check('text', 'Text is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const event = await Event.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      event.comments.unshift(newComment);

      await event.save();

      res.json(event.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    // Pull out comment
    const comment = event.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    event.comments = event.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await event.save();

    return res.json(event.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
