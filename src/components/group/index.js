import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import * as styles from "./styles";

class Group extends React.Component {
  static propTypes = {
    hashCode: PropTypes.number.isRequired,
    type: PropTypes.string,
    attributes: ImmutablePropTypes.map,
    children: ImmutablePropTypes.list
  };

  shouldComponentUpdate(nextProps) {
    // Use the path hash-code to determine whether or not to rerender this
    // section. This should take account of any change to the AST.
    // It will not account for changes to the overall form definition (but they
    // should not change after runtime anyway)
    return this.props.hashCode !== nextProps.hashCode;
  }

  render() {
    let { attributes, children } = this.props;
    let label = attributes.get("label");

    return (
      <div className={styles.group}>
        {label ? <h2 className={styles.label}>{label}</h2> : null}
        <div className={styles.groupItems}>
          {children.map((child, index) => (
            <div key={index} className={styles.item}>
              {child}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Group;
export let GroupFactory = React.createFactory(Group);
