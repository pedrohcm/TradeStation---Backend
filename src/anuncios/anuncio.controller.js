exports.retornaAnuncios = (req, res, next) => {
  let anunciosArray = anuncios;
  res.json(anunciosArray);
};

exports.retornaAnuncio = (req, res, next) => {
  const anuncio = encontraAnuncio(anuncios, req.params.id);
  if (anuncio) {
    res.status(200).json(anuncio);
  } else {
    res.status(404).json(`Anúncio com o id ${req.params.id} não encontrado.`);
  }
};

exports.adicionaAnuncio = (req, res, next) => {
  const anuncio = {
    'id': anuncios.length + 1,
    'nome': req.body.nome,
    'valor': req.body.valor,
    'estado': req.body.estado,
    'descricao': req.body.descricao,
  };
  anuncios.push(product);
  return res.status(200).json(`Anúncio "${anuncio.nome}" criado!`);
};

exports.atualizaAnuncio = (req, res, next) => {
  const anuncio = encontraAnuncio(anuncios, req.params.id);
  if (!anuncio) {
    return res.status(404).json(`Anúncio com o id ${req.params.id} não existe.`);
  }
  anuncio.nome = req.body.nome;
  anuncio.valor = req.body.valor;
  anuncio.descricao = req.body.descricao;
  return res.status(200).json(`Anúncio "${anuncio.nome}" atualizado!`);
};

exports.removeAnuncio = (req, res, next) => {
  const anuncio = encontraAnuncio(anuncios, req.params.id);
  if (!anuncio) {
    return res.status(404).json(`Anúncio com o id ${req.params.id} não existe.`);
  }
  const indiceAnuncio = anuncios.indexOf(anuncio);
  anuncios.splice(indiceAnuncio, 1);
  return res.status(200).json(`Anúncio "${anuncio.nome}" deletado!`);
};


function encontraAnuncio(anuncios, idAnuncio) {
  const anuncio = anuncios.find((item) => item.id === parseInt(idAnuncio));
  return anuncio;
}