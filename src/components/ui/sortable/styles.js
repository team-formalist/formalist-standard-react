import { css } from "emotion";
import { inputBoxes } from "../styles";

export const base = css`
  ${inputBoxes.inputBox};
`;

export const maxHeightWrapper = css`
  position: relative;
  &:after {
    background-color: rgba(20, 15, 10, 0.03);
    bottom: 0;
    content: "";
    display: block;
    height: 2px;
    left: 0;
    position: absolute;
    right: 0;
  }
`;

export const maxHeightBase = maxHeight => {
  return css`
    max-height: ${maxHeight};
    overflow-y: scroll;
    overflow-x: hidden;
    overflow-scrolling: touch
  `;
};
