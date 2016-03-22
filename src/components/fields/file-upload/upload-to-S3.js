require('es6-promise').polyfill()
const request = require('superagent')
import bus from './bus'

/**
 * noOp
 * Default param value
 * @return {Function}
 */

const noOp = function () {}

/**
 * req
 * on 'abortUploadRequest' get access to the latest XHR request and about()
 */

let req;
bus.on('abortUploadRequest', () => {
  req.abort()
})

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

function parseJSON (res, url) {
  return JSON.parse(res.text)
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
 * uploadRequest
 * Perform an XHR request and Resolve or Reject
 * @param  {Object} res - the response from preSignXHR()
 * @param  {File Object} file
 * @param  {String} token
 * @param  {Function} on progress event handler
 * @return  {Promise}
 */

function uploadRequest (res, file, token, showProgress) {
  const { url } = res
  const data = formData(res, file)

  return new Promise((resolve, reject) => {
    req = request
      .post(url)
      .send(data)
      .set({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': token
      })
      .on('progress', (e) => {
        showProgress(e)
      })
      .end((err, res) => {
        if (err) reject(err)
        resolve(res)
      })


  })
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

function upload (res, file, token, showProgress = noOp, fn = uploadRequest) {
  return new Promise((resolve, reject) => {
    fn(res, file, token, showProgress)
      .then(checkStatus)
      .then(parseJSON)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * preSignRequest
 * Perform an XHR request and Resolve or Reject
 * @param  {File Object} file
 * @param  {String} presignUrl
 * @param  {String} token
 * @param  {Promise}
 */

function preSignRequest (file, presignUrl, token) {
  const { name, type } = file
  const data = {
    'file_name': name,
    'content_type': type
  }

  return new Promise((resolve, reject) => {
    req = request
      .post(presignUrl)
      .send(data)
      .set({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': token
      })
      .end((err, res) => {
        if (err) reject(err)
        console.log('presign res', res)
        resolve(res)
      })
  })
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

function preSign (file, presignUrl, token, fn = preSignRequest) {
  return new Promise((resolve, reject) => {
    fn(file, presignUrl, token)
      .then(checkStatus)
      .then(parseJSON)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export {
  preSign,
  upload
}
