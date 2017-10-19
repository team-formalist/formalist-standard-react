var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsxFileName = "src/components/fields/search-selection-field/index.js",
    _this = this;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from "prop-types";
import React, { Component } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import classNames from "classnames";
import extractComponent from "../../../utils/extract-component";

// Import components
import FieldErrors from "../common/errors";
import FieldHeader from "../common/header";
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
 * Search Selection field
 *
 * Handles the singular select of a
 *
 */

var SearchSelectionField = function (_Component) {
  _inherits(SearchSelectionField, _Component);

  function SearchSelectionField(props) {
    _classCallCheck(this, SearchSelectionField);

    // Initial state
    var _this2 = _possibleConstructorReturn(this, (SearchSelectionField.__proto__ || Object.getPrototypeOf(SearchSelectionField)).call(this, props));

    _this2.state = {
      selectorFocus: false,
      selectorQuery: null
    };

    // Bindings
    _this2.onChange = _this2.onChange.bind(_this2);
    _this2.onChooseClick = _this2.onChooseClick.bind(_this2);
    _this2.onRemoveClick = _this2.onRemoveClick.bind(_this2);
    _this2.onSelection = _this2.onSelection.bind(_this2);
    _this2.openSelector = _this2.openSelector.bind(_this2);
    _this2.closeSelector = _this2.closeSelector.bind(_this2);
    _this2.toggleSelector = _this2.toggleSelector.bind(_this2);
    _this2.onPopoutOpen = _this2.onPopoutOpen.bind(_this2);
    _this2.onSelectorBlur = _this2.onSelectorBlur.bind(_this2);
    _this2.onSelectorFocus = _this2.onSelectorFocus.bind(_this2);
    _this2.onSelectorQueryChange = _this2.onSelectorQueryChange.bind(_this2);
    return _this2;
  }

  /**
   * componentWillMount
   * Do an XHR request for the additional selection data
   * @return {Null}
   */


  _createClass(SearchSelectionField, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this3 = this;

      // Do an XHR request for the additional selection data
      var _props = this.props,
          attributes = _props.attributes,
          value = _props.value;

      if (value) {
        var search_url = attributes.search_url;

        var req = search(search_url, {
          "ids[]": [value]
        });
        req.response.then(function (rsp) {
          if (rsp.results && rsp.results.length > 0) {
            var selection = rsp.results[0];
            _this3.setState({
              selection: selection
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
    value: function onChange(value, selection) {
      this.props.actions.edit(function (val) {
        return value;
      });
      this.setState({
        selection: selection
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
     * @return {Null}
     */

  }, {
    key: "onRemoveClick",
    value: function onRemoveClick(e) {
      e.preventDefault();
      this.onChange(null, null);
    }

    /**
     * When a selection is made, trigger change and close the selector
     * @return {Null}
     */

  }, {
    key: "onSelection",
    value: function onSelection(id, selection) {
      this.closeSelector();
      this.onChange(id, selection);
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
          name = _props2.name;
      var placeholder = attributes.placeholder,
          selector_label = attributes.selector_label,
          render_option_as = attributes.render_option_as,
          render_selection_as = attributes.render_selection_as;
      var _state = this.state,
          selection = _state.selection,
          selectorFocus = _state.selectorFocus,
          selectorQuery = _state.selectorQuery;

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

      return React.createElement(
        "div",
        { className: fieldClassNames, __source: {
            fileName: _jsxFileName,
            lineNumber: 226
          },
          __self: this
        },
        React.createElement(
          "div",
          { className: styles.header, __source: {
              fileName: _jsxFileName,
              lineNumber: 227
            },
            __self: this
          },
          React.createElement(FieldHeader, { id: name, label: label, hint: hint, error: hasErrors, __source: {
              fileName: _jsxFileName,
              lineNumber: 228
            },
            __self: this
          })
        ),
        React.createElement(
          "div",
          { className: styles.display, __source: {
              fileName: _jsxFileName,
              lineNumber: 230
            },
            __self: this
          },
          selection ? React.createElement(
            "div",
            { className: styles.wrapper, __source: {
                fileName: _jsxFileName,
                lineNumber: 232
              },
              __self: this
            },
            React.createElement(
              "div",
              { id: name, className: styles.selection, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 233
                },
                __self: this
              },
              React.createElement(Selection, { option: selection, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 234
                },
                __self: this
              })
            ),
            React.createElement(
              "button",
              { className: styles.remove, onClick: this.onRemoveClick, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 236
                },
                __self: this
              },
              React.createElement(
                "span",
                { className: styles.removeText, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 237
                  },
                  __self: this
                },
                "Remove"
              ),
              React.createElement(
                "div",
                { className: styles.removeX, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 238
                  },
                  __self: this
                },
                "\xD7"
              )
            )
          ) : React.createElement(
            "button",
            { className: styles.wrapper, onClick: this.onChooseClick, __source: {
                fileName: _jsxFileName,
                lineNumber: 242
              },
              __self: this
            },
            React.createElement(
              "div",
              { className: styles.selectionPlaceholder, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 243
                },
                __self: this
              },
              placeholder || "Make a selection"
            ),
            React.createElement(
              Popout,
              {
                ref: function ref(r) {
                  _this4._popout = r;
                },
                placement: "left",
                onOpen: this.onPopoutOpen,
                closeOnEsc: !selectorFocus || !selectorQuery,
                closeOnOutsideClick: true,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 246
                },
                __self: this
              },
              React.createElement(
                "div",
                { className: styles.openSelectorButton, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 255
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
                params: attributes.search_params,
                perPage: attributes.search_per_page,
                query: selectorQuery,
                threshold: attributes.search_threshold,
                url: attributes.search_url,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 258
                },
                __self: this
              })
            )
          ),
          hasErrors ? React.createElement(FieldErrors, { errors: errors, __source: {
              fileName: _jsxFileName,
              lineNumber: 276
            },
            __self: this
          }) : null
        )
      );
    }
  }]);

  return SearchSelectionField;
}(Component);

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