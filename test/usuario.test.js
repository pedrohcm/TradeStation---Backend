process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var Usuario = require('../src/usuarios/usuario.model');

var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../src/app');
var should = chai.should();

chai.use(chaiHttp);

describe('Usuarios', function () {
    beforeEach(function (done) {
        Usuario.remove({}, function (error) {
            done();
        });
    });


    describe('/GET Usuario', function () {
        it('Deve retornar todos os usuários cadastrados no sistema', function (done) {
            chai.request(app)
                .get('/usuario')
                .end(function (error, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST usuario', function () {
        it('Não deve retornar o POST do usuário criado, uma vez que não foi definido o campo: nome', function (done) {
            var usuario = {
                usuario: "pedrohcm",
                senha: "pedrohcm",
                email: "pedrohcm@hotmail.com"
            }
            chai.request(app)
                .post('/usuario')
                .send(usuario)
                .end(function (error, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('nome');
                    res.body.errors.nome.should.have.property('kind').eql('required');
                    done();
                });
        });

        it('Deve criar um usuário', function (done) {
            var novoUsuario = {
                "usuario": "pedrohcm5",
                "nome": "pedrohcm",
                "senha": "pedrohcm5",
                "email": "pedrohcm5@hotmail.com"
            }
            chai.request(app)
                .post('/usuario')
                .send(novoUsuario)
                .end(function (error, res) {
                    res.should.have.status(200);
                    chai.request(app)
                        .get('/usuario')
                        .end(function (error, res) {
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                            res.body.length.should.be.eql(1);
                        });
                    done();
                });
        });
    });

    describe('/GET/:id user', function () {
        it('Deve retornar um usuário dado o/GET/:id Usuario', function (done) {
            var usuario = new Usuario({
                nome: "doctorWoof",
                email: "timeandrelative@dimensions.in.space",
                usuario: "doctorWoof",
                senha: "23112013"
            });
            usuario.save(function (error, usuario) {
                chai.request(app)
                    .get('/usuario/' + usuario.id)
                    .send(usuario)
                    .end(function (error, res) {
                        res.should.be.a('object');
                        res.body.should.have.property('nome');
                        res.body.should.have.property('email');
                        res.body.should.have.property('usuario');
                        res.body.should.have.property('senha');
                        res.body.should.have.property('_id').eql(usuario.id);
                        done();
                    });
            });
        });
    });

    describe('/DELETE/:id user', function () {
        it('Deve excluir um usuário de acordo com o id', function (done) {
            var usuario = new Usuario({
                usuario: "doctorwoof",
                nome: "DoctorWoof",
                senha: "tardismodel40",
                email: "timeandrelative@dimensions.in.space"
            })
            usuario.save(function (error, usuario) {
                chai.request(app)
                    .delete('/usuario/' + usuario.id)
                    .end(function (error, res) {
                        res.should.have.status(200);
                        chai.request(app)
                            .get('/usuario')
                            .end(function (error, res) {
                                res.should.have.status(200);
                                res.body.should.be.a('array');
                                res.body.length.should.be.eql(0);
                            });
                        done();
                    });
            });
        });
    });
});