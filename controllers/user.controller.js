var db = require('../db');
var shortid = require('shortid');

module.exports.index = function(req, res) {
    res.render('user/index', {
        users: db.get('users').value()
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
    var user = db.get('users').find({id: id}).value();
    res.render('user/view', {
        user: user
    });
};
module.exports.postCreate = function(req, res) {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/user');
};