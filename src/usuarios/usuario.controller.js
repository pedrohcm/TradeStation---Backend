var Usuario = require('./usuario.model');

exports.retornaUsuarios = (req, res, next) => {
  Usuario.find();
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