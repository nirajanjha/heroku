var express = require('express');
var router = express.Router();



router.get('/', function(req, res){
	res.render('index');
});

router.get('/signup', function(req, res){
	res.render('signup');
});

router.get('/new-user', function(req, res){
	res.render('new-user');
});


router.get('/login', function(req, res){
	res.render('login');
});

router.get('/contact', function(req, res){
	res.render('contact');
});



module.exports = router;