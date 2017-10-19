import React from "react";
import { EditorBlock } from "draft-js";

class PullquoteBlock extends React.Component {
  render() {
    return (
      <div className="rte-block__pullquote">
        <EditorBlock {...this.props} />
      </div>
    );
  }
}

export default PullquoteBlock;
