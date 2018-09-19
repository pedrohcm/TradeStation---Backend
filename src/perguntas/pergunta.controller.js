var Pergunta = require('./pergunta.model');

exports.retornaPerguntas = (req, res, next) => {
    let perguntasArray = perguntas;
    res.json(perguntasArray);
};


exports.adicionaPergunta = (req, res, next) => {
    var novoUsuario = new Usuario(req.body);
    novoUsuario.save({})
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(400).send(error);
        })

};