var express = require('express');
var shortid =  require('shortid');

var db = require('../db');

var router = express.Router();

router.get('/', function(req, res) {
    res.render('user/index', {
        users: db.get('users').value()
    });
});
router.get('/search', function(req, res) {
    var q = req.query.q;
    var matchedUsers = db.get('users').value().filter(function(user) {
        return user.name.toLowerCase().indexOf(q) !== -1;
    });
    res.render('user/index', {
        users: matchedUsers,
        q
    });
});
router.get('/create', function(req, res) {
    res.render('user/create');
});
router.get('/:id', function(req, res) {
    var id = req.params.id;
    var user = db.get('users').find({id: id}).value();
    res.render('user/view', {
        user: user
    });
});
// router.get('/:id', function(req, res) {
//     var id = parseInt(req.params.id);
//     var user = db.get('users').find({id: id}).value();
//     console.log(user);
//     res.render('user/view', {
//         user: user
//     });
// });
router.post('/create', function(req, res) {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/user');
});
module.exports = router;