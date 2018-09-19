const express = require('express');
const router = express.Router();
const controller = require('./usuario.controller');

router.use((req, res, next) => {
    next();
});

router.get('/', controller.retornaUsuarios);
router.post('/', controller.adicionaUsuario);
router.put('/:id', controller.atualizaUsuario);

module.exports = router;