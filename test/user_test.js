process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var Usuario = require('../src/usuarios/usuario.model');
var logger = require('mocha-logger');

var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../src/app');
var should = chai.should();

chai.use(chaiHttp);
describe('Usuario', function(){
    beforeEach(function(done) {
        Usuario.remove({}, function(error) {
            done();
        });
    });
});

describe('/GET Usuario', function() {
    it('Deve retornar todos os usuários cadastrados no sistema', function(done) {
      logger.log("Alô")
        chai.request(app)
        .get('/usuario')
        .end(function(error, res) {
            res.should.have.status(200);
            res.body.should.be.a('array');
        done();
        });
    });
});

describe('/GET/:id Usuario', function() {
  it('Deve retornar um usuário dado o id', function() {
      var usuario = new Usuario({
          nome: "doctorWoof",
          email: "timeandrelative@dimensions.in.space",
          usuario: "doctorWoof",
          senha: "23112013"
      });
      usuario.save(function(error, usuario) {
          chai.request(app)
          .get('/usuario/' + usuario._id)
          .send(usuario)
          .end(function(error, res) {
             res.should.be.a('object');
             res.body.should.have.property('nome');
             res.body.should.have.property('email');
             res.body.should.have.property('usuario');
             res.body.should.have.property('senha');
             res.body.should.have.property('_id').eql(usuario._id);
      done();
          });
      });
  });
});

describe('/POST Usuario', function() {
  it('Não deve retornar o POST do usuário criado, uma vez que não foi definido o campo: nome', function(done) {
      var usuario = {
          usuario: "doctorwoof",
          senha: "tardismodel40",
          email: "timeandrelative@dimensions.in.space"
      }
      chai.request(app)
      .post('/usuario')
      .send(usuario)
      .end(function(error, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('nome');
          res.body.errors.nome.should.have.property('kind').eql('required');
          done();
      });
  });
});