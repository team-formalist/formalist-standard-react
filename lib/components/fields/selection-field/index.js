var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsxFileName = "src/components/fields/selection-field/index.js",
    _this = this;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var SelectDefault = function SelectDefault(_ref) {
  var option = _ref.option;
  return React.createElement(
    "div",
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 28
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
    }, _this2.onRemoveClick = function (e) {
      e.preventDefault();
      _this2.onChange(null);
    }, _this2.onSelection = function (id) {
      _this2.closeSelector();
      _this2.onChange(id);
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
   * @return {Null}
   */


  /**
   * When a selection is made, trigger change and close the selector
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
      var options = attributes.options,
          placeholder = attributes.placeholder,
          selector_label = attributes.selector_label,
          render_option_as = attributes.render_option_as,
          render_selection_as = attributes.render_selection_as;

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

      // Determine selection
      var selection = options.find(function (option) {
        return option.id === value;
      });

      // Filter options
      var filteredOptions = options;
      if (search) {
        filteredOptions = options.filter(function (option) {
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
              lineNumber: 251
            },
            __self: _this3
          },
          React.createElement(Option, { option: option, __source: {
              fileName: _jsxFileName,
              lineNumber: 256
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
          "data-field-type": "selection-field",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 262
          },
          __self: this
        },
        React.createElement(
          "div",
          { className: styles.header, __source: {
              fileName: _jsxFileName,
              lineNumber: 267
            },
            __self: this
          },
          React.createElement(FieldHeader, { id: name, label: label, hint: hint, error: hasErrors, __source: {
              fileName: _jsxFileName,
              lineNumber: 268
            },
            __self: this
          })
        ),
        React.createElement(
          "div",
          { className: styles.display, __source: {
              fileName: _jsxFileName,
              lineNumber: 270
            },
            __self: this
          },
          selection ? React.createElement(
            "div",
            { className: styles.wrapper, __source: {
                fileName: _jsxFileName,
                lineNumber: 272
              },
              __self: this
            },
            React.createElement(
              "div",
              { className: styles.selection, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 273
                },
                __self: this
              },
              React.createElement(Selection, { option: selection, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 274
                },
                __self: this
              })
            ),
            React.createElement(
              "button",
              { className: styles.remove, onClick: this.onRemoveClick, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 276
                },
                __self: this
              },
              React.createElement(
                "span",
                { className: styles.removeText, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 277
                  },
                  __self: this
                },
                "Remove"
              ),
              React.createElement(
                "div",
                { className: styles.removeX, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 278
                  },
                  __self: this
                },
                "\xD7"
              )
            )
          ) : React.createElement(
            "button",
            { "data-open-selector-button": true, className: styles.wrapper, onClick: this.onChooseClick, __source: {
                fileName: _jsxFileName,
                lineNumber: 282
              },
              __self: this
            },
            React.createElement(
              "div",
              { className: styles.selectionPlaceholder, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 283
                },
                __self: this
              },
              placeholder || "Make a selection"
            ),
            React.createElement(
              Popout,
              {
                ref: function ref(r) {
                  _this3._selector = r;
                },
                placement: "left",
                onClose: this.onPopoutClose,
                onOpen: this.onPopoutOpen,
                closeOnEsc: !searchFocus || !search,
                closeOnOutsideClick: true,
                testId: "selection-field:" + name,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 286
                },
                __self: this
              },
              React.createElement(
                "div",
                { className: styles.openSelectorButton, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 297
                  },
                  __self: this
                },
                selector_label || "Select"
              ),
              React.createElement(
                "div",
                { className: styles.options, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 300
                  },
                  __self: this
                },
                React.createElement("input", {
                  ref: function ref(r) {
                    _this3._search = r;
                  },
                  type: "search",
                  className: styles.search,
                  placeholder: "Type to filter",
                  onBlur: this.onSearchBlur,
                  onFocus: this.onSearchFocus,
                  onChange: this.onSearchChange,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 301
                  },
                  __self: this
                }),
                React.createElement(
                  "div",
                  { className: styles.optionsList, __source: {
                      fileName: _jsxFileName,
                      lineNumber: 312
                    },
                    __self: this
                  },
                  renderedOptions.length > 0 ? renderedOptions : React.createElement(
                    "p",
                    { className: styles.noResults, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 316
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
        hasErrors ? React.createElement(FieldErrors, { errors: errors, __source: {
            fileName: _jsxFileName,
            lineNumber: 324
          },
          __self: this
        }) : null
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
SelectionField.contextTypes = {
  globalConfig: PropTypes.object
};


export default SelectionField;