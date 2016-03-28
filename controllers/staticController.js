var express = require('express');
var router  = express.Router();


router.get('/codesession/:id', function(req, res) {
	req.session.valid = req.originalUrl;
	res.redirect('/');
});


module.exports = router;
