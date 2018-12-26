require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var db = require('./db');
var app = express();
var port = 3000;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));


var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var authMiddleware = require('./middlewares/auth.middleware');

app.set('view engine', 'pug');
app.set('views','./views');

app.use('/user', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.get('/', function(req, res) {
    res.render('index');
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));