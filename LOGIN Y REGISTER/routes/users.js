var express = require('express');
var router = express.Router();
const registerController= require('../controllers/registerController');

/* GET users listing. */
router.get('/register',registerController.verRegister);
router.post('/register',registerController.crearRegister);
router.get('/login',registerController.verLogin);
router.get('/profile',registerController.entrarLogin);

module.exports = router;
