const express = require('express');
const router = new express.Router();
const anuncios = require('./anuncios.json');

router.use((req, res, next) => {
    next();
});

router.get('/', (req, res) => {
    let anunciosArray = anuncios;
    res.json(anunciosArray);
});

router.get('/:id', (req, res) => {
    const anuncio = encontraAnuncio(anuncios, req.params.id);
    if (anuncio) {
        res.status(200).json(anuncio);
    } else {
        res.status(404).json(`Anúncio com o id ${req.params.id} não encontrado.`);
    }
});

router.post('/', (req, res) => {
    const anuncio = {
        'id': anuncios.length + 1,
        'nome': req.body.nome,
        'valor': req.body.valor,
        'estado': req.body.estado,
        'descricao': req.body.descricao,
    };
    anuncios.push(product);
    return res.status(200).json(`Anúncio "${anuncio.nome}" criado!`);
});

router.put('/:id', (req, res) => {
    const anuncio = encontraAnuncio(anuncios, req.params.id);
    if (!anuncio) {
        return res.status(404).json(`Anúncio com o id ${req.params.id} não existe.`);
    }
    anuncio.nome = req.body.nome;
    anuncio.valor = req.body.valor;
    anuncio.descricao = req.body.descricao;
    return res.status(200).json(`Anúncio "${anuncio.nome}" atualizado!`);
});

router.delete('/:id', (req, res) => {
    const anuncio = encontraAnuncio(anuncios, req.params.id);
    if (!anuncio) {
        return res.status(404).json(`Anúncio com o id ${req.params.id} não existe.`);
    }
    const indiceAnuncio = anuncios.indexOf(anuncio);
    anuncios.splice(indiceAnuncio, 1);
    return res.status(200).json(`Anúncio "${anuncio.nome}" deletado!`);
});


function encontraAnuncio(anuncios, idAnuncio) {
    const anuncio = anuncios.find((item) => item.id === parseInt(idAnuncio));
    return anuncio;
}

module.exports = router;

