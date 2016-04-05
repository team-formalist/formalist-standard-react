'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (file) {
  var fileType = arguments.length <= 1 || arguments[1] === undefined ? FILETYPE : arguments[1];
  var maxFileSize = arguments.length <= 2 || arguments[2] === undefined ? MAXFILESIZE : arguments[2];

  if (!file) return;
  var success = true;

  if (!file.type.match(fileType)) {
    return {
      file: file,
      message: 'The asset you tried to upload is a type we don\'t understand. Supported image formats are JPEG, PNG, and GIF.',
      success: false
    };
  }

  if (file.size > maxFileSize) {
    return {
      file: file,
      message: 'The file you tried to upload exceed our limit (5MB). Try uploading a smaller version.',
      success: false
    };
  }

  return {
    file: file,
    success: success
  };
};

var FILETYPE = /image\/(jpg|jpeg|gif|png|bmp)$/;
var MAXFILESIZE = 5000000; // 5MB

/**
 * validate
 * Take a file, validate and return a Promise
 * Pass a `status` object back with Promise
 * @param  {File Object} file
 * @return {Promise}
 */