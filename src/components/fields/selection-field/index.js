import PropTypes from "prop-types";
import React from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import classNames from "classnames";
import fuzzy from "fuzzy";
import extractComponent from "../../../utils/extract-component";

// Import components
import FieldErrors from "../common/errors";
import FieldHeader from "../common/header";
import Popout from "../../ui/popout";

// Import styles
import * as styles from "./styles";

/**
 * Default component for representing a "selected/selection" item
 * @param  {Object} props Taking the shape of:
 *
 * {
 *   option: { label: 'foo'}
 *  }
 *
 * I.e., expecting the option to have a `label` key with a string value.
 *
 * @return {ReactElement}
 */
const SelectDefault = ({ option }) => <div>{option.label}</div>;

SelectDefault.propTypes = {
  option: PropTypes.shape({
    label: PropTypes.string
  })
};

/**
 * Selection field
 *
 * Handles a singular select of a set of pre-supplied options.
 *
 */
class SelectionField extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    name: PropTypes.string,
    config: PropTypes.object,
    attributes: PropTypes.shape({
      label: PropTypes.string,
      hint: PropTypes.string,
      placeholder: PropTypes.string,
      options: PropTypes.array,
      inline: PropTypes.bool,
      selector_label: PropTypes.string,
      render_option_as: PropTypes.string,
      render_selection_as: PropTypes.string
    }),
    hint: PropTypes.string,
    label: PropTypes.string,
    errors: ImmutablePropTypes.list,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };

  /**
   * Enable parent to pass context
   */

  static contextTypes = {
    globalConfig: PropTypes.object
  };

  /**
   * Default state, blank search
   * @return {Object}
   */
  state = {
    search: null,
    searchFocus: false
  };

  /**
   * onChange handler
   *
   * @param  {Event} e Change event from a form input/select
   */
  onChange = value => {
    this.props.actions.edit(val => {
      return value;
    });
  };

  /**
   * On choose click, open selector
   * @return {Null}
   */
  onChooseClick = e => {
    e.preventDefault();
    this.toggleSelector();
  };

  /**
   * When selected item is removed
   * @return {Null}
   */
  onRemoveClick = e => {
    e.preventDefault();
    this.onChange(null);
  };

  /**
   * When a selection is made, trigger change and close the selector
   * @return {Null}
   */
  onSelection = id => {
    this.closeSelector();
    this.onChange(id);
  };

  /**
   * Open the selector popout
   * @return {Null}
   */
  openSelector = () => {
    this._selector.openPopout();
  };

  /**
   * Close the selector popout
   * @return {Null}
   */
  closeSelector = () => {
    this._selector.closePopout();
  };

  /**
   * On popout close, reset the search
   * @return {Null}
   */
  onPopoutClose = () => {
    this.setState({
      search: null
    });
  };

  /**
   * Toggle the selector popout
   * @return {Null}
   */
  toggleSelector = () => {
    this._selector.togglePopout();
  };

  /**
   * On popout open, focus the search input
   * @return {Null}
   */
  onPopoutOpen = () => {
    this._search.focus();
  };

  /**
   * Fired when search input is `change`d.
   * Set this.state.search to the value of the input
   * @param  {Event} e Keyboard event
   * @return {Null}
   */
  onSearchChange = e => {
    const search = e.target.value;
    this.setState({
      search: search
    });
  };

  /**
   * On search input focus
   * @param  {Event} e Keyboard event
   * @return {Null}
   */
  onSearchFocus = e => {
    this.setState({
      searchFocus: true
    });
  };

  /**
   * On search input blur
   * @param  {Event} e Keyboard event
   * @return {Null}
   */
  onSearchBlur = e => {
    this.setState({
      searchFocus: false
    });
  };

  render() {
    const { attributes, config, errors, hint, label, name, value } = this.props;
    const { search, searchFocus } = this.state;
    const {
      options,
      placeholder,
      selector_label,
      render_option_as,
      render_selection_as
    } = attributes;
    const hasErrors = errors.count() > 0;

    // Set up field classes
    const fieldClassNames = classNames(styles.base, {
      [`${styles.baseInline}`]: attributes.inline
    });

    // Determine the selection/selected display components
    let Option = SelectDefault;
    let Selection = SelectDefault;

    // Extract them from the passed `config.components` if it exists
    if (config.components) {
      if (render_option_as) {
        Option =
          extractComponent(config.components, render_option_as) || Option;
      }
      if (render_selection_as) {
        Selection =
          extractComponent(config.components, render_selection_as) || Selection;
      }
    }

    // Determine selection
    const selection = options.find(option => option.id === value);

    // Filter options
    let filteredOptions = options;
    if (search) {
      filteredOptions = options.filter(option => {
        const values = Object.keys(option).map(key => String(option[key]));
        const results = fuzzy.filter(search, values);
        return results && results.length > 0;
      });
    }

    // Build the set of options
    const renderedOptions = filteredOptions.map(option => {
      // TODO Asses whether to remove this binding
      /* eslint-disable react/jsx-no-bind */
      let onClick = function(e) {
        e.preventDefault();
        this.onSelection(option.id);
      }.bind(this);
      /* eslint-enable react/jsx-no-bind */
      return (
        <button
          key={option.id}
          className={styles.optionButton}
          onClick={onClick}
        >
          <Option option={option} />
        </button>
      );
    });

    return (
      <div
        className={fieldClassNames}
        data-field-name={name}
        data-field-type="selection-field"
      >
        <div className={styles.header}>
          <FieldHeader id={name} label={label} hint={hint} error={hasErrors} />
        </div>
        <div className={styles.display}>
          {selection ? (
            <div className={styles.wrapper}>
              <div className={styles.selection}>
                <Selection option={selection} />
              </div>
              <button className={styles.remove} onClick={this.onRemoveClick}>
                <span className={styles.removeText}>Remove</span>
                <div className={styles.removeX}>×</div>
              </button>
            </div>
          ) : (
            <button data-open-selector-button className={styles.wrapper} onClick={this.onChooseClick}>
              <div className={styles.selectionPlaceholder}>
                {placeholder || "Make a selection"}
              </div>
              <Popout
                ref={r => {
                  this._selector = r;
                }}
                placement="left"
                onClose={this.onPopoutClose}
                onOpen={this.onPopoutOpen}
                closeOnEsc={!searchFocus || !search}
                closeOnOutsideClick
                testId={`selection-field:${name}`}
              >
                <div className={styles.openSelectorButton}>
                  {selector_label || "Select"}
                </div>
                <div className={styles.options}>
                  <input
                    ref={r => {
                      this._search = r;
                    }}
                    type="search"
                    className={styles.search}
                    placeholder="Type to filter"
                    onBlur={this.onSearchBlur}
                    onFocus={this.onSearchFocus}
                    onChange={this.onSearchChange}
                  />
                  <div className={styles.optionsList}>
                    {renderedOptions.length > 0 ? (
                      renderedOptions
                    ) : (
                      <p className={styles.noResults}>No matching results</p>
                    )}
                  </div>
                </div>
              </Popout>
            </button>
          )}
        </div>
        {hasErrors ? <FieldErrors errors={errors} /> : null}
      </div>
    );
  }
}

export default SelectionField;
