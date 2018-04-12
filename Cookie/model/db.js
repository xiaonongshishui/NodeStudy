var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';

var connectDB = function (callback) {
    MongoClient.connect(url, function (err, client) {
        if (err) { 
            next(err);
        }
        var db = client.db('test');
        callback(db);
    });
};
module.exports = connectDB;