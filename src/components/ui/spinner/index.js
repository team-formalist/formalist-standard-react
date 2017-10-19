import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import * as styles from "./styles";

class Spinner extends Component {
  render() {
    const spinnerClassNames = classNames(styles.spinner, this.props.className);
    return <div className={spinnerClassNames} />;
  }
}

Spinner.propTypes = {
  className: PropTypes.string
};

export default Spinner;
