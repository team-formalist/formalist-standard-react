var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsxFileName = "src/components/fields/search-multi-selection-field/index.js",
    _this = this;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from "prop-types";
import React, { Component } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import classNames from "classnames";
import { List } from "immutable";
import extractComponent from "../../../utils/extract-component";

// Import components
import FieldErrors from "../common/errors";
import FieldHeader from "../common/header";
import Sortable from "../../ui/sortable";
import Popout from "../../ui/popout";
import SearchSelector, { searchMethod as search } from "../../ui/search-selector";

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
var SelectDefault = function SelectDefault(_ref) {
  var option = _ref.option;
  return React.createElement(
    "div",
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 32
      },
      __self: _this
    },
    option.label
  );
};

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

var SearchMultiSelectionField = function (_Component) {
  _inherits(SearchMultiSelectionField, _Component);

  function SearchMultiSelectionField(props) {
    _classCallCheck(this, SearchMultiSelectionField);

    // Extract existing selection from attributes
    var _this2 = _possibleConstructorReturn(this, (SearchMultiSelectionField.__proto__ || Object.getPrototypeOf(SearchMultiSelectionField)).call(this, props));

    var value = props.value;

    // Keep value as a cached property

    _this2.cachedSelections = List();
    _this2.cachedValue = value;

    // Initial state
    _this2.state = {
      selections: _this2.cachedSelections,
      selectorFocus: false,
      selectorQuery: null
    };

    // Bindings
    _this2.onChange = _this2.onChange.bind(_this2);
    _this2.onChooseClick = _this2.onChooseClick.bind(_this2);
    _this2.onSelection = _this2.onSelection.bind(_this2);
    _this2.onRemove = _this2.onRemove.bind(_this2);
    _this2.onDrop = _this2.onDrop.bind(_this2);
    _this2.openSelector = _this2.openSelector.bind(_this2);
    _this2.closeSelector = _this2.closeSelector.bind(_this2);
    _this2.toggleSelector = _this2.toggleSelector.bind(_this2);
    _this2.onPopoutOpen = _this2.onPopoutOpen.bind(_this2);
    _this2.onSelectorBlur = _this2.onSelectorBlur.bind(_this2);
    _this2.onSelectorFocus = _this2.onSelectorFocus.bind(_this2);
    _this2.onSelectorQueryChange = _this2.onSelectorQueryChange.bind(_this2);
    _this2.fetchSelectionsData = _this2.fetchSelectionsData.bind(_this2);
    return _this2;
  }

  _createClass(SearchMultiSelectionField, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.cachedValue = nextProps.value;
    }

    /**
     * componentWillMount
     * Do an XHR request for the additional selections data
     * @return {Null}
     */

  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      this.fetchSelectionsData();
    }

    /**
     * fetchSelectionsData
     * Do an XHR request for the additional selections data
     * @return {Null}
     */

  }, {
    key: "fetchSelectionsData",
    value: function fetchSelectionsData() {
      var _this3 = this;

      var _props = this.props,
          attributes = _props.attributes,
          value = _props.value;

      if (value && value.count() > 0) {
        var search_url = attributes.search_url;

        var req = search(search_url, {
          "ids[]": value.toJS()
        });
        req.response.then(function (rsp) {
          if (rsp.results && rsp.results.length > 0) {
            var selections = List(rsp.results);
            // Keep as a property so can always know the "true" set
            // and convert to a list
            _this3.cachedSelections = selections;
            _this3.setState({
              selections: selections
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

  }, {
    key: "onChange",
    value: function onChange(value, selections) {
      this.cachedValue = value;
      this.cachedSelections = selections;
      this.props.actions.edit(function (val) {
        return value;
      });
      this.setState({
        selections: selections
      });
    }

    /**
     * On choose click, open selector
     * @return {Null}
     */

  }, {
    key: "onChooseClick",
    value: function onChooseClick(e) {
      e.preventDefault();
      this.toggleSelector();
    }

    /**
     * When selected item is removed
     * @param {Number} index Index of the item to remove
     * @return {Null}
     */

  }, {
    key: "onRemove",
    value: function onRemove(index) {
      this.onChange(this.cachedValue.delete(index), this.cachedSelections.delete(index));
    }

    /**
     * When selected item is removed
     * @return {Null}
     */

  }, {
    key: "onDrop",
    value: function onDrop(newOrder) {
      var value = this.cachedValue.slice();
      var selections = this.cachedSelections.slice();
      var updatedValue = newOrder.map(function (index) {
        return value.get(index);
      });
      var updatedSelections = newOrder.map(function (index) {
        return selections.get(index);
      });
      this.onChange(List(updatedValue), List(updatedSelections));
    }

    /**
     * When a selection is made, trigger change and close the selector
     * @return {Null}
     */

  }, {
    key: "onSelection",
    value: function onSelection(id, selection) {
      var value = this.cachedValue;
      value = value || List();
      // Exists already? Remove it
      var index = value.indexOf(id);
      if (index > -1) {
        this.onRemove(index);
      } else {
        this.onChange(value.push(id), this.cachedSelections.push(selection));
      }
    }

    /**
     * Open the selector popout
     * @return {Null}
     */

  }, {
    key: "openSelector",
    value: function openSelector() {
      this._popout.openPopout();
    }

    /**
     * Close the selector popout
     * @return {Null}
     */

  }, {
    key: "closeSelector",
    value: function closeSelector() {
      this._popout.closePopout();
    }

    /**
     * Toggle the selector popout
     * @return {Null}
     */

  }, {
    key: "toggleSelector",
    value: function toggleSelector() {
      this._popout.togglePopout();
    }

    /**
     * On popout open, focus the search input
     * @return {Null}
     */

  }, {
    key: "onPopoutOpen",
    value: function onPopoutOpen() {
      this._selector.focusSearch();
    }

    /**
     * On selector focus
     * @param  {Event} e Keyboard event
     * @return {Null}
     */

  }, {
    key: "onSelectorFocus",
    value: function onSelectorFocus(e) {
      this.setState({
        selectorFocus: true
      });
    }

    /**
     * On selector blur
     * @param  {Event} e Keyboard event
     * @return {Null}
     */

  }, {
    key: "onSelectorBlur",
    value: function onSelectorBlur(e) {
      this.setState({
        selectorFocus: false
      });
    }
  }, {
    key: "onSelectorQueryChange",
    value: function onSelectorQueryChange(selectorQuery) {
      this.setState({
        selectorQuery: selectorQuery
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _props2 = this.props,
          attributes = _props2.attributes,
          config = _props2.config,
          errors = _props2.errors,
          hint = _props2.hint,
          label = _props2.label,
          name = _props2.name,
          value = _props2.value;
      var placeholder = attributes.placeholder,
          selector_label = attributes.selector_label,
          render_option_as = attributes.render_option_as,
          render_option_control_as = attributes.render_option_control_as,
          render_selection_as = attributes.render_selection_as;
      var _state = this.state,
          selections = _state.selections,
          selectorFocus = _state.selectorFocus,
          selectorQuery = _state.selectorQuery;

      var hasErrors = errors.count() > 0;

      // Set up field classes
      var fieldClassNames = classNames(styles.base, _defineProperty({}, "" + styles.baseInline, attributes.inline));

      // Determine the selection/selected display components
      var Option = SelectDefault;
      var OptionControl = null;
      var Selection = SelectDefault;

      // Extract them from the passed `config.components` if it exists
      if (config.components) {
        if (render_option_as) {
          Option = extractComponent(config.components, render_option_as) || Option;
        }
        if (render_option_control_as) {
          OptionControl = extractComponent(config.components, render_option_control_as) || OptionControl;
        }
        if (render_selection_as) {
          Selection = extractComponent(config.components, render_selection_as) || Selection;
        }
      }

      // Selections
      var numberOfSelections = selections.count();

      return React.createElement(
        "div",
        {
          className: fieldClassNames,
          "data-field-name": name,
          "data-field-type": "search-multi-selection-field",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 286
          },
          __self: this
        },
        React.createElement(
          "div",
          { className: styles.header, __source: {
              fileName: _jsxFileName,
              lineNumber: 291
            },
            __self: this
          },
          React.createElement(FieldHeader, { id: name, label: label, hint: hint, error: hasErrors, __source: {
              fileName: _jsxFileName,
              lineNumber: 292
            },
            __self: this
          })
        ),
        React.createElement(
          "div",
          { className: styles.display, __source: {
              fileName: _jsxFileName,
              lineNumber: 294
            },
            __self: this
          },
          React.createElement(
            "button",
            {
              "data-open-selector-button": true,
              className: styles.wrapper,
              onClick: this.onChooseClick,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 295
              },
              __self: this
            },
            React.createElement(
              "div",
              { className: styles.selectionPlaceholder, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 300
                },
                __self: this
              },
              placeholder || "Make a selection",
              numberOfSelections > 0 ? " (" + numberOfSelections + " selected)" : null
            ),
            React.createElement(
              Popout,
              {
                ref: function ref(r) {
                  _this4._popout = r;
                },
                placement: "left",
                onClose: this.onPopoutClose,
                onOpen: this.onPopoutOpen,
                closeOnEsc: !selectorFocus || !selectorQuery,
                closeOnOutsideClick: true,
                testId: "search-multi-selection-field:" + name,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 306
                },
                __self: this
              },
              React.createElement(
                "div",
                { className: styles.openSelectorButton, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 317
                  },
                  __self: this
                },
                selector_label || "Select"
              ),
              React.createElement(SearchSelector, {
                ref: function ref(r) {
                  _this4._selector = r;
                },
                onSelection: this.onSelection,
                onBlur: this.onSelectorBlur,
                onFocus: this.onSelectorFocus,
                onQueryChange: this.onSelectorQueryChange,
                optionComponent: Option,
                optionControlComponent: OptionControl,
                params: attributes.search_params,
                perPage: attributes.search_per_page,
                query: selectorQuery,
                selectedIds: value ? value.toJS() : [],
                threshold: attributes.search_threshold,
                url: attributes.search_url,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 320
                },
                __self: this
              })
            )
          )
        ),
        numberOfSelections > 0 ? React.createElement(
          "div",
          { className: styles.selectedItems, __source: {
              fileName: _jsxFileName,
              lineNumber: 341
            },
            __self: this
          },
          React.createElement(
            Sortable,
            { canRemove: true, onRemove: this.onRemove, onDrop: this.onDrop, __source: {
                fileName: _jsxFileName,
                lineNumber: 342
              },
              __self: this
            },
            selections.map(function (option, index) {
              return React.createElement(Selection, { key: index + "_" + option.id, option: option, fetchSelectionsData: _this4.fetchSelectionsData, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 344
                },
                __self: _this4
              });
            })
          )
        ) : null,
        hasErrors ? React.createElement(FieldErrors, { errors: errors, __source: {
            fileName: _jsxFileName,
            lineNumber: 349
          },
          __self: this
        }) : null
      );
    }
  }]);

  return SearchMultiSelectionField;
}(Component);

/**
 * Enable parent to pass context
 */


SearchMultiSelectionField.contextTypes = {
  globalConfig: PropTypes.object
};

/**
 * PropTypes
 * @type {Object}
 */
SearchMultiSelectionField.propTypes = {
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
    render_option_as: PropTypes.string,
    render_option_control_as: PropTypes.string,
    render_selection_as: PropTypes.string
  }),
  hint: PropTypes.string,
  label: PropTypes.string,
  errors: ImmutablePropTypes.list,
  value: ImmutablePropTypes.list
};

SearchMultiSelectionField.defaultProps = {
  selections: List()
};

export default SearchMultiSelectionField;