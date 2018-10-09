var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var anuncioSchema = new mongoose.Schema({
	nome: {
		type: String,
		required: true
	},
	plataforma: {
		type: String,
		required: true,
		enum: ['PS4', 'PS3', 'X360', 'XONE', 'PC', 'SWITCH', '3DS', 'WII', 'WIIU']
	},
	valor: {
		type: Number,
		min: 0,
		required: true,
		index: true
	},
	estado: {
		type: String,
		required: true,
		enum: ['USADO', 'NOVO', 'SEMI-NOVO']
	},
	interesse: {
		type: String,
		required: true,
		enum: ['VENDA', 'TROCA']
	},
	descricao: {
		type: String,
		required: true
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

anuncioSchema.pre('save', next => {
    var dataAtual = new Date();
    if(!this.criadoEm) {
        this.criadoEm = dataAtual;
    }
    next();
});

var Anuncio = mongoose.model('Anuncio', anuncioSchema);
module.exports = Anuncio;