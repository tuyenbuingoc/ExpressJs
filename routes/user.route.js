var express = require('express');
var multer = require('multer');

var upload = multer({dest: './public/uploads/'});

var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');

var router = express.Router();

router.get('/', controller.index);
router.get('/search', controller.search);
router.get('/create', controller.create);
router.get('/:id', controller.view);
router.get('/edit/:id',controller.edit);
router.post('/edit', upload.single('avatar'), controller.postEdit);
router.get('/delete/:id', controller.delete);


router.post('/create', upload.single('avatar'), validate.postCreate, controller.postCreate);
module.exports = router;