"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (file) {
  var fileType = arguments.length <= 1 || arguments[1] === undefined ? FILETYPE : arguments[1];
  var fileTypeMessage = arguments.length <= 2 || arguments[2] === undefined ? FILETYPEMESSAGE : arguments[2];
  var maxFileSize = arguments.length <= 3 || arguments[3] === undefined ? MAXFILESIZE : arguments[3];
  var maxFileSizeMessage = arguments.length <= 4 || arguments[4] === undefined ? MAXFILESIZEMESSAGE : arguments[4];

  if (!file) return;
  var success = true;

  if (!file.type.match(fileType)) {
    return {
      file: file,
      message: fileTypeMessage,
      success: false
    };
  }

  if (file.size > maxFileSize) {
    return {
      file: file,
      message: maxFileSizeMessage,
      success: false
    };
  }

  return {
    file: file,
    success: success
  };
};

var FILETYPE = /image\/(`jpg|jpeg|gif|png|bmp`)$/;
var FILETYPEMESSAGE = "The asset you tried to upload is a type we don't understand.\n  Supported image formats are JPEG, PNG, and GIF.";

var MAXFILESIZE = 5000000; // 5MB
var MAXFILESIZEMESSAGE = "The file you tried to upload exceed our limit (5MB).\n  Try uploading a smaller version.";

/**
 * validate
 * Take a file, validate and return a Promise
 * Pass a `status` object back with Promise
 * @param  {File Object} file
 * @return {Promise}
 */