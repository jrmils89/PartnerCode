// ===============================================================================
// Setup 'Dose Requirements
// ===============================================================================

var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var mongoose = require('mongoose');
var db = mongoose.connection;
var session        = require('express-session');
var cookieParser   = require('cookie-parser');
var passport       = require('passport');
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/paircoder';


// ===============================================================================
// Setup Dat Port Info, like Columbus
// ===============================================================================

// ===============================================================================
// Middlewares
// ===============================================================================
mongoose.connect(mongoUri);

// Add ability to render static files
app.use(express.static('public'));

// Setting up that stalker stuff
logger.token('ip_address', function(req, res){ return req.connection._peername.address; });
logger.token('user_id', function(req, res) {
  if (req.user) {
    return 'user:'+req.user.email
  } else {
    return 'user:'+null
  };
});

app.use(logger(':method :url :status :user-agent :ip_address :remote-addr :response-time :user_id ms -'));

// Setting up body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


require('./config/passport')(passport);

app.use(cookieParser());

app.use(session({ secret: 'emailcomposerapp' }));
app.use(passport.initialize());
app.use(passport.session());
// app.use(methodOverride(function(req, res){
//   if (req.body && typeof req.body === 'object' && '_method' in req.body) {
//     var method = req.body._method;
//     delete req.body._method;
//     return method;
//   }
// }));

app.use(function(req, res, next) {
  res.locals.login = req.isAuthenticated();
  next();
});



io.on('connection', function(socket, req){

  socket.on('disconnect', function(){
    var rooms = io.sockets.adapter.rooms;
    io.emit('leftRoom', rooms);
  });


  var rooms = io.sockets.adapter.rooms;
  rooms[socket.id].urlName = socket.handshake.query.pathName;
  io.emit('roomsUpdated', rooms);


  socket.on('change event', function(value) {
    io.emit('event change', value);
  });
});

// ===============================================================================
// Routing / Contorllers
// ===============================================================================
require('./routes.js')(app, passport);

// ===============================================================================
// Listen To The World!
// ===============================================================================


db.once('open', function() {
  console.log('Connected To Mongoose')
  http.listen(port, function() {
    console.log('Listening....')
  })
})



module.exports = http;


