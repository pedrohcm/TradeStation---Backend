var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var perguntaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  resposta: {
    type: String,
    default: "Sem resposta."
  },
  anuncio_id: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'Anuncio'
  },
  usuario_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Usuario',
    required: true
  },
	criadoEm: {
		type: Date,
		default: Date.now
	}
});

perguntaSchema.pre('save', next => {
  var dataAtual = new Date();
  if(!this.criadoEm) {
      this.criadoEm = dataAtual;
  }
  next();
});

var Pergunta = mongoose.model('Pergunta', perguntaSchema);
module.exports = Pergunta;