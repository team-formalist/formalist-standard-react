import { css } from "emotion";
import { colours, typography } from "../styles";

export const base = css`
  visibility: inherit;
`;

/* Time picker */

export const button = css`
  ${typography.small};
  ${typography.sans};
  ${colours.greyTintBorder};
  ${colours.whiteBackground};
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
`;

export const buttonActive = css`
  ${colours.highlightLightBackground};
`;

export const item = css`
  visibility: inherit;
`;
