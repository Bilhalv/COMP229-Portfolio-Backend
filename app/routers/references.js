var express = require('express');
var router = express.Router();

var referencesController = require('../controllers/references');

router.get('/', referencesController.referencesList);
router.get('/:id', referencesController.getByID);

router.post('/', referencesController.referenceAdd);

router.put('/:id', referencesController.referenceEdit);

router.delete('/:id', referencesController.referenceDelete);



module.exports = router;
