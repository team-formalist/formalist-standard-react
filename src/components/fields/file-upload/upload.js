require('es6-promise').polyfill()
var fetch = require('isomorphic-fetch')

/**
 * checkStatus
 * take a response and check it's `status` property
 * if between 200-300 return the response object
 * else throw an error
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */

function checkStatus (res) {
  if (res.status >= 200 && res.status < 300) {
    return res
  } else {
    let error = new Error(res.statusText)
    error.response = res
    throw error
  }
}

/**
 * parseJSON
 * Take a response object and return it parsed
 * @param  {String} response
 * @return {Object}
 */

function parseJSON (res) {
  return res.json()
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

function formData (res, file) {
  const { as, fields } = res
  const { name } = file

  var data = new window.FormData()

  if (fields) {
    Object.keys(fields).forEach((key) => {
      data.append(key, fields[key])
    })
  }

  data.append(as, file, name)
  return data
}

/**
 * uploadToS3Request
 * Perform an XHR request and Resolve or Reject
 * @param  {Object} res - the response from preSignXHR()
 * @param  {File Object} file
 * @param  {String} token
 * @param  {Resolve, Reject} functions passed in from uploadToS3
 * @param  {Promise}
 */

function uploadToS3Request (res, file, token, resolve, reject) {
  const { url, id } = res
  const data = formData(res, file)

  fetch(url, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': token
    },
    body: JSON.stringify(data)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then((res) => {
      res.original_path = id
      resolve(res)
    })
    .catch((err) => {
      reject(err)
    })
}

/**
 * uploadToS3
 * return a promise after calling uploadToS3Request()
 * @param  {Object} res - the response from preSignRequest()
 * @param  {File Object} file
 * @param  {String} token
 * @param  {Function} fn - XHR request
 * @return {Promise}
 */

function uploadToS3 (res, file, token, fn) {
  return new Promise((resolve, reject) => {
    fn(res, file, token, resolve, reject)
  })
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

function preSignRequest (file, presignUrl, token, resolve, reject) {
  const { name, type } = file
  const data = {
    'file_name': name,
    'content_type': type
  }

  fetch(presignUrl, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': token
    },
    body: JSON.stringify(data)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then((res) => {
      resolve(res)
    })
    .catch((err) => {
      reject(err)
    })
}

function preSign (file, presignUrl, token, fn) {
  return new Promise((resolve, reject) => {
    fn(file, presignUrl, token, resolve, reject)
  })
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

function upload (file, presignUrl, token = '') {
  return new Promise((resolve, reject) => {
    preSign(file, presignUrl, token, preSignRequest)
      .then((res) => {
        return uploadToS3(res, file, token, uploadToS3Request)
      })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}


export {
  upload,
  preSign,
  uploadToS3
}
