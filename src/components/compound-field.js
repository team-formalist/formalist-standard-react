import React from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import uid from "uid";

const styles = {
  base: uid(10) // Empty placeholder class
};

const CompoundField = ({ children }) => {
  return (
    <div className={styles.base} data-compound-field>
      {children}
    </div>
  );
};

CompoundField.propTypes = {
  children: ImmutablePropTypes.list
};

export default CompoundField;
export let CompoundFieldFactory = React.createFactory(CompoundField);
