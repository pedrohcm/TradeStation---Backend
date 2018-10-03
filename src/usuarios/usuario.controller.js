var Usuario = require('./usuario.model');

exports.retornaUsuarios = (req, res, next) => {
  Usuario.find({})
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      res.status(400).send(error);
    })
};

exports.retornaUsuario = (req, res) => {
  Usuario.findById(req.params.id)
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((error) => {
        res.status(400).send(error);
    })
};

exports.adicionaUsuario = (req, res, next) => {
  var novoUsuario = new Usuario(req.body);
  novoUsuario.save({})
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      res.status(400).send(error);
    })
};

exports.atualizaUsuario = (req, res) => {
  const userId = req.params.id;
  Usuario.findByIdAndUpdate(userId, req.body)
    .then((result) => {
      console.log("Entrei no result")
        res.status(200).json(result);
    })
    .catch((error) => {
      console.log("Entrei no error")
        res.status(400).send(error);
    })
};

exports.deletaUsuario = (req, res) => {
  Usuario.deleteOne(req.params.id)
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((error) => {
        res.status(400).send(error);
    })
};