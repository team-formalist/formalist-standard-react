var _jsxFileName = "src/components/ui/rich-text-editor/inline-toolbar-plugin/toolbar/index.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import PropTypes from "prop-types";
import { Entity, getVisibleSelectionRect, RichUtils } from "draft-js";
import { getSelectedEntityKey } from "../../utils";
// Components
import Popout from "../../../popout";
import InlineToolbarItems from "../items";
// Styles
import * as styles from "./styles";

/**
 * Inline Toolbar
 *
 * An inline toolbar for the `rich-text-editor` that pops out when text is
 * selected.
 *
 * It uses the common <Popout/> UI component so there’s a slightly strange dance
 * to set the position using a reference element `this.refs.positioner`.
 *
 */

var Toolbar = function (_React$Component) {
  _inherits(Toolbar, _React$Component);

  function Toolbar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Toolbar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      visible: false,
      forceVisible: false
    }, _this.forceVisible = function (force) {
      _this.setState({
        forceVisible: force
      });
    }, _this.removeEntity = function (entityKey) {
      var _this$props = _this.props,
          editorState = _this$props.editorState,
          onChange = _this$props.onChange;

      var selection = editorState.getSelection();
      onChange(RichUtils.toggleLink(editorState, selection, null));
    }, _this.calculatePosition = function () {
      var visible = _this.state.visible;

      if (visible) {
        var selectionRect = getVisibleSelectionRect(window);
        if (selectionRect && _this.positioner) {
          var positionerRect = _this.positioner.offsetParent.getBoundingClientRect();
          return {
            left: selectionRect.left - positionerRect.left,
            top: selectionRect.top - positionerRect.top,
            width: selectionRect.width
          };
        }
      }
      return {
        left: 0,
        right: 0,
        width: 0
      };
    }, _this.onPopoutClose = function () {
      _this.setState({
        forceVisible: false
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Toolbar, [{
    key: "componentWillReceiveProps",


    /**
     * Handle position and visibility of the toolbar
     */
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var editorState = nextProps.editorState,
          editorHasFocus = nextProps.editorHasFocus;
      var forceVisible = this.state.forceVisible;

      var selection = editorState.getSelection();

      // Determine visibility of the toolbar
      var selectionVisible = !selection.isCollapsed() && editorHasFocus;

      this.setState({
        visible: forceVisible || selectionVisible
      });

      if (selectionVisible) {
        // We have to wait a tick to calculate the position
        window.requestAnimationFrame(function () {
          _this2.setState({
            positionStyle: _this2.calculatePosition()
          });
        });
      }
    }

    /**
     * Calculate the position of the toolbar based on the visible selection
     * and the position of the `positioner`s offsetParent.
     *
     * @return {Object} Description of the position/size of the positioner
     */

  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          editorState = _props.editorState,
          formatters = _props.formatters,
          entities = _props.entities,
          onChange = _props.onChange;
      var _state = this.state,
          visible = _state.visible,
          forceVisible = _state.forceVisible,
          positionStyle = _state.positionStyle;

      var SelectedEntityHandler = null;
      var selectedEntity = void 0;

      // Retrieve the selected entity if there is one
      // and pull out any handlers we have available
      var selectedEntityKey = getSelectedEntityKey(editorState);
      if (selectedEntityKey) {
        selectedEntity = Entity.get(selectedEntityKey);
        var selectedEntityType = selectedEntity.getType();
        var matchingEntity = entities.find(function (entity) {
          return entity.type.toLowerCase() === selectedEntityType.toLowerCase();
        });
        if (matchingEntity) {
          SelectedEntityHandler = matchingEntity.handler;
        } else {
          return null;
        }
      }

      // Only display if we have some `formatters` configured
      if (formatters.length > 0 || entities.length > 0) {
        // We need to cancel onMouseDown to avoid the buttons capturing focus
        // TODO Asses whether to remove this binding
        /* eslint-disable react/jsx-no-bind */
        return React.createElement(
          "div",
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 132
            },
            __self: this
          },
          React.createElement(
            Popout,
            {
              ref: function ref(r) {
                return _this3._popout = r;
              },
              placement: "top",
              isOpened: visible,
              closeOnOutsideClick: true,
              onClose: this.onPopoutClose,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 133
              },
              __self: this
            },
            React.createElement(
              "div",
              {
                className: styles.positioner,
                ref: function ref(r) {
                  _this3.positioner = r;
                },
                style: positionStyle,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 140
                },
                __self: this
              },
              "\xA0"
            ),
            React.createElement(
              "div",
              {
                onMouseDown: function onMouseDown(e) {
                  if (!forceVisible) {
                    e.preventDefault();
                  }
                },
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 149
                },
                __self: this
              },
              React.createElement(InlineToolbarItems, {
                formatters: formatters,
                entities: entities,
                editorState: editorState,
                onChange: onChange,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 156
                },
                __self: this
              }),
              SelectedEntityHandler ? React.createElement(
                "div",
                { className: styles.entityWrapper, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 163
                  },
                  __self: this
                },
                React.createElement(SelectedEntityHandler, {
                  entityKey: selectedEntityKey,
                  editorState: editorState,
                  onChange: onChange,
                  forceVisible: this.forceVisible,
                  remove: this.removeEntity,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 164
                  },
                  __self: this
                })
              ) : null
            )
          )
        );
        /* eslint-enable react/jsx-no-bind */
      } else {
        return null;
      }
    }
  }]);

  return Toolbar;
}(React.Component);

Toolbar.propTypes = {
  editorHasFocus: PropTypes.bool.isRequired,
  editorState: PropTypes.object.isRequired,
  formatters: PropTypes.array,
  entities: PropTypes.array,
  onChange: PropTypes.func.isRequired
};


export default Toolbar;