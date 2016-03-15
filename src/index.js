import composeForm from 'formalist-compose'
import formComponents from './components'
import { displayVariants } from './components/fields'
export const components = formComponents
export const fieldDisplayVariants = displayVariants

/**
 * Template
 * @param  {Object} customComponents Any custom (including override) components
 * for this template
 * @param  {Object} options Configuration options
 * @return {Function} A form compose with a set of standard React component
 * (potentially augmented by the `options`)
 */
export default function template (customComponents = {}, options = {}) {
  return composeForm(formComponents(customComponents, options))
}
