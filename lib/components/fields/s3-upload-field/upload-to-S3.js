'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = exports.preSign = undefined;

var _bus = require('./bus');

var _bus2 = _interopRequireDefault(_bus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('es6-promise').polyfill();
var request = require('superagent');


/**
 * noOp
 * Default param value
 * @return {Function}
 */

var noOp = function noOp() {};

/**
 * req
 * on 'abortUploadRequest' get access to the latest XHR request and about()
 */

var req = void 0;
_bus2.default.on('abortUploadRequest', function () {
  req.abort();
});

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

function parseJSON(res, url) {
  return JSON.parse(res.text);
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

function formData(res, files) {
  var as = res.as;
  var fields = res.fields;

  var data = new window.FormData();

  if (fields) {
    Object.keys(fields).forEach(function (key) {
      data.append(key, fields[key]);
    });
  }

  files.map(function (file) {
    data.append(as, file, file.name);
  });

  return data;
}

/**
 * uploadRequest
 * Perform an XHR request and Resolve or Reject
 * @param  {Object} res - the response from preSignXHR()
 * @param  {File Object} file
 * @param  {String} token
 * @param  {Function} on progress event handler
 * @return  {Promise}
 */

function uploadRequest(res, files, token, showProgress) {
  var url = res.url;

  var data = formData(res, files);

  return new Promise(function (resolve, reject) {
    req = request.post(url).send(data).set({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': token
    }).on('progress', function (e) {
      showProgress(e);
    }).end(function (err, res) {
      if (err) reject(err);
      resolve(res);
    });
  });
}

/**
 * upload
 * Take a response object (from preSignRequest) a file and a token
 * and return a Promise that makes an uploadRequest()
 * @param  {Object} res - the response from preSignRequest()
 * @param  {File Object} file
 * @param  {String} token
 * @param  {Function} showProgress - progress event handler
 * @param  {Function} fn - defaults to uploadRequest()
 * @return {Promise}
 */

function upload(res, files, token) {
  var showProgress = arguments.length <= 3 || arguments[3] === undefined ? noOp : arguments[3];
  var fn = arguments.length <= 4 || arguments[4] === undefined ? uploadRequest : arguments[4];

  return new Promise(function (resolve, reject) {
    fn(res, files, token, showProgress).then(checkStatus).then(parseJSON).then(function (res) {
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

/**
 * preSignRequest
 * Perform an XHR request and Resolve or Reject
 * @param  {File Object} file
 * @param  {String} presignUrl
 * @param  {String} token
 * @param  {Promise}
 */

function preSignRequest(files, presignUrl, token) {
  var data = [];

  files.map(function (file) {
    data.push({
      'file_name': file.name,
      'content_type': file.type
    });
  });

  return new Promise(function (resolve, reject) {
    req = request.post(presignUrl).send(data).set({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': token
    }).end(function (err, res) {
      if (err) reject(err);
      resolve(res);
    });
  });
}

/**
 * preSign
 * Take a file, url and
 * return a Promise that makes a preSignRequest()
 * @param  {File Object} file
 * @param  {String} presignUrl
 * @param  {String} token
 * @param  {Function} defaults to preSignRequest()
 * @param  {Promise}
 */

function preSign(files, presignUrl, token) {
  var fn = arguments.length <= 3 || arguments[3] === undefined ? preSignRequest : arguments[3];

  return new Promise(function (resolve, reject) {
    fn(files, presignUrl, token).then(checkStatus).then(parseJSON).then(function (res) {
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

exports.preSign = preSign;
exports.upload = upload;