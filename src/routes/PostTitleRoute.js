const express = require('express');
const router = express.Router();
const postTitlecontroller = require('../controllers/postTitle.controller');

router.post('/single', postTitlecontroller.getPostTitle);
router.get('/posts', postTitlecontroller.getAllPostTitle);
router.post('/', postTitlecontroller.createPostTitle);

module.exports = router;
