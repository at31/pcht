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
			collection.aggregate([
			//{$match:{userID:new mongodb.ObjectID(req.params.id)}},		
				{
     			 $unwind: "$evntIDs"
   				},				
				{
				  $lookup:{	from:"postoffices",
							localField:"evntIDs.postalCode",
							foreignField:"postalCode", 
							as:"postalOffice"}
				},
				{
					$unwind:"$postalOffice"
				},
				{
					$unwind:{"path": "$evntIDs.evnts", "preserveNullAndEmptyArrays": true }
					
				},
				{
				  $lookup:{	from:"evnt",
							localField:"evntIDs.evnts",
							foreignField:"_id", 
							as:"evnt"}
				},
				{
					$unwind:{"path":"$evnt","preserveNullAndEmptyArrays":true}
				},
				{
				  $lookup:{	from:"users",
							localField:"userID",
							foreignField:"_id", 
							as:"user"}
				},
				{
					$unwind:"$user"
				},
				{
					$project:
					{
						"user.login":1,
						"user.email":1,
						"user.role":1,
						"user.fio":1,
						"evnt":1,
						"postalOffice":1
					}
				}/*,
				{ 
					$group :
					{ 
						_id :
						{
							ID:"$_id", postalOffice:"$postalOffice"
						},
						user:{$first:"$user"}, 
						listEvents: 
						{ 
							$addToSet: "$evnt" 
						} 
					} 
				}*/

			]).toArray().then(function(r){

				db.close();	

				var obj={};
				r.forEach(function(mbs){

					var _evnts=[];
					if(mbs.evnt)
					{
						_evnts.push(mbs.evnt);
					}

					if(!obj.hasOwnProperty(mbs._id)){

						var _l={};
						_l[mbs.postalOffice.postalCode]={
									postalOffice:mbs.postalOffice,
									evnts:_evnts
								};
						console.log(mbs.postalOffice.postalCode);							
						obj[mbs._id]={
							_id:mbs._id,
							user:mbs.user,
							list:_l
						};						
					}else{
						var _l=obj[mbs._id].list;						
						if(!_l.hasOwnProperty(mbs.postalOffice.postalCode)){
							_l[mbs.postalOffice.postalCode]={
									postalOffice:mbs.postalOffice,
									evnts:_evnts
								};
						}else{
							_l[mbs.postalOffice.postalCode].evnts.push(_evnts);
						}
					}
				});
				
				return res.json(obj);
				//return res.json(r);

			});
	});

	/*MongoClient.connect(url, function(err, db) {
		var collection = db.collection('lists');
			collection.aggregate([
			//{$match:{userID:new mongodb.ObjectID(req.params.id)}},		
				{
     			 $unwind: "$evntIDs"
   				},
				{
				  $lookup:{	from:"evnt",
							localField:"evntIDs",
							foreignField:"_id", 
							as:"listEvents"}
				},				
				{
    			  $match: { "listEvents": { $ne: [] } }
   				},
   				{
					$unwind:"$listEvents",
				},
				{
				  $lookup:{	from:"postoffices",
							localField:"listEvents.postalCode",
							foreignField:"postalCode", 
							as:"postalOffice"}
				},
				{
					$unwind:"$postalOffice"
				},
				{
				  $lookup:{	from:"users",
							localField:"userID",
							foreignField:"_id", 
							as:"user"}
				},
				{
					$unwind:"$user"
				}

			]).toArray().then(function(r){

				db.close();	

				var obj={};
				r.forEach(function(mbs){
					if(!obj.hasOwnProperty(mbs._id)){
						var _l={};
						_l[mbs.postalOffice.postalCode]={
									postalOffice:mbs.postalOffice,
									evnts:[mbs.listEvents]
								};
						console.log(mbs.postalOffice.postalCode);							
						obj[mbs._id]={
							_id:mbs._id,
							user:{
									_id:mbs.user._id,
									email:mbs.user.email,
									role:mbs.user.role,
									login:mbs.user.login,
									fio:mbs.user.fio
								},
							list:_l
						};						
					}else{
						var _l=obj[mbs._id].list;
						if(!_l.hasOwnProperty(mbs.postalOffice.postalCode)){
							_l[mbs.postalOffice.postalCode]={
									postalOffice:mbs.postalOffice,
									evnts:[mbs.listEvents]
								};
						}else{
							_l[mbs.postalOffice.postalCode].evnts.push(mbs.listEvents);
						}
					}
				});
				
				return res.json(obj);
			});
	});*/
});

