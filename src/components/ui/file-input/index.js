import React from "react";
import PropTypes from "prop-types";
import triggerEvent from "trigger-event";

export default class extends React.Component {
  /**
   * displayName
   */

  static displayName = "FileInput";

  /**
   * propTypes
   */

  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  /**
   * getDefaultProps
   */

  static defaultProps = {
    resetInput: false
  };

  /**
   * onClearInput
   * reset teh value of the file input
   */

  onClearInput = () => {
    this.refs.fileInput.value = "";
  };

  /**
   * triggerClickEvent
   * Clear the input
   */

  triggerClickEvent = () => {
    triggerEvent(this.refs.fileInput, "click");
  };

  /**
   * componentWillReceiveProps
   * Check if we need to reset the file input
   */

  componentWillReceiveProps(nextProps) {
    if (nextProps.clearInput) {
      this.onClearInput();
    }

    if (nextProps.triggerClick) {
      this.triggerClickEvent();
    }
  }

  /**
   * render
   * @return {vnode}
   */

  render() {
    const { name, onChange, className } = this.props;

    return (
      <div className={className}>
        <input
          ref="fileInput"
          type="file"
          className={className}
          name={name}
          id={name}
          onChange={onChange}
        />
      </div>
    );
  }
}
