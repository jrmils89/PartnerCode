var request = require('supertest');
var mongoose = require('mongoose');
var should = require('should');
var db = mongoose.connection;


describe('loading server', function () {
  var server;
  beforeEach(function () {
    delete require.cache[require.resolve('../server')];
    server = require('../server');
  });
  afterEach(function (next, done) {
    db.close(next);
    server.close(done);
  });
  it('responds to /', function (done) {
  request(server)
    .get('/')
    .expect(200, done);
  });
  it('404 everything else', function (done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});

describe('creating user', function () {
  var server;
  var userId;
  beforeEach(function () {
    delete require.cache[require.resolve('../server')];
    server = require('../server');
  });
  afterEach(function (next, done) {
    db.close(next);
    server.close(done);
  });
  it('responds to /signup', function (done) {
    request(server)
    .post('/signup')
    .send({'email': 'testemail@gmail.com', 'password': 'testpassword123'})
    .expect(200)
    .end(function(err, res) {
      if (err) done(err);
      res.body.should.have.property('_id');
      res.body.should.have.property('email', 'testemail@gmail.com');
      userId = res.body._id
      done();
    });
  });
  it('responds to /login', function(done) {
    request(server)
    .post('/login')
    .send({'email': 'testemail@gmail.com', 'password': 'testpassword123'})
    .expect(200)
    .end(function(err, res) {
      if (err) done(err);
      res.body.should.have.property('_id');
      res.body.should.have.property('email', 'testemail@gmail.com');
      done();
    });
  });
  it('deletes user', function(done) {
    request(server)
    .delete('/api/v1/users/'+userId)
    .expect(200)
    .end(function(err, res) {
      if (err) done(err);
      res.body.should.have.property('_id');
      done();
    });
  });

});