router.get('/evntsbylist/:listID', function(req, res, next) {
	MongoClient.connect(url, function(err, db) {
		var collection = db.collection('lists');
			collection.aggregate([
			{$match:{_id:new mongodb.ObjectID(req.params.listID)}},		
				{
     			 $unwind: "$evntIDs"
   				},				
				{
				  $lookup:{	from:"postoffices",
							localField:"evntIDs.postalCode",
							foreignField:"postalCode", 
							as:"postalOffice"}
				},
				{
					$unwind:"$postalOffice"
				},
				{
					$unwind:{"path": "$evntIDs.evnts", "preserveNullAndEmptyArrays": true }
					
				},
				{
				  $lookup:{	from:"evnt",
							localField:"evntIDs.evnts",
							foreignField:"_id", 
							as:"evnt"}
				},
				{
					$unwind:{"path":"$evnt","preserveNullAndEmptyArrays":true}
				},
				{
				  $lookup:{	from:"users",
							localField:"userID",
							foreignField:"_id", 
							as:"user"}
				},
				{
					$unwind:"$user"
				},
				{
					$project:
					{
						"user.login":1,
						"user.email":1,
						"user.role":1,
						"user.fio":1,
						"evnt":1,
						"postalOffice":1
					}
				}

			]).toArray().then(function(r){

				db.close();	

				var obj={};
				r.forEach(function(mbs){

					var _evnts=[];
					if(mbs.evnt)
					{
						_evnts.push(mbs.evnt);
					}

					if(!obj.hasOwnProperty(mbs._id)){

						var _l={};
						_l[mbs.postalOffice.postalCode]={
									postalOffice:mbs.postalOffice,
									evnts:_evnts
								};
						console.log(mbs.postalOffice.postalCode);							
						obj[mbs._id]={
							_id:mbs._id,
							user:mbs.user,
							list:_l
						};						
					}else{
						var _l=obj[mbs._id].list;						
						if(!_l.hasOwnProperty(mbs.postalOffice.postalCode)){
							_l[mbs.postalOffice.postalCode]={
									postalOffice:mbs.postalOffice,
									evnts:_evnts
								};
						}else{
							_l[mbs.postalOffice.postalCode].evnts.push(_evnts);
						}
					}
				});
				
				return res.json(obj);

			});
});
});


router.get('/user/:id', function(req, res, next) {
	MongoClient.connect(url, function(err, db) {
		var collection = db.collection('lists');
			collection.aggregate([
			{$match:{userID:new mongodb.ObjectID(req.params.id)}},	
				{
     			 $unwind: "$evntIDs"
   				},				
				{
				  $lookup:{	from:"postoffices",
							localField:"evntIDs.postalCode",
							foreignField:"postalCode", 
							as:"postalOffice"}
				},
				{
					$unwind:"$postalOffice"
				},
				{
					$unwind:{"path": "$evntIDs.evnts", "preserveNullAndEmptyArrays": true }
					
				},
				{
				  $lookup:{	from:"evnt",
							localField:"evntIDs.evnts",
							foreignField:"_id", 
							as:"evnt"}
				},
				{
					$unwind:{"path":"$evnt","preserveNullAndEmptyArrays":true}
				},
				{
				  $lookup:{	from:"users",
							localField:"userID",
							foreignField:"_id", 
							as:"user"}
				},
				{
					$unwind:"$user"
				},
				{
					$project:
					{
						"user.login":1,
						"user.email":1,
						"user.role":1,
						"user.fio":1,
						"evnt":1,
						"postalOffice":1
					}
				}

			]).toArray().then(function(r){

				db.close();	

				var obj={};
				r.forEach(function(mbs){

					var _evnts=[];
					if(mbs.evnt)
					{
						_evnts.push(mbs.evnt);
					}

					if(!obj.hasOwnProperty(mbs._id)){

						var _l={};
						_l[mbs.postalOffice.postalCode]={
									postalOffice:mbs.postalOffice,
									evnts:_evnts
								};
						console.log(mbs.postalOffice.postalCode);							
						obj[mbs._id]={
							_id:mbs._id,
							user:mbs.user,
							list:_l
						};						
					}else{
						var _l=obj[mbs._id].list;						
						if(!_l.hasOwnProperty(mbs.postalOffice.postalCode)){
							_l[mbs.postalOffice.postalCode]={
									postalOffice:mbs.postalOffice,
									evnts:_evnts
								};
						}else{
							_l[mbs.postalOffice.postalCode].evnts.push(_evnts);
						}
					}
				});
				
				return res.json(obj);

			});

	}); 
});

