const express = require('express');
const router = express.Router();
const controller = require('./usuario.controller');
const autenticacao = require('../autenticacao/autenticacao.controller');

router.route("/")
    .get(controller.retornaUsuarios)
    .post(controller.adicionaUsuario);

router.route("/:id")
    .get(controller.retornaUsuario)
    .delete(controller.deletaUsuario)
    .put(controller.atualizaUsuario);

module.exports = router;