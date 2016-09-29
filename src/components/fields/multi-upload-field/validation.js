/**
 * Validate
 * Take a file, validate and return a Promise
 * Pass a `status` object back with Promise
 * @param  {File Object} file
 * @return {Promise}
 */

export default function (file, permittedFileTypeRegex = null, permittedFileTypeMessage = null, maxFileSize = null, maxFileSizeMessage = null) {
  if (!file) return
  let success = true

  if (permittedFileTypeRegex && !file.type.match(permittedFileTypeRegex)) {
    return {
      file: file,
      message: permittedFileTypeMessage,
      success: false
    }
  }

  if (maxFileSize && (file.size > maxFileSize)) {
    return {
      file: file,
      message: maxFileSizeMessage,
      success: false
    }
  }

  return {
    file,
    success
  }
}
