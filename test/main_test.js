const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const should = chai.should();
const expect = require('chai').expect;

chai.use(chaiHttp);

//Test suite

//initial mocha test
describe('Mocha', function () {
  it('should run our tests using npm', function(){
    expect(true).to.be.ok;
  });
});

//When I make a request to the GET / route, the index page correctly loads
describe('routes/index.js', function () {
  it('should return a 200 or 304 response', function (done) {
    chai.request(server)
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200 || 304);
        done();
      })
  })
});

//When I make a request to the GET /about route, the about page correctly loads
describe('routes/index.js', function () {
  it('should return a 200 or 304 status code', function (done) {
    chai.request(server)
      .get('/about')
      .end(function(err, res) {
        res.should.have.status(200 || 304);
        done();
      })
  })
});





//When I make a request to the POST / route with server-side validation passed, 200 or 302 status
describe('routes/index.js', function () {
  it('should return a 401 status code for server-side validation form submission pass on POST /', function (done) {
  chai.request(server)
    .post('/')
    .type('form')
    .send({
      '_method': 'POST',
      'fullName': 'RS',
      'emailAddress': '12345@gmail.com'
    })
    .end(function(err, res) {
      res.should.have.status(200 || 302);
      done();
    })
  })
});

//When I make a request to the POST / route with server-side validation failed, 401 status
describe('routes/index.js', function () {
  it('should return a 401 status code for server-side validation form submission fail on POST /', function (done) {
  chai.request(server)
    .post('/')
    .type('form')
    .send({
      '_method': 'POST',
      'fullName': 'RS',
      'emailAddress': '12345@gmail.com'
    })
    .end(function(err, res) {
      res.should.have.status(401);
      done();
    })
  })
});

//When I make a request to the POST /about route with server-side validation passed, 200 or 302 status
describe('routes/index.js', function () {
  it('should return a 200 or 302 status code for server-side validation form submission pass on POST /about', function (done) {
  chai.request(server)
    .post('/about')
    .type('form')
    .send({
      '_method': 'POST',
      'fullName': 'RS',
      'emailAddress': '1234567890@gmail.com'
    })
    .end(function(err, res) {
      res.should.have.status(200 || 302);
      done();
    })
  })
});

//When I make a request to the POST /about route with server-side validation failed, 401 status
describe('routes/index.js', function () {
  it('should return a 401 status code for server-side validation form submission fail on POST /about', function (done) {
  chai.request(server)
    .post('/about')
    .type('form')
    .send({
      '_method': 'POST',
      'fullName': 'RS',
      'emailAddress': '1234567890@gmail.com'
    })
    .end(function(err, res) {
      res.should.have.status(401);
      done();
    })
  })
});

//When I make a request to a nonexistant route, 404 status
describe('routes/index.js', function () {
  it('should return a 404 status code for a nonexistent route', function (done) {
  chai.request(server)
    .get('/randomroute')
    .end(function(err, res) {
      res.should.have.status(404);
      done();
    })
  })
});
