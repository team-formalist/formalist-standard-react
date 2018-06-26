var _jsxFileName = "src/components/fields/rich-text-area/index.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import classNames from "classnames";
import { EditorState } from "draft-js";

// Import components
import FieldErrors from "../common/errors";
import FieldHeader from "../common/header";

// Import styles
import * as styles from "./styles";
import RichTextEditor from "../../ui/rich-text-editor";

// HTML
import exporter from "draft-js-ast-exporter";
import importer from "draft-js-ast-importer";

/**
 * Text Area field
 */

var RichTextArea = function (_React$Component) {
  _inherits(RichTextArea, _React$Component);

  function RichTextArea(props) {
    _classCallCheck(this, RichTextArea);

    var _this = _possibleConstructorReturn(this, (RichTextArea.__proto__ || Object.getPrototypeOf(RichTextArea)).call(this, props));

    _initialiseProps.call(_this);

    var value = props.value;
    // Convert from an Immutable structure?

    value = value && value.toJS ? value.toJS() : value;
    // Convert from a string?
    value = typeof value === "string" ? JSON.parse(value) : value;

    _this.state = {
      editorState: value ? EditorState.createWithContent(importer(value)) : EditorState.createEmpty()
    };
    return _this;
  }

  /**
   * onChange handler
   *
   * @param  {EditorState} editorState State from the editor
   */


  _createClass(RichTextArea, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          attributes = _props.attributes,
          config = _props.config,
          errors = _props.errors,
          hint = _props.hint,
          label = _props.label,
          name = _props.name,
          bus = _props.bus;
      var editorState = this.state.editorState;

      var hasErrors = errors.count() > 0;

      // Set up field classes
      var fieldClassNames = classNames(styles.base, _defineProperty({}, "" + styles.baseInline, attributes.inline));

      return React.createElement(
        "div",
        {
          className: fieldClassNames,
          "data-field-name": name,
          "data-field-type": "rich-text-area",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 127
          },
          __self: this
        },
        React.createElement(
          "div",
          { className: styles.header, __source: {
              fileName: _jsxFileName,
              lineNumber: 132
            },
            __self: this
          },
          React.createElement(FieldHeader, { id: name, label: label, hint: hint, error: hasErrors, __source: {
              fileName: _jsxFileName,
              lineNumber: 133
            },
            __self: this
          })
        ),
        React.createElement(
          "div",
          { className: styles.display, __source: {
              fileName: _jsxFileName,
              lineNumber: 135
            },
            __self: this
          },
          React.createElement(RichTextEditor, {
            editorState: editorState,
            config: config,
            onChange: this.onChange,
            inlineFormatters: attributes.inline_formatters,
            blockFormatters: attributes.block_formatters,
            embeddableForms: attributes.embeddable_forms,
            boxSize: attributes.box_size,
            textSize: attributes.text_size,
            placeholder: attributes.placeholder,
            webDriverTestID: name,
            fieldBus: bus,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 136
            },
            __self: this
          }),
          hasErrors ? React.createElement(FieldErrors, { errors: errors, __source: {
              fileName: _jsxFileName,
              lineNumber: 149
            },
            __self: this
          }) : null
        )
      );
    }
  }]);

  return RichTextArea;
}(React.Component);

RichTextArea.propTypes = {
  actions: PropTypes.object,
  name: PropTypes.string,
  config: PropTypes.object,
  attributes: PropTypes.shape({
    label: PropTypes.string,
    hint: PropTypes.string,
    placeholder: PropTypes.string,
    inline: PropTypes.bool,
    box_size: PropTypes.oneOf(["single", "small", "normal", "large", "xlarge"]),
    inline_formatters: PropTypes.array,
    block_formatters: PropTypes.array,
    embeddable_forms: PropTypes.object
  }),
  bus: PropTypes.object.isRequired,
  hint: PropTypes.string,
  label: PropTypes.string,
  errors: ImmutablePropTypes.list,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array, ImmutablePropTypes.list])
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.onChange = function (editorState, _ref) {
    var _ref$forceChange = _ref.forceChange,
        forceChange = _ref$forceChange === undefined ? false : _ref$forceChange;

    if (forceChange || editorState !== _this2.state.editorState) {
      // Check if contentState has changed
      if (forceChange || editorState.getCurrentContent() !== _this2.state.editorState.getCurrentContent()) {
        var value = _this2.props.value;

        var exporterOptions = {
          entityModifiers: {
            formalist: function formalist(data) {
              var copy = Object.assign({}, data);
              delete copy["label"];
              delete copy["form"];
              return copy;
            }
          }
        };
        var currentContent = editorState.getCurrentContent();
        var hasText = currentContent.hasText();
        var newValue = hasText ? exporter(editorState, exporterOptions) : null;
        var hasChangedToNull = newValue === null && value !== null;

        // Persist the value to the AST, but only if it is:
        // * Not null
        // * Has changed to null
        if (newValue != null || hasChangedToNull) {
          _this2.props.actions.edit(function (val) {
            return newValue;
          });
        }
      }
      // Keep track of the state here
      _this2.setState({
        editorState: editorState
      });
    }
  };
};

export default RichTextArea;