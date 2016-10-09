"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (file) {
  var permittedFileTypeRegex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var permittedFileTypeMessage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var maxFileSize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var maxFileSizeMessage = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

  if (!file) return;
  var success = true;

  if (permittedFileTypeRegex && !file.type.match(permittedFileTypeRegex)) {
    return {
      file: file,
      message: permittedFileTypeMessage,
      success: false
    };
  }

  if (maxFileSize && file.size > maxFileSize) {
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