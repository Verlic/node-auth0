var request = require('superagent'),
  Promise = require('bluebird'),
  util = require('util'),
  urlJoin = require('url-join'),
  utils = require('./utils');

function ApiConnection(client, apiUrl) {
  this.baseUrl = client.baseUrl;
  this.accessToken = client.accessToken;
  this.apiUrl = apiUrl;
}

ApiConnection.prototype.get = function (params, cb) {
  var url = urlJoin(this.baseUrl, this.apiUrl),
    self = this;

  return new Promise(function (res, rej) {
    var done = utils.successCallback(cb, res);
    request
      .get(url)
      .set('Authorization', 'Bearer ' + self.accessToken)
      .send(params)
      .end(utils.responseHandler(cb || rej, function (resp) {
        done(resp.body);
      }));
  });
};

ApiConnection.prototype.getById = function (id, cb, params) {
  var url = urlJoin(this.baseUrl, util.format(this.apiUrl + '/%s', id)),
      self = this;

  return new Promise(function (res, rej) {
    var done = utils.successCallback(cb, res);
    request
      .get(url)
      .set('Authorization', 'Bearer ' + self.accessToken)
      .send(params)
      .end(utils.responseHandler(cb || rej, function (resp) {
        done(resp.body);
      }));
  });
};

ApiConnection.prototype.create = function (data, cb) {
  var url = urlJoin(this.baseUrl, this.apiUrl),
    self = this;

  return new Promise(function (res, rej) {
    var done = utils.successCallback(cb, res);
    request
      .post(url)
      .set('Authorization', 'Bearer ' + self.accessToken)
      .send(data)
      .end(utils.responseHandler(cb || rej, function (resp) {
        done(resp.body);
      }));
  });
};

ApiConnection.prototype.delete = function (id, cb) {
  var url = urlJoin(this.baseUrl, util.format(this.apiUrl + '/%s', id)),
    self = this;

  return new Promise(function (res, rej) {
    var done = utils.successCallback(cb, res);
    request
      .del(url)
      .set('Authorization', 'Bearer ' + self.accessToken)
      .send()
      .end(utils.responseHandler(cb || rej, function (resp) {
        done(resp.body);
      }));
  });
};

module.exports = ApiConnection;