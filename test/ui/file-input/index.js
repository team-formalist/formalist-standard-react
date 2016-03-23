import test from 'tape'
import React from 'react'
import shallowRenderComponent from '../../fixtures/shallow-render.js'

// local module
import Input from '../../../src/components/ui/file-input'

const props = {
  className: 'foo',
  name: 'baz',
  onChange: () => {}
}

test('File Input:', (nest) => {
  nest.test('...is a valid component', (t) => {
    const component = shallowRenderComponent(Input, props)
    t.ok(React.isValidElement(component), 'component is valid')
    t.end()
  })

  nest.test('...has props', (t) => {
    const component = shallowRenderComponent(Input, props)
    const renderedProps = component.props.children.props
    t.equal(renderedProps.name, props.name)
    t.equal(renderedProps.className, props.className)
    t.equal(typeof (renderedProps.onChange), 'function')
    t.end()
  })

  nest.test('...has props', (t) => {
    let newProps = Object.assign({}, props)
    newProps.onChange = () => {
      t.ok(true, 'Function was called')
      t.end()
    }

    const component = shallowRenderComponent(Input, newProps)
    const renderedProps = component.props.children.props
    renderedProps.onChange()
  })
})
