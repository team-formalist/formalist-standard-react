import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classNames from 'classnames'

// Import components
import FieldErrors from '../common/errors'
import FieldHeader from '../common/header'
import Select from '../../ui/select'

// Import styles
import styles from './select-box.mcss'

/**
 * Select Box field
 */
const SelectBox = React.createClass({

  propTypes: {
    actions: React.PropTypes.object,
    name: React.PropTypes.string,
    config: React.PropTypes.object,
    attributes: React.PropTypes.shape({
      label: React.PropTypes.string,
      hint: React.PropTypes.string,
      placeholder: React.PropTypes.string,
      options: React.PropTypes.array.isRequired,
      inline: React.PropTypes.bool
    }),
    hint: React.PropTypes.string,
    label: React.PropTypes.string,
    errors: ImmutablePropTypes.list,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ])
  },

  /**
   * Enable parent to pass context
   */

  contextTypes: {
    globalConfig: React.PropTypes.object
  },

  /**
   * onChange handler
   *
   * @param  {Event} e Change event from a form input/select
   */
  onChange (e) {
    let value = e.target.value
    this.props.actions.edit(
      (val) => { return value }
    )
  },

  render () {
    let { attributes, errors, hint, label, name, value } = this.props
    let hasErrors = (errors.count() > 0)

    // Set up field classes
    let fieldClassNames = classNames(
      styles.base,
      {
        [`${styles.baseInline}`]: attributes.inline
      }
    )

    // Extract options
    let options = attributes.options
    // Return nothing if we have no values
    if (options && options.length === 0) {
      return false
    }

    return (
      <div className={fieldClassNames}>
        <div className={styles.header}>
          <FieldHeader id={name} label={label} hint={hint} error={hasErrors} />
        </div>
        <div className={styles.display}>
          <Select
            id={name}
            defaultValue={(value != null && value.toString) ? value.toString() : value}
            placeholder={attributes.placeholder}
            error={hasErrors}
            onChange={this.onChange}>
              {options.map((option, i) => {
                let value, label
                if (Array.isArray(option)) {
                  value = option[0]
                  label = option[1] || value
                } else {
                  value = option
                  label = option
                }
                return (
                  <option key={i} value={value}>{label}</option>
                )
              })}
          </Select>
          {(hasErrors) ? <FieldErrors errors={errors} /> : null}
        </div>
      </div>
    )
  }
})

export default SelectBox
