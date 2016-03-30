module.exports = function(app,passport) {

  var usersController     = require('./controllers/usersController');
  var codesessionsController     = require('./controllers/codesessionsController');
  var staticController     = require('./controllers/staticController');

  app.use('/api/v1/users', usersController);
  app.use('/api/v1/coding', codesessionsController);
  app.use('/', staticController);

  app.get('/', function(req, res) {
    res.clearCookie('redirectPairCoder');
    var url = req.session.valid || 'null';
    res.cookie('redirectPairCoder', url);
    req.session.valid = null;
    res.sendFile(__dirname + '/public/home.html');
  });

  app.get('/home', function(req, res) {
    res.sendFile(__dirname + '/public/home.html');
  });

  app.get('/logout', function(req, res) {
    req.logout();
    if (req.isAuthenticated()) {
      res.json(false)
    } else {
      res.json(true);
    }
  });

  app.post('/signup', passport.authenticate('local-signup'), function(req, res) {
      res.json(req.user)
    }
  );

  app.post('/login', passport.authenticate('local-login', {failureRedirect: '/login' }), function(req, res) {
      res.json(req.user)
    }
  );
}
