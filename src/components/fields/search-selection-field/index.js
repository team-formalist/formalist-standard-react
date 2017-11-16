import PropTypes from "prop-types";
import React, { Component } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import classNames from "classnames";
import extractComponent from "../../../utils/extract-component";

// Import components
import FieldErrors from "../common/errors";
import FieldHeader from "../common/header";
import Popout from "../../ui/popout";
import SearchSelector, {
  searchMethod as search
} from "../../ui/search-selector";

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
 * Search Selection field
 *
 * Handles the singular select of a
 *
 */
class SearchSelectionField extends Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      selectorFocus: false,
      selectorQuery: null
    };

    // Bindings
    this.onChange = this.onChange.bind(this);
    this.onChooseClick = this.onChooseClick.bind(this);
    this.onRemoveClick = this.onRemoveClick.bind(this);
    this.onSelection = this.onSelection.bind(this);
    this.openSelector = this.openSelector.bind(this);
    this.closeSelector = this.closeSelector.bind(this);
    this.toggleSelector = this.toggleSelector.bind(this);
    this.onPopoutOpen = this.onPopoutOpen.bind(this);
    this.onSelectorBlur = this.onSelectorBlur.bind(this);
    this.onSelectorFocus = this.onSelectorFocus.bind(this);
    this.onSelectorQueryChange = this.onSelectorQueryChange.bind(this);
  }

  /**
   * componentWillMount
   * Do an XHR request for the additional selection data
   * @return {Null}
   */
  componentWillMount() {
    // Do an XHR request for the additional selection data
    const { attributes, value } = this.props;
    if (value) {
      const { search_url } = attributes;
      const req = search(search_url, {
        "ids[]": [value]
      });
      req.response.then(rsp => {
        if (rsp.results && rsp.results.length > 0) {
          const selection = rsp.results[0];
          this.setState({
            selection
          });
        }
      });
    }
  }

  /**
   * onChange handler
   *
   * @param  {Event} e Change event from a form input/select
   */
  onChange(value, selection) {
    this.props.actions.edit(val => {
      return value;
    });
    this.setState({
      selection
    });
  }

  /**
   * On choose click, open selector
   * @return {Null}
   */
  onChooseClick(e) {
    e.preventDefault();
    this.toggleSelector();
  }

  /**
   * When selected item is removed
   * @return {Null}
   */
  onRemoveClick(e) {
    e.preventDefault();
    this.onChange(null, null);
  }

  /**
   * When a selection is made, trigger change and close the selector
   * @return {Null}
   */
  onSelection(id, selection) {
    this.closeSelector();
    this.onChange(id, selection);
  }

  /**
   * Open the selector popout
   * @return {Null}
   */
  openSelector() {
    this._popout.openPopout();
  }

  /**
   * Close the selector popout
   * @return {Null}
   */
  closeSelector() {
    this._popout.closePopout();
  }

  /**
   * Toggle the selector popout
   * @return {Null}
   */
  toggleSelector() {
    this._popout.togglePopout();
  }

  /**
   * On popout open, focus the search input
   * @return {Null}
   */
  onPopoutOpen() {
    this._selector.focusSearch();
  }

  /**
   * On selector focus
   * @param  {Event} e Keyboard event
   * @return {Null}
   */
  onSelectorFocus(e) {
    this.setState({
      selectorFocus: true
    });
  }

  /**
   * On selector blur
   * @param  {Event} e Keyboard event
   * @return {Null}
   */
  onSelectorBlur(e) {
    this.setState({
      selectorFocus: false
    });
  }

  onSelectorQueryChange(selectorQuery) {
    this.setState({
      selectorQuery
    });
  }

  render() {
    const { attributes, config, errors, hint, label, name } = this.props;
    const {
      placeholder,
      selector_label,
      render_option_as,
      render_selection_as
    } = attributes;
    const { selection, selectorFocus, selectorQuery } = this.state;
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

    return (
      <div
        className={fieldClassNames}
        data-field-name={name}
        data-field-type="search-selection-field"
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
            <button
              data-open-selector-button
              className={styles.wrapper}
              onClick={this.onChooseClick}
            >
              <div className={styles.selectionPlaceholder}>
                {placeholder || "Make a selection"}
              </div>
              <Popout
                ref={r => {
                  this._popout = r;
                }}
                placement="left"
                onOpen={this.onPopoutOpen}
                closeOnEsc={!selectorFocus || !selectorQuery}
                closeOnOutsideClick
                testId={`search-selection-field:${name}`}
              >
                <div className={styles.openSelectorButton}>
                  {selector_label || "Select"}
                </div>
                <SearchSelector
                  ref={r => {
                    this._selector = r;
                  }}
                  onSelection={this.onSelection}
                  onBlur={this.onSelectorBlur}
                  onFocus={this.onSelectorFocus}
                  onQueryChange={this.onSelectorQueryChange}
                  optionComponent={Option}
                  params={attributes.search_params}
                  perPage={attributes.search_per_page}
                  query={selectorQuery}
                  threshold={attributes.search_threshold}
                  url={attributes.search_url}
                />
              </Popout>
            </button>
          )}
          {hasErrors ? <FieldErrors errors={errors} /> : null}
        </div>
      </div>
    );
  }
}

/**
 * Enable parent to pass context
 */
SearchSelectionField.contextTypes = {
  globalConfig: PropTypes.object
};

/**
 * PropTypes
 * @type {Object}
 */
SearchSelectionField.propTypes = {
  actions: PropTypes.object,
  name: PropTypes.string,
  config: PropTypes.object,
  attributes: PropTypes.shape({
    label: PropTypes.string,
    hint: PropTypes.string,
    placeholder: PropTypes.string,
    inline: PropTypes.bool,
    search_url: PropTypes.string,
    search_per_page: PropTypes.number,
    search_params: PropTypes.object,
    search_threshold: PropTypes.number,
    selector_label: PropTypes.string,
    selection: PropTypes.object,
    render_option_as: PropTypes.string,
    render_selection_as: PropTypes.string
  }),
  hint: PropTypes.string,
  label: PropTypes.string,
  errors: ImmutablePropTypes.list,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default SearchSelectionField;
