const express = require('express');
const router = new express.Router();
const controller = require('./anuncio.controller');

router.use((req, res, next) => {
    next();
});

router.route("/")
.get(controller.retornaAnuncios)
.post(controller.adicionaAnuncio);

router.route("/:id")
.get(controller.retornaAnuncio)
.delete(controller.deletaAnuncio)
.put(controller.atualizaAnuncio);

module.exports = router;

