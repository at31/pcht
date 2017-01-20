var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');
var mongodb = require('mongodb');

// Connection URL
var url = 'mongodb://localhost:27017/test';

/* GET all users*/
router.get('/all', function(req, res, next) {


});


router.get('/id/:id', function(req, res, next) {

});

router.post('/new',function(req,res,next){
    
});

router.post('/update',function(req,res,next){
    
});

router.delete('/del',function(req,res,next){
    
});

module.exports = router;