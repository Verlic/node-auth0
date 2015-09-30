require('dotenv').load();
var auth0 = require('..')({ token: process.env.TOKEN, domain: process.env.DOMAIN });

auth0.connections.getById('connectionName').then(function (body) {
  console.log('Body', body);
}).catch(function (err) {
  console.error(err);
});