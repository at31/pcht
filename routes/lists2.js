﻿var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient,
	test = require('assert');
var mongodb = require('mongodb');
var crypto = require('crypto');
var settings=require('./settings');
var moment =require('moment');


var url=settings.dbURL;
/* GET all lists*/
router.get('/all', function(req, res, next) {

	MongoClient.connect(url, function(err, db) {
		var collection = db.collection('l2');
			collection.aggregate([
				{
					$lookup:
					{
						from:"users",
						localField:"executor",
						foreignField:"_id",
						as:"executor"
					}
				},
				{
					$unwind:"$executor"
				},
				{
					$unwind:"$evnts"
				},
				{
					$lookup:
					{
						from:"evnt",
						localField:"evnts.evnt",
						foreignField:"_id",
						as:"evnt"  
					}
				},
				{
					$unwind:"$evnt"
				},
				/*{
					$match:
					{
						"evnt.title":"01"
					}
				},*/
				{
					$project:
					{
						"_id":1,
						"title":1,
						"description":1,
						"created":1,
						"createdDate":1,
						"executor.login":1,
						"executor.fio":1,
						"executor._id":1,
						"executor.role":1,
						"executor.email":1,
						"evnt":1
					}
				},
				{
					$group:
					{
						_id:"$_id",
						title:{$max:"$title"},
						description:{$max:"$description"},
						created:{$max:"$created"},
						createdDate:{$max:"$createdDate"},
						executor:{$max:"$executor"},
						evnts:{$push:"$evnt"}
					}
				}],function(err,result){
					test.equal(null,err);
					res.setHeader('Last-Modified', (new Date()).toUTCString());
					res.json(result);
					db.close();
				})			
		});
});


router.post('/new', function(req, res, next) {
//new
	req.body.evnts.forEach(function(evnt){
		evnt.evnt=mongodb.ObjectId(evnt.evnt);				
	});
	req.body.createdDate=moment(req.body.createdDate).toDate();
	req.body.executor=new mongodb.ObjectID(req.body.executor);
	req.body.created=new mongodb.ObjectID(req.body.created);
	
	MongoClient.connect(url, function(err, db) {
		var collection = db.collection('l2');
		console.log(req.body);
		collection.insertOne(req.body).then(function(list) {
					test.equal(1, list.insertedCount);
					res.json({
						"status":"ok",
						"text": "Список сохранен",
						"_id":list._id
					});
					db.close();

				}, function(err) {
					db.close();
					res.json({
						"status":"err",
						"text": "Ошибка создания списка (DB error)"
					});
				});
	});
});

router.post('/update', function(req, res, next) {
	req.body.evntIDs.forEach(function(obj){
		if(obj.evnts.length>0){
			var elist=obj.evnts.map(function(ids){
				return new mongodb.ObjectID(ids);
				});
			obj.evnts=elist;
		}
	});
	req.body.userID=new mongodb.ObjectID(req.body.userID);

	MongoClient.connect(url, function(err, db) {		
		var collection = db.collection('l2');
		collection.findOneAndUpdate({
			_id: new mongodb.ObjectID(req.body._id)},{$set:_list}).then(function(list) {
			return res.json(list);

				db.close();		
		});

	});
});

router.delete('/del', function(req, res, next) {
	MongoClient.connect(url, function(err, db) {		
		var collection = db.collection('l2');
		collection.findOneAndDelete({_id: new mongodb.ObjectID(req.body._id)}).then(function(r) {
			assert.equal(1, r.lastErrorObject.n);
        	assert.equal(req.body._id, r.value._id);
			return res.json({
						"status":"ok",
						"text": "Список удален"
					});

			db.close();	
		});
	});
});


module.exports = router;