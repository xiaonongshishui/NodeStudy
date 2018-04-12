var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var connectDB = require("./model/db.js");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'keyboard cat'
}));

app.get('/', function (req,res) { 
    res.render("login");
});

app.post("/login", function (req, res) {
    console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;
    res.end();
});

app.use(function (err) { 
    console.error(err);
});

app.listen(12345);