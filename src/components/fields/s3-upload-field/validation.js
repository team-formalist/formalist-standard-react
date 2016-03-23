const FILETYPE = /image\/(jpg|jpeg|gif|png|bmp)$/
const MAXFILESIZE = 5000000 // 5MB

/**
 * validate
 * Take a file, validate and return a Promise
 * Pass a `status` object back with Promise
 * @param  {File Object} file
 * @return {Promise}
 */

function validate (files, fileType = FILETYPE, maxFileSize = MAXFILESIZE) {
  if (!files.length) return

  let status = {
    isValid: true
  }

  function isValid (file) {
    if (!file.type.match(fileType)) {
      status.isValid = false
      status.message = 'The asset you tried to upload is a type we don\'t understand. Supported image formats are JPEG, PNG, and GIF.'
      return status
    }

    if (file.size > maxFileSize) {
      status.isValid = false
      status.message = 'The file you tried to upload exceed our limit (5MB). Try uploading a smaller version.'
      return status
    }

    return status
  }

  return new Promise((resolve, reject) => {
    // validate file type (render error)
    let result

    files.map((file) => {
      isValid(file)
      if (!status.isValid) reject(status)
    })

    resolve(status)
  })
}

export {
  validate
}
