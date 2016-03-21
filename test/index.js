import test from 'tape'
import { mount } from 'enzyme'
import React from 'react'
import isFunction from '@f/is-function'

/* fixtures */
import './fixtures/ignore-styles'
import './fixtures/dom'
import data from './fixtures/data'

import standardFormTemplate from '../src'

test('it should export a standard form template', (nest) => {
  nest.test('... returning a callable function', (assert) => {
    assert.ok(isFunction(standardFormTemplate), 'compose form is a function')
    assert.end()
  })
})

test('it should create a standard form instance', (nest) => {
  let form = standardFormTemplate()(data)
  let wrapper = mount(<article>{form.render()}</article>)

  nest.test('... with different display types for inputs', (assert) => {
    const el = wrapper.find('input').at(0).node
    const actual = el.getAttribute('id')
    const expected = 'text_field'
    assert.equal(expected, actual)
    assert.end()
  })

  nest.test('... that updates data', (assert) => {
    let expected = 'Data has changed'
    let input = wrapper.find('input').at(0)
    wrapper.find('input').get(0).value = expected

    form.store.subscribe(() => {
      let actual = form.store.getState().getIn([0, 1, 2])
      assert.equals(expected, actual)
      assert.end()
    })

    // Trigger the change
    input.simulate('change')
  })
})
