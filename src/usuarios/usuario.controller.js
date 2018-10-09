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
  const usuarioId = req.params.id;
  Usuario.findById(usuarioId)
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
  const usuarioId = req.params.id;
  Usuario.findByIdAndUpdate(usuarioId, req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(400).send(error);
    })
};

exports.deletaUsuario = (req, res) => {
  const usuarioId = req.params.id;
  Usuario.findByIdAndDelete(usuarioId)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(400).send(error);
    })
};

exports.retornaUsuarioPorEmail(emailUsuario) = {
  return: Usuario.findOne({ 'email': emailUsuario })
};