const express = require('express');
const router = express.Router();
const Usercontroller = require('../controllers/user.controller');
const auth = require('../middleware/auth');

router.get('/', auth, Usercontroller.getUser);
router.get('/users', Usercontroller.getAllUser);
router.post('/update', Usercontroller.updateUser);
router.post('/update_password', Usercontroller.updatePassword);
router.post('/', Usercontroller.createUser);
router.post('/signin', Usercontroller.loginUser);

module.exports = router;
