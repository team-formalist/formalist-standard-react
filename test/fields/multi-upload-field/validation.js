import test from 'blue-tape'

// local module
import validate from '../../../src/components/fields/multi-upload-field/validation'

test('File Validation', (nest) => {
  nest.test('...should fail due to file size', (t) => {
    let InvalidFile = {
      size: 999999999,
      type: 'image/jpeg'
    }

    let status = validate(InvalidFile)
    t.notOk(status.success, 'File is invalid')
    t.end()
  })

  nest.test('...should fail due to file type', (t) => {
    let InvalidFile = {
      size: 214179,
      type: 'image/cheeseburger'
    }

    let status = validate(InvalidFile)
    t.notOk(status.success, 'File is invalid')
    t.end()
  })

  nest.test('...should be successful', (t) => {
    let file = {
      name: 'W1004855.jpg',
      lastModified: 1458086083000,
      lastModifiedDate: new Date(),
      webkitRelativePath: '',
      size: 500,
      type: 'image/jpeg'
    }

    let status = validate(file)
    t.equal(status.success, true)
    t.end()
  })

  nest.test('...should validate against custom (file type) params', (t) => {
    const FILETYPE = /image\/(jpg|jpeg)$/ // only jpg/jpeg
    const MAXFILESIZE = 5000000

    let file = {
      size: 500,
      type: 'image/png'
    }

    let status = validate(file, FILETYPE, MAXFILESIZE)
    t.notOk(status.success, 'Invalid file type')
    t.end()
  })

  nest.test('...should validate against custom (max file size) params', (t) => {
    const FILETYPE = /image\/(jpg|jpeg|gif|png|bmp)$/
    const MAXFILESIZE = 1000000 // 1MB

    let file = {
      size: 999999999999,
      type: 'image/png'
    }

    let status = validate(file, FILETYPE, MAXFILESIZE)
    t.notOk(status.success, 'Invalid file size')
    t.end()
  })
})
