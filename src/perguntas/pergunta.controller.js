var Pergunta = require('./pergunta.model');

function retornaPerguntas(req, res) {
    var query = Pergunta.find({});
    query.exec(function (error, perguntas) {
        if (error)
            res.send(error);
        res.json(perguntas);
    });
};

function retornaPergunta(req, res) {
    Pergunta.findById(req.params.id, function (error, pergunta) {
        if (error)
            res.send(error);
        res.json(pergunta);
    });
};

function adicionaPergunta(req, res) {
    var novaPergunta = new Pergunta(req.body);
    novaPergunta.save(function (error, pergunta) {
        if (error) {
            res.send(error);
        } else {
            res.json({ message: "Pergunta adicionada", pergunta });
        }
    });
};

function atualizaPergunta(req, res) {
    const perguntaId = req.params.id;
    Pergunta.findById({ _id: perguntaId }, function (error, pergunta) {
        if (error)
            res.send(error);
        Object.assign(pergunta, req.body).save(function (error, pergunta) {
            if (error)
                res.send(error);
            res.json({ message: "Pergunta atualizada.", pergunta });
        });
    });
};

function deletaPergunta(req, res) {
    const perguntaId = req.params.id;
    Pergunta.remove({ _id: perguntaId }, function (error, resultado) {
        if (error)
            res.send(error)
        res.json({ message: "Pergunta deletada.", resultado });
    });
};

module.exports = {
    retornaPergunta,
    retornaPerguntas, adicionaPergunta,
    atualizaPergunta, deletaPergunta
};