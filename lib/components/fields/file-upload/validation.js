'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var FILETYPE = /image\/(jpg|jpeg|gif|png|bmp)$/;
var MAXFILESIZE = 5000000; // 5MB

/**
 * validate
 * Take a file and a callback function.
 * Match the type / size of the file against restrictions.
 * Pass a `status` object back with the callback.
 * @param  {File Object} file
 * @param  {Function} fn - a callback function
 * @return {Function}
 */

function validate(file, fn) {
  if (!file || !fn) return;

  var status = {
    result: true
  };

  // validate file type (render error)
  if (!file.type.match(FILETYPE)) {
    status.result = false;
    status.title = 'hmm...';
    status.message = 'The file you tried to upload is a type we don’t understand. Supported image formats are JPEG, PNG, and GIF.';
    return fn(status);
  }

  // validate file size (render error)
  if (file.size > MAXFILESIZE) {
    status.result = false;
    status.title = 'hmm...';
    status.message = 'The file you tried to upload exceed our limit (5MB). Try uploading a smaller version.';
    return fn(status);
  }

  return fn(status);
}

exports.validate = validate;