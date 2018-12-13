var express = require('express');
var app = express();
var port = 3000;

app.get('/', function(req, res) {
    res.send('<h1 style="color: blue">Hello<h1><a href="#" style="text-decoration:none">User</a>');
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));