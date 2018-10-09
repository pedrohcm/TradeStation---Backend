process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var Pergunta = require('../src/perguntas/pergunta.model');

var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../src/app');
var should = chai.should();

chai.use(chaiHttp);
describe('Pergunta', function(){
    beforeEach(function(done) {
        Pergunta.remove({}, function(error) {
            done();
        });
    });
});

/**
 * 
 

describe('/GET Pergunta', function() {
    it('Deve retornar todas as perguntas cadastradas no sistema', function(done) {
        chai.request(app)
        .get('/pergunta')
        .end(function(error, res) {
            res.should.have.status(200);
            res.body.should.be.a('array');
        done();
        });
    });
});

*/