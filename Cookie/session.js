var express = require("express");
var app = express();
var session = require('express-session');
app.use(session({
    secret: 'keyboard cat'
}));

app.get('/', function (req, res) {
    if (req.session.login) {
        res.send("log in");
    } else { 
        res.send("log out");
    }
    
});

app.get('/login', function (req, res) {
    req.session.login = true;
    res.send("login successfully");
});

app.listen(12346);