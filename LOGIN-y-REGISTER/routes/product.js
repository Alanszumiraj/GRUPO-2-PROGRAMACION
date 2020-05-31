const express = require('express');
const router = express.Router();
const productControllers= require('../controllers/productControllers');

/* GET home page. */
router.get('/',productControllers.verProductos);

module.exports = router;
