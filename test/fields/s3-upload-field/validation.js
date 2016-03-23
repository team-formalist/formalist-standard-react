import test from 'blue-tape'

// local module
import { validate } from '../../../src/components/fields/s3-upload-field/validation'

let files = [{
  name: 'W1004855.jpg',
  lastModified: 1458086083000,
  lastModifiedDate: new Date(),
  webkitRelativePath: '',
  size: 214179,
  type: 'image/jpeg'
}]

test('File Validation', (nest) => {
  nest.test('...returns a promise', (t) => {
    return validate(files)
  })

  nest.test('...should fail', (t) => {
    return t.shouldFail(validate(files).then(() => {
      throw new Error('Failed!')
    }))
  })

  nest.test('...should be successful', (t) => {
    validate(files).then((res) => {
      t.equal(res.isValid, true)
      t.end()
    })
  })

  nest.test('...should be unsuccessful due to file size', (t) => {
    let files = [{
      name: 'W1004855.jpg',
      lastModified: 1458086083000,
      lastModifiedDate: new Date(),
      webkitRelativePath: '',
      size: 5000001, // exceeds max file size
      type: 'image/jpeg'
    }]
    return t.shouldFail(validate(files))
  })

  nest.test('...should be unsuccessful due to file type', (t) => {
    let files = [{
      name: 'W1004855.jpg',
      lastModified: 1458086083000,
      lastModifiedDate: new Date(),
      webkitRelativePath: '',
      size: 214179,
      type: false // incorrect file type
    }]
    return t.shouldFail(validate(files))
  })
})
