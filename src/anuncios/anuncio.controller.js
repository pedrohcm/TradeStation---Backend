var Anuncio = require('./anuncio.model');

function retornaAnuncios(req, res) {
    var query = Anuncio.find({});
    query.exec(function (error, anuncios) {
        if (error)
            res.send(error);
        res.json(anuncios);
    });
};

function retornaAnuncio(req, res) {
    Anuncio.findById(req.params.id, function (error, anuncio) {
        if (error)
            res.send(error);
        res.json(anuncio);
    });
};

function adicionaAnuncio(req, res) {
    var novoAnuncio = new Anuncio(req.body);
    novoAnuncio.save(function (error, anuncio) {
        if (error) {
            res.send(error);
        } else {
            res.json({ message: "Anuncio adicionado", anuncio });
        }
    });
};

function atualizaAnuncio(req, res) {
    const anuncioId = req.params.id;
    Anuncio.findById({ _id: anuncioId }, function (error, anuncio) {
        if (error)
            res.send(error);
        Object.assign(anuncio, req.body).save(function (error, anuncio) {
            if (error)
                res.send(error);
            res.json({ message: "Anúncio atualizado.", anuncio });
        });
    });
};

function deletaAnuncio(req, res) {
    const anuncioId = req.params.id;
    Anuncio.remove({ _id: anuncioId }, function (error, resultado) {
        if (error)
            res.send(error)
        res.json({ message: "Anúncio deletado.", resultado });
    });
};

module.exports = {
    retornaAnuncio,
    retornaAnuncios, adicionaAnuncio,
    atualizaAnuncio, deletaAnuncio
};