import React from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import { css } from "emotion";

const styles = {
  base: css`
  visibility: inherit;
`
};

const CompoundField = ({ children }) => {
  return <div className={styles.base} data-compound-field>{children}</div>;
};

CompoundField.propTypes = {
  children: ImmutablePropTypes.list
};

export default CompoundField;
export let CompoundFieldFactory = React.createFactory(CompoundField);
