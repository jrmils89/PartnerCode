var express = require('express');
var router  = express.Router();
var Codesession = require('../models/codesession.js');
// INDEX
router.get('/', function(req, res) {
		Codesession.find({}, function(err, data) {
			res.json(data)
		});
});

// NEW
router.post('/', function(req, res) {
  var codeSession = new Codesession(req.body);
  codeSession.save(function(err,data) {
    if (err) {
			res.json(err);
		} else {
			res.json(data);
		};
  })
})


router.get('/:id', function(req, res) {
	Codesession.findById(req.params.id, function(err, data) {
		res.json(data)
	});
})


router.put('/:id', function(req, res) {
	console.log(req.body);
	Codesession.findByIdAndUpdate(req.params.id, { $set: req.body}, function(err, data) {
		res.json(data)
	});
})

// SHOW
// router.get('/:id', function(req, res) {
// 	if (res.locals.login) {
// 		req.params.id == req.user.id ? res.locals.usertrue = true : res.locals.usertrue = false;
// 		var user = User.findById(req.params.id, function(err, data) {
// 				res.render('users/show.ejs', {user: data, usertrue: res.locals.usertrue});
// 		})
// 	} else {
// 		res.redirect('/login');
// 	}
// });
//
// router.delete('/:id', function(req, res) {
// 	User.findByIdAndRemove(userid, function(err, data) {
// 		res.redirect('/users');
// 	})
// })


module.exports = router;
