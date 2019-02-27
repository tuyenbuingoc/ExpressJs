var db = require('../db');
var multer = require('multer');
var User = require('../models/user.model');

var upload = multer({dest: 'uploads'});

module.exports.index = function(req, res) {
    // res.render('user/index', {
    //     //users: db.get('users').value()
    // });
    User.find().exec(function(err, users) {
        if(err) {
            res.send('Ooops! Something went wrong!!!');
        }
        else {
            res.render('user/index', {
                users: users
            });
        }
    });
};

module.exports.search = function(req, res) {
    var query = req.query.query;
    var lowerCaseQuery = query.toLowerCase();
    var matchedUsers = db.get('users').value().filter(function(user) {
        return user.name.toLowerCase().indexOf(lowerCaseQuery) !== -1;
    });
    res.render('user/index', {
        users: matchedUsers,
        query
    });
};

module.exports.create = function(req, res) {
    res.render('user/create');
};
module.exports.view = function(req, res) {
    var id = req.params.id;
    //var user = db.get('users').find({id: id}).value();
    User.findOne({_id: id}).exec(function(err, user) {
        if(err) {
            res.send('Oops! Something went wrong!!!');
        }
        else {
            res.render('user/view', {
                user: user
            });
        }
    });
    
};
module.exports.postCreate = function(req, res) {
    //req.body.id = shortid.generate();
    req.body.avatar = req.file.path.split('/').slice(1).join('/');
    //db.get('users').push(req.body).write();
    var newUser = new User();
    newUser.email = req.body.email;
    newUser.name = req.body.name;
    newUser.phone = req.body.phone;
    newUser.avatar = req.body.avatar;

    newUser.save(function(err, user) {
        if(err) {
            res.send('Oops! Something went wrong!!!');
        }
    });
    res.redirect('/user');
};