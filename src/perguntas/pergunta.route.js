const express = require('express');
const router = new express.Router();
const controller = require('./pergunta.controller');
router.use((req, res, next) => {
    next();
});

router.route("/")
.get(controller.retornaPerguntas)
.post(controller.adicionaPergunta);

router.route("/:id")
.get(controller.retornaPergunta)
.delete(controller.deletaPergunta)
.put(controller.atualizaPergunta);

module.exports = router;