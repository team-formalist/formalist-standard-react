import { css, keyframes } from "emotion";
import { colours } from "../styles";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const spinner = css`
  animation: ${spin} 700ms infinite linear;
  border: 0.25rem solid ${colours.values.greyLight};
  border-radius: 50%;
  border-top-color: ${colours.values.highlightDark};
  height: 1rem;
  width: 1rem;
`;
