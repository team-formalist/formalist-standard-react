import React from 'react'
import classNames from 'classnames'
import optionClassNames from '../../../utils/option-class-names'

// Components
import Checkbox from '../../ui/checkbox'

/**
 * Default display class for `bool` type fields. Shows the field as a checkbox
 * followed by "Truthy question <label>"
 */
const BoolDisplayDefault = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.bool,
    config: React.PropTypes.object,
    onChange: React.PropTypes.func
  },

  render () {
    let { config, error, onChange, label, name, value } = this.props

    let boolFieldClassNames = classNames(
      'fm-field-bool',
      'fm-checkbox',
      optionClassNames('fm-field-bool', config.display_options)
    )

    let checkboxLabel = config.question_text || label

    return (
      <div className={boolFieldClassNames}>
        <Checkbox
          name={name}
          label={checkboxLabel}
          error={error}
          value={value}
          defaultChecked={value}
          onChange={onChange} />
      </div>
    )
  }
})

export default BoolDisplayDefault
