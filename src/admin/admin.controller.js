var Admin = require('./admin.model');

exports.retornaAdmins = (req, res, next) => {
  Admin.find({})
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      res.status(400).send(error);
    })
};

exports.retornaAdmin = (req, res) => {
  const adminId = req.params.id;
  Admin.findById(adminId)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(400).send(error);
    })
};

exports.adicionaAdmin = (req, res, next) => {
  var novoAdmin = new Admin(req.body);
  novoAdmin.save({})
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      res.status(400).send(error);
    })
};

exports.atualizaAdmin = (req, res) => {
  const adminId = req.params.id;
  Admin.findByIdAndUpdate(adminId, req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(400).send(error);
    })
};

exports.deletaAdmin = (req, res) => {
  const adminId = req.params.id;
  Admin.findByIdAndDelete(adminId)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(400).send(error);
    })
};