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
		var collection = db.collection('lists');
		collection.find({}).toArray().then(function(listarr) {
			return res.json(listarr);
			db.close();
		});
	});
});


router.get('/user/:id', function(req, res, next) {
	MongoClient.connect(url, function(err, db) {
		var collection = db.collection('lists');
		collection.find({
			userID: new mongodb.ObjectID(req.params.id)
		}).toArray().then(function(listarr) {


			/*var emass=listarr[0].evntIDs.map(function(eid){
				return {_id:eid}
			});

			var coll=db.collection('evnt');
			coll.find(emass).toArray().then(function(r){
				return res.json(r);
			});*/

			return res.json(listarr);

			db.close();	
		});
	
	});

});

router.post('/new', function(req, res, next) {
	var elist=req.body.evntIDs.map(function(ids){
		return new mongodb.ObjectID(ids);
	});
	MongoClient.connect(url, function(err, db) {
		var collection = db.collection('lists');
		var _list= {
			userID: new mongodb.ObjectID(req.body.userID),
			evntIDs:elist
		};
		
		collection.insertOne(_list).then(function(list) {
					assert.equal(1, list.insertedCount);
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
	var elist=req.body.evntIDs.map(function(ids){
		return new mongodb.ObjectID(ids);
	});
	var _list= {
			userID: new mongodb.ObjectID(req.body.userID),
			evntIDs:elist
		};

	MongoClient.connect(url, function(err, db) {		
		var collection = db.collection('lists');
		collection.findOneAndUpdate({
			_id: new mongodb.ObjectID(req.body._id)},{$set:_list}).then(function(list) {
			return res.json(list);

				db.close();		
		});

	});
});

router.delete('/del', function(req, res, next) {
	MongoClient.connect(url, function(err, db) {		
		var collection = db.collection('lists');
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