var md5 = require('md5');
var shortid = require('shortid');

var db = require('../db');

module.exports.login = function(req, res) {
    res.render('auth/login');
};
module.exports.postLogin = function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var hashPassword = md5(password);
    var user = db.get('users').find({email: email}).value();
   
    if(!user) {
        res.render('auth/login', {
            errors : ['User does not exist.'],
            values: req.body
        });
        return;
    }
    if(hashPassword !== user.password) {
        res.render('auth/login', {
            errors: ['Wrong password.'],
            values: req.body
        });
        return;
    }
    res.cookie('id', user.id, {signed: true});
    res.redirect('/user');
};
module.exports.signup = function(req, res) {
    res.render('auth/signup');
};
module.exports.postSignup = function(req, res) {
    req.body.id = shortid.generate();
    var password = req.body.password;
    req.body.password = md5(password);
    db.get('users').push(req.body).write();
    res.cookie('id', req.body.id, {signed: true});
    res.redirect('/auth/login');
};