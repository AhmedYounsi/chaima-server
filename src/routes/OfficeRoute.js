const express = require('express');
const router = express.Router();
const OfficeController = require('../controllers/office.controller');

router.get('/', OfficeController.getAllOffice);
router.post('/', OfficeController.createOffice);
router.delete('/', OfficeController.deleteOffice);
router.post('/update', OfficeController.updateOffice);

module.exports = router;
