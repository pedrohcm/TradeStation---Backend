const swagger = require('swagger-jsdoc');

const swaggerDef = {
  'basePath': '/',
  'host': 'localhost:3000',
  'info': {
    'description': 'Aplicação para venda e troca de jogos',
    'title': 'TradeStation',
    'version': '1.0.0'
  }
};

const options = {
  'apis': ['../**/*.docs.js'],
  'swaggerDefinition': swaggerDef
};

const swaggerSpec = swagger(options);

module.exports = swaggerSpec;
