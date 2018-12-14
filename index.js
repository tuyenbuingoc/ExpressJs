var express = require('express');
var app = express();
var port = 3000;

app.set('view engine', 'pug');
app.set('views','./views');

var users = [
    {id: 1, name: 'Tuyen'},
    {id: 2, name: 'Bui'}
];
app.get('/', function(req, res) {
    res.render('index', {
        name: 'TuyenBui'
    });
});
app.get('/user', function(req, res) {
    res.render('user/index', {
        users: users
    });
});
app.get('/user/search', function(req, res) {
    var q = req.query.q;
    var matchedUsers = users.filter(function(user) {
        return user.name.toLowerCase().indexOf(q) !== -1;
    });
    res.render('user/index', {
        users: matchedUsers,
        q
    });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));