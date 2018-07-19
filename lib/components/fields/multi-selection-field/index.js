var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsxFileName = "src/components/fields/multi-selection-field/index.js",
    _this = this;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from "prop-types";
import React from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import classNames from "classnames";
import { List } from "immutable";
import fuzzy from "fuzzy";
import extractComponent from "../../../utils/extract-component";

// Import components
import FieldErrors from "../common/errors";
import FieldHeader from "../common/header";
import Popout from "../../ui/popout";
import Sortable from "../../ui/sortable";

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
        lineNumber: 30
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
 * Selection field
 *
 * Handles a singular select of a set of pre-supplied options.
 *
 */

var SelectionField = function (_React$Component) {
  _inherits(SelectionField, _React$Component);

  function SelectionField() {
    var _ref2;

    var _temp, _this2, _ret;

    _classCallCheck(this, SelectionField);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref2 = SelectionField.__proto__ || Object.getPrototypeOf(SelectionField)).call.apply(_ref2, [this].concat(args))), _this2), _this2.state = {
      search: null,
      searchFocus: false
    }, _this2.onChange = function (value) {
      _this2.props.actions.edit(function (val) {
        return value;
      });
    }, _this2.onChooseClick = function (e) {
      e.preventDefault();
      _this2.toggleSelector();
    }, _this2.onRemove = function (index) {
      var value = _this2.props.value;

      _this2.onChange(value.delete(index));
    }, _this2.onDrop = function (newOrder) {
      var value = _this2.props.value.slice();
      var updated = newOrder.map(function (index) {
        return value.get(index);
      });
      _this2.onChange(List(updated));
    }, _this2.onSelection = function (id) {
      _this2.closeSelector();
      var value = _this2.props.value;

      value = value || List();
      _this2.onChange(value.push(id));
    }, _this2.openSelector = function () {
      _this2._selector.openPopout();
    }, _this2.closeSelector = function () {
      _this2._selector.closePopout();
    }, _this2.onPopoutClose = function () {
      _this2.setState({
        search: null
      });
    }, _this2.toggleSelector = function () {
      _this2._selector.togglePopout();
    }, _this2.onPopoutOpen = function () {
      _this2._search.focus();
    }, _this2.onSearchChange = function (e) {
      var search = e.target.value;
      _this2.setState({
        search: search
      });
    }, _this2.onSearchFocus = function (e) {
      _this2.setState({
        searchFocus: true
      });
    }, _this2.onSearchBlur = function (e) {
      _this2.setState({
        searchFocus: false
      });
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  /**
   * Enable parent to pass context
   */

  /**
   * Default state, blank search
   * @return {Object}
   */


  /**
   * onChange handler
   *
   * @param  {Event} e Change event from a form input/select
   */


  /**
   * On choose click, open selector
   * @return {Null}
   */


  /**
   * When selected item is removed
   * @param {Number} index Index of the item to remove
   * @return {Null}
   */


  /**
   * When selected item is removed
   * @return {Null}
   */


  /**
   * When a selection is made, trigger change and close the selector
   * @param {Number} id ID of the item to push in
   * @return {Null}
   */


  /**
   * Open the selector popout
   * @return {Null}
   */


  /**
   * Close the selector popout
   * @return {Null}
   */


  /**
   * On popout close, reset the search
   * @return {Null}
   */


  /**
   * Toggle the selector popout
   * @return {Null}
   */


  /**
   * On popout open, focus the search input
   * @return {Null}
   */


  /**
   * Fired when search input is `change`d.
   * Set this.state.search to the value of the input
   * @param  {Event} e Keyboard event
   * @return {Null}
   */


  /**
   * On search input focus
   * @param  {Event} e Keyboard event
   * @return {Null}
   */


  /**
   * On search input blur
   * @param  {Event} e Keyboard event
   * @return {Null}
   */


  _createClass(SelectionField, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          attributes = _props.attributes,
          config = _props.config,
          errors = _props.errors,
          hint = _props.hint,
          label = _props.label,
          name = _props.name,
          value = _props.value;
      var _state = this.state,
          search = _state.search,
          searchFocus = _state.searchFocus;
      var sortable = attributes.sortable,
          max_height = attributes.max_height,
          options = attributes.options,
          placeholder = attributes.placeholder,
          selector_label = attributes.selector_label,
          render_selection_as = attributes.render_selection_as,
          render_option_as = attributes.render_option_as;

      var hasErrors = errors.count() > 0;

      // Set up field classes
      var fieldClassNames = classNames(styles.base, _defineProperty({}, "" + styles.baseInline, attributes.inline));

      // Determine the selection/selected display components
      var Option = SelectDefault;
      var Selection = SelectDefault;

      // Extract them from the passed `config.components` if it exists
      if (config.components) {
        if (render_option_as) {
          Option = extractComponent(config.components, render_option_as) || Option;
        }
        if (render_selection_as) {
          Selection = extractComponent(config.components, render_selection_as) || Selection;
        }
      }

      // Determine selected options
      var selections = List();
      if (value) {
        selections = value.map(function (id) {
          return options.find(function (option) {
            return option.id === id;
          });
        });
      }
      var numberOfSelections = selections.count();

      // Remove any selected options
      var filteredOptions = options.filter(function (option) {
        var include = true;
        if (value) {
          include = !value.includes(option.id);
        }
        return include;
      });
      // Filter options
      if (search) {
        filteredOptions = filteredOptions.filter(function (option) {
          var values = Object.keys(option).map(function (key) {
            return String(option[key]);
          });
          var results = fuzzy.filter(search, values);
          return results && results.length > 0;
        });
      }

      // Build the set of options
      var renderedOptions = filteredOptions.map(function (option) {
        // TODO Asses whether to remove this binding
        /* eslint-disable react/jsx-no-bind */
        var onClick = function (e) {
          e.preventDefault();
          this.onSelection(option.id);
        }.bind(_this3);
        /* eslint-enable react/jsx-no-bind */
        return React.createElement(
          "button",
          {
            key: option.id,
            className: styles.optionButton,
            onClick: onClick,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 282
            },
            __self: _this3
          },
          React.createElement(Option, { option: option, __source: {
              fileName: _jsxFileName,
              lineNumber: 287
            },
            __self: _this3
          })
        );
      });

      return React.createElement(
        "div",
        {
          className: fieldClassNames,
          "data-field-name": name,
          "data-field-type": "multi-selection-field",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 293
          },
          __self: this
        },
        React.createElement(
          "div",
          { className: styles.header, __source: {
              fileName: _jsxFileName,
              lineNumber: 298
            },
            __self: this
          },
          React.createElement(FieldHeader, { id: name, label: label, hint: hint, error: hasErrors, __source: {
              fileName: _jsxFileName,
              lineNumber: 299
            },
            __self: this
          })
        ),
        React.createElement(
          "div",
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 301
            },
            __self: this
          },
          React.createElement(
            "div",
            { className: styles.display, __source: {
                fileName: _jsxFileName,
                lineNumber: 302
              },
              __self: this
            },
            React.createElement(
              "button",
              { className: styles.wrapper, onClick: this.onChooseClick, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 303
                },
                __self: this
              },
              React.createElement(
                "div",
                { className: styles.selectionPlaceholder, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 304
                  },
                  __self: this
                },
                React.createElement(
                  "div",
                  {
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 305
                    },
                    __self: this
                  },
                  placeholder || "Make a selection",
                  numberOfSelections > 0 ? " (" + numberOfSelections + " selected)" : null
                )
              ),
              React.createElement(
                Popout,
                {
                  ref: function ref(c) {
                    _this3._selector = c;
                  },
                  placement: "left",
                  onClose: this.onPopoutClose,
                  onOpen: this.onPopoutOpen,
                  closeOnEsc: !searchFocus || !search,
                  closeOnOutsideClick: true,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 312
                  },
                  __self: this
                },
                React.createElement(
                  "div",
                  { className: styles.openSelectorButton, __source: {
                      fileName: _jsxFileName,
                      lineNumber: 322
                    },
                    __self: this
                  },
                  selector_label || "Select"
                ),
                React.createElement(
                  "div",
                  { className: styles.options, __source: {
                      fileName: _jsxFileName,
                      lineNumber: 325
                    },
                    __self: this
                  },
                  React.createElement("input", {
                    ref: function ref(r) {
                      return _this3._search = r;
                    },
                    type: "search",
                    className: styles.search,
                    placeholder: "Type to filter",
                    onBlur: this.onSearchBlur,
                    onFocus: this.onSearchFocus,
                    onChange: this.onSearchChange,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 326
                    },
                    __self: this
                  }),
                  React.createElement(
                    "div",
                    { className: styles.optionsList, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 335
                      },
                      __self: this
                    },
                    renderedOptions.length > 0 ? renderedOptions : React.createElement(
                      "p",
                      { className: styles.noResults, __source: {
                          fileName: _jsxFileName,
                          lineNumber: 339
                        },
                        __self: this
                      },
                      "No matching results"
                    )
                  )
                )
              )
            )
          ),
          numberOfSelections > 0 ? React.createElement(
            "div",
            { className: styles.selectedItems, __source: {
                fileName: _jsxFileName,
                lineNumber: 347
              },
              __self: this
            },
            React.createElement(
              Sortable,
              {
                canRemove: true,
                onRemove: this.onRemove,
                onDrop: this.onDrop,
                canSort: sortable,
                maxHeight: max_height,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 348
                },
                __self: this
              },
              selections.map(function (option, index) {
                return React.createElement(Selection, { key: index + "_" + option.id, option: option, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 356
                  },
                  __self: _this3
                });
              })
            )
          ) : null,
          hasErrors ? React.createElement(FieldErrors, { errors: errors, __source: {
              fileName: _jsxFileName,
              lineNumber: 361
            },
            __self: this
          }) : null
        )
      );
    }
  }]);

  return SelectionField;
}(React.Component);

SelectionField.propTypes = {
  actions: PropTypes.object,
  name: PropTypes.string,
  config: PropTypes.object,
  attributes: PropTypes.shape({
    hint: PropTypes.string,
    inline: PropTypes.bool,
    label: PropTypes.string,
    sortable: PropTypes.bool,
    max_height: PropTypes.string,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    render_option_as: PropTypes.string,
    render_selection_as: PropTypes.string,
    selector_label: PropTypes.string
  }),
  hint: PropTypes.string,
  label: PropTypes.string,
  errors: ImmutablePropTypes.list,
  value: ImmutablePropTypes.list
};
SelectionField.contextTypes = {
  globalConfig: PropTypes.object
};


export default SelectionField;