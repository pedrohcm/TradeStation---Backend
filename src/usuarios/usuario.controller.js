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
  var id = req.params.id;
  Usuario.findById(id)
    .then(result => {
      console.log(result)
      Usuario.save(req.body)
        .then(result => {
          res.status(200).json(result);
        })
        .catch(error => {
          res.status(400).send(error);
        })
      res.status(200).json(result);
    })
    .catch(error => {
      res.status(400).send(error);
    })
};