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
module.exports.view = async function(req, res) {
    try {
        var id = req.params.id;
        var user = await User.findOne({_id: id}).exec();
        res.render('user/view', {
            user: user
        });
    } catch (error) {
        throw error;
    }
}
module.exports.edit = async function(req, res){
    var id = req.params.id;
    var user = await User.findById({_id: id}).exec();
    res.render('user/edit', {
        values: user
    });
}

module.exports.postEdit = function(req, res){
    User.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err) => {
        if(!err) {
            res.redirect('/user');
        }
    });
}

module.exports.postCreate = function(req, res) {
    //req.body.id = shortid.generate();
    req.body.avatar = req.file.path.split('/').slice(1).join('/');
    //db.get('users').push(req.body).write();
    var newUser = new User();
    newUser.email = req.body.email;
    newUser.name = req.body.name;
    newUser.phone = req.body.phone;
    newUser.avatar = req.body.avatar;

    newUser.save(function(err) {
        if(err) {
            res.send('Oops! Something went wrong!!!');
        }
    });
    res.redirect('/user');
};
module.exports.delete = function(req, res) {
    User.findByIdAndDelete({_id: req.params.id}, (err, doc) => {
        if(!err) {
            res.redirect('/user');
        }
        else {
            console.log(err);
        }
    });
}