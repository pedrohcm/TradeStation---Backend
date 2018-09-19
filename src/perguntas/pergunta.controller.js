const perguntas = require('./perguntas.json');

exports.retornaPerguntas = (req, res, next) => {
    let perguntasArray = perguntas;
    res.json(perguntasArray);
};

exports.retornaPergunta = (req, res, next) => {
    const pergunta = encontraPergunta(perguntas, req.params.id);
    if (pergunta) {
        res.status(200).json(pergunta);
    } else {
        res.status(404).json(`Pergunta com o id ${req.params.id} não encontrada.`);
    }
};

exports.adicionaPergunta = (req, res, next) => {
    const pergunta = {
        'id': perguntas.length + 1,
        'titulo': req.body.nome,
        'resposta': "",
    };
    perguntas.push(pergunta);
    return res.status(200).json(`Pergunta "${pergunta.name}" criada!`);
};

exports.atualizaPergunta = (req, res, next) => {
    const pergunta = encontraPergunta(perguntas, req.params.id);
    if (!pergunta) {
        return res.status(404).json(`Pergunta com o id ${req.params.id} não existe.`);
    }
    pergunta.titulo = req.body.titulo;
    pergunta.resposta = req.body.resposta;
    return res.status(200).json(`Pergunta "${pergunta.name}" atualizada!`);
};

exports.removePergunta = (req, res, next) => {
    const pergunta = encontraPergunta(perguntas, req.params.id);
    if (!pergunta) {
        return res.status(404).json(`Pergunta com o id ${req.params.id} não existe.`);
    }
    const indicepergunta = perguntas.indexOf(pergunta);
    perguntas.splice(indicepergunta, 1);
    return res.status(200).json(`Pergunta "${pergunta.name}" deletada!`);
};


function encontraPergunta(perguntas, idpergunta) {
    const pergunta = perguntas.find((item) => item.id === parseInt(idpergunta));
    return pergunta;
}