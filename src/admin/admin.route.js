const express = require('express');
const router = express.Router();
const controller = require('./admin.controller');

router.use((req, res, next) => {
    next();
});

router.get('/', controller.retornaAdmins);
router.get('/:id', controller.retornaAdmins);
router.post('/', controller.adicionaAdmin);
router.put('/:id', controller.atualizaAdmin);
router.delete('/:id', controller.deletaAdmin);

module.exports = router;