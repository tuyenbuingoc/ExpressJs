var express = require('express');

var controller = require('../controllers/product.controller');
var router = express.Router();
router.get('/index', controller.index);

module.exports = router;