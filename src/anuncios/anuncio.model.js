var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var anuncioSchema = new mongoose.Schema({
	nome: {
		type: String,
		required: [true, "Nome do anúncio não pode ser vazio."]
	},
	valor: {
		type: Number,
		min: [0, 'E vai vender de graça?'],
		required: [true, "O valor do anúncio não pode ser vazio."],
		index: true
	},
	estado: {
		type: String,
		required: [true, "Estado do produto não pode ser vazio."]
	},
	descricao: {
		type: String,
		required: [true, "Descrição do produto não pode ser vazia"]
	}
});

var Anuncio = mongoose.model('Anuncio', anuncioSchema);
module.exports = Anuncio;