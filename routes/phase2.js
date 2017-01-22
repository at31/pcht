var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');
var mongodb = require('mongodb');
var settings=require('./settings');

// Connection URL
//var url = 'mongodb://localhost:27017/test';
var url=settings.dbURL;

router.get('/', function(req, res, next) {
    console.log('/phase1 render');
   res.render('phase2'); 
});





module.exports = router;