import request from "superagent";
import EXIF from "exif-js";

/**
 * noOp
 * Default param value
 * @return {Function}
 */

const noOp = _ => {};

/**
 * reqs
 * a hash of existing XHR requests
 */

let reqs = {};

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
    error,
    message: error.message,
    name
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
    let error = new Error(res.statusText);
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

function formData(as, file, fields, fileAttributes = {}) {
  var data = new FormData();

  if (fields) {
    Object.keys(fields).forEach(function(key) {
      data.append(key, fields[key]);
    });
  }
  const name = fileAttributes.file_name || file.name;
  data.append(as, file, name);
  return data;
}

/**
 * Determine the file type
 * @param {FileObject} file Uploaded file object
 * @return {Mixed} Type as simple string or false if no match
 */
function fileType(file) {
  if (file.type.match("image.*")) {
    return "image";
  } else if (file.type.match("video.*")) {
    return "video";
  } else if (file.type.match("audio.*")) {
    return "audio";
  }
  return false;
}

/**
 * Parse file metadata
 * @param {FileObject} file
 */
function parseMetadata(file) {
  const type = fileType(file);

  return new Promise(function(resolve, reject) {
    const metadata = {
      size: file.size,
      content_type: file.type
    };

    switch (type) {
      case "image":
        parseImageMetadata(file)
          .then(data => resolve({ ...metadata, ...data }))
          .catch(err => reject(err));
        break;
      case "audio":
        parseAudioMetadata(file)
          .then(data => resolve({ ...metadata, ...data }))
          .catch(err => reject(err));
        break;
      case "video":
        parseVideoMetadata(file)
          .then(data => resolve({ ...metadata, ...data }))
          .catch(err => reject(err));
        break;
      default:
        resolve(metadata);
        break;
    }
  });
}

/**
 * Parse metadata for images
 * @param {FileObject} file Uploaded image file
 * @return {Promise}
 */
function parseImageMetadata(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", function onReaderLoad(f) {
      const image = new Image();

      image.addEventListener("load", function onImageLoad() {
        const metadata = {
          height: image.height,
          width: image.width
        };
        correctImageMetadata(file, metadata).then(data => {
          resolve(data);
        });
      });

      image.addEventListener("error", function onImageError(err) {
        reject(err);
      });

      image.src = f.target.result;
    });
    reader.readAsDataURL(file);
  });
}

/**
 * Parse metadata for videos
 * @param {FileObject} file Uploaded video file
 * @return {Promise}
 */
function parseVideoMetadata(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", function onReaderLoad(f) {
      // Build object URL from file blob
      var blob = new Blob([f.target.result], { type: file.type });
      const url = (URL || webkitURL).createObjectURL(blob);
      const video = document.createElement("video");
      video.preload = "metadata";

      video.addEventListener("loadedmetadata", function onVideoLoad() {
        const duration = video.duration;
        resolve({ duration });
      });

      video.addEventListener("error", function onVideoError(err) {
        reject(err);
      });

      video.src = url;
    });
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Parse metadata for audio files
 * @param {FileObject} file Uploaded audio file
 * @return {Promise}
 */
function parseAudioMetadata(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", function onReaderLoad(f) {
      // Build object URL from file blob
      var blob = new Blob([f.target.result], { type: file.type });
      const url = (URL || webkitURL).createObjectURL(blob);
      const audio = document.createElement("audio");
      audio.preload = "metadata";

      audio.addEventListener("loadedmetadata", function onAudioLoad() {
        const duration = audio.duration;
        resolve({ duration });
      });

      audio.addEventListener("error", function onAudioError(err) {
        reject(err);
      });

      audio.src = url;
    });
    reader.readAsArrayBuffer(file);
  });
}

/**
 * correctImageMetadata
 * Correct geometry in based on EXIF orientation metadata
 * @param {FileObject} file file
 * @param {Object} metadata Metadata
 */
function correctImageMetadata(file, metadata) {
  const { width, height } = metadata;
  var rawRatio = width / height;

  return new Promise(function(resolve, reject) {
    EXIF.getData(file, function() {
      let correctedOrientation;
      const exifOrientation = EXIF.getTag(this, "Orientation");

      // Set the correction to square or landscape to start with
      let initialOrientation = "landscape";
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

      if (exifOrientation !== undefined) {
        // Flip orientation based on the EXIF orientation values 1,2,3,4 are
        // variations on the _correct_ orientation, and 5,6,7,8 are rotated
        // versions. Some of those indicate mirrored values but we don't care
        // about that since we're not storing it.
        if (exifOrientation >= 5) {
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
      metadata.uncorrected_orientation = initialOrientation;
      resolve(metadata);
    });
  });
}

/**
 * Assemble output data into persistable format
 * @param {FileObject} fileObject File object from uploader
 * @param {Object} metadata Extracted metadata
 */
function assembleOutputData(res, fileObject, metadata) {
  const { fileAttributes } = fileObject;
  const { file_name } = fileAttributes;
  const { fields } = res;
  const { key } = fields;
  const path = key.replace(/\${filename}/, file_name);
  return {
    path,
    ...metadata
  };
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
  const { url, fields } = res;
  const { file, uid, fileAttributes } = fileObject;
  const data = formData("file", file, fields, fileAttributes);

  return new Promise((resolve, reject) => {
    reqs[uid] = request
      .post(url)
      .send(data)
      .set({
        Accept: "application/json"
      })
      .on("progress", e => {
        showProgress(e, fileObject);
      })
      .end((err, res) => {
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

function upload(res, fileObject, showProgress = noOp, fn = uploadRequest) {
  return new Promise((resolve, reject) => {
    const metadata = parseMetadata(fileObject.file);
    const req = fn(res, fileObject, showProgress).then(responseStatus);

    Promise.all([req, metadata])
      .then(args => {
        // Merge metadata with base attributes
        const metadata = args[1];
        const output = assembleOutputData(res, fileObject, metadata);
        resolve(output);
      })
      .catch(err => {
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

function presignRequest(presignUrl, token, presignOptions) {
  return new Promise((resolve, reject) => {
    request
      .post(presignUrl)
      .send(presignOptions)
      .set({
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-Token": token
      })
      .end((err, res) => {
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

function presign(presignUrl, token, presignOptions = {}, fn = presignRequest) {
  return new Promise((resolve, reject) => {
    fn(presignUrl, token, presignOptions)
      .then(responseStatus)
      .then(parseJSON)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export default {
  responseStatus,
  parseJSON,
  presign,
  upload,
  customError,
  abortXHRRequest,
  getXHRRequests,
  setXHRRequests
};
