var express = require('express');
var app = express();
var port = 3000;

var bodyParser = require('body-parser');

var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
var db = low(adapter);
db.defaults({users: []}).write();

app.set('view engine', 'pug');
app.set('views','./views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function(req, res) {
    res.render('index', {
        name: 'TuyenBui'
    });
});
app.get('/user', function(req, res) {
    res.render('user/index', {
        users: db.get('users').value()
    });
});
app.get('/user/search', function(req, res) {
    var q = req.query.q;
    var matchedUsers = db.get('users').value().filter(function(user) {
        return user.name.toLowerCase().indexOf(q) !== -1;
    });
    res.render('user/index', {
        users: matchedUsers,
        q
    });
});
app.get('/user/create', function(req, res) {
    res.render('user/create');
});
app.get('/user/:id', function(req, res) {
    var id = parseInt(req.params.id);
    var user = db.get('users').find({id: id}).value();
    res.render('user/view', {
        user: user
    });
});
app.post('/user/create', function(req, res) {
    db.get('users').push(req.body).write();
    res.redirect('/user');
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));