const express = require('express');
const router = new express.Router();
const usuarios = require('./usuarios.json');
const controller = require('./usuarioController');

router.use((req, res, next) => {
    next();
});

router.get('/', controller.retornaUsuarios);
router.get('/:id', controller.retornaUsuario);
router.post('/login', controller.adicionaUsuario);
router.put('/:id', controller.atualizaUsuario);
router.delete('/:id', controller.removeUsuario);

router.get('/', (req, res) => {
    let usuariosArray = usuarios;
    res.json(usuariosArray);
});

router.get('/:id', (req, res) => {
    const usuario = encontraUsuario(usuarios, req.params.id);
    if (usuario) {
        res.status(200).json(usuario);
    } else {
        res.status(404).json(`Usuário com o id ${req.params.id} não encontrado.`);
    }
});

router.post('/', (req, res) => {
    const usuario = {
        'id': usuarios.length + 1,
        'nome': req.body.nome,
        'usuario': req.body.usuario,
        'email': req.body.email,
        'saldo': 0,
        'compras': 0,
        'reputacao': "Sem reputação ainda",
        'anuncios': [],

    };
    usuarios.push(usuario);
    return res.status(200).json(`Usuário "${usuario.name}" criado!`);
});

router.put('/:id', (req, res) => {
    const usuario = encontrausuario(usuarios, req.params.id);
    if (!usuario) {
        return res.status(404).json(`Usuário com o id ${req.params.id} não existe.`);
    }
    usuario.email = req.body.email;
    usuario.nome = req.body.nome;
    return res.status(200).json(`Usuário "${usuario.name}" atualizado!`);
});

router.delete('/:id', (req, res) => {
    const usuario = encontrausuario(usuarios, req.params.id);
    if (!usuario) {
        return res.status(404).json(`Usuário com o id ${req.params.id} não existe.`);
    }
    const indiceusuario = usuarios.indexOf(usuario);
    usuarios.splice(indiceusuario, 1);
    return res.status(200).json(`Usuário "${usuario.name}" deletado!`);
});


function encontraUsuario(usuarios, idusuario) {
    const usuario = usuarios.find((item) => item.id === parseInt(idusuario));
    return usuario;
}

module.exports = router;