'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var FILETYPE = /image\/(jpg|jpeg|gif|png|bmp)$/;
var MAXFILESIZE = 5000000; // 5MB

/**
 * validate
 * Take a file, validate and return a Promise
 * Pass a `status` object back with Promise
 * @param  {File Object} file
 * @return {Promise}
 */

function validate(files) {
  var fileType = arguments.length <= 1 || arguments[1] === undefined ? FILETYPE : arguments[1];
  var maxFileSize = arguments.length <= 2 || arguments[2] === undefined ? MAXFILESIZE : arguments[2];

  if (!files.length) return;

  var status = {
    isValid: true
  };

  function isValid(file) {
    if (!file.type.match(fileType)) {
      status.isValid = false;
      status.message = 'The asset you tried to upload is a type we don\'t understand. Supported image formats are JPEG, PNG, and GIF.';
      return status;
    }

    if (file.size > maxFileSize) {
      status.isValid = false;
      status.message = 'The file you tried to upload exceed our limit (5MB). Try uploading a smaller version.';
      return status;
    }

    return status;
  }

  return new Promise(function (resolve, reject) {
    // validate file type (render error)
    var result = void 0;

    files.map(function (file) {
      isValid(file);
      if (!status.isValid) reject(status);
    });

    resolve(status);
  });
}

exports.validate = validate;