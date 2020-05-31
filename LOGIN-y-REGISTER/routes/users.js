var express = require('express');
var router = express.Router();
const registerController= require('../controllers/registerController');
const { check, validationResult, body } = require('express-validator');
const multer = require('multer');
const path=require('path');


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../public/images/users'));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
  let upload = multer({storage: storage, });


/* GET users listing. */
router.get('/register',registerController.verRegister);


router.post('/register',upload.single('image'),[
    check('name')
        .isLength({ min: 2 })
        .withMessage('El campo nombre no puede estar vacío.'),
    check('email')
        .isEmail()
        .withMessage('Por favor ingrese un email valido.'),
    check('password')
        .isLength({min:4})
        .withMessage('La contraseña debe tener al menos 4 caracteres'),
    
],registerController.crearRegister);



router.get('/login',registerController.verLogin);
router.post('/profile',registerController.verUsuario);

module.exports = router;
