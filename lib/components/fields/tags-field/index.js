var _jsxFileName = "src/components/fields/tags-field/index.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import PropTypes from "prop-types";
import { List } from "immutable";
import ImmutablePropTypes from "react-immutable-proptypes";
import classNames from "classnames";
import keyCodes from "../../../utils/key-codes";

// Import components
import FieldErrors from "../common/errors";
import FieldHeader from "../common/header";
import Popunder from "../../ui/popunder";
import Spinner from "../../ui/spinner";
import SearchList from "./search-list";

// Import styles
import * as styles from "./styles";

/**
 * Tags field
 */

var TagsField = function (_Component) {
  _inherits(TagsField, _Component);

  function TagsField(props) {
    _classCallCheck(this, TagsField);

    var _this = _possibleConstructorReturn(this, (TagsField.__proto__ || Object.getPrototypeOf(TagsField)).call(this, props));

    var attributes = props.attributes;
    var search_url = attributes.search_url,
        search_threshold = attributes.search_threshold;

    // Initial state

    _this.state = {
      inputFocus: false,
      inputQuery: "",
      tagsLoading: false,
      canSearch: search_url != null,
      searchThreshold: search_threshold || 1
    };

    // Bindings
    _this.onChange = _this.onChange.bind(_this);
    _this.onInputBlur = _this.onInputBlur.bind(_this);
    _this.onInputChange = _this.onInputChange.bind(_this);
    _this.onInputFocus = _this.onInputFocus.bind(_this);
    _this.onInputKeyDown = _this.onInputKeyDown.bind(_this);
    return _this;
  }

  /**
   * onChange handler
   *
   * @param  {Event} e Change event from a form input/select
   */


  _createClass(TagsField, [{
    key: "onChange",
    value: function onChange(value) {
      this.props.actions.edit(function (val) {
        return value;
      });
    }

    /**
     * On selector focus
     * @param  {Event} e Keyboard event
     * @return {Null}
     */

  }, {
    key: "onInputFocus",
    value: function onInputFocus(e) {
      var _state = this.state,
          canSearch = _state.canSearch,
          inputQuery = _state.inputQuery,
          searchThreshold = _state.searchThreshold;

      this.setState({
        inputFocus: true
      });
      if (canSearch && inputQuery.length >= searchThreshold) {
        this._popunder.openPopunder();
      }
    }

    /**
     * On selector blur
     * @param  {Event} e Keyboard event
     * @return {Null}
     */

  }, {
    key: "onInputBlur",
    value: function onInputBlur(e) {
      this.setState({
        inputFocus: false,
        tagsLoading: false
      });
    }

    /**
     * Handle change event for inputs
     * @param  {Event} e Change event
     */

  }, {
    key: "onInputChange",
    value: function onInputChange(e) {
      var _state2 = this.state,
          canSearch = _state2.canSearch,
          searchThreshold = _state2.searchThreshold;

      var inputQuery = e.target.value;
      this.setState({
        inputQuery: inputQuery
      });
      if (canSearch && inputQuery.length >= searchThreshold) {
        this._popunder.openPopunder();
      } else {
        if (canSearch) {
          this._popunder.closePopunder();
        }
        this.setState({
          inputQuery: "",
          tagsLoading: false
        });
      }
    }

    /**
     * Handle change event for inputs
     * @param  {Event} e Change event
     */

  }, {
    key: "onInputKeyDown",
    value: function onInputKeyDown(e) {
      switch (e.keyCode) {
        case keyCodes.ENTER:
          e.preventDefault();
          var added = this.addTag(e.target.value);
          if (added) {
            this.clearInput();
          }
          break;
        case keyCodes.BACKSPACE:
          if (e.target.value === "") {
            e.preventDefault();
            // Remove the last tag
            this.removeTag(-1);
          }
          break;
      }
    }

    /**
     * Empty the input field
     */

  }, {
    key: "clearInput",
    value: function clearInput() {
      this._input.value = "";
      this.setState({
        inputQuery: "",
        tagsLoading: false
      });
    }

    /**
     * Remove a tag from the value based on index
     */

  }, {
    key: "removeTag",
    value: function removeTag(index) {
      var value = this.props.value;

      this.onChange(value.delete(index));
    }

    /**
     * Add tag to end of list
     */

  }, {
    key: "addTag",
    value: function addTag(tag) {
      var value = this.props.value;

      var valid = tag && tag !== "";
      if (valid) {
        value = value || List();
        this.onChange(value.push(tag));
        return true;
      }
      return false;
    }

    /**
     * Render existing tags
     * @return {ReactElement}
     */

  }, {
    key: "renderTagsList",
    value: function renderTagsList() {
      var _this2 = this;

      var value = this.props.value;

      if (value) {
        return value.map(function (tag, i) {
          var key = tag + "-" + i;
          var onClick = function onClick(e) {
            e.preventDefault();
            // Remove only if the span is clicked on
            if (e.target.nodeName === "SPAN") {
              _this2.removeTag(i);
            }
          };
          var onKeyDown = function onKeyDown(e) {
            if (e.keyCode === keyCodes.DELETE || e.keyCode === keyCodes.BACKSPACE) {
              _this2.removeTag(i);
            }
          };

          return React.createElement(
            "button",
            {
              key: key,
              className: styles.tag,
              onClick: onClick,
              onKeyDown: onKeyDown,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 188
              },
              __self: _this2
            },
            tag,
            React.createElement(
              "span",
              { className: styles.removeButton, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 195
                },
                __self: _this2
              },
              "\xD7"
            )
          );
        });
      } else {
        return null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          attributes = _props.attributes,
          errors = _props.errors,
          hint = _props.hint,
          label = _props.label,
          name = _props.name;
      var placeholder = attributes.placeholder,
          search_url = attributes.search_url,
          search_params = attributes.search_params;
      var _state3 = this.state,
          canSearch = _state3.canSearch,
          inputFocus = _state3.inputFocus,
          inputQuery = _state3.inputQuery,
          searchThreshold = _state3.searchThreshold,
          tagsLoading = _state3.tagsLoading;

      var hasErrors = errors.count() > 0;

      placeholder = placeholder || "Enter a tag";

      // Set up field classes
      var fieldClassNames = classNames(styles.base, _defineProperty({}, "" + styles.baseInline, attributes.inline));

      var displayClassNames = classNames(styles.display, _defineProperty({}, "" + styles.displayFocus, inputFocus));

      var popunderContainerClassName = classNames(styles.popunderContainer, _defineProperty({}, "" + styles.popunderContainerHidden, tagsLoading));

      // TODO Asses whether to remove this binding
      /* eslint-disable react/jsx-no-bind */
      return React.createElement(
        "div",
        { className: fieldClassNames, __source: {
            fileName: _jsxFileName,
            lineNumber: 234
          },
          __self: this
        },
        React.createElement(
          "div",
          { className: styles.header, __source: {
              fileName: _jsxFileName,
              lineNumber: 235
            },
            __self: this
          },
          React.createElement(FieldHeader, { id: name, label: label, hint: hint, error: hasErrors, __source: {
              fileName: _jsxFileName,
              lineNumber: 236
            },
            __self: this
          })
        ),
        React.createElement(
          "div",
          { className: displayClassNames, __source: {
              fileName: _jsxFileName,
              lineNumber: 238
            },
            __self: this
          },
          React.createElement(
            "div",
            { className: styles.tagList, __source: {
                fileName: _jsxFileName,
                lineNumber: 239
              },
              __self: this
            },
            this.renderTagsList(),
            canSearch ? React.createElement(
              Popunder,
              {
                ref: function ref(r) {
                  _this3._popunder = r;
                },
                onClose: this.onPopunderClose,
                onOpen: this.onPopunderOpen,
                className: styles.popunderWrapper,
                closeOnEsc: true,
                closeOnOutsideClick: true,
                containerClassName: popunderContainerClassName,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 242
                },
                __self: this
              },
              React.createElement(
                "div",
                { className: styles.tagInputWrapper, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 253
                  },
                  __self: this
                },
                React.createElement("input", {
                  ref: function ref(r) {
                    _this3._input = r;
                  },
                  className: styles.tagInput,
                  onChange: this.onInputChange,
                  onKeyDown: this.onInputKeyDown,
                  onBlur: this.onInputBlur,
                  onFocus: this.onInputFocus,
                  placeholder: placeholder,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 254
                  },
                  __self: this
                }),
                tagsLoading ? React.createElement(Spinner, { className: styles.spinner, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 265
                  },
                  __self: this
                }) : null
              ),
              React.createElement(SearchList, {
                query: inputQuery,
                url: search_url,
                params: search_params,
                threshold: searchThreshold,
                onSearchStart: function onSearchStart() {
                  return _this3.setState({ tagsLoading: true });
                },
                onSearchEnd: function onSearchEnd() {
                  return _this3.setState({ tagsLoading: false });
                },
                onSelect: function onSelect(selection) {
                  var added = _this3.addTag(selection.value);
                  if (added) {
                    _this3.clearInput();
                    _this3._input.focus();
                    _this3._popunder.closePopunder();
                  }
                },
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 267
                },
                __self: this
              })
            ) : React.createElement(
              "div",
              { className: styles.tagInputWrapperNoSearch, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 285
                },
                __self: this
              },
              React.createElement("input", {
                ref: function ref(r) {
                  _this3._input = r;
                },
                className: styles.tagInput,
                onChange: this.onInputChange,
                onKeyDown: this.onInputKeyDown,
                onBlur: this.onInputBlur,
                onFocus: this.onInputFocus,
                placeholder: placeholder,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 286
                },
                __self: this
              })
            )
          ),
          hasErrors ? React.createElement(FieldErrors, { errors: errors, __source: {
              fileName: _jsxFileName,
              lineNumber: 300
            },
            __self: this
          }) : null
        )
      );
      /* eslint-enable react/jsx-no-bind */
    }
  }]);

  return TagsField;
}(Component);

/**
 * Enable parent to pass context
 */


TagsField.contextTypes = {
  globalConfig: PropTypes.object
};

/**
 * PropTypes
 * @type {Object}
 */
TagsField.propTypes = {
  actions: PropTypes.object,
  name: PropTypes.string,
  config: PropTypes.object,
  attributes: PropTypes.shape({
    label: PropTypes.string,
    hint: PropTypes.string,
    placeholder: PropTypes.string,
    inline: PropTypes.bool,
    search_url: PropTypes.string,
    search_params: PropTypes.object,
    search_threshold: PropTypes.number
  }),
  hint: PropTypes.string,
  label: PropTypes.string,
  errors: ImmutablePropTypes.list,
  value: ImmutablePropTypes.list
};

export default TagsField;