var Usuario = require('./usuario.model');


function retornaUsuarios(req, res) {
  var query = Usuario.find({});
  query.exec(function (error, usuarios) {
    if (error)
      res.send(error);
    res.json(usuarios);
  });
};

function retornaUsuario(req, res) {
  Usuario.findById(req.params.id, function (error, usuario) {
    if (error)
      res.send(error);
    res.json(usuario);
  });
};

function adicionaUsuario(req, res) {
  var novoUsuario = new Usuario(req.body);
  novoUsuario.save(function (error, usuario) {
    if (error) {
      res.send(error);
    } else {
      res.json({ message: "usuario adicionado", usuario });
    }
  });
};

function atualizaUsuario(req, res) {
  const usuarioId = req.params.id;
  Usuario.findById({ _id: usuarioId }, function (error, usuario) {
    if (error)
      res.send(error);
    Object.assign(usuario, req.body).save(function (error, usuario) {
      if (error)
        res.send(error);
      res.json({ message: "Usuário atualizado.", usuario });
    });
  });
};

function deletaUsuario(req, res) {
  const usuarioId = req.params.id;
  Usuario.remove({ _id: usuarioId }, function (error, resultado) {
    if(error)
      res.send(error)
    res.json({ message: "Usuário deletado.", resultado});
  });
};

module.exports = {retornaUsuario, 
  retornaUsuarios, adicionaUsuario, 
  atualizaUsuario, deletaUsuario};

/**
 * 
 
exports.retornaUsuarioPorEmail(emailUsuario) = {
  return: Usuario.findOne({ 'email': emailUsuario })
};
*/