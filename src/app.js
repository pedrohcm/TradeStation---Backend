const express = require('express');
const app = express();
const cors = require('cors');
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

let corsOptions = {};
if (PORT === 'production') {
 corsOptions = {
   'origin': 'http://localhost:3000',
   'optionsSuccessStatus': 200
 };
 console.log('The system is running in production');
} else {
 console.log('The system is not running in production');
}
app.use(cors(corsOptions));

mongoose.connect('mongodb://localhost/test');

app.get('/', function (req, res) {
    res.send(JSON.stringify({
        mensagem: "Bem-vindo ao TradeStation!"
    }))
});

const anuncioRoute = require('./anuncios/anuncio.route');
const perguntaRoute = require('./perguntas/pergunta.route');
const usuarioRoute = require('./usuarios/usuario.route');
const adminRoute = require('./admin/admin.route.js');
const docsRoute = require('./docs/docs.route.js');

app.use('/anuncio', anuncioRoute);
app.use('/pergunta', perguntaRoute);
app.use('/usuario', usuarioRoute);
app.use('/admin', adminRoute);
app.use('/docs', docsRoute);

app.listen(PORT, () => console.log('TradeStation listening on port 3000!'))

module.exports = app;