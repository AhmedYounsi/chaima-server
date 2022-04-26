const PostTitle = require('../models/PostTitle');

exports.createPostTitle = async (req, res) => {
  try {
    const post = new PostTitle(req.body);

    await post.save();
    res.status(200).send(post);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
};

exports.getPostTitle = async (req, res) => {

  try {
    const post = await PostTitle.find({ departement: req.body.data.id });
    res.status(200).json(post);
  } catch (error) {
    console.error(error.message);
    res.status(400).send('Server error');
  }
};

exports.getAllPostTitle = async (req, res) => {
  try {
    const post = await PostTitle.find();
    res.send(post);
  } catch (error) {
    console.error(error.message);
    res.status(400).send('Server error');
  }
};
exports.deletePostTitle = async (req, res) => {
  try {
    const deletedPost = await PostTitle.findByIdAndDelete(req.body.id);
    if (deletedPost) return res.status(200).send(' Deleted');
  } catch (error) {
    console.error(error.message);
    res.status(400).send('Server error');
  }
};
