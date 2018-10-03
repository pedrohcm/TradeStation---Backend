const express = require('express');
const router = express.Router();
const controller = require('./usuario.controller');

router.use((req, res, next) => {
    next();
});

router.get('/', controller.retornaUsuarios);
router.get('/:id', controller.retornaUsuarios);
router.post('/', controller.adicionaUsuario);
router.put('/:id', controller.atualizaUsuario);
router.delete('/:id', controller.deletaUsuario);

module.exports = router;