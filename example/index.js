import React from 'react'
import ReactDOM from 'react-dom'
import template from '../lib'
import ast from './ast'

let configuredTemplate = template()
let form = configuredTemplate(ast)

let target = document.body.querySelector('.js-app')
ReactDOM.render(<div>{ form.render() }</div>, target)
