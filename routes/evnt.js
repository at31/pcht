var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');
var mongodb = require('mongodb');
var settings=require('./settings');

// Connection URL
//var url = 'mongodb://localhost:27017/test';
var url=settings.dbURL;
/* GET users listing. */
router.get('/', function(req, res, next) {

	// Use connect method to connect to the server
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		console.log("Connected successfully to server");

		findDocuments(db, function(docs) {
			db.close();

			res.json(docs);
		});
	});


	var findDocuments = function(db, callback) {
		// Get the documents collection
		var collection = db.collection('test');
		// Find some documents
		collection.find({}).toArray(function(err, docs) {
			assert.equal(err, null);
			callback(docs);
		});
	}
});


/* GET  */
router.get('/evnt/:indx', function(req, res, next) {
	
	console.log(req.params.indx);

	// Use connect method to connect to the server
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		console.log("Connected successfully to server");

		findDocuments(db, function(docs) {
			db.close();

			res.json(docs);
		});
	});


	var findDocuments = function(db, callback) {
		// Get the documents collection
		var collection = db.collection('evnt');
		// Find some documents
		collection.find({postalCode:req.params.indx}).toArray(function(err, docs) {
			assert.equal(err, null);
			callback(docs);
		});
	}
});


/* GET  map-reduce*/
router.get('/mr', function(req, res, next) {
	
	
	console.log(req.params.indx);

	// Use connect method to connect to the server
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		console.log("Connected successfully to server");

		findDocuments(db, function(docs) {
			db.close();

			res.json(docs);
		});
		
		/*var collection = db.collection('evnt');
		collection.aggregate([{"$match":{"status":{$ne:"0"}}},{"$group":{_id:"$postalCode",count:{"$sum":1}}}],function(err,result){
			console.log(result);
		});*/
	});


	var findDocuments = function(db,callback) {
		// Get the documents collection
		var collection = db.collection('evnt');
		// Find some documents
		collection.aggregate([{"$match":{"status":{$ne:"0"}}},{"$group":{_id:"$postalCode",count:{"$sum":1}}}]).toArray(function(err, docs) {
			assert.equal(err, null);
			callback(docs);
		});
	}
});



router.post('/save', function(req, res, next) {
	console.log(req.body);

	// Use connect method to connect to the server
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		console.log("Connected successfully to server");

		insertDoc(db, function() {
			db.close();
		});
	});


	var insertDoc = function(db, callback) {


		req.body.start = new Date(req.body.start);
		req.body.end = new Date(req.body.end);


		db.collection('evnt').insertOne(req.body, function(err, r) {
			assert.equal(null, err);
			assert.equal(1, r.insertedCount);
			res.json({
				"insertedid": r.insertedId
			});
		});
	}
});

router.post('/save/multi', function(req, res, next) {
	console.log(req.body);

	// Use connect method to connect to the server
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		console.log("Connected successfully to server");

		insertDoc(db, function() {
			db.close();
		});
	});


	var insertDoc = function(db, callback) {

		req.body.forEach(function(evnt){
			evnt.start = new Date(req.body.start);	
			evnt.end = new Date(req.body.end);
		});
		//req.body.start = new Date(req.body.start);
		//req.body.end = new Date(req.body.end);


		db.collection('evnt').insert(req.body, function(err, r) {
			assert.equal(null, err);
		//	assert.equal(1, r.insertedCount);
			res.json({
				"insertedid": r.insertedId
			});
		});
	}
});



router.post('/update/:id', function(req, res, next) {

	req.body.start = new Date(req.body.start);
	req.body.end = new Date(req.body.end);
	console.log(req.body);
	console.log(req.params.id);

	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		console.log("Connected successfully to server");
		db.collection('test').updateOne({
				_id: new mongodb.ObjectID(req.params.id)
					//title:'111111'
			}, {
				$set: {
					title: req.body.title,
					start: req.body.start,
					end: req.body.end,
					postalCode: req.body.postalCode,
					status: req.body.status,
					description: req.body.description,
					executor: req.body.executor
				}
			},
			function(err, r) {
				assert.equal(null, err);
				assert.equal(1, r.matchedCount);
				assert.equal(1, r.modifiedCount);

				db.close();

				res.json({
					"update": "ok"
				});
			});
	});

});

router.delete('/del/:id', function(req, res, next) {
	console.log(req.params.id);
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		console.log("Connected correctly to server");

		db.collection('test').deleteOne({
			_id: new mongodb.ObjectID(req.params.id)
		}, function(err, r) {
			assert.equal(null, err);
			assert.equal(1, r.deletedCount);

			db.close();

			res.json({
				"delete": "ok"
			});
		});
	});
});


router.post('/lquery', function(req, res, next) {

	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		console.log("Connected successfully to server");

		findDocuments(db, function(docs) {
			db.close();

			res.json(docs);
		});
	});
	var findDocuments = function(db, callback) {
		var collection = db.collection('test');
		collection.find(req.body).toArray(function(err, docs) {
			assert.equal(err, null);
			callback(docs);
		});
	}
});

router.post('/emaillist', function(req, res, next) {

	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'atcrew3@gmail.com',
			pass: 'u3fd54k7ka5l8e7x2' 
		}
	});
	var params = {
		from: 'atcrew3@gmail.com',
		to: 'atcrew3000@yandex.ru',
		subject: 'список заданий',
		text: req.body.txt
	};
	transporter.sendMail(params, function(err, res) {
		if (err) {
			console.error(err);
		}
	});

	return res.json({"status":"ok"});
});

router.get('/cc', function(req,res){
     res.clearCookie('testcook');
     res.send('Cookie deleted');
});

router.get('/sc', function(req,res){
     res.cookie('testcook' , 'cookie_value_4_testcook').send('Cookie is set');
});


module.exports = router;