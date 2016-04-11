"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (file) {
  var permittedFileTypeRegex = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
  var permittedFileTypeMessage = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
  var maxFileSize = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
  var maxFileSizeMessage = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];

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