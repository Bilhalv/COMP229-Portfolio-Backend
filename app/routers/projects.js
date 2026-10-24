var express = require('express');
var router = express.Router();

var projectsController = require('../controllers/projects');

router.get('/', projectsController.projectsList);
router.get('/:id', projectsController.getByID);

router.post('/', projectsController.processAdd);

router.put('/:id', projectsController.processEdit);

router.delete('/:id', projectsController.processDelete);



module.exports = router;
