const app = require('../src/index');
const request = require('supertest');

request(app)
  .get('/usuario')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '100')
  .expect(200)
  .end(function (err, res) {
    if (err) throw err;
  });