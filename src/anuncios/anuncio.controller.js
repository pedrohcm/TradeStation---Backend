var Anuncio = require('./anuncio.model');

exports.retornaAnuncios = (req, res, next) => {
    Anuncio.find({})
      .then(result => {
        res.status(200).json(result);
      })
      .catch(error => {
        res.status(400).send(error);
      })
};

exports.retornaAnuncio = (req, res) => {
    const anuncioId = req.params.id;
    Anuncio.findById(anuncioId)
      .then((result) => {
          res.status(200).json(result);
      })
      .catch((error) => {
          res.status(400).send(error);
      })
};


exports.adicionaAnuncio = (req, res, next) => {
    var novoAnuncio = new Anuncio(req.body);
    novoAnuncio.save({})
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(400).send(error);
        })
};

exports.atualizaAnuncio = (req, res) => {
    const anuncioId = req.params.id;
    Anuncio.findByIdAndUpdate(AnuncioId, req.body)
      .then((result) => {
          res.status(200).json(result);
      })
      .catch((error) => {
          res.status(400).send(error);
      })
};

exports.deletaAnuncio = (req, res) => {
    const anuncioId = req.params.id;
    Anuncio.deleteOne(AnuncioId)
      .then((result) => {
          res.status(200).json(result);
      })
      .catch((error) => {
          res.status(400).send(error);
      })
};