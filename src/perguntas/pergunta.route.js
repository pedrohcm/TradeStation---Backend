const express = require('express');
const router = new express.Router();
const perguntas = require('./perguntas.json');

router.use((req, res, next) => {
    next();
});

router.get('/', (req, res) => {
    let perguntasArray = perguntas;
    res.json(perguntasArray);
});

router.get('/:id', (req, res) => {
    const pergunta = encontraPergunta(perguntas, req.params.id);
    if (pergunta) {
        res.status(200).json(pergunta);
    } else {
        res.status(404).json(`Pergunta com o id ${req.params.id} não encontrada.`);
    }
});

router.post('/', (req, res) => {
    const pergunta = {
        'id': perguntas.length + 1,
        'titulo': req.body.nome,
        'resposta': "",
    };
    perguntas.push(pergunta);
    return res.status(200).json(`Pergunta "${pergunta.name}" criada!`);
});

router.put('/:id', (req, res) => {
    const pergunta = encontraPergunta(perguntas, req.params.id);
    if (!pergunta) {
        return res.status(404).json(`Pergunta com o id ${req.params.id} não existe.`);
    }
    pergunta.titulo = req.body.titulo;
    pergunta.resposta = req.body.resposta;
    return res.status(200).json(`Pergunta "${pergunta.name}" atualizada!`);
});

router.delete('/:id', (req, res) => {
    const pergunta = encontraPergunta(perguntas, req.params.id);
    if (!pergunta) {
        return res.status(404).json(`Pergunta com o id ${req.params.id} não existe.`);
    }
    const indicepergunta = perguntas.indexOf(pergunta);
    perguntas.splice(indicepergunta, 1);
    return res.status(200).json(`Pergunta "${pergunta.name}" deletada!`);
});


function encontraPergunta(perguntas, idpergunta) {
    const pergunta = perguntas.find((item) => item.id === parseInt(idpergunta));
    return pergunta;
}

module.exports = router;