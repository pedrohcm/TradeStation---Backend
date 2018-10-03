const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
var mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json');
    next();
});


mongoose.connect('mongodb://localhost/test');

app.get('/', function (req, res) {
    res.send(JSON.stringify({
        mensagem: "Bem-vindo ao TradeStation!"
    }))
});

const anuncioRoute = require('./anuncios/anuncio.route');
const perguntaRoute = require('./perguntas/pergunta.route');
const usuarioRoute = require('./usuarios/usuario.route');

app.use('/anuncio', anuncioRoute);
app.use('/pergunta', perguntaRoute);
app.use('/usuario', usuarioRoute);

app.listen(PORT, () => console.log('TradeStation listening on port 3000!'))

module.exports = app;