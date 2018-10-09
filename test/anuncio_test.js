process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var Anuncio = require('../src/anuncios/anuncio.model');

var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../src/app');
var should = chai.should();

chai.use(chaiHttp);
describe('Anuncio', function(){
    beforeEach(function(done) {
        Anuncio.remove({}, function(error) {
            done();
        });
    });
});

describe('/GET Anuncio', function() {
    it('Deve retornar todos os usuários cadastrados no sistema', function(done) {
        chai.request(app)
        .get('/anuncio')
        .end(function(error, res) {
            res.should.have.status(200);
            res.body.should.be.a('array');
        done();
        });
    });
});