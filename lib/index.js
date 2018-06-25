import composeForm, { createFormConfig } from "formalist-compose";
import formComponents from "./components";
export var components = formComponents;

/**
 * Template
 * @param  {Object} customComponents Any custom (including override) components
 * for this template
 * @param  {Object} config Configuration config
 * @return {Function} A form compose with a set of standard React component
 * (potentially augmented by the `config`)
 */
export default function template() {
  var customComponents = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var formConfig = createFormConfig(formComponents(customComponents, config));
  return composeForm(formConfig);
}