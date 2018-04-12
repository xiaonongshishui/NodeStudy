var express = require("express");
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser());

app.get('/', function (req, res) { 
    //res.clearCookie('_pUser', {path:"/"});
   //guess what you like
    req.cookies.destination 
    res.send("You like these places: "+req.cookies.destination );
});

app.get('/ticket', function (req,res) { 
    var destination = req.query.destination;
    
    //record customers' prefers
    var arr = req.cookies.destination || [];
    if (arr.indexOf(destination) === -1) { 
        arr.push(destination);
    }
    res.cookie("destination",arr);
    res.send(destination + " ticket");
});

app.listen(12345);

