const express = require('express');
const router = new express.Router();
const controller = require('./usuario.controller');

router.use((req, res, next) => {
    next();
});

router.get('/', controller.retornaUsuarios);
router.post('/', controller.adicionaUsuario);

module.exports = router;