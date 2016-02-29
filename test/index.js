import test from 'tape'
import { mount } from 'enzyme'
import React from 'react'
import isFunction from '@f/is-function'

/* fixtures */
import './fixtures/ignore-styles'
import './fixtures/dom'
import dataSimple from './fixtures/data-simple'

import standardFormTemplate from '../src'

test('it should export a standard form template', (nest) => {
  nest.test('... returning a callable function', (assert) => {
    assert.ok(isFunction(standardFormTemplate), 'compose form is a function')
    assert.end()
  })
})

test('it should create a standard form instance', (nest) => {
  let form = standardFormTemplate()(dataSimple)
  let wrapper = mount(<article>{form.render()}</article>)

  nest.test('... with different display types for inputs', (assert) => {
    const el = wrapper.find('input').at(0).node
    const actual = el.getAttribute('id')
    const expected = 'string_default'
    assert.equal(expected, actual)
    assert.end()
  })

  nest.test('... that updates data', (assert) => {
    let expected = 'Data has changed'
    let input = wrapper.find('input').at(0)
    wrapper.find('input').get(0).value = expected

    form.store.subscribe(() => {
      let actual = form.store.getState().getIn([0, 1, 3])
      assert.equals(expected, actual)
      assert.end()
    })

    // Trigger the change
    input.simulate('change')
    console.log(wrapper.node.innerHTML)
  })
})
