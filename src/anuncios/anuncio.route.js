const express = require('express');
const router = new express.Router();
const controller = require('./anuncio.controller');

router.use((req, res, next) => {
    next();
});

router.get('/', controller.retornaAnuncios);
router.get('/:id', controller.retornaAnuncio);
router.post('/login', controller.adicionaAnuncio);
router.put('/:id', controller.atualizaAnuncio);
router.delete('/:id', controller.removeAnuncio);

module.exports = router;

