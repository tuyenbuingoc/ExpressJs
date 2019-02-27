var md5 = require('md5');
var shortid = require('shortid');
var User = require('../models/user.model');

var db = require('../db');

module.exports.login = function(req, res) {
    res.render('auth/login');
};
module.exports.postLogin = function(req, res) {
    var email = req.body.email;
    var hashPassword = md5(req.body.password);
    //var user = db.get('users').find({email: email}).value();
    var user = new User();
    User.findOne({email: email}, function(err, users) {
        if(err) {
            res.send('Oops! Something went wrong');
        }
        else {
            console.log(users);
            user.email = users.email;
            user.password = users.password;
            user = users;
            console.log(user);
            console.log(user.password);
            console.log(hashPassword);
        }
    });
    if(!user) {
        res.render('auth/login', {
            errors : ['User does not exist.'],
            values: req.body
        });
        return;
    }
    if(hashPassword !== user.password) {
        console.log(hashPassword);
        console.log(user.password);
        res.render('auth/login', {
            errors: ['Wrong password.'],
            values: req.body
        });
        return;
    }
    res.cookie('id', user._id, {signed: true});
    res.redirect('/user');
};
module.exports.signup = function(req, res) {
    res.render('auth/signup');
};
module.exports.postSignup = function(req, res) {
    //req.body.id = shortid.generate();
    //var password = req.body.password;
    //req.body.password = md5(password);
    //db.get('users').push(req.body).write();
    var newUser = new User();
    newUser.email = req.body.email;
    newUser.password = md5(req.body.password);
    newUser.name = req.body.name;
    newUser.phone = req.body.phone;
    newUser.save(function(err, user) {
        if(err) {
            res.send('Oops! Something went wrong');
        }
    });
    //res.cookie('id', req.body.id, {signed: true});
    res.redirect('/auth/login');
};