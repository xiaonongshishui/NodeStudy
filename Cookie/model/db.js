var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017';

var connectDB = function (callback) {
    MongoClient.connect(url, function (err, client) {
        assert.equal(err,null);
        var db = client.db('test');
        callback(client,db);
    });
};
module.exports = connectDB;