var express = require('express');
var router = express.Router();

var usersController = require('../controllers/users');

router.get('/', usersController.usersList);
router.get('/:id', usersController.getByID);

router.post('/', usersController.userAdd);

router.put('/:id', usersController.userEdit);

router.delete('/:id', usersController.userDelete);



module.exports = router;
