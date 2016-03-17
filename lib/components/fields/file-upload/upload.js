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


  var data = new FormData();

  if (fields) {
    Object.keys(fields).forEach(function (key) {
      data.append(key, fields[key]);
    });
  }

  data.append(as, file, name);
  return data;
}

/**
 * uploadImage
 * Return a promise that posts to S3
 * rejects on error, resolves on success
 * Build data to post from formData() and file object
 *
 * @param  {Object} res: response from preSign()
 * @param  {String} token: csrf-token
 * @param  {Object} file: file object
 */

function uploadToS3(res, file, token) {
  var url = res.url;
  var id = res.id;

  var data = formData(res, file);

  return new Promise(function (resolve, reject) {
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
  });
}

/**
 * preSign
 */

function preSign(file, presignUrl, token) {
  var name = file.name;
  var type = file.type;

  var data = {
    'file_name': name,
    'content_type': type
  };

  return new Promise(function (resolve, reject) {
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
  });
}

/**
 * exports
 * get the `csrf-token` and pass it through to all XHR requests.
 * call `preSign()` passing in a file, token & optional block.
 * call `uploadToS3()` passing in response from `preSign()`, file, token & block
 * call `uploadToMercuryDB()` passing in response from `uploadToS3()`, file, token & block
 * if all was successful call resolve()
 * else call reject()
 *
 * usage example:
 *
 * uploadImageToS3(imageFile, Block)
 * 	.then(function(res) {
 *  	 // do something on success
 *   })
 *   .catch(function(err){
 *   	 // do something on error
 *   })
 *
 * @param {Object} file object - optional
 * @param {Object} an image blockType
 * @return {Promise} provide resolve/reject methods when initialised
 */

exports.default = function (file, presignUrl) {
  var token = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

  return new Promise(function (resolve, reject) {
    preSign(file, presignUrl, token).then(function (res) {
      return uploadToS3(res, file, token);
    }).then(function (res) {
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
};