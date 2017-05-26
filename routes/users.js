var express = require('express');
var router = express.Router();
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient
/* GET users listing. */
router.get('/', function(req, res, next) {
 var url = 'mongodb://127.0.0.1:27017/forebear';
MongoClient.connect(url,function(err,db){
	assert.equal(err,null);
	var collection = db.collection('logindata');
	collection.find({}).toArray(function(err,docs){
	assert.equal(err,null);
	res.json(docs);
    db.close();
	});	
});

});

module.exports = router;
