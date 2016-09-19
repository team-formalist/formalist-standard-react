import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'

export default function shallowRenderComponent (Component, props) {
  const renderer = ReactTestUtils.createRenderer()
  renderer.render(<Component {...props} />)
  return renderer.getRenderOutput()
}
