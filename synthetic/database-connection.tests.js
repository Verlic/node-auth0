var TOKEN = '{YOUR_API_JSON_WEB_TOKEN}',
	domain = '{YOUR_DOMAIN}',
	chai = require('chai'),
	_ = require('underscore'),
	expect = chai.expect,
	should = chai.should(),
	util = require('util'),
	auth0 = require('..')({ token: TOKEN, domain: domain }),
	version = require('../package.json').version,
	testConnection = {
		name: 'automated-test-connection',
		strategy: "auth0"
	};
;

describe('Auth0 API Client - v' + version, function () {
	describe('Create Database Connection', function () {
		it('should remove existing connection if applies', function (done) {
			auth0.connections.get().then(function (connections) {
				expect(connections).not.to.be.null;
				var existingConnection = _.find(connections, function (conn) { return conn.name === testConnection.name });
				expect(existingConnection).not.to.be.null;
				if (existingConnection) {					
					auth0.connections.delete(existingConnection.id, function (err) {						
						expect(err).to.be.null;
						done();
					}).then(function (body) {						
						expect(body).to.be.null;
						done();
					});
				}				
			});
		});

		it('should create a new database connection', function (done) {
			auth0.connections.create(testConnection, function (err) {
				expect(err).to.be.null;				
				done();
			}).then(function (body) {
				expect(body.name).to.equal(testConnection.name);
				expect(body.strategy).to.equal(testConnection.strategy);
				done();
			});
		});
	});
});