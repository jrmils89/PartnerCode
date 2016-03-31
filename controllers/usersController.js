var express = require('express');
var router  = express.Router();
var User = require('../models/user.js');
// INDEX
router.get('/', function(req, res) {
	if (res.locals.login) {
		User.find({}, function(err, data) {
			res.render('users/index.ejs', {users: data, login: res.locals.login})
		})
	} else {
		res.render('users/index.ejs', {login: res.locals.login})
	}
});

router.get('/checkLogin', function(req,res) {
	if (req.isAuthenticated()) {
		User.findById(req.user.id, function(err, data) {
			res.json(data);
		})
	} else {
		res.json(false);
	}
})

router.post('/', function(req, res) {
  var newUser = new User(req.body);
  newUser.save(function(err,data) {
    res.redirect('/users');
  })
})

router.get('/github', function(req,res) {
	// { code: '92ac8627f69749597932',
	//   user_id: '56fd89f430319c2b748bd46f' }
		console.log(req.query);
		res.json("hello");
});


// SHOW
router.get('/:id', function(req, res) {
	if (res.locals.login) {
		req.params.id == req.user.id ? res.locals.usertrue = true : res.locals.usertrue = false;
		var user = User.findById(req.params.id, function(err, data) {
				res.render('users/show.ejs', {user: data, usertrue: res.locals.usertrue});
		})
	} else {
		res.redirect('/login');
	}
});

router.delete('/:id', function(req, res) {
	User.findByIdAndRemove(req.params.id, function(err, data) {
		res.json(data);
	})
})



module.exports = router;
