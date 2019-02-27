var db = require('../db');
var User = require('../models/user.model');
module.exports.requireAuth = function(req, res, next) {
    if(!req.signedCookies.id) {
        res.redirect('/auth/login');
        return;
    }
    var newUser = new User();
    User.findOne({_id: req.signedCookies.id}, function(err, user) {
        if(err) {
            res.send('Oops! Something went wrong!!!');
        }
        newUser = user;
    });
    if(!newUser) {
        res.redirect('/auth/login');
        return;
    }
    res.locals.user = newUser;
    next();
};