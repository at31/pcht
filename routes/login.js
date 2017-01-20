var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');
var mongodb = require('mongodb');
var crypto = require('crypto');

// User API
// Connection URL
var url = 'mongodb://localhost:27017/test';

//login
router.post('/', function(req, res, next) {
    
    console.log(req.body);
    
    MongoClient.connect(url, function(err, db) {
        var collection = db.collection('users');
        collection.findOne({ email: req.body.email }).then(function(user) {
            if(user){
                console.log(user);    
            }else{
                console.log('нет такого...');
            }
            
            //передача пароля открытым способом не хорошая идея, надо на клиенте делать хэш... временно оставил
            if(user.pass==hash(req.body.pass)){
                req.session.user = {id: user._id, name: user.name, role:user.role};
				res.json({"status":"login"});
            }else{
                res.json({"status":"Невреный пароль"});
            }

            db.close();
        }, function(err){
            console.log('db error');
            console.log(err);
            res.json('{"status":"db error"}');
            db.close(); 
        });
    });
    
   /* MongoClient.connect(url, function(err, db) {
        var collection = db.collection('evnt');
        collection.findOne({ _id: new mongodb.ObjectID("58703da2c064e912532c0aa2")}).then(function(doc) {
            console.log(doc);
            db.close(); 
        });
    });*/


});
//create new
router.post('/new', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        var collection = db.collection('users');
        var _user={email:req.body.email,pass:hash(req.body.pass),role:req.body.role};
        collection.insertOne(_user).then(function(user) {
            console.log(user);
            assert.equal(1, user.insertedCount);
            res.json({"status":"Пользователь создан, авторизируйтесь"});
            db.close();

        }, function(err){
            console.log('not find user');
            console.log(err);
             db.close();
            res.json({"status":"Ошибка создания пользователя (DB error)"});
        });
    });
});
//log out
router.post('/out', function(req, res, next) {
    
});

function hash(text) {
    return crypto.createHash('sha1')
        .update(text).digest('base64')
}

module.exports = router;
