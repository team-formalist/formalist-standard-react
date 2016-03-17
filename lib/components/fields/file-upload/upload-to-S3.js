'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
require('es6-promise').polyfill();
var fetch = require('isomorphic-fetch');

/**
 * checkStatus
 * take a response and check it's `status` property
 * if between 200-300 return the response object
 * else throw an error
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */

function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res;
  } else {
    var error = new Error(res.statusText);
    error.response = res;
    throw error;
  }
}

/**
 * parseJSON
 * Take a response object and return it parsed
 * @param  {String} response
 * @return {Object}
 */

function parseJSON(res) {
  return res.json();
}

/**
 * formData
 * Build up and return a FormData object
 *
 * @param {String} as: Define the type of form data
 * @param {Object} file: a file object
 * @param {Object} fields: key/value from preSign response
 * @return {Object} FormData
 */

function formData(res, file) {
  var as = res.as;
  var fields = res.fields;
  var name = file.name;


  var data = new window.FormData();

  if (fields) {
    Object.keys(fields).forEach(function (key) {
      data.append(key, fields[key]);
    });
  }

  data.append(as, file, name);
  return data;
}

/**
 * uploadRequest
 * Perform an XHR request and Resolve or Reject
 * @param  {Object} res - the response from preSignXHR()
 * @param  {File Object} file
 * @param  {String} token
 * @param  {Resolve, Reject} functions passed in from uploadToS3
 * @param  {Promise}
 */

function uploadRequest(res, file, token, resolve, reject) {
  var url = res.url;
  var id = res.id;

  var data = formData(res, file);

  fetch(url, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': token
    },
    body: JSON.stringify(data)
  }).then(checkStatus).then(parseJSON).then(function (res) {
    res.original_path = id;
    resolve(res);
  }).catch(function (err) {
    reject(err);
  });
}

/**
 * uploadToS3
 * return a promise after calling uploadToS3Request()
 * @param  {Object} res - the response from preSignRequest()
 * @param  {File Object} file
 * @param  {String} token
 * @param  {Function} fn - defaults to uploadToS3Request()
 * @return {Promise}
 */

function upload(res, file, token) {
  var fn = arguments.length <= 3 || arguments[3] === undefined ? uploadRequest : arguments[3];

  return new Promise(function (resolve, reject) {
    fn(res, file, token, resolve, reject);
  });
}

/**
 * preSignRequest
 * Perform an XHR request and Resolve or Reject
 * @param  {File Object} file
 * @param  {String} presignUrl
 * @param  {String} token
 * @param  {Resolve, Reject} functions passed in from uploadToS3
 * @param  {Promise}
 */

function preSignRequest(file, presignUrl, token, resolve, reject) {
  var name = file.name;
  var type = file.type;

  var data = {
    'file_name': name,
    'content_type': type
  };

  fetch(presignUrl, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': token
    },
    body: JSON.stringify(data)
  }).then(checkStatus).then(parseJSON).then(function (res) {
    resolve(res);
  }).catch(function (err) {
    reject(err);
  });
}

/**
 * preSign
 * Take a file, url and pass it to an XHR request
 * @param  {File Object} file
 * @param  {String} presignUrl
 * @param  {String} token
 * @param  {Function} defaults to preSignRequest()
 * @param  {Promise}
 */

function preSign(file, presignUrl, token) {
  var fn = arguments.length <= 3 || arguments[3] === undefined ? preSignRequest : arguments[3];

  return new Promise(function (resolve, reject) {
    fn(file, presignUrl, token, resolve, reject);
  });
}

exports.preSign = preSign;
exports.upload = upload;