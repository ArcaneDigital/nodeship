var nodeShip 		= require('./lib/nodeShip.js'),
  	_ 				= require('underscore');


var Client = function(options) {
  if (!options.apiKey) throw 'API key is required';

  this.apiKey = options.apiKey;
  _.extend(this, nodeShip);
};

module.exports = Client;