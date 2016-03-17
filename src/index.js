import composeForm from 'formalist-compose'
import formComponents from './components'
import { displayVariants } from './components/fields'
export const components = formComponents
export const fieldDisplayVariants = displayVariants

/**
 * Template
 * @param  {Object} customComponents Any custom (including override) components
 * for this template
 * @param  {Object} config Configuration config
 * @return {Function} A form compose with a set of standard React component
 * (potentially augmented by the `config`)
 */
export default function template (customComponents = {}, config = {}) {
  return composeForm(formComponents(customComponents, config))
}
