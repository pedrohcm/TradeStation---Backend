process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var Pergunta = require('../src/perguntas/pergunta.model');
var Anuncio = require('../src/anuncios/anuncio.model');
var Usuario = require('../src/usuarios/usuario.model');

var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../src/app');
var should = chai.should();

chai.use(chaiHttp);
describe('Perguntas', function () {
    beforeEach(function (done) {
        Pergunta.remove({}, function (error) {
            Pergunta.remove({}, function (error) {
                Usuario.remove({}, function (error) {
                    done();
                })

            });
        });
    });


    describe('/GET Pergunta', function () {
        it('Deve retornar todas perguntas cadastradas no sistema', function (done) {
            chai.request(app)
                .get('/pergunta')
                .end(function (error, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST Pergunta', function () {
        it('Não deve retornar o POST da Pergunta criada, uma vez que não foi ' +
            'definido o campo usuario_id e anuncio_id', function (done) {
                var novaPergunta = {
                    "titulo": "Sem noção esse preço sabia?",
                }
                chai.request(app)
                    .post('/pergunta')
                    .send(novaPergunta)
                    .end(function (error, res) {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('errors');
                        res.body.errors.should.have.property('usuario_id');
                        res.body.errors.usuario_id.should.have.property('kind').eql('required');
                        res.body.errors.should.have.property('anuncio_id');
                        res.body.errors.anuncio_id.should.have.property('kind').eql('required');
                        done();
                    });
            });

        it('Deve criar um Pergunta', function (done) {
            //criando um usuario antes
            var usuario = new Usuario({
                nome: "doctorWoofs",
                email: "timeandrelative@dimension.in.space",
                usuario: "doctorWoofs",
                senha: "23112013"
            });
            usuario.save(function (error, usuario) {
                var anuncio = new Anuncio({
                    nome: "Forza Horizon 4",
                    plataforma: "XONE",
                    valor: 180,
                    estado: "NOVO",
                    interesse: "VENDA",
                    descricao: "Lacrado",
                    usuario_id: usuario.id
                })
                anuncio.save(function (error, anuncio) {
                    var novaPergunta = {
                        "titulo": "Up!",
                        "anuncio_id": anuncio.id,
                        "usuario_id": usuario.id,
                    }
                    chai.request(app)
                        .post('/pergunta')
                        .send(novaPergunta)
                        .end(function (error, res) {
                            res.should.have.status(200);
                            chai.request(app)
                                .get('/pergunta')
                                .end(function (error, res) {
                                    res.should.have.status(200);
                                    res.body.should.be.a('array');
                                    res.body.length.should.be.eql(1);
                                });
                            done();
                        });
                });
            });
        });
    });

    describe('/GET/:id Pergunta', function () {
        it('Deve retornar uma Pergunta dado o/GET/:id Pergunta', function (done) {
            var usuario = new Usuario({
                nome: "doctorWhof",
                email: "timeandrelative@dimensions.in.spaces",
                usuario: "doctorWhof",
                senha: "23112013"
            });
            usuario.save(function (error, usuario) {
                var anuncio = new Anuncio({
                    nome: "Forza Horizon 4",
                    plataforma: "XONE",
                    valor: 180,
                    estado: "NOVO",
                    interesse: "VENDA",
                    descricao: "Lacrado",
                    usuario_id: usuario.id
                })
                anuncio.save(function (error, anuncio) {
                    var pergunta = new Pergunta({
                        titulo: "Up!",
                        anuncio_id: anuncio.id,
                        usuario_id: usuario.id
                    })
                    pergunta.save(function (error, Pergunta) {
                        chai.request(app)
                            .get('/Pergunta/' + Pergunta.id)
                            .send(Pergunta)
                            .end(function (error, res) {
                                res.should.be.a('object');
                                res.body.should.have.property('titulo');
                                res.body.should.have.property('anuncio_id');
                                res.body.should.have.property('usuario_id');
                                res.body.should.have.property('_id').eql(Pergunta.id);
                                done();
                            });
                    });
                });

            });
        });
    });

    describe('/DELETE/:id Pergunta', function () {
        it('Deve excluir uma pergunta de acordo com o id', function (done) {
            var usuario = new Usuario({
                nome: "doctorWof",
                email: "timeandrelative@dimension.in.spaces",
                usuario: "doctorWof",
                senha: "23112013"
            })
            usuario.save(function (error, usuario) {
                var anuncio = new Anuncio({
                    nome: "Forza Horizon 4",
                    plataforma: "XONE",
                    valor: 180,
                    estado: "NOVO",
                    interesse: "VENDA",
                    descricao: "Lacrado",
                    usuario_id: usuario.id
                })
                anuncio.save(function (error, anuncio) {
                    var pergunta = new Pergunta({
                        titulo: "Up!",
                        anuncio_id: anuncio.id,
                        usuario_id: usuario.id
                    })
                    pergunta.save(function (error, pergunta) {
                        chai.request(app)
                            .delete('/pergunta/' + pergunta.id)
                            .end(function (error, res) {
                                res.should.have.status(200);
                                chai.request(app)
                                    .get('/pergunta')
                                    .end(function (error, res) {
                                        res.should.have.status(200);
                                        res.body.should.be.a('array');
                                        res.body.length.should.be.eql(0);
                                    });
                                done();
                            });
                    })
                });
            });
        });
    });
});