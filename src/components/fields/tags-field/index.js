import React, {Component} from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classNames from 'classnames'
import keyCodes from '../../../utils/key-codes'

// Import components
import FieldErrors from '../common/errors'
import FieldHeader from '../common/header'
import Popunder from '../../ui/popunder'
import Spinner from '../../ui/spinner'
import SearchList from './search-list'

// Import styles
import styles from './tags-field.mcss'

/**
 * Tags field
 */
class TagsField extends Component {

  constructor (props) {
    super(props)

    const {attributes} = props
    const {search_url, search_threshold} = attributes

    // Initial state
    this.state = {
      inputFocus: false,
      inputQuery: '',
      tagsLoading: false,
      canSearch: (search_url != null),
      searchThreshold: search_threshold || 1,
    }

    // Bindings
    this.onChange = this.onChange.bind(this)
    this.onInputBlur = this.onInputBlur.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.onInputFocus = this.onInputFocus.bind(this)
    this.onInputKeyDown = this.onInputKeyDown.bind(this)
  }

  /**
   * onChange handler
   *
   * @param  {Event} e Change event from a form input/select
   */
  onChange (value) {
    this.props.actions.edit(
      (val) => {
        return value
      }
    )
  }

  /**
   * On selector focus
   * @param  {Event} e Keyboard event
   * @return {Null}
   */
  onInputFocus (e) {
    const {canSearch, inputQuery, searchThreshold} = this.state
    this.setState({
      inputFocus: true,
    })
    if (canSearch && inputQuery.length >= searchThreshold) {
      this._popunder.openPopunder()
    }
  }

  /**
   * On selector blur
   * @param  {Event} e Keyboard event
   * @return {Null}
   */
  onInputBlur (e) {
    this.setState({
      inputFocus: false,
      tagsLoading: false,
    })
  }

  /**
   * Handle change event for inputs
   * @param  {Event} e Change event
   */
  onInputChange (e) {
    const {canSearch, searchThreshold} = this.state
    const inputQuery = e.target.value
    this.setState({
      inputQuery,
    })
    if (canSearch && inputQuery.length >= searchThreshold) {
      this._popunder.openPopunder()
    } else {
      if (canSearch) {
        this._popunder.closePopunder()
      }
      this.setState({
        inputQuery: '',
        tagsLoading: false,
      })
    }
  }

  /**
   * Handle change event for inputs
   * @param  {Event} e Change event
   */
  onInputKeyDown (e) {
    switch (e.keyCode) {
      case keyCodes.ENTER:
        e.preventDefault()
        const added = this.addTag(e.target.value)
        if (added) {
          this.clearInput()
        }
        break
      case keyCodes.BACKSPACE:
        if (e.target.value === '') {
          e.preventDefault()
          // Remove the last tag
          this.removeTag(-1)
        }
        break
    }
  }

  /**
   * Empty the input field
   */
  clearInput () {
    this._input.value = ''
    this.setState({
      inputQuery: '',
      tagsLoading: false,
    })
  }

  /**
   * Remove a tag from the value based on index
   */
  removeTag (index) {
    const {value} = this.props
    this.onChange(value.delete(index))
  }

  /**
   * Add tag to end of list
   */
  addTag (tag) {
    const {value} = this.props
    const valid = tag && tag !== '' && !value.includes(tag)
    if (valid) {
      this.onChange(value.push(tag))
      return true
    }
    return false
  }

  /**
   * Render existing tags
   * @return {ReactElement}
   */
  renderTagsList () {
    const {value} = this.props
    return (
      value.map((tag, i) => {
        const key = `${tag}-${i}`
        const onClick = (e) => {
          e.preventDefault()
          // Remove only if the span is clicked on
          if (e.target.nodeName === 'SPAN') {
            this.removeTag(i)
          }
        }
        const onKeyDown = (e) => {
          if (e.keyCode === keyCodes.DELETE || e.keyCode === keyCodes.BACKSPACE) {
            this.removeTag(i)
          }
        }

        return (
          <button
            key={key}
            className={styles.tag}
            onClick={onClick}
            onKeyDown={onKeyDown}
          >
            {tag}
            <span className={styles.removeButton}>×</span>
          </button>
        )
      })
    )
  }

