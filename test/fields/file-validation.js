import test from 'tape'

// local module
import { validate } from '../../src/components/fields/file-upload/validation.js'

const file = {
  name: 'W1004855.jpg',
  lastModified: 1458086083000,
  lastModifiedDate: new Date(),
  webkitRelativePath: '',
  size: 214179,
  type: 'image/jpeg'
}

test('File Validation', (nest) => {
  nest.test('...successful file validation', (t) => {
    validate(file, (status) => {
      t.ok(status.result, 'valid')
      t.end()
    })
  })

  nest.test('...unsuccessful file validation', (t) => {
    const file = Object.assign({}, file)
    file.type = 'foo'

    validate(file, (status) => {
      t.notOk(status.result, 'invalid')
      t.end()
    })
  })
})
