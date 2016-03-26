module.exports = function(app,passport) {

  var usersController     = require('./controllers/usersController');
  var codesessionsController     = require('./controllers/codesessionsController');
  app.use('/users', usersController);
  app.use('/coding', codesessionsController);

  app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/home.html');
  });

  app.get('/home', function(req, res) {
    res.sendFile(__dirname + '/public/home.html');
  });

  app.get('/login', function(req, res) {
    res.json(res.locals.login);
  });

  app.get('/signup', function(req, res) {
    res.json(res.locals.login);
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

  app.get('/checkLogin', function(req, res) {
    if (req.isAuthenticated()) {
      res.json(true)
    } else {
      res.json(false);
    }
  });

}