  render () {
    const {attributes, errors, hint, label, name} = this.props
    let {placeholder, search_url, search_params} = attributes
    const {canSearch, inputFocus, inputQuery, searchThreshold, tagsLoading} = this.state
    const hasErrors = (errors.count() > 0)

    placeholder = placeholder || 'Enter a tag'

    // Set up field classes
    const fieldClassNames = classNames(
      styles.base,
      {
        [`${styles.baseInline}`]: attributes.inline,
      }
    )

    const displayClassNames = classNames(
      styles.display,
      {
        [`${styles.displayFocus}`]: inputFocus,
      }
    )

    const popunderContainerClassName = classNames(
      styles.popunderContainer,
      {
        [`${styles.popunderContainerHidden}`]: tagsLoading,
      }
    )

    // TODO Asses whether to remove this binding
    /* eslint-disable react/jsx-no-bind */
    return (
      <div className={fieldClassNames}>
        <div className={styles.header}>
          <FieldHeader id={name} label={label} hint={hint} error={hasErrors} />
        </div>
        <div className={displayClassNames}>
          <div className={styles.tagList}>
            {this.renderTagsList()}
            {(canSearch)
              ? <Popunder
                ref={(r) => { this._popunder = r }}
                onClose={this.onPopunderClose}
                onOpen={this.onPopunderOpen}
                className={styles.popunderWrapper}
                closeOnEsc
                closeOnOutsideClick
                containerClassName={popunderContainerClassName}
              >
                <div className={styles.tagInputWrapper}>
                  <input
                    ref={(r) => { this._input = r }}
                    className={styles.tagInput}
                    onChange={this.onInputChange}
                    onKeyDown={this.onInputKeyDown}
                    onBlur={this.onInputBlur}
                    onFocus={this.onInputFocus}
                    placeholder={placeholder}
                  />
                  {
                    (tagsLoading) ? <Spinner className={styles.spinner} /> : null
                  }
                </div>
                <SearchList
                  query={inputQuery}
                  url={search_url}
                  params={search_params}
                  threshold={searchThreshold}
                  onSearchStart={() => this.setState({tagsLoading: true})}
                  onSearchEnd={() => this.setState({tagsLoading: false})}
                  onSelect={(selection) => {
                    const added = this.addTag(selection.value)
                    if (added) {
                      this.clearInput()
                      this._input.focus()
                      this._popunder.closePopunder()
                    }
                  }}
                />
              </Popunder>
              : <div className={styles.tagInputWrapperNoSearch}>
                <input
                  ref={(r) => { this._input = r }}
                  className={styles.tagInput}
                  onChange={this.onInputChange}
                  onKeyDown={this.onInputKeyDown}
                  onBlur={this.onInputBlur}
                  onFocus={this.onInputFocus}
                  placeholder={placeholder}
                />
              </div>
            }
          </div>
          {(hasErrors) ? <FieldErrors errors={errors} /> : null}
        </div>
      </div>
    )
    /* eslint-enable react/jsx-no-bind */
  }
}

/**
 * Enable parent to pass context
 */
TagsField.contextTypes = {
  globalConfig: React.PropTypes.object,
}

/**
 * PropTypes
 * @type {Object}
 */
TagsField.propTypes = {
  actions: React.PropTypes.object,
  name: React.PropTypes.string,
  config: React.PropTypes.object,
  attributes: React.PropTypes.shape({
    label: React.PropTypes.string,
    hint: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    inline: React.PropTypes.bool,
    search_url: React.PropTypes.string,
    search_params: React.PropTypes.object,
    search_threshold: React.PropTypes.number,
  }),
  hint: React.PropTypes.string,
  label: React.PropTypes.string,
  errors: ImmutablePropTypes.list,
  value: ImmutablePropTypes.list,
}

export default TagsField