router.post('/new', function(req, res, next) {
//new
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
		var collection = db.collection('lists');
		console.log(req.body);
		collection.insertOne(req.body).then(function(list) {
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


//old
/*	var elist=req.body.evntIDs.map(function(ids){
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
	});*/
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


var promiseCount = 0;

router.get('/test',function(req,res,next){
	var thisPromiseCount = ++promiseCount;

    // We make a new promise: we promise a numeric count of this promise, starting from 1 (after waiting 3s)
    var p1 = new Promise(
        // The resolver function is called with the ability to resolve or
        // reject the promise
        function(resolve, reject) {
            console.log('beforeend'+thisPromiseCount +
                ') Promise started (<small>Async code started</small>)<br/>');
            // This is only an example to create asynchronism
            setTimeout(
                function() {
                    // We fulfill the promise !
                    resolve(thisPromiseCount);
                }, Math.random() * 2000 + 1000);
        }
    );

    // We define what to do when the promise is resolved/fulfilled with the then() call,
    // and the catch() method defines what to do if the promise is rejected.
    p1.then(
        // Log the fulfillment value
        function(val) {
            console.log('beforeend'+val +'Promise fulfilled (Async code terminated)');
            //res.send('ok');
        })
    .catch(
        // Log the rejection reason
        function(reason) {
            console.log('Handle rejected promise ('+reason+') here.');
        });

    console.log('beforeend'+thisPromiseCount +'Promise made (Sync code terminated)');
    
/*
    function* generateSequence() {
    	yield MongoClient.connect(url);
		return 'doc';
	}
	let generator = generateSequence();

	let one = generator.next();
	one.value.then((db)=>{console.log(db); let stp = generator.next();
	console.log(stp);
});
	console.log(one.value);	
*/	
	var _db;
	MongoClient.connect(url)
	.then(function(db){
			_db=db;
			var collection=db.collection('lists'); 
			return collection.find().toArray();
		})
	.then(function(docs){
		console.log(docs);
		_db.close();
	});

	/*MongoClient.connect(url, function(err, db) {
		var collection = db.collection('lists');
		var t=collection.find({}).toArray();
		console.log(t);

		t.then(function(arr){
			console.log(arr);			
		});

		db.close();

	});*/
	res.send('ok');

});



//////////////////////////////////////
/*
db.l2.aggregate({$lookup:{from:"users",
                          localField:"executor",
                          foreignField:"_id",
                          as:"executor"  }
                          },{$unwind:"$executor"},
                          {$unwind:"$evnts"},
                 {$lookup:{from:"evnt",
                          localField:"evnts.evnt",
                          foreignField:"_id",
                          as:"evnt"  
                     }},{$unwind:"$evnt"},
         {$match:{"evnt.title":"01"}},
         {$project:{"_id":1,"title":1,"description":1,"created":1,"createdDate":1,"executor":1,"evnt":1}
         },
         {$group:
             {_id:"$_id",
              title:{$max:"$title"},      
              evnts:{$push:"$evnt"}   
                 }}
                )
*/




module.exports = router;