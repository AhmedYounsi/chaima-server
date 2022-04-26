const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const { v4: uuidv4 } = require("uuid");
const User = require('../models/User');
const checkObjectId = require('../middleware/checkObjectId');
const multer = require("multer");
const Conversation = require('../models/Conversation');

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

 
 
router.post('/',upload.single("file"), async (req, res) => { 
if(req.file.filename) return res.status(200).send(req.file.filename)
});
 

 
 
module.exports = router;
