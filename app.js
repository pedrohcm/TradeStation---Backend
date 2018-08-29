const express = require('express')
const app = express()


usuarios = {
    1: {
        nome: "Pedro Henrique",
        local: "Campina Grande",
        email: "pedro.maia@ccc.ufcg.edu.br",
        conta: "Vendedor",
        saldo: 300.00,
        ultimoAcesso: "27/08/2018",
        compras: 15,
        reputacao: "Excelente",
        anuncios: [1]
    },
    2: {
        nome: "Wesley Santos",
        usuario: "wesleySan7os",
        local: "Campina Grande",
        email: "wesley.santos.silva@ccc.ufcg.edu.br",
        conta: "Comprador",
        saldo: 5000.00,
        ultimoAcesso: "29/08/2018",
        compras: 8,
        reputacao: "Ótimo comprador",
        anuncios: []
    },
    3: {
        nome: "Victor Emanuel",
        usuario: "victorfs",
        local: "Pocinhos",
        email: "victor.farias@ccc.ufcg.edu.br",
        conta: "Vendedor",
        saldo: 3.00,
        ultimoAcesso: "28/08/2018",
        compras: 1,
        reputacao: "Excelente",
        anuncios: []
    }
}

anuncios = {

}

app.get('/', function (req, res) {
    res.send(JSON.stringify({
        mensagem: "Bem-vindo ao Mercado Livre-se!"
    }))
});

app.get('/usuarios', function (req, res) {
    res.send(JSON.stringify({

    }))
});

app.get('/usuario/:id', function (req, res) {
    res.send(JSON.stringify({
        pedrohcm: {
            nome: "Pedro Henrique",
            local: "Campina Grande",
            email: "pedro.maia@ccc.ufcg.edu.br",
            conta: "Vendedor",
            saldo: 300.00,
            ultimoAcesso: "27/08/2018",
            compras: 15,
            reputacao: "Excelente",
            anuncios: [18484, 62556, 589484]
        }
    }))
});

app.get('/anuncio/18484', function (req, res) {
    res.send(JSON.stringify({
        anuncio: {
            nome: "Monitor Dell",
            local: "Campina Grande",
            valor: 800,
            estado: "Semi-novo",
            telefone: 8399825447,
            descricao: "Monitor muito novo recomendo 144Hz pronto pra overwatch",
            visualizacoes: 35,
            criadoEm: "24/08/2018",
            perguntas: [84224, 61556, 589484]
        }
    }))
});


app.get('/pedrohcm', function (req, res) {
    res.send('Olá, pedrohcm')
})

app.post('/', function (req, res) {
    res.send('Got a POST request')
})

app.put('/pedrohcm', function (req, res) {
    res.send('Got a PUT request as /pedrohcm')
})

app.delete('/pedrohcm', function (req, res) {
    res.send('Got a DELETE request at /pedrohcm')
})

app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json');
    //next();  // sem o next, a chamada para aqui
});

app.listen(3000, () => console.log('PDW backend listening on port 3000!'))