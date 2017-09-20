import { css, keyframes } from "emotion";
import { colours, typography } from "../styles";

export const base = css``

/* Time picker */

export const button = css`
  composes: ${typography.small} ${typography.sans} ${colours.greyTintBorder} ${colours.whiteBackground};
  appearance: none;
  border-style: solid;
  border-width: 0;
  border-bottom-width: 1px;
  cursor: pointer;
  display: block;
  padding: 0.5rem 1rem;
  width: 100%;
  &:hover {
    text-decoration: underline;
  }
`

export const buttonActive = css`
  composes: ${colours.highlightLightBackground};
`
