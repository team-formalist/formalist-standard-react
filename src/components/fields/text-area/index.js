import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classNames from 'classnames'

// Import components
import FieldErrors from '../common/errors'
import FieldHeader from '../common/header'
import TextBox from '../../ui/text-box'

// Import styles
import styles from './text-area.mcss'

/**
 * Text Area field
 */
class TextArea extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    name: React.PropTypes.string,
    config: React.PropTypes.object,
    attributes: React.PropTypes.shape({
      label: React.PropTypes.string,
      hint: React.PropTypes.string,
      placeholder: React.PropTypes.string,
      inline: React.PropTypes.bool,
      code: React.PropTypes.bool,
      box_size: React.PropTypes.oneOf(['single', 'small', 'normal', 'large', 'xlarge']),
      text_size: React.PropTypes.oneOf(['xsmall', 'small', 'normal', 'large', 'xlarge']),
    }),
    hint: React.PropTypes.string,
    label: React.PropTypes.string,
    errors: ImmutablePropTypes.list,
    value: React.PropTypes.string,
  };

  /**
   * Enable parent to pass context
   */

  static contextTypes = {
    globalConfig: React.PropTypes.object,
  };

  /**
   * onChange handler
   *
   * @param  {Event} e Change event from a form input/select
   */
  onChange = (e) => {
    let value = e.target.value
    this.props.actions.edit(
      (val) => { return value }
    )
  };

  render () {
    let { attributes, errors, hint, label, name, value } = this.props
    let hasErrors = (errors.count() > 0)

    // Set up field classes
    let fieldClassNames = classNames(
      styles.base,
      {
        [`${styles.baseInline}`]: attributes.inline,
      }
    )

    // Set up input classes
    let inputClassNames = classNames({
      [`${styles.code}`]: attributes.code,
    })

    return (
      <div className={fieldClassNames}>
        <div className={styles.header}>
          <FieldHeader id={name} label={label} hint={hint} error={hasErrors} />
        </div>
        <div className={styles.display}>
          <TextBox
            id={name}
            error={hasErrors}
            className={inputClassNames}
            placeholder={attributes.placeholder}
            defaultValue={value}
            onChange={this.onChange}
            boxSize={attributes.box_size}
            textSize={attributes.text_size} />
          {(hasErrors) ? <FieldErrors errors={errors} /> : null}
        </div>
      </div>
    )
  }
}

export default TextArea
