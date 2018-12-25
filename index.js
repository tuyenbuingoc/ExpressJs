var express = require('express');
var bodyParser = require('body-parser');

var db = require('./db');

var app = express();
var port = 3000;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



var userRoute = require('./routes/user.route');

app.set('view engine', 'pug');
app.set('views','./views');

app.use('/user', userRoute);
app.get('/', function(req, res) {
    res.render('index');
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));