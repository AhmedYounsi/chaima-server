const express = require('express');
const router = express.Router();
const ContractTypecontroller = require('../controllers/ContractType.controller');

router.get('/type', ContractTypecontroller.getContractType);
router.get('/', ContractTypecontroller.getAllContractType);
router.post('/', ContractTypecontroller.createContractType);
router.delete('/', ContractTypecontroller.deleteContractType);
router.post('/update', ContractTypecontroller.updateContractType);

module.exports = router;
