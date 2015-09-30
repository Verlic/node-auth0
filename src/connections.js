var ApiConnection = require('./api-connection');

function Connections(client, id){
  this.id = id;
  this.client = client;
  this.apiConnection = new ApiConnection(client, '/connections');
}

Connections.prototype.get = function(options, cb){
  return this.apiConnection.get(options, cb);
};

Connections.prototype.getById = function(id, cb, options){
  return this.apiConnection.getById(id, cb, options);
};

Connections.prototype.create = function(connection, cb){
  return this.apiConnection.create(connection, cb);
};

Connections.prototype.delete = function(id, cb){
  return this.apiConnection.delete(id, cb);
};


module.exports = Connections;