const express = require('express');
const router = new express.Router();
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger.js');

router.use('/',swaggerUI.serve,swaggerUI.setup(swaggerSpec));

module.exports = router;