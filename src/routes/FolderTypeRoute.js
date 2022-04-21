const express = require('express');
const router = express.Router();
const FolderTypecontroller = require('../controllers/FolderType.controller');

router.get('/type', FolderTypecontroller.getFolderType);
router.get('/', FolderTypecontroller.getAllFolderType);
router.post('/', FolderTypecontroller.createFolderType);
router.delete('/', FolderTypecontroller.deleteFolderType);

module.exports = router;
