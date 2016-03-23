import test from 'tape'
import React from 'react'
import shallowRenderComponent from '../../fixtures/shallow-render.js'

// local module
import Input from '../../../src/components/fields/s3-upload-field'

const props = {
  hint: 'foo',
  label: 'bar',
  name: 'baz',
  errors: {
    count: () => { return 0 }
  }
}

test('File Upload:', (nest) => {
  nest.test('...is a valid component', (t) => {
    const component = shallowRenderComponent(Input, props)
    t.ok(React.isValidElement(component), 'component is valid')
    t.end()
  })

  nest.test('...has children', (t) => {
    const component = shallowRenderComponent(Input, props)
    t.equal(component.props.children.length, 2)
    t.end()
  })
})
