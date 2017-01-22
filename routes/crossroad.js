var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');
var mongodb = require('mongodb');

// Connection URL
var url = 'mongodb://localhost:27017/test';

router.get('/', function(req, res, next) {
    if(req.session.user){
        console.log(req.session.user);
        if(req.session.user.role=='admin'){
            console.log('/phase1 redirect');
            res.redirect('phase1');    
        }else if(req.session.user.role=='user'){
            console.log('phase2 redirect');
            res.redirect('/phase2');
        }
        
    }else{
        res.redirect('/');
    }
	
});





module.exports = router;