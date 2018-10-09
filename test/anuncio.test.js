process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var Anuncio = require('../src/anuncios/anuncio.model');
var Usuario = require('../src/usuarios/usuario.model');
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../src/app');
var should = chai.should();

chai.use(chaiHttp);
describe('Anuncios', function () {
    beforeEach(function (done) {
        Anuncio.remove({}, function (error) {
            Usuario.remove({}, function (error) {
                done();
            })
            
        });
    });


    describe('/GET Anuncio', function () {
        it('Deve retornar todos os anuncios cadastrads no sistema', function (done) {
            chai.request(app)
                .get('/anuncio')
                .end(function (error, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST anuncio', function () {
        it('Não deve retornar o POST da anuncio criada, uma vez que não foi definido o campo usuario_id', function (done) {
            var novoAnuncio = {
                "nome": "Forza Horizon 4",
                "plataforma": "´XONE",
                "valor": "180",
                "estado": "NOVO",
                "interesse": "VENDA"
            }
            chai.request(app)
                .post('/anuncio')
                .send(novoAnuncio)
                .end(function (error, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('usuario_id');
                    res.body.errors.usuario_id.should.have.property('kind').eql('required');
                    done();
                });
        });

        it('Deve criar um anuncio', function (done) {
            //criando um usuario antes
            var usuario = new Usuario({
                nome: "doctorWoofs",
                email: "timeandrelative@dimension.in.space",
                usuario: "doctorWoofs",
                senha: "23112013"
            });
            usuario.save(function (error, usuario) {
                var novoAnuncio = {
                    "nome": "Forza Horizon 4",
                    "plataforma": "XONE",
                    "valor": "180",
                    "estado": "NOVO",
                    "interesse": "VENDA",
                    "descricao": "Lacrado",
                    "usuario_id": usuario.id
                }
                chai.request(app)
                    .post('/anuncio')
                    .send(novoAnuncio)
                    .end(function (error, res) {
                        res.should.have.status(200);
                        chai.request(app)
                            .get('/anuncio')
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

    describe('/GET/:id Anuncio', function () {
        it('Deve retornar uma anuncio dado o/GET/:id anuncio', function (done) {
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
                    chai.request(app)
                        .get('/anuncio/' + anuncio.id)
                        .send(anuncio)
                        .end(function (error, res) {
                            res.should.be.a('object');
                            res.body.should.have.property('nome');
                            res.body.should.have.property('plataforma');
                            res.body.should.have.property('valor');
                            res.body.should.have.property('estado');
                            res.body.should.have.property('interesse');
                            res.body.should.have.property('_id').eql(anuncio.id);
                            done();
                        });
                });
            });
        });
    });

    describe('/DELETE/:id anuncio', function () {
        it('Deve excluir um anúncio de acordo com o id', function (done) {
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
                    chai.request(app)
                        .delete('/anuncio/' + anuncio.id)
                        .end(function (error, res) {
                            res.should.have.status(200);
                            chai.request(app)
                                .get('/anuncio')
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
