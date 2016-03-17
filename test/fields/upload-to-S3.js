
import test from 'blue-tape'
import { upload, preSign } from '../../src/components/fields/file-upload/upload-to-S3'

const token = ''
const url = 'www.foo.com'
const noOp = function (file, url, token, resolve, reject) {
  resolve()
}
const file = {
  name: 'W1004855.jpg',
  lastModified: 1458086083000,
  lastModifiedDate: new Date(),
  webkitRelativePath: '',
  size: 214179,
  type: 'image/jpeg'
}

test('presign:', (nest) => {
  nest.test('...returns a promise', (t) => {
    return preSign(file, url, token, noOp)
  })

  nest.test('...should fail', (t) => {
    return t.shouldFail(preSign(file, url, token, noOp).then(() => {
      throw new Error("Failed!");
    }))
  })
})

test('upload:', (nest) => {
  const response = {
    url: "foo",
    id: 1
  }

  nest.test('...returns a promise', (t) => {
    return upload(response, file, token, noOp)
  })

  nest.test('...should fail', (t) => {
    return t.shouldFail(upload(response, file, token, noOp).then(() => {
      throw new Error("Failed!");
    }))
  })

  nest.test('...should fail', (t) => {
    return t.shouldFail(upload(response, file, token, noOp).then(() => {
      throw new Error("Failed!");
    }))
  })
})
