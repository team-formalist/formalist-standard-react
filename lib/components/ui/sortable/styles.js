import { css } from "emotion";
import { inputBoxes } from "../styles";

export var base = /*#__PURE__*/css(inputBoxes.inputBox, ";");

export var maxHeightWrapper = /*#__PURE__*/css("position:relative;&:after{background-color:rgba(20,15,10,0.03);bottom:0;content:\"\";display:block;height:2px;left:0;position:absolute;right:0;}");

export var maxHeightBase = function maxHeightBase(maxHeight) {
  return (/*#__PURE__*/css("max-height:", maxHeight, ";overflow-y:scroll;overflow-x:hidden;overflow-scrolling:touch")
  );
};