var express = require('express');
var router = express.Router();

var servicesController = require('../controllers/services');

router.get('/', servicesController.servicesList);
router.get('/:id', servicesController.getByID);

router.post('/', servicesController.serviceAdd);

router.put('/:id', servicesController.serviceEdit);

router.delete('/:id', servicesController.serviceDelete);



module.exports = router;
