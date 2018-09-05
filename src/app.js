const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.get('/', function (req, res) {
    res.send(JSON.stringify({
        mensagem: "Bem-vindo ao Mercado Livre-se!"
    }))
});

const anuncioRoute = require('./routes/anuncio.route.js');
const perguntaRoute = require('./routes/pergunta.route.js');
const usuarioRoute = require('./routes/usuario.route.js');

app.use('/anuncio', anuncioRoute);
app.use('/pergunta', perguntaRoute);
app.use('/usuario', usuarioRoute);

app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json');
    //next();  // sem o next, a chamada para aqui
});

app.listen(3000, () => console.log('PDW backend listening on port 3000!'))

module.exports = app;