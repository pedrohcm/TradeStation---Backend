var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var perguntaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, "Título não pode ser vazio"]
  },
  resposta: {
    type: String,
    required: [true, "Resposta não pode ser vazia"]
  }
});

var Pergunta = mongoose.model('Pergunta', perguntaSchema);
module.exports = Pergunta;