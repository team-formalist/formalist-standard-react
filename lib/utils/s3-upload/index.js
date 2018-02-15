import request from "superagent";
import EXIF from "exif-js";

/**
 * noOp
 * Default param value
 * @return {Function}
 */

var noOp = function noOp(_) {};

/**
 * reqs
 * a hash of existing XHR requests
 */

var reqs = {};

/**
 * getXHRRequests
 * Get the current XHR processing XHR requests
 * @return {Object}
 */

function getXHRRequests() {
  return reqs;
}

/**
 * setXHRRequests
 * Assign an object to `reqs`
 * @param {Object} object
 * @return {Object}
 */

function setXHRRequests(object) {
  Object.assign(reqs, object);
  return reqs;
}

/**
 * abortXHRRequest
 * Abort a XHR request by 'uid'
 * @param {String} uid
 * @param {Function} optional function
 * @return {Object}
 */

function abortXHRRequest(uid, fn) {
  if (reqs.hasOwnProperty(uid)) {
    if (!reqs[uid]) return;

    if (fn) {
      fn();
    } else {
      reqs[uid].abort();
    }
    delete reqs[uid];
    return reqs;
  }
}

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
 * formData
 * Build up and return a FormData object
 *
 * @param {String} as: Define the type of form data
 * @param {Object} file: a file object
 * @param {Object} fields: key/value from preSign response
 * @return {Object} FormData
 */

function formData(as, file, fields) {
  var data = new FormData();

  if (fields) {
    Object.keys(fields).forEach(function (key) {
      data.append(key, fields[key]);
    });
  }

  data.append(as, file, file.name);
  return data;
}

/**
 * Parse file metadata
 * @param {FileObject} file
 */
function parseMetadata(file) {
  var isImage = file.type.match("image.*");

  return new Promise(function (resolve, reject) {
    var metadata = {
      size: file.size,
      content_type: file.type
    };
    var isImage = file.type.match("image.*");

    var reader = new FileReader();
    reader.onload = function (f) {
      if (isImage) {
        var image = new Image();

        image.onload = function () {
          metadata.height = image.height;
          metadata.width = image.width;

          correctImageMetadata(file, metadata).then(function (data) {
            resolve(data);
          });
        };
        image.onerror = function (err) {
          reject(err);
        };
        image.src = f.target.result;
      } else {
        resolve(metadata);
      }
    };
    reader.onerror = function (err) {
      reject(err);
    };
    reader.readAsDataURL(file);
  });
}

/**
 * correctImageMetadata
 * Correct geometry in based on EXIF orientation metadata
 * @param {FileObject} file file
 * @param {Object} metadata Metadata
 */
function correctImageMetadata(file, metadata) {
  var width = metadata.width,
      height = metadata.height;

  var rawRatio = width / height;

  return new Promise(function (resolve, reject) {
    EXIF.getData(file, function () {
      var correctedOrientation = void 0;
      var uncorrectedOrientation = EXIF.getTag(this, "Orientation");

      // Set the correction to square or landscape to start with
      var initialOrientation = "landscape";
      if (rawRatio === 1) {
        initialOrientation = "square";
      } else if (rawRatio < 1) {
        initialOrientation = "portrait";
      }

      // Set the default corrected orientation
      correctedOrientation = initialOrientation;
      // And a default set of raw height/width values
      metadata.uncorrected_width = width;
      metadata.uncorrected_height = height;
      metadata.width = width;
      metadata.height = height;

      if (uncorrectedOrientation !== undefined) {
        // Flip orientation based on the EXIF orientation values 1,2,3,4 are
        // variations on the _correct_ orientation, and 5,6,7,8 are rotated
        // versions. Some of those indicate mirrored values but we don't care
        // about that since we're not storing it.
        if (uncorrectedOrientation >= 5) {
          if (correctedOrientation === "landscape") {
            correctedOrientation = "portrait";
          } else if (correctedOrientation === "portrait") {
            correctedOrientation = "landscape";
          }
          // Flip the width/height for metadata
          metadata.uncorrected_width = height;
          metadata.uncorrected_height = width;
          metadata.width = height;
          metadata.height = width;
        }
      }
      metadata.orientation = correctedOrientation;
      metadata.uncorrected_orientation = uncorrectedOrientation || initialOrientation;
      resolve(metadata);
    });
  });
}

/**
 * Assemble output data into persistable format
 * @param {FileObjet} fileObject File object from uploader
 * @param {Object} metadata Extracted metadata
 */
function assembleOutputData(res, fileObject, metadata) {
  var fileAttributes = fileObject.fileAttributes;
  var file_name = fileAttributes.file_name;
  var fields = res.fields;
  var key = fields.key;

  var path = key.replace(/\${filename}/, file_name);
  return Object.assign({
    path: path
  }, metadata);
}

/**
 * uploadRequest
 * Assign an XHR request to the `reqs` hash using the `uid`.
 * @param  {Object} res - the response from presignRequest()
 * @param  {File Object} file
 * @param  {Function} on progress event handler
 * @return  {Promise}
 */

function uploadRequest(res, fileObject, showProgress) {
  var url = res.url,
      fields = res.fields;
  var file = fileObject.file,
      uid = fileObject.uid;

  var data = formData("file", file, fields);

  return new Promise(function (resolve, reject) {
    reqs[uid] = request.post(url).send(data).set({
      Accept: "application/json"
    }).on("progress", function (e) {
      showProgress(e, fileObject);
    }).end(function (err, res) {
      delete reqs[uid];

      // throw a custom error message
      if (err) return reject(customError("uploadRequest", err));

      resolve(res);
    });
  });
}

/**
 * upload
 * Take a response object (from presignRequest) a file and a token
 * and return a Promise that makes an uploadRequest()
 * @param  {Object} res - the response from presignRequest()
 * @param  {File Object} fileObject
 * @param  {Function} showProgress - progress event handler
 * @param  {Function} fn - defaults to uploadRequest()
 * @return {Promise}
 */

function upload(res, fileObject) {
  var showProgress = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noOp;
  var fn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : uploadRequest;

  return new Promise(function (resolve, reject) {
    var metadata = parseMetadata(fileObject.file);
    var req = fn(res, fileObject, showProgress).then(responseStatus);

    Promise.all([req, metadata]).then(function (args) {
      // Merge metadata with base attributes
      var metadata = args[1];
      var output = assembleOutputData(res, fileObject, metadata);
      resolve(output);
    }).catch(function (err) {
      reject(err);
    });
  });
}

/**
 * presignRequest
 * Perform an XHR request and Resolve or Reject
 * @param  {String} presignUrl
 * @param  {String} token
 * @param  {Promise}
 */

function presignRequest(presignUrl, token) {
  return new Promise(function (resolve, reject) {
    request.post(presignUrl).set({
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRF-Token": token
    }).end(function (err, res) {
      // throw a custom error message
      if (err) return reject(customError("presignRequest", err));
      resolve(res);
    });
  });
}

/**
 * presign
 * Take a url and optional token
 * return a Promise
 * @param  {String} presignUrl
 * @param  {String} token
 * @param  {Function} defaults to presignRequest()
 * @param  {Promise}
 */

function presign(presignUrl, token) {
  var fn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : presignRequest;

  return new Promise(function (resolve, reject) {
    fn(presignUrl, token).then(responseStatus).then(parseJSON).then(function (res) {
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

export { responseStatus, parseJSON, presign, upload, customError, abortXHRRequest, getXHRRequests, setXHRRequests };