import test from 'blue-tape'

// local module
import validate from '../../../src/components/fields/multi-upload-field/validation'

test('File Validation', (nest) => {
  nest.test('...should be successful due to no retrictions', (t) => {
    let file = {
      name: 'W1004855.jpg',
      lastModified: 1458086083000,
      lastModifiedDate: new Date(),
      webkitRelativePath: '',
      size: 5000000000,
      type: 'image/rtf',
    }

    let status = validate(file)
    t.ok(status.success, 'File is valid')
    t.end()
  })

  nest.test('...should validate against custom (file type) params', (t) => {
    const fileTypeRegex = /image\/(jpg|jpeg)$/ // only jpg/jpeg
    const fileTypeRegexMessage = 'The asset you tried to upload is a type we don\'t understand'
    const maxFileSize = 5000000
    const maxFileSizeMessage = 'The file you tried to upload exceed our limit (5MB).'

    let file = {
      size: 500,
      type: 'image/png',
    }

    let status = validate(file, fileTypeRegex, fileTypeRegexMessage, maxFileSize, maxFileSizeMessage)
    t.notOk(status.success, 'Invalid file type')
    t.equal(status.message, fileTypeRegexMessage)
    t.end()
  })

  nest.test('...should validate against custom (max file size) params', (t) => {
    const fileTypeRegex = /image\/(jpg|jpeg|gif|png|bmp)$/
    const fileTypeRegexMessage = 'The asset you tried to upload is a type we don\'t understand'
    const maxFileSize = 1000000 // 1MB
    const maxFileSizeMessage = 'The file you tried to upload exceed our limit (5MB).'

    let file = {
      size: 999999999999,
      type: 'image/png',
    }

    let status = validate(file, fileTypeRegex, fileTypeRegexMessage, maxFileSize, maxFileSizeMessage)
    t.notOk(status.success, 'Invalid file size')
    t.equal(status.message, maxFileSizeMessage)
    t.end()
  })
})
