import test from 'blue-tape'

// local module
import { validate } from '../../src/components/fields/file-upload/validation'

const file = {
  name: 'W1004855.jpg',
  lastModified: 1458086083000,
  lastModifiedDate: new Date(),
  webkitRelativePath: '',
  size: 214179,
  type: 'image/jpeg'
}

test('File Validation', (nest) => {
  nest.test('...returns a promise', (t) => {
    return validate(file)
  })

  nest.test('...should fail', (t) => {
    return t.shouldFail(validate(file).then(() => {
      throw new Error("Failed!");
    }))
  })

  nest.test('...should be successful', (t) => {
    return t.shouldFail(validate(file).then((res) => {
      t.ok(status.result, 'valid')
      t.end()
    }))
  })

  nest.test('...should be unsuccessful', (t) => {
    const file = Object.assign({}, file)
    file.type = 'foo'

    return t.shouldFail(validate(file).then((res) => {
      t.notOk(status.result, 'invalid')
      t.end()
    }))
  })
})
