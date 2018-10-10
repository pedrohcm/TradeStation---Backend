const jsonWebToken = require('jsonwebtoken');
const usuarioController = require('../usuarios/usuario.controller');
const config = require('../../config/autenticacao');

exports.login = (req, res, next) => {
  const emailUsuario = req.body.email;
  const senhaUsuario = req.body.senha;
  usuarioController.retornaUsuarioPorEmail(emailUsuario)
    .then((usuario) => {
      if (!usuario) {
        return res.json({ 'message': 'Senha incorreta.' });
      } else if (usuario) {
        if (senhaUsuario === usuario.senha) {
          const token = jsonWebToken.sign({
            _id: usuario.id,
            email: usuario.email,
          }, config.jwtSecret);
          return res.json({ usuarioId: usuario.id, token });
        } else {
          return res.json({ 'message': 'Senha incorreta.' });
        }
      }
    })
    .catch((err) => {
      console.log(err);
      const error = { 'message': 'Algo deu errado.', 'error': err.message };
      return res.json(error);
    });
};

exports.autenticar = (req, res, next) => {
  let token;
  if (req.headers['authorization']) {
    token = req.headers['authorization'].split(" ")[1];
  } else {
    token = req.body.token;
  }
  if (token) {
    try {
      const data = (decodeToken(token));
      if (data) {
        req._id = data._id;
        req.email = data.email;
        next();
      } else {
        return res.json({ 'message': 'Falha na decodificação. Token errado.' });
      }
    } catch (error) {
      return res.json({ 'message': 'Algo deu errado.', 'error': error.message });
    }
  } else {
    return res.json({ 'message': 'Falha na autenticação. Token inacessível.' });
  }
}

const autenticarPorId = (req, res, next) => {
  const usuarioId = req.id;
  if (usuarioId) {
    const reqId = req.params.usuarioId;
    if (usuarioId === reqId) {
      next();
    } else {
      return res.json({ 'message': 'Erro: Usuário não autorizado.' });
    }
  } else {
    return res.json({ 'message': 'Algo deu errado.' });
  }
}

const decodeToken = (token) => {
  return jsonWebToken.verify(token, config.jwtSecret);
}
