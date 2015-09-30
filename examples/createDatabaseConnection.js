require('dotenv').load();
var auth0 = require('..')({ token: process.env.TOKEN, domain: process.env.DOMAIN });

auth0.connections.create({
  name: "test",
  strategy: "auth0"
}).then(function (body) {
  console.log('Body', body);
}).catch(function (err) {
  console.error(err);
});