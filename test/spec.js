var request = require('supertest');
var mongoose = require('mongoose');
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