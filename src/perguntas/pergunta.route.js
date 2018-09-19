const express = require('express');
const router = new express.Router();
const controller = require('./pergunta.controller');
router.use((req, res, next) => {
    next();
});

router.get('/', controller.retornaPerguntas);
router.post('/login', controller.adicionaPergunta);

module.exports = router;