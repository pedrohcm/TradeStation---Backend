const express = require('express');
const router = new express.Router();
const controller = require('./pergunta.controller');
router.use((req, res, next) => {
    next();
});

router.get('/', controller.retornaPerguntas);
router.get('/:id', controller.retornaPergunta);
router.post('/', controller.adicionaPergunta);
router.put('/:id', controller.atualizaPergunta);
router.delete('/:id', controller.deletaPergunta);

module.exports = router;