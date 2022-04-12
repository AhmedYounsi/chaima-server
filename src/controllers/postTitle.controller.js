const PostTitle = require('../models/PostTitle');

exports.createPostTitle = async (req, res) => {
  const { name, departement } = req.body;
  try {
    const postTitle = new PostTitle(req.body);

    await postTitle.save();

    const paylod = {
      postTitle: {
        id: postTitle.id,
      },
    };
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
};

exports.getPostTitle = async (req, res) => {
  try {
    const postTitle = await PostTitle.findById(req.postTitle.id);
    res.json(postTitle);
  } catch (error) {
    console.error(error.message);
    res.status(400).send('Server error');
  }
};

exports.getAllPostTitle = async (req, res) => {
  try {
    const postTitle = await PostTitle.find();
    res.send(postTitle);
  } catch (error) {
    console.error(error.message);
    res.status(400).send('Server error');
  }
};
