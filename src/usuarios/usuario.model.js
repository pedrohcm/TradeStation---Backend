var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usuarioSchema = new mongoose.Schema({
	id: {
		type: Number
	},
	nome: {
		type: String,
		required: [true, "Nome não pode ser vazio."]
	},
	usuario: {
		type: String,
		lowercase: true,
		unique: true,
		required: [true, "Nome de usuário não pode ser vazio."],
		match: [/^[a-zA-Z0-9]+$/, 'Nome de usuário inválido.'],
		index: true
	},
	email: {
		type: String,
		lowercase: true,
		unique: true,
		required: [true, "E-mail não pode ser vazio."],
		match: [/\S+@\S+\.\S+/, 'E-mail inválido.'],
	},
	senha: {
		type: String,
		required: [true, "Senha não pode ser vazia"]
	},
	saldo: { type: Number, default: 0 },
	compras: { type: Number, default: 0 },
	reputacao: { type: String, default: "Sem reputação ainda." },
	anuncios: {
		type: [Number],
		default: []
	}
});

var Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;