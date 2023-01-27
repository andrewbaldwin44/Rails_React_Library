const { environment } = require('@rails/webpacker');
const Dotenv = require('dotenv-webpack');

environment.plugins.prepend('Dotenv', new Dotenv());

environment.resolve = { modules: ['./src', 'node_modules'] };

module.exports = environment;
