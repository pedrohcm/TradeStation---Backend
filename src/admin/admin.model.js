var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new mongoose.Schema({
	id: {
		type: Number
	},
	nome: {
		type: String,
		required: true
	},
	usuario: {
		type: String,
		lowercase: true,
		unique: true,
		required: true,
		match: /^[a-zA-Z0-9]+$/,
		index: true
	},
	email: {
		type: String,
		lowercase: true,
		unique: true,
		required: true,
		match: /\S+@\S+\.\S+/,
	},
	senha: {
		type: String,
		required: true
	},
	criadoEm: {
		type: Date,
		default: Date.now
	}
});

adminSchema.pre('save', next => {
    var dataAtual = new Date();
    if(!this.criadoEm) {
        this.criadoEm = dataAtual;
    }
    next();
});

var Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;