const express = require('express');
const router = express.Router();
const Departementcontroller = require('../controllers/departement.controller');

router.get('/departement', Departementcontroller.getDepartement);
router.get('/', Departementcontroller.getAllDepartement);
router.post('/', Departementcontroller.createDepartement);
router.delete('/', Departementcontroller.deleteDepartement);
router.post('/update', Departementcontroller.updateDepartement);

module.exports = router;
