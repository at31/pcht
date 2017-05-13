var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');
var mongodb = require('mongodb');
var crypto = require('crypto');
var settings=require('./settings');

// Connection URL
//var url = 'mongodb://localhost:27017/test';
var url=settings.dbURL;
/* GET all users*/
router.get('/all', function(req, res, next) {

	MongoClient.connect(url, function(err, db) {
		var collection = db.collection('postoffices');
			collection.aggregate([							
				{
				  $lookup:{	from:"evnt",
							localField:"postalCode",
							foreignField:"postalCode", 
							as:"evnts"}
				}
				]).toArray().then(function(r){

				db.close();							
				res.setHeader('Last-Modified', (new Date()).toUTCString());
				return res.json(r);

			});
	});
});




module.exports = router;