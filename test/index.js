import test from 'tape'
import { mount } from 'enzyme'
import React from 'react'
import jsdom from 'jsdom'

// A super simple DOM ready for React to render into
// Store this DOM and the window in global scope ready for React to access
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView
global.navigator = {userAgent: 'node.js'}

// import { actionTypes } from 'formalist-compose'
import dataSimple from './fixtures/data-simple'
import standardFormTemplate from '../src'

const isFunction = function (obj) {
  return typeof obj === 'function'
}

test('it should export a standard form template', (nest) => {
  nest.test('... returning a callable function', (assert) => {
    assert.ok(isFunction(standardFormTemplate), 'compose form is a function')
    assert.end()
  })
})

test('it should create a standard form instance', (nest) => {
  let form = standardFormTemplate(dataSimple)
  let wrapper = mount(<div>{form.render()}</div>)

  // nest.test('... with different display types for inputs', (assert) => {

  // })

  nest.test('... that updates data', (assert) => {
    assert.plan(1)

    let expectedValue = 'Data has changed'
    let input = wrapper.find('input').at(0)
    wrapper.find('input').get(0).value = expectedValue

    form.store.subscribe(() => {
      let updatedValue = form.store.getState().getIn([0, 1, 2])
      assert.equals(updatedValue, expectedValue)
      assert.end()
    })

    // Trigger the change
    input.simulate('change')
  })
})
