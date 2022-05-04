const express = require('express');
const router = express.Router();
const TimeOffTypecontroller = require('../controllers/TimeOffType.controller');

router.get('/type', TimeOffTypecontroller.getTimeOffType);
router.get('/', TimeOffTypecontroller.getAllTimeOffType);
router.post('/', TimeOffTypecontroller.createTimeOffType);
router.delete('/', TimeOffTypecontroller.deleteTimeOffType);
router.post('/update', TimeOffTypecontroller.updateTimeOffType);

module.exports = router;
