import composeForm, { createFormConfig } from "formalist-compose";
import formComponents from "./components";
export const components = formComponents;

/**
 * Template
 * @param  {Object} customComponents Any custom (including override) components
 * for this template
 * @param  {Object} config Configuration config
 * @return {Function} A form compose with a set of standard React component
 * (potentially augmented by the `config`)
 */
export default function template(customComponents = {}, config = {}) {
  const formConfig = createFormConfig(formComponents(customComponents, config));
  return composeForm(formConfig);
}
