import React from "react";

/**
 * Hidden field
 */
const HiddenField = ({ name, value }) => {
  return (
    <span
      data-field-name={name}
      data-field-type="hidden"
      data-field-value={value}
    />
  );
};

export default HiddenField;
