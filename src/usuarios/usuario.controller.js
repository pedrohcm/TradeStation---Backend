exports.retornaUsuarios('/', (req, res) => {
  let usuariosArray = usuarios;
  res.json(usuariosArray);
});

exports.retornaUsuario = (req, res, next) => {
  const usuario = encontraUsuario(usuarios, req.params.id);
  if (usuario) {
    res.status(200).json(usuario);
  } else {
    res.status(404).json(`Usuário com o id ${req.params.id} não encontrado.`);
  }
};

exports.adicionaUsuario = (req, res, next) => {
  const usuario = {
    'id': usuarios.length + 1,
    'nome': req.body.nome,
    'usuario': req.body.usuario,
    'email': req.body.email,
    'saldo': 0,
    'compras': 0,
    'reputacao': "Sem reputação ainda",
    'anuncios': [],

  };
  usuarios.push(usuario);
  return res.status(200).json(`Usuário "${usuario.name}" criado!`);
};

exports.atualizaUsuario = (req, res, next) => {
  const usuario = encontrausuario(usuarios, req.params.id);
  if (!usuario) {
    return res.status(404).json(`Usuário com o id ${req.params.id} não existe.`);
  }
  usuario.email = req.body.email;
  usuario.nome = req.body.nome;
  return res.status(200).json(`Usuário "${usuario.name}" atualizado!`);
};

exports.removeUsuario = (req, res, next) => {
  const usuario = encontrausuario(usuarios, req.params.id);
  if (!usuario) {
    return res.status(404).json(`Usuário com o id ${req.params.id} não existe.`);
  }
  const indiceusuario = usuarios.indexOf(usuario);
  usuarios.splice(indiceusuario, 1);
  return res.status(200).json(`Usuário "${usuario.name}" deletado!`);
};


function encontraUsuario(usuarios, idusuario) {
  const usuario = usuarios.find((item) => item.id === parseInt(idusuario));
  return usuario;
}