/* eslint-disable */

const app = require('../src/app');
const request = require('supertest');
const mocha = require('mocha');

request(app)
  .get('/usuario')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '100')
  .expect(200)
  .end(function (err, res) {
    if (err) throw err;
  });