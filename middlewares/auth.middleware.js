var db = require('../db');
module.exports.requireAuth = function(req, res, next) {
    if(!req.cookies.id) {
        res.redirect('/auth/login');
        return;
    }
    var user = db.get('users').find({id: req.cookies.id}).value();
    if(!user) {
        res.redirect('/auth/login');
        return;
    }
    next();
};