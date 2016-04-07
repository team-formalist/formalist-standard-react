const FILETYPE = /image\/(`jpg|jpeg|gif|png|bmp`)$/
const FILETYPEMESSAGE = `The asset you tried to upload is a type we don\'t understand.
  Supported image formats are JPEG, PNG, and GIF.`

const MAXFILESIZE = 5000000 // 5MB
const MAXFILESIZEMESSAGE = `The file you tried to upload exceed our limit (5MB).
  Try uploading a smaller version.`

/**
 * validate
 * Take a file, validate and return a Promise
 * Pass a `status` object back with Promise
 * @param  {File Object} file
 * @return {Promise}
 */

export default function (file, fileType = FILETYPE, fileTypeMessage = FILETYPEMESSAGE, maxFileSize = MAXFILESIZE, maxFileSizeMessage = MAXFILESIZEMESSAGE) {
  if (!file) return
  let success = true

  if (!file.type.match(fileType)) {
    return {
      file: file,
      message: fileTypeMessage,
      success: false
    }
  }

  if (file.size > maxFileSize) {
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
