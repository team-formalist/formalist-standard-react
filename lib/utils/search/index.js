import request from "superagent";
import uid from "uid";

var reqs = {};

/**
 * customError
 * return an object forming a custom error message
 * @param  {String} name
 * @param  {Object} error
 * @return {Object}
 */

function customError(name, error) {
  return {
    error: error,
    message: error.message,
    name: name
  };
}

/**
 * responseStatus
 * take a response and check the response `status` property
 * if between 200-300 return the response object
 * else throw a custom error
 * @param  {Object} res
 * @return {Object}
 */

function responseStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res;
  } else {
    var error = new Error(res.statusText);
    error.response = res;
    throw customError("responseStatus", error);
  }
}

/**
 * parseJSON
 * Take a response object and return the parsed res.text
 * @param  {String} response
 * @return {Object}
 */

function parseJSON(res) {
  return JSON.parse(res.text);
}

/**
 * searchRequest
 * @return  {Promise}
 */

function searchRequest(url, params, id) {
  return new Promise(function (resolve, reject) {
    reqs[id] = request.get(url).query(params).set({
      Accept: "application/json",
      "Content-Type": "application/json"
    }).end(function (err, res) {
      if (err) return reject(customError("searchRequest", err));
      resolve(res);
    });
  });
}

/**
 * Abort an existing request
 * @param  {String} id UID for the request
 */
function abortRequest(id) {
  var req = reqs[id];
  if (req) {
    req.abort();
  }
}

export default function search(url) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var id = uid(10);
  return {
    abort: function abort() {
      return abortRequest(id);
    },
    response: new Promise(function (resolve, reject) {
      searchRequest(url, params, id).then(responseStatus).then(parseJSON).then(function (res) {
        resolve(res);
      }).catch(function (err) {
        reject(err);
      });
    })
  };
}