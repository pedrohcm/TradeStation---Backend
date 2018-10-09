var Pergunta = require('./pergunta.model');

exports.retornaPerguntas = (req, res, next) => {
    Pergunta.find({})
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(400).send(error);
        })
};

exports.retornaPergunta = (req, res) => {
    const perguntaId = req.params.id;
    Pergunta.findById(perguntaId)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(400).send(error);
        })
};


exports.adicionaPergunta = (req, res, next) => {
    var novaPergunta = new Pergunta(req.body);
    novaPergunta.save({})
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(400).send(error);
        })
};

exports.atualizaPergunta = (req, res) => {
    const perguntaId = req.params.id;
    Pergunta.findByIdAndUpdate(perguntaId, req.body)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(400).send(error);
        })
};

exports.deletaPergunta = (req, res) => {
    const perguntaId = req.params.id;
    Pergunta.findByIdAndDelete(perguntaId)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(400).send(error);
        })
};