var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var connectDB = require("./model/db.js");
var crypto = require("crypto");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'keyboard cat'
}));

app.get('/', function (req,res) { 
    if (req.session.isLogin) {
        res.send("Welcome back: " + req.session.username);
    } else { 
        res.send("Please log in");
    }
});

app.get('/login', function (req, res) {
    res.render("login");
});

app.post('/register', function (req, res) { 
    var username = req.body.username;
    var password = req.body.password;
    if (username && password) {
        //encrypt password by md5
        var hash = crypto.createHash('md5');
        

        connectDB(function (client,db) {
            db.collection("users").insertOne({username:username});
        });
    }
});


app.post("/login", function (req, res, next) {
    console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;
    if (username && password) {
        connectDB(function (client, db) {
            db.collection("users").find({ "username": username }).toArray(function (err, documents) {
                if (err) {
                    next(err);
                }
                console.log("documents", documents);
                if (documents.length === 0) {
                    return next(new Error("No account"));
                }
                if (documents[0].password === password) {
                    req.session.isLogin = true;
                    req.session.username = username;
                    res.send("Login success,welcome back: "+ username);
                } else { res.send("wrong password"); }
                client.close();
            })
        });
    }
});

app.use(function (err, req, res, next) {
    console.log(err);
    res.send(err);
});

app.listen(12345);